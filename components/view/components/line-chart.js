import * as d3 from 'd3'
import colors from "../../../utils/colors"

export default (svg, innerRadius, timeLine, colorPosition) => {

    const graphPath = timeLine.map((y, i, timeLine)=>{
        const x = Math.round((innerRadius/timeLine.length)*(i+1))
        return [x, y]
    })

    const [ ymin, ymax ] = d3.extent(timeLine)
    const yAreaBottom = ymin-(ymax-ymin)*1.5

    const lineChart = svg
        .append("g")
        .attr("transform", "translate(" + -innerRadius*1.2 + "," +  "2" + ")");
        
    const lineX = d3.scaleLinear()
        .domain([0, innerRadius/12])
        .range([-innerRadius/11, innerRadius/11])

    const lineY = d3.scaleLinear()
        .domain([ ymin, ymax ])
        .range([innerRadius/7, -innerRadius/7])
    
    const line = d3.area()
        .x(d => lineX(d[0]))
        .y1(d => lineY(d[1]))
        .y0(lineY(yAreaBottom))
        .curve(d3.curveMonotoneX)

    return lineChart
        .append("path")
        .attr("d", line(graphPath))
        .attr("stroke", colors.palettes[colorPosition][1])
        .attr("stroke-width", 1)
        .attr("fill", colors.palettes[colorPosition][1])
        .attr('fill-opacity', 0.2)
}