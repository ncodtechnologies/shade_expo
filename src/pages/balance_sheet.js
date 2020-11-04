import React, { Component } from 'react';
import { URL_PL_PURCHASE, URL_PL_SALES, URL_PL_EXPENSES, URL_PL_INCOME, URL_PL_PAYROLL, 
  URL_PL_INV_PACK_EXP, URL_PL_INV_FREIGHT_EXP, URL_PL_INV_OTHER_EXP } from './constants';
import { URL_PL_PURCHASE_DT, URL_PL_SALES_DT, URL_PL_EXPENSES_DT, URL_PL_INCOME_DT, URL_PL_PAYROLL_DT, 
  URL_PL_INV_PACK_EXP_DT, URL_PL_INV_FREIGHT_EXP_DT, URL_PL_INV_OTHER_EXP_DT } from './constants';
import { URL_BS_CREDITORS, URL_BS_DEBTORS, URL_BS_CASH_BAL, URL_BS_STOCK } from './constants';
import DatePicker from 'react-date-picker';
import Nav from '../NavBar';
import {
  JsonToCsv,
  useJsonToCsv
} from 'react-json-csv';

class BalanceSheet extends Component {
  constructor(props) {
    super(props);
    this.state={
        fromDate: '2020-01-01',
        toDate: this.formatDate(new Date),
        purchase_total:'',
        sales_total:'',
        income: [],
        expense: [],
        payroll: '',
        inv_packing_exp : '',
        inv_freight_exp: 0,
        inv_other_exp: '',
        dateFrom: new Date(),
        dateTo: new Date(),

        debtors : [],
        rates: [],
        creditors : [],
        cash_acc : 0,
        icici_acc : 0,
        fish_stock : 0,
        pack_stock : 0,
    }
    this.onDateFromChange = this.onDateFromChange.bind(this);
    this.onDateToChange = this.onDateToChange.bind(this);
    this.changeRate = this.changeRate.bind(this);
  }

  componentDidMount(){
    this.loadReport();
  }
   
  loadReport() {
    this.loadSalesTotal();
    this.loadIncome();

    this.loadPurchaseTotal();
    this.loadExp();
    this.loadPayroll();
    this.loadInvPackingExp();
  //  this.loadInvFreightExp();
    this.loadInvOtherExp();


    this.loadSundryDebtors();
    this.loadSundryCreditors();
    this.loadCashAccBal();
    this.loadICICIAccBal();
    this.loadFishStock();
    this.loadPackStock();
  }

  handleChangePurchase (e){
    this.setState({ purchase:e.target.value})
  }

  loadPurchaseTotal(){
    fetch(URL_PL_PURCHASE +  `/'${this.state.fromDate}'/'${this.state.toDate}'`)
    .then(response => response.json())
    .then(data => this.setState({ purchase_total: data[0].totalPurchase }));
  }

  loadSalesTotal(){
    fetch(URL_PL_SALES +  `/'${this.state.fromDate}'/'${this.state.toDate}'`)
    .then(response => response.json())
    .then(data => this.setState({ sales_total: data[0].totalSales }));
  }

  loadExp(){
    fetch(URL_PL_EXPENSES +  `/'${this.state.fromDate}'/'${this.state.toDate}'`)
    .then(response => response.json())
    .then(data => this.setState({ expense: data }));
  }

  loadIncome(){
    fetch(URL_PL_INCOME +  `/'${this.state.fromDate}'/'${this.state.toDate}'`)
    .then(response => response.json())
    .then(data => this.setState({ income: data }));
  }

  loadPayroll(){
    fetch(URL_PL_PAYROLL +  `/'${this.state.fromDate}'/'${this.state.toDate}'`)
    .then(response => response.json())
    .then(data => this.setState({ payroll: data[0].amount }));
  }

  loadInvPackingExp(){
    fetch(URL_PL_INV_PACK_EXP+  `/'${this.state.fromDate}'/'${this.state.toDate}'`)
    .then(response => response.json())
    .then(data => this.setState({ inv_packing_exp: data[0].amount }));
  }

