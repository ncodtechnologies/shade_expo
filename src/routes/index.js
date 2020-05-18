import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RoughInvoiceCreate from '../pages/roughInvCreate';
import Invoice from '../pages/invoice/';
import InvoiceList from '../pages/invoiceList';
import Payroll from '../pages/payroll';
import Ledger from '../pages/accounts/ledger';
import Voucher from '../pages/accounts/voucher';
import LedgerReport from '../pages/accounts/ledgerReport';
import LedgerCreate from '../pages/accounts/ledgerCreate';
import LedgerGroup from '../pages/accounts/ledgerGroup';
import CashBook from '../pages/accounts/cashBook';
import Product from '../pages/product';
import PurchaseVoucher from '../pages/purchase/voucher';
import PurchaseReport from '../pages/purchase/report';
import StockReport from '../pages/stock';

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
      <Route path="/ledger" exact component={Ledger} />
      <Route path="/ledgerCreate/:id_ledger" exact component={LedgerCreate} />
      <Route path="/ledgerGroup" exact component={LedgerGroup} />
      <Route path="/cashBook" exact component={CashBook} />
      <Route path="/product" exact component={Product} />
      <Route path="/purchaseVoucher/:voucher_no" exact component={PurchaseVoucher} />
      <Route path="/purchaseReport" exact component={PurchaseReport} />
      <Route path="/stockReport" exact component={StockReport} />
    </Switch>
  );
}

