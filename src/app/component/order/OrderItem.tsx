import * as React from "react";

export interface OrderItemProps {
    orderData: any;
}

export interface OrderItemState {

}


export class OrderItem extends React.Component<OrderItemProps, OrderItemState> {


    render() {
        return (
            <div className="">
                <div className="row">
                    <div className="col-md-3">{this.props.orderData.id}</div>
                    <div className="col-md-3">{this.props.orderData.address}</div>
                    <div className="col-md-3">{this.props.orderData.restourant}</div>
                    <div className="col-md-3">{this.props.orderData.courier}</div>
                </div>

            </div>
        );
    }
}