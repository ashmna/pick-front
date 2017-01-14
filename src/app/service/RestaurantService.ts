import {url} from "../helper";
import {ajax} from "jquery";

export class RestaurantService {

    generateCookingSpeedData(): Promise<any> {
        return new Promise((resolve, reject) => {
            ajax({
                method: "GET",
                url: url("restaurant/gen"),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
            })
                .done(resolve)
                .fail(reject);
        });
    }

    getRestaurants(): Promise<any> {
        return new Promise((resolve, reject) => {
            ajax({
                method: "GET",
                url: url("restaurant/list"),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
            })
                .done(resolve)
                .fail(reject);
        });
    }

    getRestaurantItems(restaurantId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            ajax({
                method: "GET",
                url: url("restaurant/items/" + restaurantId),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
            })
                .done(resolve)
                .fail(reject);
        });
    }

    getRestaurantItemCookingSpeed(restaurantId: number, itemNumber: number): Promise<any> {
        return new Promise((resolve, reject) => {
            ajax({
                method: "GET",
                url: url("restaurant/item/cooking-speed/" + restaurantId + "/" + itemNumber),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
            })
                .done(resolve)
                .fail(reject);
        });
    }
}
