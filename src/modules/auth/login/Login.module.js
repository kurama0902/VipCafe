import React from 'react';
import {store} from "index";
import {navigationScheme} from 'core';
import {Link} from 'react-router-dom';
import {toastr} from 'react-redux-toastr';
import {loginAction} from 'core/actions/index';
import {TextField, Button} from '@material-ui/core';
import {userIsNotAuthenticated} from 'core/auth-redirect';
import {DeviceSizeService, MD5, setArchive} from 'utilits';
import { Progress } from "shared/components/preloader/Preloader";

import LogoIconSVG from 'assets/svg/logo.svg';

const initialState = {
  email: '',
  password: '',
  onAnimation: false,
  loading: false,
  error: {
    email: null,
    password: null,
  },
};

const validation = {
  email: (val) => {
    let error = null;
    const emailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailValidation.test(val)) {
      error = 'E-mail введений не вірно!';
    }
    return error;
  },
  password: (val) => {
    if (val.length < 4) {
      return 'Не менше 4 символів!';
    }
    return null;
  },
};

class Login extends React.Component {
  state = {
    ...initialState,
  };

  componentDidMount() {
    this.deviceServiceId = DeviceSizeService.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    DeviceSizeService.unsubscribe(this.deviceServiceId);
  }

  onFieldsChange = event => {
    const errorText = validation[event.target.name](event.target.value);

    this.setState({
      [event.target.name]: event.target.value,
      error: {
        ...this.state.error,
        [event.target.name]: errorText,
      },
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
        ...this.state,
        loading: true
    })
      store.dispatch(loginAction({
        email : this.state.email,
        pass : MD5(this.state.password)
      })).then(res => {
        if (res.user) {
          toastr.success('Вітаємо!');
          setArchive(res.user.id);
        } else {
          toastr.error('Логін або Пароль не вірний!');
        }
      });
  };

  _getContent = () => {
    const {email, password, error, loading} = this.state;
    if (loading) return <div className="auth-page login shared-form-wrap">{<Progress anotherColor/>}</div>
    if (DeviceSizeService.size.width < 1025) {
      return (
        <div className="auth-page login shared-form-wrap">
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
                <h1 className="title-page">Вхід в акаунт</h1>
                <div className="input-container input-container-email">
                    <label className="form-label" htmlFor="#email">Телефон (або електронна адреса):</label>
                    <TextField
                        onChange={this.onFieldsChange}
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
                    {error.email && <p className="error-text">{error.email}</p>}
                </div>
                <div className="input-container input-container-password">
                    <label className="form-label" htmlFor="#password">Пароль:</label>
                    <TextField
                        onChange={this.onFieldsChange}
                        value={password}
                        placeholder="******"
                        type="password"
                        name="password"
                        id="password"
                        className="form-input-wrap"
                        InputProps={{
                            classes: {
                                root: 'form-input',
                                input: 'input-style',
                            },
                        }}/>
                    {error.password && <p className="error-text">{error.password}</p>}
                </div>
                <p className="forgot-password">
                    <Link className="forgot-password-link" to={navigationScheme.forgotPassword}>Забули пароль?</Link>
                </p>
                <div className="button-container">
                    <Button
                        variant="extendedFab"
                        aria-label="login"
                        className="submit-button"
                        type="submit">Увійти</Button>
                </div>
                <div className="registered-link-wrap">
                    <Link
                        to={navigationScheme.signUp}
                        className="registered-link">У Вас немає акаунту?
                        <span className="underline">Зареєструйтесь</span></Link>
                </div>
            </form>
            <div className="continue-without-authorization">
                <Link
                    to={navigationScheme.catalog}
                    className="continue-without-authorization-link">
                    Продовжити без авторизації</Link>
            </div>
        </div>
      );
    }
    return (
      <div className="auth-page login shared-form-wrap">
          <form onSubmit={this.handleSubmit} autoComplete="off" method="post" className="auth-form shared-form">
              <img src="/img/clover.png" className="auth-form-clover" alt="clover"/>
              <h1 className="title-page">Вхід в акаунт</h1>
              <div className="input-container input-container-email">
                  <label className="form-label" htmlFor="#email">Телефон (або електронна адреса):</label>
                  <TextField
                      onChange={this.onFieldsChange}
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
                  {error.email && <p className="error-text">{error.email}</p>}
              </div>
              <div className="input-container input-container-password">
                  <label className="form-label" htmlFor="#password">Пароль:</label>
                  <TextField
                      onChange={this.onFieldsChange}
                      value={password}
                      placeholder="******"
                      type="password"
                      name="password"
                      id="password"
                      className="form-input-wrap"
                      InputProps={{
                          classes: {
                              root: 'form-input',
                              input: 'input-style',
                          },
                      }}/>
                  {error.password && <p className="error-text">{error.password}</p>}
              </div>
              <p className="forgot-password">
                  <Link className="forgot-password-link" to={navigationScheme.forgotPassword}>Забули пароль?</Link>
              </p>
              <div className="button-container">
                  <Button
                      variant="extendedFab"
                      aria-label="login"
                      className="submit-button"
                      type="submit">Увійти</Button>
              </div>
              <div className="registered-link-wrap">
                  <Link
                      to={navigationScheme.signUp}
                      className="registered-link">У Вас немає акаунту?
                      <span className="underline">Зареєструйтесь</span></Link>
              </div>
          </form>
          <div className="continue-without-authorization">
              <Link
                  to={navigationScheme.catalog}
                  className="continue-without-authorization-link">
                  Продовжити без авторизації</Link>
          </div>
          <div className="contacts-block">
              <div className="logo">
                  <LogoIconSVG className="logo-icon-svg"/>
              </div>
              <div className="separator"/>
              <div className="email-and-number">
                  <a className="email-link" href="mailto:vipcafe@info">vipcafe@info</a>
                  <a className="number-link" href="tel:+38(095)3131313">+38 (095) 313 13 13</a>
              </div>
          </div>
      </div>
    );
  };

  render() {
    return this._getContent();
  }
}

export default (userIsNotAuthenticated(Login));
