import React, { Component } from 'react';
import Nav from '../../NavBar';
import DatePicker from 'react-date-picker';
import { URL_LEDGER_GROUP_DT ,URL_SUNDRY_CREDITOR} from '../constants';

class SundryCreditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      id_ledger_group:'0',
      ledger: '',
      arrGroup: [],
      arrVouchers: [],
    }
    
    this.onLedgerChange = this.onLedgerChange.bind(this);
  }
  
  componentDidMount() {
    const id_ledger_group=this.state.id_ledger_group;
    this.loadSundryCreditors(id_ledger_group);
    this.loadGroup();
  }
  
  loadGroup(){
    fetch(URL_LEDGER_GROUP_DT)
    .then(response => response.json())
    .then(data => this.setState({ arrGroup: [{id_ledger_group:0, name:"--SELECT--"},...data ] }));
  }
 
  loadSundryCreditors = (id_ledger_group) => {
    fetch(URL_SUNDRY_CREDITOR  + `/${id_ledger_group}` )
    .then(response => response.json())
    .then(data => {
      this.setState({
            arrVouchers: data ,
          })
        }
      );
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
      />);

    const total = this.state.arrVouchers.reduce((a, b) => +a + +(b.closing_balance), 0);
  
    return (
      
      <div class="wrapper" >
      <Nav />
      <div class="content-wrapper">

        <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Sundry Creditor</h1>
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
                                <button type="button"  class="btn btn-block btn-success btn-flat" onClick={() =>this.loadSundryCreditors(this.state.id_ledger_group)}>
                                   Search
                                </button>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: '35%' }}>Account Head</th>
                          <th style={{ width: '30%' }}>Group</th>
                          <th style={{ width: '30%' }}>Closing Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows}
                      </tbody>
                      <tfoot>
                        <th>Total</th>
                        <th></th>                      
                        <th align="right" >{total} CR</th>
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

  render() {
    let arrVoucher = this.props.arrVoucher;
    
   

    return (
      <tr>
        <td>{arrVoucher.account_head}</td>
        <td>{arrVoucher.ledger_group}</td>
        <td align="right" >{arrVoucher.closing_balance}</td>
      </tr>
    );
  }
}

export default SundryCreditor;