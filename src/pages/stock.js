import React, { Component } from 'react';
import Nav from '../NavBar';
import SimpleReactValidator from 'simple-react-validator';

import { URL_STOCK_REPORT } from './constants';
import { URL_PRODUCT_DT } from './constants';

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      id_product:'',
      type:'',
      arrProducts: [],
      arrVouchers: [],
      arrType:[
              {type:'FISH'},
              {type:'PACKING MATERIAL'},
              {type:'OTHER'}
            ]
    }    
    this.onProductChange = this.onProductChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.validator = new SimpleReactValidator();
  }

  
  componentDidMount() {
    const type_ = this.state.arrType[0].type;
    this.loadProduct();
    this.loadStockList(type_);
  }
  loadProduct(){
    fetch(URL_PRODUCT_DT)
    .then(response => response.json())
    .then(data => 
      {
        this.setState({ arrProducts: data });
      });
    //console.log(data)
  }

  loadStockList = (type_) => {
    fetch(URL_STOCK_REPORT + `/'${type_}'` )
    .then(response => response.json())
    .then(data => {
      if(data.length>0)
      this.setState({
        arrVouchers: data ,
        })
        }
      );
    console.log(this.state.arrVouchers)
  }


  onProductChange(event) {
    this.setState({ id_product: event.target.value }
      , () => {
      })
  }

  onTypeChange(event) {
    this.setState({ type: event.target.value }
      , () => {
   });
  }

 
  render() {
    const tableRows = this.state.arrVouchers.map((arrVoucher, index) =>
      <TableRow
      arrVoucher={arrVoucher}
      />);

    const grandTotal = this.state.arrVouchers.reduce((a, b) => +a + +(b.rate*b.stock), 0);

    return (
      
      <div class="wrapper" >
      <Nav />
      <div class="content-wrapper">

        <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Stock Report</h1>
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
                          <th colspan={6} >
                            <div class="row" >                              
                              <div class="col-md-6">
                              <div class="form-group">
                                    <label>Type</label>
                                    <select class="form-control" onChange={this.onTypeChange} value={this.state.type}>
                                      {this.state.arrType.map((types) =>
                                        <option value={types.type}>{types.type}</option>)}
                                    </select>
                                  </div>
                              </div>
                              <button type="button"  class="btn btn-block btn-success btn-flat" onClick={() => this.loadStockList(this.state.id_product,this.state.type)}>
                                   Search
                                </button>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: '50%' }}>Product</th>
                          <th style={{ width: '25%' }}>Stock</th>
                          <th style={{ width: '25%' }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows}
                      </tbody>
                      <tfoot>
                        <th>Total</th>
                        <th></th>
                        <th align="right" >{grandTotal}</th>
                      </tfoot>
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

  render() {
    let arrVoucher = this.props.arrVoucher;

    return (
      <tr>
        <td>{arrVoucher.product} {arrVoucher.unit}</td>
        <td>{arrVoucher.stock}</td>
        <td>{arrVoucher.rate*arrVoucher.stock}</td>
      </tr>
    );
  }
}

export default Stock;