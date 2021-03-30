const Parse = require('parse/node');
const fs = require('fs');
//const JSONStream = require('JSONStream');
require('dotenv').config();


let { PARSE_SERVER_URL, JAVASCRIPT_KEY, APP_ID, REST_API_KEY, PARSE_SERVER_MASTER_KEY } = process.env;

// Initialize Parse SDK
Parse.initialize(APP_ID, JAVASCRIPT_KEY, PARSE_SERVER_MASTER_KEY);
Parse.serverURL = PARSE_SERVER_URL;

const test = async () => {

  console.log(PARSE_SERVER_URL);
  console.log(JAVASCRIPT_KEY);
  console.log(APP_ID);
  console.log(REST_API_KEY);

  // Initialize Parse SDK
  //Parse.initialize(APP_ID, JAVASCRIPT_KEY, PARSE_SERVER_MASTER_KEY);
  //Parse.serverURL = PARSE_SERVER_URL;


  // Create User (user)
  const user = new Parse.User();
  user.set("username", "user");
  user.set("password", "password");
  user.set("email", "user@test.com");

  // other fields can be set just like with Parse.Object
  //user.set("phone", "415-392-0202");
  try {
    await user.signUp();
    // Hooray! Let them use the app now.
  } catch (error) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message);
  }

  // Create User (admin)
  const adminUser = new Parse.User();
  adminUser.set("username", "admin");
  adminUser.set("password", "password");
  adminUser.set("email", "admin@test.com");

  // other fields can be set just like with Parse.Object
  //user.set("phone", "415-392-0202");
  try {
    await adminUser.signUp();
    // Hooray! Let them use the app now.
  } catch (error) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message);
  }


  // By specifying no write privileges for the ACL, we can ensure the role cannot be altered.
  const roleACL = new Parse.ACL();
  roleACL.setPublicReadAccess(true);

  const userRole = new Parse.Role("user", roleACL);
  userRole.getUsers().add(user);
  userRole.save();

  const adminRole = new Parse.Role("admin", roleACL);
  adminRole.getUsers().add(adminUser);
  adminRole.save();
}


const initSchema = async () => {

  // Initialize Parse SDK
  //Parse.initialize(APP_ID, JAVASCRIPT_KEY, PARSE_SERVER_MASTER_KEY);
  //Parse.serverURL = PARSE_SERVER_URL;

  // create an instance to manage your class
  const userSchema = new Parse.Schema('User');

  // gets the current schema data
  let schemaData = await userSchema.get();
  console.log(schemaData);


  if (!schemaData.fields.hasOwnProperty('name')) {
    console.log(`User schema doesn't have "name" field, creating "name" field...`);
    userSchema.addString('name');
    userSchema.update({useMasterKey: true}).then((result) => {
      // returns save new schema
      console.log(result);
      console.log(`"name" field created in User schema`);
    });
  }

  // returns schema for all classes
  //Parse.Schema.all()

  // add any # of fields, without having to create any objects
  /*
  mySchema
    .addString('stringField')
    .addNumber('numberField')
    .addBoolean('booleanField')
    .addDate('dateField')
    .addFile('fileField')
    .addGeoPoint('geoPointField')
    .addPolygon('polygonField')
    .addArray('arrayField')
    .addObject('objectField')
    .addPointer('pointerField', '_User')
    .addRelation('relationField', '_User');

  // new types can be added as they are available
  mySchema.addField('newField', 'ANewDataType')

  // save/update this schema to persist your field changes
  mySchema.save().then((result) => {
    // returns save new schema
  });
  // or
  mySchema.update().then((result) => {
    // updates existing schema
  });
  */

}

const init = async () => {

  await initSchema()
    .then(test());

    console.log('Complete!');
}


module.exports = {
  test: test,
  initSchema: initSchema,
  init: init
}

require('make-runnable');
