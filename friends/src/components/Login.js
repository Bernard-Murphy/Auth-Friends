import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    state = {
        credentials: {
            username: "",
            password: ""
        }
    }
    

    changeUser = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                username: e.target.value
            }
        })
    }

    changePass = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                password: e.target.value
            }
        })
    }

    login = async () => {
        const response = await axios.post("http://localhost:5000/api/login", this.state.credentials
        )
        window.localStorage.setItem('token', response.data.payload);
        window.location.replace("http://localhost:3000/friends");
    }

    render () {
        return (
            <div id="login">
                <label>Username:</label>
                <input placeholder="enter username" type="text" onChange={this.changeUser}></input><br/>
                <label>Password:</label>
                <input placeholder="enter password" type="password" onChange={this.changePass}></input><br/>
                <button onClick={this.login}>Submit</button>
            </div>
        )
    }
}

export default Login