import CustomStore from "devextreme/data/custom_store";
import {FilterPayloadType, FilterType, GetItemsResponseTypeResult} from "../api/apiResponseTypes";
import {productApi} from "../api/productApi";
import {filterUniqueById} from "../api/apiHelpers/filterUniqueById";



 export const loadObject =  {
   customStore : new CustomStore({
    key: 'id',
    loadMode: "processed",
    async load(loadOptions) {
      const offsetParams = loadOptions.skip
      let uniqueItemsList: GetItemsResponseTypeResult[] = []
      let totalCount: number = 8004 // захардкодили, используя запрос за всеми ids

      if (loadOptions.filter ) {
        const dataField: FilterType = loadOptions.filter[0]
        const filterParams: FilterPayloadType = {[dataField]:loadOptions.filter[2]}
        const filteredProductsIds = await productApi.getFilter<FilterPayloadType>(filterParams)
        totalCount = filteredProductsIds.result.length
        const filteredProductList = await productApi.getItems(offsetParams as number, filteredProductsIds)
        uniqueItemsList = filterUniqueById(filteredProductList.result)
      } else {
        const list = await productApi.getItems(offsetParams as number)
        uniqueItemsList = filterUniqueById(list.result)
      }

      // const fields = productApi.getFields(offsetParams as number)
      return {data: uniqueItemsList, totalCount: totalCount}
    }
  })
}