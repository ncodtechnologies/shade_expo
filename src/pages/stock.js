import React, { Component } from 'react';
import Nav from '../NavBar';
import SimpleReactValidator from 'simple-react-validator';

import { URL_STOCK_REPORT } from './constants';
import { URL_PRODUCT_DT } from './constants';

import { PdfStock } from './pdf/stockReport';
import { PDFViewer } from '@react-pdf/renderer';

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPdf: false,
      data:null,
      id_product:'',
      type:'',
      arrProducts: [],
      arrVouchers: [],
      arrType:[
              {type:'FISH'},
              {type:'PACKING MATERIAL'},
              {type:'OTHER'}
            ]
    }    
    this.onProductChange = this.onProductChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.validator = new SimpleReactValidator();
  }

  
  componentDidMount() {
    const type_ = this.state.arrType[0].type;
    this.loadProduct();
    this.loadStockList(type_);
  }
  loadProduct(){
    fetch(URL_PRODUCT_DT)
    .then(response => response.json())
    .then(data => 
      {
        this.setState({ arrProducts: data });
      });
    //console.log(data)
  }

  loadStockList = (type_) => {
    fetch(URL_STOCK_REPORT + `/'${type_}'` )
    .then(response => response.json())
    .then(data => {
     
      this.setState({
        arrVouchers: data ,
        })
        }
      );
    console.log(this.state.arrVouchers)
  }


  onProductChange(event) {
    this.setState({ id_product: event.target.value }
      , () => {
      })
  }

  onTypeChange(event) {
    this.setState({ type: event.target.value }
      , () => {        
   const type_ = this.state.type;
   this.loadStockList(type_);
   });        
  }

 
  render() {
    const tableRows = this.state.arrVouchers.map((arrVoucher, index) =>
      <TableRow
      arrVoucher={arrVoucher}
      />);

    const grandTotal = this.state.arrVouchers.reduce((a, b) => +a + +(b.rate*b.stock), 0);
    const stockTotal = this.state.arrVouchers.reduce((a, b) => +a + +(b.stock), 0);

    return (
      
      <div class="wrapper" >
      <Nav />
      <div class="content-wrapper">

        <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Stock Report</h1>
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
                              <div class="col-md-6">
                              <div class="form-group">
                                    <label>Type</label>
                                    <select class="form-control" onChange={this.onTypeChange} value={this.state.type}>
                                      {this.state.arrType.map((types) =>
                                        <option value={types.type}>{types.type}</option>)}
                                    </select>
                                  </div>
                              </div>
                              <button type="button"  class="btn btn-block btn-success btn-flat" onClick={() => this.loadStockList(this.state.type)}>
                                   Search
                                </button>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: '50%' }}>Product</th>
                          <th style={{ width: '25%' }}>Stock</th>
                          <th style={{ width: '25%' }}>Rate</th>
                          <th style={{ width: '25%' }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows}
                      </tbody>
                      <tfoot>
                        <th>Total</th>
                        <th align="right" >{stockTotal}</th>
                        <th></th>
                        <th align="right" >{grandTotal}</th>
                      </tfoot>
                    </table>
                  </div>

                  <div class="card-footer">
                        <button onClick={()=>this.setState({ showPdf:true }) } type="submit" class="btn btn-primary float-right">
                          Print
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
                        <PdfStock arrVouchers={this.state.arrVouchers} />
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
    );
  }
}


class TableRow extends React.Component {

  render() {
    let arrVoucher = this.props.arrVoucher;

    return (
      <tr>
        <td>{arrVoucher.product}</td>
        <td>{arrVoucher.stock} {arrVoucher.unit}</td>
        <td>{arrVoucher.rate}</td>
        <td>{arrVoucher.rate*arrVoucher.stock}</td>
      </tr>
    );
  }
}

export default Stock;