/*---------------------------Script to generate random readings------------------------------------------*/

const dict = []
// user list
const mail_list = ['adam@gmail.com','issac@gmail.com','tim@gmail.com',
    'greeny@gmail.com','eggy@gmail.com']

// get date value in millis
const randomDate = function(){
    const endDate = new Date().getTime()
    const startDate = new Date('2022','01','01').getTime()
    return Math.floor(Math.random()*(endDate-startDate)+startDate)
}

// get temp value
const randomTemp = function(){
    return (Math.random()*(450-200)+200)/10
}

// get battery value
const randomBattery = function(){
    return Math.floor(Math.random()*100)+'%'
}

//date formatting function
function dateFormat(inputDate) {
    const date = new Date(inputDate);
    console.log(date)
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();    
    return day.toString().padStart(2,"0")+"-"+month.toString().padStart(2,"0")+"-"+year.toString();
}

for(i=0;i<100;i++){
    const readingDate = randomDate()
    const email =  mail_list[Math.floor(Math.random()*mail_list.length)]
    const dummy = {
        "_id":email.split('@')[0]+readingDate,
        "email":email,
        "name":email.split('@')[0],
        "deviceName":"VTack",
        "deviceId":"12345678",
        "temperature":randomTemp().toFixed(1),
        "timestamp":readingDate,
        "battery":randomBattery(),
        "date":dateFormat(readingDate),
        "sync":"yes"
    }
    dict.push(dummy)
}
console.log(dict)

// @ GENERATING JSON DOCUMENT
var dictString = JSON.stringify(dict)

let fs = require('fs')
fs.writeFile("readings.json",dictString,function(err,result){
    if(err){
        console.log(err.message)
    }
})




