/// <reference path="../../types/google.d.ts" />
import * as React from "react";
import * as ReactDom from "react-dom";
import * as injectTapEventPlugin from "react-tap-event-plugin";
import {Router, IndexRoute, Route, hashHistory} from "react-router";
import {Dashboard} from "./Dashboard";
import {RestaurantPage} from "./page/RestaurantPage";
import {RestaurantItemPage} from "./page/RestaurantItemPage";
import {RestaurantItemCookingSpeedPage} from "./page/RestaurantItemCookingSpeedPage";
import {StatePage} from "./page/StatePage";
import {CourierPage} from "./page/CourierPage";
import {OrdersPage} from "./page/OrdersPage";

injectTapEventPlugin();

// <Route path="/" component={Dashboard}>
//     <IndexRoute component={DashboardPage}/>
//     <Route path="issues" component={IssuePage}/>
//     <Route path="users-statistics" component={UsersStatisticsPage}/>
// </Route>



ReactDom.render(
    <Router history={hashHistory}>
        <Route path="/" component={Dashboard}>
            <IndexRoute component={StatePage}/>
            <Route path="restaurants" component={RestaurantPage}/>
            <Route path="restaurant-items/:restaurantId" component={RestaurantItemPage}/>
            <Route path="restaurant-item-cooking-speed/:restaurantId/:itemNumber" component={RestaurantItemCookingSpeedPage}/>
            <Route path="couriers" component={CourierPage}/>
            <Route path="orders" component={OrdersPage}/>
        </Route>
    </Router>,
    document.getElementById("app")
);
