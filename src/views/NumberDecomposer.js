import React from 'react';
import './NumberDecomposer.css';

class NumberDecomposer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "0",
      dividers: [],
      primeDividers: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.ClickDecompor.bind(this);
  }

  handleChange(event) {
    this.setState({ number: event.target.value });
  }

  ClickDecompor(event) {
    fetch('https://localhost:5001/NumberDecomposer/DecomposeNumber/' + this.state.number,
      {
        method: "GET",
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Access-Control-Allow-Origin': '*',
        }),
      }
    ).then(resp => {
      if (resp.ok) {
        resp.json().then(json => {
          console.log(json);
          var diveresResp = json;
          this.setState({ primeDividers: diveresResp.primeDividers })
          this.setState({ dividers: diveresResp.dividers })
        }).bind(this);
      }
    }).catch(err => {

    });
    event.preventDefault();
  }

  render() {
    return (
      <body className="NumberDecomposerBody">
        <div className="mainDiv">
          <label className="label">
            Informe o número desejado:
          </label>
          <input class="css-input" type="number" value={this.state.number} onChange={this.handleChange} />
          <button className="NumberDecomposerButtom" onClick={this.ClickDecompor.bind(this)}>Decompor</button>
          {this.state.dividers.length > 0 ?
            <div>
              <label className="label">Divisores:</label>
              {this.state.dividers.toString()}
              <label className="label">Divisores Primos:</label>
              {this.state.primeDividers.toString()}
            </div>
            : ''}


        </div>
      </body >
    );
  }
}

export default NumberDecomposer;
