import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create Document Component
export const PdfInvoice = (props) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.top}>
        </View>
        <View style={styles.container1}>
            <View style={styles.section}>
              <Text>MARIA AQUACON PVT LTD {props.invoice_no}</Text>
              <Text style={styles.address}>5-27, M-1. Maria Street, Kanyakumari Dist{props.invoice_no}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.address}>JA ELA, SRI LANKA{props.bill_to}</Text>
              <Text style={styles.address}>Phone :{props.bill_to}</Text>
              <Text style={styles.address}>Email :{props.bill_to}</Text>
            </View>
       </View>
       <View style={styles.container2}>
            <View style={styles.section}>
              <Text style={styles.addressTitle}>BILL TO {props.bill_to}</Text>
              <Text style={styles.address}>HONG ZHAN INTERNATIONAL (PVT) LTD {props.invoice_no}</Text>
              <Text style={styles.address}>No. 132, OREX CITY BUILDING, EKALA{props.bill_to}</Text>
              <Text style={styles.address}>JA ELA, SRI LANKA{props.bill_to}</Text>
              <Text style={styles.address}>Phone :{props.bill_to}</Text>
              <Text style={styles.address}>Email :{props.bill_to}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.addressTitle}>CONSIGNEE {props.bill_to}</Text>
              <Text style={styles.address}>HONG ZHAN INTERNATIONAL (PVT) LTD {props.invoice_no}</Text>
              <Text style={styles.address}>No. 132, OREX CITY BUILDING, EKALA{props.bill_to}</Text>
              <Text style={styles.address}>JA ELA, SRI LANKA{props.bill_to}</Text>
              <Text style={styles.address}>Phone :{props.bill_to}</Text>
              <Text style={styles.address}>Email :{props.bill_to}</Text>
            </View>
       </View>
       <View style={styles.tableHeader}>
              <Text style={styles.col1} >{props.description}DESCRIPTION</Text>
              <Text style={styles.col2} >{props.price}UNIT PRICE</Text>
              <Text style={styles.col2} >{props.qty}QTY</Text> 
              <Text style={styles.col3} >{props.total}TOTAL</Text>      
      </View>
      <View>
        <TableRow desc="Tomato Grouper" price="4.60" qty="15.00" total="69.00"/>
        <TableRow desc="Tomato Grouper" price="4.60" qty="15.00" total="69.00"/>
        <TableRow desc="Tomato Grouper" price="4.60" qty="15.00" total="69.00"/>
        <TableRow desc="Tomato Grouper" price="4.60" qty="15.00" total="69.00"/>
        <TableRow desc="Tomato Grouper" price="4.60" qty="15.00" total="69.00"/>
      </View>
      <View style={styles.tableData}>
              <Text style={styles.col1} >{props.pack_no}</Text>
              <Text style={styles.col2} >{props.product}Total KG:</Text>
              <Text style={styles.col2} >{props.kg}945.00</Text> 
              <Text style={styles.col3} >{props.kg}</Text>      
      </View>
      <View style={styles.container3}>
            <View style={styles.section}>
              <Text style={styles.bank}>Bank Detail{props.bill_to}</Text>
              <Text style={styles.address}>Account Name: MARIA INTERNATIONAL (PVT) LTD {props.invoice_no}</Text>
              <Text style={styles.address}>Account #098799971 Current{props.bill_to}</Text>
              <Text style={styles.address}>IFSC Code: ICIC0000942{props.bill_to}</Text>
              <Text style={styles.address}>Swift Code : ICICINBBCTS{props.bill_to}</Text>
              <Text style={styles.address}>Bank Name: ICICI BANK LTD :{props.bill_to}</Text>
              <Text style={styles.address}>Plaza Tower Main Road, Kottakkal ,Kerala{props.bill_to}</Text>
            </View>
            <View style={styles.sectionBottomRight}>
              <View style={styles.box}>
                  <Text style={styles.left}>SUBTOTAL {props.bill_to}</Text>
                  <Text style={styles.right}>5,470.00 {props.subtotal}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.left}>DISCOUNT {props.bill_to}</Text>
                  <Text style={styles.right}>0.00 {props.discount}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.left}>SUBTOTAL LESS DISCOUNT {props.bill_to}</Text>
                  <Text style={styles.right}>5070.00 {props.less_discount}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.left}>TAX RATE {props.bill_to}</Text>
                  <Text style={styles.right}>0.00 {props.tax}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.left}>SUBTOTAL {props.bill_to}</Text>
                  <Text style={styles.right}>5,470.00 {props.sub}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.left}>Balance Due {props.due}</Text>
                  <Text style={styles.rightBalance}>5,470.00 {props.balance}</Text>
              </View>
           </View>
            
       </View>
       <View style={styles.top}>
            </View>
      </Page>
    </Document>
  );
  const TableRow = (props) => {
    return (
      <View style={styles.tableData}>
              <Text style={styles.col1} >{props.desc}</Text>
              <Text style={styles.col2} >{props.price}</Text>
              <Text style={styles.col2} >{props.qty}</Text> 
              <Text style={styles.col3} >{props.total}</Text> 
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
    justifyContent:'space-between'
  },  
  container2: {
    flexDirection: 'row',
  },   
  container3: {
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  section: {    
    margin: 10,
    padding: 10,
  },
  addressTitle:{
  color:'#034a7e',
  borderBottomWidth:1,
  fontSize:10,
  fontWeight:'bold'
  },
  address:{
    paddingVertical:4,
    fontSize:10
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
    paddingVertical: 10,
    flex: 1,
  },
  box:{
    flexDirection:'row',
    flex:1,
    justifyContent:'space-between'
  },
  left:{
    flex:.5,
    fontSize:10,
    textAlign:'right',
  },
  right:{
    flex:.5,
    fontSize:10,
    borderBottomWidth:1,
    borderColor:'#c6c6c6',
    textAlign:'left',
  },
  
  rightBalance:{
    flex:.5,
    fontSize:20,
    borderTopWidth:1,
    backgroundColor:'#c6c6c6',
    textAlign:'left',
  },
});