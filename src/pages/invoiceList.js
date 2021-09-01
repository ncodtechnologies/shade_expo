import React, { Component } from 'react';
import Nav from '../NavBar';
import { Link } from 'react-router-dom';
import Invoice from './invoice';
import { URL_INVOICE_LIST_DT, URL_INVOICE_SEARCH_LIST } from './constants';
import Pagination from "react-js-pagination";
import DatePicker from 'react-date-picker';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: 'Table',
      data: null,
      invoice_no: '',
      date: new Date(),
      dateFrom: new Date(),
      dateTo: new Date(),
      invItems: [],
      activePage: 1,
      totalCount: '',
      show: false,
    }

    this.onDateFromChange = this.onDateFromChange.bind(this);
    this.onDateToChange = this.onDateToChange.bind(this);
    this.onInvoiceNoChange = this.onInvoiceNoChange.bind(this);
  }

  componentDidMount() {
    const activePage = this.state.activePage;
    this.loadInvoiceList(activePage)
  }

  loadInvoiceList(activePage) {
    fetch(URL_INVOICE_LIST_DT + `/${activePage}`)
      .then(response => response.json())
      .then(data => this.setState({
        invItems: data.items,
        totalCount: data.totalCount,
      }));
    console.log(this.state.totalCount)
  }

  loadInvoiceSearchList(from, to, activePage, invoice_no) {
    const no=invoice_no !='' ? invoice_no.replace("/","_") : null ;

    fetch(`${URL_INVOICE_SEARCH_LIST}/${from}/${to}/${activePage}/${no}`)
      .then(response => response.json())
      .then(data => this.setState({
        invItems: data.items,
        totalCount: data.totalCount,
      }));
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`); 
    this.setState({ activePage: pageNumber }
      , () => {                 
        const from        = this.state.dateFrom;
        const to          = this.state.dateTo;
        const invoice_no  = this.state.invoice_no;  
        const show        = this.state.show;
        const activePage  = this.state.activePage;
        if(show == false)
          this.loadInvoiceList(activePage)
        if(show == true)
          this.loadInvoiceSearchList(this.formatDate(from), this.formatDate(to), activePage, invoice_no)        
        
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
  
  onFilter() {
    this.setState({ 
      invoice_no:"",
      show: true } ,
      () => {      
      const from        = this.state.dateFrom;
      const to          = this.state.dateTo;
      const invoice_no  = this.state.invoice_no;
      const activePage  = this.state.activePage;
      this.loadInvoiceSearchList(this.formatDate(from), this.formatDate(to), activePage, invoice_no)        
   }) 
  }
  
  removeFilter() {
    this.setState({ 
      invoice_no:"",
      show: false } ,
      () => {      
      const activePage  = this.state.activePage;
      this.loadInvoiceList(activePage)    
   }) 
  }
 

  onInvoiceNoChange(event) {
    this.setState({ invoice_no: event.target.value.toUpperCase() }
      )
  }
  onDateFromChange = dateFrom => {
    this.setState({ dateFrom })

  }
  onDateToChange = dateTo => {
    this.setState({ dateTo });

  }
  render() {
    const tableRows = this.state.invItems.map((invItem, index) =>
      <TableRow
        delRow={this.delRow}
        invItem={invItem} rowIndex={index}

      />
    );
    const { show } = this.state;
    return (
      <div class="wrapper" >
        <Nav />
        <div class="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Invoice</h1>
                </div>
                <div class="col-sm-6">
                  <Pagination
                    innerClass="pagination pagination-sm float-right"
                    activePage={this.state.activePage}
                    itemsCountPerPage={20}
                    totalItemsCount={this.state.totalCount}
                    pageRangeDisplayed={5}
                    itemClass="page-item"
                    itemClassPrev="page-item"
                    itemClassNext="page-item"
                    itemClassFirst="page-item"
                    itemClassLast="page-item"
                    linkClass="page-link"
                    linkClassFirst="page-link"
                    linkClassPrev="page-link"
                    linkClassNext="page-link"
                    linkClassLast="page-link"
                    onChange={this.handlePageChange.bind(this)}
                  />
                </div>
              </div>
            </div>
          </section>          
          <div class="content">
            <div class="container-fluid">
              <div class="row">
              {show &&
                <div class="col-lg-12">
                  <div class="card card-info">
                   <div class="card-body">
                     <button type="button"  class="btn btn float-right" onClick={() => this.removeFilter()} data-card-widget="remove"><i class="fas fa-times"></i>
                     </button>       
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

                      <div class="row" >
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>Invoice No</label>
                            <input type="text" value={this.state.invoice_no} onChange={this.onInvoiceNoChange} class="form-control" />
                          </div>
                        </div>
                      </div>

                      <div class="row" >
                        <div class="col-sm-12">
                          <div class="form-group">
                            <button type="button" class="btn btn-block btn-success btn-flat" onClick={() => this.loadInvoiceSearchList(this.formatDate(this.state.dateFrom), this.formatDate(this.state.dateTo), this.state.activePage, this.state.invoice_no)}>
                              Search
                           </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>}
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="card card-default">
                    <div class="card-header border-0">
                      <h3 class="card-title">Invoice</h3>
                      <div class="card-tools">
                        <Link to={'./invoice/0'} >
                          <button type="submit" class="btn btn-block btn-success btn-flat">Create</button>
                        </Link>
                      </div>                     
                      <div class="card-tools">
                        <button type="button" onClick={() =>this.onFilter()} class="btn btn-block btn-success btn-flat ">
                          Filter
                        </button>
                      </div>
                    </div>
                    <div class="card-body p-0">
                      <table class="table">
                        <thead>
                          <tr>
                            <th style={{ width: '20%' }}>Inv. No</th>
                            <th style={{ width: '15%' }}>Date</th>
                            <th style={{ width: '30%' }}>Consignee</th>
                            <th style={{ width: '15%' }}>Status</th>
                            <th style={{ width: '5%' }}></th>
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
    if (status == "Waiting Approval")
      return <span class="badge bg-primary">Waiting Approval</span>
    else if (status == "Packing")
      return <span class="badge bg-warning">Packing</span>
    else if (status == "Shipped")
      return <span class="badge bg-success">Shipped</span>
    else if (status == "Cancelled")
      return <span class="badge bg-danger">Cancelled</span>
  }

  getDelBtn = (status) => {
    if (status == 1)
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
            <Link to={'./invoice/' + invItem.id_invoice} render={(props) => <Invoice {...props} />} ><i class="fas fa-edit"></i> </Link>
            {this.getDelBtn(invItem.status)}
          </div>
        </td>
      </tr>
    );
  }
}

export default App;