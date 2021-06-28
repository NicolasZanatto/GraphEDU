import * as d3 from "d3";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./forceGraph.module.css";

export function runForceGraph(
  container,
  linksData,
  nodes,
  handleSetNodes,
  nodeHoverTooltip
) {
  const links = linksData.map((d) => Object.assign({}, d));
  // var nodes = nodesData.map((d) => Object.assign({}, d));

  console.log(links, links);
  console.log(nodes, nodes);

  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;

  const color = () => { return "#000"; };

  // const icon = (d) => {
  //   return d.Id === "male" ? "\uf222" : "\uf221";
  // }

  // const getClass = (d) => {
  //   return d.gender === "male" ? styles.male : styles.female;
  // };

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

  // Add the tooltip element to the graph
  const tooltip = document.querySelector("#graph-tooltip");
  if (!tooltip) {
    const tooltipDiv = document.createElement("div");
    tooltipDiv.classList.add(styles.tooltip);
    tooltipDiv.style.opacity = "0";
    tooltipDiv.id = "graph-tooltip";
    document.body.appendChild(tooltipDiv);
  }
  const div = d3.select("#graph-tooltip");

  const addTooltip = (hoverTooltip, d, x, y) => {
    div
      .transition()
      .duration(200)
      .style("opacity", 0.9);
    div
      .html(hoverTooltip(d))
      .style("left", `${x}px`)
      .style("top", `${y - 28}px`);
  };

  const removeTooltip = () => {
    div
      .transition()
      .duration(200)
      .style("opacity", 0);
  };
  var id = 25;
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
        handleSetNodes({Node: newVertice});
        nodes.concat(newVertice);
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

  var node = svg
    .append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 12)
    .attr("fill", color)
    .call(drag(simulation));

  const label = svg.append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr('text-anchor', 'middle')
    .attr('fill', '#fff')
    .attr('dominant-baseline', 'central')
    // .attr("class", d => `fa ${getClass(d)}`)
    .text(d => {return d.id})
    .call(drag(simulation));

  // label.on("mouseover", (d) => {
  //   addTooltip(nodeHoverTooltip, d, d3.event.pageX, d3.event.pageY);
  // })
  //   .on("mouseout", () => {
  //     removeTooltip();
  //   });

  simulation.on("tick", () => {
    //update link positions
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    // update node positions
    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    // update label positions
    label
      .attr("x", d => { return d.x; })
      .attr("y", d => { return d.y; })
  });


  function restart() {
    link.exit().remove();
  
    var ed = link
      .enter()
      .append("line")
      .attr("class", "edge")
      .on("mousedown", function() {
        d3.event.stopPropagation();
      });
  
    ed.append("title").text(function(d) {
      return "v" + d.source.id + "-v" + d.target.id;
    });
  
    link = ed.merge(link);
  
    //vertices are known by id
    node = node.data(nodes, function(d) {
      return d.id;
    });
    node.exit().remove();
  
    console.log(nodes,nodes);

    var ve = node
      .enter()
      .append("circle")
      .attr("r", 15)
      .attr("class", "vertex")

  
    ve.append("title").text(function(d) {
      return "v" + d.id;
    });
  
    node = ve.merge(node);
  
    simulation.nodes(nodes);
    simulation.force("link").links(links);
    simulation.alpha(0.8).restart();
  }

  return {
    destroy: () => {
      simulation.stop();
    },
    nodes: () => {
      return svg.node();
    }
  };
}
