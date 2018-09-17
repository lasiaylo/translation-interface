import _ from 'lodash';
import React, { Component } from 'react';
import TranslateText from '../Translation/Translate';
import { DropdownButton }  from 'react-bootstrap';
import LanguageForm from './LanguageForm'
import GetLanguages from '../Translation/Languages';
import DetectLanguage from '../Translation/Detect';
import Textarea from 'react-textarea-autosize';
import Directions from './Directions';

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
    }

    componentDidUpdate(){
    }

    handleInText(event) {
        const { auto, inLanguage, outLanguage } = this.state;
        let inText = event.target.value;

        // inText.replace(/[\r\n]+/g, '33123');
        inText = inText.replace(/[\r\n]+/g,".] ");
        if (auto) {
            DetectLanguage(inText, inLanguage => this.setState({ inLanguage }))
        }
        TranslateText(inText, inLanguage, outLanguage, this.handleOutText);
        this.setState({inText});
    }

    handleOutText(outText, english) {
        outText = this.format(outText);
        english = this.format(english);

        console.log(outText);
        console.log(english);
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

    render() {
        const {
            auto,
            directions,
            languages,
            inLanguage,
            outLanguage,
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
                <div className='box in' onHover={console.log('HOVERRR')}>
                    <div className='button-row'>
                        <DropdownButton
                            bsStyle='Default'
                            title={inTitle}
                        >
                            <LanguageForm
                                languages={languages}
                                callback={this.handleChangeLanguage}
                            />
                        </DropdownButton>
                    </div>
                    <Textarea
                        className='input-field'
                        onChange={this.handleInText}
                        minRows={5}
                    />
                </div>

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