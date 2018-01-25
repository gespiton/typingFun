import React, { createElement, Component } from 'react';
import PropTypes from 'prop-types';
const ArticleList = (props) => {
    return (
        <div id="article-list" className="z-depth-1" >
            <ul className="articles">
                {createList(props.items, 0)}
            </ul>
        </div>
    );
};

ArticleList.propTypes = {
    items: PropTypes.array.isRequired
};

function createList(items, level) {
    return items.map(item => <ListItemFactory key={item.id} item={item} level={level} />);
}

const ListItemFactory = (props) => {
    const item = props.item;
    const styles = { 'paddingLeft': `${props.level}em` };
    return item.sub ?
        (
            // <ul className="articles"
            //     data-article-id={item.id}
            //     style={styles}
            //     onClickCapture={articlesClicked} >

            //     <i className="fa fa-book fa-lg" />
            //     {item.name}
            //     {(createList(item.sub, props.level + 1))}
            // </ul >
            <ArticleCollectionItem style={styles} item={props.item} level={props.level} />
        ) :
        (
            <ArticleItem item={props.item} style={styles} />
        );
};
ListItemFactory.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number,
};

class ArticleCollectionItem extends Component {

    onClick = (e) => {
        e.stopPropagation();
        console.log('articles ', e.target.dataset);
        return false;
    }

    render() {
        return (
            <div className="articles listItem"
                data-article-id={this.props.item.id}
                style={this.props.styles}
                onClick={this.onClick} >

                <i className="fa fa-book fa-lg" />
                {this.props.item.name}
                {(createList(this.props.item.sub, this.props.level + 1))}
            </div >
        );
    }
}


class ArticleItem extends Component {

    articleClicked = (e) => {
        e.stopPropagation();
        console.log('article', e.target.dataset);
        return false;
    }

    render() {
        return (
            <li className="article listItem"
                data-article-id={this.props.item.id}
                style={this.props.style}
                onClick={this.articleClicked} >

                <i className="fa fa-file-o" />
                {this.props.item.name}
            </li >
        );
    }
}

export default ArticleList;