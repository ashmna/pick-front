import * as React from "react";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export interface CourierSelectProps {
    couriers: any
}

export interface CourierSelectState {

}


export class CourierSelect extends React.Component<CourierSelectProps, CourierSelectState> {
    private change(ev:any,i:any,v:any){
        console.log(ev,i,v);
    }

    render() {
        return (
            <div className="">
                <SelectField
                    value={this.props.couriers.selected}
                    onChange={this.change}
                    maxHeight={200}
                >
                    {this.props.couriers.list}

                </SelectField>
            </div>
        );
    }
}