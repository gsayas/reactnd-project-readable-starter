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
    if (nextProps.categories !== undefined && nextProps.categories.length !== 0 && nextProps.category !== undefined) {
      if (nextProps.categories.find((category) => category.name === nextProps.category) === undefined) {
        this.setState({ categoryFound: false })
      }else{
        this.setState({ categoryFound: true })
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.posts.length !== this.props.posts.length){
      return true;
    }else if(this.votesHaveChanged(nextProps.posts)){
      return false;
    }else{
      return true
    }
  }

  votesHaveChanged(newPosts) {
    console.log(newPosts);

    for (let i = 0; i < newPosts.length; i++) {
      if(this.props.posts[i].voteScore !== newPosts[i].voteScore){
        return true;
      }
    }
    return false;
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
                  post={post}
                />
              </li>
            ))}
          </ul>
        </div>
      )
    }else{
      return (<div className='not-found'>Category not found</div>);
    }

  }
}

function mapStateToProps ({postsReducer}) {
  return postsReducer
}

export default connect(mapStateToProps)(PostList);