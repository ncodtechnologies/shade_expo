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
              <Link to={"/roughInvoiceCreate"} className="nav-link">Create Rough Invoice</Link>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
              <Link to={"/invoiceList"} className="nav-link">Invoices</Link>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
              <Link to={"/accounts"} className="nav-link">Accounts</Link>
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
                  <NavLink to={"/roughInvoiceCreate"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-receipt"></i>
                    <p>
                     Create Rough Invoice
                    </p>
                  </NavLink>
                </li>
                <li class="nav-item has-treeview menu-open">
                  <NavLink to={"/invoiceList"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-file-invoice"></i>
                    <p>
                     Invoices
                    </p>
                  </NavLink>
                </li>
                <li class="nav-item has-treeview menu-open">
                  <NavLink to={"/accounts"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-file-invoice"></i>
                    <p>
                     Accounts
                    </p>
                  </NavLink>
                </li>
                <li class="nav-item has-treeview menu-open">
                  <NavLink to={"/payroll"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-file-invoice"></i>
                    <p>
                     Payroll
                    </p>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    );
    }
}

export default App;