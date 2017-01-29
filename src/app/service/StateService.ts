import {url} from "../helper";
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
}
