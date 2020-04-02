import React, { Component } from 'react';
import Nav from '../NavBar';
import DatePicker from 'react-date-picker';
import TableRow from "@material-ui/core/TableRow";

class App extends Component {

  state = {
    title: 'Table',
    date: new Date(),
    arrItems: [
      { Id_item:1, Items: 'Item 1' },
      { Id_item:2, Items: 'Item 2' },
      { Id_item:3, Items: 'Item 3' },
    ],
    
    invItems: [
      { id_item:1, kg : 10, box: 100 },
      { id_item:2, kg : 10, box: 100 },
      { id_item:3, kg : 10, box: 100 },
    ]
  }

  onChange = date => this.setState({ date })

  handleChangeKg = async function(e)  {
    await this.setState({
       kg: e.target.value
    })
    this.calcTotal();
}

handleChangeBox = async function(e) {

  await this.setState({
      box: e.target.value
    })
    this.calcTotal();
  }
    calcTotal(){
    
    if(this.state.kg=="" || this.state.box=="") return
    else    
    var kg_ = this.state.kg;
    var box_ = this.state.box;
    var tot = (kg_ * box_);
    
    this.setState({total:tot})
  }

  calcGrandTotal(){
    
  }

  componentDidMount() {

  }

  componentWillMount() {

  }
  
  render() {

    const tableRows = this.state.invItems.map((invItem) =>
      <TableRow items={invItem} />
    );
    
    const TableRow = (props) => (
      <tr>
        <td>
          
        </td>
            
        <td><input type="text" class="form-control" value={this.state.kg} onChange={(e) => this.handleChangeKg(e)} /></td>
        <td><input type="text" class="form-control"  value={this.state.box}  onChange={(e) => this.handleChangeBox(e)}  /></td>
        <td>{this.state.total}</td>
      </tr>
    );

    return (
      <div class="wrapper" >
        <Nav />
        <div class="content-wrapper">

          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Rough Invoice</h1>
                </div>
              </div>
            </div>
          </section>

          <div class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-12">

                  <div class="card card-success">
                    <div class="card-header">
                      <h3 class="card-title">New Rough Invoice</h3>
                    </div>
                    <div class="card-body">
                      <form >
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label>Date:</label>

                              <div class="input-group">
                                <div class="input-group-prepend">
                                  <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>
                                </div>
                                <DatePicker
                                  className={"form-control"}
                                  onChange={this.onChange}
                                  value={this.state.date}
                                  format={"dd/MM/yyyy"}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12">

                            <div class="form-group">
                              <label>Part of loading</label>
                              <select class="form-control">
                                <option>Cochin</option>
                                <option>Calicut</option>
                                <option>Thrissur</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-sm-12">

                            <div class="form-group">
                              <label>Consigner</label>
                              <textarea class="form-control" rows="3" placeholder="Consigner"></textarea>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label>Consignee</label>
                              <textarea class="form-control" rows="3" placeholder="Consignee" ></textarea>
                            </div>
                          </div>
                        </div>

                      </form>
                    </div>

                    <div class="card-header">
                      <h3 class="card-title">Invoice</h3>
                    </div>
                    <div class="card-body p-0">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th style={{ width: '10%' }}>Kg</th>
                            <th style={{ width: '10%' }}>Box</th>
                            <th style={{ width: '10%' }}>Total</th>
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

      </div>
    );
  }
}

export default App;