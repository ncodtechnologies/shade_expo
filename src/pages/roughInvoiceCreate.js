import React, { Component } from 'react';
import Nav from '../NavBar';

class App extends Component {
    state = {
        data: []
    };
    
    componentDidMount() {
        
    }

    render() {
    return (
        <div>
            <Nav />

            <div class="content-wrapper">
                <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">Second Page</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active">Starter Page</li>
                        </ol>
                    </div>
                    </div>
                </div>
                </div>
                
                <div class="content">
                <div class="container-fluid">
                    <div class="row">
                    <div class="col-md-6">

            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Quick Example</h3>
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