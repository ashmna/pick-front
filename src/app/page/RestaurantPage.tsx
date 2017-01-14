import * as React from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import {RestaurantService} from "../service/RestaurantService";
import {Link, IInjectedProps} from "react-router";

interface IRestaurantPageProps extends IInjectedProps {
}

interface IRestaurantPageState {
    loading?: boolean;
}

export class RestaurantPage extends React.Component<IRestaurantPageProps, IRestaurantPageState> {

    private restaurants: any[];
    private restaurantService = new RestaurantService();

    constructor(props: IRestaurantPageProps, context: any) {
        super(props, context);
        this.state = {
            loading: true,
        };
        this.loadRestaurants();
    }

    private loadRestaurants() {
        this.setState({loading: true});
        this.restaurantService
            .getRestaurants()
            .then((restaurants: any[]) => {
                this.restaurants = restaurants;
                this.setState({loading: false});
            })
    }


    render() {
        if (this.state.loading) {
            return (<h1>Loading...</h1>);
        }
        return (
            <div>

                <Table
                    height="400"
                    fixedHeader={true}
                    fixedFooter={false}
                    selectable={false}
                    multiSelectable={false}
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="The Id">Id</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The lat">Lat</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The lng">Lng</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The street">Street</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The city">City</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The country">Country</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={false}
                        showRowHover={true}
                        stripedRows={true}
                    >
                        {this.restaurants.map((row: any, index: number) => (
                            <TableRow key={index} selected={row.selected}>
                                <TableRowColumn><Link to={"restaurant-items/" + row.ID}>{row.ID}</Link></TableRowColumn>
                                <TableRowColumn>{row.lat}</TableRowColumn>
                                <TableRowColumn>{row.lng}</TableRowColumn>
                                <TableRowColumn>{row.street}</TableRowColumn>
                                <TableRowColumn>{row.city}</TableRowColumn>
                                <TableRowColumn>{row.country}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        );
    }
}
