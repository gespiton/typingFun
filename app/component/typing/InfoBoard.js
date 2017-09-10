import * as React from "react";
import {connect} from "react-redux";

const InfoBoard = props => {
  return (
      <div id="wpf-container" className="col-md-1">
        <span id="wpf">
         wpf:
        </span>
        <span id="value">
          {props.wpf}
        </span>
        <span className="btn btn-info" id="chart">
          chart
        </span>
      </div>
  );
};

const mapStateToProps = state => {
  return {
    wpf: state.typeResult.wpf,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  };
};

export default connect(mapStateToProps)(InfoBoard);