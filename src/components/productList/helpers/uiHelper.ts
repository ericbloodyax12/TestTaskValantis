import DataGrid from "devextreme/ui/data_grid";
import {FilterType} from "../../../api/apiResponseTypes";
import {Dispatch, SetStateAction} from "react";




export class UiHelper {
  static FILTER_OPERATION_NAME = "filterValue"
  static checkIsFilterOperation(optionName: string) {

    const splitedOptionNames = optionName.split('.')
    return (splitedOptionNames[1] === this.FILTER_OPERATION_NAME)
  }

  static setCurrentFilter(e: {component: DataGrid}, setCurrentFiltering: Dispatch<SetStateAction<FilterType | undefined>>) {
    const dataGrid = e.component
    const filtersArrays =  dataGrid.getCombinedFilter()

    if (filtersArrays) {
       (typeof filtersArrays[0] === 'object')
        ? setCurrentFiltering(filtersArrays[0][0])
        : setCurrentFiltering(filtersArrays[0])
    } else {
      setCurrentFiltering(undefined)
    }
  }
}


