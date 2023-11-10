import React from "react";
import PropTypes from "prop-types";
import {store} from "../../../index";
import {Link} from "react-router-dom";
// import {bindActionCreators} from "redux";
import {navigationScheme} from "core/index";
import {Dialog,Button} from "@material-ui/core";
import connect from "react-redux/es/connect/connect";
import {clearBasket, logoutAction} from "core/actions";

import SettingsIcon from "assets/svg/settings.svg";
import PowerIcon from "assets/svg/shut-down.svg";

class AccountInfo extends React.Component {
  static propTypes = {
    userProfile: PropTypes.object,
    isAuthorized: PropTypes.bool,
  };

  state = {
    openConfirmModal : false
  };

  _toggleConfirmModal = () => {
    this.setState({
      openConfirmModal : !this.state.openConfirmModal
    })
  };

  _logOut = () => {
    store.dispatch(logoutAction());
    store.dispatch(clearBasket());
  };

  _getContent = () => {
    if(this.props.isAuthorized) {
      return (
        <div className="account-info-wrap">
          <div className="user-info">
            <h2 className="user-name">{this.props.userProfile.f_name}</h2>
            <p className="user-email">{this.props.userProfile.mail}</p>
          </div>
          <Link to={navigationScheme.dashboard} title="go to user cabinet" className="go-to-dashboard">
            <span className="text">особистий кабінет</span>
            <SettingsIcon className="icon"/>
          </Link>
          <button onClick={this._toggleConfirmModal} title="open logout modal" className="log-aut">
            <span className="text">вийти з акаунту</span>
            <PowerIcon className="icon"/>
          </button>

          <Dialog
            className="modal-confirm"
            open={this.state.openConfirmModal}
            onClose={this._toggleConfirmModal}
            aria-labelledby="simple-dialog-title"
            PaperProps={{className : "modal-confirm-wrap"}}
          >
            <h3 className="modal-confirm-title" title="Ви дійсно бажаєте вийти з акаунту?">Ви дійсно бажаєте вийти з акаунту?</h3>
            <div className="button-container">
              <Button className="modal-confirm-btn-confirm" title="logout yes" onClick={this._logOut}>Так</Button>
              <Button className="modal-confirm-btn-cancel" title="logout no" onClick={this._toggleConfirmModal}>Ні</Button>
            </div>
          </Dialog>

        </div>
      )
    }
    return null
  };

  render() {
    return this._getContent()
  }
}
const mapStateToProps = state => {
  return {
    userProfile: state.userProfile,
    isAuthorized: state.auth.isAuthorized,
  };
};

export default connect(mapStateToProps)(AccountInfo);
