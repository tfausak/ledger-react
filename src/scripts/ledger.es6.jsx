import Content from 'content';
import Footer from 'footer';
import Header from 'header';
import React from 'react';
import superagent from 'superagent';

export default React.createClass({
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
        <Footer version={this.state.version} />
      </div>
    );
  },
  getInitialState: function() {
    return {
      entries: [],
      key: window.location.hash.substring(1) ||
        window.localStorage.getItem('key'),
      url: window.LEDGER_API_URL,
      version: window.LEDGER_REACT_VERSION
    };
  },
  componentWillMount: function() {
    if (this.state.key) {
      var url = this.buildUrl('keys/' + this.state.key);
      superagent.get(url, function(response) {
        if (response.status !== 200) {
          window.alert('Invalid key: ' + this.state.key);
          this.getKey();
        } else {
          this.getEntries();
        }
      }.bind(this));
    } else {
      this.getKey();
    }
  },

  getKey: function() {
    var url = this.buildUrl('keys');
    superagent.post(url, function(response) {
      var key = response.body.id;
      this.setState({key: key});
      window.localStorage.setItem('key', key);
      window.location.hash = key;
      window.alert('New key: ' + this.state.key);
      this.getEntries();
    }.bind(this));
  },
  getEntries: function() {
    var url = this.buildUrl('entries');
    superagent.get(url, function(response) {
      var entries = response.body.map(this.transform);
      this.setState({entries: entries});
    }.bind(this));
  },
  transform: function(object) {
    return {
      amount: object.amount,
      time: new Date(object.time),
      description: object.description,
      id: object.id
    };
  },
  createEntry: function(entry) {
    var url = this.buildUrl('entries');
    superagent.post(url, entry, function(response) {
      var newEntry = this.transform(response.body);
      this.setState({entries: [newEntry].concat(this.state.entries)});
    }.bind(this));
  },
  updateEntry: function(entry) {
    var url = this.buildUrl('entries/' + entry.id);
    superagent.put(url, entry, function(response) {
      var updatedEntry = this.transform(response.body);
      this.setState({entries: this.state.entries.map(function(e) {
        if (e.id === updatedEntry.id) {
          return updatedEntry;
        }
        else {
          return e;
        }
      })});
    }.bind(this));
  },
  deleteEntry: function(entry) {
    var url = this.buildUrl('entries/' + entry.id);
    superagent.del(url, function() {
      this.setState({entries: this.state.entries.filter(function(e) {
        return e.id !== entry.id;
      })});
    }.bind(this));
  },

  buildUrl: function(path) {
    return this.state.url + '/' + path + '?key=' + this.state.key;
  }
});
