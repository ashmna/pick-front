import * as React from "react";
import {IInjectedProps} from "react-router";
import Slider from "material-ui/Slider";
import {StateService} from "../service/StateService";


interface IStatePageProps extends IInjectedProps {
}

interface IStatePageState {
    loading?: boolean;
}

export class StatePage extends React.Component<IStatePageProps, IStatePageState> {

    private stateService: StateService = new StateService();

    private data: any[] = [
        ["Type", "Significance-name"],
        ["", ""],
    ];


    constructor(props: IStatePageProps, context: any) {
        super(props, context);
        this.state = {
            loading: true,
        };
        this.loadState();
        this.initChart();
    }

    private loadState() {
        this.stateService.getCurrentState().then((data: any) => {
            console.log(data);
        });
    }


    private initChart() {
        google.charts.load('upcoming', {packages: ['map']});

        google.charts.setOnLoadCallback(() => this.drawChart());
    }

    private drawChart() {

        // Create the data table.
        // const data = new google.visualization.DataTable();
        // data.addColumn("number", "");
        // data.addColumn("number", "");
        //
        // data.addRows(this.data);



        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Address');
        data.addColumn('string', 'Location');
        data.addColumn('string', 'Marker');

        data.addRows([
            ['New York City NY, United States', 'New York',   'busy' ],
            ['Scranton PA, United States',      'Scranton',   'wait2'],
            ['Washington DC, United States',    'Washington', 'customer' ],
            ['Philadelphia PA, United States',  'Philly',     'customer'],
            ['Pittsburgh PA, United States',    'Pittsburgh', 'restaurant'],
            ['Buffalo NY, United States',       'Buffalo',    'restaurant' ],
            ['Baltimore MD, United States',     'Baltimore',  'wait' ],
            ['Albany NY, United States',        'Albany',     'wait2' ],
            ['Allentown PA, United States',     'Allentown',  'wait']
        ]);


        // Set chart options
        const options = {
            title: "",
            width: 1000,
            height: 500,
            legend: { position: "bottom" },

            zoomLevel: 6,
            showTooltip: true,
            showInfoWindow: true,
            useMapTypeControl: true,
            icons: {
                busy: {
                    normal:   'icon/busy.png',
                    selected: 'icon/busy.png'
                },
                customer: {
                    normal:   'icon/customer.png',
                    selected: 'icon/customer.png'
                },
                restaurant: {
                    normal:   'icon/restaurant.png',
                    selected: 'icon/restaurant.png'
                },
                wait: {
                    normal:   'icon/wait.png',
                    selected: 'icon/wait.png'
                },
                wait2: {
                    normal:   'icon/wait2.png',
                    selected: 'icon/wait2.png'
                },
            }
        };

        // Instantiate and draw our chart, passing in some options.
        const chart = new google.visualization.Map(document.getElementById("map"));
        chart.draw(data, options);
    }


    render() {
        return (
            <div>
                <div id="map"></div>
            </div>
        );
    }
}
