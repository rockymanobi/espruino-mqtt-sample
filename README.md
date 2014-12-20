# Espruino MQTT SAMPLE

sample implementation of MQTT publisher on Espruino.

# GET STARTED

#### requirements

* node.js
* npm

Get the source code and install dependencies. 

```bash
git clone https://github.com/rockymanobi/espruino-mqtt-sample.git
cd espruino-mqtt-sample
npm install
```

Run the broker and subscriber program.

```bash
node broker.js
```

```bash
node subscriber.js
```

Connect the CC3000 WiFi module and DS18B20 Temperature to your Espruino as follows [here](http://qiita.com/rockymanobi/items/83cc39a4a75ea65747e3)

Run `espruino.js` on WebIDE. Everytime you press the BTN1, the temperature will be sent to subscriber by MQTT.

