import React, { Component } from 'react';
import './App.css';
import AuthServices from "./service/auth/auth-services";
import { Switch, Route } from "react-router-dom";
import LogIn from "./component/login"
import SignUp from "./component/signup";
import Navigation from './component/navigation'
import Channel from "./component/channel"
import Home from "./component/home"
import StreamRanking from "./component/streamRanking"
import Profile from "./component/Profile"
import StreamDetail from "./component/StreamDetail"
import Random from './component/random';
import BotForm from './component/BotForm';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null, message: "", isDetailed:true };
    this.services = new AuthServices();
  }
  setUser = userObj => this.setState({ loggedInUser: userObj });
  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.services.loggedin()
        .then(response => this.setState({ loggedInUser: response }))
        .catch(err => {
          this.setState({ loggedInUser: false });
        });
    }
  };
 
  setUser = userObj => this.setState({ loggedInUser: userObj });

  render() {

    this.fetchUser();

    if (!this.state.loggedInUser) {
      return (
        <div className="app">
          <div className="logged-out ">
            <Navigation
              userInSession={this.state.loggedInUser}
              setTheUser={this.setUser}
            />

            <Switch>
              <Route
                path="/signup" exact
                render={() => <SignUp setTheUser={this.setUser} />}
              />

              <Route
                path="/login" exact
                render={() => <LogIn setTheUser={this.setUser} />}
              />
              <Route path="/logout" />
              <Route path="/" exact component={Home} />
            </Switch>
          </div>
        </div>
      );
    } else {
      
      return (
        <div className="app">
          <div className="app">
            <Navigation
              userInSession={this.state.loggedInUser}
              setTheUser={this.setUser}
            />
            <div className="logged-in">
              <div className="container">
                <Switch>
                  <Route
                    path="/ranking/streamDetails/:id"
                    component={StreamDetail}
                  />
                  <Route
                    path="/profile"
                    exact
                    render={() => (
                      <Profile loggedUser={this.state.loggedInUser} />
                    )}
                  />
                  <Route path="/bot" exact component={BotForm} />
                  <Route
                    path="/ranking"
                    exact
                    component={() => (
                      <StreamRanking
                        loggedUser={this.state.loggedInUser}
                      />
                    )}
                  />
                  <Route path="/" exact component={Random} />

                  <Route path="/channel/:id" exact component={Channel} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
