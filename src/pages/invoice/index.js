import React, { Component } from 'react';
import Nav from '../../NavBar';
import DatePicker from 'react-date-picker';
import Expenses from './expense'
import NetReport from './netreport'
import Documents from './documents'
import Packing from './packing'
import SimpleReactValidator from 'simple-react-validator';
import { URL_INVOICE_SAVE,URL_INVOICE_DT ,URL_PRODUCT_DT} from '../constants';
import { Redirect } from 'react-router-dom'
const API = '/invoice';

class Invoice extends Component {

  constructor(props) {
    super(props);

    this.state = {
      arrInv:[],
      id:null,
      title: 'Table',
      data:null,
      date: new Date(),
      products: [],
      invoice:[],
      invoice_no:'',
      order_no:'',
      buyer_date:new Date(),
      exporter:'',
      consignee:'',
      other:'',
      buyer:'',
      country_origin:'',
      country_final:'',
      pre_carriage:'',
      receipt_place:'',
      vessel_no:'',
      port_load:'',
      port_discharge:'',
      final_destination:'',
      marks:'',
      container_no:'',
      awb_no:'', 
      terms:'',
      arrProducts:[],
      invItems: [],
      places: [
        { Id_place: 0, Place: '--Select--' },
        { Id_place: 1, Place: 'INDIA' },
        { Id_place: 2, Place: 'KSA' },
        { Id_place: 3, Place: 'US' },
      ],
    }
    this.handleChangeDate=this.handleChangeDate.bind(this);
    this.handleChangeBuyerDate=this.handleChangeBuyerDate.bind(this);
    this.validator = new SimpleReactValidator();
  }
  
  componentDidMount() {
    const id_invoice = this.props.id_invoice;
    this.loadProducts();
    if(id_invoice!=0)
      this.loadInvoiceDt(id_invoice);
  }
 
  loadProducts = () => {
    fetch(URL_PRODUCT_DT)
    .then(response => response.json())
    .then(data => { 
      this.setState({ products: [{ id_product:0, name: "SELECT" },...data] })
    });
  }
  
  loadInvoiceDt = (id_invoice) => {

    fetch(URL_INVOICE_DT + `/${id_invoice}`)
    .then(response => response.json())
    .then(data => 
      {
        if(data.length>0)
        this.setState(
              { invoice_no       : data[0].invoice_no ,
                date             : data[0].date , 
                order_no         : data[0].order_no , 
                buyer_date       : data[0].buyer_date ,
                exporter         : data[0].exporter ,
                consignee        : data[0].consignee ,
                other            : data[0].other ,
                buyer            : data[0].buyer ,
                country_origin   : data[0].country_origin ,
                country_final    : data[0].country_final ,
                pre_carriage     : data[0].pre_carriage ,
                receipt_place    : data[0].receipt_place ,
                vessel_no        : data[0].vessel_no ,
                port_load        : data[0].port_load ,
                port_discharge   : data[0].port_discharge ,
                final_destination: data[0].final_destination ,
                marks            : data[0].marks ,
                container_no     : data[0].container_no ,
                awb_no           : data[0].awb_no ,
                terms            : data[0].terms ,
                invItems         : data[0].items || []
              }
    )
            }
    );
  }

