var mqtt = require('mqtt');
var port = 1883;

mqtt.MqttServer(function(client) {
  var _this = this;

  if (!_this.clients) _this.clients = {};

  client.on('connect', function(packet) {
    client.connack({returnCode: 0});
    client.id = packet.clientId;
    _this.clients[client.id] = client;
  });

  client.on('publish', function(packet) {
    for (var k in _this.clients) {
      _this.clients[k].publish({topic: packet.topic, payload: packet.payload});
    }
  });

  client.on('subscribe', function(packet) {
    var granted = [];
    for (var i = 0; i < packet.subscriptions.length; i++) {
      granted.push(packet.subscriptions[i].qos);
    }

    client.suback({granted: granted, messageId: packet.messageId});
  });

  client.on('pingreq', function(packet) {
    client.pingresp();
  });

  client.on('disconnect', function(packet) {
    client.stream.end();
  });

  client.on('close', function(err) {
    delete _this.clients[client.id];
  });

  client.on('error', function(err) {
    client.stream.end();
    console.log('error!');
  });
}).listen(port);


// とりあえずIP表示
require('dns').lookup( require('os').hostname(), function( err, add, fam){
  console.log( 'listening on ' + add + ':' + port );
});

