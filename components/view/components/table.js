import colors from "../../../utils/colors"
import{
    capitalizeFirstLetter,
    formatNumber
} from "../../../utils/formatting"

export default (svg, containerWidth, containerHeight, innerRadius, outerRadius, grouped, units, colorPosition)=>{

    const bottomTable = svg
        .append("svg:foreignObject")
        .attr('width', containerWidth)
        .attr('height', containerHeight/4)  
        .attr('transform', `translate(${-containerWidth/2}, ${outerRadius/1.5})`)
        .append('xhtml:div')     
        .attr('class', 'table-container')
        .attr('style',`
            width: ${containerWidth}px;
            height: ${containerHeight/4}px;
            display: flex;
            align-items: flex-start;
            justify-content: center;
        `)
        .append('table')
        .attr('style',`
            width: ${containerWidth*0.75}px;
        `)

    const columnWidth = 100/grouped.length + '%'

    bottomTable
        .append('thead')
        .attr('class', 'table-header')
        .append("tr")
        .selectAll("th")
        .data(grouped)
        .enter()
        .append("th")
        .text(d=>capitalizeFirstLetter(d.group))
        .attr('style', (d,y)=>`
            width: ${columnWidth};
            text-align: ${y!==grouped.length-1?'left':'right'};
            color: ${colors.palettes[colorPosition][y]};
            font-size: ${innerRadius/6}px;
        `)
        
    bottomTable
        .append('tbody')
        .append("tr")
        .selectAll("tr")
        .data(grouped)
        .enter()
        .append("td")
        .attr('class', 'table-body')
        .attr('align', (d,y)=>y!==grouped.length-1?'left':'right')
        .attr('style', `
            width: ${columnWidth};
            padding-top: 0px;
            padding-bottom: 0px;
            margin: 0px;
            border-spacing: 0px;
        `)
        .append("td")
        .attr('class', 'table-body-left')
        .text(d=>d.perc + '%')
        .attr('align', (d,i)=>i!==grouped.length-1?'left':'right')
        .attr('style', ` 
            font-size: ${innerRadius/6}px; 
            padding-right: 10px;
        `)
        .clone()
        .attr('class', 'table-body-right')
        .text(d=>formatNumber(d.total) + (units?units:''))
        .attr('style', ` 
            font-size: ${innerRadius/6}px; 
            color: ${colors.lightGrey};        
        `)
}