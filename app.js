// write your code here!
var width = 800;
var height = 600;
var padding = 30;
var barPadding = 1;

//filter the data chosing only complete observations
var ageData = regionData.filter(d => d.medianAge !== null);

var xScale = d3.scaleLinear()
                .domain(d3.extent(ageData, d => d.medianAge))
                .rangeRound([padding, width - padding]);

var histogram = d3.histogram()
                .domain(xScale.ticks())
                .value(d => d.medianAge);

var bins = histogram(ageData);

var yScale = d3.scaleLinear()
                .domain([0, d3.max(bins, d => d.length)])
                .range([height - padding, padding]);

var svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height);


svg.append("g")
    .attr("transform", "translate(0, " + (height - padding) + ")")
    .classed("x-axis", true)
    .call(d3.axisBottom(xScale));

svg.append("g")
    .attr("transform", "translate(" + padding + ", 0)")
    .classed("y-axis", true)
    .call(d3.axisLeft(yScale));

svg.append("text")
    .attr("x", width/2)
    .attr("y", height - 10)
    .style("text-anchor", "middle")
    .text("Median Age")

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .style("text-anchor", "middle")
    .text("Frequency");

svg.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("height", d => height - padding - yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0) - barPadding)
        .attr("fill", "blue");

