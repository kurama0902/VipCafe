import React from 'react';
import classNames from 'classnames';
import {navigationScheme} from 'core';
import {Link} from 'react-router-dom';
import {euroSymbol} from 'utilits/index';
import ItemGoods from './ItemGoods.component';

export default class ItemWithPrice extends ItemGoods {
  getBottomContent = () => {
    const toMany = this.state.count >= this.props.quantity;
    return (
      <React.Fragment>
        <div className="item-number-and-price">

          <span className="price-text">К-сть:</span>

          <input
            min="1"
            type="number"
            className="count"
            title="Кількість одиниць"
            value={this.state.count}
            disabled={this.props.quantity === "0"}
            onChange={(value) => this.countItem(value)}
            maxLength={this.state.quantity}
          />
          <span className="total-price">= {this.getTotalCost()} {euroSymbol}</span>
        </div>

        <button
          title="Додати у кошик"
          onClick={this._addToBasket(this.props)}
          disabled={this.state.count === 0 || toMany}
          className={classNames("add-to-basket", this.props.id === this.state.wasAddedItem ? "success" : "")}>
          <span className="add-to-basket-text">{this.toMany()}</span>
          <Link to={navigationScheme.basket} title="Відкрити у кошику" className="open-basket-text">відкрити в кошику</Link>
        </button>
      </React.Fragment>
    );
  }
}
