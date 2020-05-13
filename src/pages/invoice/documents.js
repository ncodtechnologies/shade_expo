import React, { Component } from 'react';
import {URL_DOCUMENTS_SAVE, URL_DOCUMENTS_DT,URL_DOCUMENTS_DEL } from '../constants';
import SimpleReactValidator from 'simple-react-validator';

class Documents extends Component{
    constructor(props){
        super(props);
        this.state={
            remark:'',
            name:'',
            arrDocs:[
                {id_doc:'0', doc:'--Select'},
                {id_doc:'1', doc:'Document 1'},
                {id_doc:'2', doc:'Document 2'},
                {id_doc:'3', doc:'Document 3'},
            ],
            arrTable:[]
        }
        this.onChangeName    =this.onChangeName.bind(this);
        this.onChangeRemark =this.onChangeRemark.bind(this);
        this.validator = new SimpleReactValidator();
    }
    componentDidMount() {
      const id_invoice = this.props.id_invoice;
      this.loadDocumentsList(id_invoice);
    }
  
    onChangeName(event){
        this.setState({name:event.target.value})
    }

    onChangeRemark(event){
        this.setState({remark:event.target.value})
    }

    delDoc = (id_document) => {    
      fetch(URL_DOCUMENTS_DEL + `/${id_document}` )
      .then(response => response.json())
      .then(data => {
        if(data.length>0)
        this.setState({
          arrTable: data ,
          })
          }
        );
        const id_invoice = this.props.id_invoice;
        this.loadDocumentsList(id_invoice);
    }
  
     
    loadDocumentsList = (id_invoice) => {
      fetch(URL_DOCUMENTS_DT + `/${id_invoice}`)
      .then(response => response.json())
      .then(data => {
        if(data.length>0)
        this.setState({
          arrTable: data ,
          })
          }
        );
      //console.log(data)
    }
  
  
    saveDocument = () => {
      if (this.validator.allValid()) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
                  
                  id_invoice    : this.props.id_invoice ,
                  name          : this.state.name ,
                  remark        : this.state.remark ,
                })
    };
    fetch(URL_DOCUMENTS_SAVE, requestOptions)
        .then(response => response.json());
        this.loadDocumentsList(this.props.id_invoice);
      } 
      else
          {
          this.validator.showMessages();
          this.forceUpdate();
      }
  }
 
    render(){
       
        const tableRows =this.state.arrTable.map((tbl, index) => 
         <TableRow 
         tbl={tbl}
         arrDocs={this.state.arrDocs}
         delDoc={this.delDoc}
         />
        )
        return(
             <div >

        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12">
                <div class="card card-info">
                  <div class="card-body p-0">
                    <table class="table">
                      <thead>
                        <tr>
                          <th style={{ width: '40%' }}>
                            <select class="form-control" onChange={this.onChangeName} value={this.state.name}>
                              {this.state.arrDocs.map((docs) =>
                                <option>{docs.doc}</option>)}
                            </select>
                          </th>
                          <th style={{ width: '30%' }}>
                            <input type="text" onChange={this.onChangeRemark} value={this.state.remark}  class="form-control" />
                          </th>
                          <th> 
                              <button type="submit" class="btn btn-default">Select File
                              </button>                     
                          </th>
                          <th>
                            <button type="button"  class="btn btn-block btn-outline-success btn-flat" onClick={this.saveDocument}>
                              <i class="fas fa-plus"></i>
                            </button>

                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: '30%' }}>Documents</th>
                          <th style={{ width: '15%' }}>Remarks</th>
                          <th></th>
                          <th style={{ width: '10%' }} ></th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
        )
    }
}

class TableRow extends Component{
  

    render(){
        let tbl=this.props.tbl;
        let doc = (id_doc) => {
            return this.props.arrDocs.filter(function (el) {
              return el.id_doc == id_doc;
            })[0].doc;
          }

        return(
            <tr>
                <td>{tbl.name} </td>
                <td>{tbl.remarks}</td>
                <td></td>
                <td>
                    <div class="btn-group">
                        <button type="button" onClick={() => this.props.delDoc(tbl.id_document)} class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                      </div>
                </td>

            </tr>
        );
    }
}

export default  Documents;