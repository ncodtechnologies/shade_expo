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
 /*
  saveLedger = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 

                ledger : this.state.ledger ,
              })
  };
  fetch(URL_LEDGER_GROUP_SAVE, requestOptions)
      .then(response => response.json());
       this.loadLedgerGroup();
}
*/
  delRow = (rowIndex) => {
    let _arrProducts = this.state.arrProducts;
    _arrProducts.splice(rowIndex, 1);
    this.setState({
      arrProducts: _arrProducts
    })
  }
/*
  onLedgerChange(event) {
    this.setState({ ledger: event.target.value })
  }

 */
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
                          <th style={{ width: '100%' }}>Name</th>
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
        <td>
          <div class="btn-group">
            <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    );
  }
}

export default LedgerGroup;