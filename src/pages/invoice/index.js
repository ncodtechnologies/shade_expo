import React, { Component } from 'react';
import Nav from '../../NavBar';
import DatePicker from 'react-date-picker';
import Expenses from './expense'
import NetReport from './netreport'
import Documents from './documents'
import Packing from './packing'
import FrightExp from './frightExp'
import SimpleReactValidator from 'simple-react-validator';
import { 
  URL_INVOICE_SAVE,
  URL_INVOICE_DT,
  URL_PRODUCT_DT, 
  URL_LEDGER_EDIT_DT, 
  URL_LEDGER_DT, 
  LEDGER_GROUPS, 
  URL_ROUGH_INVOICE_DT,
  URL_LEDGER_REPORT_OP
} from '../constants';
import { Redirect } from 'react-router-dom'
import { PdfInvoice } from '../pdf/invoice';
import { PDFViewer } from '@react-pdf/renderer';

class Invoice extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showPdf: false,
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
      consigners: [],
      consignees: [],
      consigner: this.props.data && this.props.data.consigner,
      consignee: "",
      consignee_name: "",
      consigner_address: this.props.data && this.props.data.consigner_address,
      consignee_address:'',
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
      conversion_rate:'',
      status:'Waiting Approval',
      discount: '',
      narration:'',
      arrProducts:[],
      invItems: [],
      op_bal : 0,
      places: [
        { Id_place: 0, Place: '--Select--' },
        { Id_place: 1, Place: 'INDIA' },
        { Id_place: 2, Place: 'KSA' },
        { Id_place: 3, Place: 'US' },
      ],
      dischargePlaces: [
        { Id_place: 0, Place: '--Select--' },
        { Id_place: 1, Place: 'DELHI' },
        { Id_place: 2, Place: 'CHENNAI' },
        { Id_place: 3, Place: 'KERALA' },
      ],
      statusTypes: [
         'Waiting Approval',
         'Packing',
         'Shipped',
         'Cancelled' 
      ],
      airports:[
        { Id_Port: 0, Port: '--Select--' },
        { Id_Port: 1, Port: 'KOCHI' },
        { Id_Port: 1, Port: 'CALICUT' },
        { Id_Port: 1, Port: 'TRIVANDRUM' },
        { Id_Port: 1, Port: 'KANNUR' },
        { Id_Port: 1, Port: 'MUMBAI' },
        { Id_Port: 1, Port: 'CHENNAI' },
        { Id_Port: 1, Port: 'KOLKATA' },
        { Id_Port: 1, Port: 'COIMBATORE' },
      ],
      btnSaveText: "Save Invoice",
    }
    this.handleChangeDate=this.handleChangeDate.bind(this);
    this.handleChangeBuyerDate=this.handleChangeBuyerDate.bind(this);
    this.validator = new SimpleReactValidator();
  }  
  componentDidMount() {
    const id_invoice = this.props.id_invoice;
    if(this.props.id_rough_invoice)
      this.loadRoughInvoice(this.props.id_rough_invoice);
    
    this.loadProducts();
    this.loadConsigners();
    this.loadConsignees();

    if(id_invoice!=0)
      this.loadInvoiceDt(id_invoice);
  }

  loadOpeningBal() {
    const date = this.formatDate(this.state.date);
    const id_consignee = this.state.consignee;
    fetch(`${URL_LEDGER_REPORT_OP}/'${date}'/'${date}'/${id_consignee}`)
    .then(response => response.json())
    .then(data => { 
      if(data.length > 0)
        this.setState({  
          op_bal : -1*data[0].opening_bal,
        })
    });
  }

  loadRoughInvoice(id) {
    fetch(URL_ROUGH_INVOICE_DT + "/" + id)
    .then(response => response.json())
    .then(data => { 
      if(data.length > 0)
        this.setState({  
          consignee         : data[0].consignee,
          consigner         : data[0].consigner,
          consigner_address : data[0].consigner_address,
          consignee_address : data[0].consignee_address,
        })
    });
  }
 
  loadProducts = () => {
    fetch(URL_PRODUCT_DT)
    .then(response => response.json())
    .then(data => { 
      this.setState({ products: [{ id_product:0, name: "SELECT" },...data] })
    });
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

  loadInvoiceDt = (id_invoice) => {

    fetch(URL_INVOICE_DT + `/${id_invoice}`)
    .then(response => response.json())
    .then(data => 
      {
        if(data.length>0)
        this.setState(
              { invoice_no        : data[0].invoice_no ,
                date              : data[0].date , 
                order_no          : data[0].order_no , 
                buyer_date        : data[0].buyer_date ,
                consigner         : data[0].consigner ,
                consignee         : data[0].consignee ,
                consigner_address : data[0].consigner_address ,
                consignee_address : data[0].consignee_address ,
                other             : data[0].other ,
                buyer             : data[0].buyer ,
                country_origin    : data[0].country_origin ,
                country_final     : data[0].country_final ,
                pre_carriage      : data[0].pre_carriage ,
                receipt_place     : data[0].receipt_place ,
                vessel_no         : data[0].vessel_no ,
                port_load         : data[0].port_load ,
                port_discharge    : data[0].port_discharge ,
                final_destination : data[0].final_destination ,
                marks             : data[0].marks ,
                container_no      : data[0].container_no ,
                awb_no            : data[0].awb_no ,
                terms             : data[0].terms ,
                conversion_rate   : data[0].conversion_rate ,
                status            : data[0].status ,
                discount          : data[0].discount,
                narration         : data[0].narration,
                invItems          : data[0].items || []
              }, () => {
                this.props.setInvoiceNo(this.state.invoice_no);
                this.loadOpeningBal();
            });
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

  saveInvoice = () => {
    this.setState({btnSaveText: "Saving..."})
    if (this.validator.allValid()) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
                  invoice_no        : this.state.invoice_no,
                  order_no          : this.state.order_no,
                  date              : this.formatDate(this.state.date),
                  buyer_date        : this.formatDate(this.state.buyer_date),
                  consigner         : this.state.consigner ,
                  consignee         : this.state.consignee ,
                  consigner_address : this.state.consigner_address ,
                  consignee_address : this.state.consignee_address ,
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
                  conversion_rate   : this.state.conversion_rate,
                  status            : this.state.status || this.state.statusTypes[0],
                  discount          : this.state.discount,
                  narration         : this.state.narration,
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
          else
          {
            this.setState({btnSaveText: "Saved"})
            setTimeout(
              function() {
                  this.setState({btnSaveText: "Save Invoice"});
              }
              .bind(this),
              5000
            );
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
    this.setState({ invoice_no:e.target.value.toUpperCase()})
  }

  handleChangeDate = date => this.setState({ date })
  handleChangeBuyerDate = buyer_date => this.setState({ buyer_date })
 
  handleChangeOrderNo (e){
    this.setState({ order_no:e.target.value})
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
  handleChangeConversionRate (e){
    this.setState({ conversion_rate:e.target.value})
  }
  handleChangeStatus (e){
    this.setState({ status:e.target.value})
  }
  handleChangeDiscount (e){
    this.setState({ discount:e.target.value})
  }
  handleChangeNarration (e){
    this.setState({ narration:e.target.value})
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
                            {this.validator.message('invoice_no', this.state.invoice_no, 'required')}
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
                            <textarea type="text" onChange={e => this.handleChangeConsignerAddress(e)} value={this.state.consigner_address} class="form-control" rows={4} />
                          </div>
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
                            <textarea type="text" onChange={e => this.handleChangeConsigneeAddress(e)} value={this.state.consignee_address} class="form-control" rows={4} />
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
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label>Port of discharge</label>
                            <select class="form-control" onChange={e => this.handleChangePortDischarge(e)} value={this.state.port_discharge}>
                              {this.state.dischargePlaces.map(column => (
                                <option value={column.Id_port}>
                                  {column.Port}
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
                        <th style={{ width: "15%" }}>Amount(USD)</th>
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
                      <th></th>
                      <th align="right">$ {Math.round(grandTotal*10)/10}</th>
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
              <div class="card-body">
                <div class="row">
                   <div class="col-md-12">
                     <label>Discount</label>
                     <input type="text" onChange={e => this.handleChangeDiscount(e)} value={this.state.discount} class="form-control" />    
                 </div>         
                   </div>
                </div>             
               </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
            <div class="card card-info">
              <div class="card-body">
                <div class="row">
                   <div class="col-md-12">
                     <label>Narration</label>
                     <input type="text" onChange={e => this.handleChangeNarration(e)} value={this.state.narration} class="form-control" />    
                   </div>         
                   </div>
                </div>             
               </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12">
            <div class="card card-info">
              <div class="card-body">
                <div class="row">

                  <div class="col-md-4">
                    <label>Status</label>
                    <select class="form-control" onChange={e => this.handleChangeStatus(e)} value={this.state.status}>
                      {this.state.statusTypes.map(column => (
                        <option value={column}>
                          {column}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div class="col-md-4">
                    <label>Conversion Rate</label>
                    <input type="text" onChange={e => this.handleChangeConversionRate(e)} value={this.state.conversion_rate} class="form-control" />    
                  </div>
                </div>
              </div>

              <div class="card-footer">
                    <button onClick={this.saveInvoice} type="submit" class="btn btn-primary">
                      {this.state.btnSaveText}
                    </button>
                    <button onClick={()=>this.setState({ showPdf:true }) } type="submit" class="btn btn-primary float-right">
                      Print Invoice
                    </button>
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
                    <PdfInvoice {...this.state} />
                  </PDFViewer>
                </div>
              </div>
              </div>
            </div>
          </div>
          }
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
        <td align="right" >{Math.round(total*100)/100}</td>
        <td>
          <button type="button" onClick={this.delRow} class="btn btn-block btn-outline-danger btn-flat"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    );
  }
}

class App extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      currentTab : 0,
      invoice_no : 0
    }

    this.setTab = this.setTab.bind(this);
  }
  
  
  componentDidMount() {
    console.log(this.props.match.params);
  }

  setTab = tabIndex => {
    this.setState({ currentTab : tabIndex });
  }
  setInvoiceNo = invoice_no => {
    this.setState({ invoice_no});
  }

	render() {
		return (
      <div class="wrapper" >
        <Nav />
        <div class="content-wrapper">

            <div class="card card-primary card-outline card-outline-tabs">
              <div class="card-header p-0 border-bottom-0">
                <ul class="nav nav-tabs" id="custom-tabs-three-tab" role="tablist">
                  <li class="nav-item">
                    <a onClick={()=>this.setTab(0)} class="nav-link active" id="custom-tabs-three-home-tab" data-toggle="pill" href="#custom-tabs-three-home" role="tab" aria-controls="custom-tabs-three-home" aria-selected="true">Invoice {this.props.match.params.id != 0 && `No. ${this.state.invoice_no}` } </a>
                  </li>
                  {this.props.match.params.id == 0 ? <div /> : 
                  <li class="nav-item">
                    <a onClick={()=>this.setTab(1)} class="nav-link" id="custom-tabs-three-profile-tab" data-toggle="pill" href="#custom-tabs-three-profile" role="tab" aria-controls="custom-tabs-three-profile" aria-selected="false">Documents</a>
                  </li>
                  }
                  {this.props.match.params.id == 0 ? <div /> : 
                  <li class="nav-item">
                    <a onClick={()=>this.setTab(2)} class="nav-link" id="custom-tabs-three-messages-tab" data-toggle="pill" href="#custom-tabs-three-messages" role="tab" aria-controls="custom-tabs-three-messages" aria-selected="false">Expenses</a>
                  </li>
                  }
                  {this.props.match.params.id == 0 ? <div /> : 
                  <li class="nav-item">
                    <a onClick={()=>this.setTab(3)} class="nav-link" id="custom-tabs-three-settings-tab" data-toggle="pill" href="#custom-tabs-three-settings" role="tab" aria-controls="custom-tabs-three-settings" aria-selected="false">Net Report</a>
                  </li>
                  }
                  {this.props.match.params.id == 0 ? <div /> : 
                  <li class="nav-item">
                    <a onClick={()=>this.setTab(4)} class="nav-link" id="custom-tabs-three-packing-tab" data-toggle="pill" href="#custom-tabs-three-packing" role="tab" aria-controls="custom-tabs-three-packing" aria-selected="false">Packing </a>
                  </li>
                  }
                  {this.props.match.params.id == 0 ? <div /> : 
                  <li class="nav-item">
                    <a onClick={()=>this.setTab(5)} class="nav-link" id="custom-tabs-three-fright-tab" data-toggle="pill" href="#custom-tabs-three-fright" role="tab" aria-controls="custom-tabs-three-fright" aria-selected="false">Freight Expenses </a>
                  </li>
                  }
                </ul>
              </div>
              <div class="card-body">
                <div class="tab-content" id="custom-tabs-three-tabContent">
                  <div class="tab-pane fade active show" id="custom-tabs-three-home" role="tabpanel" aria-labelledby="custom-tabs-three-home-tab">
                    {this.state.currentTab == 0 ? 
                      <Invoice id_invoice={this.props.match.params.id} id_rough_invoice={this.props.match.params.id_rough_invoice} setInvoiceNo={this.setInvoiceNo} />
                    :
                      <div />
                    }
                  </div>
                  {this.props.match.params.id == 0 ? <div /> : 
                  <div class="tab-pane fade" id="custom-tabs-three-profile" role="tabpanel" aria-labelledby="custom-tabs-three-profile-tab">
                     {this.state.currentTab == 1 ? 
                     <Documents  id_invoice={this.props.match.params.id}/>
                     :
                       <div />
                     }
                  </div>
                  }
                  {this.props.match.params.id == 0 ? <div /> : 
                  <div class="tab-pane fade" id="custom-tabs-three-messages" role="tabpanel" aria-labelledby="custom-tabs-three-messages-tab">
                     {this.state.currentTab == 2 ? 
                     <Expenses  id_invoice={this.props.match.params.id}/>
                     :
                       <div />
                     }
                  </div>
                  }
                  {this.props.match.params.id == 0 ? <div /> : 
                  <div class="tab-pane fade" id="custom-tabs-three-settings" role="tabpanel" aria-labelledby="custom-tabs-three-settings-tab">
                     {this.state.currentTab == 3 ? 
                     <NetReport  id_invoice={this.props.match.params.id}/>
                     :
                       <div />
                     }
                  </div>
                  }
                  {this.props.match.params.id == 0 ? <div /> : 
                  <div class="tab-pane fade" id="custom-tabs-three-packing" role="tabpanel" aria-labelledby="custom-tabs-three-packing-tab">
                    {this.state.currentTab == 4 ? 
                     <Packing  id_invoice={this.props.match.params.id} invoice_no={this.state.invoice_no} {...this.props} />
                     :
                       <div />
                     }
                  </div>
                  }
                  {this.props.match.params.id == 0 ? <div /> : 
                  <div class="tab-pane fade" id="custom-tabs-three-fright" role="tabpanel" aria-labelledby="custom-tabs-three-fright-tab">
                    {this.state.currentTab == 5 ? 
                     <FrightExp  id_invoice={this.props.match.params.id} {...this.props} />
                     :
                       <div />
                     }
                  </div>
                  }
                </div>
              </div>
            </div>
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
