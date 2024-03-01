import {useState} from "react";
import {Column, DataGrid, FilterRow, Pager, Paging} from "devextreme-react/data-grid";
import {loadObject} from "./helpers/loadStore";


export const ProductList = () => {
  const [currentFiltering, setCurrentFiltering] = useState();
  return (
      <div>
        <DataGrid dataSource={loadObject.customStore}
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
          <Column dataField={'brand'} caption={'Бренд'} width={200} allowFiltering={false}/>
          <Column dataField={'product'} caption={'Продукт'} allowFiltering={false}/>
          <Column dataField={'price'} caption={'Цена'} allowFiltering={false}/>
          <Paging defaultPageSize={50}/>
          <Pager showPageSizeSelector={true} allowedPageSizes={[50]}/>
        </DataGrid>
      </div>
  )
}