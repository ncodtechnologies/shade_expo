import React from 'react';
import { Switch, Route } from 'react-router-dom';
import First from '../pages/first';
import Second from '../pages/second';
import Table from '../pages/table';
import Form from '../pages/form';
import RoughInvoiceCreate from '../pages/roughInvCreate';
import Invoice from '../pages/invoice/';
import InvoiceList from '../pages/invoiceList';

export default function Routes() {
  return (
    <Switch>
      <Route path="/first" exact component={First} />
      <Route path="/second" component={Second} />
      <Route path="/table" component={Table} />
      <Route path="/form" component={Form} />
      <Route path="/roughInvoiceCreate" component={RoughInvoiceCreate} />
      <Route path="/invoice" component={Invoice} />
      <Route path="/invoiceList" component={InvoiceList} />
    </Switch>
  );
}
