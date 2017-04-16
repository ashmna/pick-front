declare module "Model" {

    export interface ICourier {
        id: number|string;
        name: string;
        transport_type: string;
        avatar: string;
    }

    export type OrderStatus = "todo" | "done" | "inProgress";

    export interface IOrder {
        id: number|string;
        status: OrderStatus;
        courier_id: number|string;
        is_courier_picked_manual: boolean;
        eta: string;
        order_address: string;
        order_item_info: string;
        restaurant_info: string;
    }
}
