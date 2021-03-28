
//const common = require('./common');

/**
 * Test Function
 */
Parse.Cloud.define('test', (request) => {
  console.log('==============================');
  console.log('test');
  console.log('==============================');
  var text = "This is a cloud code test function";
  var jsonObject = {
    "result": text
  };
  return jsonObject
});

