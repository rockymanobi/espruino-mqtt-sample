var mqtt = require('mqtt');
var client = mqtt.connect( 'mqtt://localhost:1883');

client.on('connect', function() {
  console.log('Connected!');
})
.subscribe('message', function(err, granted) {
  if( err ){
    console.log("error");
    return;
  }
  console.log('subscribe 開始');
})
.on('message', function(topic, message) {
  console.log("[MQTT RECIEVE]");
  console.log("温度:" + message);
})

