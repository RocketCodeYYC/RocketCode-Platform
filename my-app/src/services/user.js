import request from '@/utils/request';

//***RocketCode***/
import Parse from 'parse';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  console.log('user services queryCurrent');
  //return request('/api/currentUser');
  console.log('user services queryCurrent Parse.User.current(): ' + JSON.stringify(Parse.User.current()));

  return JSON.parse(JSON.stringify(Parse.User.current()));
}

export async function queryNotices() {
  return request('/api/notices');
}
