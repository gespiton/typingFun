import React, { Component } from "react";
import PropTypes from 'prop-types';
import ArticleList from "./article_selector/ArticleList";



class ArticleSelector extends Component {
    static PropTypes = {

    }

    constructor(props) {
        console.log('class selector');
        super(props);
        this.state = {
            //todo: change this to true
            folded: false
        };
    }

    toggleSelector = () => {
        console.log('haha');
        this.setState({
            folded: !this.state.folded
        });
    }

    render() {
        const that = this;
        const items = [
            {
                name: 'first',
                text: 'this is the first article',
                id: '123123'
            },
            {
                name: 'forth',
                text: 'this is the forth article',
                id: '12312asdf3',
                sub: [
                    {
                        name: 'fifth',
                        id: '12312asdasdf3',
                        text: 'this is the fifth article'
                    }
                ]
            },
            {
                name: 'second',
                text: 'this is the second article',
                id: 'asdfa12312asdasdf3'
            },
            {
                name: 'third',
                id: 'asdfasdfa12312asdasdf3',
                text: 'this is the third article'
            }
        ];


        return (
            <div id="class-selector" className={that.state.folded ? 'fold' : ''} >
                <div id="class-selector-toggler"  >
                    <i className="fa fa-bars fa-3x" onClick={this.toggleSelector} />
                </div >
                <ArticleList items={items} />
            </div>
        );
    }
}

export default ArticleSelector;