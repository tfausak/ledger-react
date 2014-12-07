//= require bower_components/superagent/superagent.js
//= require ./header.jsx
//= require ./content.jsx
//= require ./footer.jsx

var Ledger = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        <Content
          entries={this.state.entries}
          onCreateEntry={this.createEntry}
          onUpdateEntry={this.updateEntry}
          onDeleteEntry={this.deleteEntry}
          />
        <Footer />
      </div>
    );
  },
  getInitialState: function() {
    return {
      entries: [],
      key: window.location.hash.substring(1),
      url: 'http://localhost:3000'
    };
  },
  componentWillMount: function() {
    this.getEntries();
  },

  getEntries: function() {
    var url = this.state.url + '/entries?key=' + this.state.key;
    superagent.get(url, function(response) {
      var entries = response.body.map(this.transform);
      this.setState({entries: entries});
    }.bind(this));
  },
  transform: function(object) {
    return {
      amount: object.amount,
      created: new Date(object.created),
      name: object.name,
      number: object.number
    };
  },
  createEntry: function(entry) {
    var url = this.state.url + '/entries?key=' + this.state.key;
    superagent.post(url, entry, function(response) {
      var newEntry = this.transform(response.body);
      this.setState({entries: [newEntry].concat(this.state.entries)});
    }.bind(this));
  },
  updateEntry: function(entry) {
    var url = this.state.url + '/entries/' + entry.number + '?key=' + this.state.key;
    superagent.put(url, entry, function(response) {
      var updatedEntry = this.transform(response.body);
      this.setState({entries: this.state.entries.map(function(e) {
        if (e.number === updatedEntry.number) {
          return updatedEntry;
        }
        else {
          return e;
        }
      })});
    }.bind(this));
  },
  deleteEntry: function(entry) {
    var url = this.state.url + '/entries/' + entry.number + '?key=' + this.state.key;
    superagent.del(url, function(response) {
      this.setState({entries: this.state.entries.filter(function(e) {
        return e.number !== entry.number;
      })});
    }.bind(this));
  }
});
