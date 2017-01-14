import * as React from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {RestaurantService} from "../service/RestaurantService";
import {Link, IInjectedProps} from "react-router";

interface IRestaurantItemPageProps extends IInjectedProps {
}

interface IRestaurantItemPageState {
    loading?: boolean;
}

export class RestaurantItemPage extends React.Component<IRestaurantItemPageProps, IRestaurantItemPageState> {

    private restaurantId: number;
    private restaurantItems: any[];
    private restaurantService = new RestaurantService();

    constructor(props: IRestaurantItemPageProps, context: any) {
        super(props, context);
        this.restaurantId = parseInt(props.params['restaurantId'], 10);
        this.state = {
            loading: true,
        };
        this.loadRestaurantItemsItems();
    }

    private loadRestaurantItemsItems() {
        this.setState({loading: true});
        this.restaurantService
            .getRestaurantItems(this.restaurantId)
            .then((restaurantItems: any[]) => {
                this.restaurantItems = restaurantItems;
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
                            <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The ItemNumber">ItemNumber</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The MenuItemID">MenuItemID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The OrderNumber">OrderNumber</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Restaurant">Restaurant</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={false}
                        showRowHover={true}
                        stripedRows={true}
                    >
                        {this.restaurantItems.map((row: any, index: number) => (
                            <TableRow key={index} selected={row.selected}>
                                <TableRowColumn>{row.ID}</TableRowColumn>
                                <TableRowColumn><Link to={"restaurant-item-cooking-speed/" + this.restaurantId + "/" + row.ItemNumber}>{row.ItemNumber}</Link></TableRowColumn>
                                <TableRowColumn>{row.MenuItemID}</TableRowColumn>
                                <TableRowColumn>{row.OrderNumber}</TableRowColumn>
                                <TableRowColumn>{row.Restaurant}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        );
    }
}
