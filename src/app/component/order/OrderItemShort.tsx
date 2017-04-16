
import * as React from "react";
import {colors} from "material-ui/styles";
import Paper from "material-ui/Paper";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import OrderLocationIcon from "material-ui/svg-icons/communication/location-on";
import OrderFoodsIcon from "material-ui/svg-icons/action/home";
import RestaurantLocationIcon from "material-ui/svg-icons/action/shopping-cart";

import {couriers} from "../../settings";
import {OrderStatusInfoSuggested} from "./OrderStatusInfoSuggested";
import {OrderStatusInfoPending} from "./OrderStatusInfoPending";
import {IOrder} from "Model";
import {ICourier} from "Model";
import {OrderStatusInfoConfirmed} from "./OrderStatusInfoConfirmed";
import {OrderStatusInfoCompleted} from "./OrderStatusInfoCompleted";
import {OrderService} from "../../service/OrderService";

export interface OrderItemShortProps {
    order: IOrder;
}

export interface OrderItemShortState {
    active?: boolean;
    selectedCourier?: any;
    loading?: boolean;
}


const style = {
    normal: {
        margin: "5px",
        padding: "10px",
    },
    active: {
        margin: "5px",
        padding: "10px",
    },
    normalIcon: {
        color: colors.grey200,
    },
    activeIcon: {
        color: colors.grey600,
    },
    icon: {
        paddingTop: "5px",
        position: "relative",
        top: "3px",
    }
};

export class OrderItemShort extends React.Component<OrderItemShortProps, OrderItemShortState> {

    private couriers: any = couriers;
    private orderService: OrderService = new OrderService();

    constructor(props: OrderItemShortProps, context: any) {
        super(props, context);
        this.state = {
            active: false,
            selectedCourier: null,
            loading: false,
        };
    }

    componentDidMount() {
        this.detectSelectedCourier();
    }

    private detectSelectedCourier() {
        this.setState({selectedCourier: this.getCourierByOrder()});
    }

    private courierChangeHandler(event: any, index: number, value: any) {
        this.setState({selectedCourier: value});
        this.reload(true);
        this.orderService.setCourierToOrder(this.props.order, value)
            .then(res => {
                this.reload();
            });
    }

    private getCourierByOrder(): ICourier {
        let courier = null;
        couriers.forEach(item => {
            if (item.id === this.props.order.courier_id) {
                courier = item;
            }
        });
        return courier;
    }

    private reload(onlyUI: boolean = false) {
        this.setState({loading: true});
        if (onlyUI) {
            return;
        }
        this.orderService.getOrder(this.props.order.id)
            .then(order => {
                // fixme: la focus, do not touch !!!!
                const ObjectClass: any = Object;
                ObjectClass.assign(this.props.order, order);
                this.setState({loading: false});
            });
    }

    render() {
        return (
            <Paper className="row"
                   style={this.state.active ? style.active : style.normal}
                   zDepth={this.state.active ? 3 : 1}
                   onMouseEnter={() => this.setState({active: true})}
                   onMouseLeave={() => this.setState({active: false})}
            >
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-xs-12">
                            <OrderLocationIcon style={style.icon} color={colors.grey600}/>
                            {this.props.order["order_address"]}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <RestaurantLocationIcon style={style.icon} color={colors.grey600}/>
                            {this.props.order["order_item_info"]}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <OrderFoodsIcon style={style.icon} color={colors.grey600}/>
                            {this.props.order["restaurant_info"]}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <SelectField
                                value={this.state.selectedCourier}
                                onChange={this.courierChangeHandler.bind(this)}
                                fullWidth={true}
                            >
                                {this.couriers.map((courier: any, index: number) => (
                                    <MenuItem
                                        value={courier}
                                        key={index}
                                        primaryText={courier.name}
                                        secondaryText={courier.transport_type}
                                    />
                                ))}

                            </SelectField>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    {this.props.order.status === "todo" && !this.props.order.courier_id &&
                    <OrderStatusInfoPending reload={this.reload.bind(this)} courier={this.getCourierByOrder()} order={this.props.order}/>
                    }
                    {this.props.order.status === "todo" && this.props.order.courier_id &&
                    <OrderStatusInfoSuggested reload={this.reload.bind(this)} courier={this.getCourierByOrder()} order={this.props.order}/>
                    }
                    {this.props.order.status === "inProgress" &&
                    <OrderStatusInfoConfirmed reload={this.reload.bind(this)} courier={this.getCourierByOrder()} order={this.props.order}/>
                    }
                    {this.props.order.status === "done" &&
                    <OrderStatusInfoCompleted reload={this.reload.bind(this)} courier={this.getCourierByOrder()} order={this.props.order}/>
                    }
                </div>
            </Paper>
        );
    }
}
