import React, { Component } from 'react';

export default class WebSocket extends Component {
    state = {
        socket: null
    }
    openSocket = () => {
        if (typeof (WebSocket) == "undefined") {
            console.log("您的浏览器不支持WebSocket");
        } else {
            console.log("您的浏览器支持WebSocket");
            //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
            //等同于socket = new WebSocket("ws://localhost:8888/xxxx/im/25");
            //var socketUrl="${request.contextPath}/im/"+$("#userId").val();
            let socketUrl = "http://10.4.69.36:9000/ws/" + document.getElementById('userId').value;
            socketUrl = socketUrl.replace("https", "ws").replace("http", "ws");
            console.log(socketUrl);
            if (this.state.socket != null) {
                this.state.socket.close();
                this.state.socket = null;
            }
            const socket = new WebSocket(socketUrl);
            //打开事件
            socket.onopen = function () {
                console.log("websocket已打开");
                socket.send("这是来自客户端的消息" + new Date());
            };
            //获得消息事件
            socket.onmessage = function (msg) {
                console.log(msg.data);
                //发现消息进入    开始处理前端触发逻辑
            };
            //关闭事件
            socket.onclose = function () {
                console.log("websocket已关闭");
            };
            //发生了错误事件
            socket.onerror = function () {
                console.log("websocket发生了错误");
            }
            console.log(socket)
            this.setState({ socket })
        }
    }
    sendMessage = () => {
        if (typeof (WebSocket) === "undefined") {
            console.log("您的浏览器不支持WebSocket");
        } else {
            console.log("您的浏览器支持WebSocket");
            var toUserId = document.getElementById('toUserId').value;
            var contentText = document.getElementById('contentText').value
            console.log('{"toUserId":"' + toUserId + '","contentText":"' + contentText + '"}');
            this.state.socket.send('{"toUserId":"' + toUserId + '","contentText":"' + contentText + '"}');
        }
    }
    render() {
        return (
            <div>
                【userId】：<div><input id="userId" name="userId" type="text" value="10" /></div>
                【toUserId】：<div><input id="toUserId" name="toUserId" type="text" value="20" /></div>
                【toUserId】：<div><input id="contentText" name="contentText" type="text" value="hello websocket" /></div>
                <div><a onClick={this.openSocket}>开启socket</a></div>
                <div><a onClick={this.sendMessage}>发送消息</a></div>
            </div>
        )
    }
}
