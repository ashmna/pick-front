import {URL_ROOT} from "../settings";

export function url(path: string, query: any = {}) {
    const queryString: string = buildQueryString(query);
    const url = `${URL_ROOT}/${path}`;
    if (queryString) {
        return url + "?" + queryString;
    }
    return url;
}

function buildQueryString(query: any) {
    query = query || {};
    const arr: string[] = [];
    for (let key in query) {
        if (key === "where") {
            arr.push(key + "=" + JSON.stringify(query[key]));
        } else {
            if (query[key] === true) {
                query[key] = 1;
            }
            if (query[key] === false) {
                query[key] = 0;
            }
            arr.push(key + "=" + query[key]);
        }
    }
    return arr.join("&");
}

export function randomLatLng() {
    const lat = (Math.random() * (40.2304 - 40.1416) + 40.1416).toFixed(4);
    const lng = (Math.random() * (44.5681 - 44.4224) + 44.4224).toFixed(4);
    return {lat: lat, lng: lng};
}
