import React, { Component } from 'react';
import Nav from '../NavBar';
import DatePicker from 'react-date-picker';
import {  URL_SALES_REPORT,URL_PRODUCT_DT,URL_SUPPLIER_DT } from './constants';
import { Link } from 'react-router-dom';
import PurchaseVoucher from './purchase/voucher';

class SalesReport extends Component {
  constructor(props) {
    super(props);                                                                                                                                  
    this.state = {
      data:null,
      dateFrom: new Date(),
      dateTo: new Date(),
      id_product:0,
      id_ledger:0,
      arrVouchers: [],
      arrSuppliers:[],
      arrProducts:[],
    }
    
    this.onDateFromChange = this.onDateFromChange.bind(this);
    this.onDateToChange = this.onDateToChange.bind(this);
    this.onProductChange=this.onProductChange.bind(this);
    this.onLedgerChange=this.onLedgerChange.bind(this);
  }
  
  componentDidMount() {
   this.loadSupplierList();
    this.loadProductList();
    
  }
  loadSupplierList(){
    fetch(URL_SUPPLIER_DT)
    .then(response => response.json())                                                                                                                                                                                                                 
    .then(data => {
      this.setState({ arrSuppliers: data})
    });
  }

  loadProductList(){
    fetch(URL_PRODUCT_DT)
    .then(response => response.json())
    .then(data => {
      this.setState({  arrProducts : data })
    });
  }

  loadVoucherList = (_dateFrom,_dateTo,id_ledger,id_product) => {
    fetch(URL_SALES_REPORT + `/'${_dateFrom}'` + `/'${_dateTo}'` + `/${id_ledger}` + `/${id_product}` )
    .then(response => response.json())
    .then(data => {
      if(data.length>0)
      this.setState({
        arrVouchers: data ,
        })
        });
     }
  

formatDate = date => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}


  onDateFromChange = dateFrom => {
    this.setState({ dateFrom })
   
  }
  onDateToChange = dateTo => {
    this.setState({ dateTo });
   
  }
  onLedgerChange(event){
    this.setState({id_ledger:event.target.value})
  }
  onProductChange(event){
    this.setState({id_product:event.target.value})
  }

  render() {
    const tableRows = this.state.arrVouchers.map((arrVoucher, index) =>
      <TableRow
      arrVoucher={arrVoucher}
      />);

    const grandTotal = this.state.arrVouchers.reduce((a, b) => +a + +(b.total), 0);
    const qtyTotal = this.state.arrVouchers.reduce((a, b) => +a + +(b.quantity), 0);

    return (
      
      <div class="wrapper" >
      <Nav />
      <div class="content-wrapper">

        <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Sales Report Report</h1>
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
                              <div class="col-sm-6">
                                  <div class="form-group">
                                    <label>From</label>
                                    <DatePicker
                                      className={"form-control"}
                                      onChange={this.onDateFromChange}
                                      value={this.state.dateFrom}
                                      format={"dd/MM/yyyy"}
                                    />
                                  </div>
                              </div>
                              
                              <div class="col-sm-6">
                                  <div class="form-group">
                                    <label>To</label>
                                    <DatePicker
                                      className={"form-control"}
                                      onChange={this.onDateToChange}
                                      value={this.state.dateTo}
                                      format={"dd/MM/yyyy"}
                                    />
                                  </div>
                              </div>
                            </div>
                          </th>
                          </tr>
                          <tr>
                          <th colspan={6} >
                            <div class="row" >                              
                              <div class="col-sm-6">
                                  <div class="form-group">
                                    <label>Ledger</label>
                                   
                                    <select class="form-control" onChange={this.onLedgerChange} value={this.state.id_ledger}>
                                    <option value="0">--Select--</option>
                                      {this.state.arrSuppliers.map((ledger) =>
                                        <option value={ledger.id_account_head}>{ledger.name}</option>)}
                                    </select>
                                  </div>
                              </div>                             
                                                     
                            <div class="col-sm-6">
                            <div class="form-group">
                                    <label>Product</label>
                                   
                                    <select class="form-control" onChange={this.onProductChange} value={this.state.id_product}>
                                    <option value="0">--Select--</option>
                                      {this.state.arrProducts.map((product) =>
                                        <option value={product.id_product}>{product.name}</option>)}
                                    </select>
                                  </div>
                              </div>                           
                                <button type="button"  class="btn btn-block btn-success btn-flat" onClick={() =>this.loadVoucherList(this.formatDate(this.state.dateFrom),this.formatDate(this.state.dateTo),this.state.id_ledger,this.state.id_product)}>
                                   Search
                                </button>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: '15%' }}>V. No</th>
                          <th style={{ width: '20%' }}>Date</th>
                          <th style={{ width: '40%' }}>Supplier</th>
                          <th style={{ width: '20%' }}>Quantity</th>
                          <th style={{ width: '20%' }}>Price</th>
                          <th style={{ width: '20%' }}>Total</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows}
                      </tbody>
                      <tfoot>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                        <th align="right" >{qtyTotal}</th>
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
        <td>{arrVoucher.voucher_no}</td>
        <td>{arrVoucher.date}</td>        
        <td>{arrVoucher.name}</td>
        <td>{arrVoucher.quantity}</td>
        <td>{arrVoucher.unit_price}</td>
        <td>{arrVoucher.total}</td>
        <td>
          <div class="btn-group">
              <Link to={'purchaseVoucher/'+ arrVoucher.voucher_no} render={(props) => <PurchaseVoucher {...props}  voucher_no={this.props.match.params.voucher_no}/>} ><i class="fas fa-edit"></i></Link>
         </div>
        </td>
      </tr>
    );
  }
}

export default SalesReport;