import React, { Component } from 'react';
import Nav from '../../NavBar';
import DatePicker from 'react-date-picker';
import {  URL_PURCHASE_REPORT_DT } from '../constants';
import { Link } from 'react-router-dom';
import PurchaseVoucher from './voucher';

class PurchaseReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      dateFrom: new Date(),
      dateTo: new Date(),
      arrVouchers: [],
    }
    
    this.onDateFromChange = this.onDateFromChange.bind(this);
    this.onDateToChange = this.onDateToChange.bind(this);
  }
  
  componentDidMount() {
    const _dateFrom=this.formatDate(this.state.dateFrom);
    const _dateTo=this.formatDate(this.state.dateTo);
    this.loadVoucherList(_dateFrom,_dateTo);
    
  }
  loadVoucherList = (_dateFrom,_dateTo) => {
    fetch(URL_PURCHASE_REPORT_DT + `/'${_dateFrom}'` + `/'${_dateTo}'` )
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
  
  render() {
    const tableRows = this.state.arrVouchers.map((arrVoucher, index) =>
      <TableRow
      arrVoucher={arrVoucher}
      />);

    const grandTotal = this.state.arrVouchers.reduce((a, b) => +a + +(b.amount), 0);

    return (
      
      <div class="wrapper" >
      <Nav />
      <div class="content-wrapper">

        <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Purchase Report</h1>
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
                              <div class="col-sm-4">
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
                              <div class="col-sm-3">
                                  <div class="form-group">
                                  <button type="button"  class="btn btn-block btn-success btn-flat" onClick={this.loadVoucherList(this.formatDate(this.state.dateFrom),this.formatDate(this.state.dateTo))}>
                                   Search
                                </button>
                                  </div>
                              </div>
                              <div class="col-sm-4">
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
                          <th style={{ width: '15%' }}>V. No</th>
                          <th style={{ width: '20%' }}>Date</th>
                          <th style={{ width: '40%' }}>Party</th>
                          <th style={{ width: '20%' }}>Kg</th>
                          <th style={{ width: '20%' }}>Amount</th>
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
        <td>{arrVoucher.account_head}</td>
        <td>{arrVoucher.quantity}</td>
        <td>{arrVoucher.amount}</td>
        <td>
          <div class="btn-group">
              <Link to={'purchaseVoucher/'+ arrVoucher.voucher_no} render={(props) => <PurchaseVoucher {...props}  voucher_no={this.props.match.params.voucher_no}/>} ><i class="fas fa-edit"></i></Link>
         </div>
        </td>
      </tr>
    );
  }
}

export default PurchaseReport;