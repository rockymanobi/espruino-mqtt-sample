var config = {
  wifiSSID: 'ssid',
  wifiKey: 'password',
  mqttHost: '192.168.xxx.xxx',
  mqttPort: '1883',
};

function mtStr(s) {
  return String.fromCharCode(s.length>>8,s.length&255)+s;
} function mtPacket(cmd, variable, payload) {
  return String.fromCharCode(cmd, variable.length+payload.length)+variable+payload;
}
function mtpConnect(name) {
  return mtPacket(0b00010000, 
           mtStr("MQTT")/*protocol name*/+
           "\x04"/*protocol level*/+
           "\x00"/*connect flag*/+
           "\xFF\xFF"/*Keepalive*/, mtStr(name));
}
function mtpPub(topic, data) {
  return  mtPacket(0b00110001, mtStr(topic), data);
}

var client;
function onConnected() {
  console.log('creating client');
  client = require("net").connect({host : config.mqttHost , port:config.mqttPort}, function() { //'connect' listener
    console.log('client connected');
    client.write(mtpConnect("Espruino"));

    setWatch(function() {
      var temperature = sensor.getTemp();
      console.log("Publishing " + temperature );
      client.write(mtpPub("message", temperature. toFixed(4)));
    }, BTN1, { repeat:true, edge: 'falling' } );

    client.on('end', function() {
      console.log('client disconnected');
    });
  });
}



var wlan,sensor, ow;
// main
function main(){ 
  // Setup Temperature Sensor
  ow = new OneWire(A1);
  sensor = require("DS18B20").connect(ow);
  sensor.getTemp();
  // WIFI
  wlan = require("CC3000").connect();
  wlan.connect( config.wifiSSID , config.wifiKey, function (s) { 
    if (s=="dhcp") {
      console.log("My IP is "+wlan.getIP().ip);
      onConnected();
    }
  });
}

main();

