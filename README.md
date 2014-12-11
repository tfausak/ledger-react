# [ledger-react][1]

Watch your money fly away.

This is a front end for [ledger-api][2].

- [Installation](#installation)
- [Configuration](#configuration)
- [Deployment](#deployment)

## Installation

To install ledger-react, you'll need Node.js v0.10.

``` sh
$ git clone https://github.com/tfausak/ledger-react.git
$ cd ledger-react
$ npm install
$ bower install
$ npm run start
# http://localhost:8000
```

## Configuration

To configure ledger-react, use environment variables.

``` sh
$ env LEDGER_API_URL=http://ledger-api.example.com npm run start
```

## Deployment

To deploy ledger-react, create an [OpenShift][3] account.

``` sh
$ rhc app create ledgerreact nodejs-0.10
$ cd ledgerreact
$ rhc env LEDGER_API_URL='...'
$ git remote add github https://github.com/tfausak/ledger-react.git
$ git pull github master
$ git push origin github/master:master
```

[1]: https://github.com/tfausak/ledger-react
[2]: https://github.com/tfausak/ledger-api
[3]: https://www.openshift.com
