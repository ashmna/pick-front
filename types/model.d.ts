declare module "Model" {

    export interface ICourier {
        id: number|string;
        name: string;
        transport_type: string;
        avatar: string;
    }

    export type OrderStatus = "todo" | "done" | "inProgress";

    export interface IOrder {
        show:boolean;
        id: number|string;
        order_id: number|string;
        status: OrderStatus;
        courier_id: number|string;
        is_courier_picked_manual: boolean;
        estimated_complete_datetime: {$date: number};
        order_address: string;
        order_item_info: string;
        restaurant_info: string;
    }
}
