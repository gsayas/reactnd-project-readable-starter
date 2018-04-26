import React from 'react';
import {Link} from 'react-router-dom';

class CategoryList extends React.Component {

  capitalize = (str = '') => {
    return typeof str !== 'string'
      ? ''
      : str[0].toUpperCase() + str.slice(1)
  }

  render() {
    const {categories} = this.props

    return (
        <ul className="post-list">
          <li>
            <Link to='/'>Home</Link>
          </li>
          {categories && categories.map((category,index) => (
            <li key={index}>
              <Link to={`/${category.path}`}>{this.capitalize(category.name)}</Link>
            </li>
          ))}
        </ul>
    );
  }
}
export default CategoryList;