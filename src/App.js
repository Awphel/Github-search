import React from 'react';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      name: '',
      image: '',
      repos: '',
      type: '',
      activity: [],
      username: 'toggl',
      placeholder:'Enter username'
    };
    // fix the this value
    this.getUser = this.getUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getActivity = this.getActivity.bind(this);
  }

  componentWillMount() {
    this.getUser();
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  getUser() {

    //Fetching general user info
    fetch(`https://api.github.com/users/${this.state.username}`, {
                 headers: {
                      'Accept' : 'application/vnd.github.v3+json'
                  }})
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      this.setState({name: data.name,
        image: data.avatar_url, repos: data.public_repos, type: data.type});
        console.log(data);
    })
    .catch(error => {
      console.log(error);
    });

    //Fetching the events array
    fetch(`https://api.github.com/users/${this.state.username}/events`,{
      headers: {
        'Accept' : 'application/vnd.github.v3+json'
      }
    })
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(eventsArray => {
      this.setState({activity: eventsArray});
      console.log(eventsArray);
    })
  }

  getActivity() {
    fetch(`https://api.github.com/users/${this.state.username}/events`,{
      headers: {
        'Accept' : 'application/vnd.github.v3+json'
      }
    })
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(eventsArray => {
      this.setState({activity: eventsArray});
      console.log(eventsArray);
    })
  }

  render() {
    return (
      <>
	<div className="container">
    <h1>Find Github user</h1>
    <div className="formField">
        <img className="userAvatar" alt='Profile' src={this.state.image}></img><br/>

      <input
        type="text"
        name="username"
        placeholder="Enter username here..."
        value={ this.state.username }
        onChange={ this.handleChange }
      /><br/>

      <button className="search-btn" value="Send" onClick={ this.getUser }>SEARCH GITHUB</button>

      </div>
	</div>
  <div className="userData">
      <h2>USER PROFILE</h2>
      <p>
        <b>Username</b>: <span>{this.state.name}</span>
      </p>
      <p>
        <b>Public Repos</b>: <span>{this.state.repos}</span>
      </p>
      <p>
        <b>Type</b>: <span>{this.state.type}</span>
      </p>
      <hr />
        <h2>USER ACTIVITY</h2>
        <div id="activity-box">
        <ul>
          {this.state.activity.map((item, index) => (
            <li className="project-list" key={index}>
              <b>{item.actor.login}</b> - {item.type}<br/>
              <span className="timestamp"> {item.created_at}</span>
            </li>
          ))}
        </ul>
        </div>
  </div>
  <
  style jsx global > {
    `@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;600&display=swap');

    h2 {
      color: #009dcf;
    }
    h1 {
      color: #222;
      letter-spacing: .5em;
    }
    hr {
      color: #f0f0f0;
    }
    li {
      line-height: 1.5em;
    }
    .container {
      width: 60%;
      height: inherit;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      padding: 1em;
      margin-top: 1em;
      font-family: 'Quicksand', 'Open Sans', 'Ubuntu';
    }
    .formField{
      float: left;
      width: 33.33%;
      display: flex-box;
      text-align: center;
      padding: 1em;
      margin-top: 3em;
      font-family: 'Quicksand', 'Open Sans', 'Ubuntu';
    }
    .userAvatar {
      width: 10em;
      margin-bottom: 2em;
      border-radius: .5em;
    }
    .userData {
      float: left;
      width: 33.33%;
      height: 400px;
      display: flex-box;
      overflow-y: scroll;
      padding: 1em;
      margin-top: 3em;
      border-left: 1px solid #c1c1c1;
      font-family: 'Quicksand', 'Open Sans', 'Ubuntu';
    }
    .search-btn {
      margin-top: 1em;
      margin-left: 0.5em;
      border: none;
      border-radius: .3em;
      transition: .3s;
      padding: .65em;
      width: 12em;
      color: #fff;
      background-color: #009dcf;
    }
    .search-btn:hover {
      opacity: .5;
    }
    .activity-box {
      display: table;
    }
    .timestamp {
      display: table-cell;
      color: #000099;
      font-size: .65em;
    }

     `
    } < /style>
    </>
    );
  }
}


export default App;
