let d3 = require('d3');
// require('d3-selection-multi');
function Draw() {
    function Draw() {
        this.firstDraw = true;
        this.draw = this.draw.bind(this);
    }

    Draw.prototype.draw = function (data, textArr) {
        {
            console.log(JSON.stringify(data));
            // const w = $(window).width() / 3 * 2;
            if (this.firstDraw) {
                this.w = $('#indicator').width();
                this.h = $(window).height() / 5 * 3;

                this.$svg = d3.select('svg')
                    .attr('width', this.w)
                    .attr('height', this.h)
            }

            let yMax = d3.max(data, (d) => d.speed);
            if (yMax > 100)
                yMax = 100;
            const padding = 80;

            const xScale = d3.scaleLinear()
                .domain([0, data.length])
                .range([padding, this.w]);

            const yScale = d3.scaleLinear()
                .domain([0, yMax])
                .range([this.h - padding, padding]);

            const getX = (d, i) => xScale(i);
            const getY = d => yScale(d.speed);

            const lineFun = d3.line().x(getX).y(getY).curve(d3.curveCatmullRom.alpha(0.5));

            const getColor = (correct) => {
                if (correct)
                    return 'black';
                else
                    return 'deeppink';
            };

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
                .attr('r', 3)
                .attr('fill', d => getColor(d.correct));


            // draw label
            this.$svg
                .selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .text(d => d.text)
                .attr('x', (d, i) => getX(d, i) - d.text.length * 8)
                .attr('y', getY)
                .style('fill', 'gray')
                .style('font-size', '10px');

            // draw axis
            this.$svg.append('g')
                .call(d3.axisLeft(yScale).ticks(10))
                .attr('transform', 'translate(30)');
            this.firstDraw = false;
        }

    };
    return new Draw();
}
module.exports = Draw();
