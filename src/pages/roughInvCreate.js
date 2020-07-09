import React, { Component } from 'react';
import Nav from '../NavBar';
import Invoice from './invoice';
import { Link, Redirect } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import {URL_PRODUCT_DT,
        URL_ROUGH_INVOICE_SAVE,
        URL_AIRWAY_ITEMS_DT,
        URL_ROUGH_INVOICE_DT, 
        URL_LEDGER_EDIT_DT, 
        URL_LEDGER_DT, 
        LEDGER_GROUPS} from './constants';

import SimpleReactValidator from 'simple-react-validator';
import { PdfRoughInvoice } from './pdf/roughInvoice'
import { PdfAirway } from './pdf/airway'
import { PDFViewer } from '@react-pdf/renderer';


class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      data:null,
      title: 'Table',
      id_rough_invoice: 0,
      date: new Date(),
      port_load:'',
      consigners:[],
      consignees:[],
      consigner:'',
      consignee:'',
      consigner_address:'',
      consignee_address:'',
      invoice_no:'',
      products: [],
      invItems: [],
      airwayItems: [],
      showPdf: false,
      printDoc: "",
      redirectToInvoice : false,
      places: [
              { Id_place: 0, Place: '--Select--' },
              { Id_place: 1, Place: 'INDIA' },
              { Id_place: 2, Place: 'KSA' },
              { Id_place: 3, Place: 'US' },
              ],
      redirectToInvoice : false,              
      airports:[
        { Id_Port: 0, Port: '--Select--' },
        { Id_Port: 1, Port: 'KOCHI' },
        { Id_Port: 2, Port: 'CALICUT' },
        { Id_Port: 3, Port: 'TRIVANDRUM' },
        { Id_Port: 4, Port: 'KANNUR' },
        { Id_Port: 5, Port: 'MUMBAI' },
        { Id_Port: 6, Port: 'CHENNAI' },
        { Id_Port: 7, Port: 'KOLKATA' },
        { Id_Port: 8, Port: 'COIMBATORE' },
      ]
    }
    this.onDateChange           = this.onDateChange.bind(this);
    this.handleChangeConsignee  = this.handleChangeConsignee.bind(this);
    this.handleChangeInvoiceNo  = this.handleChangeInvoiceNo.bind(this);
    this.handleChangeConsigner  = this.handleChangeConsigner.bind(this);
    this.handleChangePortLoad   = this.handleChangePortLoad.bind(this);
    this.validator = new SimpleReactValidator();
  }
  componentDidMount() {
    const id_rough_invoice=this.props.match.params.id_rough_invoice;
    
    this.loadProducts();
    this.loadConsigners();
    this.loadConsignees();
    if(id_rough_invoice!=0)
    {
      this.loadInvoiceDt(id_rough_invoice);
      this.loadAirwayItemsDt(id_rough_invoice);
      this.setState({id_rough_invoice});
    }
  }

  loadInvoiceDt = (id_rough_invoice) => {

    fetch(URL_ROUGH_INVOICE_DT + `/${id_rough_invoice}`)
    .then(response => response.json())
    .then(data => 
      {
        if(data.length>0)
          this.setState(
              { 
                date              : data[0].date , 
                port_load         : data[0].port_load ,
                invoice_no        : data[0].invoice_no ,
                consigner         : data[0].consigner ,
                consignee         : data[0].consignee ,   
                consigner_address : data[0].consigner_address ,
                consignee_address : data[0].consignee_address ,                
                invItems          : data[0].items || []
              })
      }
    );
  }

  loadAirwayItemsDt = (id_rough_invoice) => {

    fetch(URL_AIRWAY_ITEMS_DT + `/${id_rough_invoice}`)
    .then(response => response.json())
    .then(data => 
      {
        if(data.length>0)
          this.setState(
              {               
                airwayItems          : data[0].airwayItems || []
              })
      }
    );
  }
  
  loadProducts = () => {
    fetch(URL_PRODUCT_DT)
    .then(response => response.json())
    .then(data => this.setState({ products: [{ id_product:0, name: "SELECT" },...data]  }));
  }
  
  loadConsigners() {
    var id_ledger_group =  LEDGER_GROUPS.CONSIGNER;
    fetch(`${URL_LEDGER_DT}/${id_ledger_group}`)
      .then(response => response.json())
      .then(data => {
        if(data.length>0)
          this.setState({ consigners : [{id_account_head:0, account_head:"--SELECT--"},...data ] })
      });
  }

  loadConsignees() {
    var id_ledger_group =  LEDGER_GROUPS.CONSIGNEE;
    fetch(`${URL_LEDGER_DT}/${id_ledger_group}`)
      .then(response => response.json())
      .then(data => {
        if(data.length>0)
          this.setState({ consignees: [{id_account_head:0, account_head:"--SELECT--"},...data ] })
      });
  }
  
  loadLedgerAddress(id_ledger, type) {
    fetch(`${URL_LEDGER_EDIT_DT}/${id_ledger}`)
      .then(response => response.json())
      .then(data => {
        if(data.length>0)
          if(type == "CONSIGNER")
            this.setState({ consigner_address: data[0].address })
          else
            this.setState({ consignee_address: data[0].address })
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
  
  saveInvoice = (to) => {
    if (this.validator.allValid()) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
                  date              : this.formatDate(this.state.date),
                  invoice_no        : this.state.invoice_no ,
                  consigner         : this.state.consigner ,
                  consignee         : this.state.consignee ,
                  consigner_address : this.state.consigner_address ,
                  consignee_address : this.state.consignee_address ,
                  port_load         : this.state.port_load ,
                  items             : this.state.invItems,
                  airwayItems       : this.state.airwayItems,
                  id_rough_invoice  : this.state.id_rough_invoice,
                })
    };
    
    fetch(URL_ROUGH_INVOICE_SAVE, requestOptions)
      .then(response => {
        response.json();
        if(to == "BACK")
          this.setState({ redirect : true });
        else
          this.setState({ redirectToInvoice : true });
      });
  }
  
  else
  {
   this.validator.showMessages();
   this.forceUpdate();
  }
}

  onDateChange = date => this.setState({ date })

  handleChangePortLoad (e){
    this.setState({ port_load:e.target.value})
  }

  handleChangeInvoiceNo (e){
    this.setState({ invoice_no:e.target.value})
  }

  handleChangeConsignee (e){
    this.setState({ consignee:e.target.value})
    this.loadLedgerAddress(e.target.value, "CONSIGNEE");
  }

  handleChangeConsigner (e){
    this.setState({ consigner:e.target.value})
    this.loadLedgerAddress(e.target.value, "CONSIGNER");
  }

  handleChangeConsigneeAddress (e){
    this.setState({ consignee_address:e.target.value});
  }

  handleChangeConsignerAddress (e){
    this.setState({ consigner_address:e.target.value});
  }

  handleChangeKg = (e, rowIndex) =>  {
      let _invItems = this.state.invItems;
      let _row = _invItems[rowIndex];
      _row.kg = e.target.value;
      _invItems[rowIndex] = _row;
      this.setState({
        invItems: _invItems
      })
  }
  handleChangeAirwayKg = (e, rowIndex) =>  {
    let _airwayItems = this.state.airwayItems;
    let _row = _airwayItems[rowIndex];
    _row.kg = e.target.value;
    _airwayItems[rowIndex] = _row;
    this.setState({
      airwayItems: _airwayItems
    })
}

  handleChangeBox = (e, rowIndex) =>  {
    let _invItems = this.state.invItems;
    let _row = _invItems[rowIndex];
    _row.box = e.target.value;
    _invItems[rowIndex] = _row;
    this.setState({
      invItems: _invItems
    })
  }
  handleChangeAirwayBox = (e, rowIndex) =>  {
    let _airwayItems = this.state.airwayItems;
    let _row = _airwayItems[rowIndex];
    _row.box = e.target.value;
    _airwayItems[rowIndex] = _row;
    this.setState({
      airwayItems: _airwayItems
    })
  }

  handleChangeProduct = (e, rowIndex) =>  {
    let _invItems = this.state.invItems;
    let _row = _invItems[rowIndex];
    _row.id_product = e.target.value;
    _invItems[rowIndex] = _row;
    this.setState({
      invItems: _invItems
    })
  }
  handleChangeAirwayProduct = (e, rowIndex) =>  {
    let _airwayItems = this.state.airwayItems;
    let _row = _airwayItems[rowIndex];
    _row.id_product = e.target.value;
    _airwayItems[rowIndex] = _row;
    this.setState({
      airwayItems: _airwayItems
    })
  }
  
  delRow = (rowIndex) =>  {
    let _invItems = this.state.invItems;
    _invItems.splice(rowIndex, 1);
    this.setState({
      invItems: _invItems
    })
  }
  delRowAirway = (rowIndex) =>  {
    let _airwayItems = this.state.airwayItems;
    _airwayItems.splice(rowIndex, 1);
    this.setState({
      airwayItems: _airwayItems
    })
  }

  addRow = (e) =>  {
    let _invItems = this.state.invItems;
    let row = {
      id_product : e.target.value,
      kg : "",
      box : ""
    }
    _invItems.push(row);
    this.setState({
      invItems: _invItems
    })
  }
  addRowAirway = (e) =>  {
    let _airwayItems = this.state.airwayItems;
    let row = {
      id_product : e.target.value,
      kg : "",
      box : ""
    }
    _airwayItems.push(row);
    this.setState({
      airwayItems: _airwayItems
    })
  }

  render() {
    const { products } = this.state;
    const tableRows = this.state.invItems.map((invItem,index) =>
      <TableRow 
        handleChangeKg={this.handleChangeKg}
        handleChangeBox={this.handleChangeBox} 
        handleChangeProduct={this.handleChangeProduct} 
        delRow={this.delRow} 
        invItem={invItem} rowIndex={index} 
        products={products}
       
        />
  );
  const tableRowsAirway = this.state.airwayItems.map((airwayItem,index) =>
      <TableRowsAirway 
        handleChangeAirwayKg={this.handleChangeAirwayKg}
        handleChangeAirwayBox={this.handleChangeAirwayBox} 
        handleChangeAirwayProduct={this.handleChangeAirwayProduct} 
        delRowAirway={this.delRowAirway} 
        airwayItem={airwayItem} rowIndex={index} 
        products={products}
       
        />
  );
    const airwayGrandTotal = this.state.airwayItems.reduce((a, b) => +a + +(b.kg*b.box), 0);
    const airwayBoxTotal = this.state.airwayItems.reduce((a, b) => +a + +(b.box), 0);
    const airwayKgTotal = this.state.airwayItems.reduce((a, b) => +a + +(b.kg), 0);
    const grandTotal = this.state.invItems.reduce((a, b) => +a + +(b.kg*b.box), 0);
    const boxTotal = this.state.invItems.reduce((a, b) => +a + +(b.box), 0);
    const kgTotal = this.state.invItems.reduce((a, b) => +a + +(b.kg), 0);
  
    const { redirect, redirectToInvoice } = this.state;

    if (redirect) {
      this.setState({redirect: false})
      return <Redirect to='/roughInvoiceList'/>;
    }

    if (redirectToInvoice) {
      this.setState({redirectToInvoice: false})
      return <Redirect to={`/invoice/0/${this.props.match.params.id_rough_invoice}`}/>;
    }

    return (
      <div class="wrapper" >
        <Nav />
        <div class="content-wrapper">

          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Rough Invoice</h1>
                </div>
              </div>
            </div>
          </section>

          <div class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-12">

                  <div class="card card-info">
                    <div class="card-header">
                      <h3 class="card-title">New Rough Invoice</h3>
                    </div>
                    <div class="card-body">
                      <form >
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label>Date:</label>

                              <div class="input-group">
                                <div class="input-group-prepend">
                                  <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>
                                </div>
                                <DatePicker
                                  className={"form-control"}
                                  onChange={this.onDateChange}
                                  value={this.state.date}
                                  format={"dd/MM/yyyy"}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label>Invoice No</label> 
                              <input type="text" value={this.state.invoice_no} onChange={this.handleChangeInvoiceNo} class="form-control" />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label>Port of loading</label>
                              <select class="form-control" onChange={e => this.handleChangePortLoad(e)} value={this.state.port_load}>
                              {this.state.airports.map(column => (
                                <option value={column.Id_port}>
                                  {column.Port}
                                </option>
                              ))}
                            </select>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label>Consigner</label>
                              <select class="form-control" onChange={e => this.handleChangeConsigner(e)} value={this.state.consigner}>
                                {this.state.consigners.map(column => (
                                  <option value={column.id_account_head}>
                                    {column.account_head}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div class="form-group">
                              <textarea class="form-control" onChange={e => this.handleChangeConsignerAddress(e)} value={this.state.consigner_address} rows="3" placeholder="Consigner"></textarea>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label>Consignee</label>
                              <select class="form-control" onChange={e => this.handleChangeConsignee(e)} value={this.state.consignee}>
                                {this.state.consignees.map(column => (
                                  <option value={column.id_account_head}>
                                    {column.account_head}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div class="form-group">
                              <textarea class="form-control" onChange={e => this.handleChangeConsigneeAddress(e)} value={this.state.consignee_address} rows="3" placeholder="Consignee" ></textarea>
                            </div>
                          </div>
                        </div>

                      </form>
                    </div>

                    <div class="card-header">
                      <h3 class="card-title">Invoice</h3>
                    </div>
                    <div class="card-body p-0">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th style={{ width: '10%' }}>Kg</th>
                            <th style={{ width: '10%' }}>Box</th>
                            <th style={{ width: '20%', textAlign:"right" }}>Total</th>
                            <th style={{ width: '10%' }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          { tableRows }
                          <EmptyRow products={this.state.products} addRow={this.addRow} />
                        </tbody>
                        <tfoot>
                          <td></td>
                          <td align="right" ></td>
                          <td align="right">{ boxTotal }</td>
                          <td  align="right" >{ grandTotal } Kg</td>
                          <td></td>
                        </tfoot>
                      </table>
                    </div>
                   
                  <div class="card-header">
                    <h3 class="card-title">Airport Invoice</h3>
                  </div>

                  <div class="card-body p-0">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th style={{ width: '10%' }}>Kg</th>
                          <th style={{ width: '10%' }}>Box</th>
                          <th align="right" style={{ width: '20%', textAlign:"right" }}>Total</th>
                          <th style={{ width: '10%' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        { tableRowsAirway }
                        <EmptyRow products={this.state.products} addRow={this.addRowAirway} />
                      </tbody>
                      <tfoot>
                        <td></td>
                        <td align="right" ></td>
                        <td align="right" >{ airwayBoxTotal }</td>
                        <td align="right" >{ airwayGrandTotal } Kg</td>
                        <td></td>
                      </tfoot>
                    </table>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="card card-info">
                        <div class="card-footer">
                          <button onClick={()=>this.saveInvoice("BACK")} type="submit" class="btn btn-primary">
                            Save
                          </button>
                          <button onClick={()=>this.saveInvoice("INVOICE")} type="submit" class="btn btn-primary">
                            Create Invoice
                          </button>

                          <button onClick={()=>this.setState({showPdf: false},()=>this.setState({ showPdf:true, printDoc: 'RoughInvoice' }))  } type="button" class="btn btn-primary float-right">
                            Print Rough Invoice
                          </button>
                          <button onClick={()=>this.setState({showPdf: false},()=>this.setState({ showPdf:true, printDoc: 'Airway' }))  } type="button" class="btn btn-primary float-right">
                            Print Airway Bill
                          </button>
                        </div>
                      </div>
                    </div>
                   </div>
                  </div>


                  {this.state.showPdf && 
                    <div class="row">
                      <div class="col-lg-12">
                      <div class="card card-info">
                              <div class="card-header">
                                <h3 class="card-title">Pdf Viewer</h3>
                                <div class="card-tools">
                                  <button type="button" onClick={()=>this.setState({showPdf: false})} class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times"></i>
                                  </button>
                                </div>
                          </div>
                        <div class="card-body">
                          <div class="row">
                            <PDFViewer style={{width:"100%", height: 500}} >
                              { this.state.printDoc == 'RoughInvoice' ?
                              <PdfRoughInvoice {...this.state} />
                              :
                              <PdfAirway {...this.state} />
                              }
                            </PDFViewer>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                    }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class TableRow extends Component {

	handleChangeKg = (e) => {
    this.props.handleChangeKg(e, this.props.rowIndex);
  }
  
	handleChangeBox = (e) => {
    this.props.handleChangeBox(e, this.props.rowIndex);
  }
  
	handleChangeProduct = (e) => {
    this.props.handleChangeProduct(e, this.props.rowIndex);
  }

	delRow = () => {
    this.props.delRow(this.props.rowIndex);
  }

	render() {
    let invItem = this.props.invItem;
    let total = invItem.kg * invItem.box;
    let products=this.props.products;
		return (
      <tr>
        <td>
          <select class="form-control"  onChange={(e) => this.handleChangeProduct(e)} value={invItem.id_product} >
            {products.map((column) => <option value={column.id_product}>{column.name}</option>)}
          </select>
                    
        </td>
        <td><input type="text" class="form-control" value={invItem.kg} onChange={(e) => this.handleChangeKg(e)} /></td>
        <td align="right" ><input type="text" class="form-control"  value={invItem.box}  onChange={(e) => this.handleChangeBox(e)}  /></td>
        <td  align="right"  >{Math.round(total*10)/10}</td>
        <td>
            <button type="button"  onClick={this.delRow}  class="btn btn-success"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    );
	}
}

class TableRowsAirway extends Component {

	handleChangeAirwayKg = (e) => {
    this.props.handleChangeAirwayKg(e, this.props.rowIndex);
  }
  
	handleChangeAirwayBox = (e) => {
    this.props.handleChangeAirwayBox(e, this.props.rowIndex);
  }
  
	handleChangeAirwayProduct = (e) => {
    this.props.handleChangeAirwayProduct(e, this.props.rowIndex);
  }

	delRow = () => {
    this.props.delRow(this.props.rowIndex);
  }

	render() {
    let airwayItem = this.props.airwayItem;
    let total = airwayItem.kg * airwayItem.box;
    let products=this.props.products;
		return (
      <tr>
        <td>
          <select class="form-control"  onChange={(e) => this.handleChangeAirwayProduct(e)} value={airwayItem.id_product} >
            {products.map((column) => <option value={column.id_product}>{column.name}</option>)}
          </select>
                    
        </td>
        <td><input type="text" class="form-control" value={airwayItem.kg} onChange={(e) => this.handleChangeAirwayKg(e)} /></td>
        <td align="right" ><input type="text" class="form-control"  value={airwayItem.box}  onChange={(e) => this.handleChangeAirwayBox(e)}  /></td>
        <td  align="right"  >{Math.round(total*10)/10}</td>
        <td>
            <button type="button"  onClick={this.delRowAirway}  class="btn btn-success"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    );
	}
}

class EmptyRow extends Component {

	addRow = (e) => {
    this.props.addRow(e);
  }
  
	render() {
		return (
      <tr>
        <td>
          <select class="form-control"  onChange={(e) => this.addRow(e)} value={0} >
            {this.props.products.map((column) => <option value={column.id_product}>{column.name}</option>)}
          </select>
        </td>
        <td><input type="text" class="form-control" /></td>
        <td><input type="text" class="form-control" /></td>
        <td ></td>
        <td> </td>
      </tr>
    );
	}
}

export default App;
