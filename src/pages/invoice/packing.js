import React, { Component } from 'react';
import DatePicker from 'react-date-picker';

const API = '/users/account_head';

class Packing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packItems: [
        { sl_no: 1, product: 'PRODUCT 1', weight: 100 },
        { sl_no: 2, product: 'PRODUCT 2', weight: 200 },
        { sl_no: 3, product: 'PRODUCT 3', weight: 300 },
        { sl_no: 4, product: 'PRODUCT 4', weight: 400 },
      ],
      LabourItems:[
        {name:'Labour 1', amount: 1000},
        {name:'Labour 2', amount: 2000},
        {name:'Labour 3', amount: 3000},
      ],
      ExpenseItems:[
        {expense:'Expense 1', amount: 1000},
        {expense:'Expense 1', amount: 1000},
        {expense:'Expense 1', amount: 1000},
        {expense:'Expense 1', amount: 1000},
      ],
    }   
  }

  render() {
    const tableRowsPacking = this.state.packItems.map((packItem, index) =>
      <TableRowPacking
      packItem={packItem} rowIndex={index}
      />
    );
    const tableRowsLabour = this.state.LabourItems.map((LabourItem, index) =>
      <TableRowLabour
      LabourItem={LabourItem} rowIndex={index}
      />
    );
    const tableRowsExpense = this.state.ExpenseItems.map((ExpenseItem, index) =>
      <TableRowsExpense
      ExpenseItem={ExpenseItem} rowIndex={index}
      />
    );   

    const grandTotalPacking = this.state.packItems.reduce((a, b) => +a + +(b.weight), 0);
    const grandTotalLabour = this.state.LabourItems.reduce((a, b) => +a + +(b.amount), 0);
    const grandTotalExpense = this.state.ExpenseItems.reduce((a, b) => +a + +(b.amount), 0);

    return (
      <div >

        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12">
              <div class="card-header">
                <h3 class="card-title">Packing List</h3>                
              </div>
                <div class="card card-info">
                  <div class="card-body p-0">
                    <table class="table">
                      <thead>                       
                        <tr>
                          <th style={{ width: '25%' }}>Sl No</th>
                          <th style={{ width: '50%' }}>Items</th>
                          <th style={{ width: '25%' }}>Weight</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRowsPacking}
                      </tbody>
                      <tfoot>
                        <th></th>
                        <th>Net Weight</th>
                        <th align="right">{grandTotalPacking}</th>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
              <div class="card-header">
                <h3 class="card-title">Labour</h3>                
              </div>
                <div class="card card-info">
                  <div class="card-body p-0">
                    <table class="table">
                      <thead>                       
                        <tr>
                          <th style={{ width: '25%' }}>Name</th>
                          <th style={{ width: '50%' }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRowsLabour}
                      </tbody>
                      <tfoot>
                        <th>Total</th>
                        <th align="right" >{grandTotalLabour}</th>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
              <div class="card-header">
                <h3 class="card-title">Other Expenses</h3>                
              </div>
                <div class="card card-info">
                  <div class="card-body p-0">
                    <table class="table">
                      <thead>                       
                        <tr>
                          <th style={{ width: '25%' }}>Expense</th>
                          <th style={{ width: '50%' }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRowsExpense}
                      </tbody>
                      <tfoot>
                        <th>Total</th>
                        <th align="right" >{grandTotalExpense}</th>
                      </tfoot>
                    </table>
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

class TableRowPacking extends React.Component {
  render() {
    let packItem = this.props.packItem;

    return (
      <tr>
        <td>{packItem.sl_no}</td>
        <td>{packItem.product}</td>
        <td>{packItem.weight}</td>
      </tr>
    );
  }
}

class TableRowLabour extends React.Component {
  render() {
    let LabourItem = this.props.LabourItem;

    return (
      <tr>
        <td>{LabourItem.name}</td>
        <td>{LabourItem.amount}</td>
      </tr>
    );
  }
}

class TableRowsExpense extends React.Component {
  render() {
    let ExpenseItem = this.props.ExpenseItem;

    return (
      <tr>
        <td>{ExpenseItem.expense}</td>
        <td>{ExpenseItem.amount}</td>
      </tr>
    );
  }
}

export default Packing;