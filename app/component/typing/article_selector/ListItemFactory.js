import React, {Component} from 'react';
import ArticleItem from "./ArticleItem";

import PropTypes from 'prop-types';

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

class ArticleCollectionItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    style: PropTypes.object,
    level: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      active: false
    };
    this.mouseOver = mouseOver.bind(this);
    this.mouseOut = mouseOut.bind(this);
  }

  onClick = (e) => {
    e.stopPropagation();
    console.log('articles ', e.target.dataset);

    this.setState(
      {
        expanded: !this.state.expanded,
        active: false
      }
    );
    return false;
  };

  render() {

    return (
      <div className={`articles listItem ${this.state.active ? 'active' : ''}`}
           data-article-id={this.props.item.id}
           style={this.props.style}
           onMouseOver={this.mouseOver}
           onMouseOut={this.mouseOut}
           onClick={this.onClick}>

        <i className="fa fa-book fa-lg"/>
        {this.props.item.name}
        {
          this.state.expanded ?
            (createList(this.props.item.sub, this.props.level + 1))
            : ''
        }
      </div>
    );
  }
}


function createList(items, level = 0) {
  return items.map(item => <ListItemFactory key={item.id} item={item} level={level}/>);
}

const ListItemFactory = (props) => {
  const item = props.item;
  const styles = {'paddingLeft': `${props.level}em`};
  return item.sub.length > 0 ?
    (
      <ArticleCollectionItem style={styles} item={props.item} level={props.level}/>
    ) :
    (
      <ArticleItem item={props.item} style={styles}/>
    );
};
ListItemFactory.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
};


export default createList;