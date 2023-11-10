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

class MultiSelect extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    multiple: PropTypes.bool,
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
      weightLength,
      resetSelectItems,
      placeholder,
      handleChangeSelect,
    } = this.props;

    const {openSelect} = this.state;

    return (
      <div className="custom-filter">

        {
          !placeholder && labelText &&
          <InputLabel
            className="multi-input-label"
            htmlFor={'#' + labelText}>
            {labelText + ` (${selectedItem.length})`}
            {
              requiredFiled && <sup className='required-field'>*</sup>
            }
          </InputLabel>
        }

        <FormControl className="select-container multi-select">

          <Select
            multiple
            displayEmpty
            id={labelText}
            open={openSelect}
            title={selectedItem}
            value={selectedItem}
            aria-haspopup="true"
            className="filter-select"
            data-label={labelText}
            onChange={handleChangeSelect}
            onOpen={this.handleOpenSelect}
            onClose={this.handleCloseSelect}
            MenuProps={{className: 'filter-ul'}}
            renderValue={selected => selected.join(', ')}
            SelectDisplayProps={{className: "select-label"}}
          >
            {
              this.props.countTheSelectedItem &&
              <li className="count-select-item-wrap">
                <span className="count-select-item">count : {weightLength}</span>
                <button onClick={resetSelectItems} className="clear-select-item">очистити</button>
              </li>
            }


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

export default withStyles(styles)(MultiSelect);
