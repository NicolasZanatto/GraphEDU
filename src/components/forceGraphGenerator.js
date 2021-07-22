import * as d3 from "d3";
import data from "../data/data.json";

import "@fortawesome/fontawesome-free/css/all.min.css";

export function runForceGraph(
  container) {
  var links = data.links.map((d) => Object.assign({}, d));
  var nodes = data.nodes.map((d) => Object.assign({}, d));
  var id = 25;

  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;

  const color = () => { return "#000"; };
  const drag = (simulation) => {
    const dragstarted = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = (d) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };

    const dragended = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };

 
  const addNode = 
    () => {
      console.log('event', d3.event);
      if (d3.event.button === 0) {
        var x = d3.event.pageX;
        var y = d3.event.pageY;
        var newVertice = { gender: "male",
                              id: id,
                              index: 0,
                              name: "Andy",
                              x: x,
                              y: y };
        nodes = nodes.concat(newVertice);
        console.log(nodes,nodes);
        restart();
        id++;
      }
    }

  const simulation = d3
    .forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-150))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .on("mousedown", () => {
      addNode();
    })
    .call(d3.zoom().on("zoom", function () {
      svg.attr("transform", d3.event.transform);
    }))
    

  var link = svg
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", d => Math.sqrt(d.value));


  var vertices =  svg.append("g").selectAll(".vertex");
  // var vertices = svg
  //   .append("g")
  //   .attr("stroke", "#fff")
  //   .attr("stroke-width", 2)
  //   .selectAll("circle")
  //   .data(nodes)
  //   .join("circle")
  //   .attr("r", 12)
  //   .attr("fill", color)
  //   .attr("class", "node")
  //   .call(drag(simulation));

  simulation.on("tick", () => {
    //update link positions
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    // update node positions
    // vertices
    //   .attr("cx", d => d.x)
    //   .attr("cy", d => d.y);
    vertices.attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
  });


  function restart() {
    console.log("restart");
    //vertices are known by id
    vertices = vertices.data(nodes, function(d) {
      return d.id;
    });

    vertices.exit().remove();
  
    vertices.selectAll("text").text(function(d) {
      return d.id;
    });



  var g = vertices
    .enter()
    .append("g")
    .attr("class", "vertex")
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .call(drag(simulation));

  g.append("circle")
    .attr("r", 12)
    .attr("fill", color)
    .attr("class", "node")
    
  g.append("text")
    .attr("x", -3)
    .attr("y", 3)
    .text(function(d) {
      return d.id;
    });

  vertices = g.merge(vertices);






    

    // var ve = vertices.enter()
    //   .append("circle")
    //   .attr("r", 12)
    //   .attr("fill", color)
    //   .attr("class", "node")
    //   .call(drag(simulation));

    //   ve.append("text")
    //   .attr("x", 0)
    //   .attr("y", 4)
    //   .style('fill', 'darkOrange')
    //   .text(function(d) {
    //     return d.id;
    //   });

    // vertices = ve.merge(vertices);
    

    simulation.nodes(nodes);
    simulation.alpha(0.8).restart();
  }

  restart();

  return {
    destroy: () => {
      simulation.stop();
    },
    nodes: () => {
      return svg.node();
    }
  };
}
