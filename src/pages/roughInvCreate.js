import React, { Component } from 'react';
import Nav from '../NavBar';
import DatePicker from 'react-date-picker';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      title: 'Table',
      date: new Date(),
      products: [
        { Id_item:0, Items: '--Select--' },
        { Id_item:1, Items: 'Item 1' },
        { Id_item:2, Items: 'Item 2' },
        { Id_item:3, Items: 'Item 3' },
      ],
      invItems: [
      ]
    }
  }

  onDateChange = date => this.setState({ date })

  handleChangeKg = (e, rowIndex) =>  {
      let _invItems = this.state.invItems;
      let _row = _invItems[rowIndex];
      _row.kg = e.target.value;
      _invItems[rowIndex] = _row;
      this.setState({
        invItems: _invItems
      })
  }

  handleChangeBox = (e, rowIndex) =>  {
    let _invItems = this.state.invItems;
    let _row = _invItems[rowIndex];
    _row.box = e.target.value;
    _invItems[rowIndex] = _row;
    this.setState({
      invItems: _invItems
    })
  }

  handleChangeProduct = (e, rowIndex) =>  {
    let _invItems = this.state.invItems;
    let _row = _invItems[rowIndex];
    _row.id_item = e.target.value;
    _invItems[rowIndex] = _row;
    this.setState({
      invItems: _invItems
    })
  }
  
  delRow = (rowIndex) =>  {
    let _invItems = this.state.invItems;
    _invItems.splice(rowIndex, 1);
    this.setState({
      invItems: _invItems
    })
  }

  addRow = (e) =>  {
    let _invItems = this.state.invItems;
    let row = {
      id_item : e.target.value,
      kg : "",
      box : ""
    }
    _invItems.push(row);
    this.setState({
      invItems: _invItems
    })
  }

  render() {
    const tableRows = this.state.invItems.map((invItem,index) =>
      <TableRow 
        handleChangeKg={this.handleChangeKg}
        handleChangeBox={this.handleChangeBox} 
        handleChangeProduct={this.handleChangeProduct} 
        delRow={this.delRow} 
        invItem={invItem} rowIndex={index} 
        products={this.state.products}
        />
  );

    const grandTotal = this.state.invItems.reduce((a, b) => +a + +(b.kg*b.box), 0);
    const boxTotal = this.state.invItems.reduce((a, b) => +a + +(b.box), 0);
    const kgTotal = this.state.invItems.reduce((a, b) => +a + +(b.kg), 0);
  
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

                  <div class="card card-info">
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
                                  onChange={this.onDateChange}
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
                            <th style={{ width: '10%' }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          { tableRows }
                          <EmptyRow products={this.state.products} addRow={this.addRow} />
                        </tbody>
                        <tfoot>
                          <td></td>
                          <td>{ kgTotal }</td>
                          <td>{ boxTotal }</td>
                          <td align="right" >{ grandTotal }</td>
                          <td></td>
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

class TableRow extends Component {

	handleChangeKg = (e) => {
    this.props.handleChangeKg(e, this.props.rowIndex);
  }
  
	handleChangeBox = (e) => {
    this.props.handleChangeBox(e, this.props.rowIndex);
  }
  
	handleChangeProduct = (e) => {
    this.props.handleChangeProduct(e, this.props.rowIndex);
  }

	delRow = () => {
    this.props.delRow(this.props.rowIndex);
  }

	render() {
    let invItem = this.props.invItem;
    let total = invItem.kg * invItem.box;
		return (
      <tr>
        <td>
          <select class="form-control"  onChange={(e) => this.handleChangeProduct(e)} value={invItem.id_item} >
            {this.props.products.map((column) => <option value={column.Id_item}>{column.Items}</option>)}
          </select>
        </td>
        <td><input type="text" class="form-control" value={invItem.kg} onChange={(e) => this.handleChangeKg(e)} /></td>
        <td><input type="text" class="form-control"  value={invItem.box}  onChange={(e) => this.handleChangeBox(e)}  /></td>
        <td align="right" >{total}</td>
        <td>
            <button type="button"  onClick={this.delRow}  class="btn btn-success"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    );
	}
}

class EmptyRow extends Component {

	addRow = (e) => {
    this.props.addRow(e);
  }
  
	render() {
		return (
      <tr>
        <td>
          <select class="form-control"  onChange={(e) => this.addRow(e)} value={0} >
            {this.props.products.map((column) => <option value={column.Id_item}>{column.Items}</option>)}
          </select>
        </td>
        <td><input type="text" class="form-control" /></td>
        <td><input type="text" class="form-control" /></td>
        <td align="right" ></td>
        <td></td>
      </tr>
    );
	}
}

export default App;
