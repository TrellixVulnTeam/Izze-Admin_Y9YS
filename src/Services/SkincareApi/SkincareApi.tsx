import CommonApi from '../CommonApi';

export const AddSkinCareApi = (data: any, callback: any) => {
  return CommonApi('Post', '/app/addSkinCare', data)
    .then((response: any) => {
      callback(response.data);
    })
    .catch((error: any) => {
      throw error;
    });
};

export const ListSkinCareApi = (data: any, callback: any) => {
  return CommonApi('Post', '/app/listSkinCare', data)
    .then((response: any) => {
      callback(response.data);
    })
    .catch((error: any) => {
      throw error;
    });
};
