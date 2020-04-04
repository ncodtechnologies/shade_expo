import React, { Component } from 'react';
import Nav from '../NavBar';
import DatePicker from 'react-date-picker';
import Expenses from './expense'

class Invoice extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: 'Table',
      date: new Date(),
      products: [
        { Id_item: 0, Items: '--Select--' },
        { Id_item: 1, Items: 'Item 1' },
        { Id_item: 2, Items: 'Item 2' },
        { Id_item: 3, Items: 'Item 3' },
      ],
      invItems: [
        { id_item: 1, kg: 10, box: 100 },
        { id_item: 2, kg: 20, box: 200 },
        { id_item: 3, kg: 30, box: 300 },
        { id_item: 0, kg: "", box: "" },
      ],
      places: [
        { Id_place: 0, Place: '--Select--' },
        { Id_place: 1, Place: 'INDIA' },
        { Id_place: 2, Place: 'KSA' },
        { Id_place: 3, Place: 'US' },
      ],
    }
  }

  onDateChange = date => this.setState({ date })

  handleChangeKg = (e, rowIndex) => {
    let _invItems = this.state.invItems;
    let _row = _invItems[rowIndex];
    _row.kg = e.target.value;
    _invItems[rowIndex] = _row;
    this.setState({
      invItems: _invItems
    })
  }

  handleChangeBox = (e, rowIndex) => {
    let _invItems = this.state.invItems;
    let _row = _invItems[rowIndex];
    _row.box = e.target.value;
    _invItems[rowIndex] = _row;
    this.setState({
      invItems: _invItems
    })
  }

  handleChangeProduct = (e, rowIndex) => {
    let _invItems = this.state.invItems;
    let _row = _invItems[rowIndex];
    _row.id_item = e.target.value;
    _invItems[rowIndex] = _row;
    this.setState({
      invItems: _invItems
    })
  }

  delRow = (rowIndex) => {
    let _invItems = this.state.invItems;
    _invItems.splice(rowIndex, 1);
    this.setState({
      invItems: _invItems
    })
  }

  render() {
    const tableRows = this.state.invItems.map((invItem, index) =>
      <TableRow
        handleChangeKg={this.handleChangeKg}
        handleChangeBox={this.handleChangeBox}
        handleChangeProduct={this.handleChangeProduct}
        delRow={this.delRow}
        invItem={invItem} rowIndex={index}
        products={this.state.products}
      />
    );

    const grandTotal = this.state.invItems.reduce((a, b) => +a + +(b.kg * b.box), 0);
    const boxTotal = this.state.invItems.reduce((a, b) => +a + +(b.box), 0);
    const kgTotal = this.state.invItems.reduce((a, b) => +a + +(b.kg), 0);

    return (
        <div >

          <section class="content">
            <div class="container-fluid">


              <div class="row">


                <div class="col-md-6">

                  <div class="card card-warning">

                    <div class="card-body">
                      <form role="form">
                      
                        <div class="row">
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label>Invoice No</label>
                              <input type="text" class="form-control" />
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label>Invoice Date</label>
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
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label>Buyer's Order No</label>
                              <input type="text" class="form-control" />
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label>Buyer's Date</label>
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
                              <label>Other reference(s)</label>
                              <input type="text" class="form-control" />
                            </div>
                            <div class="form-group">
                              <label>Buyer (If other than consignee)</label>
                              <textarea type="text" class="form-control" />
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label>Country of origin of goods</label>
                              <select class="form-control">
                                {this.state.places.map((column) => <option value={column.Id_place}>{column.Place}</option>)}
                              </select>
                            </div>
                            <div class="form-group">
                              <label>Country of final destination</label>
                              <select class="form-control">
                                {this.state.places.map((column) => <option value={column.Id_place}>{column.Place}</option>)}
                              </select>
                            </div>
                            <div class="form-group">
                              <label>Terms of delivery and payment</label>
                              <textarea type="text" class="form-control" rows={2.8} />
                            </div>
                            <div class="form-group">
                              <label>AWB No.</label>
                              <input type="text" class="form-control" />
                            </div>

                          </div>
                        </div>

                      </form>
                    </div>

                  </div>


                </div>

                <div class="col-md-6">

                  <div class="card card-primary">

                    <form role="form">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label>Exporter</label>
                              <textarea type="text" class="form-control" rows={4} />
                            </div>
                            <div class="form-group">
                              <label>Consignee</label>
                              <textarea type="text" class="form-control" rows={4} />
                            </div>
                            <div class="form-group">
                              <label>Pre-Carriage by</label>
                              <input type="text" class="form-control" />
                            </div>
                            <div class="form-group">
                              <label>Place of receipt by Pre-Carrier</label>
                              <input type="text" class="form-control" />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label>Vessel/Flight No</label>
                              <input type="text" class="form-control" />
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label>Port of loading</label>
                              <select class="form-control">
                                {this.state.places.map((column) => <option value={column.Id_place}>{column.Place}</option>)}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label>Port of discharge</label>
                              <select class="form-control">
                                {this.state.places.map((column) => <option value={column.Id_place}>{column.Place}</option>)}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label>Final destination</label>
                              <select class="form-control">
                                {this.state.places.map((column) => <option value={column.Id_place}>{column.Place}</option>)}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label>Marks & No.s</label>
                              <input type="text" class="form-control" />
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label>Container No</label>
                              <input type="text" class="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

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
                            <th>Description of goods</th>
                            <th style={{ width: '10%' }}>Kg</th>
                            <th style={{ width: '10%' }}>Amount</th>
                            <th style={{ width: '10%' }}>Total</th>
                            <th style={{ width: '10%' }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableRows}
                        </tbody>
                        <tfoot>
                          <th>Total</th>
                          <th>{kgTotal}</th>
                          <th>{boxTotal}</th>
                          <th align="right" >{grandTotal}</th>
                          <th></th>
                        </tfoot>
                      </table>
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
          <select class="form-control" onChange={(e) => this.handleChangeProduct(e)} value={invItem.id_item} >
            {this.props.products.map((column) => <option value={column.Id_item}>{column.Items}</option>)}
          </select>
        </td>
        <td><input type="text" class="form-control" value={invItem.kg} onChange={(e) => this.handleChangeKg(e)} /></td>
        <td><input type="text" class="form-control" value={invItem.box} onChange={(e) => this.handleChangeBox(e)} /></td>
        <td align="right" >{total}</td>
        <td>
          <button type="button" onClick={this.delRow} class="btn btn-success"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    );
  }
}

