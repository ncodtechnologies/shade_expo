import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';


const grandTotalPacking = (packItems) => packItems.reduce((a, b) => +a + +(b.kg), 0);

// Create Document Component
export const PdfPackingList = (props) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View >
          <View style={{ flexDirection:"row", width:"100%" }}>
            <Text style={styles.heading}>Packing List</Text>
            <Text style={[styles.heading,{textAlign:"right",flex:1}]}>Invoice No: {props.invoice_no}</Text>
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
});