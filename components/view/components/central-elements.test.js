import createViewContainer from './view-container.js'
import {createCentralData, createCentralTitle} from './central-elements.js'


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

    createCentralTitle(svg, 'name', innerRadius)
    expect(svg).toMatchSnapshot();
    createCentralData(svg, innerRadius, 10000, '€')
    expect(svg).toMatchSnapshot();
});