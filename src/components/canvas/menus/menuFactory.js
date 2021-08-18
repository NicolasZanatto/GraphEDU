import * as d3 from "d3";
import styles from "./../canvas.module.css";


export const menuFactory = (x, y, menuItems, nodes, links, itemSelecionado, svgId, actions) => {
    console.log("Menu Vertice", nodes);
    console.log("Menu Aresta", links);
    d3.select(`.${styles.contextMenu}`).remove();

    // Draw the menu
    d3.select(svgId)
        .append('g').attr('class', styles.contextMenu)
        .selectAll('tmp')
        .data(menuItems).enter()
        .append('g').attr('class', styles.menuEntry)
        .style({ 'cursor': 'pointer' });

    // Draw menu entries
    d3.selectAll(`.${styles.menuEntry}`)
        .append('rect')
        .attr('x', x)
        .attr('y', (d, i) => { return y + (i * 30); })
        .attr('rx', 2)
        .attr('width', 150)
        .attr('height', 30)
        .on('click', (d) => { d.action(nodes, links, itemSelecionado, actions) });

    d3.selectAll(`.${styles.menuEntry}`)
        .append('text')
        .text((d) => { return d.title; })
        .attr('x', x)
        .attr('y', (d, i) => { return y + (i * 30); })
        .attr('dy', 20)
        .attr('dx', 45)
        .on('click', (d) => { d.action(nodes, links, itemSelecionado, actions) });

    // Other interactions
    d3.select('body')
        .on('click', () => {
            d3.select(`.${styles.contextMenu}`).remove();
        });
}