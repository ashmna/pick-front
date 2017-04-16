import * as React from "react";
import {IInjectedProps} from "react-router";
import CircularProgress from "material-ui/CircularProgress";
import {OrderService} from "../service/OrderService";
import {OrderItem} from "../component/order/OrderItem";
import {IOrder} from "Model";
import Pagination from "material-ui-pagination";


interface IOrdersPageProps extends IInjectedProps {
    loading?: boolean;

}

interface IOrdersPageState {
}

export class OrdersPage extends React.Component<IOrdersPageState, IOrdersPageProps> {

    private orderService = new OrderService();
    private orders: IOrder[] = [];
    private limit: number = 35;
    private totalCount: number = 0;
    private page: number = 1;

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
            .then(res => {
                this.totalCount = res.total;
                this.orders = res.data;
                this.setState({loading: false});
            });
    }

    private pageChangeHandler(page: number) {
        this.page = page;
        this.loadOrders();
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
        const pagination = this.renderPagination();
        const loading = this.renderLoading();

        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="row">
                        <div className="col-xs-11">
                            Filter todo
                        </div>
                        <div className="col-xs-1">
                            {loading}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            {pagination}
                        </div>
                    </div>

                    <div className="row"  style={{transform: "scale(0.8)"}}>
                        <div className="col-xs-12">
                            {this.orders.map((order, index) => (
                                <OrderItem key={index} order={order}/>
                            ))}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12">
                            {pagination}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    private renderLoading() {
        if (this.state.loading) {
            return (<CircularProgress size={20}/>);
        }
        return (<div/>);
    }
    private renderPagination() {
        if (this.totalCount <= this.limit) {
            return (<div/>);
        }
        return (
            <Pagination
                total={Math.ceil(this.totalCount / this.limit)}
                current={this.page}
                display={7}
                onChange={this.pageChangeHandler.bind(this)}
            />
        );
    }
}
