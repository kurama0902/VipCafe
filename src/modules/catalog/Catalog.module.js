import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SteakIcon from 'assets/svg/steak.svg';
import CoffeeIcon from 'assets/svg/coffee.svg';
import CheeseIcon from 'assets/svg/cheese.svg';
import GroceryIcon from 'assets/svg/grocery.svg';
import ChocolateIcon from 'assets/svg/chocolate.svg';
import ArrowIcon from '@material-ui/icons/ArrowBack';

import { httpService, URLS } from "services";
import {DeviceSizeService} from 'utilits/index';
import {Button, Dialog} from '@material-ui/core';
import connect from 'react-redux/es/connect/connect';
import {Progress} from "shared/components/preloader/Preloader";
import Wrapper from 'shared/components/wrapper/Wrapper.component';
import ItemGoods from 'shared/components/goods/ItemGoods.component';
import CustomSelect from 'shared/components/customSelect/Select.component';
import ItemWithPrice from 'shared/components/goods/ItemWithPrice.component';
import MultiSelect from 'shared/components/customSelect/MultiSelect.component';

const keys = {
  coffee: "kava",
  cheeseAndMeat: "syr-myaso",
  grocery: "bakaliya",
  chocolate: "shokolad",
};


const tabIcons = {
  [keys.grocery]: <GroceryIcon className="tab-icon"/>,
  [keys.coffee]: <CoffeeIcon className="tab-icon"/>,
  [keys.cheeseAndMeat]: [<CheeseIcon key={1} className="tab-icon"/>, <SteakIcon key={2} className="tab-icon"/>],
  [keys.chocolate]: <ChocolateIcon className="tab-icon"/>,
};

class Catalog extends React.Component {
  static propTypes = {
    isAuthorized: PropTypes.bool,
    userId: PropTypes.number
  };

  state = {
    loading: true,
    tabs: [],
    activeGoods: 0, //active category
    products: [],
    start: 0,
    limit: 20,
    filters: 0,
    productFilters: [],

    /**
     * customSelect value
     */
    product: '',
    sort: '',
    brand: '',
    type: '',
    weight: [],
    /**
     * customSelect value
     */

    openFilterModal: false,
  };

  componentDidMount() {
    this.deviceServiceId = DeviceSizeService.subscribe(() => this.forceUpdate());
    httpService().getRequest(URLS.shop)
      .then(res => {
        this.setState({
          tabs: res,
          activeGoods: res && res[res.findIndex(item => item.name === 'КАВА')].id
        });
    })
      .then(() => this._getGoods(this.state.activeGoods))
  }

  componentWillUnmount() {
    DeviceSizeService.unsubscribe(this.deviceServiceId);
  }

  handleChangeSelect = name => event => {
    this.setState({[name]: event.target.value}, () => this._getGoods(this.state.activeGoods));
  };

  handleChangeGoods = (id) => {
    this.setState({
      loading: true,
      activeGoods: id
    }, () => this._getGoods(id));
  };

  _getGoods = (activeCategory) => {
    const { start, limit, filters } = this.state;

    httpService().getRequest(URLS.getProducts +
      `?user_id=${this.props.userId}&start=${start}&limit=${limit}&category=${activeCategory}&filters=${filters}`)
        .then(res => {
          this.setState({
            productFilters: res.data_filter,
            products: res.products,
            loading: false
          })
      });
  };

  getGoodsItem = (props, key) => {
    const items = {
      count: 1,
      quantity: props["quantity"],
      id: props["product_id"],
      price: props.price,
      img: props.img,
      title: props["post_title"],
      properties: {...props["attributes"]}
    };
    if (this.props.isAuthorized) {
      return <ItemWithPrice {...items} key={key}/>;
    }
    return <ItemGoods {...items} key={key}/>
  };

  getGoodsItems = () => {
    const {loading, products} = this.state;
    if (!products.length || loading) return <Progress/>;
    return (
      <div className="goods-wrap">
        {
          products.map((item, key) => {
            return this.getGoodsItem(item, key);
          })
        }
      </div>
    )
  }

  _toggleFilterModal = () => {
    this.setState({
      openFilterModal: !this.state.openFilterModal
    });
  };

  getFilters = () => {
    if (DeviceSizeService.size.width < 992) {
      return (
        <div className='custom-filter-container'>
          <Button className="show-filters" onClick={this._toggleFilterModal}>фільтр і сортування</Button>
        </div>
      )
    }
    return (
      <div className="custom-filter-container">
        {this._getFiltersProduct()}
      </div>
    )
  };

  _getFiltersProduct = () => {
    const {
      loading,
      type,
      weight,
      productFilters
    } = this.state;

    if (loading || !productFilters.length) return <Progress/>

    return (
      <div className="filter-product">
        {
          productFilters.map((item, key) => {
            const arrayProps = [];
            for(let i = 0; i < item.values.length; i ++) {
              arrayProps.push(item.values[i].text)
            }
            if (item.name === "Тип") {
              return (
                <CustomSelect
                  key={key}
                  placeholder
                  labelText={item.name}
                  items={arrayProps}
                  selectedItem={type}
                  handleChangeSelect={this.handleChangeSelect('type')}
                />
              )
            }else if (item.name === "Вага") {
              return (
                <MultiSelect
                  key={key}
                  labelText={item.name}
                  countTheSelectedItem
                  items={arrayProps}
                  selectedItem={weight}
                  weightLength={this.state.weight.length}
                  resetSelectItems={this._resetSelectItems('weight')}
                  handleChangeSelect={this.handleChangeSelect('weight')}
                />
              )
            }
            return null
          })
        }
      </div>
    )
  };

  _resetSelectItems = (resetItem) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      [resetItem]: []
    }, () => this.state[resetItem]);
  };

  getTabCategory = () => {
    const tabs = this.state.tabs;
    if (!tabs.length) return <Progress/>
    return (
      <div className="tab-categories">
        {
          tabs.map((elem) => {
              return (
                <Button
                  id={elem.id}
                  key={elem.id} onClick={() => this.handleChangeGoods(elem.id)}
                  classes={{label: 'tab-item-wrap'}}
                  className={classNames(`tab-item ${elem.id}`, this.state.activeGoods === elem.id && 'active')}>
                  {
                    tabIcons[elem.id]
                  }
                  <span className="text">{elem.name}</span>
                </Button>
              )
            })
        }
      </div>
    );
  };

  render() {
    return (
      <Wrapper>
        <div className="catalog-page">

          {
            this.getTabCategory()
          }

          {
            this.getFilters()
          }

          {
            this.getGoodsItems()
          }

          <Dialog
            fullScreen
            open={this.state.openFilterModal}
            onClose={this._handleOpenDescriptionModal}
            className="filters-mobile-modal"
          >
            <div className="catalog-mobile-filters">
              <button className="back-btn" onClick={this._toggleFilterModal}><ArrowIcon
                className="back-icon"/></button>
              {this._getFiltersProduct()}
            </div>

          </Dialog>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthorized: state.auth.isAuthorized,
    userId : state.userProfile.id
  };
};

export default connect(mapStateToProps)(Catalog);
