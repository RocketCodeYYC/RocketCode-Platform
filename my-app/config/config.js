// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

import { extend } from 'umi-request';

console.log(process.env.REACT_APP_PARSE_SERVER_URL);

const request = extend({
  //prefix: '/api/v1',
  //timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'X-Parse-Application-Id': process.env.REACT_APP_APP_ID,
    'X-Parse-REST-API-Key': process.env.REACT_APP_REST_API_KEY,
  },
});

/*
request.get(process.env.REACT_APP_PARSE_SERVER_URL + '/classes/BaseConfiguration/nYVkZhe5Rp')
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });*/


const getConfig = () => {
  request.get(process.env.REACT_APP_PARSE_SERVER_URL + '/classes/BaseConfiguration/nYVkZhe5Rp')
  .then(function(response) {
    console.log(response);
    console.log(response.routes);
    return response.routes;
  })
  .catch(function(error) {
    console.log(error);
  });
}




const { REACT_APP_ENV } = process.env;

console.log('REACT_APP_ENV: ' + REACT_APP_ENV);

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  //routes: getConfig(),
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
  define: {
    'process.env.REACT_APP_PARSE_SERVER_URL': process.env.REACT_APP_PARSE_SERVER_URL || '',
    'process.env.REACT_APP_JAVASCRIPT_KEY': process.env.REACT_APP_JAVASCRIPT_KEY || '',
    'process.env.REACT_APP_APP_ID': process.env.REACT_APP_APP_ID || '',
    'process.env.REACT_APP_REST_API_KEY': process.env.REACT_APP_REST_API_KEY || '',
    'process.env.UMI_ENV': process.env.UMI_ENV || 'aaa',
  },
});
