import React, { Component } from 'react';
import Nav from '../NavBar';
import DatePicker from 'react-date-picker';

class App extends Component {
    
    state = {
        data: [],
        title:'Table',
        date: new Date(),
      }
     
      onChange = date => this.setState({ date })
     

    componentDidMount() {
        
    }

    componentWillMount() {

    }

    render() {
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
                                                    <th style={{ width: '10px' }}>No</th>
                                                    <th>Item</th>
                                                    <th style={{ width: '10%' }}>Kg</th>
                                                    <th style={{ width: '10%' }}>Box</th>
                                                    <th style={{ width: '10%' }}>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1.</td>
                                                    <td>Item1</td>
                                                    <td>10</td>
                                                    <td>20</td>
                                                    <td>200</td>
                                                </tr>
                                                <tr>
                                                    <td>2.</td>
                                                    <td>Item2</td>
                                                    <td>20</td>
                                                    <td>20</td>
                                                    <td>400</td>
                                                </tr>
                                                <tr>
                                                    <td>3.</td>
                                                    <td>Item3</td>
                                                    <td>50</td>
                                                    <td>10</td>
                                                    <td>500</td>
                                                </tr>
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