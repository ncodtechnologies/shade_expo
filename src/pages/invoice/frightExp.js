import React, { Component } from 'react';
import { URL_FRIGHT_EXP_DT} from '../constants';

class FrightExp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FrightItems:[],
    }   
  }
  
  componentDidMount() {
    const id_invoice=this.props.id_invoice;
    this.FrightItems(id_invoice);
  }

  FrightItems = (id_invoice) => {
    fetch(URL_FRIGHT_EXP_DT + `/${id_invoice}`)
    .then(response => response.json())
    .then(data => this.setState({ FrightItems: data }));
  }
 
  render() {
   
    const tableFrightItem = this.state.FrightItems.map((FrightItem, index) =>
      <TableFrightItem
      FrightItem={FrightItem} rowIndex={index}
      />
    );
  
    const grandTotalLabour = this.state.FrightItems.reduce((a, b) => +a + +(b.amount), 0);
   
    return (
      <div >

        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12">
              <div class="card-header">
                <h3 class="card-title">Fright Items</h3>                
              </div>
                <div class="card card-info">
                  <div class="card-body p-0">
                    <table class="table">
                      <thead>                       
                        <tr>
                          <th style={{ width: '50%' }}>Name</th>
                          <th style={{ width: '50%' }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableFrightItem}
                      </tbody>
                      <tfoot>
                        <th>Total</th>
                        <th align="right" >{grandTotalLabour}</th>
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

class TableFrightItem extends React.Component {
  render() {
    let FrightItem = this.props.FrightItem;

    return (
      <tr>
        <td>{FrightItem.expense}</td>
        <td>{FrightItem.amount}</td>
      </tr>
    );
  }
}



export default FrightExp;