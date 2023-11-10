import React from 'react';
import {toastr} from "react-redux-toastr";
import {DeviceSizeService} from 'utilits';
import {Button, TextField} from '@material-ui/core';
import {resetPassAction} from "../../../core/actions/reset-password";

import LogoIconSVG from 'assets/svg/logo.svg';

export default class ForgotPass extends React.Component {
  state = {
    email: ''
  };

  componentDidMount() {
    this.deviceServiceId = DeviceSizeService.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    DeviceSizeService.unsubscribe(this.deviceServiceId);
  }

  onFieldsChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    resetPassAction(this.state.email)
      .then(res => {
        if (res.data.result) {
          toastr.success('Новий пароль вислано вам на e-mail!');
          this.setState({
            email : ''
          });
        } else {
          toastr.warning('Помилка, повідомлення не відправлено!');
          console.error('Request failed', res);
        }
      });
  };

  _getContent = () => {
    const {email} = this.state;
    if (DeviceSizeService.size.width < 1025) {
      return (
        <div className="auth-page shared-form-wrap login">
          <div className="auth-header-mobile">
            <div className="logo">
              <LogoIconSVG className="logo-icon-svg"/>
            </div>
            <div className="email-and-number">
              <a
                className="email-link"
                href="mailto:vipcafe@info">vipcafe@info</a>
              <div className="separator"/>
              <a
                className="number-link"
                href="tel:+38(095)3131313">+38 (095) 313 13 13</a>
            </div>
          </div>
          <form autoComplete="off" method="post" onSubmit={this.handleSubmit} className="auth-form shared-form">
            <h1 className="title-page">Скинути пароль</h1>
            <div className="input-container input-container-email">
              <label className="form-label" htmlFor="#email">Телефон (або електронна адреса):</label>
              <TextField onChange={this.onFieldsChange}
                         placeholder="test@gmail.com"
                         value={email}
                         type="text"
                         name="email"
                         id="email"
                         className="form-input-wrap"
                         InputProps={{
                           classes: {
                             root: 'form-input',
                             input: 'input-style',
                           },
                         }}/>
            </div>
            <div className="button-container">
              <Button
                className="submit-button"
                type="submit">Скинути</Button>
            </div>
          </form>
        </div>
      );
    }
    return (
      <div className="auth-page shared-form-wrap login">
        <form onSubmit={this.handleSubmit} autoComplete="off" method="post" className="auth-form shared-form">
          <img src="/img/clover.png" className="auth-form-clover" alt="clover"/>
          <h1 className="title-page">Скинути пароль</h1>
          <div className="input-container input-container-email">
            <label className="form-label" htmlFor="#email">Телефон (або електронна адреса):</label>
            <TextField onChange={this.onFieldsChange}
                       placeholder="test@gmail.com"
                       value={email}
                       type="text"
                       name="email"
                       id="email"
                       className="form-input-wrap"
                       InputProps={{
                         classes: {
                           root: 'form-input',
                           input: 'input-style',
                         },
                       }}/>
          </div>

          <div className="button-container">
            <Button
              className="submit-button"
              type="submit">Скинути</Button>
          </div>
        </form>
        <div className="contacts-block">
          <div className="logo">
            <LogoIconSVG className="logo-icon-svg"/>
          </div>
          <div className="separator"/>
          <div className="email-and-number">
            <a
              className="email-link"
              href="mailto:vipcafe@info">vipcafe@info</a>
            <a
              className="number-link"
              href="tel:+38(095)3131313">+38 (095) 313 13 13</a>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this._getContent();
  }
}
