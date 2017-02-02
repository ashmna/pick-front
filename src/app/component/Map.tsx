import * as React from "react";
import {IInjectedProps} from "react-router";


interface IMapProps extends IInjectedProps {
}

interface IMapState {
}

export class Map extends React.Component<IMapProps, IMapState> {

    private map: any;
    private markers: any[] = [];

    constructor(props: IMapProps, context: any) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 40.1792, lng: 44.4991},
            zoom: 12,
        });
    }

    syncData(list: any[]) {
        this.clearMarkers();
        list.forEach(data => {
            this.addMarker(data);
        });
    }

    setMapOnAll(map: any) {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    }

    clearMarkers() {
        this.setMapOnAll(null);
        this.markers = [];
    }

    addMarker(data: any) {
        if (!this.map) {
            return;
        }
        // console.log(data[2]);
        let marker = new google.maps.Marker({
            position: {lat: data[0], lng: data[1]},
            map: this.map,
            title: data[2],
            icon: this.toIcon(data[3]),
        });

        this.markers.push(marker);
    }

    toIcon(name: string): string {
        const icons: any = {
            busy: 'icon/busy.png',
            customer: 'icon/customer.png',
            restaurant: 'icon/restaurant.png',
            wait: 'icon/wait.png',
            wait2: 'icon/wait2.png',
        };
        return icons[name];
    }

    render() {
        return (<div id="map" style={{width: "100%", height: "500px"}}></div>);
    }
}
