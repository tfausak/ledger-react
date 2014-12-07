//= require ./edit_entry_form.jsx
//= require ./show_entry.jsx

var Entry = React.createClass({
  propTypes: {
    amount: React.PropTypes.number.isRequired,
    created: React.PropTypes.instanceOf(Date).isRequired,
    name: React.PropTypes.string.isRequired,
    number: React.PropTypes.number.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired
  },

  render: function() {
    if (this.state.isEditing) {
      return this.renderEdit();
    }
    else {
      return this.renderShow();
    }
  },
  renderEdit: function() {
    return (
      <EditEntryForm
        amount={this.props.amount}
        name={this.props.name}
        number={this.props.number}
        onUpdate={this.onUpdate}
        onCancel={this.onCancel}
        onDelete={this.onDelete}
        />
    );
  },
  renderShow: function() {
    return (
      <ShowEntry
        amount={this.props.amount}
        created={this.props.created}
        name={this.props.name}
        onClick={this.onClick}
        />
    );
  },
  getInitialState: function() {
    return {isEditing: false};
  },

  onClick: function(event) {
    event.preventDefault();
    this.setState({isEditing: true});
  },
  onUpdate: function(entry) {
    this.setState({isEditing: false});
    this.props.onUpdate(entry);
  },
  onCancel: function() {
    this.setState({isEditing: false});
  },
  onDelete: function() {
    this.setState({isEditing: false});
    this.props.onDelete(this.props);
  }
});
