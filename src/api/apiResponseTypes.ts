
export type getItemsResponseType = {
	result: GetItemsResponseTypeResult[];
}
export type GetItemsResponseTypeResult = {
	brand?: any;
	id: string;
	price: number;
	product: string;
}