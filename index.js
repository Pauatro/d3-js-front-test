import { data }  from "./data/view-data.json"
import {
    createViewList, 
    createView
} from "./components"

const viewList = createViewList("target")
data.dataSeries.forEach((dataElement, i)=>createView(dataElement, i, viewList))