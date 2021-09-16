import colors from "../../../utils/colors"
import{
    formatNumber
} from "../../../utils/formatting"

export const createCentralTitle = (svg, name, innerRadius)=>{
    svg
        .append('g')
        .append('text')
        .append('tspan')
        .attr('class', 'central-title')
        .text(name.toUpperCase())
        .attr("dominant-baseline", 'middle')
        .attr('dy', -innerRadius/1.4)
        .attr('style', `
            font-size: ${innerRadius/5}px;
            stroke-width: 0.5px;
            fill: ${colors.lightGrey};
            stroke: ${colors.lightGrey};
            text-anchor: middle;
            font-weight: lighter;
            letter-spacing: 1px;
        `)
}

export const createCentralData = (svg, innerRadius, total, units)=>{    
    svg
        .append('g')
        .append('text')
        .attr('width', innerRadius*2)
        .attr('height', innerRadius*2)
        .append('tspan')
        .text(formatNumber(total) + (units?units:''))
        .attr("stroke", colors.darkGrey)
        .attr("fill", colors.darkGrey)
        .attr("font-family", 'Arial')
        .attr("text-anchor", 'middle')
        .attr("dominant-baseline", 'middle')
        .attr('font-size', innerRadius/3.2)
        .attr("dy", -innerRadius / 2.75);
}