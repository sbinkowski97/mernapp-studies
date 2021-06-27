import './styles/App.scss';
import './styles/main.scss';
import React, {Component} from 'react';
import LoginPage from './layouts/loginPage';
import AdminTerminal from './layouts/adminTerminal';
import UserTerminal from './layouts/clientTerminal';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";


class App extends Component {
  
  state={
    amount:0,
    email:'',
    password:'',
    authToken:'',
    user:{
      name:'',
      lastName:'',
      userType:'',
      pesel:'',
      date:'',
      money:0,
    },
  };

  //funcs
  onChangeEmailHandler = (e) =>{
    this.setState({email:e.target.value});
  };

  onChangePasswordHandler = (e) =>{
    this.setState({password:e.target.value});
  };

  onSubmitHandler = (e) =>{
    e.preventDefault();
    const options = {
      method: 'post',
      url:`http://localhost:5000/api/auth`,
      data:{
        email:this.state.email,
        password:this.state.password
      }
    }
    const setToken = (val) =>{
      this.setState({authToken:val})
    } 
    const getToken = async () =>{
      const response = await axios(options);
      const token = await response.data.token;
      setToken(token);
    }

    getToken();
  };

  componentDidUpdate(){
    // //GET USER
    if(this.state.authToken != ''){
      const options = {
        method: 'get',
        url:`http://localhost:5000/api/auth`,
        headers:{
          'x-auth-token':this.state.authToken,
        }
      }
      
    const setUser = (data) =>{
      this.setState({
        user:data,
      });
    }

    const getUser = async () =>{
      const response = await axios(options);
      const data = response.data;
      setUser(data);
    }

      getUser();
    }

    

  }

  


  render(){
    const { email, password, authToken, amount } = this.state;
    const { money } = this.state.user;
    
    return(
      <>
      
      <div  className="app">
        <Router>
        {this.state.user.userType != '' ? <Redirect to={this.state.user.userType+`Terminal`}/> : <Redirect to='/'/>}
        <Switch>
          <Route exact path="/userTerminal">
            <UserTerminal money={money} authToken={authToken} amount={amount} />
          </Route>
          <Route exact path="/adminTerminal">
            <AdminTerminal authToken={authToken}/>
          </Route>
          <Route exact path="/">
          <LoginPage password={password} email={email} onChangeEmail={this.onChangeEmailHandler} onChangePassword={this.onChangePasswordHandler} onSubmitLogin={this.onSubmitHandler}/>
          </Route>
        </Switch>
        </Router>
      </div>
    </>
    )
  }
};

export default App;
