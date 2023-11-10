import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import CircularProgress from '@material-ui/core/CircularProgress';

export function Progress(props) {
    return (
        <div className={classnames("loader", props.globalProgress && "global-loader")}>
            {
                props.anotherColor
                ? <CircularProgress style={{color : yellow[900]}}/>
                : <CircularProgress style={{color : green[500]}}/>
            }
        </div>
    )
}

Progress.propTypes = {
  globalProgress : PropTypes.bool,
  anotherColor : PropTypes.bool
};

Progress.defaultProps = {
 globalProgress : true
};
