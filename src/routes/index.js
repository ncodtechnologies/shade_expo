import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RoughInvoiceCreate from '../pages/roughInvCreate';
import Invoice from '../pages/invoice/';
import InvoiceList from '../pages/invoiceList';
import Voucher from '../pages/accounts/voucher';
import LedgerReport from '../pages/accounts/ledgerReport';
import Payroll from '../pages/payroll';

export default function Routes() {
  return (
    <Switch>
      <Route path="/roughInvoiceCreate" component={RoughInvoiceCreate} />
      <Route path="/invoice/:id" component={Invoice} />
      <Route path="/invoiceList" component={InvoiceList} />
      <Route path="/" exact component={InvoiceList} />
      <Route path="/voucher" exact component={Voucher} />
      <Route path="/payroll" exact component={Payroll} />
      <Route path="/ledgerReport" exact component={LedgerReport} />
    </Switch>
  );
}

