import EntryForm from 'components/entry_form';
import React from 'react';

export default React.createClass({
  propTypes: {
    onCreate: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Create an entry
        </div>

        <div className="panel-body">
          <EntryForm onCreate={this.props.onCreate} />
        </div>
      </div>
    );
  }
});
