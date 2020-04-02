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
          <section class="content">
            <div class="container-fluid">


              <div class="row">


                <div class="col-md-6">

                  <div class="card card-warning">

                    <div class="card-body">
                      <form role="form">
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label>Date</label>
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
                            <div class="form-group">
                              <label>Invoice No</label>
                              <input type="text" class="form-control" />
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
                    <div class="card-header">
                      <h3 class="card-title">Invoice</h3>
                    </div>
                    <div class="card-body p-0">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Description of goods</th>
                            <th style={{ width: '10%' }}>Quantity</th>
                            <th style={{ width: '10%' }}>Box</th>
                            <th style={{ width: '10%' }}>Total</th>
                            <th style={{ width: '10%' }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableRows}
                        </tbody>
                        <tfoot>
                          <td>Total</td>
                          <td>{kgTotal}</td>
                          <td>{boxTotal}</td>
                          <td align="right" >{grandTotal}</td>
                          <td></td>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <section class="content">
            <div class="container-fluid">
              <div class="card card-default">

                <div class="card-body">
                  <div class="row">


                  </div>

                  <h6>TOTAL AMOUNT IN RUPEES - FORTEEN THOUSAND REPEES ONLY</h6>
                  <div class="row">
                    <div class="col-12 col-sm-6">

                    </div>
                    <div class="col-12 col-sm-6">
                      <div class="form-group">


                      </div>

                    </div>

                  </div>

                </div>

                <div class="card-footer">

                </div>
              </div>
            </div>
          </section>

        </div>

      </div>
    );
  }
}

class TableRow extends React.Component {

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

export default App;