import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {toastr} from "react-redux-toastr";
import {Button, TextField} from "@material-ui/core";
import { httpService, URLS } from "services";
import connect from "react-redux/es/connect/connect";
import {userIsAuthenticated} from "core/auth-redirect";
import Wrapper from "shared/components/wrapper/Wrapper.component";
import CustomSelect from "shared/components/customSelect/Select.component";
import CustomCheckbox from "shared/components/custom-checkbox/CustomCheckbox.component";
import {dashboardChangeUserInformationSuccess} from "../../core/actions";

import CheckIcon from "assets/svg/check-2.svg";

const initialState = {
  userProfile : {
    session_id: '',
    id: '',
    f_name: '',
    l_name: '',
    p_name: '',
    tel: {
      number : '',
      telegram : false,
      viber : false
    },
    mail: '',
    company: '',
    site: '',
    city: '',
    delivery: '',
    trade_format: ''
  },
  saveChanges: false,
};

class Dashboard extends React.Component {
  static propTypes = {
    userProfile: PropTypes.object
  };

  state = initialState;

  componentDidMount() {
    this._setFields();
  }

  _setFields = () => {
    this.setState({
      userProfile : {
        ...this.props.userProfile
      }
    })
  };

  fieldsChange = event => {
    this.setState({
      userProfile: {
        ...this.state.userProfile,
        [event.target.name]: event.target.value
      },
    });
  };

