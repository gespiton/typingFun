import constant from './constants';

function toggleChart(showChart) {
  return {
    type: constant.showChart,
    showChart: showChart
  };
}

export {toggleChart};