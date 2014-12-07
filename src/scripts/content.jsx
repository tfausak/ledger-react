//= require ./balance.jsx
//= require ./create_entry_form.jsx
//= require ./search.jsx
//= require ./filter.jsx
//= require ./entries.jsx

var Content = React.createClass({
  propTypes: {
    entries: React.PropTypes.array.isRequired,
    onCreateEntry: React.PropTypes.func.isRequired,
    onUpdateEntry: React.PropTypes.func.isRequired,
    onDeleteEntry: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <Balance entries={this.filteredEntries()} />
            <hr />
            <CreateEntryForm onCreate={this.props.onCreateEntry} />
          </div>

          <div className="col-sm-8">
            <Search onSearch={this.handleSearch} />
            <Filter onFilter={this.handleFilter} />
            <Entries
              entries={this.sortedEntries()}
              onUpdate={this.props.onUpdateEntry}
              onDelete={this.props.onDeleteEntry}
              />
          </div>
        </div>
      </div>
    );
  },
  getInitialState: function() {
    return {
      after: null,
      before: null,
      maximum: undefined,
      minimum: undefined,
      query: ''
    };
  },

  handleFilter: function(after, before, minimum, maximum) {
    this.setState({
      after: after,
      before: before,
      maximum: maximum,
      minimum: minimum
    });
  },
  handleSearch: function(query) {
    this.setState({query: query});
  },

  filteredEntries: function() {
    return this.props.entries.filter(function(entry) {
      if (this.state.query) {
        var haystack = entry.name.toLowerCase();
        var needle = this.state.query.toLowerCase();
        if (haystack.indexOf(needle) === -1) {
          return false;
        }
      }

      if (this.state.after) {
        if (entry.created < this.state.after) {
          return false;
        }
      }

      if (this.state.before) {
        if (entry.created > this.state.before) {
          return false;
        }
      }

      if (!isNaN(this.state.minimum)) {
        if (entry.amount < this.state.minimum) {
          return false;
        }
      }

      if (!isNaN(this.state.maximum)) {
        if (entry.amount > this.state.maximum) {
          return false;
        }
      }

      return true;
    }.bind(this));
  },
  sortedEntries: function() {
    return this.filteredEntries().sort(function(a, b) {
      return b.created - a.created;
    });
  }
});
