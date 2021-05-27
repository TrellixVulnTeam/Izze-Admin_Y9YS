import CommonApi from './CommonApi';

export const LoginApi = (data: any, callback: any) => {
  return CommonApi('Post', '/app/login', data)
    .then((response: any) => {
      callback(response);
    })
    .catch((error: any) => {
      throw error;
    });
};
