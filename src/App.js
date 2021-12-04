import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const response = await fetch('https://api.tokensets.com/public/v2/portfolios');
    if (response) {
      const data = await response.json();
      console.log(response);
      console.log(data.portfolios);
      // console.log(allusers[0]);
      this.setState({
        isLoaded: true,
        tokens: [...data.portfolios],
      });
    }
  };

  render() {
    let { isLoaded, tokens } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="userlist">
          <ul>
            {tokens.map(token => (
              <li key={token.id}>
                {token.symbol} {token.name} {token.address} 
              </li>
            ))} 
          </ul>
        </div>
      );
    }
  }
}

export default App;
