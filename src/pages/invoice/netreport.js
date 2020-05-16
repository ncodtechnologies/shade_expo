import React, { Component } from 'react';

class NetReport extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div >

        <div class="content">
          <div class="container-fluid">
            <div class="row">
            <div class="col-6">
                  <p class="lead">Sales</p>

                  <div class="table-responsive">
                    <table class="table">
                      <tbody><tr>
                        <th style={{width:"50%"}} >Sales Total:</th>
                        <td>$250</td>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <td>$250</td>
                      </tr>
                      <tr>
                        <th>Total (In Rupees):</th>
                        <td>Rs.17,500</td>
                      </tr>
                    </tbody></table>
                  </div>
                </div>
            <div class="col-6">
                  <p class="lead">Expenses</p>

                  <div class="table-responsive">
                    <table class="table">
                      <tbody><tr>
                        <th style={{width:"50%"}} >Freight Expenses:</th>
                        <td>Rs.5,000</td>
                      </tr>
                      <tr>
                        <th>Other Expenses</th>
                        <td>Rs.3,000</td>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <td>Rs.10,000</td>
                      </tr>
                    </tbody></table>
                  </div>
                </div>
          </div>
        </div>

      </div>
      </div>
    );
  }
}

export default NetReport;
