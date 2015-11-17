var mqtt = require('mqtt');
var client = mqtt.connect("mqtt://localhost:1883");

var cnt = 30;

client.on('connect', function() {
  console.log('Connected!');
})
setInterval(function() {
  client.publish('message', String(cnt++) );
  console.log( '[MQTT SEND] count:' + cnt); 
}, 1000);
