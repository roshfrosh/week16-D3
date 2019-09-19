// @TODO: YOUR CODE HERE!
//width and height parameters 
var width = 900;
var height = 700;

//svg margins 
var margin = {
  top: 50,
  right: 50,
  bottom: 90,
  left: 100
};

//width and height based svg margins to fit in the canvas
var width1 = width - margin.left - margin.right;
var height1 = height - margin.top - margin.bottom;

// Create canvas 
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Create the chart that will contain the data
var chart1 = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data and call function to pass the data.
d3.csv("assets/data/data.csv").then(x, y);

//errorhandling
function y(error) {
  throw err;
}

function x(z) {

  // Loop through and pass argument
  z.map(function (data) {
    data.income = +data.income;
    data.smokes = +data.smokes;
  });
  // Create the domain and range functions
  var xscale = d3.scaleLinear()
    .domain([35000, d3.max(z, d => d.income)])
    .range([0, width1]);
  var yscale = d3.scaleLinear()
    .domain([8, d3.max(z, d => d.smokes)])
    .range([height1, 0]);
  // Axis functions and assign ticks
  var xAxis = d3.axisBottom(xscale).ticks(8)
  var yAxis = d3.axisLeft(yscale).ticks(8);
  // Append the axes to the chart group 
  chart1.append("g")
    .attr("transform", `translate(0, ${height1})`)
    .call(xAxis);
  chart1.append("g")
    .call(yAxis);
  //Scatter plot
  var circles = chart1.selectAll("circle")
    .data(z)
    .enter()
    .append("circle")
    .attr("cx", d => xscale(d.income))
    .attr("cy", d => yscale(d.smokes))
    .attr("r", "13")
    .attr("fill", "#788dc2")
    .attr("opacity", ".75")
  // Add text to data circles 
  var circles = chart1.selectAll()
    .data(z)
    .enter()
    .append("text")
    .attr("x", d => xscale(d.income))
    .attr("y", d => yscale(d.smokes))
    .style("font-size", "13px")
    .style("text-anchor", "middle")
    .style('fill', 'white')
    .text(d => (d.abbr));
  // Set up tooltip
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function (d) {
      return (`${d.state}<br>Income: ${d.income}<br>Smokes: ${d.smokes}% `);
    });
  chart1.call(toolTip);
  circles.on("mouseover", function (data) {
    toolTip.show(data, this);
  })
    .on("mouseout", function (data) {
      toolTip.hide(data);
    });

  // Create axes labels
  chart1.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height1 / 2))
    .attr("padding", "1em")
    .attr("class", "axisText")
    .text("Smokes (%)");

  chart1.append("text")
    .attr("transform", `translate(${width1 / 2}, ${height1 + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Income (Median)");
}
