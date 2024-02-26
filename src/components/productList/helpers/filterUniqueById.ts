import {GetItemsResponseTypeResult} from "../../../api/apiResponseTypes";

export function filterUniqueById (data:GetItemsResponseTypeResult[]) {
  const uniqueIds = new Set();

  const uniqueData = data.filter(item => {
    if (!uniqueIds.has(item.id)) {
      uniqueIds.add(item.id);
      return true;
    }
    return false;
  });

  return uniqueData;
}