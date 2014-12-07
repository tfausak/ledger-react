var EntryForm = React.createClass({
  propTypes: {
    amount: React.PropTypes.number,
    name: React.PropTypes.string,
    number: React.PropTypes.number,
    onCreate: React.PropTypes.func,
    onUpdate: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    onDelete: React.PropTypes.func
  },

  render: function() {
    return (
      <form id="entry-form" onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>
            Type
          </label>

          <div className="radio">
            <label>
              <input
                defaultChecked={!this.props.amount || this.props.amount < 0}
                name="type"
                ref="type-credit"
                type="radio"
                value="credit"
                />
              Credit
            </label>
          </div>

          <div className="radio">
            <label>
              <input
                defaultChecked={this.props.amount > 0}
                name="type"
                ref="type-debit"
                type="radio"
                value="debit"
                />
              Debit
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="amount">
            Amount
          </label>

          <div className="input-group">
            <div className="input-group-addon">
              $
            </div>

            <input
              className="form-control"
              defaultValue={this.props.amount == undefined ? null : Math.abs(this.props.amount).toFixed(2)}
              id="amount"
              min="0"
              placeholder="7.31"
              ref="amount"
              step="any"
              type="number"
              />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="name">
            Name
          </label>

          <input
            className="form-control"
            defaultValue={this.props.name}
            id="name"
            placeholder="Lunch at Freebirds"
            ref="name"
            type="text"
            />
        </div>

        {this.renderButtons()}
      </form>
    );
  },
  renderButtons: function() {
    if (this.isEditing()) {
      return (
        <div className="btn-group">
          <button className="btn btn-primary" type="submit">
            Update
          </button>

          <button
            className="btn btn-default"
            onClick={this.onCancel}
            type="button"
            >
            Cancel
          </button>

          <button
            className="btn btn-danger"
            onClick={this.onDelete}
            type="button"
            >
            Delete
          </button>
        </div>
      );
    }
    else {
      return (
        <button className="btn btn-primary" type="submit">
          Create
        </button>
      );
    }
  },

  onSubmit: function(event) {
    event.preventDefault();

    var typeCreditNode = this.refs['type-credit'].getDOMNode();
    var typeDebitNode = this.refs['type-debit'].getDOMNode();
    var amountNode = this.refs.amount.getDOMNode();
    var amount = amountNode.valueAsNumber;
    var nameNode = this.refs.name.getDOMNode();
    var name = nameNode.value;

    if (isNaN(amount) || !isFinite(amount)) {
      amountNode.focus();
      return;
    }

    if (!name) {
      nameNode.focus();
      return;
    }

    if (typeCreditNode.checked) {
      amount *= -1;
    }

    var entry = {amount: amount, name: name};

    if (this.isEditing()) {
      entry = {
        amount: entry.amount,
        name: entry.name,
        number: this.props.number
      };
      this.props.onUpdate(entry);
    }
    else {
      this.props.onCreate(entry);

      typeCreditNode.checked = true;
      typeDebitNode.checked = false;

      var nodes = document.querySelectorAll('#entry-form input, #entry-form button');
      for (var i = 0; i < nodes.length; i++) {
        nodes.item(i).blur();
      }

      amountNode.value = '';
      nameNode.value = '';
    }
  },
  onCancel: function(event) {
    event.preventDefault();
    this.props.onCancel();
  },
  onDelete: function(event) {
    event.preventDefault();
    if (window.confirm('Are you sure you want to delete this entry?')) {
      this.props.onDelete();
    }
  },

  isEditing: function() {
    return this.props.onUpdate;
  }
});
