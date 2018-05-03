import React from 'react';
import {Link} from 'react-router-dom';
import { Nav, NavItem, Navbar } from 'react-bootstrap';

class CategoryList extends React.Component {

  capitalize = (str = '') => {
    return typeof str !== 'string'
      ? ''
      : str[0].toUpperCase() + str.slice(1)
  }

  render() {
    const {categories} = this.props

    return (
      <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Readable (Reddit Clone)
          </Navbar.Brand>
        </Navbar.Header>
        <Nav bsStyle="pills" activeKey={1}>
        <NavItem componentClass={Link} href="/" to="/" eventKey={1}>Home</NavItem>
        {categories && categories.map((category,index) => (
          <NavItem componentClass={Link} href="/" to={'/'+category.name} key={index} eventKey={1}>
            {this.capitalize(category.name)}
          </NavItem>
        ))}
      </Nav>
      </Navbar>
      </div>
    );
  }
}
export default CategoryList;