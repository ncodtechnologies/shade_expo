import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const TableRows = (props) => {   
  return (
    props.invItems.map((invItem, index) =>
    <TableRow 
      {...invItem}
    />
  )
  )
}

// Create Document Component
export const PdfRoughInvoice = (props) => (
    <Document>
      <Page size="A4" style={styles.page}>
      <View style={styles.top}>
        </View>
        <View style={styles.container1}>
            <View style={styles.section}>
              <Text>MARIA AQUACON PVT LTD {props.invoice_no}</Text>
              <Text style={styles.address}>5-27, M-1. Maria Street, Kanyakumari Dist{props.invoice_no}</Text>
            </View>
            <View style={styles.sectionTopRight}>
              <View style={styles.box}>
                  <Text style={styles.left}>DATE</Text>
                  <Text style={styles.right}>{props.date}</Text>
              </View>
           </View>
       </View>
       <View style={styles.container2}>
            <View style={styles.section}>
              <Text style={styles.addressTitle}>BILL TO</Text>
              <Text style={styles.address}>{props.consigner}</Text>
              <Text style={styles.address}>{props.consigner_address}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.addressTitle}>CONSIGNEE {props.bill_to}</Text>
              <Text style={styles.address}>{props.consignee}</Text>
              <Text style={styles.address}>{props.consignee_address}</Text>
            </View>
       </View>
       <View style={styles.container2}>
            <View style={styles.section}>
                <Text style={styles.dataTitle}>Port of loading</Text>
                <Text style={styles.address}>{props.port_load}</Text>                  
            </View>           
       </View>
       <View style={styles.tableHeader}>
              <Text style={styles.col1} >{props.description}PRODUCT</Text>
              <Text style={styles.col2} >{props.price}KG</Text>
              <Text style={styles.col2} >{props.qty}BOX</Text> 
              <Text style={styles.col3} >{props.total}TOTAL</Text>      
      </View>
      <View>
        <TableRows {...props}/>
       </View>
      <View style={styles.tableData}>
              <Text style={styles.col1} >{props.pack_no}Total KG:</Text>
              <Text style={styles.col2} >{props.product}</Text>
              <Text style={styles.col2} >{props.kg}</Text> 
              <Text style={styles.col3} >{props.kg}</Text>      
      </View>
      <View style={styles.container3}>
           <View style={styles.sectionBottomRight}>
              <View style={styles.box}>
                  <Text style={styles.left}>SUBTOTAL {props.bill_to}</Text>
                  <Text style={styles.right}>0.00 {props.subtotal}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.left}>DISCOUNT {props.bill_to}</Text>
                  <Text style={styles.right}>{props.discount}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.left}>NET TOTAL {props.bill_to}</Text>
                  <Text style={styles.right}>0.00 {props.less_discount}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.left}>OLD BALANCE {props.bill_to}</Text>
                  <Text style={styles.right}>0.00 {props.tax}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.leftBalance}>BALANCE {props.due}</Text>
                  <Text style={styles.rightBalance}>0.00 {props.balance}</Text>
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
                <Text style={styles.col1} >{props.id_product}</Text>
                <Text style={styles.col2} >{props.box}</Text>
                <Text style={styles.col2} >{props.kg}</Text> 
                <Text style={styles.col3} >{total}</Text> 
       </View>
      )
    }
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
  fontSize:10,
  },
  dataTitle:{
  fontSize:10,
  },
  address:{
    paddingVertical:4,
    fontSize:10,
  },
  tableHeader: {
    flexDirection:"row",
    borderBottomWidth: 1,
    backgroundColor:'#fa6a44',
  },
  tableData: {
    flexDirection:"row",
    borderBottomWidth: 1,
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
  },
  col3 : {
    width: "25%",
    textAlign: "right",
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize:10,
  },
  
  sectionBottomRight:{
    paddingVertical: 5,
    flex: 1,
  },
  sectionTopRight:{
    paddingVertical: 5,
    flex: 1,
    flexDirection:'column',
  },
  box:{
    flexDirection:'row',
    flex:1,
    justifyContent:'space-between'
  },
  left:{
    flex:.6,
    fontSize:10,
    textAlign:'right',
  },
  leftBalance:{
    flex:.6,
    fontSize:16,
    textAlign:'right',
  },
  right:{
    flex:.4,
    fontSize:10,
    textAlign:'left',
    paddingHorizontal:10,
  },
  
  rightBalance:{
    flex:.4,
    paddingHorizontal:10,
    fontSize:20,
    backgroundColor:'#c6c6c6',
    textAlign:'left',
  },
});