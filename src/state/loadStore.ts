import CustomStore from "devextreme/data/custom_store";
import {FilterPayloadType, FilterType, GetItemsResponseType, GetItemsResponseTypeResult} from "../api/apiResponseTypes";
import {productApi} from "../api/productApi";
import {filterUniqueById} from "../api/apiHelpers/filterUniqueById";
import dxDataGrid from "devextreme/ui/data_grid";

export class ProductStore {
  loadCount = 0
  private _componentInstance: dxDataGrid<GetItemsResponseType, string> | undefined = undefined

  setComponentInstance(componentInstance: dxDataGrid<GetItemsResponseType, string> | undefined) {
    this._componentInstance = componentInstance
  }

  getCustomStore() {
    const that = this
    return new CustomStore({
      key: 'id',
      loadMode: "processed",
      async load(loadOptions) {
        const offsetParams = loadOptions.skip
        let uniqueItemsList: GetItemsResponseTypeResult[] = []
        let totalCount: number = 8004 // захардкодили, используя запрос за всеми ids
        try {
          if (loadOptions.filter) {
            const dataField: FilterType = loadOptions.filter[0]
            const filterParams: FilterPayloadType = {[dataField]: loadOptions.filter[2]}
            const filteredProductsIds = await productApi.getFilter<FilterPayloadType>(filterParams)
            totalCount = filteredProductsIds.result.length
            const filteredProductList = await productApi.getItems(offsetParams as number, filteredProductsIds)
            uniqueItemsList = filterUniqueById(filteredProductList.result)
          } else {
            const list = await productApi.getItems(offsetParams as number)
            uniqueItemsList = filterUniqueById(list.result)
          }
        } catch (e) {
          if (that.loadCount > 2) {
            return e
          }
          that.loadCount++
          console.log(that._componentInstance)
          that._componentInstance?.refresh()
        }
        return {data: uniqueItemsList, totalCount: totalCount}
      }
    })
  }
}

export const productStore = new ProductStore()