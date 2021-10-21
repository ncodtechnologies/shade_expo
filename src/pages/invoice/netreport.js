import React, { Component } from 'react';
import { URL_NET_SALES_TOT,URL_NET_OTHER_EXP,URL_INVOICE_DT, URL_NET_PACK_TOT, URL_NET_FREIGHT, URL_UPD_PURCHASE } from '../constants';
import loader from '../../assets/loading.gif'

class NetReport extends Component {
  constructor(props) {
    super(props);
    this.state={
        sales_total:'',
        other_exp:'',
        freight:0,
        packing:0,
        conversion_rate:0,
        purchase:0,
        loadingPur: false,
    }
  }
   
  componentDidMount() {
    const id_invoice=this.props.id_invoice;
    this.loadSalesTotal(id_invoice);
    this.loadOtherExp(id_invoice);
    this.loadInvoiceDt(id_invoice);
    this.loadPackTotal(id_invoice);
    this.loadFreightTotal(id_invoice);
  }

  handleChangePurchase (e){
    this.setState({ purchase:e.target.value})
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

  loadPackTotal(id_invoice){
    fetch(URL_NET_PACK_TOT +  `/${id_invoice}`)
    .then(response => response.json())
    .then(data => this.setState({ packing: data[0].amount }));
  }

  loadFreightTotal(id_invoice){
    fetch(URL_NET_FREIGHT +  `/${id_invoice}`)
    .then(response => response.json())
    .then(data => this.setState({ freight: data[0].amount }));
  }

  loadInvoiceDt(id_invoice){
    fetch(URL_INVOICE_DT +  `/${id_invoice}`)
    .then(response => response.json())
    .then(data => this.setState({
       conversion_rate: data[0].conversion_rate,
       purchase: data[0].purchase
      }));
  }

  updInvoice = () => {
    this.setState({loadingPur: true})
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
                  id_invoice        : this.props.id_invoice,
                  purchase          : this.state.purchase,
                })
    };
    fetch(URL_UPD_PURCHASE, requestOptions)
      .then(response => this.setState({ loadingPur: false }))
      .catch(err => this.setState({ loadingPur: false }))
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
                        <td align="right" >$ {Math.round(this.state.sales_total*1000)/1000}</td>
                      </tr>
                      <tr>
                        <th>Total :</th>
                        <td align="right" >$ {Math.round(this.state.sales_total*1000)/1000}</td>
                      </tr>
                      <tr>
                        <th>Total : (Rate: {this.state.conversion_rate})</th>
                        <td align="right" >Rs {Math.round(this.state.sales_total*this.state.conversion_rate*100)/100}</td>
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
                        <th style={{width:"50%"}} >Purchase:</th>
                        <td>
                        <div class="input-group input-group-sm">
                          <input type="text" style={{textAlign:"right"}} class="form-control" onChange={e => this.handleChangePurchase(e)} value={this.state.purchase} />
                          <span class="input-group-append">
                            <button type="button" class="btn btn-info btn-flat" onClick={()=>this.updInvoice()} >
                              {!this.state.loadingPur ?
                              <i class="fas fa-check"></i>
                              :
                              <img src={loader} style={{width:15,height:15}} />
                              }
                            </button>
                          </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th style={{width:"50%"}} >Freight Expenses:</th>
                        <td align="right" >{Math.round(this.state.freight)}</td>
                      </tr>
                      <tr>
                        <th style={{width:"50%"}} >Packing Expenses:</th>
                        <td align="right" >{Math.round(this.state.packing)}</td>
                      </tr>
                      <tr>
                        <th>Other Expenses</th>
                        <td align="right" >{Math.round(this.state.other_exp)}</td>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <td align="right" >{Math.round((parseInt(this.state.freight || 0)  + parseInt(this.state.packing || 0) + parseInt(this.state.other_exp || 0) + parseInt(this.state.purchase || 0))*100)/100}</td>
                      </tr>
                    </tbody></table>
                  </div>
                </div>
                <div class="row" style={{fontWeight: "bold", alignItems: "center", textAlign: "center", borderWidth: 1, margin: "auto", textDecorationLine: "underline"}} >
                  Net amount: {Math.round((this.state.sales_total*this.state.conversion_rate) - (parseInt(this.state.freight || 0)  + parseInt(this.state.packing || 0) + parseInt(this.state.other_exp || 0) + parseInt(this.state.purchase || 0)))}
                </div>
          </div>
        </div>

      </div>
      </div>
    );
  }
}

export default NetReport;
