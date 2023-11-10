import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {DeviceSizeService} from 'utilits';
import Wrapper from 'shared/components/wrapper/Wrapper.component';
import CustomSelect from 'shared/components/customSelect/Select.component';
import {FormControlLabel,TextField,Checkbox, withStyles} from '@material-ui/core';
import AllPriceAndButtons from 'shared/components/all-price-and-buttons/AllPriceAndButtons.component';

import PenIcon from 'assets/svg/other/pen.svg';
import PhoneIcon from 'assets/svg/other/phone.svg';
import PointIcon from 'assets/svg/other/point.svg';
import EmailIcon from 'assets/svg/navigation-menu/envelope.svg';
import {store} from "../../index";
import {deliveryOptionsAction} from "../../core/actions/get-delivery-options";
import {RouterService} from "../../shared/services";
import {navigationScheme} from "../../core";

const initialState = {
  name: '',
  surName: '',
  lastName: '',
  comment: '',
  orderName: '',

  currentUserInfo: false,

  city: '',
  delivery: '',
  department: '',

  error: {
    name: null,
    surName: null,
    lastName: null,

    city: null,
    delivery: null,
    department: null,
  },
};

const validation = {
  name: (val) => {
    if (val.length < 3) {
      return 'Не менше 3 символів!';
    }
    return null;
  },
  surName: (val) => {
    if (val.length < 3) {
      return 'Не менше 3 символів!';
    }
    return null;
  },
  lastName: (val) => {
    if (val.length < 3) {
      return 'Не менше 3 символів!';
    }
    return null;
  },
  city: (val) => {
    if (val.length < 3) {
      return 'Не менше 3 символів!';
    }
    return null;
  },
  department: (val) => {
    if (val.length < 1) {
      return 'Не менше 1 символів!';
    }
    return null;
  }
};

const styles = {

  checked: {},

  checkbox: {
    color: '#4d4d4d',

    '&$checked': {
      color: '#f8f8f8',
    },

    width: 20,
    height: 20,
  },

  sizeIcon: {
    fontSize: 20,
  },

  menuItemStyle: {
    fontSize: '13px',
    color: '#494949',
  },
};

class CheckoutPage extends React.Component {
  static propTypes = {
    auth : PropTypes.bool,
    allPrice : PropTypes.number,
    userProfile : PropTypes.object,
    classes: PropTypes.object.isRequired
  };

  state = initialState;

  componentDidMount() {
    this.deviceServiceId = DeviceSizeService.subscribe(() => this.forceUpdate());
    store.dispatch(deliveryOptionsAction()).then(items => {
      const keys = Object.keys(items);
      const customArray = [];
      for (const key of keys) {
        customArray.push(items[key].delivery_name);
      }
      this.setState({
        deliveryOptions : customArray
      })
    });
  }

  componentWillUnmount() {
    DeviceSizeService.unsubscribe(this.deviceServiceId);
  }

  /**
   * check required fields functionality
   */

