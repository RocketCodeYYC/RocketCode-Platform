/**
 * RocketCode Platform
 * 
 */

export class EnvConfig {

  static get parseServerUrl() {
    console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV);
    console.log('window.REACT_APP_PARSE_SERVER_URL: ' + window.REACT_APP_PARSE_SERVER_URL);
    console.log('process.env.REACT_APP_PARSE_SERVER_URL: ' + process.env.REACT_APP_PARSE_SERVER_URL);

    if (typeof window.REACT_APP_PARSE_SERVER_URL === 'undefined') {
      console.log('AAA');
      return process.env.REACT_APP_PARSE_SERVER_URL;
    } else {
      console.log('BBB');
      return window.REACT_APP_PARSE_SERVER_URL;
    }
  }

  static get parseJavascriptKey() {
    if (typeof window.REACT_APP_JAVASCRIPT_KEY === 'undefined') {
      return process.env.REACT_APP_JAVASCRIPT_KEY;
    } else {
      return window.REACT_APP_JAVASCRIPT_KEY;
    }
  }

  static get parseAppId() {
    if (typeof window.REACT_APP_APP_ID === 'undefined') {
      return process.env.REACT_APP_APP_ID;
    } else {
      return window.REACT_APP_APP_ID;
    }
  }

  static get parseRestApiKey() {
    if (typeof window.REACT_APP_REST_API_KEY === 'undefined') {
      return process.env.REACT_APP_REST_API_KEY;
    } else {
      return window.REACT_APP_REST_API_KEY;
    }
  }
  
}

