import * as d3 from 'd3'
import colors from "../../../utils/colors"

export default (svg, innerRadius, outerRadius, containerHeight, grouped, colorPosition)=>{
    const pie = d3.pie()
        .sort(null)
        .value(d => d.total)
    
    const marginsPie = d3.pie()
            .padAngle(.025)
            .value(d => d)

    const pieChart = svg
        .append("g")
        .attr("transform", "translate(" + 0 + "," + -containerHeight / 10 + ")");
    
    pieChart
        .selectAll('arc')
        .data(pie(grouped))
        .enter()    
        .append('path') 
        .attr('d', d3.arc()
            .innerRadius(innerRadius)       
            .outerRadius(outerRadius)
        )
        .attr('fill', (d,y)=>colors.palettes[colorPosition][y])
    
    // Creates internal and external margins of the pie chart, which cover the line chart
    // Also includes the 4 grey spots in each quarter of the pie.

    pieChart
        .selectAll('arcinternalgreymargin')
        .data(marginsPie([1]))
        .enter()
        .append('path') 
        .attr('d', d3.arc()
            .innerRadius(innerRadius-innerRadius/28)       
            .outerRadius(innerRadius)
        )
        .attr('fill', colors.lightGrey)

    pieChart
        .selectAll('arcinternalwhitemargin')
        .data(marginsPie([1,1,1,1]))
        .enter()
        .append('path') 
        .attr('d', d3.arc()
            .innerRadius(innerRadius-innerRadius/15)       
            .outerRadius(innerRadius)
        )
        .attr('fill', 'white')

    pieChart
        .selectAll('arcexternalmargin')
        .data(marginsPie([1]))
        .enter()
        .append('path') 
        .attr('d', d3.arc()
            .innerRadius(outerRadius)       
            .outerRadius(outerRadius + innerRadius)
        )
        .attr('fill', 'white')
}