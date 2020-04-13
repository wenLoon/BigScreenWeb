import React, { Component } from "react";
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf'
// import * as turf from '@turf/along'

mapboxgl.accessToken = 'pk.eyJ1IjoibG9vbjM1NiIsImEiOiJjazRiNDllenkwOXcyM2xxcmVmbndkdXc2In0.ZVtUVW8HmH1qudvfBwN5jw'

class MapGl extends Component {
    state = {
        map: {},
        lng: 103.0728090700,
        lat: 28.6630147600,
        zoom: 4
    };

    fly = (map, origin, destination, pulsingDotId, pulsingDot, sourceId) => {
        let self = this;
        /* fly-start */
        /* 吧起点转为前一次终点，终点随机3~5 */

        // A simple line from origin to destination.一个简单的从起点到终点的线
        var route = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [origin, destination]
                    }
                }
            ]
        };

        // A single point that animates along the route.一个单点,沿着路线移动。
        // Coordinates are initially set to origin.最初被设置为坐标原点。
        var point = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'Point',
                        'coordinates': origin
                    }
                }
            ]
        };

        //计算路线起点/终点之间的距离(以公里为单位)。 
        var lineDistance = turf.lineDistance(route.features[0]);

        var arc = [];

        //步骤使用弧和动画,也意味着一个更加平滑的弧线和动画更多的步骤,但是太多的步骤将导致较低的帧率
        var steps = 30;

        //画一条弧之间的“起源”&“目的地”的两个点
        for (var i = 0; i < lineDistance; i += lineDistance / steps) {
            var segment = turf.along(route.features[0], i, { units: 'kilometers' });
            arc.push(segment.geometry.coordinates);
        }

        // Update the route with calculated arc coordinates更新的路由计算弧坐标
        route.features[0].geometry.coordinates = arc;

        //用于增量的价值点测量路线。
        var counter = 0;

        map.on('load', function () {
            map.addImage(pulsingDotId, pulsingDot);

            map.addSource(sourceId, {
                'type': 'geojson',
                'data': point
            });

            map.addLayer({
                'id': sourceId,
                'source': sourceId,
                'type': 'symbol',
                'layout': {
                    'icon-image': pulsingDotId,
                    'icon-rotate': ['get', 'bearing'],
                    'icon-rotation-alignment': 'map',
                    'icon-allow-overlap': true,
                    'icon-ignore-placement': true
                }
            });

            function animate() {
                //更新点几何基于计数器的新职位表示索引访问弧。
                point.features[0].geometry.coordinates =
                    route.features[0].geometry.coordinates[counter >= steps ? steps - 1 : counter];

                // Calculate the bearing to ensure the icon is rotated to match the route arc
                // The bearing is calculate between the current point and the next point, except
                // at the end of the arc use the previous point and the current point
                //计算轴承确保图标是电弧旋转匹配路线轴承之间的计算当前点和下一个点,除了末尾的弧前面的点和当前点使用
                point.features[0].properties.bearing = turf.bearing(
                    turf.point(
                        route.features[0].geometry.coordinates[
                        counter >= steps ? counter - 1 : counter
                        ]
                    ),
                    turf.point(
                        route.features[0].geometry.coordinates[
                        counter >= steps ? counter - 1 : counter
                        ]
                    )
                );
                // Update the source with this new data.
                map.getSource(sourceId).setData(point);

                //请求下一帧动画结束这么长时间还没有到达。
                if (counter < steps) {
                    requestAnimationFrame(animate);
                }

                /* if (counter === steps) {
                    self.fly(map, originSource, destinationSource, pulsingDotId, pulsingDot, sourceId);
                } */
                counter = counter + 1;
            }

            // Start the animation.
            animate(counter);
            //点击重复刷新
            document.getElementById('replay').addEventListener('click', function () {
                let originSource = destination;
                // let destination = [(destination[0] + (Math.random(1) + 3)), (destination[1] + (Math.random(1) + 3))]
                // console.log(origin, destination)
                // Set the coordinates of the original point back to origin
                point.features[0].geometry.coordinates = originSource;

                // Update the source layer
                /* var point = {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'properties': {},
                            'geometry': {
                                'type': 'Point',
                                'coordinates': origin
                            }
                        }
                    ]
                }; */
                map.getSource('point').setData(point);

                // Reset the counter
                counter = 0;

                // Restart the animation.
                animate(counter);
            });

        });
        /* fly-end */

    }
    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        const { task } = this.props;

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            //style: 'mapbox://styles/mapbox/streets-v11',
            style: {
                'version': 8,
                'sources': {
                    'raster-tiles': {
                        'type': 'raster',
                        'tiles': [
                            'http://10.4.69.133:8011/{z}/{x}/{y}.png'
                            //'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
                        ],
                        'tileSize': 256,
                        'attribution':
                            'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
                    }
                },
                'layers': [
                    {
                        'id': 'simple-tiles',
                        'type': 'raster',
                        'source': 'raster-tiles',
                        'minzoom': 0,
                        'maxzoom': 22
                    }
                ]
            },
            center: [lng, lat],
            zoom
        });

        map.on('move', () => {
            const { lng, lat } = map.getCenter();

            this.setState({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
        //图层
        map.on('load', function () {
            map.addLayer({
                'id': 'maine',
                'type': 'fill',
                'source': {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Polygon',
                            'coordinates': [
                                [
                                    [104.0204386700, 30.6881221100],
                                    [104.0267898600, 30.6089626400],
                                    [104.1428455700, 30.6231539800],
                                    [104.1325553300, 30.7164783500],
                                ]
                            ]
                        }
                    }
                },
                'layout': {},
                'paint': {
                    'fill-color': '#088',
                    'fill-opacity': 0.8
                }
            });
            map.addLayer({
                'id': 'maine2',
                'type': 'fill',
                'source': {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Polygon',
                            'coordinates': [
                                [
                                    [117.6415603600, 42.5530438900],
                                    [116.1474651500, 41.8040787900],
                                    [114.6532778200, 42.0655753400],
                                    [113.9282020400, 40.9964613700],
                                    [113.5107674700, 36.5096559700],
                                    [115.4663325700, 36.0491194400],
                                    [117.9272265900, 38.2036389800],
                                    [119.8826373400, 39.8927967500],
                                    [119.1796998900, 41.2612965300],
                                ]
                            ]
                        }
                    }
                },
                'layout': {},
                'paint': {
                    'fill-color': 'red',
                    'fill-opacity': 0.3
                }
            });

        });

        this.setState({ map }, () => {
            this.sendSplice();
        })
    }
    componentWillReceiveProps() {
        /* if (this.state.map && Object.keys(this.state.map).length !== 0) {
            this.sendSplice();
        } */
    }

    sendSplice = () => {
        console.log(1)
        const { map } = this.state;
        //tubiao airplane
        const blob = new Blob(['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1576835778657" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="1335" width="48" height="48"><path d="M599.06048 831.309824l12.106752-193.404928 372.860928 184.430592L984.02816 710.206464 617.906176 367.33952 617.906176 151.638016c0-56.974336-46.188544-143.064064-103.158784-143.064064-56.974336 0-103.158784 86.089728-103.158784 143.064064L411.588608 367.33952 45.461504 710.206464l0 112.129024 366.660608-184.430592 14.999552 209.27488c0 5.05344 0.594944 9.892864 1.124352 14.749696l-66.591744 60.348416 0 66.587648 153.986048-50.879488 2.43712-0.80896 147.439616 51.688448 0-66.587648-68.758528-62.253056L599.06048 831.309824z" p-id="1336" fill="#1296db"/><text xmlns="http://www.w3.org/2000/svg" style="fill: red;font-size:180px;font-weight:800;" x="280" y="600">K13</text></svg>'], {
            type: 'image/svg+xml'
        });
        let blobStr = URL.createObjectURL(blob);
        let pulsingDot = new Image();
        // pulsingDot.crossOrigin = '';
        pulsingDot.src = blobStr;
        //ship
        const blobShip = new Blob(['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1584322293248" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="1578" width="48" height="48"><path d="M756.16 342.186667L704 328.405333V256a85.333333 85.333333 0 0 0-85.333333-85.333333h-74.666667V117.333333a32 32 0 0 0-64 0V170.666667H405.333333a85.333333 85.333333 0 0 0-85.333333 85.333333v72.405333l-52.16 13.781334c-60.501333 15.957333-97.898667 78.485333-83.349333 139.349333l48.192 201.536a115.797333 115.797333 0 0 0 113.002666 89.173333h332.608a115.797333 115.797333 0 0 0 113.002667-89.173333l48.192-201.536c14.570667-60.864-22.826667-123.392-83.328-139.349333zM384 309.333333V256c0-11.754667 9.578667-21.333333 21.333333-21.333333h213.333334c11.754667 0 21.333333 9.578667 21.333333 21.333333v53.333333h-8.234667l-90.069333-23.786666a116.586667 116.586667 0 0 0-59.349333 0L392.256 309.333333H384zM613.290667 942.848a71.338667 71.338667 0 0 1-48.853334-19.754667l-51.157333-47.68c-3.733333-3.456-7.274667-3.285333-10.944 0.490667l-41.344 42.816c-28.010667 29.056-75.498667 29.034667-103.552-0.021333l-38.101333-39.466667c-1.344-1.365333-3.370667-3.477333-5.866667-2.965333-2.026667 0.064-4.202667 1.344-6.144 3.584l-28.842667 33.621333c-13.824 16.128-32.618667 25.322667-52.885333 25.92a73.152 73.152 0 0 1-53.781333-22.485333L104.96 847.637333a32 32 0 0 1 46.037333-44.458666l66.858667 69.269333c1.322667 1.344 3.349333 2.965333 5.738667 2.965333h0.149333c2.048-0.064 4.224-1.344 6.186667-3.626666l28.821333-33.578667c13.781333-16.106667 32.554667-25.322667 52.821333-25.92a71.744 71.744 0 0 1 53.824 22.485333l38.122667 39.488c2.602667 2.730667 8.810667 2.730667 11.413333 0.021334l41.344-42.837334c28.010667-28.970667 71.274667-30.272 100.629334-2.858666l51.157333 47.68c3.712 3.456 7.274667 3.285333 10.944-0.490667l39.573333-41.002667c14.592-15.104 33.621333-22.997333 53.824-22.485333 20.245333 0.597333 39.018667 9.813333 52.821334 25.941333l28.842666 33.578667c1.941333 2.24 4.117333 3.541333 6.165334 3.605333 3.157333 0.192 4.544-1.578667 5.866666-2.965333l66.858667-69.269333a32 32 0 0 1 46.037333 44.458666l-66.858666 69.269334a71.893333 71.893333 0 0 1-53.781334 22.485333c-20.245333-0.597333-39.04-9.792-52.864-25.898667l-28.864-33.621333c-1.941333-2.261333-4.117333-3.541333-6.144-3.605333-2.56-0.661333-4.544 1.578667-5.866666 2.965333l-39.573334 41.002667c-14.506667 15.04-33.109333 22.613333-51.754666 22.613333z" fill="#1296db" p-id="1579"/><text xmlns="http://www.w3.org/2000/svg" style="fill: red;font-size:180px;font-weight:800;" x="330" y="600">S08</text></svg>'], {
            type: 'image/svg+xml'
        });
        let blobStrShip = URL.createObjectURL(blobShip);
        let pulsingDotShip = new Image();
        // pulsingDotShip.crossOrigin = '';
        pulsingDotShip.src = blobStrShip;
        //tubiao
        //air
        var airorigin = [104.072228, 30.663424];
        var airDestination = [107.032, 33.913];
        // var airorigin = [104.2, Math.floor(Math.random(10) + 30)];
        // var airDestination = [117.032,  Math.floor(Math.random(10) + 30)];
        this.fly(map, airorigin, airDestination, 'pulsing-dot', pulsingDot, 'point');
        //ship
        var shipOrigin = [102.5, 31.5];
        var shipDestination = [107.032, 34.913];
        this.fly(map, shipOrigin, shipDestination, 'pulsing-dot-ship', pulsingDotShip, 'point-ship');
    }

    render() {
        const { lng, lat, zoom } = this.state;

        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div style={{ position: 'absolute', zIndex: '999999999' }}>
                    {/* <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div> */}
                    <button id="replay">Replay</button>
                </div>
                <div ref={el => this.mapContainer = el} style={{ width: '100%', height: '100%' }} />
            </div>
        );
    }
}

export default MapGl; 