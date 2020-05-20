import React, { Component } from 'react';
import Nav from '../../NavBar';
import {  URL_PURCHASE_VOUCHER_DT,URL_PURCHASE_VHR_ITEMS,URL_PURCHASE_VHR_EXP } from '../constants';

class LedgerReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,      
      date: '',
      voucher_no:'',
      op:'',
      ledger:'',
      arrVouchers: [],
      arrVoucherItems:[],
      arrVoucherExps:[],
      arrVoucherTotals:[],
    }
  }

  
  componentDidMount() {
    const voucher_no=this.props.match.params.voucher_no
    this.loadVoucherList(voucher_no);    
    this.loadVoucherItemsList(voucher_no);
    this.loadVoucherExpList(voucher_no);
  }

  loadVoucherList = (voucher_no) => {
    fetch(URL_PURCHASE_VOUCHER_DT  + `/'${voucher_no}'`)
    .then(response => response.json())
    .then(data => {
      if(data.length>0)
      this.setState({
        date             : data[0].date , 
        voucher_no       : data[0].voucher_no , 
        ledger           : data[0].account_head ,
        op               : data[0]._old_balance ,
        })
        }
      );
  }  
  
  loadVoucherItemsList = (voucher_no) => {
    fetch(URL_PURCHASE_VHR_ITEMS  + `/'${voucher_no}'`)
    .then(response => response.json())
    .then(data => {
      if(data.length>0)
      this.setState({
        arrVoucherItems: data
        })
        }
      );
  } 
  
  loadVoucherExpList = (voucher_no) => {
    fetch(URL_PURCHASE_VHR_EXP  + `/'${voucher_no}'`)
    .then(response => response.json())
    .then(data => {
      if(data.length>0)
      this.setState({
        arrVoucherExps: data
        })
        }
      );
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

  delRow = (rowIndex) => {
    let _arrVouchers = this.state.arrVouchers;
    _arrVouchers.splice(rowIndex, 1);
    this.setState({
      arrVouchers: _arrVouchers
    })
  }

  render() {
       const tableRowsItems = this.state.arrVoucherItems.map((arrVoucher, index) =>
      <TableRowItems
      arrVoucher={arrVoucher}
      />);

      const tableRowsExp = this.state.arrVoucherExps.map((arrVoucherExp, index) =>
      <TableRowExp
      arrVoucherExp={arrVoucherExp}
      />);

      const tableRowsTotal = this.state.arrVoucherTotals.map((arrVoucher, index) =>
      <TableRowTotal
      arrVoucher={arrVoucher}
      />);

    const grandTotal = this.state.arrVoucherItems.reduce((a, b) => +a + +(b.total), 0);
    const grandTotalExp = this.state.arrVoucherExps.reduce((a, b) => +a + +(b.amount), 0);
    const net=grandTotal+grandTotalExp;
    const op=this.state.op;
    const total= net + op;
    return (
      
      <div class="wrapper" >
      <Nav />
      <div class="content-wrapper">

        <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Purchase Voucher</h1>
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
                              <div class="col-sm-8">
                                  <div class="form-group">
                                    <label>Voucher No :</label>
                                    <label>{this.state.voucher_no}</label>                                    
                                  </div>
                              </div>
                              <div class="col-sm-4">
                                  <div class="form-group">
                                    <label>Date :</label>
                                    <label>{this.state.date}</label>
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
                                    <label>Party : </label>
                                    <label>{this.state.ledger}</label>
                                 </div>
                              </div>
                             
                            </div>
                            <div class="row">                          
                           </div>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: '20%' }}>No</th>
                          <th style={{ width: '20%' }}>Item</th>
                          <th style={{ width: '25%' }}>Kg</th>
                          <th style={{ width: '25%' }}>Price</th>
                          <th style={{ width: '25%' }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRowsItems}
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
            <div class="row">
              <div class="col-md-6">
                <div class="card card-info">
                  <div class="card-body p-0">
                    <table class="table">
                      <thead>
                        <tr>
                          <th style={{ width: '65%' }}>Expense</th>
                          <th style={{ width: '35%' }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRowsExp}
                      </tbody>
                      <tfoot>
                        <th>Total</th>
                        <th align="right" >{grandTotalExp}</th>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card card-info">
                  <div class="card-body p-0">
                    <table class="table">                     
                      <tbody>
                        <tr>
                          <td>Total </td>
                          <td style={{fontWeight:'bold'}}>{grandTotal}</td>
                        </tr>
                        <tr>
                          <td>Expense </td>
                          <td style={{fontWeight:'bold'}}>{grandTotalExp}</td>
                        </tr>
                        <tr>
                          <td>Net </td>
                          <td style={{fontWeight:'bold'}}>{net}</td>
                        </tr>
                        <tr>
                          <td>OB</td>
                          <td style={{fontWeight:'bold'}}>{this.state.op}</td>
                        </tr>
                        <tr>
                          <td>total</td>
                          <td style={{fontWeight:'bold'}}>{total}</td>
                        </tr>
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


class TableRowItems extends React.Component {

  delRow = () => {
    this.props.delRow(this.props.rowIndex);
  }

  render() {
    let arrVoucher = this.props.arrVoucher;  
   
    return (
      <tr>
        <td>1</td>
        <td>{arrVoucher.name}</td>
        <td>{arrVoucher.quantity}</td>
        <td>{arrVoucher.unit_price}</td>
        <td>{arrVoucher.total}</td>
      </tr>
    );
  }
}



class TableRowExp extends React.Component {
  render() {
    let arrVoucherExp = this.props.arrVoucherExp;  
   
    return (
      <tr>
        <td>{arrVoucherExp.expense}</td>
        <td>{arrVoucherExp.amount}</td>
      </tr>
    );
  }
}

class TableRowTotal extends React.Component {
  
  render() 
  {
    const grandTotal = this.state.arrVoucherItems.reduce((a, b) => +a + +(b.total), 0);
    const grandTotalExp = this.state.arrVoucherExps.reduce((a, b) => +a + +(b.amount), 0);
  
    return (
      <tr>
        <td>Total  :{grandTotal}</td>
        <td>Expense :{grandTotalExp}</td>
        <td></td>
      </tr>
    );
  }
}


export default LedgerReport;