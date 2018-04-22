import React from 'react';
import {connect} from "react-redux";
import Post from './Post.js';
import {fetchPosts, toggleOrder} from "../actions";
import sortBy from 'sort-by';
import CreatePost from './CreatePost.js';

class PostList extends React.Component {

  state = {
    categoryFound: true
  }

  componentDidMount(){
    this.props.dispatch(fetchPosts());
  }

  handleOrdering = (field) => {
    this.props.dispatch(toggleOrder({orderBy: field}));
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories!== undefined && nextProps.categories.length !== 0 && nextProps.category !== undefined) {
      if (nextProps.categories.find((category) => category.name === nextProps.category) === undefined) {
        this.setState({ categoryFound: false })
      }
    }
  }

  render() {
    const {posts, orderBy, category} = this.props;
    let showingPosts;

    if(category){
      showingPosts = posts.filter(post => post.category === category)
    }else{
      showingPosts = posts;
    }
    //TODO: show message when no posts are showing

    showingPosts.sort(sortBy(orderBy));

    if( this.state.categoryFound === true ) {
      return (
        <div className="post-list-wrapper">
          <span className='order-block'>Sort by:&nbsp;
            <a href='javascript:void(0)' onClick={() => this.handleOrdering('voteScore')}>score</a>|
            <a href='javascript:void(0)' onClick={() => this.handleOrdering('timestamp')}>date</a>
          </span>
          <CreatePost/>
          <ul className="post-list">
            {showingPosts && showingPosts.map((post) => (
              <li key={post.id}>
                <Post
                  listing={true}
                  post={post}
                />
              </li>
            ))}
          </ul>
        </div>
      )
    }else{
      return (<div className='not-found'>Category not found</div>);//TODO: fix page jumping when category is not found
    }

  }
}

function mapStateToProps ({postsReducer}) {
  return postsReducer
}

export default connect(mapStateToProps)(PostList);