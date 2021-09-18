import createViewList from './view-list'

it('renders correctly', () => {

    const container = document.createElement('div')
    container.style = "width: 300px; height: 200px;"
    container.id = "target"

    document.body.append(container)

    createViewList("target")
    expect(container).toMatchSnapshot();
});