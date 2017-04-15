import {url, randomLatLng} from "../helper";
import {ajax} from "jquery";

export class OrderService {

    getOrders(): Promise<any> {
        console.log('order service');
        return new Promise((resolve, reject) => {
            resolve([
                {
                    id: 45,
                    order_address: "36/2 Pushkin St, Yerevan, Armenia",
                    order_item_info: "4 մեծ շաուրմա, 2 կոլա, 3 թան",
                    restaurant_info: "Tumanyan Shaurma | 32 Tumanyan St, Yerevan 0001, Armenia",
                },
            ]);
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
}
