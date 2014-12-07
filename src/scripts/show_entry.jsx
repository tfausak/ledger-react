var ShowEntry = React.createClass({
  propTypes: {
    amount: React.PropTypes.number.isRequired,
    created: React.PropTypes.instanceOf(Date).isRequired,
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
  },

  render: function() {
    return (
      <div className="entry" onClick={this.props.onClick}>
        <div className="lead">
          <div className="pull-right">
            <div className={['label', 'label-' + this.getClassName()].join(' ')}>
              ${this.props.amount.toFixed(2)}
            </div>
          </div>

          {this.props.name}
        </div>

        <div>
          {this.props.created.toLocaleString()}
        </div>
      </div>
    );
  },

  getClassName: function() {
    if (this.isCredit()) {
      return 'danger';
    }
    if (this.isDebit()) {
      return 'success';
    }

    return 'default';
  },
  isCredit: function() {
    return this.props.amount < 0;
  },
  isDebit: function() {
    return this.props.amount > 0;
  }
});
