import React, { Component } from 'react';
import Nav from '../NavBar';
import DatePicker from 'react-date-picker';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: 'Table',
      date: new Date(),
      invItems: [
        { No: 1, Date: '05-01-2020', Id_consignee: 1 ,Consignee: 'Consignee 1'},
        { No: 2, Date: '05-03-2020', Id_consignee: 2 ,Consignee: 'Consignee 2'},
        { No: 3, Date: '15-01-2020', Id_consignee: 3 ,Consignee: 'Consignee 3'},
        { No: 4, Date: '20-01-2020', Id_consignee: 4 ,Consignee: 'Consignee 4'},
      ],
    }
  }

  
  render() {
    const tableRows = this.state.invItems.map((invItem, index) =>
      <TableRow      
        delRow={this.delRow}
        invItem={invItem} rowIndex={index}
       
      />
    );

    return (
      <div class="wrapper" >
        <Nav />
        <div class="content-wrapper">

          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-12">
                  <h1>Invoice</h1>
                </div>
              </div>
            </div>
          </section>
          <div class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card card-default">
                  <div class="card-header border-0">
                    <h3 class="card-title">Invoice</h3>
                    <div class="card-tools">
                      <a href="./invoice" class="btn btn-tool btn-sm">
                      <button type="submit" class="btn btn-primary">Create</button>
                      
                      </a>
                    </div>
                  </div>
                   
                    <div class="card-body p-0">
                      <table class="table">
                        <thead>
                          <tr>
                            <th style={{ width: '10%' }}>No</th>
                            <th style={{ width: '25%' }}>Date</th>
                            <th style={{ width: '55%' }}>Consignee</th>
                            <th style={{ width: '15%' }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableRows}
                        </tbody>
                        <tfoot>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td align="right" ></td>
                        </tfoot>
                      </table>
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


  editRow = () => {
    this.props.editRow(this.props.rowIndex);
  }

  render() {
    let invItem = this.props.invItem;
    return (
      <tr>
        <td>{invItem.No}</td>
        <td>{invItem.Date}</td>
        <td>{invItem.Consignee}</td>
        <td>
          <a href="./invoice" class="btn btn-tool btn-sm">
            <button type="button" onClick={this.editRow} class="btn btn-success">
               <i class="fas fa-edit"></i>
            </button>
          </a>
        </td>
      </tr>
    );
  }
}

export default App;