import * as d3 from 'd3'
import { data } from "./data/view-data.json"
import colors from "./utils/colors"
import{
    capitalizeFirstLetter,
    formatNumber
} from "./utils/formatting"

const target = document.getElementById("target")

//Viewlist
const viewList = document.createElement('div')
viewList.className = 'view-list'
target.appendChild(viewList)


data.dataSeries.forEach((dataElement, i)=>{
    const { grouped: pieData, timeLine, name, total, units } = dataElement

    //ViewContainer
    const viewContainer = document.createElement('div')
    viewContainer.className = 'view-container'
    viewList.appendChild(viewContainer)

    //View
    const d3Container = d3.selectAll(".view-container").nodes()[i]

    const containerHeight = d3Container.offsetHeight;
    const containerWidth = d3Container.offsetWidth;
    
    //Svg
    
    const svgHeight = containerHeight
    const svgWidth = containerWidth
    const outerRadius = svgHeight/3.5
    const innerRadius = outerRadius*0.9

    const svg = d3.select(d3Container).append("svg")
        .attr("viewBox", [-svgWidth / 2, -svgHeight / 2, svgWidth, svgHeight])


    //LineData
    const graphPath = timeLine.map((y, i, timeLine)=>{
        const x = Math.round((innerRadius/timeLine.length)*(i+1))
        return [x, y]
    })

    const [ ymin, ymax ] = d3.extent(timeLine)
    const yAreaBottom = ymin-(ymax-ymin)*1.5

    //Line
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

    lineChart
        .append("path")
        .attr("d", line(graphPath))
        .attr("stroke", colors.palettes[i][1])
        .attr("stroke-width", 1)
        .attr("fill", colors.palettes[i][1])
        .attr('fill-opacity', 0.2)

    //Pie

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
        .data(pie(pieData))
        .enter()    
        .append('path') 
        .attr('d', d3.arc()
            .innerRadius(innerRadius)       
            .outerRadius(outerRadius)
        )
        .attr('fill', (d,y)=>colors.palettes[i][y])

    pieChart
        .selectAll('arcinternalmargin')
        .data(marginsPie([1]))
        .enter()
        .append('path') 
        .attr('d', d3.arc()
            .innerRadius(innerRadius-innerRadius/28)       
            .outerRadius(innerRadius)
        )
        .attr('fill', colors.lightGrey)
    
    pieChart
        .selectAll('arcinternalmargin')
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

    //Central Text

    //Central Title
    const centralTitle = svg
        .append('g')
        .append('text')
        .append('tspan')
        .attr('class', 'central-title')
        .text(name.toUpperCase())
        .attr("dominant-baseline", 'middle')
        .attr('dy', -innerRadius/1.4)
        .attr('font-size', innerRadius/5)
        .attr('stroke-width', 0.5)
        .attr('fill', colors.lightGrey)
        .attr('stroke', colors.lightGrey)
        

    //Central Data
    const centralData = svg
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

    // Bottom Table

    const bottomTable = svg.append("svg:foreignObject")
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
        
    const tableHeader = bottomTable
        .append('thead')
        .attr('class', 'table-header')

    const columnWidth = 100/pieData.length + '%'
        
    tableHeader.append("tr")
        .selectAll("th")
        .data(pieData)
        .enter()
        .append("th")
        .text(d=>capitalizeFirstLetter(d.group))
        .attr('style', (d,y)=>`
            width: ${columnWidth};
            text-align: ${y!==pieData.length-1?'left':'right'};
            color: ${colors.palettes[i][y]};
            font-size: ${innerRadius/6}px;
        `)
    
    const tableBody = bottomTable.append('tbody').append("tr")

    tableBody
        .selectAll("tr")
        .data(pieData)
        .enter()
        .append("td")
        .attr('class', 'table-body')
        .attr('align', (d,y)=>y!==pieData.length-1?'left':'right')
        .attr('style', (d,y)=>`
            width: ${columnWidth};
            padding-top: 0px;
            padding-bottom: 0px;
            margin: 0px;
            border-spacing: 0px;
        `)
        .append("td")
        .attr('class', 'table-body-left')
        .text(d=>d.perc + '%')
        .attr('align', (d,i)=>i!==pieData.length-1?'left':'right')
        .attr('style', (d,y)=>` 
            font-size: ${innerRadius/6}px; 
            padding-right: 10px;
        `)
        .clone()
        .attr('class', 'table-body-right')
        .text(d=>formatNumber(d.total) + (units?units:''))
        .attr('style', (d,y)=>` 
            font-size: ${innerRadius/6}px; 
            color: ${colors.lightGrey};        
        `)
})