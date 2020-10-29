import React, { Component } from 'react';

import {
    JsonToCsv,
    useJsonToCsv
  } from 'react-json-csv';

  class App extends Component {

    render() {
      const { saveAsCsv } = useJsonToCsv();
      const filename = 'Csv-file',
      fields = {
        "index": "Index",
        "guid": "GUID"
      },
      style = {
        padding: "5px"
      },
      data = [
        { index: 0, guid: 'asdf231234'},
        { index: 1, guid: 'wetr2343af'}
      ],
    text = "Convert Json to Csv";

    return <button onClick={()=>saveAsCsv({ data, fields, filename })}>
            useJsonToCsv
          </button>

    }
}

export default App;
