import React from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';
import MenuIcon from '@material-ui/icons/Menu';
import {DeviceSizeService} from 'utilits/index';
import {Button, AppBar} from '@material-ui/core';
import SearchComponent from '../../search/Search.component';
import AccountInfo from '../../account-info/AccountInfo.component';

export default class AppBarComponent extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    handleDrawerOpen: PropTypes.func
  };

  state = {
    showSearch: true
  };

  componentDidMount() {
    this.deviceServiceId = DeviceSizeService.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    DeviceSizeService.unsubscribe(this.deviceServiceId);
  }

  render() {
    return (
      <AppBar
        position="fixed"
        color="default"
        className={classNames('header', this.props.open && 'active')}
      >
        <div className="search-and-show-menu">
          <Button
            color="inherit"
            title="Open menu"
            onClick={this.props.handleDrawerOpen}
            className={classNames('open-menu-btn', this.props.open && 'hidden')}>
            <MenuIcon className="menu-icon"/>
          </Button>

          <div className="search-and-user-info">
            {
              DeviceSizeService.size.width > 1024 &&
              <SearchComponent/>
            }
            <AccountInfo/>
          </div>
        </div>

      </AppBar>
    )
  }
}
