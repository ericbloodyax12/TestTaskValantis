import {useState} from "react";
import {Column, DataGrid, FilterRow, Pager, Paging} from "devextreme-react/data-grid";
import {loadObject} from "../../state/loadStore";
import {UiHelper} from "./helpers/uiHelper";
import {FilterType} from "../../api/apiResponseTypes";



export const ProductList = () => {
  const [currentFiltering, setCurrentFiltering] = useState<FilterType | undefined>();

  return (
      <div>
        <DataGrid dataSource={loadObject.customStore}
                  showBorders={true}
                  onOptionChanged={(e) => {
                    const optionName = e.fullName
                    const isFilterOperation = UiHelper.checkIsFilterOperation(optionName)
                    if (isFilterOperation) {
                       UiHelper.setCurrentFilter(e, setCurrentFiltering)
                    }
                  }}
                  remoteOperations={{
                    paging: true,
                    filtering: true,
                  }}
                  height={400}
                  keyExpr={'id'}
        >
          <FilterRow visible={true} showOperationChooser={false} />
          <Column dataField={'brand'} caption={'Бренд'} width={200} allowFiltering={currentFiltering === undefined ? true : currentFiltering === "brand"} onFilterValuesChange={(e) => {
            console.log('e',e)
          }}/>
          <Column dataField={'product'} caption={'Продукт'} allowFiltering={currentFiltering === undefined ? true : currentFiltering === 'product'}/>
          {/*//currentFilter == 'product'*/}
          <Column dataField={'price'} caption={'Цена'} allowFiltering={currentFiltering === undefined ? true : currentFiltering === 'price'}/>
          <Paging defaultPageSize={50}/>
          <Pager showPageSizeSelector={true} allowedPageSizes={[50]}/>
        </DataGrid>
      </div>
  )
}