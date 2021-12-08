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

  isValidUrl(string) {
    const matchPattern =
      // eslint-disable-next-line no-useless-escape
      /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    return matchPattern.test(string);
  }

  onSubmit = async () => {
    if (!this.state.url_input) {
      alert("Uh oh! You need to enter a URL!");
      return false;
    }

    if (!this.isValidUrl(this.state.url_input)) {
      alert("Uh oh! You need to enter a valid URL!");
      return false;
    }

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
        <header className="App-header">
          <nav
            className="navbar navbar-dark bg"
            style={{ backgroundColor: "#F93943" }}
          >
            <div className="container-flex">
              <div className="row">
                <div className="col-3">
                  <img
                    alt="tiny-hand-gesture"
                    src="https://img.icons8.com/color/48/000000/tiny-skin-type-2.png"
                  />
                </div>
                <div className="col-9 px-0">
                  <h1 style={{ color: "#E6FDFF" }}>URL Chicito</h1>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div className="container justify-content-md-center py-4">
          <div className="row">
            <h4>Need to shorten a URL?</h4>
          </div>
          <div className="row">
            <h5 className="lead">
              Type or paste it into the box below then click 'Shorten!' to
              shorten it.
            </h5>
          </div>

          <div className="row justify-content-md-center py-2">
            <div className="col-6">
              <form>
                <input
                  required
                  type="url"
                  className="form-control"
                  id="full_url_input"
                  onChange={this.handleChange}
                />
              </form>
            </div>
            <div className="d-grid gap-2 col-2">
              <button
                type="submit"
                className="btn btn-dark"
                onClick={this.onSubmit}
              >
                Shorten!
              </button>
            </div>
          </div>

          {this.state.short_url && this.state.full_url && (
            <div className="row justify-content-md-center align-items-center my-4">
              <div className="col-6">
                <p className="mb-0">
                  <strong>{"URL Chicito: "}</strong>
                  {this.state.short_url}
                </p>
              </div>
              <div className="d-grid gap-2 col-2">
                <CopyToClipboard text={this.state.short_url}>
                  <button
                    type="submit"
                    className="btn btn-dark"
                    onClick={this.onSubmit}
                  >
                    Copy
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
