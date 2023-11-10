import React from 'react';
import PropTypes from 'prop-types';
import {euroSymbol} from 'utilits/index';
import ClearIcon from '@material-ui/icons/Clear';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {store} from 'index';
import { changeBasket, removeItemWithBasket } from "core/actions";

export default class Item extends React.Component {
  static propTypes = {
    id : PropTypes.string,
    img : PropTypes.string,
    title : PropTypes.string,
    getAllPrice: PropTypes.func,
    count : PropTypes.number,
    properties : PropTypes.object,
    price : PropTypes.string
  };

  state = {
    count : this.props.count,
    price : this.props.price
  };

  copyOrRemoveItem = (method, id) => () => {
    if (method === "remove") {
      store.dispatch(removeItemWithBasket(id))
    }
  };

  incrementItem = () => this.updateBasket(this.state.count + 1);
  decrementItem = () => this.updateBasket(this.state.count < 2 ? 1 : this.state.count - 1);

  changeCountItem = (value) => {
    this.updateBasket(Number(value.target.value))
  };

  updateBasket = (newCount) => {
    this.setState({
      count : newCount
    }, () => {
      store.dispatch(changeBasket({
        ...this.props,
        count : newCount
      }));
    });
  };

  getContent = () => {
    const {id,img, title,properties,getAllPrice} = this.props;
    const {count, price} = this.state;
    return (
      <tr className="table-tr">
        <td className="buttons-and-img">
          <div className="buttons">
            <button onClick={this.copyOrRemoveItem('remove', id)} className="remove-item"><ClearIcon className="icon"/></button>
          </div>
          <div className="image-wrap">
            <img src={img} className="img-item" alt="img-item"/>
          </div>
        </td>
        <td className="border-right">
          <div className="title-and-properties">
            <h2 className="title-item">{title}</h2>
            <div className="properties">
              {
                properties.length && properties.map((item, key) => {
                  return  <p className="item-props" key={key}>icon {item.name}</p>
                })
              }
            </div>
          </div>
        </td>
        <td className="border-right">
          <div className="count-item-wrap">
            <button className="increment-item" onClick={this.decrementItem}>
              <KeyboardArrowLeftIcon className="icon"/>
            </button>
            <input type="number" min={1} className="count-item"
                   onChange={(value) => this.changeCountItem(value)}
                   value={count}/>
            <button className="decrement-item" onClick={this.incrementItem}>
              <KeyboardArrowRightIcon className="icon"/>
            </button>
          </div>
        </td>
        <td className="price-with-one border-right">
          {price}
          {euroSymbol}
        </td>
        <td className="all-price">
          {getAllPrice(price, count)}
          {euroSymbol}
        </td>
      </tr>
    );
  };

  render() {
    return this.getContent()
  }
}
