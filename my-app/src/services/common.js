//***RocketCode***/
import Parse from 'parse';
import moment from 'moment';



export const queryGenericObjectsForProTable = async (params, sort, filter) => {

  console.log('queryGenericObjectsForProTable: ' + JSON.stringify(params));

  let p = { params, sort, filter };

  try {
    let r = await Parse.Cloud.run('fetchDataForProTable', p);

    if (r != null) {
      console.log('RESULTS: ' + JSON.stringify(r));
      //console.log('queryGenericObjects: ' + r.results.length);
      //console.log('queryGenericObjects: ' + r.count);

      let data = r.results.map(o => ({ id: o.id, ...o.attributes }));
      console.log('data: ' + JSON.stringify(data));

      data.forEach((values, index) => {

        //console.log(Object.keys(values));
        //console.log(values);
        //console.log(JSON.stringify(values));

        //let v = { id: values.id, ...values.attributes };
        //console.log(v);

        moment.locale('en');

        Object.keys(values).forEach((key) => {
          //console.log('key: ' + key + ' ' + typeof values[key]);
          //if (v[key] instanceof Object && !_.isEmpty(v[key].__type) && v[key].__type === 'Date') {
          if (values[key] instanceof Date) {
            //console.log('HERE AA => ' + values[key].iso);

            //let format = "dddd, MMMM Do YYYY";
            //let formattedDateString = moment(values[key].iso).format(format);

            // https://stackoverflow.com/questions/62272753/how-can-i-use-initialvalue-for-datepicker-in-form-item-of-ant-design


            values[key] = moment(values[key]);
            //console.log('HERE BB => ' + values[key]);
          }
        });

      });

      //let data2 = data.map(o => ({ id: o.id, ...o.attributes }));

      return { results: data, count: r.count };
    } else {
      // empty results
      return { results: {}, count: 0 };
    }

  } catch (error) {
    return error;
  }

}