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
              <Link to={"/"} className="nav-link">First</Link>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
              <Link to={"/second"} className="nav-link">Second</Link>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
              <Link to={"/table"} className="nav-link">Table</Link>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
              <Link to={"/table"} className="nav-link">Form</Link>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
              <Link to={"/roughInvoiceCreate"} className="nav-link">Create Rough Invoice</Link>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
              <Link to={"/invoice"} className="nav-link">Invoice</Link>
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
                  <NavLink to={"/first"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-tachometer-alt"></i>
                    <p>
                      First
                    </p>
                  </NavLink>
                </li>
                <li class="nav-item has-treeview menu-open">
                  <NavLink to={"/second"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-tachometer-alt"></i>
                    <p>
                      Second
                    </p>
                  </NavLink>
                </li>
                <li class="nav-item has-treeview menu-open">
                  <NavLink to={"/table"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-tachometer-alt"></i>
                    <p>
                      Table
                    </p>
                  </NavLink>
                </li> <li class="nav-item has-treeview menu-open">
                  <NavLink to={"/form"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-tachometer-alt"></i>
                    <p>
                      Form
                    </p>
                  </NavLink>
                </li>
                <li class="nav-item has-treeview menu-open">
                  <NavLink to={"/roughInvoiceCreate"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-tachometer-alt"></i>
                    <p>
                     Create Rough Invoice
                    </p>
                  </NavLink>
                </li>
                <li class="nav-item has-treeview menu-open">
                  <NavLink to={"/invoice"} activeClassName="active" className="nav-link">
                    <i class="nav-icon fas fa-tachometer-alt"></i>
                    <p>
                     Invoice
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