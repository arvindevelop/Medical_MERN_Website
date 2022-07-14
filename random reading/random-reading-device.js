/*---------------------------Script to generate random readings------------------------------------------*/

const dict = []
// user list
const mail_list = ['adam@gmail.com','issac@gmail.com','tim@gmail.com',
    'greeny@gmail.com','eggy@gmail.com']

const Address = ['Delhi','Patna','Banglore','Hyderabad','Bhopal']

// get date value in millis
const randomDate = function(){
    const endDate = new Date().getTime()
    const startDate = new Date('2022','01','01').getTime()
    return Math.floor(Math.random()*(endDate-startDate)+startDate)
}

const currDate = function(){
    const endDate = new Date().getTime();
    return endDate
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
    const currentDate = currDate()
    const email =  mail_list[Math.floor(Math.random()*mail_list.length)]
    const address = Address[Math.floor(Math.random()*Address.length)]
    const dummy = {
        "_id":email.split('@')[0]+readingDate,
        "email":email,
        "deviceName":"VTack",
        "deviceType":"Instrument",
        "deviceId":"12345678",
        "deviceAddress":address,
        "sync":"yes",
        "addedOn":dateFormat(readingDate),
        "lastUpdate":dateFormat(currentDate)
    }
    dict.push(dummy)
}
console.log(dict)

// @ GENERATING JSON DOCUMENT
var dictString = JSON.stringify(dict)

let fs = require('fs')
fs.writeFile("hospital-info.json",dictString,function(err,result){
    if(err){
        console.log(err.message)
    }
})




