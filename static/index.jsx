//= require bower_components/react/react.js
// var React = require('react');

var Ledger = React.createClass({
  render: function () {
    return (
      <div>
        Ledger
      </div>
    );
  }
});

React.render(
  <Ledger />,
  document.getElementById('ledger')
);
