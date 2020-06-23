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
            <View style={styles.sectionTopRight}>
              <View style={styles.box}>
                  <Text style={styles.left}>INVOICE NO </Text>
                  <Text style={styles.right}>{props.invoice_no}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.left}>DATE</Text>
                  <Text style={styles.right}>{props.date}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.left}>ORDER NO</Text>
                  <Text style={styles.right}>{props.order_no}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.left}>ORDER DATE </Text>
                  <Text style={styles.right}>{props.buyer_date}</Text>
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
                <View style={{paddingHorizontal:10,width:'50%'}}>
                <Text style={styles.dataTitle}>Country of origin of goods</Text>
                <Text style={styles.address}>{props.country_origin}</Text>
                    <Text style={styles.dataTitle}>Other references</Text>
                    <Text style={styles.address}>{props.other}</Text>
                    <Text style={styles.dataTitle}>Buyer(If other than consignee)</Text>
                    <Text style={styles.address}>{props.buyer}</Text>
                    <Text style={styles.dataTitle}>Terms of delivery & payment</Text>
                    <Text style={styles.address}>{props.pre_carriage}</Text>
                    <Text style={styles.dataTitle}>AWB No</Text>
                    <Text style={styles.address}>{props.receipt_place}</Text>
                </View>
            </View>
            <View style={styles.section}>
              <View style={{flexDirection:'column',paddingHorizontal:10}}>
                <Text style={styles.dataTitle}>Country of final destination</Text>
                <Text style={styles.address}>{props.country_final}</Text>
                <Text style={styles.dataTitle}>Pre_carriage by</Text>
                <Text style={styles.address}>{props.pre_carriage}</Text>
                <Text style={styles.dataTitle}>Place of receipt by pre_carrier</Text>
                <Text style={styles.address}>{props.receipt_place}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <View style={styles.sectionRow}>
                    <Text style={styles.dataTitle}>Vessel / Flat no</Text>
                    <Text style={styles.address}>{props.vessel_no}</Text>
                    <Text style={styles.dataTitle}>Port of loading</Text>
                    <Text style={styles.address}>{props.port_load}</Text>
                    <Text style={styles.dataTitle}>Marks & No.s</Text>
                    <Text style={styles.address}>{props.marks}</Text>
                </View>
                <View style={styles.sectionRow}>
                    <Text style={styles.dataTitle}>Port of discharge</Text>
                    <Text style={styles.address}>{props.port_discharge}</Text>
                    <Text style={styles.dataTitle}>Final destination</Text>
                    <Text style={styles.address}>{props.final_destination}</Text>
                    <Text style={styles.dataTitle}>Container No</Text>
                    <Text style={styles.address}>{props.container_no}</Text>
                </View>
                </View>
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
                  <Text style={styles.right}>{props.discount}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.left}>NET TOTAL {props.bill_to}</Text>
                  <Text style={styles.right}>5070.00 {props.less_discount}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.left}>OLD BALANCE {props.bill_to}</Text>
                  <Text style={styles.right}>0.00 {props.tax}</Text>
              </View>
              <View style={styles.box}>
                  <Text style={styles.leftBalance}>BALANCE {props.due}</Text>
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
    justifyContent:'space-between',
  },  
  container2: {
    flexDirection: 'row',
    justifyContent:'space-between',
    borderWidth:1
  },   
  container3: {
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  section: {    
    margin: 10,
    padding: 10,
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