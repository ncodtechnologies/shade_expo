import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

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
const boxTotal = (items) => items.reduce((a, b) => +a + +(b.box), 0);

// Create Document Component
export const PdfRoughInvoice = (props) => (
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
                  <Text style={styles.left}>DATE</Text>
                  <Text style={styles.right}>{formatDate(props.date)}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.left} >PORT OF LOADING</Text>
                  <Text style={styles.right}>{(props.port_load == "0" || props.port_load == "--Select--") || props.port_load}</Text>
              </View>
           </View>
       </View>
       <View style={[styles.container2]}>
            <View style={styles.section}>
              <Text style={styles.addressTitle}>CONSIGNER</Text>
              <Text style={styles.address}>{getLedgerName(props.consigner,props.consigners)}</Text>
              <Text style={styles.address}>{props.consigner_address}</Text>
            </View>
       </View>
       <View style={[styles.container2]}>
            <View style={styles.section}>
              <Text style={styles.addressTitle}>CONSIGNEE {props.bill_to}</Text>
              <Text style={styles.address}>{getLedgerName(props.consignee,props.consignees)}</Text>
              <Text style={styles.address}>{props.consignee_address}</Text>
            </View>
       </View>
       
       <View style={styles.tableHeader}>
              <Text style={styles.col1} >PRODUCT</Text>
              <Text style={styles.col2} >BOX</Text>
              <Text style={styles.col2} >KG</Text> 
              <Text style={styles.col3} >TOTAL</Text>      
      </View>
      <View>
        <TableRows {...props}/>
       </View>
      <View style={styles.tableData}>
              <Text style={styles.col1} ></Text>
              <Text style={[styles.col2,{fontFamily:"Roboto"}]} >{boxTotal(props.invItems)}</Text>
              <Text style={[styles.col2,{fontFamily:"Roboto"}]} ></Text> 
              <Text style={[styles.col3,{fontFamily:"Roboto"}]} >{grandTotal(props.invItems)} KG</Text>      
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
                <Text style={styles.col3} >{total}</Text> 
       </View>
      )
    }

    Font.register({ family: 'Roboto', src: require("../../fonts/Roboto-Bold.ttf") });

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
    margin: 5,
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