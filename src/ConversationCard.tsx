import React, { Component } from 'react';
import {ConversationDto} from "./chat.d";
import {proxy} from "./Proxy";

export class ConversationCard extends Component<{
    conversation: ConversationDto,
    selected: boolean,
    onSelect: () => void
    }>
{
    render()
    {
        let lastMessage = this.props.conversation.lastMessages.length > 0 ?
            this.props.conversation.lastMessages[ this.props.conversation.lastMessages.length - 1 ] : null;

        // 3.5.2. feladat
        let myEmail = proxy.currentEmail;
        let mySpan = <span className="time"> { lastMessage && new Date( lastMessage.timeStamp ).toLocaleTimeString() } </span>;
        if (this.hasNumber(myEmail)){
            mySpan = <span className="time"> { lastMessage && new Date( lastMessage.timeStamp ).toLocaleDateString() } </span>;
        }
        /*
        console.log(myEmail);
        let stuff = <span className="time"> { lastMessage && new Date( lastMessage.timeStamp ).toLocaleTimeString() } </span>;
        if (myEmail)
        {
            console.log("TEST: " + this.hasNumber(myEmail));
            if (this.hasNumber(myEmail)){
                stuff = <span className="time"> { lastMessage && new Date( lastMessage.timeStamp ).toLocaleDateString() } </span>;
            }
        }
        */
        /*
        return (
            <div className={ "conversation-card" + ( this.props.selected ? " selected" : "" ) }
                onClick={ () => this.props.onSelect() }>
                <div className="row">
                    <span className="channel-name">{ this.props.conversation.name }</span>
                    <span className="time">
                        { lastMessage && new Date( lastMessage.timeStamp ).toLocaleTimeString() }
                    </span>
                </div>
                <span className="last-message">{ lastMessage?.content }</span>
            </div>
        );
        */
        return (
            <div className={ "conversation-card" + ( this.props.selected ? " selected" : "" ) }
                onClick={ () => this.props.onSelect() }>
                <div className="row">
                    <span className="channel-name">{ this.props.conversation.name }</span>
                    {mySpan}
                </div>
                <span className="last-message">{ lastMessage?.content }</span>
            </div>
        );
    }

    componentDidMount()
    {
        proxy.addEventListener( "message", ( cid, m ) =>
        {
            if ( cid === this.props.conversation.channelId )
                this.forceUpdate();
        }, this );
    }

    componentWillUnmount()
    {
        proxy.removeAllEventListener( this );
    }

    hasNumber(myString: string)
    {
        return /\d/.test(myString);
    }
}