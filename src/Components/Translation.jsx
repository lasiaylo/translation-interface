import _ from 'lodash';
import React, { Component } from 'react';
import { DropdownButton, Image }  from 'react-bootstrap';
import Textarea from 'react-textarea-autosize';
import Toggle from 'react-toggle';

import TranslateText from '../Translation/Translate';
import LanguageForm from './LanguageForm'
import GetLanguages from '../Translation/Languages';
import DetectLanguage from '../Translation/Detect';
import Directions from './Directions';

import Switch from '../Assets/switch.png';

class Translation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            auto: true,
            languages: null,
            inLanguage: 'en',
            outLanguage: 'es',
            inText: '',
            outText: '',
            directions: null,
        };
        GetLanguages(languages => this.setState({ languages }));

        this.handleInText = this.handleInText.bind(this);
        this.handleOutText = this.handleOutText.bind(this);
        this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
        this.handleChangeInLanguage = this.handleChangeInLanguage.bind(this);
        this.handleChangeAuto = this.handleChangeAuto.bind(this);
        this.switch = this.switch.bind(this);
    }

    handleInText(event) {
        const { auto, inLanguage, outLanguage } = this.state;
        let inText = event.target.value;

        // inText.replace(/[\r\n]+/g, '33123');
        const buffer = inText.replace(/[\r\n]+/g,".] ");
        if (auto) {
            DetectLanguage(buffer, inLanguage => this.setState({ inLanguage }))
        }

        TranslateText(buffer, inLanguage, outLanguage, this.handleOutText);
        this.setState({inText});
    }

    handleOutText(outText, english) {
        outText = this.format(outText);
        english = this.format(english);
        this.handleDirections(outText, english);
        this.setState({ outText })
    }

    format(text) {
        text = text.split(/.]|。 /g);
        text = text.join("\r\n");
        return text.replace(/[\r\n] /g, '\r\n');
    }

    formatDirections(text){
        const directions = text.split(/[.\/#!$?%\^&\*;:{}=\-_`~()。]|\r\n/g);
        _.remove(directions, (str) => (/^\s*$/.test(str)));
        return directions;
    }

    handleDirections(text, english) {
        text = this.formatDirections(text);
        english = this.formatDirections(english);
        const directions = {text: text, english: english};
        this.setState({ directions });
    }

    handleChangeLanguage(outLanguage) {
        const { inLanguage, inText } = this.state;
        this.myRef.click();
        TranslateText(inText, inLanguage, outLanguage, this.handleOutText);
        this.setState({ outLanguage });
    }

    handleChangeInLanguage(inLanguage) {
        const { outLanguage, inText, auto } = this.state;
        this.myRef.click();
        TranslateText(inText, inLanguage, outLanguage, this.handleOutText);
        this.setState({ auto: !auto, inLanguage });
    }
    
    handleChangeAuto(){
        const { auto } = this.state;
        this.setState({ auto: !auto });
    }

    switch(){
        let { inLanguage, outLanguage, inText, outText } = this.state;
        let buffer = inLanguage;
        inLanguage = outLanguage;
        outLanguage = buffer;

        buffer = inText;
        inText = outText;
        outText = buffer;

        this.setState({ inLanguage, outLanguage, inText, outText });
    }

    render() {
        const {
            auto,
            directions,
            languages,
            inLanguage,
            outLanguage,
            inText,
            outText,
        } = this.state;
        let inTitle = '';
        let outTitle = 'German';
        if (languages){
            outTitle = languages[outLanguage].name;
            inTitle = auto ?
                languages[inLanguage].name + ' (Auto)' :
                languages[inLanguage].name
            }

        return (
            <div
                className='translation'
                ref={ref => this.myRef = ref}
            >
                <div className='translation-row'>
                <div className='box in'>
                    <div className='button-row'>
                        <DropdownButton
                            bsStyle='Default'
                            title={inTitle}
                        >
                            <LanguageForm
                                languages={languages}
                                callback={this.handleChangeInLanguage}
                            />
                        </DropdownButton>

                        <Toggle
                            checked={auto}
                            aria-label={'Auto'}
                            onChange={this.handleChangeAuto}
                        />
                        <span className='toggle-label'>Auto</span>

                    </div>
                    <Textarea
                        className='input-field'
                        value={inText}
                        onChange={this.handleInText}
                        minRows={5}
                    />
                </div>

                    <Image className='switch-icon' src={Switch} onClick={this.switch} />

                <div className='box out'>
                    <div className='button-row'>
                        <DropdownButton
                            bsStyle='Default'
                            title={outTitle}
                        >
                        <LanguageForm

                            languages={languages}
                            callback={this.handleChangeLanguage}
                        />
                        </DropdownButton>
                    </div>
                    <div className='out-wrapper'>
                        <span className='outText'>{outText}</span>
                    </div>
                </div>

                </div>
                <div className='bottom-row'>
                    <div className='spacer'></div>
                    <Directions
                        directions={directions}
                    />
                </div>
            </div>
        );
    }
}

export default Translation;