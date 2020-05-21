import {IncomingPacket} from "./chat";
import {OutgoingPacket} from "./chat";
import {InboxDto} from "./chat";
import {MessageDto} from "./chat";
import {EventProducer} from "./EventProducer";

interface ProxyEventMap {
    "login": () => void;
    "message": ( channelId: string, message: MessageDto ) => void;
    "conversation": ( channelId: string ) => void;
    "register": () => void;
}

// 2.2 helyi adatbázis
class Proxy extends EventProducer<ProxyEventMap> 
{
    inbox: InboxDto | null = null;
    currentEmail: string = "";
    private ws: WebSocket;
    constructor()
    {
        super();
        // create WebSocket connection
        //this.ws = new WebSocket( "ws://echo.websocket.org/" );  // the URL to which to connect, the WebSocket server will respond to this URL
        this.ws = new WebSocket( "wss://raja.aut.bme.hu/chat/" );  // the URL to which to connect, the WebSocket server will respond to this URL
        // connection opened
        
        this.ws.addEventListener( "open", () =>
        {
            //this.ws.send( "Hello" );  // method: enqueues data to be transmitted
        } );
        
        // listen for messages
        this.ws.addEventListener( "message", e =>
        {
            let p = <IncomingPacket>JSON.parse( e.data );
            switch ( p.type )
            {
                case "error":
                    alert( p.message );
                    break;
                case "login":
                    this.inbox = p.inbox;
                    this.dispatch("login");
                    break;
                case "message":
                    let cid = p.channelId;
                    this.inbox!.conversations.find( x => x.channelId === cid )?.lastMessages.push( p.message );
                    this.dispatch("message", cid, p.message);
                    break;
                case "conversationAdded":
                    this.inbox!.conversations.push( p.conversation );
                    this.dispatch("conversation", p.conversation.channelId);
                    break;
            }
        } );
    }
    
    sendPacket( packet: OutgoingPacket )
    {
        this.ws.send( JSON.stringify( packet ) );
        //console.log("Outgoing packet:" + JSON.stringify( packet ));
        switch (packet.type)
        {
            case "login":
                this.currentEmail = packet.email;
                break;
            case "register":
                this.currentEmail = packet.email;
                break;
        }
    }
}
export var proxy = new Proxy();