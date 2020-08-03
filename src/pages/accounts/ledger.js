import React, { Component } from 'react';
import Nav from '../../NavBar';
import { Link } from 'react-router-dom';
import LedgerCreate from './ledgerCreate';
import Pagination from "react-js-pagination";

import { URL_LEDGER_GROUP_DT ,URL_LEDGER_BY_GROUP } from '../constants';

class LedgerGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      ledgerGroup: '0',
      activePage: 1,
      totalCount:'',
      arrLedgerGroup: [],
      arrLedgers: [],
    }    
    this.onLedgerGroupChange = this.onLedgerGroupChange.bind(this);
  }
 
  componentDidMount() {
    const id_ledger_group=this.state.ledgerGroup;    
    const activePage=this.state.activePage;
    this.loadLedgerGroup();
    this.loadLedgerList(id_ledger_group,activePage);
  }
  loadLedgerGroup(){
    fetch(URL_LEDGER_GROUP_DT)
    .then(response => response.json())
    .then(data => this.setState({ arrLedgerGroup: data }));
    //console.log(data)
  }

  loadLedgerList = (id_ledger_group,activePage) => {
    fetch(URL_LEDGER_BY_GROUP   + `/${id_ledger_group}` + `/${activePage}` )
    .then(response => response.json())
    .then(data => {
      //if(data.totalCount.length>0)
      this.setState({
        arrLedgers  : data.items,
        totalCount  : data.totalCount,
       })
    });
  }
  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber}
      , () => {
        const activePage=this.state.activePage;
        const id_ledger_group=this.state.ledgerGroup;
        this.loadLedgerList(id_ledger_group,activePage);
    });
  }
  delRow = (rowIndex) => {
    let _arrLedgers = this.state.arrLedgers;
    _arrLedgers.splice(rowIndex, 1);
    this.setState({
      arrLedgers: _arrLedgers
    })
  }

  onLedgerGroupChange = event => {
    this.setState({ ledgerGroup: event.target.value }
      , () => {
        const id_ledger_group=this.state.ledgerGroup;   
        const activePage=this.state.activePage;
        this.loadLedgerList(id_ledger_group,activePage);
    });   
  } 
 
  render() {
      const tableRows = this.state.arrLedgers.map((arrLedger, index) =>
      <TableRow
      arrLedger={arrLedger}
      />);

    return (
      
      <div class="wrapper" >
      <Nav />
      <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Ledger</h1>
                </div>
              </div>
            </div>
          </section>
        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12">
                <div class="card card-info">
                  <div class="card-body p-0">
                    <table class="table">
                      <thead> 
                      <tr>
                        <th colspan={6} >
                            <div class="row" >
                              <div class="col-sm-4">
                                  <div class="form-group">
                                  <label>Group</label>
                                    <select class="form-control" onChange={(e)=>this.onLedgerGroupChange(e)} value={this.state.ledgerGroup}>
                                    <option value=''>All</option>
                                      {this.state.arrLedgerGroup.map((types) =>
                                        <option value={types.id_ledger_group}>{types.name}</option>)}
                                    </select>
                                  </div>
                              </div>
                              <div class="col-sm-8">
                                  <div class="form-group float-right">
                                  <Link to="./ledgerCreate/0" class="btn btn-tool btn-sm">
                                      <button type="submit" class="btn btn-block btn-success btn-fla">Create</button>
                                    </Link> 
                                  </div>
                              </div>
                            </div>
                           
                          </th>
                          </tr>                      
                        
                        <tr>
                          <th style={{ width: '45%' }}>Name</th>
                          <th style={{ width: '25%' }}>Phone</th>
                          <th style={{ width: '30%' }}>Group</th>
                          <th style={{ width: '10%' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows}
                      </tbody>
                    </table>
                  </div>
                  <div class="card-footer clearfix">
                    <Pagination
                        innerClass="pagination pagination-sm float-right"
                          activePage={this.state.activePage}
                          itemsCountPerPage={10}
                          totalItemsCount={this.state.totalCount}
                          pageRangeDisplayed={5}
                          itemClass="page-item"
                          itemClassPrev="page-item"
                          itemClassNext="page-item"                      
                          itemClassFirst="page-item"
                          itemClassLast="page-item"                      
                          linkClass="page-link"
                          linkClassFirst="page-link"                      
                          linkClassPrev="page-link"
                          linkClassNext="page-link"
                          linkClassLast="page-link"
                          onChange={this.handlePageChange.bind(this)}
                        />      
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
    );
  }
}


class TableRow extends React.Component {


  delRow = () => {
    this.props.delRow(this.props.rowIndex);
  }

  render() {
    let arrLedger = this.props.arrLedger;
    return (
      <tr>
        <td>{arrLedger.account_head}</td>
        <td>{arrLedger.phone}</td>
        <td>{arrLedger.name}</td>
        <td>
          <div class="btn-group">
          <Link to={'./ledgerCreate/'+arrLedger.id_account_head} render={(props) => <LedgerCreate {...props}  id_ledger={this.props.match.params.id_ledger}/>} >
          <i class="fas fa-edit"></i>
         </Link>
          </div>
        </td>
      </tr>
    );
  }
}

export default LedgerGroup;