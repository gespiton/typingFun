import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import selectArticle from "../../../redux/actions/selectArticle";


function mouseOver(e) {
    e.stopPropagation();
    this.setState({
        active: true
    });
}

function mouseOut(e) {
    e.stopPropagation();
    this.setState({
        active: false
    });
}

class ArticleItem extends Component {
    static propTypes = {
        item: PropTypes.object,
        style: PropTypes.object,
        selectArticle: PropTypes.func,
        currentArticle: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
        this.mouseOver = mouseOver.bind(this);
        this.mouseOut = mouseOut.bind(this);
    }

    onClick = (e) => {
        e.stopPropagation();
        const data = e.currentTarget.dataset;
        this.props.selectArticle({
            name: data.articleName,
            id: data.articleId
        });

        return false;
    }

    render() {
        const selected = this.props.currentArticle.id === this.props.item.id;

        return (
            <li className={`article listItem ${this.state.active ? 'active' : ''} ${selected ? 'selected' : ''}`}
                data-article-id={this.props.item.id}
                data-article-name={this.props.item.name}
                style={this.props.style}
                onMouseOver={this.mouseOver}
                onMouseOut={this.mouseOut}
                onClick={this.onClick} >

                <i className="fa fa-file-o" />
                {this.props.item.name}
            </li >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentArticle: state.currentArticle
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectArticle: article => dispatch(selectArticle(article))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItem);