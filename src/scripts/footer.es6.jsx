import React from 'react';

export default React.createClass({
  propTypes: {
    version: React.PropTypes.string.isRequired
  },

  render: function() {
    return (
      <div className="container">
        <ul className="list-inline text-center">
          <li>
            <a href="https://github.com/tfausak/ledger-react">
              ledger-react
            </a>
            {' '}
            {this.props.version}
          </li>

          <li>
            <a href="https://github.com/tfausak/ledger-api">
              ledger-api
            </a>
            {' '}
            0.2.0
          </li>
        </ul>
      </div>
    );
  }
});
