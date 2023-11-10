import React from 'react';
import PropTypes from 'prop-types';
import {Select, MenuItem, withStyles, InputLabel, FormControl} from '@material-ui/core';

const styles = {
  root: {
    '&$selected': {
      color: '#fff',
      backgroundColor: '#78ae59',
    },
  },

  selected: {},
};

class CustomSelect extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    placeholder: PropTypes.bool,
    labelText: PropTypes.string,
    requiredFiled: PropTypes.bool,
    selectedItem: PropTypes.any,
    weightLength: PropTypes.number,
    handleChangeSelect: PropTypes.func,
    resetSelectItems: PropTypes.func,
    countTheSelectedItem: PropTypes.bool,
  };

  static defaultProps = {
    placeholder: false,
    countTheSelectedItem: false,
  };

  state = {
    openSelect: false,
  };

  _getSelectItems = (items = []) => items.map((item, key) => {
    return <MenuItem
      key={key}
      classes={{
        root: this.props.classes.root,
        selected: this.props.classes.selected,
      }}
      className='filter-item'
      value={item}> {item} </MenuItem>;
  });

  handleOpenSelect = () => {
    this.setState({openSelect: true});
  };

  handleCloseSelect = () => {
    this.setState({openSelect: false});
  };

  render() {
    const {
      items,
      selectedItem,
      labelText,
      requiredFiled,
      placeholder,
      handleChangeSelect,
    } = this.props;

    const {openSelect} = this.state;

    return (
      <div className="custom-filter">

        {
          !placeholder && labelText &&
          <InputLabel
            className="filter-label animate-label"
            htmlFor={'#' + labelText}>
            {labelText}
            {
              requiredFiled && <sup className='required-field'>*</sup>
            }
          </InputLabel>
        }

        <FormControl className="select-container">

          <Select
            displayEmpty
            id={labelText}
            open={openSelect}
            title={selectedItem}
            value={selectedItem}
            aria-haspopup="true"
            className="filter-select"
            onChange={handleChangeSelect}
            onOpen={this.handleOpenSelect}
            onClose={this.handleCloseSelect}
            MenuProps={{className: 'filter-ul'}}
            SelectDisplayProps={{className: "select-label"}}
          >
            {
              placeholder &&
              <MenuItem
                disabled
                classes={{
                  root: this.props.classes.root,
                  selected: this.props.classes.selected,
                }}
                className='filter-item disabled-label'
                value="">{labelText}</MenuItem>
            }
            {
              this._getSelectItems(items)
            }
          </Select>
        </FormControl>

      </div>
    );
  }
}

export default withStyles(styles)(CustomSelect)
