import CommonApi from '../CommonApi';

export const AddIngredientsApi = (data: any, callback: any) => {
  return CommonApi('Post', '/app/addIngredient', data)
    .then((response: any) => {
      callback(response);
    })
    .catch((error: any) => {
      throw error;
    });
};

export const ListIngredientsApi = (data: any, callback: any) => {
  return CommonApi('Post', '/app/listIngredient', data)
    .then((response: any) => {
      callback(response.data);
    })
    .catch((error: any) => {
      throw error;
    });
};

export const DeleteIngredientsApi = (data: any, callback: any) => {
  return CommonApi('Post', '/app/deleteIngredient', data)
    .then((response: any) => {
      callback(response.data);
    })
    .catch((error: any) => {
      throw error;
    });
};