class App extends Component {
  
	render() {
		return (
      <div class="wrapper" >
        <Nav />
        <div class="content-wrapper">

      <div class="col-md-12">
            <div class="card card-primary card-outline card-outline-tabs">
              <div class="card-header p-0 border-bottom-0">
                <ul class="nav nav-tabs" id="custom-tabs-three-tab" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" id="custom-tabs-three-home-tab" data-toggle="pill" href="#custom-tabs-three-home" role="tab" aria-controls="custom-tabs-three-home" aria-selected="true">Invoice</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="custom-tabs-three-profile-tab" data-toggle="pill" href="#custom-tabs-three-profile" role="tab" aria-controls="custom-tabs-three-profile" aria-selected="false">Documents</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="custom-tabs-three-messages-tab" data-toggle="pill" href="#custom-tabs-three-messages" role="tab" aria-controls="custom-tabs-three-messages" aria-selected="false">Expenses</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="custom-tabs-three-settings-tab" data-toggle="pill" href="#custom-tabs-three-settings" role="tab" aria-controls="custom-tabs-three-settings" aria-selected="false">Net Report</a>
                  </li>
                </ul>
              </div>
              <div class="card-body">
                <div class="tab-content" id="custom-tabs-three-tabContent">
                  <div class="tab-pane fade active show" id="custom-tabs-three-home" role="tabpanel" aria-labelledby="custom-tabs-three-home-tab">
                     <Invoice />
                  </div>
                  <div class="tab-pane fade" id="custom-tabs-three-profile" role="tabpanel" aria-labelledby="custom-tabs-three-profile-tab">
                     <Documents />
                  </div>
                  <div class="tab-pane fade" id="custom-tabs-three-messages" role="tabpanel" aria-labelledby="custom-tabs-three-messages-tab">
                     <Expenses />
                  </div>
                  <div class="tab-pane fade" id="custom-tabs-three-settings" role="tabpanel" aria-labelledby="custom-tabs-three-settings-tab">
                     <NetReport />
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


class Documents extends Component {

	render() {
		return (
      <div >
         Mauris tincidunt mi at erat gravida, eget tristique urna bibendum. Mauris pharetra purus ut ligula tempor, et vulputate metus facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas sollicitudin, nisi a luctus interdum, nisl ligula placerat mi, quis posuere purus ligula eu lectus. Donec nunc tellus, elementum sit amet ultricies at, posuere nec nunc. Nunc euismod pellentesque diam. 
      </div>
    );
  }
}

class NetReport extends Component {

	render() {
		return (
      <div >
         Mauris tincidunt mi at erat gravida, eget tristique urna bibendum. Mauris pharetra purus ut ligula tempor, et vulputate metus facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas sollicitudin, nisi a luctus interdum, nisl ligula placerat mi, quis posuere purus ligula eu lectus. Donec nunc tellus, elementum sit amet ultricies at, posuere nec nunc. Nunc euismod pellentesque diam. 
      </div>
    );
  }
}

export default App;
