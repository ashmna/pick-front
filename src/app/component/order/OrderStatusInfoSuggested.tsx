import * as React from "react";
import {ICourier, IOrder} from "Model";
import {List, ListItem} from "material-ui/List";
import FlatButton from "material-ui/FlatButton";
import Avatar from "material-ui/Avatar";
import BicycleIcon from "material-ui/svg-icons/maps/directions-bike";
import CarIcon from "material-ui/svg-icons/maps/directions-car";
import BikeIcon from "material-ui/svg-icons/action/motorcycle";
import ETAIcon from "material-ui/svg-icons/action/alarm-on";
import ConfirmIcon from "material-ui/svg-icons/navigation/check";
import AutoSuggestionIcon from "material-ui/svg-icons/action/autorenew";
import {colors} from "material-ui/styles";
import {OrderService} from "../../service/OrderService";

export interface IOrderStatusInfoProps {
    courier: ICourier;
    order: IOrder;
    reload: Function;
}

export interface IOrderStatusInfoState {

}

export class OrderStatusInfoSuggested extends React.Component<IOrderStatusInfoProps, IOrderStatusInfoState> {

    private orderService: OrderService = new OrderService();

    constructor(props: IOrderStatusInfoProps, context: any) {
        super(props, context);
        this.state = {};
    }

    render() {
        let transportIcon = <BikeIcon/>;
        if (this.props.courier.transport_type === "Car") {
            transportIcon = <CarIcon/>;
        } else if (this.props.courier.transport_type === "Bicycle") {
            transportIcon = <BicycleIcon/>;
        }

        return (
            <div className="row" style={{margin: "5px"}}>
                <div className="col-xs-12">

                    <List>
                        <ListItem
                            disabled={true}
                            leftAvatar={
                                <Avatar src={this.props.courier.avatar} />
                            }

                        >
                            {this.props.courier.name}
                        </ListItem>

                        <ListItem
                            disabled={true}
                            leftAvatar={
                                <Avatar
                                  icon={transportIcon}
                                  color={colors.blue200}
                                  backgroundColor={colors.grey200}
                                />
                            }
                        >
                            TRANSPORT: ({this.props.courier.transport_type})
                        </ListItem>

                        <ListItem
                            disabled={true}
                            leftAvatar={
                                <Avatar
                                  icon={<ETAIcon/>}
                                  color={colors.blue200}
                                  backgroundColor={colors.grey200}
                                />
                              }
                        >
                            ETA: After {Math.round(((new Date(this.props.order.estimated_complete_datetime.$date)).getTime() - 4*60*60*1000- (new Date()).getTime())/(60000))} min ({(new Date(this.props.order.estimated_complete_datetime.$date)).toISOString().substr(11,8)})
                        </ListItem>
                    </List>
                    <div className="row">
                        <div className="col-xs-8">
                            <FlatButton
                                disabled={!this.props.order.is_courier_picked_manual}
                                label="Autosuggestion"
                                primary={true}
                                icon={<AutoSuggestionIcon />}
                            />
                        </div>
                        <div className="col-xs-4">
                            <FlatButton
                                label="Confirm"
                                secondary={true}
                                icon={<ConfirmIcon/>}
                                onTouchTap={this.confirmCourierForOrder.bind(this)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private confirmCourierForOrder() {
        this.props.reload(true);
         console.log(this.props.order);
        this.orderService.confirmCourierForOrder(this.props.order, this.props.courier)
            .then(res => {
                this.props.reload();
            });
    }

}
