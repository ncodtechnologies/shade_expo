import React, { useState, useEffect } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import RoughInvoiceCreate from '../pages/roughInvCreate';
import Invoice from '../pages/invoice/';
import InvoiceList from '../pages/invoiceList';
import RoughInvoiceList from '../pages/roughInvoiceList';
import Payroll from '../pages/payroll';
import Ledger from '../pages/accounts/ledger';
import Voucher from '../pages/accounts/voucher';
import LedgerReport from '../pages/accounts/ledgerReport';
import LedgerReportPdf from '../pages/accounts/ledgerReportPdf';
import LedgerCreate from '../pages/accounts/ledgerCreate';
import LedgerGroup from '../pages/accounts/ledgerGroup';
import CashBook from '../pages/accounts/cashBook';
import CashBookPdf from '../pages/accounts/cashBookPdf';
import SundryCreditor from '../pages/accounts/sundryCreditor';
import SundryDebtor from '../pages/accounts/sundryDebtor';
import Product from '../pages/product';
import PurchaseVoucher from '../pages/purchase/voucher';
import PurchaseReport from '../pages/purchase/report';
import SalesReport from '../pages/salesReport';
import StockReport from '../pages/stock';
import Notification from '../pages/notification';
import NotificationCreate from '../pages/notificationCreate';
import Login from '../pages/login';
import Users from '../pages/users';
import UserCreate from '../pages/userCreate';
import ProfitLoss from '../pages/profit';
import { createBrowserHistory } from "history";

export default function Routes() {
  //const session = localStorage.getItem('ShadeUser') || ''
  const session='abcd';
  const history = createBrowserHistory();
  
  return session != '' ? (
    <HashRouter history={history}>
      <Route path="/roughInvoiceCreate/:id_rough_invoice" component={RoughInvoiceCreate} />
      <Route path="/invoice/:id/:id_rough_invoice?" component={Invoice} />
      <Route path="/invoiceList" component={InvoiceList} />
      <Route path="/roughInvoiceList" component={RoughInvoiceList} />
      <Route path="/" exact component={InvoiceList} />
      <Route path="/voucher/:date?/:type?" exact component={Voucher} />
      <Route path="/payroll" exact component={Payroll} />
      <Route path="/ledgerReport" exact component={LedgerReport} />
      <Route path="/ledgerReportPdf/:id_account_head/:from_date/:to_date" exact component={LedgerReportPdf} />
      <Route path="/ledger" exact component={Ledger} />
      <Route path="/ledgerCreate/:id_ledger" exact component={LedgerCreate} />
      <Route path="/ledgerGroup" exact component={LedgerGroup} />
      <Route path="/cashBook" exact component={CashBook} />
      <Route path="/cashBookPdf/:id_account_head/:from_date/:to_date" exact component={CashBookPdf} />
      <Route path="/product" exact component={Product} />
      <Route path="/purchaseVoucher/:voucher_no" exact component={PurchaseVoucher} />
      <Route path="/purchaseReport" exact component={PurchaseReport} />
      <Route path="/salesReport" exact component={SalesReport} />
      <Route path="/stockReport" exact component={StockReport} />
      <Route path="/sundryCreditor" exact component={SundryCreditor} />
      <Route path="/sundryDebtor" exact component={SundryDebtor} />   
      <Route path="/notification" exact component={Notification} />   
      <Route path="/notificationCreate" exact component={NotificationCreate} /> 
      <Route path="/users" exact component={Users} />
      <Route path="/userCreate/:id_user" exact component={UserCreate} />
      <Route path="/profit" exact component={ProfitLoss} />
    </HashRouter>
  ) : (
    <HashRouter>
      <Route path="/" render={(props) => <Login  {...props}/>}/>
    </HashRouter>
  )
}

/*}
    <SessionContext.Provider value={session}>
    <HashRouter>
      {//session &&
        <Route path="/login" exact render={(props) => <Login {...props}/>}/>
  //    }{session.id &&
        <Route path="/roughInvoiceCreate/:id_rough_invoice" component={RoughInvoiceCreate} />
      }{session.id  &&
        <Route path="/invoice/:id/:id_rough_invoice?" component={Invoice} />
      }{session.id  &&
        <Route path="/invoiceList" component={InvoiceList} />
      }{session.id  &&
        <Route path="/roughInvoiceList" component={RoughInvoiceList} />
      }{session.id  &&
        <Route path="/" exact component={InvoiceList} />
      }{session.id  &&
        <Route path="/voucher" exact component={Voucher} />
      }{session.id  &&
        <Route path="/payroll" exact component={Payroll} />
      }{session.id  &&
        <Route path="/ledgerReport" exact component={LedgerReport} />
      }{session.id  &&
        <Route path="/ledger" exact component={Ledger} />
      }{session.id  &&
        <Route path="/ledgerCreate/:id_ledger" exact component={LedgerCreate} />
      }{session.id  &&
        <Route path="/ledgerGroup" exact component={LedgerGroup} />
      }{session.id  &&
        <Route path="/cashBook" exact component={CashBook} />
      }{session.id  &&
        <Route path="/product" exact component={Product} />
      }{session.id  &&
        <Route path="/purchaseVoucher/:voucher_no" exact component={PurchaseVoucher} />
      }{session.id  &&
        <Route path="/purchaseReport" exact component={PurchaseReport} />
      }{session.id  &&
        <Route path="/stockReport" exact component={StockReport} />
      }{session.id  &&
        <Route path="/sundryCreditor" exact component={SundryCreditor} />
      }{session.id  &&
        <Route path="/sundryDebtor" exact component={SundryDebtor} />   
      }{session.id  &&
        <Route path="/notification" exact component={Notification} />   
      }{session.id  &&
        <Route path="/notificationCreate" exact component={NotificationCreate} /> 
      }{session.id  &&
        <Route path="/users" exact component={Users} />
      }{session.id  &&
        <Route path="/userCreate/:id_user" exact component={UserCreate} />
      }
    </HashRouter>
    </SessionContext.Provider>
    */