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
      props.invItems.map((invItem, index) =>
      <TableRow 
        {...invItem}
        products={props.products}
      />
    )
    )
  }

const getLedgerName = (id, array) => {
  if(id==0) return ""
  var newArray = array.filter(function (el) {
    return el.id_account_head == id
  });
  if(newArray.length == 0) return "";
  return newArray[0].account_head;
} 

const getPlaceName = (id, array) => {
  if(id==0) return ""
  var newArray = array.filter(function (el) {
    return el.Id_place == id
  });
  if(newArray.length == 0) return "";
  return newArray[0].Place;
} 

const getPortName = (id, array) => {
  if(id==0) return ""
  var newArray = array.filter(function (el) {
    return el.Id_port == id
  });
  if(newArray.length == 0) return "";
  return newArray[0].Port;
} 

const getProductName = (id, array) => {
  if(id==0) return ""
  var newArray = array.filter(function (el) {
    return el.id_product == id
  });
  if(newArray.length == 0) return "";
  return newArray[0].name;
} 

const grandTotal = (items) => items.reduce((a, b) => +a + +(b.kg * b.box), 0);
const kgTotal = (items) => items.reduce((a, b) => +a + +(b.kg), 0);

// Create Document Component
export const PdfInvoice = (props) => (
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
                  <Text style={styles.left}>INVOICE NO </Text>
                  <Text style={styles.right}>{props.invoice_no}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.left}>DATE</Text>
                  <Text style={styles.right}>{formatDate(props.date)}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.left}>ORDER NO</Text>
                  <Text style={styles.right}>{props.order_no}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.left}>ORDER DATE </Text>
                  <Text style={styles.right}>{formatDate(props.buyer_date)}</Text>
              </View>
           </View>
       </View>
       <View style={[styles.container2,{borderBottom:1, borderColor:"#ccc"}]}>
            <View style={styles.section}>
              <Text style={styles.addressTitle}>BILL TO</Text>
              <Text style={styles.address}>{getLedgerName(props.consigner,props.consigners)}</Text>
              <Text style={styles.address}>{props.consigner_address}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.addressTitle}>CONSIGNEE {props.bill_to}</Text>
              <Text style={styles.address}>{getLedgerName(props.consignee,props.consignees)}</Text>
              <Text style={styles.address}>{props.consignee_address}</Text>
            </View>
       </View>
       <View style={styles.container2}>
            <View style={styles.section}>
                <Text style={styles.dataTitle}>Country of origin of goods:</Text>
                <Text style={styles.address}>{getPlaceName(props.country_origin,props.places)}</Text>
                <Text style={styles.dataTitle}>Place of receipt by pre_carrier:</Text>
                <Text style={styles.address}>{props.receipt_place}</Text>
                    <Text style={styles.dataTitle}>Vessel / Flat no:</Text>
                    <Text style={styles.address}>{props.vessel_no}</Text>                  
                    <Text style={styles.dataTitle}>Other references:</Text>
                    <Text style={styles.address}>{props.other}</Text>
                    <Text style={styles.dataTitle}>Buyer(If other than consignee):</Text>
                    <Text style={styles.address}>{props.buyer}</Text>
                    <Text style={styles.dataTitle}>Terms of delivery & payment:</Text>
                    <Text style={styles.address}>{props.pre_carriage}</Text>
                    <Text style={styles.dataTitle}>AWB No:</Text>
                    <Text style={styles.address}>{props.receipt_place}</Text>
            </View>
            <View style={styles.section}>
             <Text style={styles.dataTitle}>Country of final destination:</Text>
                <Text style={styles.address}>{getPlaceName(props.country_final,props.places)}</Text>
                <Text style={styles.dataTitle}>Pre_carriage by:</Text>
                <Text style={styles.address}>{props.pre_carriage}</Text>
                 <Text style={styles.dataTitle}>Port of loading:</Text>
                    <Text style={styles.address}>{getPortName(props.port_load,props.airports)}</Text>
                    <Text style={styles.dataTitle}>Marks & No.s:</Text>
                    <Text style={styles.address}>{props.marks}</Text>
                    <Text style={styles.dataTitle}>Port of discharge:</Text>
                    <Text style={styles.address}>{props.port_discharge}</Text>
                    <Text style={styles.dataTitle}>Final destination:</Text>
                    <Text style={styles.address}>{props.final_destination}</Text>
                    <Text style={styles.dataTitle}>Container No:</Text>
                    <Text style={styles.address}>{props.container_no}</Text>
            </View>
       </View>
       <View style={styles.tableHeader}>
              <Text style={styles.col1} >DESCRIPTION</Text>
              <Text style={styles.col2} >UNIT PRICE</Text>
              <Text style={styles.col2} >QTY</Text> 
              <Text style={styles.col3} >TOTAL</Text>      
      </View>
      <View>
        <TableRows {...props}/>
       </View>
      <View style={styles.tableData}>
              <Text style={styles.col1} ></Text>
              <Text style={styles.col2} ></Text>
              <Text style={[styles.col2,{fontFamily:"Roboto"}]} >{kgTotal(props.invItems)} kg</Text> 
              <Text style={[styles.col3,{fontFamily:"Roboto"}]} >$ {Math.round(grandTotal(props.invItems)*10)/10}</Text>      
      </View>
      <View style={styles.tableData}>
        <Text style={styles.colFull} >US Dollar {converter.toWords(grandTotal(props.invItems))} Only</Text>   
      </View>
      <View style={styles.container3}>
            <View style={styles.section}>
              <Text style={styles.bank}>Bank Detail{props.bill_to}</Text>
              <Text style={styles.address}>{`Account Name: MARIA INTERNATIONAL (PVT) LTD
              Account #098799971 Current
              IFSC Code: ICIC0000942
              Swift Code : ICICINBBCTS
              Bank Name: ICICI BANK LTD
              `}</Text>
            </View>
            <View style={styles.sectionBottomRight}>
              <View style={styles.box}>
                  <Text style={styles.left}>SUBTOTAL</Text>
                  <Text style={styles.rightBottom}>$ {Math.round(grandTotal(props.invItems)*10)/10}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.left}>DISCOUNT</Text>
                  <Text style={styles.rightBottom}>$ {props.discount}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.left}>NET TOTAL</Text>
                  <Text style={styles.rightBottom}>$ {Math.round(grandTotal(props.invItems)*10)/10-props.discount}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.left}>OLD BALANCE </Text>
                  <Text style={styles.rightBottom}>$ 0</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.leftBalance}>BALANCE</Text>
                  <Text style={styles.rightBalance}>$ {Math.round(grandTotal(props.invItems)*10)/10-props.discount}</Text>
              </View>
           </View>
            
       </View>
       <View style={styles.top}>
            </View>
      </Page>
    </Document>
  );
 
  
  const TableRow = (props) => { 
    let total =  props.box * props.kg
      return (
        <View style={styles.tableData}>
                <Text style={styles.col1} >{getProductName(props.id_product,props.products)}</Text>
                <Text style={styles.col2} >{props.box}</Text>
                <Text style={styles.col2} >{props.kg}</Text> 
                <Text style={styles.col3} >{Math.round(total*10)/10}</Text> 
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
    width: "45%",
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
    width: "25%",
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
    flex:.6,
    fontSize:10,
    textAlign:'right',
    fontFamily: 'Roboto'
  },
  leftBalance:{
    flex:.6,
    fontSize:13,
    textAlign:'right',
    fontFamily: 'Roboto'
  },
  right:{
    flex:.4,
    fontSize:10,
    textAlign:'left',
    paddingHorizontal:10,
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