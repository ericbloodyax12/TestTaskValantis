import {useState} from "react";
import {Column, DataGrid, Pager, Paging} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import {productApi} from "../../api/productApi";
import {filterUniqueById} from "./helpers/filterUniqueById";

export const ProductList = () => {
  const customStore = new CustomStore({
    key: 'id',
    loadMode: "processed",
    async load(loadOptions) {
      const list = await productApi.getItems()
      const uniqueItemsList = filterUniqueById(list.result)
      return {data: uniqueItemsList, totalCount: uniqueItemsList.length}
    }
  })
  const [products, setProducts] = useState([])
  return (
      <div>
        <DataGrid dataSource={customStore}
                  showBorders={true}
                  remoteOperations={false}
                  height={400}
                  keyExpr={'id'}
        >
          <Column dataField={'product'} caption={'Продукт'}/>
          <Column dataField={'price'} caption={'Цена'}/>
          <Paging defaultPageSize={10} />
          <Pager showPageSizeSelector={true} allowedPageSizes={[10]} />
        </DataGrid>

      </div>
  )
}