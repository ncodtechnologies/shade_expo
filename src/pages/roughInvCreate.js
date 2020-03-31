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
        <div>
            <Nav />        
            <div class="content-wrapper">
                
                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1>Simple Tables</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Simple Tables</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                </section>

                <div class="content">
                 <div class="container-fluid">
                  <div class="row">                    
                    <div class="col-lg-12">

                    <div class="card card-warning">
                        <div class="card-header">
                                <h3 class="card-title">General Elements</h3>
                        </div>
                        
                        <div class="card-body">
                            <form >
                                

                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>Date masks:</label>

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
                                        <textarea class="form-control" rows="3" placeholder="Enter ..."></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>Consignee</label>
                                        <textarea class="form-control" rows="3" placeholder="Enter ..." ></textarea>
                                    </div>
                                </div>
                            </div> 

                                                       
                            </form>
                          </div>
                        </div>
                     </div>
                  </div>
                </div>
             </div>
          </div>
          <div class="content-wrapper">

                  <div class="content">
                  <div class="container-fluid">
                    <div class="row">
                      
                    <div class="col-lg-12">
                  <div class="card">
                    <div class="card-header">
                      <h3 class="card-title">Invoice</h3>

                      <div class="card-tools">
                        <ul class="pagination pagination-sm float-right">
                          <li class="page-item"><a class="page-link" href="#">«</a></li>
                          <li class="page-item"><a class="page-link" href="#">1</a></li>
                          <li class="page-item"><a class="page-link" href="#">2</a></li>
                          <li class="page-item"><a class="page-link" href="#">3</a></li>
                          <li class="page-item"><a class="page-link" href="#">»</a></li>
                        </ul>
                      </div>
                    </div>
                    <div class="card-body p-0">
                      <table class="table">
                        <thead>
                          <tr>
                            <th style={{width: '10'}}>No</th>
                            <th>Item</th>
                            <th>Kg</th>
                            <th>Box</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Item1</td>
                            <td>1.</td>
                            <td>10</td>
                            <td>20</td>
                            <td>200</td>
                           </tr>
                           <tr>
                            <td>Item2</td>
                            <td>2.</td>
                            <td>20</td>
                            <td>20</td>
                            <td>400</td>
                           </tr>
                           <tr>
                            <td>Item3</td>
                            <td>3.</td>
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