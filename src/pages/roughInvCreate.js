import React, { Component } from 'react';
import Nav from '../NavBar';
import { Link, Redirect } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import { URL_PRODUCT_DT,URL_ROUGH_INVOICE_SAVE,URL_ROUGH_INVOICE_DT} from './constants';

import SimpleReactValidator from 'simple-react-validator';


class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      data:null,
      title: 'Table',
      date: new Date(),
      port_load:'',
      consigner:'',
      Consignee:'',
      products: [],
      invItems: [],
      places: [
              { Id_place: 0, Place: '--Select--' },
              { Id_place: 1, Place: 'INDIA' },
              { Id_place: 2, Place: 'KSA' },
              { Id_place: 3, Place: 'US' },
              ],
    }
    this.onDateChange           = this.onDateChange.bind(this);
    this.handleChangeConsignee  = this.handleChangeConsignee.bind(this);
    this.handleChangeConsigner  = this.handleChangeConsigner.bind(this);
    this.handleChangePortLoad   = this.handleChangePortLoad.bind(this);
    this.validator = new SimpleReactValidator();
  }
  componentDidMount() {
    const id_rough_invoice=this.props.match.params.id_rough_invoice;
  //  alert(id_rough_invoice)
    this.loadProducts();
    if(id_rough_invoice!=0)
      this.loadInvoiceDt(id_rough_invoice);
  }

  loadInvoiceDt = (id_rough_invoice) => {

    fetch(URL_ROUGH_INVOICE_DT + `/${id_rough_invoice}`)
    .then(response => response.json())
    .then(data => 
      {
        if(data.length>0)
        this.setState(
              { 
                date             : data[0].date , 
                port_load        : data[0].port_load , 
                consigner        : data[0].consigner ,
                consignee        : data[0].consignee ,                
                invItems         : data[0].items || []
              }
              )
            }
    );
  }
  
  loadProducts = () => {
    fetch(URL_PRODUCT_DT)
    .then(response => response.json())
    .then(data => this.setState({ products: [{ id_product:0, name: "SELECT" },...data]  }));
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
  
  saveInvoice = () => {
    if (this.validator.allValid()) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
                  date              : this.formatDate(this.state.date),
                  consigner         : this.state.consigner ,
                  consignee         : this.state.consignee ,
                  port_load         : this.state.port_load ,
                  items             : this.state.invItems,
                  id_rough_invoice  : this.props.match.params.id_rough_invoice,
                })
    };
    fetch(URL_ROUGH_INVOICE_SAVE, requestOptions)
      .then(response => {
        response.json();
        this.setState({ redirect : true });
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
  handleChangeConsignee (e){
    this.setState({ consignee:e.target.value})
  }
  handleChangeConsigner (e){
    this.setState({ consigner:e.target.value})
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

  handleChangeBox = (e, rowIndex) =>  {
    let _invItems = this.state.invItems;
    let _row = _invItems[rowIndex];
    _row.box = e.target.value;
    _invItems[rowIndex] = _row;
    this.setState({
      invItems: _invItems
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
  
  delRow = (rowIndex) =>  {
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

    const grandTotal = this.state.invItems.reduce((a, b) => +a + +(b.kg*b.box), 0);
    const boxTotal = this.state.invItems.reduce((a, b) => +a + +(b.box), 0);
    const kgTotal = this.state.invItems.reduce((a, b) => +a + +(b.kg), 0);
  
    const { redirect } = this.state;

    if (redirect) {
      this.setState({redirect: false})
      return <Redirect to='/roughInvoiceList'/>;
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
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label>Consigner</label>
                              <textarea class="form-control" onChange={e => this.handleChangeConsigner(e)} value={this.state.consigner} rows="3" placeholder="Consigner"></textarea>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label>Consignee</label>
                              <textarea class="form-control" onChange={e => this.handleChangeConsignee(e)} value={this.state.consignee} rows="3" placeholder="Consignee" ></textarea>
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
                            <th style={{ width: '10%' }}>Total</th>
                            <th style={{ width: '10%' }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          { tableRows }
                          <EmptyRow products={this.state.products} addRow={this.addRow} />
                        </tbody>
                        <tfoot>
                          <td></td>
                          <td>{ kgTotal }</td>
                          <td>{ boxTotal }</td>
                          <td align="right" >{ grandTotal }</td>
                          <td></td>
                        </tfoot>
                      </table>
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
        <td><input type="text" class="form-control"  value={invItem.box}  onChange={(e) => this.handleChangeBox(e)}  /></td>
        <td align="right" >{total}</td>
        <td>
            <button type="button"  onClick={this.delRow}  class="btn btn-success"><i class="fas fa-trash"></i></button>
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
        <td align="right" ></td>
        <td> </td>
      </tr>
    );
	}
}

export default App;