  changeTel = event => {
    this.setState({
      userProfile: {
        ...this.state.userProfile,
        tel : {
          ...this.state.userProfile.tel,
          [event.target.name]: event.target.value
        }
      },
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {session_id,id, f_name, p_name, l_name, city, company, delivery, site, tel, trade_format} = this.state.userProfile;
    const telegram = tel.telegram ? 1 : 0;
    const viber = tel.viber ? 1 : 0;
    httpService().getRequest(URLS.changeUserInformation +
      `?user=${id}&f_name=${f_name}&l_name=${l_name}&p_name=${p_name}&tel=${tel.number}&telegram=${telegram}
      &viber=${viber}&site=${site}&city=${city}&company=${company}&trade_format=${trade_format}&delivery=${delivery}&hash=${session_id}`)
      .then(res => {
        if (res && res.user) {
          this.props.dispatch(dashboardChangeUserInformationSuccess(res.user));
          this._saveChangesAnimation();
          toastr.success('Зміни внесено!');
        } else {
          toastr.error('Зміни не внесено!');
        }
      })
  };

  /**
   * saveChangesAnimation
   */
  _saveChangesAnimation = () => {
    this.setState({
      saveChanges : true
    },() => {
      setTimeout(() => {
        this.setState({
          saveChanges : false
        })
      },2000);
    });
  };
  /**
   * saveChangesAnimation
   */

  /**
   * checkbox functionality
   */

  handleChangeCheckbox = name => event => {
    this.setState({
      userProfile : {
        ...this.state.userProfile,
        tel : {
          ...this.state.userProfile.tel,
          [name]: event.target.checked
        }
      }
    });
  };

  /**
   * checkbox functionality
   */

  /**
   * handleChangeSelect functionality
   */

  handleChangeSelect = name => event => {
    this.setState({
      userProfile : {
        ...this.state.userProfile,
        [name]: event.target.value
      }
    });
  };

  /**
   * handleChangeSelect functionality
   */

  _getContent = () => {
    const {
      f_name, l_name,
      p_name, tel,
      mail, company,
      site,
      city,
      delivery,
      trade_format
    } = this.state.userProfile;

    return (
      <form autoComplete="off" method="post" className="shared-form" onSubmit={this.handleSubmit}>
        <div className="shared-form-container">
          <div className="input-container input-container-name">
            <label className="form-label" htmlFor="#f_name">Ім’я:</label>
            <TextField
              autoComplete="off"
              onChange={this.fieldsChange}
              required
              placeholder=">Ім’я"
              value={f_name}
              type="text"
              name="f_name"
              id="f_name"
              className="form-input-wrap"
              InputProps={{
                classes: {
                  root: "form-input",
                  input: "input-style",
                },
              }}/>
          </div>

          <div className="input-container input-container-surName">
            <label className="form-label" htmlFor="#l_name">Прізвище:</label>
            <TextField
              onChange={this.fieldsChange}
              required
              placeholder="Прізвище"
              value={l_name}
              type="text"
              name="l_name"
              id="l_name"
              className="form-input-wrap"
              InputProps={{
                classes: {
                  root: "form-input",
                  input: "input-style",
                },
              }}/>
          </div>

          <div className="input-container input-container-lastName">
            <label className="form-label" htmlFor="#p_name">По-батькові:</label>
            <TextField
              onChange={this.fieldsChange}
              value={p_name}
              placeholder=">По-батькові"
              type="text"
              name="p_name"
              id="p_name"
              className="form-input-wrap"
              InputProps={{
                classes: {
                  root: "form-input",
                  input: "input-style",
                },
              }}/>
          </div>

          <div className="input-container input-container-mobile">
            <label className="form-label" htmlFor="#number">Телефон:</label>
            <TextField
              onChange={this.changeTel}
              required
              value={tel.number}
              placeholder="380"
              type="number"
              name="number"
              id="mobile"
              className="form-input-wrap"
              InputProps={{
                classes: {
                  root: "form-input",
                  input: "input-style",
                },
              }}/>
          </div>

          <div className="input-container input-container-email">
            <label className="form-label" htmlFor="#email">Електронна адреса:</label>
            <TextField
              disabled
              id="email"
              name="mail"
              type="email"
              value={mail}
              className="form-input-wrap"
              onChange={this.fieldsChange}
              placeholder="coffeeman@gmail.com"
              InputProps={{
                classes: {
                  root: "form-input",
                  input: "input-style",
                },
              }}/>
          </div>

          <div className="input-container input-container-nameCompany">
            <label className="form-label" htmlFor="#company">Назва компанії:</label>
            <TextField
              onChange={this.fieldsChange}
              value={company}
              placeholder="lariok.com"
              type="text"
              name="company"
              id="company"
              className="form-input-wrap"
              InputProps={{
                classes: {
                  root: "form-input",
                  input: "input-style",
                },
              }}/>
          </div>

          <div className='input-container input-container-city'>
            <label className="form-label" htmlFor="#city">Місто:</label>
            <TextField
              onChange={this.fieldsChange}
              value={city}
              placeholder="Місто"
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
          </div>

          <div className="input-container input-container-delivery">
            <CustomSelect
              items={delivery.split(",")}
              labelText="Доставка:"
              selectedItem={delivery}
              handleChangeSelect={this.handleChangeSelect("delivery")}
            />
          </div>

          <div className="input-container input-container-tradeFormat">
            <CustomSelect
              items={trade_format.split(",")}
              labelText="Формат торгівлі:"
              selectedItem={trade_format}
              handleChangeSelect={this.handleChangeSelect("trade_format")}
            />
          </div>

          <div className="input-container input-container-sitePage">
            <label className="form-label" htmlFor="#site">Сайт:</label>
            <TextField
              onChange={this.fieldsChange}
              value={site}
              placeholder="LariOK"
              type="text"
              name="site"
              id="site"
              className="form-input-wrap"
              InputProps={{
                classes: {
                  root: "form-input",
                  input: "input-style",
                },
              }}/>
          </div>

          <div className="input-container-telegram-and-viber">
            <p className="telegram-and-viber-title">На вказаному телефоні є:</p>
            <CustomCheckbox
              handleChangeCheckbox={this.handleChangeCheckbox("viber")}
              checked={tel.viber}
              className="viber"
              labelText="Viber"
            />

            <CustomCheckbox
              handleChangeCheckbox={this.handleChangeCheckbox("telegram")}
              checked={tel.telegram}
              className="telegram"
              labelText="Telegram"
            />
          </div>
        </div>

        <div className="button-container">
          <div className={classNames("submit-button-wrap", this.state.saveChanges && "save")}>
            <CheckIcon className="check-icon"/>
            <Button
              className="submit-button text"
              variant="extendedFab"
              aria-label="signUp"
              type="submit">Зберегти зміни</Button>
          </div>
        </div>
      </form>
    );

  };

  render() {
    return (
      <Wrapper>
        <div className="dashboard-page">
          {
            this._getContent()
          }
        </div>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.userProfile,
  };
};

export default connect(mapStateToProps)(userIsAuthenticated((Dashboard)));
