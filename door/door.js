var tessel = require('tessel');
var relaylib = require('relay-mono');
var rfidlib = require('rfid-pn532');
var blinkerlib = require('blinker');

var rfid = rfidlib.use(tessel.port.A);
var relay = relaylib.use(tessel.port.B);
var blinker = blinkerlib.use(tessel);

var led1 = tessel.led[0].output(0);

var blue = tessel.led[1].output(0);
var red = tessel.led[2].output(0);

var authUsers = {
    bacb684f: true
};

var enemyUsers = {
    f2a27202: true
};


// Wait for the module to connect
relay.on('ready', function relayReady () {
    rfid.on('ready', function (version) {
        console.log('Ready to rock and roll');

        blinker.green.blink(3);

        rfid.on('data', function(card) {
            var idKey = card.uid.toString('hex');
            console.log('UID:', idKey);
            if (enemyUsers[idKey]) {
                blinker.red.blink(1, 500);
                relay.toggle(2, function () {
                });
            }

            if (authUsers[idKey]) {
                blinker.blue.blink(1, 500);
                relay.toggle(1, function () {
                });
            }

            
        });

//  console.log('Ready! Toggling relays...');
//  setInterval(function toggle() {
//    // Toggle relay channel 1
//    relay.toggle(1, function toggleOneResult(err) {
//      if (err) console.log("Err toggling 1", err);
//    });
//    // Toggle relay channel 2
//    relay.toggle(2, function toggleTwoResult(err) {
//      if (err) console.log("Err toggling 2", err);
//    });
//  }, 2000); // Every 2 seconds (2000ms)
    });

});

// When a relay channel is set, it emits the 'latch' event
relay.on('latch', function(channel, value) {
  console.log('latch on relay channel ' + channel + ' switched to', value);
});

rfid.on('error', function (err) {
  console.error(err);
});
