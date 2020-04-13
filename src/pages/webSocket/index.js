import React, { Component } from 'react';
import Websocket from '../../component/WebSocket/Socket.js';

export default class index extends Component {
    handleData(data) {
        console.log(data);
    }
    handleOpen() {
        console.log("connected:)");
    }
    handleClose() {
        console.log("disconnected:(");
    }

    sendMessage(message) {
        this.refWebSocket.sendMessage(message);
    }

    render() {
        let socketUrl = "http://10.4.69.36:9000/ws/10" /* + document.getElementById('userId').value */;
        socketUrl = socketUrl.replace("https", "ws").replace("http", "ws");
        return (
            <div>
                <button onClick={() => this.sendMessage("Hello")} >Send Message</button>
                <Websocket url={socketUrl} onMessage={this.handleData}
                    onOpen={this.handleOpen} onClose={this.handleClose}
                    reconnect={true} debug={true}
                    ref={Websocket => {
                        this.refWebSocket = Websocket;
                    }} />
            </div>
        );
    }
}
