import * as React from "react";
import {IInjectedProps} from "react-router";
import Slider from "material-ui/Slider";
import {StateService} from "../service/StateService";
import {Map} from "../component/Map";


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

        setInterval(() => {
            this.stateService.getCurrentState().then((data: any) => {
                if (!this.map) {
                    return;
                }
                this.map.syncData(data);
            });
        }, 5000);
    }


    render() {
        return (
            <div>
                <Map ref={(map: Map) => this.map = map}/>
            </div>
        );
    }
}
