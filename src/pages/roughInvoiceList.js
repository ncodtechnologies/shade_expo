import React, { Component } from 'react';
import Nav from '../NavBar';
import { Link } from 'react-router-dom';
import RoughInvoice from './roughInvCreate'
import { URL_ROUGH_INV_LIST_DT } from './constants';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: 'Table',
      data:null,
      date: new Date(),
      invItems:[]
    }
  }

  
  componentDidMount() {
    fetch(URL_ROUGH_INV_LIST_DT)
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
                  <h1>Rough Invoice</h1>
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
                    <h3 class="card-title">Rough Invoice</h3>
                    <div class="card-tools">
                    <Link to={'./roughInvoiceCreate/0'} >
                      <button type="submit" class="btn btn-block btn-success btn-flat">Create</button>
                    </Link>
                    </div>
                  </div>
                   
                    <div class="card-body p-0">
                      <table class="table">
                        <thead>
                          <tr>
                            <th style={{ width: '20%' }}>Date</th>
                            <th >Consigner</th>
                            <th >Consignee</th>
                            <th ></th>
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
        <td>{invItem.date}</td>
        <td>{invItem.consigner}</td>
        <td>{invItem.consignee}</td>
        <td>
          <div class="btn-group">            
          <Link to={'./roughInvoiceCreate/'+ invItem.id_rough_invoice} render={(props) => <RoughInvoice {...props}  id_rough_invoice={this.props.match.params.id_rough_invoice}/>} ><i class="fas fa-edit"></i> </Link> 
              {this.getDelBtn(invItem.status)}
         </div>
        </td>
      </tr>
    );
  }
}

export default App;