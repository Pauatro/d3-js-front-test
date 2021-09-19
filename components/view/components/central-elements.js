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
        .attr('dy', -innerRadius/1.4)
        .attr('style', `
            font-size: ${innerRadius/5}px;
            stroke-width: 0.5px;
            fill: ${colors.lightGrey};
            stroke: ${colors.lightGrey};
            text-anchor: middle;
            dominant-baseline: middle;
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
        .attr("dy", -innerRadius / 2.75)
        .attr('style', `
            font-size: ${innerRadius/3.2}px;
            text-anchor: middle;
            dominant-baseline: middle;
            stroke-width: 0.7px;
            fill: ${colors.darkGrey};
            stroke: ${colors.darkGrey};
        `)
}