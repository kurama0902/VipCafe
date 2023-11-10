import React from 'react';
import PropTypes from 'prop-types';
import DrawComponent from "./draw/Draw.component";
import connect from 'react-redux/es/connect/connect';
import AppBarComponent from "./appBar/AppBar.component";

class Wrapper extends React.Component {
  static propTypes = {
    auth: PropTypes.bool,
  };

  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  handleDrawerClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <div className='wrapper'>

        <AppBarComponent
          open={this.state.open}
          handleDrawerOpen={this.handleDrawerOpen}
        />

        <DrawComponent
          auth={this.props.auth}
          open={this.state.open}
          handleDrawerOpen={this.handleDrawerOpen}
          handleDrawerClose={this.handleDrawerClose}
        />

        <main className="content">
          {this.props.children}
        </main>

        <img src="/img/clover.png" alt="clever" className="clever-img"/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.isAuthorized,
  };
};

export default connect(mapStateToProps)(Wrapper);
