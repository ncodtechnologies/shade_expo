import React, { Component } from 'react';
import Nav from '../NavBar';
import { Link, Redirect } from 'react-router-dom';
import {URL_USER_SAVE,URL_USER_EDIT} from './constants';
import PropTypes from 'prop-types';
import SimpleReactValidator from 'simple-react-validator';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      data:null,
      id_user: 0,
      username:'',
      password:'',
      access:[],
      items: [],
      accessList:[],
      checkedList:'',
      checkedItems: new Map(),
      hidediv: false,
      redirectToUsers : false,
      redirectToUsers : false,  
    }
    this.handleChange          = this.handleChange.bind(this);
    this.handleChangeUsername  = this.handleChangeUsername.bind(this);
    this.handleChangePassword  = this.handleChangePassword.bind(this);
    this.handleChangeConfirm   = this.handleChangeConfirm.bind(this);
    this.validator             = new SimpleReactValidator();
  }
  
  componentDidMount() {
    const id_user=this.props.match.params.id_user;
    if(id_user!=0)
    {
      this.loadUserDt(id_user);
      this.setState({id_user});
    }
  }

  loadUserDt = (id_user) => {
    fetch(URL_USER_EDIT + `/${id_user}`)
    .then(response => response.json())
    .then(data => 
      {
        if(data.length>0)

          this.setState(
              { 
                username          : data[0].username , 
                password          : data[0].password ,
                confirm           : data[0].password ,
                access            : data[0].access
              })
              var list=data[0].access.split(",")

              list.forEach(element => {
               {
                 const isChecked =true; 
                 console.log(element)
                 this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(element, isChecked) }));
                }
              
              });

      });
  }
  
saveUser = () => {
  
  if (this.validator.allValid()) {      
   const pass= this.state.password;
   const confirm = this.state.confirm;
  
   if(pass == confirm)  
   {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username          : this.state.username ,
        password          : this.state.password ,
        confirm           : this.state.confirm,
        access            : this.state.checkedList,
        id_user           : this.state.id_user,
       })
  };
  fetch(URL_USER_SAVE, requestOptions)
      .then(response => {
         response.json();
         this.setState({ redirect : true });
      });
    }
    else{
      this.setState({ hidediv:true})
    }
  } 
  else
   {
    this.validator.showMessages();
    this.forceUpdate();
  } 
}

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    const map = this.state.checkedItems;    
    
    const accessList= Array.from(map).filter(accessItem => {
      return accessItem[1] === true; 
     })
     
    const result  = Array.from(accessList, x => x[0]); 
    this.setState({checkedList:result.join()});
}
  
  handleChangeUsername (e){
    this.setState({ username:e.target.value.toUpperCase()})
  }

  handleChangePassword (e){
    this.setState({ password:e.target.value})
  }

  handleChangeConfirm (e){
    this.setState({ confirm:e.target.value})
  }

  render() {
    const checkboxes = [
      {
        key: '1',
        label: 'Voucher ',        
        name: 'Voucher',
      },
      {
        key: '2',
        label: 'Ledger Report',
        name: 'Ledger Report',
      },
      {
        key: '3',
        label: 'Cash Book ',
        name: 'Cash Book',
      },      
      {
        key: '4',
        label: 'Sundry Creditor ',
        name: 'Sundry Creditor',
      },      
      {
        key: '5',
        label: 'Sundry Debtor ',
        name: 'Sundry Debtor',
      },      
      {
        key: '5',
        label: 'Stock Report ',
        name: 'Stock Report',
      },      
      {
        key: '5',
        label: 'Notification ',
        name: 'Notification',
      },
    ];
    const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
      <input name={name}  type={type} checked={checked} onChange={onChange} />
    );
    Checkbox.propTypes = {
      name: PropTypes.string.isRequired,
      type: PropTypes.string,
      checked: PropTypes.bool,
      onChange: PropTypes.func.isRequired,
    }
    
    const { redirect, redirectToUsers } = this.state;

    if (redirect) {
      this.setState({redirect: false})
      return <Redirect to='/users'/>;
    }

    if (redirectToUsers) {
      this.setState({redirectToUsers: false})
      return <Redirect to={`/users/0/${this.props.match.params.id_user}`}/>;
    }

    return (
      <div class="wrapper" >
        <Nav />
        <div class="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>User Creation</h1>
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
                      <h3 class="card-title">User</h3>
                    </div>
                    <div class="card-body">
                      <form >                    
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label>Username</label> 
                              <input type="text" value={this.state.username} onChange={this.handleChangeUsername} class="form-control" />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label>Password</label> 
                              <input type="password" value={this.state.password} onChange={this.handleChangePassword} class="form-control" />
                            </div>
                          </div>
                        </div> 
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label>Confirm Password</label> 
                              <input type="password" value={this.state.confirm} onChange={this.handleChangeConfirm} class="form-control" />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12"> 
                            <div class="text-danger mr-1" id="results" hidden = {!this.state.hidediv}>
                              Confirm password didn't match.
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                            <label>Access</label> 
                              <React.Fragment>
                                {
                                  checkboxes.map(item => (
                                    <div>
                                      <label key={item.key}>
                                      <Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleChange} />
                                      &nbsp;&nbsp;{item.name}
                                      
                                      </label>
                                    </div>
                                  ))
                                }
                               
                              </React.Fragment>
                              </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                            <button type="button"  class="btn btn-block btn-success btn-flat" onClick={this.saveUser}>
                              Save
                            </button>
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
      </div>
    );
  }
}

export default App;
