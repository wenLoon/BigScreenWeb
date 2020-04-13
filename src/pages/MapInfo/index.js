import React, {Component} from 'react';
import MapGl from '../../component/MapboxGL/MapGl';

export default class index extends Component {
    render(){
        return (
            <MapGl task={this.props.task} />
        )
    }

}