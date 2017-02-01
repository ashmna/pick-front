import * as React from "react";
import {IInjectedProps} from "react-router";
import Slider from "material-ui/Slider";


interface ISettingsPageProps extends IInjectedProps {
}

interface ISettingsPageState {
    loading?: boolean;
}

export class SettingsPage extends React.Component<ISettingsPageProps, ISettingsPageState> {


    private data: any[] = [
        ["Type", "Significance-name"],
        ["", ""],
    ];

    private significances: any = {
    };

    constructor(props: ISettingsPageProps, context: any) {
        super(props, context);
        this.state = {
            loading: true,
        };
        // this.loadCouriers();
    }

    private loadRestaurants() {
        this.setState({loading: true});
        // this.restaurantService
        //     .getRestaurants()
        //     .then((restaurants: any[]) => {
        //         this.restaurants = restaurants;
        //         this.setState({loading: false});
        //     })
    }


    private initChart() {
        google.charts.load("current", {"packages": ["corechart"]});

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(() => this.drawChart());
    }

    private drawChart() {

        // Create the data table.
        const data = new google.visualization.DataTable();
        data.addColumn("number", "");
        data.addColumn("number", "");

        data.addRows(this.data);

        // Set chart options
        const options = {
            title: "",
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
        return (
            <div>
                <div id="chart_div"></div>
                <div>
                </div>
            </div>
        );
    }
}
