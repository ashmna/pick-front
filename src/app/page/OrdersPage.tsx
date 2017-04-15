import * as React from "react";
import {IInjectedProps} from "react-router";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import FlatButton from 'material-ui/FlatButton';
import {randomLatLng} from "../helper/index";
import {OrderService} from "../service/OrderService";
import {OrderItem} from "../component/order/OrderItem";




interface IOrdersPageProps extends IInjectedProps {
    loading?: boolean;

}

interface IOrdersPageState {
}

export class OrdersPage extends React.Component<IOrdersPageState, IOrdersPageProps> {

    private orders: any[] = [];
    private orderService = new OrderService();

    constructor(props: IOrdersPageProps, context: any) {
        super(props, context);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        this.loadOrders();
    }

    private loadOrders() {
        this.setState({loading: true});
        this.orderService
            .getOrders()
            .then((orders: any[]) => {
                this.orders = orders;
                this.setState({loading: false});
                console.log(this.orders);
            });
    }
/*

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

    private completeOrderCourier(courier: any) {
        console.log(' - completeOrderCourier', courier);
        this.courierService.completeOrderCourier(courier.courier_id)
            .then((res) => {
                console.log('completeOrderCourier', res);
            });
    }
*/

    render() {

        if (this.state.loading) {
            return (<h1>Loading...</h1>);
        }
        return (
            <div>

                {this.orders.map((order, index) => (
                    <OrderItem key={index} orderData={order}/>

                ))}
            </div>
        );

    }
}
