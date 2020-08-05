import React, { Component } from 'react';
import Nav from '../../NavBar';
import DatePicker from 'react-date-picker';
import { URL_LEDGER_GROUP_DT ,URL_SUNDRY_DEBTOR} from '../constants';

class SundryDebtor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      id_ledger_group:'0',
      ledger: '',
      arrGroup: [],
      arrVouchers: [],
      rates: [],
      date: new Date()
    }
    
    this.onLedgerChange = this.onLedgerChange.bind(this);
    this.changeRate = this.changeRate.bind(this);
  }
  
  onDateChange = date => {
    this.setState({ date })
  }

  componentDidMount() {
    const id_ledger_group=this.state.id_ledger_group;
    this.loadSundryCreditors(id_ledger_group);
    this.loadGroup();
  }

  changeRate(account_head, rate) {
    var _rates = this.state.rates;
    var res =  this.state.arrVouchers.filter(function(item) {
      return item.account_head == account_head;
    });
    const index = this.state.arrVouchers.indexOf(res[0]);
    _rates[index] = rate
    this.setState({ rates : _rates });
  }
  
  loadGroup(){
    fetch(URL_LEDGER_GROUP_DT)
    .then(response => response.json())
    .then(data => this.setState({ arrGroup: [{id_ledger_group:0, name:"--SELECT--"},...data ] }));
  }
 
  loadSundryCreditors = (id_ledger_group) => {
    const date = this.formatDate(this.state.date);
    fetch(URL_SUNDRY_DEBTOR  + `/${id_ledger_group}/'${date}'` )
    .then(response => response.json())
    .then(data => {
      this.setState({
            arrVouchers: data ,
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

  onLedgerChange(event) {
    this.setState({ id_ledger_group: event.target.value })
  }
  
  render() {
    const tableRows = this.state.arrVouchers.map((arrVoucher, index) =>
      <TableRow
      arrVoucher={arrVoucher}
      rate={this.state.rates[index]}
      changeRate={this.changeRate}
      />);
    const rates = this.state.rates;
    const total = this.state.arrVouchers.reduce((a, b, index) => 
    {
      const rate = rates[index] || 1;
      return +a + +(b.closing_balance*rate)
    }, 0);
  
    return (
      
      <div class="wrapper" >
      <Nav />
      <div class="content-wrapper">

        <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Sundry Debtor</h1>
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
                                    <label>Group</label>
                                    <select class="form-control" onChange={(e)=>this.onLedgerChange(e)} value={this.state.id_ledger_group}>
                                      {this.state.arrGroup.map((group) =>
                                        <option value={group.id_ledger_group}>{group.name}</option>)}
                                    </select>
                                  </div>
                              </div>   
                                <div class="col-sm-6">
                                  <div class="form-group">
                                    <label>Date</label>
                                    <DatePicker
                                      className={"form-control"}
                                      onChange={this.onDateChange}
                                      value={this.state.date}
                                      format={"dd/MM/yyyy"}
                                    />
                                  </div>
                                </div>                         
                                <button type="button"  class="btn btn-block btn-success btn-flat" onClick={() =>this.loadSundryCreditors(this.state.id_ledger_group)}>
                                   Search
                                </button>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: '35%' }}>Name</th>
                          <th style={{ width: '25%' }}>Group</th>
                          <th style={{ width: '15%' }}>Conv Rate</th>
                          <th style={{ width: '20%' }}>Closing Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows}
                      </tbody>
                      <tfoot>
                        <tr>
                        <th>Total</th>
                        <th></th>                      
                        <th></th>                      
                        <th style={{textAlign: "right"}} >{(-1)*Math.round(total)} DR</th>
                        </tr>
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


  delRow = () => {
    this.props.delRow(this.props.rowIndex);
  }

  handleChangeRate(account_head, e) {
    this.props.changeRate(account_head, e.target.value);
  }


  render() {
    let arrVoucher = this.props.arrVoucher;
    const rate = this.props.rate || 1;

    return (
      <tr>
        <td>{arrVoucher.account_head}</td>
        <td>{arrVoucher.ledger_group}</td>
        <td><input type="text" style={{textAlign: "right", width:100}} onChange={e => this.handleChangeRate(arrVoucher.account_head, e)} value={this.props.rate} /></td>
        <td align="right" >{(-1)*Math.round(arrVoucher.closing_balance*rate)}</td>
      </tr>
    );
  }
}

export default SundryDebtor;