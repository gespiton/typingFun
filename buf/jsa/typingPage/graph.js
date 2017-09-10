let d3 = require('d3');
// require('d3-selection-multi');
function Draw() {
  class Draw {
    constructor() {
      this.firstDraw = true;
      // this.draw = this.draw.bind(this);
      this.padding = 80;
    }
    getColor(correct) {
      if (correct)
        return 'black';
      else
        return 'deeppink';
    };

    draw(data, textArr) {
      {
        console.log(JSON.stringify(data));
        // const w = $(window).width() / 3 * 2;
        let yMax = d3.max(data, (d) => d.speed);
        if (yMax > 100)
          yMax = 100;
        // const padding = 80;

        // let xScale;
        //
        // let yScale;

        // const getX = (d, i) => xScale(i);
        // const getY = d => yScale(d.speed);

        // const lineFun = d3.line().x(getX).y(getY).curve(d3.curveCatmullRom.alpha(0.5));

        if (this.firstDraw) {
          this.w = $('#indicator').width();
          this.h = $(window).height() / 5 * 3;
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
            .text(d => d.text)
            .attr('x', (d, i) => this.getX(d, i) - d.text.length * 8)
            .attr('y', this.getY)
            .attr('class', 'label')
            .style('fill', 'gray')
            .style('font-size', '10px')
            .style("opacity", 0)
            .transition()
            .duration(500)
            .style("opacity", 1);

          // draw axis
          this.$svg.append('g')
            .attr('id', 'yAxis')
            .call(d3.axisLeft(this.yScale).ticks(10))
            .attr('transform', 'translate(30)');
          this.firstDraw = false;
        }
        else {
          this.xScale = d3.scaleLinear()
            .domain([0, data.length])
            .range([this.padding, this.w]);

          this.yScale = d3.scaleLinear()
            .domain([0, yMax])
            .range([this.h - this.padding, this.padding]);


          // update & draw line
          this.$svg
            .select('path')
            .attr('d', this.lineFun(data))
            .style("opacity", 0)
            .transition()
            .duration(1000)
            .style("opacity", 1);

          // update & draw dot
          const circles = this.$svg.selectAll('circle').data(data);

          circles.transition()
            .duration(500)
            .attr('cx', this.getX)
            .attr('cy', this.getY);

          circles.enter()
            .append('circle')
            .attr('cx', this.getX)
            .attr('cy', this.getY)
            .attr('fill', d => this.getColor(d.correct))
            .attr('r', 3)
            .style("opacity", 0)
            .transition()
            .duration(1000)
            .style("opacity", 1);


          // update label
          const lables = this.$svg.selectAll('text.label').data(data);
          lables
            .transition()
            .duration(500)
            .attr('x', (d, i) => this.getX(d, i) - d.text.length * 8)
            .attr('y', this.getY);

          lables.enter()
            .append('text')
            .text(d => {
              console.log('fuck');
              return d.text
            })
            .attr('x', (d, i) => this.getX(d, i) - d.text.length * 8)
            .attr('y', this.getY)
            .attr('class', 'label')
            .style('fill', 'gray')
            .style('font-size', '10px')
            .style("opacity", 0)
            .transition()
            .duration(1000)
            .style("opacity", 1);

          // update axis
          $('#yAxis').remove();
          this.$svg.append('g')
            .attr('id', 'yAxis')
            .call(d3.axisLeft(this.yScale).ticks(10))
            .attr('transform', 'translate(30)');
        }
      }


    };
  }

  return new Draw();
}
module.exports = Draw();
