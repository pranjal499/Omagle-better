import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";

const URL = 'http://localhost:3000';

export default function Room() {

    const [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get('name');
    // const [socket, setSocket] = useState<null | Socket> (null);
    const [lobby, setLobby] = useState(true);

    useEffect (() => {
        const socket = io(URL);
        socket.on('send-offer', ({roomId}) => {
            setLobby(false);
            alert("Send offer please.");
            socket.emit('offer', {
                sdp: '',
                roomId
            });
        })

        socket.on('offer', ({roomId, offer}) => {
            setLobby(false);
            alert("Sent answer please");
            socket.emit('answer', {
                roomId,
                sdp: ''
            })
        })

        // socket.on('answer', ({roomId, answer}) => {
        //     setLobby(false);
        //     alert("connection done");

        // });

        socket.on('lobby', () => {
            setLobby(true);
        })
    }, [name]); 

    if (lobby) {
        return <div>
            Waiting for someone...
        </div>
    }

    return (
        <div>
            Hi {name}
        </div>
    )
}