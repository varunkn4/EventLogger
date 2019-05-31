import { put } from 'redux-saga/effects';
import registry from 'app-registry';
import { replace as replaceRouter } from 'react-router-redux';

function* verifyAuth(action) {
    const request = registry.get('request');
    const storage = registry.get('storage');
  
    const uname = action.userCredentials.username;
    const pword = action.userCredentials.password;
    // const requestOptions = {
    //   crossDomain: true,
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     username: uname,
    //     password: pword,
    //   })
    // };
    //const response = yield request.postMethod('http://40.121.39.87:5000/api/v1/auth/login/', requestOptions);
    //Hardcode Check
    var response;
    if(
        (uname === "admin@logger.com" && pword === "admin123") ||
        (uname === "admin@admin.com" && pword === "admin")
      ){
      response = {
        Tokenkey: "asfdhjsfsjdhsjfhsfhskdyh"
      }
    }
    else {
      response = {
        Tokenkey: null
      }
    }
    //End of Hardcode check
    if (response.Tokenkey != null) {
      storage.setItem("token", response.Tokenkey);
      storage.setItem("user-id", response.UserId);
      yield put(replaceRouter(`/home`));
    }
    else {
      yield put({ type: "LOGIN:DO_LOGIN:FAIL", error: 'Incorrect Username and Password ' });
    }
  }
  
  export default verifyAuth;