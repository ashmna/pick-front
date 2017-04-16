import {url, randomLatLng} from "../helper";
import {ajax} from "jquery";
import {IOrder} from "Model";
import {ICourier} from "Model";

export class OrderService {

    getOrders(): Promise<{total: number, data: IOrder[]}> {
        console.log('order service');
        return new Promise((resolve, reject) => {
            resolve({
                total: 5,
                data: [
                    {
                        id: 45,
                        status: "todo",
                        courier_id: 1071,
                        is_courier_picked_manual: true,
                        order_address: "36/2 Pushkin St, Yerevan, Armenia",
                        order_item_info: "4 մեծ շաուրմա, 2 կոլա, 3 թան",
                        restaurant_info: "Tumanyan Shaurma | 32 Tumanyan St, Yerevan 0001, Armenia",
                    },
                    {
                        id: 12,
                        status: "todo",
                        courier_id: 1112,
                        is_courier_picked_manual: false,
                        order_address: "36/2 Pushkin St, Yerevan, Armenia",
                        order_item_info: "4 մեծ շաուրմա, 2 կոլա, 3 թան",
                        restaurant_info: "Tumanyan Shaurma | 32 Tumanyan St, Yerevan 0001, Armenia",
                    }
                ]
            });
            /*ajax({
             method: "GET",
             url: url("order"),
             type: "jsonp",
             contentType: "application/json; charset=utf-8",
             })
             .done(resolve)
             .fail(reject);*/
        });
    }

    getOrder(id: number|string): Promise<IOrder> {
        return new Promise((resolve, reject) => {
            ajax({
                method: "GET",
                url: url("pick/order/" + id),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
            })
                .done(resolve)
                .fail(reject);
        });
    }

    confirmCourierForOrder(order: IOrder, courier: ICourier): Promise<any> {
        return new Promise((resolve, reject) => {
            ajax({
                method: "PUT",
                url: url("pick/order/courier/" + order.id + "/" + courier.id),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
            })
                .done(resolve)
                .fail(reject);
        });
    }

    setCourierToOrder(order: IOrder, courier: ICourier): Promise<any> {
        return new Promise((resolve, reject) => {
            ajax({
                method: "PUT",
                url: url("pick/order/" + order.id),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    courier_id: courier.id,
                    is_courier_picked_manual: true,
                }),
            })
                .done(resolve)
                .fail(reject);
        });
    }

    enableCourierSuggestion(order: IOrder): Promise<any> {
        return new Promise((resolve, reject) => {
            ajax({
                method: "PUT",
                url: url("pick/order/" + order.id),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    is_courier_picked_manual: false,
                }),
            })
                .done(resolve)
                .fail(reject);
        });
    }
}
