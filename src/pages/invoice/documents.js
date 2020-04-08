import React, { Component } from 'react';
import DatePicker from 'react-date-picker';



class Documents extends Component{
    constructor(props){
        super(props);
        this.state={
            remark:'',
            doc:'',
            arrDocs:[
                {id_doc:'0', doc:'--Select'},
                {id_doc:'1', doc:'Document 1'},
                {id_doc:'2', doc:'Document 2'},
                {id_doc:'3', doc:'Document 3'},
            ],
            arrTable:[]
        }
        this.onChangeDoc    =this.onChangeDoc.bind(this);
        this.onChangeRemark =this.onChangeRemark.bind(this);
        this.onAddClick     =this.onAddClick.bind(this)
    }
    onChangeDoc(event){
        this.setState({doc:event.target.value})
    }

    onChangeRemark(event){
        this.setState({remark:event.target.value})
    }

    delRow = (rowIndex) => {
      let _arrTable = this.state.arrTable;
      _arrTable.splice(rowIndex, 1);
      this.setState({
        arrTable: _arrTable
      })
    }
  

    onAddClick(e){
        e.preventDefault();
        let data_=this.state.arrTable;
        data_.push({
            id_doc:this.state.doc,
            remark:this.state.remark
        })

        this.setState({
            arrTable:data_,
            remark:'',
            id_doc:0
        })
            
    }
 
    render(){
       
        const tableRows =this.state.arrTable.map((tbl, index) => 
         <TableRow 
         tbl={tbl}
         arrDocs={this.state.arrDocs}
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
                            <select class="form-control" onChange={this.onChangeDoc}>
                              {this.state.arrDocs.map((docs) =>
                                <option value={docs.id_doc}>{docs.doc}</option>)}
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
                            <button type="button"  class="btn btn-block btn-outline-success btn-flat" onClick={(e) => this.onAddClick(e)}>
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
    
  delRow = () => {
    this.props.delRow(this.props.rowIndex);
  }

    render(){
        let tbl=this.props.tbl;
        let doc = (id_doc) => {
            return this.props.arrDocs.filter(function (el) {
              return el.id_doc == id_doc;
            })[0].doc;
          }

        return(
            <tr>
                <td>{doc(tbl.id_doc)} </td>
                <td>{tbl.remark}</td>
                <td></td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline-success"><i class="fas fa-download"></i></button>
                        <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                      </div>
                </td>

            </tr>
        );
    }
}

export default  Documents;