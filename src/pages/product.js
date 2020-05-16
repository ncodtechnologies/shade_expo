import React, { Component } from 'react';
import Nav from '../NavBar';

import { URL_PRODUCT_DT } from './constants';

class LedgerGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      ledger: '',
      arrProducts: [],
    }
    
  }
  
  componentDidMount() {
    this.loadLedgerGroup();
  }
  loadLedgerGroup(){
    fetch(URL_PRODUCT_DT)
    .then(response => response.json())
    .then(data => this.setState({ arrProducts: data }));
    //console.log(data)
  }

  delRow = (rowIndex) => {
    let _arrProducts = this.state.arrProducts;
    _arrProducts.splice(rowIndex, 1);
    this.setState({
      arrProducts: _arrProducts
    })
  }

  render() {
    const tableRows = this.state.arrProducts.map((arrProduct, index) =>
      <TableRow
      arrProduct={arrProduct}
       
      />);
   
    return (
      
      <div class="wrapper" >
      <Nav />
      <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-12">
                  <h1>Products</h1>
                </div>
              </div>
            </div>
          </section>
        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12">
                <div class="card card-info">
                  <div class="card-body p-0">
                    <table class="table">
                      <thead> 
                        <tr>
                          <th style={{ width: '50%' }}>Name</th>
                          <th style={{ width: '25%' }}>Purchase Price</th>
                          <th style={{ width: '25%' }}>Selling Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
    );
  }
}


class TableRow extends React.Component {


  delRow = () => {
    this.props.delRow(this.props.rowIndex);
  }

  render() {
    let arrProduct = this.props.arrProduct;
    return (
      <tr>
        <td>{arrProduct.name}</td>
        <td>{arrProduct.purchase_price}</td>
        <td>{arrProduct.selling_price}</td>
      </tr>
    );
  }
}

export default LedgerGroup;