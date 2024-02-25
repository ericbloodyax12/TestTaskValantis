import {xAuth} from "./apiHelpers/xAuth";
import {
  ActionType,
  GetIdsPayloadParamType,
  GetIdsResponseType,
  GetItemsResponseType,
  GetItiemsPayLoadParamType
} from "./apiResponseTypes";


export const productApi = {
  baseUrl: 'https://api.valantis.store:41000/',
  xAuth: xAuth,

  baseRequest: async <T,P>(action:ActionType, params: P): Promise<T> => {
    const res = await fetch(productApi.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': productApi.xAuth
      },
      body: JSON.stringify({
        action: action,
        params
      })
    })
    const data = await res.json() as T
    return data
  },

  getIds: async (): Promise<GetIdsResponseType> => {
    const idsResponseData = await productApi.baseRequest<GetIdsResponseType,GetIdsPayloadParamType>('get_ids', {"offset": 0, "limit": 50})
    return idsResponseData
  },

  getItems: async (): Promise<GetItemsResponseType> => {
    const ids = await productApi.getIds()
    const payloadParams = {ids: ids.result}
    const itemsResponseData = await productApi.baseRequest<GetItemsResponseType,GetItiemsPayLoadParamType>('get_items',  payloadParams)
    return itemsResponseData
  },

}