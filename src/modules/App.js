import React from 'react';
import PropTypes from 'prop-types';
import {Switch} from 'react-router';
import ReduxToastr from 'react-redux-toastr';
import {ConnectedRouter} from 'react-router-redux';
import {generateRoutes, MAIN_ROUTES} from '../core';
import connect from 'react-redux/es/connect/connect';

class App extends React.Component {
  static propTypes = {
    auth: PropTypes.bool,
    history: PropTypes.object
  };

  render() {
    return (
      <div className="app">
        <ConnectedRouter history={this.props.history}>
          <Switch>
            {generateRoutes(MAIN_ROUTES)}
          </Switch>
        </ConnectedRouter>
        <ReduxToastr
          preventDuplicates
          position="top-right"
          transitionIn="bounceInDown"
          transitionOut="bounceOutUp"
          timeOut={2000}
          progressBar/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.isAuthorized,
  };
};

export default connect(mapStateToProps)(App);
