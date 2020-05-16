import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

class App extends Component {
    state = {
        
    };
    
    componentDidMount() {

    }

    render() {
    return (
        
        <div>
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
              <Link to={"/product"} className="nav-link">Product</Link>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
              <Link to={"/roughInvoiceCreate"} className="nav-link">Create Rough Invoice</Link>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
              <Link to={"/invoiceList"} className="nav-link">Invoices</Link>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
              <Link to={"/voucher"} className="nav-link">Voucher</Link>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
              <Link to={"/payroll"} className="nav-link">Payroll</Link>
            </li>
          </ul>
        </nav>
      
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
          <a href="index3.html" class="brand-link">
            <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
                />
            <span class="brand-text font-weight-light">Shade Expo</span>
          </a>
      
          <div class="sidebar">
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
              <div class="image">
                <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image" />
              </div>
              <div class="info">
                <a href="#" class="d-block">Admin</a>
              </div>
            </div>
      
            <nav class="mt-2">
              <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                 <li class="nav-item has-treeview menu-open">
                  <NavLink to={"/product"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-file-invoice"></i>
                    <p>
                     Product
                    </p>
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to={"/roughInvoiceCreate"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-receipt"></i>
                    <p>
                     Create Rough Invoice
                    </p>
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to={"/invoiceList"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-file-invoice"></i>
                    <p>
                     Invoices
                    </p>
                  </NavLink>
                </li>
                <li class="nav-item has-treeview menu-open">
                  <NavLink to={"/purchase"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-file-invoice"></i>
                    <p>
                     Purchase
                    </p>
                  </NavLink>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="/purchaseReport" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Purchase Report</p>
                    </a>
                  </li>
                </ul>               
                </li>
                <li class="nav-item has-treeview menu-open">
                  <NavLink to={"/accounts"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-file-invoice"></i>
                    <p>
                     Accounts
                    </p>
                  </NavLink>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="/ledger" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Ledger</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="/voucher" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Voucher</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="/ledgerReport" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Ledger Report</p>
                    </a>
                  </li>
<<<<<<< HEAD
                  <li class="nav-item">
                    <a href="/cashBook" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Cash Book</p>
                    </a>
                  </li>
=======
>>>>>>> 473dcadbdb11ca4d94c6380ef393e3707d90c8a4
                </ul>               
                </li>
                <li class="nav-item has-treeview menu-open">
                  <NavLink to={"/payroll"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-file-invoice"></i>
                    <p>
                     Payroll
                    </p>
                  </NavLink>
                </li>
<<<<<<< HEAD
                <li class="nav-item has-treeview menu-open">
                  <NavLink to={"/stockReport"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-file-invoice"></i>
                    <p>
                     Stock Report
                    </p>
                  </NavLink>
                </li>
=======
>>>>>>> 473dcadbdb11ca4d94c6380ef393e3707d90c8a4
             
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    );
    }
}

export default App;