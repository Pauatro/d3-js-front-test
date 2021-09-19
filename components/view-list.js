export default (targetId) => {
    const target = document.getElementById(targetId)
    const viewList = document.createElement('div')
    viewList.className = 'view-list'
    target.append(viewList)
    return viewList
}