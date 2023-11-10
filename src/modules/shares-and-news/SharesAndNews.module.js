import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {navigationScheme} from 'core';
import RouterService from 'shared/services/RouterService';
import Wrapper from 'shared/components/wrapper/Wrapper.component';

import ArrowIcon from 'assets/svg/arrows.svg';

const tabName = {
  shares : 'shares',
  news : 'news'
};

class SharesAndNews extends React.Component {
  static propTypes = {
    auth: PropTypes.bool,
    shares: PropTypes.any,
    news: PropTypes.any,
    location: PropTypes.shape({
      state: PropTypes.string,
    })
  };

  state = {
    selectTab : this.props.location.state || tabName.shares,
  };

  componentWillReceiveProps(newProps) {
    if(newProps.location.state !== this.props.location.state) {
      this.setState({
        selectTab : newProps.location.state || tabName.shares
      })
    }
  }

  _selectTab = (name) => {
    this.setState({
      selectTab :  name
    });
  };

  _openSingleItem = (item) => {
    RouterService.navigateTo({
      pathname : navigationScheme.sharedAndOffersSingleItem,
      state : {
        auth : this.props.auth,
        ...item,
        title : item.title.rendered,
        price : item.price,
        description : item.excerpt.rendered
      }
    })
  };

  _getTabContent = (selectItem) => {
    const selectItems = this.props[selectItem];
    const selectItemKeys = Object.keys(selectItems);

    return (
      selectItemKeys.map((item, key) => {
        return (
          <div className="item" key={key}>
            {
              selectItems[item]["event_start"] &&
              <p className="start-date">{selectItems[item]["event_start"]}</p>
            }
            <div className="item-wrap">
              <div className="item-image-wrap" style={{backgroundImage : `url(${selectItems[item].image})`}}>
                {
                  selectItems[item]["event_end"] &&
                  <span className="finish-date">до {selectItems[item]["event_end"]}</span>
                }
              </div>
              <div className="item-content">
                <h2 className="item-title">{selectItems[item].title["rendered"]}</h2>
                {
                  selectItems[item].excerpt &&
                  <div className="item-description" dangerouslySetInnerHTML={{__html : selectItems[item].excerpt.rendered}} />
                }
                <button
                  className="item-link"
                  onClick={() => this._openSingleItem(selectItems[item])}>Детальніше <ArrowIcon className='arrow-icon'/>
                </button>
              </div>
            </div>
          </div>
        )
      })
    )
  };

  render() {
    return(
      <Wrapper>
        <div className="shared-and-offers-page">
          <div className="width-container">
            <ul className="header-tab">
              <li className={classNames("header-tab-item", this.state.selectTab === tabName.shares && "active")}>
                <button className="header-tab-btn" onClick={() => this._selectTab(tabName.shares)}>акції</button>
              </li>
              <li className={classNames("header-tab-item", this.state.selectTab === tabName.news && "active")}>
                <button className="header-tab-btn" onClick={() => this._selectTab(tabName.news)}>новинки</button>
              </li>
            </ul>
            <div className="tab-content">
              {
                this._getTabContent(this.state.selectTab)
              }
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}

const mapStateProps = state => {
  return {
    auth : state.auth.isAuthorized,
    shares : state.shares,
    news : state.news
  }
};

export default connect(mapStateProps)(SharesAndNews)
