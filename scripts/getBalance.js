const client = require('./client');
//allows private key input
const {argv} = require('yargs');
const {address} = argv;


client.request('getBalance', [address], function(err, response) {
  if(err) throw err;
  console.log(response.result); // success!
});