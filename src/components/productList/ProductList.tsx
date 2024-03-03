import {useState} from "react";
import {Column, DataGrid, FilterRow, Pager, Paging} from "devextreme-react/data-grid";
import {productStore} from "../../state/loadStore";
import {UiHelper} from "./helpers/uiHelper";
import {FilterType} from "../../api/apiResponseTypes";


export const ProductList = () => {
  const [currentFiltering, setCurrentFiltering] = useState<FilterType | undefined>();

  return (
      <div>
        <DataGrid dataSource={productStore.getCustomStore()}
                  showBorders={true}
                  onInitialized={(e) => {
                    productStore.setComponentInstance(e.component)
                  }}
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
                  sorting={{mode: "none"}}
        >
          <FilterRow visible={true} showOperationChooser={false}/>
          <Column dataField={'brand'} caption={'Бренд'} width={200}
                  allowFiltering={currentFiltering === undefined ? true : currentFiltering === "brand"}
                  onFilterValuesChange={(e) => {
                    console.log('e', e)
                  }}/>
          <Column dataField={'product'} caption={'Продукт'}
                  allowFiltering={currentFiltering === undefined ? true : currentFiltering === 'product'}
          />
          <Column dataField={'price'} caption={'Цена'}
                  allowFiltering={currentFiltering === undefined ? true : currentFiltering === 'price'}
          />
          <Paging defaultPageSize={50}/>
          <Pager showPageSizeSelector={true} allowedPageSizes={[50]}/>
        </DataGrid>
      </div>
  )
}