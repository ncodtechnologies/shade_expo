import React, { Component } from 'react';
import Nav from '../../NavBar';
import { URL_LEDGER_EDIT_DT ,URL_LEDGER_REPORT_DT,URL_LEDGER_REPORT_OP} from '../constants';
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

class LedgerReportPdf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      dateFrom: '',
      dateTo: '',
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

    this.setState({
      dateFrom, dateTo
    })
    this.loadOp(dateFrom,dateTo,id_account_head);
    this.loadVoucherList(dateFrom,dateTo,id_account_head);
    this.loadAccountHead(id_account_head);
  }
  
  loadAccountHead = id_ledger => {
    fetch(`${URL_LEDGER_EDIT_DT}/${id_ledger}` )
    .then(response => response.json())
    .then(data => {
      this.setState({
            ledger: data[0].account_head,
          })
        }
      );
  } 
  
  loadVoucherList = (_dateFrom,_dateTo,id_ledger) => {
    const activePage = 1;
    fetch(URL_LEDGER_REPORT_DT + `/'${_dateFrom}'` + `/'${_dateTo}'` + `/${id_ledger}` + `/${activePage}/0` )
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

    var receiptTotal = this.state.arrVouchers.reduce((a, b) => +a + +(b.receipt), 0);
    var paymentTotal = this.state.arrVouchers.reduce((a, b) => +a + +(b.payment), 0);

    const _cb = parseInt((-1*this.state.op) + this.state.paymentTotal - this.state.receiptTotal) || 0;
    const cb = _cb;
    let ob = parseInt(this.state.op) || 0;

    receiptTotal += ob > 0 ? ob : 0
    paymentTotal += ob < 0 ? -1*ob : 0

    return (
      
      <PDFViewer style={{width:"100%", height: 700}} >
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.top}>
            </View>
            <View style={{ flexDirection: "column" }} >
              
              <View style={styles.container1}>
                    <View style={styles.section}>
                      <Text style={styles.headerTxt} >AQUASIGN EXPORTS</Text>
                      <Text style={styles.address}>5-27, M-1. Maria Street, Kanyakumari Dist</Text>
                    </View>
                    <View style={styles.sectionTopRight}>
                      <View style={styles.box}>
                          <Text style={[styles.right,{ textDecoration: 'underline' }]}>LEDGER REPORT</Text>
                      </View>
                      <View style={styles.box}>
                          <Text style={styles.right}>{this.state.ledger}</Text>
                      </View>
                      <View style={styles.box}>
                          <Text style={styles.right}>{`${this.state.dateFrom} to ${this.state.dateTo}`}</Text>
                      </View>
                  </View>
              </View>

              <View style={styles.tableRow}>
                <Text style={[styles.col1, styles.bold]} >DATE</Text>
                <Text style={[styles.col2, styles.bold]} >NARRATION</Text>
                <Text style={[styles.col3, styles.bold]} >DEBIT</Text>
                <Text style={[styles.col4, styles.bold]} >CREDIT</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.col1} ></Text>
                <Text style={styles.col2} >Opening Balance</Text>
                <Text style={styles.col3} >{ob < 0 && -1*ob}</Text>
                <Text style={styles.col4} >{ob > 0 && ob}</Text>
              </View>
              {tableRows}
              <View style={styles.tableRow}>
                <Text style={styles.col1} ></Text>
                <Text style={[styles.col2,styles.bold]} >Total</Text>
                <Text style={[styles.col3,styles.bold]} >{paymentTotal}</Text>
                <Text style={[styles.col4,styles.bold]} >{receiptTotal}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.col1} ></Text>
                <Text style={[styles.col2,styles.bold]} >Closing Balance</Text>
                <Text style={[styles.col3,styles.bold]} >{cb > 0 && cb + " DR"}</Text>
                <Text style={[styles.col4,styles.bold]} >{cb < 0 && (-1*cb) + " CR"}</Text>
              </View>
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
      <View style={styles.tableRow}>
        <Text style={styles.col1} >{arrVoucher.date}</Text>
        <Text style={styles.col2} >{arrVoucher.narration}</Text>
        <Text style={styles.col3} >{Math.round(parseInt(arrVoucher.payment))||0}</Text>
        <Text style={styles.col4} >{Math.round(parseInt(arrVoucher.receipt))||0}</Text>
      </View>
    );
  }
}

export default LedgerReportPdf;

const styles = StyleSheet.create({
  tableRow : {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
  },
  col1: {
    width: "20%",
    fontSize:10,
  },
  col2: {
    width: "50%",
    fontSize:10,
  },
  col3: {
    width: "15%",
    fontSize:10,
    textAlign: "right",
  },
  col4: {
    width: "15%",
    textAlign: "right",
    fontSize:10,
  },

  page: {
    backgroundColor: '#fbfbfc',
    padding:20,
    flexDirection:'column'
  },
  top:{    
    backgroundColor:  '#fa6a44',
    padding:10
  },
  container1: {
    backgroundColor: '#eaeaea' ,
    flexDirection: 'row',
    justifyContent:'space-between',
    padding: 5,
  }, 
  sectionTopRight:{
    paddingVertical: 5,
    flexDirection:'column',
    justifyContent: "center"
  },
  box:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding: 2,
  },
  left:{
    fontSize:10,
    textAlign:'right',
  },
  right:{
    fontSize:10,
    textAlign:'left',
    paddingHorizontal:10,
    fontFamily: 'Roboto'
  },
  address:{
    color:'#034a7e',
    fontSize:10,
    fontFamily: "Roboto",
  },
  headerTxt:{
    fontSize:13,
    fontFamily: "Roboto",
  },
  bold :{
    fontFamily: "Roboto",
  }
})