import * as d3 from 'd3'

import { data } from "./data/view-data.json"

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

    let d3Container

    //View
    d3Container = d3.selectAll(".view-container").nodes()[i]

    const height = d3Container.offsetHeight;
    const width = d3Container.offsetWidth;
    const outerRadius = height*0.36
    const innerRadius = height*0.334

    //Svg
    const svg = d3.select(d3Container).append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height])


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
        .attr("transform", "translate(" + -innerRadius*1.2 + "," + innerRadius/10 + ")");

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
        .attr("stroke", "black")
        .attr("stroke-width", 0.5)
        .attr("fill", "black")

    //Pie

    const pie = d3.pie()
        .sort(null)
        .value(d => d.total)

    const pieChart = svg
        .append("g")
        .attr("transform", "translate(" + 0 + "," + -height / 10 + ")");
    
    var color = d3.scaleOrdinal()
        .domain(pieData)
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

    pieChart
        .selectAll('arc')
        .data(pie(pieData))
        .enter()
        .append('path') 
        .attr('d', d3.arc()
            .innerRadius(innerRadius)       
            .outerRadius(outerRadius)
        )
        .attr('fill', function(d){ return(color(d.data.key)) })

    pieChart
        .selectAll('arcinternalmargin')
        .data(pie([{total: 1}]))
        .enter()
        .append('path') 
        .attr('d', d3.arc()
            .innerRadius(innerRadius-innerRadius/15)       
            .outerRadius(innerRadius)
        )
        .attr('fill', 'white')
    
    pieChart
        .selectAll('arcexternalmargin')
        .data(pie([{total: 1}]))
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
        .attr('width', innerRadius*2)
        .attr('height', innerRadius*2)
        .append('tspan')
        .text(name.toUpperCase())
        .attr("stroke", 'grey')
        .attr("fill", 'grey')
        .attr("font-family", 'Arial')
        .attr("text-anchor", 'middle')
        .attr("dominant-baseline", 'middle')
        .attr('dy', -innerRadius/1.6)
        .attr('font-size', innerRadius/5)

    //Central Data
    const centralData = svg
        .append('g')
        .append('text')
        .attr('width', innerRadius*2)
        .attr('height', innerRadius*2)
        .append('tspan')
        .text(total + units)
        .attr("stroke", 'black')
        .attr("font-family", 'Arial')
        .attr("text-anchor", 'middle')
        .attr("dominant-baseline", 'middle')
        .attr('dy', -innerRadius/3)
        .attr('font-size', innerRadius/3)

    // Bottom Table

    const bottomTable = svg
        .append("foreignObject")
        .attr("transform", "translate(" + -innerRadius*1.75 + "," + innerRadius*0.9 + ")")
        .attr('width', width*0.75)
        .attr('height', height/5)
        .append('xhtml:table')
        .attr('width', width*0.75)
        .attr('height', height/5)
    
    const tableHead = bottomTable.append('thead')
    const tableBody = bottomTable.append('tbody').append("tr")
    
    const columnWidth = 100/pieData.length + '%'
    
    tableHead.append("tr")
    .selectAll("th")
    .data(pieData)
    .enter()
    .append("th")
    .attr('width', columnWidth)
    .text(d=>d.group)
    .attr('align', (d,i)=>i!==pieData.length-1?'left':'right')
    .attr('font-size', innerRadius/3)
    .attr('text-size-adjust', 'none')

    tableBody
        .selectAll("tr")
        .data(pieData)
        .enter()
        .append("td")
        .attr('width', columnWidth)
        .attr('align', (d,i)=>i!==pieData.length-1?'left':'right')
        .append("td")
        .text(d=>d.perc + '%')
        .attr('align', (d,i)=>i!==pieData.length-1?'left':'right')
        .clone()
        .text(d=>d.total + units);
    
})