import { connect } from 'react-redux';

import Login from './Login'


const mapStateToProps = state => ({
    loginError: state.Login.loginError
});

const mapDispatchToProps = {
    doLogin: (userCredentials) => ({ type: 'LOGIN:DO_LOGIN', userCredentials })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);