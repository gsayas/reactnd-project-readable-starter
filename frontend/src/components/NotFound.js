import React, {Component} from 'react';
import {connect} from "react-redux";

class NotFound extends Component {

  render() {
    return (<div className='not-found'>Page not found</div>);
  }

}export default connect()(NotFound);