import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
let counter = 0;
const messages = new Array();

wss.on('connection', (ws: WebSocket) => {

  const sendMessages = () => {
    const messageToSend = messages.join('\n');
    ws.send(messageToSend);
  }
  const userName = `person_${counter++}`;

    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {
        messages.push(`${userName}: ${message}`);
        //log the received message and send it back to the client
        console.log('received: %s', message);
        console.log('messages', messages);
        sendMessages();
    });

    setInterval(() => {
      sendMessages();
    }, 1000);

    //send immediatly a feedback to the incoming connection
    sendMessages();


});

//start our server
server.listen(process.env.PORT || 8999, () => {
    // console.log(`Server started on port ${server.address().port} :)`);
    console.log(`Server started on port 8999`);
});
