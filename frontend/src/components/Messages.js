import React, {Component} from 'react';
import {Alert, Fade} from 'react-bootstrap';
import {connect} from "react-redux";
import {clearMessages} from "../actions/postsActions";
import ReactTimeout from 'react-timeout'

class Messages extends Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.messages !== this.props.messages && nextProps.messages) {
      window.setTimeout(this.clearMessages, 5000);
    }
  }

  clearMessages = () => {
    //console.log('works');
    this.props.dispatch(clearMessages());
  }

  render() {
    return (
      <Fade in={this.props.messages !== false}>
        <Alert bsStyle="warning">
          {this.props.messages}
        </Alert>
      </Fade>
    )
  }
}

function mapStateToProps ({postsReducer}) {
  return {
    messages: postsReducer.messages
  }
}

export default connect(mapStateToProps)(ReactTimeout(Messages));