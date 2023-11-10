import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {store} from "../../../index";
import CrossIcon from "assets/svg/cross.svg";
import SearchIcon from "assets/svg/search.svg";
import {search} from "../../../core/actions/search";
import {Button, TextField} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import RouterService from "../../services/RouterService";
import {navigationScheme} from "../../../core";
import {toastr} from "react-redux-toastr";

const styles = () => ({
  textField: {
    width: "100%"
  },
  cssLabel: {
    "&$cssFocused": {
      color: "red",
    },
  },
  cssFocused: {},
});

class Search extends React.Component {
  static propTypes = {
    name : PropTypes.string,
    classes: PropTypes.object.isRequired,
  };
  state = {
    open : false,
    value : ''
  };

  _toggleSearchInput = () => {
    this.setState({
      open : !this.state.open
    })
    if (this.state.value) {
      this._goToSearchResultPage(this.state.value)
    }
  };

  _changeValue = (event) => {
    this.setState({
      value : event.target.value
    })
  };

  _goToSearchResultPage = () => {
    store.dispatch(search(this.state.value)).then(data => {
      if (data.products.length) {
        RouterService.navigateTo({
          pathname : navigationScheme.searchResultPage,
          state : {
            auth : store.getState().auth.isAuthorized,
            searchResults : data.products
          }
        })
      } else {
        toastr.error('По вашому запиту нічого не знайдено!');
      }
    })
  }

  _clearInput = () => {
    this.setState({
      value : ""
    })
  };

  render() {
    return (
      <div role="search" className={classNames("search-wrap",this.state.open && "open")}>

        <TextField
          id="search"
          type="search"
          margin="normal"
          InputProps={{
            classes: {
              root: "search-input",
              input: "input-style"
            }
          }}
          InputLabelProps={{
            classes:{
              root: "label-style"
            }
          }}
          value={this.state.value}
          onChange={this._changeValue}
          className={classNames("search-input-wrap", this.props.classes.textField)}
        />

        {
          this.state.value &&
          <Button className="clear-btn" onClick={this._clearInput}>
            <CrossIcon className="search-icon"/>
          </Button>
        }

        <Button className="search-btn" onClick={this._toggleSearchInput}>
          <SearchIcon className="search-icon"/>
        </Button>
      </div>
    )
  }
}


export default withStyles(styles)(Search);
