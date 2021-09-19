export const capitalizeFirstLetter = (string)=>{
    const firstCapitalLetter = string[0].toUpperCase()
    const restOfTheString = string.slice(1)
    return firstCapitalLetter + restOfTheString
}

export const formatNumber = (num) =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
