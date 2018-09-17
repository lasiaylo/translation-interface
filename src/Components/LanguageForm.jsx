import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';

class LanguageForm extends Component {
    constructor(props){
        super(props);
        this.makeButton = this.makeButton.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    makeButton(title, language) {
        const { callback } = this.props;
        const changeLanguage = () => callback(language);
        return (
            <Button
                bsStyle="link"
                key={title}
                onClick={() => {
                    changeLanguage();
                }}
            >
                { title }
            </Button>
        )
    }

    makeColumn(keys) {
        const { languages } = this.props;
        return (
            <ButtonGroup
                vertical
                key={keys}
            >
                {
                    keys.map( key => this.makeButton(languages[key].name, key))
                }
            </ButtonGroup>
        )
    }

    makeTable() {
        const { languages } = this.props;
        if (languages) {
            let keys = Object.keys(languages);
            keys =  _.sortBy(keys, key => languages[key].name);
            const columns = _.chunk(keys, 13);
                    return (
                        <div className='language-form'>
                            {
                                columns.map( column => this.makeColumn(column) )
                            }
                        </div>
                    )
        }
        return;
    }

    render() {
        return  (
            <div>
                {this.makeTable()}
            </div>
        )
    }
}

export default LanguageForm;

LanguageForm.propTypes = {
    callback: PropTypes.func,
};