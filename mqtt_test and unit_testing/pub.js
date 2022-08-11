const mqtt = require('mqtt');
var client = mqtt.connect('mqtt://broker.hivemq.com'); //message broker
//var client = mqtt.connect('mqtt://127.0.0.1:1883');  //for locally connection

const Topic = 'vtrack';
client.on('connect', function(){
    setInterval(function() {
        var random = Math.random()*50;
        console.log(random);
        if(random < 30){
            client.publish(Topic, 'Simple MQTT using HiveMQ: '+random.toString()+'.');
        }
    }),30000;
});