import React, { Component } from 'react';
import { URL_CASHBOOK_OP, URL_CASHBOOK_CREDIT, URL_CASHBOOK_DEBIT, URL_LEDGER_EDIT_DT } from '../constants';
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

class CashBookPdf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      dateFrom: new Date(),
      dateTo: new Date(),
      id_ledger: '',
      ledger: '',
      op: '',
      activePage: 1,
      totalCountDebit:'',
      totalCountCredit:'',
      arrLedger: [],
      arrCreditVouchers: [],
      arrDebitVouchers: [],
      totalDebit: 0,
      totalCredit: 0,
    }

    this.loadCashBook = this.loadCashBook.bind(this);
  }

  componentDidMount() {
    const dateFrom = this.props.match.params.from_date;
    const dateTo = this.props.match.params.to_date;
    const id_account_head = this.props.match.params.id_account_head;

    this.setState({
      dateFrom, dateTo
    })
    this.loadAccountHead(id_account_head);
    this.loadCashBook(dateFrom,dateTo,id_account_head)
  }

  loadCashBook = (_dateFrom, _dateTo, id_account_head) => {
    const activePage="0/0";
    this.loadCredit(_dateFrom, _dateTo, id_account_head,activePage);
    this.loadDebit(_dateFrom, _dateTo, id_account_head,activePage);
    this.loadOp(_dateFrom, id_account_head);
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

  loadCredit = (_dateFrom, _dateTo, id_account_head,activePage) => {
    
    fetch(URL_CASHBOOK_CREDIT + `/'${_dateFrom}'` + `/'${_dateTo}'` + `/${id_account_head}`+ `/${activePage}` )
      .then(response => response.json())
      .then(data => {
          this.setState({
            arrCreditVouchers: data.items || [],
            totalCountCredit:data.totalCountCredit,
            totalCredit: data.totalCredit,
          })
      }
      );
  }

  loadDebit = (_dateFrom, _dateTo, id_account_head,activePage) => {
    fetch(URL_CASHBOOK_DEBIT + `/'${_dateFrom}'` + `/'${_dateTo}'` + `/${id_account_head}`+ `/${activePage}` )
      .then(response => response.json())
      .then(data => {
          this.setState({
            arrDebitVouchers: data.items || [],
            totalCountDebit:data.totalCountDebit,
            totalDebit: data.totalDebit,
          })
        }
      );
  }

  loadOp = (_dateFrom, id_account_head) => {
    fetch(URL_CASHBOOK_OP + `/'${_dateFrom}'` + `/${id_account_head}`)
      .then(response => response.json())
      .then(data => {
          this.setState({
            op: data ? data[0].balance : 0
          })
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


  render() {
    const tableCreditRows = this.state.arrCreditVouchers.map((arrVoucher, index) =>
      <TableCreditRow
      arrVoucher={arrVoucher}
      />);
    const tableDebitRows = this.state.arrDebitVouchers.map((arrVoucher, index) =>
      <TableDebitRows
        arrVoucher={arrVoucher}
      />);

    const creditTotal = this.state.totalCredit;
    const debitTotal = this.state.totalDebit;
    const balance     = this.state.op + debitTotal - creditTotal;
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
                          <Text style={[styles.right,{ textDecoration: 'underline' }]}>CASH BOOK</Text>
                      </View>
                      <View style={styles.box}>
                          <Text style={styles.right}>{this.state.ledger}</Text>
                      </View>
                      <View style={styles.box}>
                          <Text style={styles.right}>{`${this.state.dateFrom} to ${this.state.dateTo}`}</Text>
                      </View>
                  </View>
              </View>

              <Text style={styles.txtBalance}>Opening Balance: {Math.round(parseInt(this.state.op))||0}</Text>

              <View style={styles.tblContainer}>
                <View style={styles.tblWrapper}> 
                    <View style={[styles.tableRow, styles.bg]}>
                      <Text style={[styles.col1, styles.bold]} >DATE</Text>
                      <Text style={[styles.col2, styles.bold]} >NAME</Text>
                      <Text style={[styles.col3, styles.bold]} >PARTICULARS</Text>
                      <Text style={[styles.col4, styles.bold]} >RECEIPT</Text>
                    </View>
                    {tableDebitRows}
                    <View style={styles.tableRow}>
                      <Text style={[styles.col1, styles.bold]} ></Text>
                      <Text style={[styles.col2, styles.bold]} >Total</Text>
                      <Text style={[styles.col3, styles.bold]} ></Text>
                      <Text style={[styles.col4, styles.bold]} >{debitTotal}</Text>
                    </View>
                </View>

                <View style={styles.tblWrapper}> 
                    <View style={[styles.tableRow, styles.bg]}>
                      <Text style={[styles.col1, styles.bold]} >DATE</Text>
                      <Text style={[styles.col2, styles.bold]} >NAME</Text>
                      <Text style={[styles.col3, styles.bold]} >PARTICULARS</Text>
                      <Text style={[styles.col4, styles.bold]} >PAYMENT</Text>
                    </View>
                    {tableCreditRows}
                    <View style={styles.tableRow}>
                      <Text style={[styles.col1, styles.bold]} ></Text>
                      <Text style={[styles.col2, styles.bold]} >Total</Text>
                      <Text style={[styles.col3, styles.bold]} ></Text>
                      <Text style={[styles.col4, styles.bold]} >{creditTotal}</Text>
                    </View>
                </View>
              </View>

              <Text style={styles.txtBalance}>Closing Balance: {Math.round(parseInt(balance))||0}</Text>

              <View style={styles.top}></View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    );
  }
}

class TableDebitRows extends React.Component {
  render() {
    let arrVoucher = this.props.arrVoucher;

    return (
      <View style={styles.tableRow}>
        <Text style={styles.col1} >{arrVoucher.date}</Text>
        <Text style={styles.col2} >{arrVoucher.name}</Text>
        <Text style={styles.col3} >{arrVoucher.narration}</Text>
        <Text style={styles.col4} >{Math.round(parseInt(arrVoucher.debit))||0}</Text>
      </View>
    );
  }
}


class TableCreditRow extends React.Component {
  render() {
    let arrVoucher = this.props.arrVoucher;

    return (
      <View style={styles.tableRow}>
        <Text style={styles.col1} >{arrVoucher.date}</Text>
        <Text style={styles.col2} >{arrVoucher.name}</Text>
        <Text style={styles.col3} >{arrVoucher.narration}</Text>
        <Text style={styles.col4} >{Math.round(parseInt(arrVoucher.credit))||0}</Text>
      </View>
    );
  }
}


export default CashBookPdf;

const styles = StyleSheet.create({
  tblContainer : {
    flexDirection: "row",
  },
  tblWrapper : {
    width: "50%",
    padding: 5,
  },
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
    width: "30%",
    fontSize:10,
  },
  col3: {
    width: "30%",
    fontSize:10,
    textAlign: "right",
  },
  col4: {
    width: "20%",
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
  txtBalance:{
    fontSize:10,
    textAlign:'right',
    padding:10,
    width:"100%",
    fontFamily: 'Roboto',
    margin: 5,
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
  },
  bg: {
    backgroundColor : "#fa6a44"
  }
})