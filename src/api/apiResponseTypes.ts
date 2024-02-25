
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
export type GetItiemsPayLoadParamType = {
	ids: string[];
}