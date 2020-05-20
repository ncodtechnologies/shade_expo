import React, { Component } from 'react';
import { URL_NET_SALES_TOT,URL_NET_OTHER_EXP } from '../constants';

class NetReport extends Component {
  constructor(props) {
    super(props);
    this.state={
        sales_total:'',
        other_exp:'',
        freight:0,
        packing:0
    }
  }
   
  componentDidMount() {
    const id_invoice=this.props.id_invoice;
    this.loadSalesTotal(id_invoice);
    this.loadOtherExp(id_invoice);
    
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
                        <td>{this.state.sales_total}</td>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <td>{this.state.sales_total}</td>
                      </tr>
                      <tr>
                        <th>Total (In Rupees):</th>
                        <td>Rs.0</td>
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