  requiredFields = event => {
    const errorText = validation[event.target.name](event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
      error: {
        ...this.state.error,
        [event.target.name]: errorText,
      },
    });
  };

  /**
   * set changes fields functionality
   */

  fieldsChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  /**
   * handleChangeSelect functionality
   */

  handleChangeSelect = name => event => {
    this.setState({[name]: event.target.value});
  };

  /**
   * checkbox functionality
   */

  useCurrentUserInfo = event => {
    const {f_name, l_name, p_name, city} = this.props.userProfile;

    if (event.target.checked) {
      this.setState({
        currentUserInfo: event.target.checked,
        name : f_name,
        surName : l_name,
        lastName : p_name,
        city : city,
      });
    } else {
      this.setState(initialState);
    }
  };

  /**
   * checkbox functionality
   */

  _getCheckoutInfo = () => {
    const {name, surName, lastName, comment, orderName, city, delivery, department} = this.state;

    return (
      {
        name,
        surName,
        lastName,
        comment,
        orderName,
        city,
        delivery,
        department,
      }
    )
  }

  render() {
    if (!this.props.auth) {
      RouterService.navigateTo(navigationScheme.login)
      return null;
    }
    const {
      name,
      surName,
      lastName,
      comment,
      orderName,

      currentUserInfo,

      error,
    } = this.state;

    const {classes, allPrice, userProfile} = this.props;

    const discount = userProfile.discount;

    const checkBox = <FormControlLabel
      className="checkbox-label"
      control={
        <Checkbox
          checked={currentUserInfo}
          onChange={this.useCurrentUserInfo}
          classes={{
            root: classes.checkbox,
            checked: classes.checked,
          }}
        />
      }
      label="Дані користувача аналогічні для отримувача"
      classes={{
        label: 'label',
      }}
    />;

    return (
      <Wrapper>
        <div className="checkout-order-page">
          <div className="width-container">

            <div className="user-information">
              <div className="name-wrap">
                <p className="user-name">{userProfile['f_name']}</p>
                <p className="user-shop-name">«{userProfile.company}»</p>
              </div>
              <div className="phone-wrap">
                <PhoneIcon className="phone-icon"/>
                <span className="phone-text">{userProfile.tel.number}</span>
              </div>
              <div className="email-wrap">
                <EmailIcon className="email-icon"/>
                <span className="email-text">{userProfile.mail}</span>
              </div>
              <div className="location-wrap">
                <PointIcon className="location-icon"/>
                <span className="location-text">{userProfile.city}</span>
              </div>
            </div>

            <div className="checkout-fields">

              <div className="left-block">

                {
                  DeviceSizeService.size.width < 480 && checkBox
                }

                <div className="input-container input-container-name">
                  <label className="form-label" htmlFor="#name">Ім’я отримувача:<sup className='required-field'>*</sup></label>
                  <TextField
                    onChange={this.requiredFields}
                    required
                    value={name}
                    type="text"
                    name="name"
                    id="name"
                    className="form-input-wrap"
                    InputProps={{
                      classes: {
                        root: 'form-input',
                        input: 'input-style',
                      },
                    }}/>
                  {error.name && <p className="error-text">{error.name}</p>}
                </div>

                <div className="input-container input-container-surName">
                  <label className="form-label" htmlFor="#surName">Прізвище отримувача:
                    <sup className='required-field'>*</sup>
                  </label>
                  <TextField
                    onChange={this.requiredFields}
                    required
                    value={surName}
                    type="text"
                    name="surName"
                    id="surName"
                    className="form-input-wrap"
                    InputProps={{
                      classes: {
                        root: 'form-input',
                        input: 'input-style',
                      },
                    }}/>
                  {error.surName && <p className="error-text">{error.surName}</p>}
                </div>

                <div className="input-container input-container-lastName">
                  <label className="form-label" htmlFor="#lastName">По-батькові отримувача:<sup className='required-field'>*</sup></label>
                  <TextField
                    onChange={this.requiredFields}
                    required
                    value={lastName}
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="form-input-wrap"
                    InputProps={{
                      classes: {
                        root: 'form-input',
                        input: 'input-style',
                      },
                    }}/>
                  {error.lastName && <p className="error-text">{error.lastName}</p>}
                </div>

                <CustomSelect
                  requiredFiled
                  items={this.state.deliveryOptions}
                  labelText="Спосіб доставки:"
                  selectedItem={this.state.delivery}
                  handleChangeSelect={this.handleChangeSelect("delivery")}
                />

                <div className="input-container input-container-city">
                  <label className="form-label" htmlFor="#city">Місто отримувача:<sup className='required-field'>*</sup></label>
                  <TextField
                    onChange={this.requiredFields}
                    required
                    value={this.state.city}
                    type="text"
                    name="city"
                    id="city"
                    className="form-input-wrap"
                    InputProps={{
                      classes: {
                        root: 'form-input',
                        input: 'input-style',
                      },
                    }}/>
                  {error.city && <p className="error-text">{error.city}</p>}
                </div>

                <div className="input-container input-container-department">
                  <label className="form-label" htmlFor="#department">Відділення:<sup className='required-field'>*</sup></label>
                  <TextField
                    onChange={this.requiredFields}
                    required
                    value={this.state.department}
                    type="text"
                    name="department"
                    id="department"
                    className="form-input-wrap"
                    InputProps={{
                      classes: {
                        root: 'form-input',
                        input: 'input-style',
                      },
                    }}/>
                  {error.department && <p className="error-text">{error.department}</p>}
                </div>

              </div>

              <div className="right-block">

                {
                  DeviceSizeService.size.width > 480 && checkBox
                }

                <div className="text-area-container">
                  <label className="form-label" htmlFor="#comment">Коментар до замовлення:</label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={comment}
                    className="text-area-style"
                    onChange={this.fieldsChange}
                  />
                </div>
              </div>

            </div>

            <div className="create-order-name">
              <TextField
                type="text"
                id="order-name"
                value={orderName}
                name="orderName"
                InputProps={{
                  classes: {
                    root: 'input',
                    input: 'order-name-input'
                  },
                }}
                className="order-name-wrap"
                onChange={this.fieldsChange}
                label="Підписати замовлення для зручного пошуку в «Архіві замовлень»"
              />
              <PenIcon className="icon-pen"/>
            </div>

            {
              <AllPriceAndButtons
                allPrice={allPrice}
                discount={discount}
                checkOrder={false}
                checkoutOrderInfo={this._getCheckoutInfo}
              />
            }
          </div>
        </div>
      </Wrapper>
    )
  }
}
const mapStateToProps = state => {
  return {
    allPrice : state.basket.price,
    userProfile : state.userProfile,
    auth : state.auth.isAuthorized,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(CheckoutPage))
