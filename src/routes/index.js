import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RoughInvoiceCreate from '../pages/roughInvCreate';
import Invoice from '../pages/invoice/';
import InvoiceList from '../pages/invoiceList';

export default function Routes() {
  return (
    <Switch>
      <Route path="/roughInvoiceCreate" component={RoughInvoiceCreate} />
      <Route path="/invoice/:id" component={Invoice} />
      <Route path="/invoiceList" component={InvoiceList} />
      <Route path="/" exact component={InvoiceList} />
    </Switch>
  );
}

