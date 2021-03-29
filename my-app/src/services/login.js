import request from '@/utils/request';

//***RocketCode***/
import Parse from 'parse';
import { EnvConfig } from '../../config/parseconfig';

export async function fakeAccountLogin(params) {

  console.log('fakeAccountLogin');
  console.log('process.env.REACT_APP_PARSE_SERVER_URL: ' + process.env.REACT_APP_PARSE_SERVER_URL);
  console.log('EnvConfig.serverURL: ' + EnvConfig.parseServerUrl);

  if (Parse.applicationId === null || Parse.javaScriptKey === null) {
    console.log('init parse in login.js' + EnvConfig.parseAppId + ' | ' + EnvConfig.parseJavascriptKey + ' | ' + EnvConfig.parseServerUrl);
    Parse.initialize(EnvConfig.parseAppId, EnvConfig.parseJavascriptKey);
    Parse.serverURL = EnvConfig.parseServerUrl;
  }

  /*
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });*/

  try {
    const user = await Parse.User.logIn(params.userName, params.password);
    //console.log('parseAuth user: ', JSON.stringify(user));

    const userRoles = await new Parse.Query(Parse.Role).equalTo('users', Parse.User.current()).find();
    //console.log('role: ', JSON.stringify(userRoles));
    //console.log('current user: ' + JSON.stringify(Parse.User.current()));
    //console.log('role.name: ' + userRole.getName());
    let roles = [];
    userRoles.forEach((userRole, index) => {
      //console.log(`${userRole.getName()} ${userRole.attributes.logicalName}`);
      roles.push(userRole.getName());
      //roles.push(userRole.attributes.logicalName);
    });

    let newResult = { ...user, currentAuthority: 'admin', status: 200, type: 'account' };
    //console.log('newResult: ' + JSON.stringify(newResult));
    return newResult;
  
  } catch (error) {
    
    // ParseError object -> { "message": "xxxx", "code": xxx }
    console.log(JSON.stringify(error));
    console.warn(error);
    
    return { status: 'error', type: 'account', message: error.message };
  }
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
