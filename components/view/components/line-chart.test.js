import createViewContainer from './view-container.js'
import createLineChart from './line-chart.js'


it('renders correctly', () => {

    const container = document.createElement('div')
    container.style = "width: 300px; height: 200px;"

    document.body.append(container)

    const {
        svg,
        containerHeight
    } = createViewContainer(container, 0)

    const outerRadius = containerHeight/3.5
    const innerRadius = outerRadius*0.9
    const timeLine = [100, 200, 300, 400, 500, 600]
    createLineChart(svg, innerRadius, timeLine,0)
    expect(svg).toMatchSnapshot();
});