import * as React from "react";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export interface CourierSelectProps {
    couriers: any
}

export interface CourierSelectState {
    selectedCourier: any;
}


export class CourierSelect extends React.Component<CourierSelectProps, CourierSelectState> {

    constructor(props: CourierSelectProps, context: any) {
        super(props, context);
        console.log(props);
        this.state = {
            selectedCourier: this.props.couriers.selected|| null,

        };
    }

    private change(ev:any,i:any,value:any){
        this.setState({selectedCourier: value});
        this.props.couriers.selected = value;
    }

    render() {
        const items = [];
        for (let i = 0; i < this.props.couriers.list.length; i++ ) {
            items.push(<MenuItem value={this.props.couriers.list[i]} key={this.props.couriers.list[i]} primaryText={this.props.couriers.list[i]} />);
        }
        return (
            <div className="">
                <SelectField
                    value={this.state.selectedCourier}
                    onChange={this.change.bind(this)}
                    maxHeight={200}
                >

                    {items}

                </SelectField>
            </div>
        );
    }
}