let d3 = require('d3');
// require('d3-selection-multi');
function Draw() {
    function Draw() {
        this.firstDraw = true;
        this.draw = this.draw.bind(this);
    }

    Draw.prototype.draw = function (data, textArr) {
        {
            console.log(data);
            // const w = $(window).width() / 3 * 2;
            if (this.firstDraw) {
                this.w = $('#indicator').width();
                this.h = $(window).height() / 5 * 3;

                this.$svg = d3.select('svg')
                    .attr('width', this.w)
                    .attr('height', this.h)
            }


            d3.scaleLinear().range([this.h, 0])
                .domain([d3.min(data), d3.max(data)], (d, i) => data[i]);


            const yMin = d3.min(data, (d) => d.speed);
            const yRange = d3.max(data, (d) => d.speed) - yMin;
            const xOffset = 20;
            const yOffset = 20;

            const getX = (d, i) => (this.w - xOffset - 10) / (data.length - 1) * i + xOffset;
            const getY = (d, i) => this.h - (d.speed - yMin) / yRange * (this.h - yOffset - 10) - yOffset;
            const lineFun = d3.line()
                .x(getX)
                .y(getY);


            console.log(this.h);

            // draw line
            $('svg').children().remove(); // remove the old picture
            this.$svg
                .append('path')
                .attr('class', 'line')
                .attr('d', lineFun(data));

            // draw dot
            this.$svg
                .selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', getX)
                .attr('cy', getY)
                .attr('r', 5);

            const getColor = (correct) => {
                if (correct)
                    return 'green';
                else
                    return 'red';
            };
            // draw label
            this.$svg
                .selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .text(d => d.text)
                .attr('x', (d, i) => getX(d, i) - d.text.length * 10)
                .attr('y', getY)
                .style('fill', (d) => getColor(d.correct))
                .style('font-size', '10px');

            this.firstDraw = false;
        }

    };
    return new Draw();
}
module.exports = Draw();
module.hot.accept();