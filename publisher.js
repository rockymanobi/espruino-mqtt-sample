var mqtt = require('mqtt');
var client = mqtt.createClient(61613, "localhost");

var cnt = 30;
setInterval(function() {
  client.publish('message', cnt++);
  console.log( '[MQTT SEND] count:' + cnt); 
}, 1000);
