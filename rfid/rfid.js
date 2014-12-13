var tessel = require('tessel');
var rfidlib = require('rfid-pn532');

var rfid = rfidlib.use(tessel.port['A']); 

rfid.on('ready', function (version) {
  console.log('Ready to read RFID card');

  rfid.on('data', function(card) {
    console.log('UID:', card.uid.toString('hex'));
  });
});

rfid.on('error', function (err) {
  console.error(err);
});
