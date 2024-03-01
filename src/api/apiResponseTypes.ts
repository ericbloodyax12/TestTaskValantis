
export type GetItemsResponseType = {
	result: GetItemsResponseTypeResult[];
}
export type GetItemsResponseTypeResult = {
	brand?: any;
	id: string;
	price: number;
	product: string;
}

export type GetIdsResponseType = {
	result: string[];
}

export type ActionType =  "get_ids" | "get_items" |  "get_fields" | "filter"

export type GetIdsPayloadParamType = {
	offset: number;
	limit: number;
}
export type GetItemsPayLoadParamType = {
	ids: string[];
}
export type GetFilterResponseType<P> = {
	action: string;
	params: P;
}

export type GetFilterRequestParams = {
	[key: string]: any; // любые параметры, ключ - название поля, значение - его значение
}
export type FilterResponseResultType = GetIdsResponseType
export type FilterType = 'product' | 'brand' | 'price'
export type FilterPayloadType = {
	[key in FilterType]?: number| string
}
// export type GetFieldsResponseType = {
// 	action: ActionType;
// 	params?: GetFieldsResponseTypeParams;
// }
// export type GetFieldsResponseTypeParams = {
// 	field: string;
// 	offset: number;
// 	limit: number;
// }
