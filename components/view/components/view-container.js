import * as d3 from 'd3'

export default (targetElement, viewNumber)=>{
    const viewContainer = document.createElement('div')
    viewContainer.className = 'view-container'
    targetElement.append(viewContainer)
    return d3.selectAll(".view-container").nodes()[viewNumber]
}