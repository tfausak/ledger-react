//= require ./entry_form.jsx

var EditEntryForm = React.createClass({
  propTypes: {
    amount: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    number: React.PropTypes.number.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <EntryForm
        amount={this.props.amount}
        name={this.props.name}
        number={this.props.number}
        onUpdate={this.props.onUpdate}
        onCancel={this.props.onCancel}
        onDelete={this.props.onDelete}
        />
    );
  }
});
