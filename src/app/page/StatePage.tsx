import * as React from "react";
import {IInjectedProps} from "react-router";
import Slider from "material-ui/Slider";
import {StateService} from "../service/StateService";
import {Map} from "../component/Map";
import FlatButton from 'material-ui/FlatButton';

interface IStatePageProps extends IInjectedProps {
}

interface IStatePageState {
}

export class StatePage extends React.Component<IStatePageProps, IStatePageState> {

    private stateService: StateService = new StateService();
    private map: Map;


    constructor(props: IStatePageProps, context: any) {
        super(props, context);
        this.state = {
        };
        this.loadState();
    }

    private loadState() {
        this.stateService.getCurrentState().then((data: any) => {
            if (!this.map) {
                return;
            }
            this.map.syncData(data);
            setTimeout(() => this.loadState(), 1000);
        }).catch(() => {
            setTimeout(() => this.loadState(), 8000);
        });
    }

    private randomOrder() {
        this.stateService.setRandomOrder().then((data: any) => {
            console.log(data);
        });
    }


    render() {
        return (
            <div>
                <Map ref={(map: Map) => this.map = map}/>
                <div>
                    <br/>
                    <FlatButton label="Add Random Order" onTouchTap={() => this.randomOrder()}/>
                </div>
            </div>
        );
    }
}
