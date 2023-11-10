import React from 'react';
import Item from './Item.component';
import {euroSymbol} from 'utilits/index';
import ClearIcon from '@material-ui/icons/Clear';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

export default class ItemMobile extends Item {

  getContent = () => {
    const {
      id,
      img,
      title,
      getAllPrice,
      properties,
    } = this.props;
    const {count, price} = this.state;

    return (
      <div className="item-wrap-mobile">

        <div className="row">
          <div className="image-wrap border-right">
            <img src={img} className="img-item" alt="img-item"/>
          </div>
          <h2 className="title-item">{title}</h2>
        </div>

        <div className="row properties">
          {
            properties.map((item, key) => {
              return  <p className="item-props" key={key}>icon {item}</p>
            })
          }
        </div>

        <div className="row count-price-button-wrap">
          <div className="count-item-wrap">
            <button className="increment-item" onClick={this.incrementOrDecrementItem(false)}>
              <KeyboardArrowLeftIcon className="icon"/>
            </button>
            <input type="number" min={1} className="count-item"
                   onChange={(value) => this.changeCountItem(value)}
                   value={count}/>
            <button className="decrement-item" onClick={this.incrementOrDecrementItem(true)}>
              <KeyboardArrowRightIcon className="icon"/>
            </button>
          </div>

          <div className="all-price">
            {getAllPrice(price, count)}
            {euroSymbol}
          </div>

          <div className="buttons">
            <button onClick={this.copyOrRemoveItem('remove', id)} className="remove-item"><ClearIcon className="icon"/></button>
            <button onClick={this.copyOrRemoveItem('copy', id)} className="copy-item"><FileCopyIcon className="icon"/></button>
          </div>

        </div>

      </div>
    );
  };
}