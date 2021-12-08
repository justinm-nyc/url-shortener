import React, { Component } from "react";
import "./App.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

const shortUrlPath = "http://127.0.0.1:80/";
class App extends Component {
  state = {
    url_input: null,
    full_url: null,
    short_url: null,
  };

  handleChange = (event) => {
    this.setState({ url_input: event.target.value });
  };

  onSubmit = async () => {
    this.setState({ full_url: null });
    this.setState({ short_url: null });

    const urlJSON = { full_url_input: this.state.url_input };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(urlJSON),
    };

    const response = await fetch("/new_url", config);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    if (body.fullURL && body.shortURL) {
      this.setState({ full_url: body.fullURL });
      this.setState({ short_url: shortUrlPath.concat(body.shortURL) });
    }

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <div className="container">
          <div className="mb-3">
            <label className="form-label">Full URL</label>
            <input
              required
              type="url"
              className="form-control"
              id="full_url_input"
              onChange={this.handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success"
            onClick={this.onSubmit}
          >
            Submit
          </button>

          {this.state.short_url && this.state.full_url && (
            <div>
              <p>{this.state.full_url}</p>
              <p>{this.state.short_url}</p>
              <CopyToClipboard text={this.state.short_url}>
                <button>Copy to clipboard</button>
              </CopyToClipboard>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
