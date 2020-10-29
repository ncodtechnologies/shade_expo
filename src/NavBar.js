import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

class App extends Component {
    state = {
        
    };
  
    componentDidMount() {

    }

    logOut() {
      localStorage.clear();
      window.location.reload();
    }

    render() {
      return <div>
        
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
          
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" data-widget="pushmenu" href="#">
                <i class="fas fa-bars" />
              </a>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
              <Link to={"/product"} className="nav-link">
                Product
              </Link>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>            
            <li class="nav-item d-none d-sm-inline-block">
              <Link to={"/users"} className="nav-link">
                Users
              </Link>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
              <Link to={"/invoiceList"} className="nav-link">
                Invoices
              </Link>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
              <Link to={"/voucher"} className="nav-link">
                Voucher
              </Link>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="#" onClick={()=> this.logOut()} >
                Log Out
              </a>
            </li>
          </ul>
              </nav>

        <aside class="main-sidebar sidebar-dark-primary elevation-4">
          <a href="index3.html" class="brand-link">
            <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" />
            <span class="brand-text font-weight-light">Aquasign</span>
          </a>

          <div class="sidebar">
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
              <div class="image">
                <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image" />
              </div>
              <div class="info">
                <a href="#" class="d-block">
                  Admin
                </a>
              </div>
            </div>

            <nav class="mt-2">
              <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

              <li class="nav-item has-treeview">
                <NavLink to={"/accounts"} activeClassName="active" className="nav-link">
                  <i class="nav-icon fas fa-file-invoice" />
                  <p>Master</p>
                </NavLink>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <NavLink to={"/ledger"} activeClassName="active" className="nav-link">
                      <i class="far fa-circle nav-icon" />
                      <p>Ledger</p>
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink to={"/product"} activeClassName="active" className="nav-link">
                      <i class="far fa-circle nav-icon" />
                      <p>Product</p>
                    </NavLink>
                  </li>
                </ul>
            </li>
              <li class="nav-item">
                  <NavLink to={"/roughInvoiceList"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-file-invoice" />
                    <p>Rough Invoices</p>
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to={"/invoiceList"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-file-invoice" />
                    <p>Invoices</p>
                  </NavLink>
                </li>
                <li class="nav-item has-treeview menu-open">
                  <NavLink to={"/purchase"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-file-invoice" />
                    <p>Purchase</p>
                  </NavLink>
                  <ul class="nav nav-treeview">
                    <li class="nav-item">
                      <NavLink to={"/purchaseReport"} activeClassName="active" className="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Purchase Report</p>
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li class="nav-item has-treeview menu-open">
                  <NavLink to={"/salesReport"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-file-invoice"></i>
                    <p>
                     Sales Report
                    </p>
                  </NavLink>
                </li>
                <li class="nav-item has-treeview menu-open">
                  <NavLink to={"/accounts"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-file-invoice" />
                    <p>Accounts</p>
                  </NavLink>
                  <ul class="nav nav-treeview">

                    <li class="nav-item">
                      <NavLink to={"/voucher"} activeClassName="active" className="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Voucher</p>
                      </NavLink>
                    </li>
                    <li class="nav-item">
                      <NavLink to={"/ledgerReport"} activeClassName="active" className="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Ledger Report</p>
                      </NavLink>
                    </li>
                    <li class="nav-item">
                      <NavLink to={"/cashBook"} activeClassName="active" className="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Cash Book</p>
                      </NavLink>
                    </li>
                     <li class="nav-item">
                      <NavLink to={"/sundryCreditor"} activeClassName="active" className="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Sundry Creditor</p>
                      </NavLink>
                    </li>
                    
                    <li class="nav-item">
                      <NavLink to={"/sundryDebtor"} activeClassName="active" className="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Sundry Debtor</p>
                      </NavLink>
                    </li>
                    <li class="nav-item">
                      <NavLink to={"/profit"} activeClassName="active" className="nav-link">
                        <i class="far fa-circle nav-icon" />
                        <p>Profil & Loss</p>
                      </NavLink>
                    </li>
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
           
                <li class="nav-item">
                  <NavLink to={"/stockReport"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-file-invoice" />
                    <p>Stock Report</p>
                  </NavLink>
                </li>
                
                <li class="nav-item">
                  <NavLink to={"/notification"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-file-invoice" />
                    <p>Notification</p>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>;
    }
}

export default App;