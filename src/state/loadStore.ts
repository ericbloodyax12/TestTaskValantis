import CustomStore from "devextreme/data/custom_store";
import {FilterPayloadType, FilterType, GetItemsResponseTypeResult} from "../api/apiResponseTypes";
import {productApi} from "../api/productApi";
import {filterUniqueById} from "../api/apiHelpers/filterUniqueById";
import {inherits} from "util";
import dxDataGrid from "devextreme/ui/data_grid";

export class ProductStore {
  static loadCount = 0
  static componentInstance: dxDataGrid<any, any> | undefined = undefined
  constructor() {
  }
  getСustomStore() {
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
          if (ProductStore.loadCount > 2) {
            console.log(e)
            return e
          }
          ProductStore.loadCount++

          console.log(ProductStore.componentInstance)


          ProductStore.componentInstance?.refresh()
        }
        return {data: uniqueItemsList, totalCount: totalCount}
      }
    })
  }
}

export const productStore = new ProductStore()
//  export const productStore =  {
//    loadCount: 0,
//    componentInstance: undefined,
//    customStore : new CustomStore({
//     key: 'id',
//     loadMode: "processed",
//     async load(loadOptions) {
//       const offsetParams = loadOptions.skip
//       let uniqueItemsList: GetItemsResponseTypeResult[] = []
//       let totalCount: number = 8004 // захардкодили, используя запрос за всеми ids
// try {
//   if (loadOptions.filter ) {
//     const dataField: FilterType = loadOptions.filter[0]
//     const filterParams: FilterPayloadType = {[dataField]:loadOptions.filter[2]}
//     const filteredProductsIds = await productApi.getFilter<FilterPayloadType>(filterParams)
//     totalCount = filteredProductsIds.result.length
//     const filteredProductList = await productApi.getItems(offsetParams as number, filteredProductsIds)
//     uniqueItemsList = filterUniqueById(filteredProductList.result)
//   } else {
//     const list = await productApi.getItems(offsetParams as number)
//     uniqueItemsList = filterUniqueById(list.result)
//   }
// }
//   catch (e) {
//         if(productStore.loadCount > 2) {
//           return e
//         }
//     productStore.loadCount++
//         // @ts-ignore
//     productStore.componentInstance?.refresh()
//   }
//
//       // const fields = productApi.getFields(offsetParams as number)
//       return {data: uniqueItemsList, totalCount: totalCount}
//     }
//   })
// }