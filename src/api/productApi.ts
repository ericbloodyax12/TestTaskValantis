import {getXAuth} from "./apiHelpers/xAuth";
import {
  ActionType,
  GetIdsPayloadParamType,
  GetIdsResponseType,
  GetItemsResponseType, GetItemsResponseTypeResult,
  GetItiemsPayLoadParamType
} from "./apiResponseTypes";


class ProductApi {
  baseUrl = 'https://api.valantis.store:41000/';
  xAuth = getXAuth();
  constructor() {
  }

  async baseRequest<T, P>(action: ActionType, params: P): Promise<T> {
    const actuallyParam = params ? {params: params} : {}
    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': this.xAuth
      },
      body: JSON.stringify({
        action: action,
        ...actuallyParam
      })
    })
    const data = await res.json() as T
    return data
  }

  async getIds(offsetParams: number): Promise<GetIdsResponseType> {
    const idsResponseData = await this.baseRequest<GetIdsResponseType, GetIdsPayloadParamType>(
        'get_ids', {"offset": offsetParams, "limit": 50}
    )
    return idsResponseData
  }

  async getItems(offsetParams: number): Promise<GetItemsResponseType> {
    const ids = await this.getIds(offsetParams)
    const payloadParams = {ids: ids.result}
    const itemsResponseData = await this.baseRequest<GetItemsResponseType, GetItiemsPayLoadParamType>('get_items', payloadParams)
    console.log('itemsResponseData', itemsResponseData)
    return itemsResponseData
  }

  // async getFilter(): Promise<any> {
  //   const fieldsResponseData = await this.baseRequest('filter',)
  // }

}

export const productApi = new ProductApi();