import React from 'react';
import PropTypes from 'prop-types';
import {FormControlLabel,Checkbox, withStyles} from '@material-ui/core';

const styles = {
  checked: {},

  checkbox: {
    color: '#fff',
    borderRadius: '2px',
    backgroundColor: '#fff',

    '&$checked': {
      backgroundColor: 'green',
      borderRadius: '2px',
      color: '#fff',
    },

    '&:hover': {
      backgroundColor: '#fff',
      borderRadius: '2px',
      color: '#fff',
    },

    width: 20,
    height: 20,
  },

  sizeIcon: {
    fontSize: 20,
  }
};

function CustomCheckbox(props) {
  return (
    <FormControlLabel
      className={`checkbox-label ${props.className}`}
      control={
        <Checkbox
          checked={props.checked}
          onChange={props.handleChangeCheckbox}
          classes={{
            root: props.classes.checkbox,
            checked: props.classes.checked,
          }}
        />
      }
      label={props.labelText}
      classes={{
        label: 'label',
      }}
    />
  )
}

CustomCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChangeCheckbox: PropTypes.func,
  className: PropTypes.string,
  labelText: PropTypes.string,
  checked: PropTypes.bool
};

export default withStyles(styles)(CustomCheckbox);