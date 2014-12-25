import Filter from 'components/filter';
import React from 'react';
import Search from 'components/search';

export default React.createClass({
  propTypes: {
    onFilter: React.PropTypes.func.isRequired,
    onSearch: React.PropTypes.func.isRequired
  },

  render: function () {
    return (
      <div>
        <Search onSearch={this.props.onSearch} />
        <Filter onFilter={this.props.onFilter} />
      </div>
    );
  }
});
