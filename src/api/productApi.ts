import {xAuth} from "./apiHelpers/xAuth";
import {getItemsResponseType} from "./apiResponseTypes";


export const productApi = {
  baseUrl: 'https://api.valantis.store:41000/',

  xAuth: xAuth,

  getItems: async (): Promise<getItemsResponseType> => {
    const action ='get_items'
    const res = await fetch(productApi.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': productApi.xAuth
      },
      body: JSON.stringify({
        action: 'get_items',
        params:  {"ids": ["1789ecf3-f81c-4f49-ada2-83804dcc74b0"]}
      })
    })
    const data = await res.json();
    console.log(data)
    return data;
  }

}