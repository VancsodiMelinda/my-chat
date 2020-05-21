import React, { Component } from 'react';
import './TextInput.css' 

// 3.2 funkcionalitás kiemelése
export interface TextInputOptions
{
    value?: string;
    onChange?: ( value: string ) => void;
    type?: "text" | "password" | "email";
    placeholder?: string;
    onEnter?: () => void;
    autofocus?: boolean;
};

export class TextInput extends Component<TextInputOptions>
{
    //state = { value: this.props.value, focus: false };  // szerintem ez nem jó, lásd hibaüzenet
    // Warning: A component is changing an uncontrolled input of type text to be controlled.
    //  Input elements should not switch from uncontrolled to controlled (or vice versa).

    state = { value: '', focus: false };

    render()
    {
        let attrs = {} as any;
        if ( this.props.autofocus )
        {
            attrs.autoFocus = true;
        }
        if ( this.props.onEnter )
        {
            attrs.onKeyDown = e =>
            {
                if ( e.keyCode === 13 )
                {
                    this.props.onEnter!();
                }
            };
        }
        
        return (
            <div className="text-input">
                <input { ...attrs } type={ this.props.type ?? "text" } value={ this.state.value}
                    onChange={ e =>
                    {
                        this.setState( { value: e.target.value } );
                        this.props.onChange?.( e.target.value );
                    } }
                    onBlur={ () => this.setState( { focus: false } ) }
                    onFocus={ () => this.setState( { focus: true } ) } />
                <div className="focus-indicator"></div>
                <label className={ this.state.value || this.state.focus ? "subsided" : "" }>
                    { this.props.placeholder }
                </label>
             </div> );
    }
}
