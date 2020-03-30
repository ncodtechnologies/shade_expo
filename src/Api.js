import React, { Component } from 'react';

class App extends Component {
    state = {
        data: []
    };
    
    componentDidMount() {
        const url = "http://ncod.in/shade_expo/users";

        fetch(url)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    data: result
                })
            });
    }

    render() {
        const { data } = this.state;

        const result = data.map((entry, index) => {
            return <li key={index}>{entry.narration}</li>;
        });

        return <div className="container"><h1>List</h1><ul>{result}</ul></div>;
    }
}

export default App;