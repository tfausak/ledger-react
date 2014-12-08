//= require bower_components/amdainty/amdainty.js
//= requireSelf
//= require ./init.js

import React from 'react';
import Ledger from 'ledger';

React.render(
  <Ledger />,
  document.getElementById('ledger')
);
