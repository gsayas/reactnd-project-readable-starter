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

    console.log(nextProps.category === this.props.category)
    console.log(this.props.category)
    console.log(nextProps.category)

    //sort posts when they are first loaded into the component, or when orderBy changes
    if( nextProps.category !== this.props.category || this.props.orderBy !== nextProps.orderBy) {
        nextProps.posts.sort(sortBy(nextProps.orderBy));
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