import createViewContainer from "./components/view-container"
import createLineChart from "./components/line-chart"
import createPieChart from "./components/pie-chart"
import createTable from "./components/table"
import {
    createCentralTitle,
    createCentralData
} from "./components/central-elements"

export default (dataElement, i, viewList)=>{
    const { 
        grouped, 
        timeLine, 
        name, 
        total, 
        units 
    } = dataElement

    const {
        svg, 
        containerHeight, 
        containerWidth
    } = createViewContainer(viewList, i)

    const outerRadius = containerHeight/3.5
    const innerRadius = outerRadius*0.9
    createLineChart(svg, innerRadius, timeLine, i)
    createPieChart(svg, innerRadius, outerRadius, containerHeight, grouped, i)
    createCentralTitle(svg, name, innerRadius)
    createCentralData(svg, innerRadius, total, units)
    createTable(svg, containerWidth, containerHeight, innerRadius, outerRadius, grouped, units, i)
}