import * as React from "react";
import {colors} from "material-ui/styles";
import Paper from "material-ui/Paper";

export interface OrderItemProps {
    orderData: any;
}

export interface OrderItemState {
    active: boolean;
}


const style = {
    normal: {
        margin: "5px",
        padding: "0 10px",
    },
    active: {
        margin: "5px 5px 5px 10px",
        padding: "0 10px",
    },
    normalIcon: {
        color: colors.grey200,
    },
    activeIcon: {
        color: colors.grey600,
    },
};

export class OrderItem extends React.Component<OrderItemProps, OrderItemState> {

    constructor(props: OrderItemProps, context: any) {
        super(props, context);
        this.state = {
            active: false,
        };
    }

    render() {
        return (
            <Paper className="row"
                 style={this.state.active ? style.active : style.normal}
                 zDepth={this.state.active ? 3 : 1}
                 onMouseEnter={() => this.setState({active: true})}
                 onMouseLeave={() => this.setState({active: false})}
            >
                <div className="row">
                    <div className="col-md-3">{this.props.orderData.id}</div>
                    <div className="col-md-3">{this.props.orderData.address}</div>
                    <div className="col-md-3">{this.props.orderData.restourant}</div>
                    <div className="col-md-3">{this.props.orderData.courier}</div>
                </div>

            </Paper>
        );
    }
}