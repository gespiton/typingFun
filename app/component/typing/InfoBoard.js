import * as React from "react";
import {connect} from "react-redux";
import {toggleChart} from "../../redux/actions/stageStatus";
// import {dispatch} from "redux";

const InfoBoard = props => {
  return (
      <div id="wpf-container" className="col-md-1">
        <span id="wpf">
         wpf:
        </span>
        <span id="value">
          {props.wpf}
        </span>
        <span className="btn btn-info" id="chart"
              onClick={
                function () {
                  props.toggleChart(true);
                }
              }
        >
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

const mapDispatchToProps = (dispatch) => {
  return {
    toggleChart: showIt => {
      dispatch(toggleChart(showIt));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoBoard);