import React, {useEffect} from "react";
import {DBHelper} from "../dao/DBHelper";

let ws = null

export const WS = React.forwardRef(({phoneSystem, ready, downloading, downloadSuccess, downloadFail, finish, stop}, ref) => {

    React.useImperativeHandle(
        ref,
        () => ({
            send
        })
    )

    function send(msg) {
        ws?.send(msg)
    }

    useEffect(() => {
        const WebSocket = require('faye-websocket')
        const server = require('http').createServer();
        server.on('upgrade', function (request, socket, body) {
            if (WebSocket.isWebSocket(request)) {
                ws = new WebSocket(request, socket, body);

                ws?.on('message', function (event) {
                    let command = JSON.parse(event.data)
                    switch (command["cmd"]) {
                        case "system":
                            phoneSystem(command["body"])
                            console.log("mobile system: " + command["body"])
                            const httpServer = DBHelper.getHttpServer()
                            const message = {
                                cmd: "port",
                                body: httpServer.port + ""
                            }
                            ws?.send(JSON.stringify(message))
                            break
                        case "musicList":
                            ready(JSON.parse(command["body"]))
                            break
                        case "downloading":
                            downloading(command["body"])
                            break
                        case "download success":
                            downloadSuccess(command["body"])
                            break
                        case "download fail":
                            downloadFail(command["body"])
                            break
                        case "finish":
                            finish()
                            break
                        case "stop":
                            stop()
                            break;
                    }
                });

                ws?.on('close', function (event) {
                    console.log('close', event.code, event.reason);
                    // ws = null;
                });
            }
        });

        server.listen(4388);

        return () => {
            if (ws != null) {
                ws.close()
                ws = null
            }
            server.close()
        }
    }, [])

    return (
        <></>
    )
})
