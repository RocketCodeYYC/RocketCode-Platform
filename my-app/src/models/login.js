import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

import Parse from 'parse';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      console.log('login effect');
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      console.log('response: ' + JSON.stringify(response));

      if (response.status === 200) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('🎉 🎉 🎉  登录成功！');
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (window.routerBase !== '/') {
              redirect = redirect.replace(window.routerBase, '/');
            }

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    logout() {
      console.log('logout');
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      // https://docs.parseplatform.org/js/guide/#users
      //console.log('Parse.User.logOut()');

      /*
      const REACT_APP_PARSE_SERVER_URL='http://localhost:1347/parse/';
      const REACT_APP_JAVASCRIPT_KEY='javaScRipt231';
      const REACT_APP_APP_ID='rocketcodeapp';

      if (Parse.applicationId === null || Parse.javaScriptKey === null) {
        console.log('parse init in logout');
        Parse.initialize(REACT_APP_APP_ID, REACT_APP_JAVASCRIPT_KEY);
        Parse.serverURL = REACT_APP_PARSE_SERVER_URL;
      }*/

      Parse.User.logOut().then(() => {
        var currentUser = Parse.User.current();  // this will now be null
      });

      setAuthority('');

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      //***RocketCode***/
      console.log('reducers changeLoginStatus: ' + payload.currentAuthority);
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type, message: payload.message };
    },
  },
};
export default Model;
