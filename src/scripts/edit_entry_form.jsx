//= require ./entry_form.jsx

var EditEntryForm = React.createClass({
  propTypes: {
    amount: React.PropTypes.number.isRequired,
    description: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <EntryForm
        amount={this.props.amount}
        description={this.props.description}
        id={this.props.id}
        onUpdate={this.props.onUpdate}
        onCancel={this.props.onCancel}
        onDelete={this.props.onDelete}
        />
    );
  }
});
