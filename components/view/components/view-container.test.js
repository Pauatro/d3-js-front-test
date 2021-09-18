import createViewContainer from './view-container.js'

it('renders correctly', () => {

    const container = document.createElement('div')
    container.style = "width: 300px; height: 200px;"

    document.body.append(container)

    createViewContainer(container, 0)

    expect(container).toMatchSnapshot();
});