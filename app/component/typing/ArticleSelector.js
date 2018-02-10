import React, {Component} from "react";
import PropTypes from 'prop-types';
import createList from "./article_selector/ListItemFactory";
import {connect} from 'react-redux';

@connect(
  (state) => (
    {
      currentArticle: state.currentArticle
    }
  )
)
class ArticleSelector extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      //todo: change this to true
      folded: false,
      items: []
    };
  }

  componentDidMount() {
    const that = this;
    $.get('/article/index', function (res) {
      console.log(res);
      if (res.success) {
        that.setState({items: res.result});
      }
    });
  }

  toggleSelector = () => {
    this.setState({
      folded: !this.state.folded
    });
  };

  render() {
    const that = this;

    return (
      <div id="class-selector" className={that.state.folded ? 'fold' : ''}>
        <div id="class-selector-toggler">
          <i className="fa fa-bars fa-3x" onClick={this.toggleSelector}/>
        </div>
        <div id="article-list" className="z-depth-1">
          <ul className="articles">
            {createList(this.state.items)}
          </ul>
        </div>
      </div>
    );
  }
}

export default ArticleSelector;