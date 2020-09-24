// https://observablehq.com/@d3/bubble-chart
```
let Ve = 0
let DOM = {
    uid: function (foo) {
        return {
            id: `O-${foo}${++Ve}`,
            href: new URL(`#${foo}`, location) + ""
        }
    }
}
let data = [
    {
        'name': 'flare',
        'title': 'flare',
        'value': 40
    }, {
        'name': 'analytics',
        'title': 'flare/analytics',
        'group': 'analytics',
        'value': 10
    }, {
        'name': 'cluster',
        'title': 'flare/analytics/cluster',
        'group': 'analytics',
        'value': 20
    }];
let color = d3.scaleOrdinal(data.map(d => d.group), d3.schemeCategory10);
let format = d3.format(',d');
let width = 559;
let height = 367;
let pack = data => d3.pack()
    .size([width - 2, height - 2])
    .padding(3)
    (d3.hierarchy({ children: data }).sum(d => d.value));
function init () {
    const root = pack(data);

    const svg = d3.create('svg')
        .attr('viewBox', [0, 0, width, height])
        .attr('font-size', 10)
        .attr('font-family', 'sans-serif')
        .attr('text-anchor', 'middle');

    const leaf = svg.selectAll('g')
        .data(root.leaves())
        .join('g')
        .attr('transform', d => `translate(${d.x + 1},${d.y + 1})`);

    leaf.append('circle')
        .attr('id', d => (d.leafUid = DOM.uid('leaf')).id)
        .attr('r', d => d.r)
        .attr('fill-opacity', 0.7)
        .attr('fill', d => color(d.data.group));

    leaf.append('clipPath')
        .attr('id', d => (d.clipUid = DOM.uid('clip')).id)
        .append('use')
        .attr('xlink:href', d => d.leafUid.href);

    leaf.append('text')
        .attr('clip-path', d => d.clipUid)
        .selectAll('tspan')
        .data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
        .join('tspan')
        .attr('x', 0)
        .attr('y', (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
        .text(d => d);

    leaf.append('title')
        .text(d => `${d.data.title === undefined ? '' : `${d.data.title}
`}${format(d.value)}`);
    return svg.node();
}
```
