import {getXAuth} from "./apiHelpers/xAuth";
import {
  ActionType,
  GetIdsPayloadParamType,
  GetIdsResponseType,
  GetItemsResponseType,
  GetItemsPayLoadParamType,
  FilterResponseResultType
} from "./apiResponseTypes";

class ProductApi {
  baseUrl = 'https://api.valantis.store:41000/';
  xAuth = getXAuth();
  constructor() {
  }

  async baseRequest<ResponseType, P>(action: ActionType, params: P): Promise<ResponseType> {

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
    if (!res.ok) {
      if (res.status === 500) {
        throw new Error('500 Internal Server Error. Пожалуйста попробуйте еще раз.');
      }
    }
    const data = await res.json() as ResponseType
    return data
  }

  async getIds(offsetParams: number): Promise<GetIdsResponseType> {
    const idsResponseData = await this.baseRequest<GetIdsResponseType, GetIdsPayloadParamType>(
        'get_ids', {"offset": offsetParams, "limit": 50}
    )
    return idsResponseData;
  }

  async getItems(offsetParams: number, filteredProductsIds?: FilterResponseResultType): Promise<GetItemsResponseType> {

    if (filteredProductsIds) {
      const payloadParams = {ids: filteredProductsIds.result}
      const itemsResponseData = await this.baseRequest<GetItemsResponseType, GetItemsPayLoadParamType>('get_items', payloadParams)
      return itemsResponseData
    } else {
      const ids = await this.getIds(offsetParams)
      const payloadParams = {ids: ids.result}
      const itemsResponseData = await this.baseRequest<GetItemsResponseType, GetItemsPayLoadParamType>('get_items', payloadParams)
      return itemsResponseData
    }

  }
  async getFilter<P>(filterParams: P): Promise<FilterResponseResultType> {
    const filterResponseData = await this.baseRequest<FilterResponseResultType, P>("filter", filterParams)
    return filterResponseData
  }

}
export const productApi = new ProductApi();