  saveInvoice = () => {
    if (this.validator.allValid()) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
                  invoice_no        : this.state.invoice_no,
                  order_no          : this.state.order_no ,
                  date              : new Date().toISOString().slice(0, 10),
                  buyer_date        : new Date().toISOString().slice(0, 10),
                  exporter          : this.state.exporter ,
                  consignee         : this.state.consignee ,
                  other             : this.state.other ,
                  buyer             : this.state.buyer ,
                  country_origin    : this.state.country_origin ,
                  country_final     : this.state.country_final ,
                  pre_carriage      : this.state.pre_carriage ,
                  receipt_place     : this.state.receipt_place ,
                  vessel_no         : this.state.vessel_no ,
                  port_load         : this.state.port_load ,
                  port_discharge    : this.state.port_discharge ,
                  final_destination : this.state.final_destination ,
                  marks             : this.state.marks ,
                  container_no      : this.state.container_no ,
                  awb_no            : this.state.awb_no ,
                  terms             : this.state.terms ,
                  items             : this.state.invItems,
                  id_invoice        : this.props.id_invoice,
                })
    };
    fetch(URL_INVOICE_SAVE, requestOptions)
        .then(response => response.json())
        .then(response => {
          if(!response.isUpdate)
          {
            this.setState({
              id_invoice : response.id_invoice,
              redirect : true
            })
          }
        })
  }
  
  else
  {
   this.validator.showMessages();
   this.forceUpdate();
  }
}

  renderRedirect = () => {
    if (this.state.redirect) {
      this.setState({
        redirect : false
      })
      return <Redirect to={`./invoice/${this.state.id_invoice}`} />
    }
  }
  
  //form onChangeFunctions
  handleChangeInvoiceNo (e){
    this.setState({ invoice_no:e.target.value})
  }


  handleChangeDate = date => this.setState({ date })
  handleChangeBuyerDate = buyer_date => this.setState({ buyer_date })
 
  handleChangeOrderNo (e){
    this.setState({ order_no:e.target.value})
  }

  handleChangeConsignee (e){
    this.setState({ consignee:e.target.value})
  }

  handleChangeExporter (e){
    this.setState({ exporter:e.target.value})
  }

  handleChangeOther (e){
    this.setState({ other:e.target.value})
  }
  handleChangeBuyer (e){
    this.setState({ buyer:e.target.value})
  }

  handleChangeCountryOrigin (e){
    this.setState({ country_origin:e.target.value})
  }
  handleChangeCountryFinal (e){
    this.setState({ country_final:e.target.value})
  }

  handleChangePreCarriage (e){
    this.setState({ pre_carriage:e.target.value})
  }
  handleChangeReceiptPlace (e){
    this.setState({ receipt_place:e.target.value})
  }
  handleChangeVesselNo (e){
    this.setState({ vessel_no:e.target.value})
  }
  handleChangePortLoad (e){
    this.setState({ port_load:e.target.value})
  }
  handleChangePortDischarge (e){
    this.setState({ port_discharge:e.target.value})
  }
  handleChangeFinalDest (e){
    this.setState({ final_destination:e.target.value})
  }
  handleChangeMarks (e){
    this.setState({ marks:e.target.value})
  }
  handleChangeContainerNo (e){
    this.setState({ container_no:e.target.value})
  }
  handleChangeAwbNo (e){
    this.setState({ awb_no:e.target.value})
  }
  handleChangeTerms (e){
    this.setState({ terms:e.target.value})
  }

  //table onChangeFunctions

  handleChangeKg = (e, rowIndex) => {
    let _invItems = this.state.invItems;
    let _row = _invItems[rowIndex];
    _row.kg = e.target.value;
    _invItems[rowIndex] = _row;
    this.setState({
      invItems: _invItems
    })
  }

  handleChangeBox = (e, rowIndex) => {
    let _invItems = this.state.invItems;
    let _row = _invItems[rowIndex];
    _row.box = e.target.value;
    _invItems[rowIndex] = _row;
    this.setState({
      invItems: _invItems
    })
  }

  handleChangeProduct = (e, rowIndex) => {
    let _invItems = this.state.invItems;
    let _row = _invItems[rowIndex];
    _row.id_product = e.target.value;
    _invItems[rowIndex] = _row;
    this.setState({
      invItems: _invItems
    })
  }

  delRow = (rowIndex) => {
    let _invItems = this.state.invItems;
    _invItems.splice(rowIndex, 1);
    this.setState({
      invItems: _invItems
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

  render() {
    
    const tableRows = this.state.invItems.map((invItem, index) =>
      <TableRow
        handleChangeKg={this.handleChangeKg}
        handleChangeBox={this.handleChangeBox}
        handleChangeProduct={this.handleChangeProduct}
        delRow={this.delRow}
        invItem={invItem} rowIndex={index}
        products={this.state.products}
      />
    );

    const grandTotal = this.state.invItems.reduce((a, b) => +a + +(b.kg * b.box), 0);
    const boxTotal = this.state.invItems.reduce((a, b) => +a + +(b.box), 0);
    const kgTotal = this.state.invItems.reduce((a, b) => +a + +(b.kg), 0);

    return <div>
      {this.renderRedirect()}
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6">
                <div class="card card-warning">
                  <div class="card-body">
                    <form role="form">
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>Invoice No</label>
                            <input type="text" value={this.state.invoice_no} onChange={e => this.handleChangeInvoiceNo(e)} class="form-control" />
                            {this.validator.message('invoice_no', this.state.invoice_no, 'required|numeric')}
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>Invoice Date</label>
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text">
                                  <i class="far fa-calendar-alt" />
                                </span>
                              </div>
                              <DatePicker
                               className={"form-control"}
                               value={this.state.date} 
                               format={"dd/MM/yyyy"} 
                               onChange={this.handleChangeDate}
                                />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>Buyer's Order No</label>
                            <input type="text" onChange={e => this.handleChangeOrderNo(e)} value={this.state.order_no} class="form-control" />
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>Buyer's Date</label>
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text">
                                  <i class="far fa-calendar-alt" />
                                </span>
                              </div>
                              <DatePicker 
                              className={"form-control"} 
                              onChange={this.handleChangeBuyerDate}
                               value={this.state.buyer_date}
                                format={"dd/MM/yyyy"} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label>Other reference(s)</label>
                            <input type="text" onChange={e => this.handleChangeOther(e)} class="form-control" value={this.state.other} />
                          </div>
                          <div class="form-group">
                            <label>Buyer (If other than consignee)</label>
                            <textarea type="text" onChange={e => this.handleChangeBuyer(e)} class="form-control" value={this.state.buyer} />
                          </div>
                        </div>
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label>Country of origin of goods</label>
                            <select class="form-control" onChange={e => this.handleChangeCountryOrigin(e)} value={this.state.country_origin}>
                              {this.state.places.map(column => (
                                <option value={column.Id_place}>
                                  {column.Place}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div class="form-group">
                            <label>Country of final destination</label>
                            <select class="form-control" onChange={e => this.handleChangeCountryFinal(e)} value={this.state.country_final}>
                              {this.state.places.map(column => (
                                <option value={column.Id_place}>
                                  {column.Place}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div class="form-group">
                            <label>Terms of delivery and payment</label>
                            <textarea type="text" onChange={e => this.handleChangeTerms(e)} class="form-control" onChange={e => this.handleChangeTerms(e)} value={this.state.terms} rows={2.8} />
                          </div>
                          <div class="form-group">
                            <label>AWB No.</label>
                            <input type="text" class="form-control" onChange={e => this.handleChangeAwbNo(e)} value={this.state.awb_no} />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="card card-primary">
                  <form role="form">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label>Exporter</label>
                            <textarea type="text" onChange={e => this.handleChangeExporter(e)} value={this.state.exporter} class="form-control" rows={4} />
                          </div>
                          <div class="form-group">
                            <label>Consignee</label>
                            <textarea type="text" onChange={e => this.handleChangeConsignee(e)} value={this.state.consignee} class="form-control" rows={4} />
                          </div>
                          <div class="form-group">
                            <label>Pre-Carriage by</label>
                            <input type="text" onChange={e => this.handleChangePreCarriage(e)} value={this.state.pre_carriage} class="form-control" />
                          </div>
                          <div class="form-group">
                            <label>Place of receipt by Pre-Carrier</label>
                            <input type="text" onChange={e => this.handleChangeReceiptPlace(e)} value={this.state.receipt_place} class="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>Vessel/Flight No</label>
                            <input type="text" onChange={e => this.handleChangeVesselNo(e)} value={this.state.vessel_no} class="form-control" />
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>Port of loading</label>
                            <select class="form-control" onChange={e => this.handleChangePortLoad(e)} value={this.state.port_load}>
                              {this.state.places.map(column => (
                                <option value={column.Id_place}>
                                  {column.Place}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>Port of discharge</label>
                            <select class="form-control" onChange={e => this.handleChangePortDischarge(e)} value={this.state.port_discharge}>
                              {this.state.places.map(column => (
                                <option value={column.Id_place}>
                                  {column.Place}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>Final destination</label>
                            <select class="form-control" onChange={e => this.handleChangeFinalDest(e)} value={this.state.final_destination}>
                              {this.state.places.map(column => (
                                <option value={column.Id_place}>
                                  {column.Place}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>Marks & No.s</label>
                            <input type="text" onChange={e => this.handleChangeMarks(e)} value={this.state.marks} class="form-control" />
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>Container No</label>
                            <input type="text" onChange={e => this.handleChangeContainerNo(e)} value={this.state.container_no} class="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="card card-info">
                <div class="card-body p-0">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Description of goods</th>
                        <th style={{ width: "10%" }}>Kg</th>
                        <th style={{ width: "10%" }}>Amount</th>
                        <th style={{ width: "10%" }}>Total</th>
                        <th style={{ width: "10%" }} />
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows}
                      <EmptyRow products={this.state.products} addRow={this.addRow} />
                    </tbody>
                    <tfoot>
                      <th>Total</th>
                      <th>{kgTotal}</th>
                      <th>{boxTotal}</th>
                      <th align="right">{grandTotal}</th>
                      <th />
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12">
              <div class="card card-info">
                <div class="card-footer">
                  <button onClick={this.saveInvoice} type="submit" class="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>;
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
          <select class="form-control" onChange={(e) => this.handleChangeProduct(e)} value={invItem.id_product} >
            {products.map((column) => <option value={column.id_product}>{column.name}</option>)}
          </select>
        </td>
        <td><input type="text" class="form-control" value={invItem.kg} onChange={(e) => this.handleChangeKg(e)} /></td>
        <td><input type="text" class="form-control" value={invItem.box} onChange={(e) => this.handleChangeBox(e)} /></td>
        <td align="right" >{total}</td>
        <td>
          <button type="button" onClick={this.delRow} class="btn btn-block btn-outline-danger btn-flat"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    );
  }
}

class App extends Component {
  
	render() {
		return (
      <div class="wrapper" >
      <Nav />
      <div class="content-wrapper">

      </div>
    </div>
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
        <td align="right" ></td>
        <td> </td>
      </tr>
    );
	}
}

export default App;
