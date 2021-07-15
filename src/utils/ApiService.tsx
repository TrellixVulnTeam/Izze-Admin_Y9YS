import Axios from 'axios';
const BaseUrl = process.env.REACT_APP_API_BASE_URL;
export const PostApi = (url: any, data: any = {}, idToken: any = null) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: 'POST',
      url: BaseUrl + url,
      data: data,
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        authorization: `Token ${idToken}`,
      },
    }).then((res: any) => resolve(res.data))
      .catch((err: any) => reject(err?.response?.data || err));
  })
};
