const d3 = require('d3');
function drawGraph(data) {
    const testData = [10, 20, 33, 43, 53];
    const w = $('.modal-body').width();
    const h = $(window).height() / 5 * 3;
    let $svg = d3.select('svg')
        .attr('width', w)
        .attr('height', h);

    const lineFun = d3.line();
    lineFun.x()

    $svg.selectAll('rect')
        .data(testData)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * 160)
        .attr('y', d => 100 - d)
        .attr('width', 10)
        .attr('height', d => d);

}

module.exports = drawGraph;