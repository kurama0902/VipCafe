import React from 'react';
import PropTypes from "prop-types";
import Wrapper from "../../shared/components/wrapper/Wrapper.component";
import ItemGoods from "../../shared/components/goods/ItemGoods.component";
import PriceItem from "../../shared/components/goods/ItemWithPrice.component";

export default class SearchResult extends React.Component {
  static propTypes = {
    state : PropTypes.shape({
      auth : PropTypes.string,
      searchResults : PropTypes.array
    })
  }

  render() {
    const {auth, searchResults} = this.props.location.state;

    const Item = auth ? PriceItem : ItemGoods;

    return (
      <Wrapper>
        <div className="search-result-page catalog-page">
          <div className="goods-wrap">
            {
              searchResults.map((item, key) => {
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
      </Wrapper>
    )
  }
}
