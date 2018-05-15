import React from 'react';
import {connect} from "react-redux";
import Post from './Post.js';
import {fetchPosts, toggleOrder} from "../actions/postsActions.js";
import sortBy from 'sort-by';
import CreatePost from './CreatePost.js';
import {clearMessages, reportMessage} from "../actions/postsActions";

class PostList extends React.Component {

  componentDidMount(){
    this.props.dispatch(clearMessages());
    this.props.dispatch(fetchPosts());
  }

  handleOrdering = (field) => {
    this.props.dispatch(toggleOrder({orderBy: field}));
  };

  componentWillReceiveProps(nextProps) {
      if (nextProps.category !== undefined && !this.isCategoryFound(nextProps.categories, nextProps.category) && !this.props.messages) {
        this.props.dispatch(reportMessage('Category not found'))
        //console.log(nextProps);
      }
  }

  isCategoryFound(categories, targetCategory) {
    if (categories !== undefined && categories.length !== 0) {
      return categories.find((category) => category.name === targetCategory) !== undefined
    }else{
      return false;
    }
  }

  render() {
    const {posts, category} = this.props;
    let showingPosts;

    if(category){
      showingPosts = posts.filter(post => post.category === category)
    }else{
      showingPosts = posts;
    }

    showingPosts.sort(sortBy(this.props.orderBy));

      return (
        <div className="post-list-wrapper">
          <span className='order-block'>Sort by:&nbsp;
            <a href='javascript:void(0)' onClick={() => this.handleOrdering('voteScore')}>score</a>|
            <a href='javascript:void(0)' onClick={() => this.handleOrdering('timestamp')}>date</a>
          </span>
          <CreatePost/>
          {category === undefined || this.isCategoryFound(this.props.categories, category) ?
          <ul className="post-list">
            {showingPosts && showingPosts.map((post) => (
              <li key={post.id}>
                <Post
                  post={post}
                  listing={true}
                />
              </li>
            ))}
          </ul>:''}
        </div>
      )


  }
}

function mapStateToProps ({postsReducer}) {
  return postsReducer
}

export default connect(mapStateToProps)(PostList);