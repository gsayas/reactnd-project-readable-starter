import React, {Component} from 'react';
import {Alert} from 'react-bootstrap';
import {connect} from "react-redux";
import {clearErrors} from "../actions/postsActions";
import ReactTimeout from 'react-timeout'

class Messages extends Component {

  componentWillReceiveProps(nextProps) {
    console.log(this.props);
    if(nextProps.notFoundError !== this.props.notFoundError && nextProps.notFoundError) {
      console.log(nextProps);
     this.props.setTimeout(this.clearMessages, 5000);
    }
  }

  clearMessages = () => {
    console.log('works');
    this.props.dispatch(clearErrors());
  }

  render() {
    return (
      this.props.notFoundError ?
      <Alert bsStyle="warning">
        {this.props.notFoundError}
      </Alert>:''
    )
  }
}

function mapStateToProps ({postsReducer}) {
  return {
    notFoundError: postsReducer.notFoundError
  }
}

export default connect(mapStateToProps)(ReactTimeout(Messages));