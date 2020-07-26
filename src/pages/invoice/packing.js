import React, { Component } from 'react';
import { URL_PACK_LABOUR_DT, URL_PACK_PACKINGLIST_DT,URL_PACK_PACKINGEXP_DT, URL_PACK_PACKINGLIST_GRP_BY } from '../constants';

import { PDFViewer } from '@react-pdf/renderer';
import { PdfPackingList } from '../pdf/packingList';

class Packing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LabourItems:[],
      packItems: [],
      ExpenseItems:[],
      packItemsGrp:[],
      showPdf: false,
    }   
  }
  
  componentDidMount() {
    const id_invoice=this.props.id_invoice;
    this.loadInvLabourItem(id_invoice);
    this.loadInvPackingExp(id_invoice);
    this.loadInvPackingList(id_invoice);
    this.loadInvPackingListGrpBy(id_invoice);
  }

  loadInvLabourItem = (id_invoice) => {
    fetch(URL_PACK_LABOUR_DT + `/${id_invoice}`)
    .then(response => response.json())
    .then(data => this.setState({ LabourItems: data }));
  }
  loadInvPackingList = (id_invoice) => {
    fetch(URL_PACK_PACKINGLIST_DT + `/${id_invoice}`)
    .then(response => response.json())
    .then(data => this.setState({ packItems: data }));
  }
  loadInvPackingListGrpBy = (id_invoice) => {
    fetch(URL_PACK_PACKINGLIST_GRP_BY + `/${id_invoice}`)
    .then(response => response.json())
    .then(data => this.setState({ packItemsGrp: data }));
  }
  loadInvPackingExp = (id_invoice) => {
    fetch(URL_PACK_PACKINGEXP_DT + `/${id_invoice}`)
    .then(response => response.json())
    .then(data => this.setState({ ExpenseItems: data }));
  }
  render() {
    const tableRowsPacking = this.state.packItems.map((packItem, index) =>
      <TableRowPacking
      packItem={packItem} rowIndex={index}
      />
    );
    const tableRowsPackingGrpBy = this.state.packItemsGrp.map((packItem, index) =>
      <TableRowPackingGrpBy
      packItem={packItem} rowIndex={index}
      />
    );
    const tableRowsLabour = this.state.LabourItems.map((LabourItem, index) =>
      <TableRowLabour
      LabourItem={LabourItem} rowIndex={index}
      />
    );
    const tableRowsExpense = this.state.ExpenseItems.map((ExpenseItem, index) =>
      <TableRowsExpense
      ExpenseItem={ExpenseItem} rowIndex={index}
      />
    );   

    const grandTotalPacking = this.state.packItems.reduce((a, b) => +a + +(b.kg), 0);
    const grandTotalLabour = this.state.LabourItems.reduce((a, b) => +a + +(b.amount), 0);
    const grandTotalExpense = this.state.ExpenseItems.reduce((a, b) => +a + +(b.amount), 0);

    return (
      <div >

        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12">
              <div class="card-header">
                <h3 class="card-title">Packing List</h3>                
              </div>
                <div class="card card-info">
                  <div class="card-body p-0">
                    <table class="table">
                      <thead>                       
                        <tr>
                          <th style={{ width: '20%' }} >Pack No</th>
                          <th style={{ width: '50%' }}>Items</th>
                          <th style={{ width: '30%',textAlign: "right" }}>Kg</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRowsPacking}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th></th>
                          <th>Net Weight</th>
                          <th style={{ textAlign: "right" }}>{grandTotalPacking}</th>
                        </tr>
                        {tableRowsPackingGrpBy}
                      </tfoot>
                    </table>
                  </div>

                  <div class="card-footer">
                    <button onClick={()=>this.setState({ showPdf:true }) } type="button" class="btn btn-primary float-right">
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
                      <PdfPackingList packItems={this.state.packItems} invoice_no={this.props.invoice_no} />
                    </PDFViewer>
                  </div>
                </div>
                </div>
              </div>
            </div>
            }

            <div class="row">
              <div class="col-lg-12">
              <div class="card-header">
                <h3 class="card-title">Labour</h3>                
              </div>
                <div class="card card-info">
                  <div class="card-body p-0">
                    <table class="table">
                      <thead>                       
                        <tr>
                          <th style={{ width: '50%' }}>Name</th>
                          <th style={{ width: '50%',textAlign: "right"  }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRowsLabour}
                      </tbody>
                      <tfoot>
                        <th>Total</th>
                        <th style={{ textAlign: "right" }} >{grandTotalLabour}</th>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
              <div class="card-header">
                <h3 class="card-title">Packing Items</h3>                
              </div>
                <div class="card card-info">
                  <div class="card-body p-0">
                    <table class="table">
                      <thead>                       
                        <tr>
                          <th style={{ width: '30%' }}>Item</th>
                          <th style={{ width: '20%', textAlign: "right" }}>Qty</th>
                          <th style={{ width: '20%', textAlign: "right" }}>Price</th>
                          <th style={{ width: '30%', textAlign: "right" }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        { tableRowsExpense }
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Total</th>
                          <th></th>
                          <th></th>
                          <th  style={{ textAlign: "right" }} >{grandTotalExpense}</th>
                        </tr>
                      </tfoot>
                    </table>
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

class TableRowPacking extends React.Component {
  render() {
    let packItem = this.props.packItem;

    return (
      <tr>
        <td>{packItem.pack_no}</td>
        <td>{packItem.name}</td>
        <td align="right" >{packItem.kg}</td>
      </tr>
    );
  }
}

class TableRowPackingGrpBy extends React.Component {
  render() {
    let packItem = this.props.packItem;

    return (
      <tr>
        <th>{packItem.pack_no}</th>
        <th>{packItem.name}</th>
        <th  style={{ textAlign: "right" }}  >{packItem.kg}</th>
      </tr>
    );
  }
}

class TableRowLabour extends React.Component {
  render() {
    let LabourItem = this.props.LabourItem;

    return (
      <tr>
        <td>{LabourItem.name}</td>
        <td align="right" >{LabourItem.amount}</td>
      </tr>
    );
  }
}

class TableRowsExpense extends React.Component {
  render() {
    let ExpenseItem = this.props.ExpenseItem;

    return (
      <tr>
        <td>{ExpenseItem.name}</td>
        <td align="right" >{ExpenseItem.qty}</td>
        <td align="right" >{ExpenseItem.selling_price}</td>
        <td align="right" >{ExpenseItem.amount}</td>
      </tr>
    );
  }
}

export default Packing;