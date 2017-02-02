import * as React from "react";
import {IInjectedProps} from "react-router";
import {CourierService} from "../service/CourierService";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import FlatButton from 'material-ui/FlatButton';
import {randomLatLng} from "../helper/index";




interface ICourierPageProps extends IInjectedProps {
}

interface ICourierPageState {
    loading?: boolean;
}

export class CourierPage extends React.Component<ICourierPageProps, ICourierPageState> {

    private couriers: any[];
    private courierService = new CourierService();

    constructor(props: ICourierPageProps, context: any) {
        super(props, context);
        this.state = {
            loading: true,
        };
        this.loadCouriers();
    }

    private loadCouriers() {
        this.setState({loading: true});
        this.courierService
            .getCouriers()
            .then((couriers: any[]) => {
                this.couriers = couriers;
                this.setState({loading: false});
            });
    }

    private enableCourier(courier: any) {
        console.log(' - enableCourier', courier);
        this.courierService.enableCourier(courier.courier_id)
            .then((res) => {
                console.log('enableCourier', res);
            });
    }

    private disableCourier(courier: any) {
        console.log(' - disableCourier', courier);
        this.courierService.disableCourier(courier.courier_id)
            .then((res) => {
                console.log('disableCourier', res);
            });
    }

    private moveCourier(courier: any) {
        console.log(' - moveCourier', courier);
        const {lat, lng} = randomLatLng();
        this.courierService.moveCourier(courier.courier_id, lat, lng)
            .then((res) => {
                console.log('moveCourier', res);
            });
    }

    render() {
        if (this.state.loading) {
            return (<h1>Loading...</h1>);
        }
        return (
            <div>

                <Table
                    height="400px"
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
                            <TableHeaderColumn tooltip="The count">Count</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={false}
                        showRowHover={true}
                        stripedRows={true}
                    >
                        {this.couriers.map((row: any, index: number) => (
                            <TableRow key={index} selected={row.selected}>
                                <TableRowColumn>{row.courier_id}</TableRowColumn>
                                <TableRowColumn>{row.count}</TableRowColumn>
                                <TableRowColumn>
                                    <FlatButton label="Enable" onTouchTap={() => this.enableCourier(row)}/>
                                </TableRowColumn>
                                <TableRowColumn>
                                    <FlatButton label="Disable" onTouchTap={() => this.disableCourier(row)}/>
                                </TableRowColumn>
                                <TableRowColumn>
                                    <FlatButton label="Move" onTouchTap={() => this.moveCourier(row)}/>
                                </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        );
    }
}
