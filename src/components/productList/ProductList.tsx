import {useState} from "react";
import {Column, DataGrid, FilterRow, Pager, Paging} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import {productApi} from "../../api/productApi";
import {filterUniqueById} from "../../api/apiHelpers/filterUniqueById";


export const ProductList = () => {
  const customStore = new CustomStore({ //todo вынести
    key: 'id',
    loadMode: "processed",
    async load(loadOptions) {
      const offsetParams = loadOptions.skip
      const filterParams = loadOptions.filter
      console.log(filterParams)
      const list = await productApi.getItems(offsetParams as number)
      const uniqueItemsList = filterUniqueById(list.result)
      return {data: uniqueItemsList, totalCount: 8004}
    }
  })
  const [products, setProducts] = useState([])
  return (
      <div>
        <DataGrid dataSource={customStore}
                  showBorders={true}
                  remoteOperations={{
                    paging: true,
                    filtering: true,
                    sorting: false
                  }}
                  height={400}
                  keyExpr={'id'}
        >
          <FilterRow visible={true} showOperationChooser={false} />
          <Column dataField={'product'} caption={'Продукт'}/>
          <Column dataField={'price'} caption={'Цена'}/>
          <Paging defaultPageSize={50}/>
          <Pager showPageSizeSelector={true} allowedPageSizes={[50]}/>
        </DataGrid>

      </div>
  )
}