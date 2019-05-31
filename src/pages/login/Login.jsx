import React, { Component } from 'react';
import PropTypes from 'prop-types';
import registry from 'app-registry';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError:''
    };
    this.doLogin = this.doLogin.bind(this);
}
  doLogin = (event) => {
    event.preventDefault();
    const { username, password } = event.target;
    const userCredentails = {
      username: username.value,
      password: password.value
    }
    this.props.doLogin(userCredentails);
  }

  componentWillMount(){
    const token = registry.get('storage').getItem('token');  
    if (token !== null) {
      this.context.router.history.push('/home');
    }
  }

  render() {
    const {loginError}=this.props;
    return (
      <div className="login">
        <div className="loginWrapper">
          <div className="logoContainer">
            <div className="row m-0 mb-3">
              <div className="loginLogo w-100 centered mb-5">
                <img src={require('../../images/Mekanate-Logo-Vertical-White.png')} alt="" className="" />
              </div>
            </div>
            <div className="row m-0">
              <div className="loginCredentials mt-3">
                <form action="#" className="centered" autoComplete="off" onSubmit={(event) => this.doLogin(event)}>
                  <div className="form-group w-100">
                    <input type="email" className="form-control" id="username" placeholder="Username" required>
                    </input>
                  </div>
                  <div className="form-group w-100">
                    <input type="password" className="form-control" id="password" placeholder="Password" required>
                    </input>
                  </div>
                  <button type="submit" className="btn mt-3">Submit</button>
                  <p style={{color:'red', fontWeight:'bold'}} className="mt-3">{loginError}</p>
                </form>
              </div>
            </div>
          </div>        
        </div>
        <div className="backgroundImage">
          <img src={require('../../images/background.png')} alt="" className="" />
        </div>
      </div>      
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Login;