import React from 'react';
import {euroSymbol} from 'utilits';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';
import RouterService from 'shared/services/RouterService';
import ArrowBackIcon from '@material-ui/icons/KeyboardBackspace';

export default function OrderHeader(props) {
  return (
    <div className="tab-right-column-head">
      <button className="back-btn" onClick={RouterService.goBack}>
        <ArrowBackIcon className="arrow-back-icon"/>
      </button>
      <div className="order-number-wrap">
        <div className="order-number-and-who-order">
          <p className="title-order-number">Замовлення №: {props.num}</p>
          <p className="order-address">{props.orderAddress}</p>
        </div>
        <div className="border"/>
        <div className="all-price-wrap">
          <p className="all-price-title">Сума замовлення:</p>
          <p className="all-price-number">{props.allPrice}{euroSymbol}</p>
        </div>
      </div>
      <Button className="repeat-order" onClick={props.onRepeatOrderClick}>Повторити замовлення</Button>
    </div>
  )
}

OrderHeader.propTypes = {
  num : PropTypes.string,
  allPrice : PropTypes.number,
  orderAddress : PropTypes.string,
  onRepeatOrderClick : PropTypes.func
};
