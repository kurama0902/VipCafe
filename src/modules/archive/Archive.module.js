import React from 'react';
import 'moment/locale/uk';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {navigationScheme} from 'core';
import {Button} from '@material-ui/core';
import connect from 'react-redux/es/connect/connect';
import {calculatePrice, DeviceSizeService, euroSymbol} from 'utilits';
import MomentLocaleUtils from 'react-day-picker/moment';
import RouterService from 'shared/services/RouterService';
import OrderHeader from './components/OrderHeader.component';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Wrapper from 'shared/components/wrapper/Wrapper.component';
import {getArchive} from "../../core/actions";
import {getRepeatOrder} from "../../core/actions/repeat-order";
import {toastr} from "react-redux-toastr";

class ArchiveOfOrders extends React.Component {
  static propTypes = {
    archive: PropTypes.arrayOf(PropTypes.shape({
      ID : PropTypes.string,
      user_id : PropTypes.string,
      order_name : PropTypes.string,
      order_phone : PropTypes.string,
      order_total : PropTypes.string,
      order_status : PropTypes.string,
      order_date : PropTypes.string,
      products : PropTypes.array
    })),
  };

  constructor(props) {
    super(props);
    this.state = {
      archive : props.archive,
      date: {
        from: undefined,
        to: undefined,
      },
      selectItem: 0,
      search : ''
    }
  }

  componentDidMount() {
    this.deviceServiceId = DeviceSizeService.subscribe(() => this.forceUpdate());
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.archive !== this.props.archive) {
      this.setState({
        archive : nextProps.archive
      })
    }
  }

  componentWillUnmount() {
    DeviceSizeService.unsubscribe(this.deviceServiceId);
  }

  onRepeatOrderClick = (id) => {
    this.props.dispatch(getRepeatOrder(id)).then(item => {
      if ((item.result)) {
        console.warn(item)
        this.forceUpdate();
      } else {
        toastr.error('Замовлення відсутнє');
      }
    })
    console.warn('repeat order ', id);
  };

  handleChange = (direction) => (value) => {
    this.setState({
      date: {
        ...this.state.date,
        [direction]: value,
      },
      ['date_' + direction] : this._formatDate(value)
      ,
    }, () => {
      if ( direction === 'to') {
        this.props.dispatch(getArchive(
          `date_start=${this.state['date_from']}&date_end=${this.state['date_to']}`
        ))
      }
    });
  };

  _formatDate = (date) => {
    const pad = n => (n < 10 ? `0${n}` : n)
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = pad(newDate.getMonth() + 1);
    const day = pad(newDate.getDate());
    return `${year}-${month}-${day}`
  }

  _resetDateFilter = () => {
    this.setState({
      date: {
        from: undefined,
        to: undefined,
      },
      search : ''
    }, () =>  this.props.dispatch(getArchive()));
  };

  _searchInArchive = (value) => {
    const searchValue = value.target.value;
    this.setState({
      search : searchValue
    })
    setTimeout(() => {
      this.props.dispatch(getArchive(`search=${searchValue}`))
    }, 900)
  }

  _selectItem = (index) => () => {
    if (DeviceSizeService.size.width < 680) {
      RouterService.navigateTo({
        pathname: navigationScheme.archiveOrder,
        state: this.state.archive[index],
      });
      return;
    }
    this.setState({
      selectItem: index,
    });
  };

  _getHeadTab = () => {
    const orders = this.state.archive;
    const isNotMobile = DeviceSizeService.size.width > 680;
    return orders.length && orders.map((item, key) => {
      const itemDate = <li className="list-date-wrap"><span className="list-date">{item.order_date}</span></li>;
      const classes = classNames('list-item', {
        active: isNotMobile && this.state.selectItem === key,
      });
      return (
        <ul className="list" key={item.ID}>
          {itemDate}
          <li className={classes}
              onClick={this._selectItem(key)}>
            <p className="number">№ {item.ID}</p>
            <p className="title">{item.order_name}</p>
            <p className="order-address">Замовлення {item.order_mail}</p>
          </li>
        </ul>
      );
    });
  };

  _getItemsTab = () => {
    const selectItem = this.state.archive[this.state.selectItem];
    return selectItem.products.map((item, key) => {
      return (
        <div className="item animated fadeInDown" key={key}>
          <div className="left-block">
            <img src={item.image} alt="item img" className="item-img"/>
          </div>
          <div className="right-block">
            <h2 className="item-title">{item.title}</h2>
            <p className="item-count">{item.quality} шт.</p>
            <p className="item-price">{item.price}{euroSymbol}\шт.</p>
            <p className="item-all-price">{item.price}{euroSymbol}</p>
          </div>
        </div>
      );
    });
  };

  _getContent = () => {
    const selectItem = this.state.archive[this.state.selectItem];
    if (!selectItem || DeviceSizeService.size.width < 680) {
      return null;
    }
    return (
      <div className="tab-right-column">
        {
          <OrderHeader
            allPrice={calculatePrice(selectItem.products)}
            num={selectItem.ID}
            orderAddress={selectItem['order_mail']}
            onRepeatOrderClick={() => this.onRepeatOrderClick(selectItem.ID)}
          />
        }
        <div className="goods-count">Товарів в замовленні: {selectItem.products.length}</div>
        <div className="items-wrap">
          <div className="scroll-container">
            {
              this._getItemsTab()
            }
          </div>
        </div>
      </div>
    );
  };

  _getBody = () => {
    const {from, to} = this.state.date;
    const modifiers = {start: from, end: to};

    if (this.state.archive.length) {
      return (
        <div className="archive-wrap">
          <div className="archive-head">
            <div className="search">
              <label htmlFor="search" className="label">Пошук по номеру чи назві:</label>
              <input
                placeholder="141"
                type="search"
                value={this.state.search}
                className="search-input"
                onChange={this._searchInArchive}
              />
            </div>
            <div className="date-wrap">
              <span className="label">Пошук за період:</span>

              <div className="date-input-wrap">
                <DayPickerInput
                  id='from'
                  value={from}
                  format="LL"
                  placeholder="--  --  --"
                  dayPickerProps={{
                    selectedDays: [from, {from, to}],
                    disabledDays: {after: to},
                    toMonth: to,
                    modifiers,
                    numberOfMonths: 1,
                    locale: 'uk',
                    localeUtils: MomentLocaleUtils,
                  }}
                  onDayChange={this.handleChange('from')}
                />
              </div>

              <span className="arrow">/</span>

              <div className="date-input-wrap">
                <DayPickerInput
                  id='to'
                  value={to}
                  placeholder="--  --  --"
                  ref={el => (this.to = el)}
                  dayPickerProps={{
                    selectedDays: [from, {from, to}],
                    disabledDays: {before: from},
                    modifiers,
                    month: from,
                    fromMonth: from,
                    numberOfMonths: 1,
                    locale: 'uk',
                    localeUtils: MomentLocaleUtils,
                  }}
                  onDayChange={this.handleChange('to')}
                />
              </div>
              <Button onClick={this._resetDateFilter} className="reset-date">очистити</Button>
            </div>
          </div>
          <div className="archive-body">
            <div className="tab-left-column">
              {
                this._getHeadTab()
              }
            </div>
            {
              this._getContent()
            }
          </div>
        </div>
      );
    }
    return (
      <div className="empty-title">У вас ще не було замовлень</div>
    )
  };

  render() {
    return (
      <Wrapper>
        <div className={classNames("archive-page", !this.state.archive.length && "empty-body")}>
          {this._getBody()}
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    archive: state.archive,
  };
};

export default connect(mapStateToProps)(ArchiveOfOrders);
