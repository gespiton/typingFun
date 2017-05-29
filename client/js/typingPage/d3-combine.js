const array = require("d3-array");
const scale = require("d3-scale");
const selection = require("d3-selection");
const transition = require("d3-transition");
import "d3-selection-multi";

module.exports =
    Object.assign({},
        array,
        scale,
        selection,
        transition
    );