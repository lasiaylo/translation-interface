import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

class Button extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let { active } = this.state;
        active = !active;
        this.setState({ active });
    }

    render() {
        let { className, src } = this.props;
        const { active } = this.state;
        console.log(active);
        className = active ? className + ' active' : className;
        return (
            <Image className={className} src={src} onClick={this.handleClick} />
        );
    }
}

export default Button;
