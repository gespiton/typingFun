import MyModal from '../common/modal/Modal';
import React, {Component} from "react";
import parser from './lib/typeDataParser';
import Drawer from './lib/graph';
import {connect} from "react-redux";
import {toggleChart} from "../../redux/actions/stageStatus";
import PropTypes from 'prop-types';

class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.drawer = new Drawer();
    this.beforeHiding = this.beforeHiding.bind(this);
    this.state = props;
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
    this.state.hideChart();
  }

  hide() {
    this.beforeHiding();
    this.modal.hide();
  }

  refreshData(data) {
    const res = parser(data);
    console.log(res);
    this.drawer.draw(
        res,
        {
          indicator: this.indicator,
          svg: this.indicator
        }
    );
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
}

Visualizer.contextTypes = {store: PropTypes.object};

const mapStateToProps = state => {
  return {
    showChart: state.stageState.showChart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideChart: () => {
      dispatch(toggleChart(false));
    }
  };

};
export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(Visualizer);
