import MyModal from '../common/modal/Modal';
import React from "react";
import parser from './lib/typeDataParser';
import Drawer from './lib/graph';
import {connect} from "react-redux";
import {toggleChart} from "../../redux/actions/stageStatus";

class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    console.log('showChart: ', props.showChart);
    this.drawer = new Drawer();
  }

  render() {
    return (
        <MyModal ref={elem => this.modal = elem} beforeHiding={this.beforeHiding}>
          <h2 className="">typing result</h2>
          <div id="indicator" ref={elem => this.indicator = elem}/>
          <svg ref={elem => this.svg = elem}/>
        </MyModal>
    );
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.showChart) {
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    this.modal.show();
    setTimeout(() => this.refreshData(this.context.store.getState().typeResult), 0);
  }

  beforeHiding() {
    console.log("before hiding");
    this.hideChart();
  }

  hide() {
    this.beforeHiding();
    this.modal.hide();
  }

  refreshData(data) {
    const res = parser(data);
    this.drawer.draw(
        res,
        {
          indicator: this.indicator,
          svg: this.indicator
        }
    );
  }
}

Visualizer.contextTypes = {store: React.PropTypes.object};

const mapStateToProps = state => {
  return {showChart: state.stageState.showChart};
};

const mapDispatchToProps = dispatch => {
  return {
    hideChart: () => {
      console.log("inside hide chart: ", this);
      dispatch(toggleChart(false));
    }
  };

};
export default connect(mapStateToProps, null, null, {withRef: true})(Visualizer);