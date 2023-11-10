import React from 'react';
import PropTypes from 'prop-types';
import RouterService from 'shared/services/RouterService';
import Wrapper from 'shared/components/wrapper/Wrapper.component';
import ItemGoods from 'shared/components/goods/ItemGoods.component';
import PriceItem from 'shared/components/goods/ItemWithPrice.component';

import ArrowBackIcon from '@material-ui/icons/KeyboardBackspace';

export default function SingItem(props) {
  const {auth, image, date_start, date_end, title, description, products} = props.location.state;
  const Item = auth ? PriceItem : ItemGoods;

  return (
    <Wrapper>
      <div className='shared-and-offers-single-item'>

        <button className="back-btn" onClick={RouterService.goBack}>
          <ArrowBackIcon className="arrow-back-icon"/>
        </button>

        <div className="single-item-wrap">
          <div className="img-container" style={{backgroundImage : `url(${image})`}}/>

          {
            date_start &&
            <p className="start-date">{date_start}</p>
          }

          <h1 className="single-item-title">{title}</h1>

          {
            description &&
            <p className="single-item-description">{description}</p>
          }

          {
            date_end &&
            <p className="finish-date">{date_end}</p>
          }

          <div className="single-item-items goods-wrap">
            {
              products.map((item, key) => {
                return (
                  <Item
                    key={key}
                    id={item["product_id"]}
                    title={item["post_title"]}
                    img={item.image}
                    price={item.price}
                    count={item["quantity"]}
                    properties={item.properties}
                  />
                  )
              })
            }
          </div>

        </div>

      </div>
    </Wrapper>
  );
}

SingItem.propTypes = {
  location : PropTypes.shape({
    state : PropTypes.shape({
      auth: PropTypes.bool,
      image: PropTypes.string,
      date_start: PropTypes.string,
      date_end: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      products: PropTypes.array,
    })
  })
};
