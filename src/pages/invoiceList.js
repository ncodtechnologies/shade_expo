import React, { Component } from 'react';
import Nav from '../NavBar';
import DatePicker from 'react-date-picker';
import { Link } from 'react-router-dom';
import Invoice from './invoice';

const API = '/users/invoiceList';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: 'Table',
      data:null,
      date: new Date(),
      invItems1: [
        { No: 1, Date: '05-01-2020', Id_consignee: 1, Consignee: 'Consignee 1', status: '1'},
        { No: 2, Date: '05-03-2020', Id_consignee: 2, Consignee: 'Consignee 2', status: '1'},
        { No: 3, Date: '15-01-2020', Id_consignee: 3, Consignee: 'Consignee 3', status: '2'},
        { No: 4, Date: '20-01-2020', Id_consignee: 4, Consignee: 'Consignee 4', status: '3'},
      ],
      invItems:[]
    }
  }

  
  componentDidMount() {
    fetch(API)
    .then(response => response.json())
    .then(data => this.setState({ invItems: data }));
    //console.log(data)
  }


  
  render() {
    const tableRows = this.state.invItems.map((invItem, index) =>
      <TableRow      
        delRow={this.delRow}
        invItem={invItem} rowIndex={index}
       
      />
    );

    return (
      <div class="wrapper" >
        <Nav />
        <div class="content-wrapper">

          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-12">
                  <h1>Invoice</h1>
                </div>
              </div>
            </div>
          </section>
          <div class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card card-default">
                  <div class="card-header border-0">
                    <h3 class="card-title">Invoice</h3>
                    <div class="card-tools">
                      <a href="./invoice" class="btn btn-tool btn-sm">
                      <button type="submit" class="btn btn-block btn-success btn-flat">Create</button>
                      </a>
                    </div>
                  </div>
                   
                    <div class="card-body p-0">
                      <table class="table">
                        <thead>
                          <tr>
                            <th style={{ width: '10%' }}>No</th>
                            <th style={{ width: '25%' }}>Date</th>
                            <th style={{ width: '25%' }}>Consignee</th>
                            <th style={{ width: '20%' }}>Status</th>
                            <th style={{ width: '15%' }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableRows}
                        </tbody>
                        <tfoot>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td align="right" ></td>
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


  editRow = () => {
    this.props.editRow(this.props.rowIndex);
  }

  getStatus = (status) => {
    if(status == 1)
      return <span class="badge bg-primary">created</span>
    else if(status == 2)
      return <span class="badge bg-warning">certified</span>  
    else if(status == 3)
      return <span class="badge bg-success">shipped</span>
  }
  
  getDelBtn = (status) => {
    if(status == 1)
      return <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
  }

  render() {
    let invItem = this.props.invItem;
    return (
      <tr>
        <td>{invItem.invoice_no}</td>
        <td>{invItem.date}</td>
        <td>{invItem.consignee}</td>
        <td>{this.getStatus(invItem.status)}</td>
        <td>
          <div class="btn-group">            
          <Link to={'./invoice/'+ invItem.id_invoice} render={(props) => <Invoice {...props}/>} ><i class="fas fa-edit"></i> </Link> 
              {this.getDelBtn(invItem.status)}
         </div>
        </td>
      </tr>
    );
  }
}

export default App;