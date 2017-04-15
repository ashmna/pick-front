import {url, randomLatLng} from "../helper";
import {ajax} from "jquery";

export class OrderService {

    getOrders(): Promise<any> {
        console.log('order service');
        return new Promise((resolve, reject) => {
            resolve([
                {id:45,address:'ave',restaurant:{address:'1 str.',name:'krs'},couriers:{selected:10,list:[10,20,30]}},
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
