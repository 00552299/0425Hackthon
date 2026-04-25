export function createSocket(url = 'ws://localhost:3000') {
    const socket = new WebSocket(url);

    return {
        socket,
        send(type, payload) {
            socket.send(JSON.stringify({ type, payload }));
        },
        onMessage(handler) {
            socket.addEventListener('message', (event) => {
                const data = JSON.parse(event.data);
                handler(data);
            });
        },
    };
}