  loadInvFreightExp(){
    fetch(URL_PL_INV_FREIGHT_EXP +  `/'${this.state.fromDate}'/'${this.state.toDate}'`)
    .then(response => response.json())
    .then(data => this.setState({ inv_freight_exp: data[0].amount }));
  }

  loadInvOtherExp(){
    fetch(URL_PL_INV_OTHER_EXP +  `/'${this.state.fromDate}'/'${this.state.toDate}'`)
    .then(response => response.json())
    .then(data => this.setState({ inv_other_exp: data[0].amount }));
  }

  onDateFromChange = dateFrom => {
    this.setState({ fromDate: this.formatDate(dateFrom), dateFrom })
  }

  onDateToChange = dateTo => {
    this.setState({ toDate: this.formatDate(dateTo), dateTo });
  }

  //Balance Sheet


  changeRate(account_head, rate) {
    var _rates = this.state.rates;
    var res =  this.state.debtors.filter(function(item) {
      return item.account_head == account_head;
    });
    const index = this.state.debtors.indexOf(res[0]);
    _rates[index] = rate
    this.setState({ rates : _rates });
  }
 
  loadSundryDebtors = () => {
    const date = this.state.toDate;
    fetch(URL_BS_DEBTORS  + `/${0}/'${date}'` )
    .then(response => response.json())
    .then(data => {
      this.setState({
            debtors: data ,
          })
        }
      );
  } 
 
  loadSundryCreditors = () => {
    const date = this.state.toDate;
    fetch(URL_BS_CREDITORS  + `/${0}/'${date}'` )
    .then(response => response.json())
    .then(data => {
      this.setState({
            creditors: data ,
          })
        }
      );
  } 

  loadCashAccBal(){
    fetch(URL_BS_CASH_BAL +  `/'${this.state.fromDate}'/'${10004}'`)
    .then(response => response.json())
    .then(data => this.setState({ cash_acc: data[0].balance }));
  }

  loadICICIAccBal(){
    fetch(URL_BS_CASH_BAL +  `/'${this.state.fromDate}'/'${10003}'`)
    .then(response => response.json())
    .then(data => this.setState({ icici_acc: data[0].balance }));
  }

  loadFishStock(){
    fetch(URL_BS_STOCK +  `/'FISH'`)
    .then(response => response.json())
    .then(data => this.setState({ fish_stock: data[0].stock }));
  }

