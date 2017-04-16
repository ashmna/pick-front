import * as React from "react";
import CircularProgress from "material-ui/CircularProgress";
import {IOrder, ICourier} from "Model";


export interface IOrderStatusInfoProps {
    courier: ICourier;
    order: IOrder;
    reload: Function;
}

export interface IOrderStatusInfoState {

}


export class OrderStatusInfoPending extends React.Component<IOrderStatusInfoProps, IOrderStatusInfoState> {

    constructor(props: IOrderStatusInfoProps, context: any) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <div>
                <CircularProgress size={80}/>
            </div>
        );
    }

}
