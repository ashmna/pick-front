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
        const dataList: any = {};
        list.forEach(data => {
            dataList[data[4]] = data;
        });
        for (let i = 0; i < this.markers.length; i++) {
            if (!dataList[this.markers[i].id]) {
                this.markers[i].marker.setMap(null);
                continue;
            }

            const id = this.markers[i].id;

            if (dataList[id][5] !== this.markers[i].key) {
                this.markers[i].marker.setMap(null);
                continue;
            }

            delete dataList[id];
        }
        for (let key in dataList) {
            this.addMarker(dataList[key]);
        }
    }

    addMarker(data: any) {
        if (!this.map) {
            return;
        }
        // console.log(data[2]);
        let marker = new google.maps.Marker({
            position: {lat: data[0], lng: data[1]},
            map: this.map,
            icon: this.toIcon(data[3]),
        });
        let infowindow = new google.maps.InfoWindow({
            content: data[2],
        });
        marker.addListener('click', () => {
            infowindow.open(this.map, marker);
        });
        this.markers.push({marker: marker, id: data[4], key: data[5]});
    }

    toIcon(name: string): string {
        const icons: any = {
            busy: 'icon/busy.png',
            customer_busy: 'icon/customer_busy.png',
            customer_wait: 'icon/customer_wait.png',
            restaurant: 'icon/restaurant.png',
            wait: 'icon/wait.png',
        };
        return icons[name];
    }

    render() {
        return (<div id="map" style={{width: "100%", height: "500px"}}></div>);
    }
}
