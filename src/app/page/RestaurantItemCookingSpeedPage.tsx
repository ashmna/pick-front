/// <reference path="../../../types/google.d.ts" />

import * as React from "react";
import {RestaurantService} from "../service/RestaurantService";
import {IInjectedProps} from "react-router";

interface IRestaurantItemCookingSpeedPageProps extends IInjectedProps {
}

interface IRestaurantItemCookingSpeedPageState {
    loading?: boolean;
}

export class RestaurantItemCookingSpeedPage extends React.Component<IRestaurantItemCookingSpeedPageProps, IRestaurantItemCookingSpeedPageState> {

    private restaurantId: number;
    private itemNumber: number;
    private data: any;
    private restaurantService = new RestaurantService();

    constructor(props: IRestaurantItemCookingSpeedPageProps, context: any) {
        super(props, context);
        this.restaurantId = parseInt(props.params["restaurantId"], 10);
        this.itemNumber = parseInt(props.params["itemNumber"], 10);
        this.state = {
            loading: true,
        };
        this.loadRestaurantItemCookingSpeed();
    }

    private loadRestaurantItemCookingSpeed() {
        this.setState({loading: true});
        this.restaurantService
            .getRestaurantItemCookingSpeed(this.restaurantId, this.itemNumber)
            .then((data: any) => {
                this.data = data;
                this.setState({loading: false});
                this.initChart();
            });
    }

    private initChart() {
        google.charts.load("current", {"packages": ["corechart"]});

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(() => this.drawChart());
    }

    private drawChart() {

        // Create the data table.
        const data = new google.visualization.DataTable();
        data.addColumn("string", "Time");
        data.addColumn("number", "Cooking Time");

        data.addRows(this.data);

        // Set chart options
        const options = {
            title: this.restaurantId + " --- " + this.itemNumber,
            width: 1000,
            height: 500,
            curveType: "function",
            legend: { position: "bottom" }
        };

        // Instantiate and draw our chart, passing in some options.
        const chart = new google.visualization.LineChart(document.getElementById("chart_div"));
        chart.draw(data, options);
    }


    render() {
        if (this.state.loading) {
            return (<h1>Loading...</h1>);
        }
        return (
            <div>

                <div id="chart_div"></div>

            </div>
        );
    }
}
