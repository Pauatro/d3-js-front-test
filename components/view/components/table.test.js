import createViewContainer from './view-container.js'
import createTable from './table.js'

it('renders correctly', () => {

    const container = document.createElement('div')
    container.style = "width: 300px; height: 200px;"

    document.body.append(container)

    const {
        svg,
        containerHeight,
        containerWidth
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

    createTable(svg, containerWidth, containerHeight, innerRadius, outerRadius, grouped, '€', 0)
    expect(svg).toMatchSnapshot();
});