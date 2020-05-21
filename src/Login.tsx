import React, { Component } from 'react';
import {proxy} from "./Proxy"
import {TextInput} from "./TextInput"

// 3.1 első komponens létrehozása
export class Login extends Component
{
    //state = {email: "", password: ""};
    state = { email: "", password: "", displayName: "", register: false };
    neptunCode : string = "CODE20";
    
    /*
    render()
    {
        return (
            <div className="login">
                <img src="logo512.png" width="256" alt = "description" />
                <p>{ this.state.register ? "Switch back to " : "Have no account yet? Go and " }
                    <a href="/#" onClick={ e => { e.preventDefault(); this.setState( { register: !this.state.register } ); } }>
                        { this.state.register ? "Login" : "Register" }
                    </a>
                </p>
                { this.state.register &&
                    <TextInput type="text" placeholder="Display Name (Agent Smith)" value={ this.state.displayName }
                        onChange={ e => this.setState( { displayName: e } ) } onEnter={ () => this.onClick() } /> }
                <TextInput type="email" placeholder="Email (someone@example.com)" value={ this.state.email }
                    onChange={ e => this.setState( { email: e } ) } onEnter={ () => this.onClick() } autofocus={ true } />
                <TextInput type="password" placeholder="Password" value={ this.state.password }
                    onChange={ e => this.setState( { password: e } ) } onEnter={ () => this.onClick() } />
                <button type="button" onClick={ () => this.onClick() }> { this.state.register ? "Register" : "Login" } </button>
                <a href="https://www.google.hu/search?q=privacy">Privacy Policy</a>
            </div> );
    }
    */

    render()
    {
        // 3.1.3. feladat
        let myInput = <TextInput type="text" placeholder="Display Name (Agent Smith)" value={ this.state.displayName }
                onChange={ e => this.setState( { displayName: e } ) } onEnter={ () => this.onClick() } /> ;

        if ((this.state.email === this.neptunCode) && this.state.register) {
            myInput = <TextInput type="text" placeholder="Your display name: Meli" value={ this.state.displayName }
                onChange={ e => this.setState( { displayName: e } ) } onEnter={ () => this.onClick() } />;

            //this.state.displayName = "Meli";
            //myInput = <input type="text" placeholder="Display Name (Agent Smith)" value={ this.state.displayName }
                //onChange={ e => this.setState( { displayName: e } ) } />;
            //console.log("HAHO: " + this.state.displayName);
        }

        return (
            <div className="login">
                <img src="logo512.png" width="256" alt = "description" />
                <p>{ this.state.register ? "Switch back to " : "Have no account yet? Go and " }
                    <a href="/#" onClick={ e => { e.preventDefault(); this.setState( { register: !this.state.register } ); } }>
                        { this.state.register ? "Login" : "Register" }
                    </a>
                </p>
                { this.state.register && myInput }
                <TextInput type="email" placeholder="Email (someone@example.com)" value={ this.state.email }
                    onChange={ e => this.setState( { email: e } ) } onEnter={ () => this.onClick() } autofocus={ true } />
                <TextInput type="password" placeholder="Password" value={ this.state.password }
                    onChange={ e => this.setState( { password: e } ) } onEnter={ () => this.onClick() } />
                <button type="button" onClick={ () => this.onClick() }> { this.state.register ? "Register" : "Login" } </button>
                <a href="https://www.google.hu/search?q=privacy">Privacy Policy</a>
            </div> );
    }
    

    onClick()
    {
        if ( this.state.register )
        {
            if (this.state.email === this.neptunCode)
                proxy.sendPacket( { type: "register", email: this.state.email, password: this.state.password, displayName: "Meli", staySignedIn: false } );
            else
                proxy.sendPacket( { type: "register", email: this.state.email, password: this.state.password, displayName: this.state.displayName, staySignedIn: false } );
        }
        else
        {   
            proxy.sendPacket( { type: "login", email: this.state.email, password: this.state.password, staySignedIn: false } );
        }
    }
}

