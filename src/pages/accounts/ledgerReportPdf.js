import React, { Component } from 'react';
import Nav from '../../NavBar';
import { URL_LEDGER_DT ,URL_LEDGER_REPORT_DT,URL_LEDGER_REPORT_OP} from '../constants';
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

class LedgerReportPdf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      dateFrom: new Date(),
      dateTo: new Date(),
      id_ledger:'',
      ledger: '',
      op:0,
      activePage: 1,
      totalCount:'',
      receiptTotal:0,
      paymentTotal:0,
      arrLedger: [],
      arrVouchers: [],
    }
  }
  
  componentDidMount() {
    const dateFrom = this.props.match.params.from_date;
    const dateTo = this.props.match.params.to_date;
    const id_account_head = this.props.match.params.id_account_head;
    this.loadOp(dateFrom,dateTo,id_account_head);
    this.loadVoucherList(dateFrom,dateTo,id_account_head);
  }
  
  loadVoucherList = (_dateFrom,_dateTo,id_ledger) => {
    const activePage = 1;
    fetch(URL_LEDGER_REPORT_DT + `/'${_dateFrom}'` + `/'${_dateTo}'` + `/${id_ledger}` + `/${activePage}` )
    .then(response => response.json())
    .then(data => {
      this.setState({
            arrVouchers: data.items ,
            totalCount:data.totalCount,
            receiptTotal: data.receipt,
            paymentTotal: data.payment,
          })
        }
      );
  } 
  
  loadOp = (_dateFrom,_dateTo,id_ledger) => {
    fetch(URL_LEDGER_REPORT_OP + `/'${_dateFrom}'` + `/'${_dateTo}'` + `/${id_ledger}` )
    .then(response => response.json())
    .then(data => {
      if(data.length>0)
      this.setState({
        op: data[0].opening_bal ,
        })
        }
      );
    console.log(this.state.arrVouchers)
  } 

  render() {
    const tableRows = this.state.arrVouchers.map((arrVoucher, index) =>
      <TableRow
      arrVoucher={arrVoucher}
        arrLedger = {this.state.arrLedger}
      />);

    const receiptTotal = this.state.arrVouchers.reduce((a, b) => +a + +(b.receipt), 0);
    const paymentTotal = this.state.arrVouchers.reduce((a, b) => +a + +(b.payment), 0);
    const _cb = parseInt((-1*this.state.op) + this.state.paymentTotal - this.state.receiptTotal) || 0;
    const cb = _cb >= 0 ? `${_cb} DR` : `${-1*_cb} CR`;
    let ob = parseInt(this.state.op) || 0;
    ob = ob >= 0 ? `${ob} CR` : `${-1*ob} DR`;

    return (
      
      <PDFViewer style={{width:"100%", height: 700}} >
        <Document>
          <Page size="A4" >
            <View >
              <Text>{cb}</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    );
  }
}


class TableRow extends React.Component {

  delRow = () => {
    this.props.delRow(this.props.rowIndex);
  }

  render() {
    let arrVoucher = this.props.arrVoucher;

    return (
      <tr>
        <td>{arrVoucher.date}</td>
        <td>{arrVoucher.type}</td>
        <td >{arrVoucher.narration}</td>
        <td >{Math.round(parseInt(arrVoucher.payment))||0}</td>
        <td >{Math.round(parseInt(arrVoucher.receipt))||0}</td>
        <td ></td>
      </tr>
    );
  }
}

export default LedgerReportPdf;