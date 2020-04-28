import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RoughInvoiceCreate from '../pages/roughInvCreate';
import Invoice from '../pages/invoice/';
import InvoiceList from '../pages/invoiceList';
import Accounts from '../pages/accounts/voucher';
import Payroll from '../pages/payroll';

export default function Routes() {
  return (
    <Switch>
      <Route path="/roughInvoiceCreate" component={RoughInvoiceCreate} />
      <Route path="/invoice/:id" component={Invoice} />
      <Route path="/invoiceList" component={InvoiceList} />
      <Route path="/" exact component={InvoiceList} />
      <Route path="/accounts" exact component={Accounts} />
      <Route path="/payroll" exact component={Payroll} />
    </Switch>
  );
}

