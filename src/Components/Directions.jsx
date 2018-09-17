import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Panel, Image } from 'react-bootstrap';
import Button from './Button';

import thumb from '../Assets/thumbs-up.svg';
import left from '../Assets/left.ico';
import right from '../Assets/right.ico';
import forward from '../Assets/up.png';

class Directions extends Component {
    constructor(props) {
        super(props);

        this.discernDirection = this.discernDirection.bind(this);

    }



    makePanel(title, i) {
        const directionIcon = this.discernDirection(i);

        return (
            <CSSTransition
                key={i*7}
                timeout={500}
                classNames="fade"
            >
            <Panel
                key={i}
            >
                <Panel.Body>
                    <Image className='direction-icon' src={directionIcon} />
                    <span className='direction-title'>{title}</span>
                    <Button className='panel-icon reverse' src={thumb} />
                    <Button className='panel-icon' src={thumb} />
                </Panel.Body>
            </Panel>
            </CSSTransition>
        )
    }

    discernDirection(i) {
        const { directions } = this.props;
        const instruction = directions.english[i];
        if (instruction.includes('left')) {
            return left;
        }
        if (instruction.includes('right')) {
            return right;
        }
        if (instruction.includes('forward') || instruction.includes('ahead')) {
            return forward;
        }
    }

    render() {
        const { directions } = this.props;
        let instructions = directions ? directions.text : [];
        return (
            <div className='directions'>
                <TransitionGroup className="todo-list">
                {
                    instructions.map( (direction, i) => this.makePanel(direction, i))
                }
                </TransitionGroup>
            </div>
        );
    };
}

export default Directions;