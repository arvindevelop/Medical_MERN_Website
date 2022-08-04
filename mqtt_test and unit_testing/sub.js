const mqtt = require('mqtt');
var client = mqtt.connect('mqtt://broker.hivemq.com');

const Topic = 'Arvind';
client.on('connect', function() {
    client.subscribe(Topic);
    console.log("Client has subscribed successfully");
});

client.on('message', function(topic,message){
    console.log(message.toString());
})