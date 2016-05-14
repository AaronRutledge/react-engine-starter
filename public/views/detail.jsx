'use strict';

var React = require('react');

module.exports = React.createClass({

  render: function render() {
    var itemId = this.props.params.id;
    var item = this.props.items.filter(function(_item) {
      return _item.id === itemId;
    })[0];

    return (
      <div id='detail'>
        <h1>{item.name}</h1>
        <img src={item.image} alt={item.title} />
        <a href={item.url} target='_blank'>more info</a>
      </div>
    );
  }
});
