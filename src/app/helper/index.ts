import {URL_ROOT} from "../settings";

export function url(path: string) {
    return `${URL_ROOT}/${path}`;
}

export function randomLatLng() {
    const lat = (Math.random() * (40.2304 - 40.1416) + 40.1416).toFixed(4);
    const lng = (Math.random() * (44.5681 - 44.4224) + 44.4224).toFixed(4);
    return {lat: lat, lng: lng};
}
