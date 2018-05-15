import React, {Component} from 'react';
import {Alert, Collapse} from 'react-bootstrap';
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
    //console.log('works');
    this.props.dispatch(clearErrors());
  }

  render() {
    return (
      <Collapse in={this.props.notFoundError !== false}>
        <Alert bsStyle="warning">
          {this.props.notFoundError}
        </Alert>
      </Collapse>
    )
  }
}

function mapStateToProps ({postsReducer}) {
  return {
    notFoundError: postsReducer.notFoundError
  }
}

export default connect(mapStateToProps)(ReactTimeout(Messages));