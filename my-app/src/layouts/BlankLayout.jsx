import React from 'react';
import { Inspector } from 'react-dev-inspector';

//***RocketCode***/
import Parse from 'parse';
import { EnvConfig } from '../../config/parseconfig';

const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

console.log('BlankLayout');

if (Parse.applicationId === null || Parse.javaScriptKey === null) {
  console.log('init parse in BlankLayout: ' + EnvConfig.parseAppId + ' | ' + EnvConfig.parseJavascriptKey + ' | ' + EnvConfig.parseServerUrl);
  Parse.initialize(EnvConfig.parseAppId, EnvConfig.parseJavascriptKey);
  Parse.serverURL = EnvConfig.parseServerUrl;
}

const Layout = ({ children }) => {
  return <InspectorWrapper>{children}</InspectorWrapper>;
};

export default Layout;
