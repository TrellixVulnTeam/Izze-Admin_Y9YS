import Axios from 'axios';
const commonApi = (method: any, url: any, data: any) => {
  return Axios({
    method: method,
    url: 'http://188.166.228.50:3009' + url,
    data: data,
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      authorization: `Token ${localStorage.getItem('uid')}`,
    },
  });
};
export default commonApi;
