import createView from './view.js'

it('renders correctly', () => {

    const container = document.createElement('div')
    container.style = "width: 300px; height: 200px;"

    document.body.append(container)

    const data = {
        "name": "revenue",
        "units": "€",
        "total": 200000,
        "timeLine": [
            100,
            110,
            105,
            120,
            118,
            140,
            135,
            140,
            135
        ],
        "grouped": [
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

    }

    createView(data, 0, container)
    expect(container).toMatchSnapshot();
});