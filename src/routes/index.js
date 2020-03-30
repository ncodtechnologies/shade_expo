import React from 'react';
import { Switch, Route } from 'react-router-dom';
import First from '../pages/first';
import Second from '../pages/second';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={First} />
      <Route path="/second" component={Second} />
    </Switch>
  );
}
