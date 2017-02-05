import {url} from "../helper";
import {ajax} from "jquery";

export class CourierService {

    getCouriers(): Promise<any> {
        return new Promise((resolve, reject) => {
            ajax({
                method: "GET",
                url: url("courier/list"),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
            })
                .done(resolve)
                .fail(reject);
        });
    }

    getCourierSpeed(courierId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            ajax({
                method: "GET",
                url: url("courier/speed/" + courierId),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
            })
                .done(resolve)
                .fail(reject);
        });
    }

    enableCourier(courierId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            ajax({
                method: "GET",
                url: url("pick/courier/enable/" + courierId),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
            })
                .done(resolve)
                .fail(reject);
        });

    }

    disableCourier(courierId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            ajax({
                method: "GET",
                url: url("pick/courier/disable/" + courierId),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
            })
                .done(resolve)
                .fail(reject);
        });
    }

    moveCourier(courierId: number, lat: string, lng: string): Promise<any> {
        return new Promise((resolve, reject) => {
            ajax({
                method: "GET",
                url: url("pick/courier/move/" + courierId + "?lat=" + lat + "&lng=" + lng),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
            })
                .done(resolve)
                .fail(reject);
        });
    }

    completeOrderCourier(courierId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            ajax({
                method: "GET",
                url: url("pick/courier/complete/" + courierId),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
            })
                .done(resolve)
                .fail(reject);
        });
    }
}
