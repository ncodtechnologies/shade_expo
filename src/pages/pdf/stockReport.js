import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
var converter = require('number-to-words');

const formatDate = date => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [day, month, year].join('/');
}

const TableRows = (props) => {   
    return (
      props.arrVouchers.map((arrVoucher, index) =>
      <TableRow 
        {...arrVoucher}
      />
    )
    )
  }


const grandTotal = (items) => items.reduce((a, b) => +a + +(b.rate*b.stock), 0);
const stockTotal = (items) =>  items.reduce((a, b) => +a + +(b.stock), 0);

// Create Document Component
export const PdfStock = (props) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.top}>
        </View>
        <View style={styles.container1}>
            <View style={styles.section}>
              <Text>AQUASIGN EXPORTS</Text>
              <Text style={styles.address}>5-27, M-1. Maria Street, Kanyakumari Dist{props.invoice_no}</Text>
            </View>
            <View style={styles.sectionTopRight}>
              <View style={styles.box}>
                  <Text style={styles.left}>STOCK REPORT</Text>
              </View>
           </View>
       </View>


       <View style={styles.tableHeader}>
              <Text style={styles.col1} >PRODUCT</Text>
              <Text style={styles.col2} >STOCK</Text>      
              <Text style={styles.col3} >RATE</Text>      
              <Text style={styles.col4} >AMOUNT</Text>      
      </View>
      <View>
        <TableRows {...props}/>
      </View>
      <View style={styles.tableData}>
              <Text style={styles.col1} ></Text>
              <Text style={[styles.col2,{fontFamily:"Roboto"}]} >{Math.round(stockTotal(props.arrVouchers))}</Text>      
              <Text style={[styles.col3,{fontFamily:"Roboto"}]} ></Text>      
              <Text style={[styles.col4,{fontFamily:"Roboto"}]} >{Math.round(grandTotal(props.arrVouchers))}</Text>      
      </View>
      
       <View style={styles.top}>
        </View>
      </Page>
    </Document>
  );
 
  const TableRow = (props) => { 
      return (
        <View style={styles.tableData}>
                <Text style={styles.col1} >{props.product}</Text>
                <Text style={styles.col2} >{props.stock} {props.unit}</Text>
                <Text style={styles.col3} >{props.rate}</Text>
                <Text style={styles.col4} >{props.rate*props.stock}</Text> 
       </View>
      )
    }

    Font.register({ family: 'Roboto', src: require("../../fonts/Roboto-Bold.ttf") });
    Font.register({ family: 'Roboto-Italic', src: require("../../fonts/Roboto-BoldItalic.ttf") });

// Create styles
const styles = StyleSheet.create({
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
  },  
  container2: {
    flexDirection: 'row',
    justifyContent:'space-between',
  },   
  container3: {
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  section: {    
    margin: 10,
    padding: 10,
    paddingHorizontal:10,
    width:'50%',
  },
  section3rd: {    
    margin: 10,
    padding: 10,
    paddingHorizontal:10,
    width:'30%',
  },
  sectionRow: {    
    flexDirection:'column',
    margin: 10,
    padding: 10,
  },
  addressTitle:{
  color:'#034a7e',
  borderBottomWidth:1,
  borderColor: "#ccc",
  fontSize:10,
  fontFamily: "Roboto",
  },
  dataTitle:{
  fontSize:10,
  fontFamily: "Roboto",
  },
  address:{
    paddingVertical:4,
    fontSize:10,
    lineHeight: 2,
  },
  tableHeader: {
    flexDirection:"row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor:'#fa6a44',
    fontFamily: "Roboto",
  },
  tableData: {
    flexDirection:"row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  col1 : {
    width: "50%",
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize:10,
  },
  col2 : {
    width: "15%",
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize:10,
    textAlign: "right",
  },
  col3 : {
    width: "15%",
    textAlign: "right",
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize:10,
  },
  col4 : {
    width: "20%",
    textAlign: "right",
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize:10,
  },
  colFull : {
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize:10,
    fontFamily: "Roboto-Italic",
  },
  
  sectionBottomRight:{
    marginTop: 15,
    flex: 1,
    justifyContent:"center",
  },
  sectionTopRight:{
    paddingVertical: 5,
    flex: 1,
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
    fontFamily: 'Roboto',
    padding:5,
  },
  leftBalance:{
    flex:.6,
    fontSize:13,
    textAlign:'right',
    fontFamily: 'Roboto'
  },
  right:{
    fontSize:10,
    textAlign:'left',
  },
  rightBottom:{
    flex:.4,
    fontSize:10,
    textAlign:'right',
    paddingHorizontal:10,
    fontFamily: 'Roboto'
  },
  
  rightBalance:{
    flex:.4,
    paddingHorizontal:10,
    fontSize:13,
    textAlign:'right',
    fontFamily: 'Roboto'
  },
});