  loadPackStock(){
    fetch(URL_BS_STOCK +  `/'PACKING MATERIAL'`)
    .then(response => response.json())
    .then(data => this.setState({ pack_stock: data[0].stock }));
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

exportCSV ({filename, fields, url}){
  const { saveAsCsv } = useJsonToCsv();
  const style = {
    padding: "5px"
  };

  fetch(url +  `/'${this.state.fromDate}'/'${this.state.toDate}'`)
  .then(response => response.json())
  .then(data => data && saveAsCsv({ data, fields, filename }));
  
}


  render() {
    const totalInc = this.state.sales_total + this.state.income.reduce((a, b) => +a + +(b.amount), 0);

    const totalExp = this.state.purchase_total
                   + this.state.expense.reduce((a, b) => +a + +(b.amount), 0)
                   + this.state.payroll
                   + this.state.inv_packing_exp
                   + this.state.inv_freight_exp
                   + this.state.inv_other_exp;

    const tableRowsDebt = this.state.debtors.map((arrVoucher, index) =>
      <TableRowDebt
      arrVoucher={arrVoucher}
      rate={this.state.rates[index]}
      changeRate={this.changeRate}
      />);
    const rates = this.state.rates;
    const totalDebt = this.state.debtors.reduce((a, b, index) => 
                      {
                        const rate = rates[index] || 1;
                        return +a + +(b.closing_balance*rate)
                      }, 0)
                    + (totalInc<totalExp ? totalInc-totalExp : 0)

    const tableRowsCredit = this.state.creditors.map((arrVoucher, index) =>
      <TableRowCredit
      arrVoucher={arrVoucher}
      changeRate={this.changeRate}
      />);
    const totalCredit = this.state.creditors.reduce((a, b, index) => 
                        {
                          const rate = 1;
                          return +a + +(b.closing_balance*rate)
                        }, 0) 
                      + this.state.cash_acc
                      + this.state.icici_acc
                      + this.state.fish_stock
                      + this.state.pack_stock
                      + (totalInc>totalExp ? totalInc-totalExp : 0);

    return (
      <div class="wrapper" >
      <Nav />
      <div class="content-wrapper">

        <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Balance Sheet</h1>
                </div>
              </div>
            </div>
          </section>

        <div class="content">

      </div>

            <div class="row">
              <div class="col-md-6">
                <div class="card card-info">
                  <div class="card-body p-0">
                    <table class="table">
                      <thead>
                        <tr>
                          <th style={{ width: '50%' }}>Liabilities</th>
                          <th style={{ width: '20%' }}></th>
                          <th style={{ width: '30%' }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRowsDebt}
                        {Math.round(totalInc-totalExp) < 0 &&
                        <tr>
                          <td>Loss</td>
                          <td></td>
                          <td align="right" >{-1*Math.round(totalInc-totalExp)}</td>
                        </tr>
                        }
                      </tbody>
                      <tfoot>
                        <tr>
                        <th>Total</th>                  
                        <th></th>                      
                        <th style={{textAlign: "right"}} >{(-1)*Math.round(totalDebt)}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                </div>
              </div>

              <div class="col-md-6">
                <div class="card card-info">
                  <div class="card-body p-0">
                    <table class="table">
                      <thead>
                        <tr>
                          <th style={{ width: '60%' }}>Asset</th>
                          <th style={{ width: '40%' }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRowsCredit}
                        <tr>
                          <td>CASH ACCOUNT</td>
                          <td align="right" >{Math.round(this.state.cash_acc)}</td>
                        </tr>
                        <tr>
                          <td>ICICI BANK</td>
                          <td align="right" >{Math.round(this.state.icici_acc)}</td>
                        </tr>
                        <tr>
                          <td>STOCK (FISH)</td>
                          <td align="right" >{Math.round(this.state.fish_stock)}</td>
                        </tr>
                        <tr>
                          <td>STOCK (PACKING MATERIAL)</td>
                          <td align="right" >{Math.round(this.state.pack_stock)}</td>
                        </tr>
                        {Math.round(totalInc-totalExp) > 0 &&
                        <tr>
                          <td>Profit</td>
                          <td align="right" >{Math.round(totalInc-totalExp)}</td>
                        </tr>
                        }
                      </tbody>
                      <tfoot>
                        <tr>
                        <th>Total</th>                  
                        <th style={{textAlign: "right"}} >{Math.round(totalCredit)}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                </div>
              </div>

        </div>
    </div>

    </div>
    );
  }
}


class TableRowDebt extends React.Component {

  handleChangeRate(account_head, e) {
    this.props.changeRate(account_head, e.target.value);
  }

  render() {
    let arrVoucher = this.props.arrVoucher;
    const rate = this.props.rate || 1;

    return (
      <tr>
        <td>{arrVoucher.account_head}</td>
        <td><input type="text" style={{textAlign: "right", width:100}} onChange={e => this.handleChangeRate(arrVoucher.account_head, e)} value={this.props.rate} /></td>
        <td align="right" >{(-1)*Math.round(arrVoucher.closing_balance*rate)}</td>
      </tr>
    );
  }
}

class TableRowCredit extends React.Component {

  render() {
    let arrVoucher = this.props.arrVoucher;
    const rate = 1;

    return (
      <tr>
        <td>{arrVoucher.account_head}</td>
        <td align="right" >{Math.round(arrVoucher.closing_balance*rate)}</td>
      </tr>
    );
  }
}

export default BalanceSheet;
