import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';


const grandTotalPacking = (packItems) => packItems.reduce((a, b) => +a + +(b.kg), 0);

const getLedgerName = (id, array) => {
  if(id==0) return ""
  var newArray = array.filter(function (el) {
    return el.id_account_head == id
  });
  if(newArray.length == 0) return "";
  return newArray[0].account_head;
} 

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

// Create Document Component
export const PdfPackingList = (props) => (
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
        <View >
          <View style={{ flexDirection:"row", width:"100%" }}>
            <Text style={styles.heading}>Packing List</Text>
          </View>
          <TableRow pack_no="Pack No" name="Item" kg="Kg" bold head />
          {
          props.packItems.map((packItem, index) =>
            <TableRow 
              {...packItem}
            />
          )
          }
          <TableRow pack_no="" name="Total" kg={grandTotalPacking(props.packItems)} bold />
        </View>
      </Page>
    </Document>
  );
 
  const TableRow = (props) => { 
      return (
        <View style={styles.tableData}>
                <Text style={[styles.col1,props.bold && styles.bold, props.head && styles.tableHeader]} >{props.pack_no}</Text>
                <Text style={[styles.col2,props.bold && styles.bold, props.head && styles.tableHeader]} >{props.name}</Text>
                <Text style={[styles.col3,props.bold && styles.bold, props.head && styles.tableHeader]} >{props.kg}</Text> 
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
    flexDirection:'column',

  },
  heading: {
    fontSize: 12,
    fontFamily: "Roboto",
    marginVertical: 10,
    paddingHorizontal: 5
  },
  tableData: {
    flexDirection:"row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  col1 : {
    width: "20%",
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize:10,
  },
  col2 : {
    width: "60%",
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize:10,
    textAlign: "left",
  },
  col3 : {
    width: "20%",
    textAlign: "right",
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize:10,
  },
  bold: {
    fontFamily: "Roboto",
  },
  tableHeader: {
    backgroundColor:'#fa6a44',
  },
  //////////////////
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