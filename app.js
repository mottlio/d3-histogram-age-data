// write your code here!
var width = 800;
var height = 600;
var padding = 30;
var barPadding = 1;

var ageData = regionData.filter(d => d.medianAge !== null);

var xScale = d3.scaleLinear()
                .domain(d3.extent(ageData, d => d.medianAge))
                .rangeRound([padding, width - padding]);

var histogram = d3.histogram()
                .domain(xScale.tics())
                .value(d => d.medianAge);

var bins = histogram(ageData);
