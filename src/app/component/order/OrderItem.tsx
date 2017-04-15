import * as React from "react";
import {CourierSelect} from  "../order/CourierSelect"
import {colors} from "material-ui/styles";
import Paper from "material-ui/Paper";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import OrderLocationIcon from "material-ui/svg-icons/communication/location-on";
import OrderFoodsIcon from "material-ui/svg-icons/action/home";
import RestaurantLocationIcon from "material-ui/svg-icons/action/shopping-cart";
import BicycleIcon from "material-ui/svg-icons/maps/directions-bike";
import CarIcon from "material-ui/svg-icons/maps/directions-boat";
import BikeIcon from "material-ui/svg-icons/action/motorcycle";
import origin = __MaterialUI.propTypes.origin;
import {white} from "material-ui/styles/colors";

export interface OrderItemProps {
    orderData: any;
}

export interface OrderItemState {
    active?: boolean;
    selectedCourier?: any;
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
};

export class OrderItem extends React.Component<OrderItemProps, OrderItemState> {


    private couriers: any = [
        {id: 1, transport_type: "Car", name: "Vle"},
        {id: 2, transport_type: "Bicycle", name: "Gugo"},
        {id: 3, transport_type: "Bike", name: "Xcho"},
    ];
    constructor(props: OrderItemProps, context: any) {
        super(props, context);
        this.state = {
            active: false,
            selectedCourier: this.couriers[0]||null,
        };
    }

    private send(){
        console.log(this.props.orderData)
    }

    private courierChangeHandler(event: any, index: number, value: any) {
        this.setState({selectedCourier: value});
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
                            <OrderLocationIcon color={colors.grey600}/>
                            {this.props.orderData["order_address"]}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <OrderFoodsIcon color={colors.grey600}/>
                            {this.props.orderData["order_item_info"]}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <RestaurantLocationIcon color={colors.grey600}/>
                            {this.props.orderData["restaurant_info"]}
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
                    <div className="row">
                        <div className="col-xs-12">

                        </div>
                    </div>
                    <div className="row courier-info">

                        <div className="col-xs-2 col-md-2">
                            <h2>{this.state.selectedCourier["name"]}</h2>
                        </div>
                        <div className="col-xs-4 col-md-4 courier-image">
                            <img src="https://i.stack.imgur.com/Lkn5a.png?s=328&g=1"/>

                        </div>

                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="row">
                                <h3 className="transport-type">
                                    <span>transport - </span>
                                    <span className="transport-type-title">
                                        <span >{this.state.selectedCourier["transport_type"]}</span>

                                        {this.state.selectedCourier["transport_type"] === "Bike" && <BikeIcon color={colors.grey600}/>}
                                        {this.state.selectedCourier["transport_type"] === "Car" && <CarIcon color={colors.grey600}/>}
                                        {this.state.selectedCourier["transport_type"] === "Bicycle" && <BicycleIcon color={colors.grey600}/>}
                                    </span>
                                </h3>
                                <span className="col-md-4">

                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <h3>Will deliver at {this.state.selectedCourier.eta}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
        );
    }
}