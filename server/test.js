const randomDate = function(){
    const endDate = new Date().getTime()
    console.log(endDate)
    const startDate = new Date('2022','01','01').getTime()
    console.log(startDate)
    return ((endDate-startDate)+startDate)
}

const res = randomDate();
const date = new Date(res);
const exactDate = date.getDate()
console.log(exactDate);