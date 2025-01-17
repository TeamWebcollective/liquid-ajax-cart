export type JSONValueType =
    | string
    | number
    | boolean
    | { [key: string]: JSONValueType }
    | Array<JSONValueType>
    | null;

export type JSONObjectType = {
    [x: string]: JSONValueType;
}

export type RequestBodyType = JSONObjectType | FormData | URLSearchParams | undefined;

export type RequestStateInfoType = {
	initiator?: Element,
	cancel?: boolean
}

export type RequestStateType = {
	requestType: string,
	endpoint: string,
	requestBody: RequestBodyType,
	info: RequestStateInfoType,
	responseData?: {
		ok: boolean,
		status: number,
		body: JSONObjectType
	},
	extraResponseData?: {
		ok: boolean,
		status: number,
		body: JSONObjectType
	},
	fetchError?: string
}

export type CartRequestOptionsType = {
	firstComplete?: (requestState: RequestStateType) => void,
	lastComplete?: (requestState: RequestStateType) => void,
	info?: RequestStateInfoType,
	newQueue?: boolean
}

export type RequestResultCallback = ( requestState: RequestStateType) => void;
export type RequestResultSubscriberType = ( resultCallback: RequestResultCallback ) => void;

export type RequestCallbackType = ( requestState: RequestStateType, subscribeToResult: RequestResultSubscriberType ) => void;
export type QueuesCallbackType = ( inProgress: boolean ) => void;

export type LineItemType = {
	key: string,
	id: number,
	quantity: number,
	properties: {
		[key: string]: JSONValueType
	}
}

export type AppStateCartType = JSONObjectType & {
	attributes: {
		[key: string]: JSONValueType
	},
	items: Array<LineItemType>,
	item_count: number
} | null;
export type AppStateStatusType = {
	requestInProgress: boolean,
	cartStateSet: boolean
}
export type AppStateType = JSONObjectType & {
	status: AppStateStatusType,
	cart: AppStateCartType,
	previousCart: AppStateCartType | undefined
}
export type StateSubscriberType = (state: AppStateType, isCartUpdated: boolean) => void;

export type ConfigurationValue = 
	| string 
	| boolean
	| ((formNode: HTMLFormElement) => boolean) 
	| ((messages: Array<MessageType>) => string);

export type FormattersObjectType = {
	[key: string]: (value: JSONValueType | undefined) => JSONValueType | undefined
}

export type MessageType = {
	type: string,
	text: string,
	code: string,
	requestState: RequestStateType
}

export type UpdatedSectionType = {
	id: string,
	elements: Array<Element>
}
export type SectionsSubscriberType = (sections: Array<UpdatedSectionType>) => void;

declare global {
    interface Window { 
    	liquidAjaxCart: {
    		configureCart: ( property: string, value: ConfigurationValue ) => void,
    		cartRequestGet: ( options: CartRequestOptionsType | undefined ) => void,
    		cartRequestAdd: ( body: RequestBodyType, options: CartRequestOptionsType | undefined ) => void, 
			cartRequestChange: ( body: RequestBodyType, options: CartRequestOptionsType | undefined ) => void, 
			cartRequestUpdate: ( body: RequestBodyType, options: CartRequestOptionsType | undefined ) => void, 
			cartRequestClear: ( body: RequestBodyType, options: CartRequestOptionsType | undefined ) => void, 
			subscribeToCartAjaxRequests: ( callback: RequestCallbackType ) => void,
			getCartState: () => AppStateType,
			subscribeToCartStateUpdate: ( callback: StateSubscriberType ) => void,
			subscribeToCartSectionsUpdate: ( callback: SectionsSubscriberType ) => void,
    	}
    	Shopify: JSONObjectType 
    }
}