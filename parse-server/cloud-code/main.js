
//const common = require('./common');
var _ = require('lodash');

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

/**
 * Function is specific for use with Ant Design ProTable as it supports
 * sort, filter, pagination, and search parameters
 * 
 */
Parse.Cloud.define('fetchDataForProTable', async (request) => {
  console.log('==============================');
  console.log('fetchDataForProTable');
  console.log('==============================');

  let currentUser = request.user;
  let params = request.params.params;
  let sort = request.params.sort;
  let filter = request.params.filter;

  console.log('User: ' + JSON.stringify(currentUser));
  console.log('Params Data: ' + JSON.stringify(params));
  console.log('Filter: ' + JSON.stringify(filter));

  const resourceObj = Parse.Object.extend(params.resource);
  let query = new Parse.Query(resourceObj);

  // shallow copy
  let queryParams = { ...params };

  // remove all other attributes so that it is only left with the query params
  delete queryParams.current;
  delete queryParams.pageSize;
  delete queryParams._timestamp;
  delete queryParams.keyword;
  delete queryParams.sorter;
  delete queryParams.filter;
  delete queryParams.resource;

  console.log('queryGenericObjects filter: ' + JSON.stringify(queryParams));

  if (!_.isEmpty(queryParams)) {
    // build query string

    Object.keys(queryParams).map(f => {

      console.log('f: ' + f + ' type: ' + typeof queryParams[f]);

      // Test the datatype and determine the correct filter
      if (typeof queryParams[f] == 'string') {
        // https://stackoverflow.com/questions/21253197/parse-com-search-with-wild-character-using-javascript
        query.matches(f, queryParams[f], 'i'); // i for case-insensitive?
        //query.matches(f, '.*' + filter[f] + '.*', 'i');
      } else if (typeof queryParams[f] == 'number') {
        query.equalTo(f, queryParams[f]);
      }

    });
  }

  if (!_.isEmpty(filter)) {
    Object.keys(filter).forEach((key, index) => {
      if (!_.isEmpty(filter[key])) {
        query.containedIn(key, filter[key]);
      }
    });
  }

  console.log(sort);

  // set default sort
  //let field = Object.keys(sort)[0];
  //query.descending(field);

  if (!_.isEmpty(sort)) {
    let field = Object.keys(sort)[0];
    if (sort[field] === 'descend') {
      console.log('descending');
      query.descending(field);
    } else {
      console.log('ascending');
      query.ascending(field);
    }
  }

  // pagination
  let pageSize = parseInt(params.pageSize);
  let current = parseInt(params.current);

  console.log(params.pageSize);
  console.log(params.current);

  let skip = pageSize * (current - 1);

  console.log('skip: ' + skip);

  query.limit(pageSize);
  query.skip(skip);

  // include total records count for pagination
  query.withCount();

  //const results = await query.find({ useMasterKey: true });
  const results = await query.find({ sessionToken: currentUser.getSessionToken() });


  return results;


});