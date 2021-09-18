import createViewContainer from './view-container.js'
import createPieChart from './pie-chart.js'


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

    const grouped = [
        {
            "group": "tablet",
            "perc": 60,
            "total": 120000
        },
        {
            "group": "smartphone",
            "perc": 40,
            "total": 80000
        }
    ]

    createPieChart(svg, innerRadius, outerRadius,containerHeight, grouped,0)
    expect(svg).toMatchSnapshot();
});