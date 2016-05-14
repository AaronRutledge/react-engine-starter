'use strict';

var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({

  render: function render() {

    return (
      <div id='list'>
        <h1>Items</h1>
        <h6>Click on an item to see the details</h6>
        <ul>
          {this.props.items.map(function(item) {
            return (
              <li key={item.id}>
                <Router.Link to={'/item/' + item.id}>
                  <img src={item.image} alt={item.name} />
                </Router.Link>
              </li>
            );
          })}

        </ul>
      </div>
    );
  }
});
