'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";


class ProgressVisualizer extends Component {
  static defaultProps = {
    records: []
  };

  static propTypes = {
    records: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.bindWrapper = this.bindWrapper.bind(this);
    this.bindSvg = this.bindSvg.bind(this);
    this.state = {
      records: props.records
    };
  }

  componentDidMount() {
    this.draw(this.state.records);
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.records) === JSON.stringify(this.state.records)) return;
    this.setState({records: nextProps.records});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.records !== this.state.records;

  }

  componentDidUpdate() {
    this.draw(this.state.records);
  }

  draw(data) {
    console.log("data", data);
    if (data.length === 0) return;
    let yMax = d3.max(data, d => d.wpf);
    if (yMax > 100)
      yMax = 100;

    const padding = 80;
    const height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

    this.w = this.wrapper.offsetWidth;
    this.h = height / 5 * 3;
    console.log(this.w, this.h);
    const xScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([padding, this.w]);

    const yScale = d3.scaleLinear()
        .domain([0, yMax])
        .range([this.h - padding, padding]);

    const getX = (d, i) => xScale(i);
    const getY = d => yScale(d.wpf);


    this.lineFun = d3.line().x(getX).y(getY).curve(d3.curveCatmullRom.alpha(0.5));
    console.log(this.lineFun(data));

    const svg = d3.select('svg#wpf-graph')
        .attr('width', this.w)
        .attr('height', this.h);

    svg.selectAll('*').remove();

    // draw line
    // $('svg').children().remove(); // remove the old picture
    svg
        .append('path')
        .style("opacity", 0)
        .attr('class', 'line')
        .attr('d', this.lineFun(data))
        .transition()
        .duration(1000)
        .style("opacity", 1);

    // draw dot
    svg
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', getX)
        .attr('cy', getY)
        .attr('r', 3)
        .attr('fill', 'black')
        .style("opacity", 0)
        .transition()
        .duration(500)
        .style("opacity", 1);


    // draw label
    svg
        .selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(d => d.wpf)
        .attr('x', (d, i) => getX(d, i) - d.wpf.toString().length * 8)
        .attr('y', getY)
        .attr('class', 'label')
        .style('fill', 'black')
        .style('font-size', '25px')
        .style("opacity", 0)
        .transition()
        .duration(500)
        .style("opacity", 1);

    // draw axis
    svg.append('g')
        .attr('id', 'yAxis')
        .attr('font-size', '15px')
        .call(d3.axisLeft(yScale).ticks(10))
        .attr('transform', 'translate(30)');
    // this.firstDraw = false;
  }

  bindWrapper(elem) {
    this.wrapper = elem;
  }

  bindSvg(elem) {
    this.svg = elem;
  }

  render() {
    return (
        <div ref={this.bindWrapper}>
          <svg id="wpf-graph" ref={this.bindSvg}/>
        </div>
    );
  }
}

ProgressVisualizer.propTypes = {
  records: PropTypes.array
};

export default ProgressVisualizer;