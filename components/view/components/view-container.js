import * as d3 from 'd3'

export default (targetElement, viewId)=>{
    const viewContainer = document.createElement('div')
    viewContainer.className = 'view-container'
    targetElement.append(viewContainer)

    const d3Container = d3.selectAll(".view-container").nodes()[viewId]
    const containerHeight = d3Container.offsetHeight;
    const containerWidth = d3Container.offsetWidth;

    const svg = d3
        .select(d3Container)
        .append("svg")
        .attr("viewBox", [-containerWidth / 2, -containerHeight / 2, containerWidth, containerHeight])

    return {
        svg, 
        containerHeight, 
        containerWidth
    }
}