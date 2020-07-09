import React, { Component } from 'react';
import { URL_NET_SALES_TOT,URL_NET_OTHER_EXP,URL_INVOICE_CONV_RATE } from '../constants';

class NetReport extends Component {
  constructor(props) {
    super(props);
    this.state={
        sales_total:'',
        other_exp:'',
        freight:0,
        packing:0,
        conversion_rate:0
    }
  }
   
  componentDidMount() {
    const id_invoice=this.props.id_invoice;
    this.loadSalesTotal(id_invoice);
    this.loadOtherExp(id_invoice);
    this.loadConversionRate(id_invoice);
    
  }

  loadSalesTotal(id_invoice){
    fetch(URL_NET_SALES_TOT +  `/${id_invoice}`)
    .then(response => response.json())
    .then(data => this.setState({ sales_total: data[0].tot }));
  }

  loadOtherExp(id_invoice){
    fetch(URL_NET_OTHER_EXP +  `/${id_invoice}`)
    .then(response => response.json())
    .then(data => this.setState({ other_exp: data[0].tot }));
  }

  loadConversionRate(id_invoice){
    fetch(URL_INVOICE_CONV_RATE +  `/${id_invoice}`)
    .then(response => response.json())
    .then(data => this.setState({ conversion_rate: data[0].conversion_rate }));
  }

  render() {
    return (
      <div >

        <div class="content">
          <div class="container-fluid">
            <div class="row">
            <div class="col-6">
                  <p class="lead">Sales</p>

                  <div class="table-responsive">
                    <table class="table">
                      <tbody><tr>
                        <th style={{width:"50%"}} >Sales Total:</th>
                        <td>$ {this.state.sales_total}</td>
                      </tr>
                      <tr>
                        <th>Total :</th>
                        <td>$ {this.state.sales_total}</td>
                      </tr>
                      <tr>
                        <th>Total : (Rate: {this.state.conversion_rate})</th>
                        <td>Rs {Math.round(this.state.sales_total*this.state.conversion_rate*100)/100}</td>
                      </tr>
                    </tbody></table>
                  </div>
                </div>
            <div class="col-6">
                  <p class="lead">Expenses</p>

                  <div class="table-responsive">
                    <table class="table">
                      <tbody>
                      <tr>
                        <th style={{width:"50%"}} >Freight Expenses:</th>
                        <td>{this.state.freight}</td>
                      </tr>
                      <tr>
                        <th style={{width:"50%"}} >Packing Expenses:</th>
                        <td>{this.state.packing}</td>
                      </tr>
                      <tr>
                        <th>Other Expenses</th>
                        <td>{this.state.other_exp}</td>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <td>{this.state.freight  + this.state.packing + this.state.other_exp}</td>
                      </tr>
                    </tbody></table>
                  </div>
                </div>
          </div>
        </div>

      </div>
      </div>
    );
  }
}

export default NetReport;
