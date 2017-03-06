import {url, randomLatLng} from "../helper";
import {ajax} from "jquery";

export class StateService {

    getCurrentState(): Promise<any> {
        return new Promise((resolve, reject) => {
            ajax({
                method: "GET",
                url: url("pick/state"),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
            })
                .done(resolve)
                .fail(reject);
        });
    }

    setRandomOrder(): Promise<any> {
        const data = [
            {id: 19,  lat: 40.1665764, lng: 44.5132354, items: [30, 31, 34]},
            {id: 49,  lat: 40.1739979, lng: 44.5213035, items: [71, 72, 75]},
            {id: 51,  lat: 40.1837310, lng: 44.5111862, items: [291, 216, 217]},
            {id: 52,  lat: 40.1918892, lng: 44.5203795, items: [1, 38, 42]},
            {id: 64,  lat: 40.2062505, lng: 44.5254904, items: [20, 22, 64]},
            {id: 71,  lat: 40.1796961, lng: 44.5004573, items: [55, 59, 64]},
            {id: 95,  lat: 40.1778973, lng: 44.5189876, items: [54, 57, 115]},
            {id: 117, lat: 40.1829508, lng: 44.5166621, items: [62, 88, 89]},
            {id: 159, lat: 40.1829508, lng: 44.5166621, items: [96, 97, 98]},
            {id: 187, lat: 40.1798593, lng: 44.5250268, items: [49, 50, 51]},
            {id: 252, lat: 40.1796961, lng: 44.5004573, items: [15, 16, 18]},
            {id: 284, lat: 40.1829508, lng: 44.5166621, items: [126, 117, 102]},
            {id: 353, lat: 40.1820773, lng: 44.5146677, items: [277, 200, 181]},
            {id: 386, lat: 40.2057999, lng: 44.5062259, items: [102, 59, 55]},
            {id: 597, lat: 40.1837310, lng: 44.5111862, items: [19, 28, 32]},
        ];
        const restaurantIndex = this.getRandomInt(0, data.length - 1);
        const {lat, lng} = randomLatLng();
        const itemCount = this.getRandomInt(1, data[restaurantIndex].items.length);
        let items = [];
        if (itemCount === 1) {
            const itemIndex = this.getRandomInt(1, data[restaurantIndex].items.length - 1);
            items.push({id: data[restaurantIndex].items[itemIndex], count: 1});
        } else {
            for (let i = 0; i< itemCount; ++i) {
                items.push({id: data[restaurantIndex].items[i], count: 1});
            }
        }


        const order_data = {
            restaurant_id: data[restaurantIndex].id,
            lat_restaurant: data[restaurantIndex].lat,
            lng_restaurant: data[restaurantIndex].lng,
            lat_client: lat,
            lng_client: lng,
            items: items,
        };


        return new Promise((resolve, reject) => {
            ajax({
                method: "POST",
                url: url("pick/order/add"),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({order: order_data}),
            })
                .done(resolve)
                .fail(reject);
        });
    }

    getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    regenerateToken(): Promise<any> {
        return new Promise((resolve, reject) => {
            ajax({
                method: "PUT",
                url: url("token/gen"),
                type: "jsonp",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    partner_id: 1
                }),
            })
                .done(resolve)
                .fail(reject);
        });
    }
}
