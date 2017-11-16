import * as d3 from 'd3';

class Draw {
  constructor() {
    this.firstDraw = true;
    this.padding = 80;
  }

  getColor(correct) {
    if (correct)
      return 'black';
    else
      return 'deeppink';
  }

  draw(data, args) {
    {
      let yMax = d3.max(data, (d) => d.speed);
      if (yMax > 100)
        yMax = 100;

      const width = window.innerWidth
          || document.documentElement.clientWidth
          || document.body.clientWidth;

      const height = window.innerHeight
          || document.documentElement.clientHeight
          || document.body.clientHeight;

      if (this.firstDraw) {
        this.w = args.indicator.offsetWidth;
        this.h = height / 5 * 3;
        this.xScale = d3.scaleLinear()
            .domain([0, data.length])
            .range([this.padding, this.w]);

        this.yScale = d3.scaleLinear()
            .domain([0, yMax])
            .range([this.h - this.padding, this.padding]);

        this.getX = (d, i) => this.xScale(i);
        this.getY = d => this.yScale(d.speed);


        this.lineFun = d3.line().x(this.getX).y(this.getY).curve(d3.curveCatmullRom.alpha(0.5));

        this.$svg = d3.select('svg')
            .attr('width', this.w)
            .attr('height', this.h);

        // draw line
        // $('svg').children().remove(); // remove the old picture
        this.$svg
            .append('path')
            .style("opacity", 0)
            .attr('class', 'line')
            .attr('d', this.lineFun(data))
            .transition()
            .duration(1000)
            .style("opacity", 1);

        // draw dot
        this.$svg
            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', this.getX)
            .attr('cy', this.getY)
            .attr('r', 3)
            .attr('fill', d => this.getColor(d.correct))
            .style("opacity", 0)
            .transition()
            .duration(500)
            .style("opacity", 1);


        // draw label
        this.$svg
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text(d => d.word)
            .attr('x', (d, i) => this.getX(d, i) - d.word.length * 8)
            .attr('y', this.getY)
            .attr('class', 'label')
            .style('fill', 'gray')
            .style('font-size', '15px')
            .style("opacity", 0)
            .transition()
            .duration(500)
            .style("opacity", 1);

        // draw axis
        this.$svg.append('g')
            .attr('id', 'yAxis')
            .attr('font-size', '15px')
            .call(d3.axisLeft(this.yScale).ticks(10))
            .attr('transform', 'translate(30)');
        // this.firstDraw = false;
      }
    }
  }
}

export default Draw;
