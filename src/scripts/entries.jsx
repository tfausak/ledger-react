//= require ./entry.jsx

var Entries = React.createClass({
  propTypes: {
    entries: React.PropTypes.array.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <div className="list-group">
        {this.renderEntries()}
      </div>
    );
  },
  renderEntries: function() {
    return this.props.entries.map(function(entry) {
      return (
        <div className="list-group-item" key={entry.number}>
          <Entry
            amount={entry.amount}
            created={entry.created}
            name={entry.name}
            number={entry.number}
            onUpdate={this.props.onUpdate}
            onDelete={this.props.onDelete}
            />
        </div>
      );
    }.bind(this));
  },
});
