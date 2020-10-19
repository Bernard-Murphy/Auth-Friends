import React from 'react';
import {axiosAuth} from '../utils/axiosAuth';
import { withRouter } from "react-router";


class Friend extends React.Component {
    state = {
        friend: {
            name: "",
            age: 0,
            email: "",
            nameField: "",
            ageField: 0,
            emailField: ""
        }
    }

    grabFriend = async () => {
        const friend = await axiosAuth().get(`http://localhost:5000/api/friends/${this.props.match.params.id}`);
        this.setState({
            ...this.state,
            ...friend.data
        })
    }

    componentDidMount(){
        this.grabFriend();
    }

    nameChanges = e => {
        this.setState({
            ...this.state,
            nameField: e.target.value
        })
    }

    ageChanges = e => {
        this.setState({
            ...this.state,
            ageField: e.target.value
        })
    }

    emailChanges = e => {
        this.setState({
            ...this.state,
            emailField: e.target.value
        })
    }

    updateFriend = async friend => {
        await axiosAuth().put(`http://localhost:5000/api/friends/${this.props.match.params.id}`, friend);
    }

    render () {
        return (
            <div className="friend-single">
                <h2>{this.state.name}</h2>
                <p>Age: {this.state.age}</p>
                <p>Email: {this.state.email}</p>
                <form id="update-friend">
                    <h2>Update Info</h2>
                    <label>Name: </label>
                    <input type="text" onChange={this.nameChanges} placeholder="Enter a name"></input>
                    <label>Age: </label>
                    <input type="number" onChange={this.ageChanges} placeholder="Enter a number"></input>
                    <label>Email: </label>
                    <input type="email" onChange={this.emailChanges} placeholder="Enter an email"></input>
                    <button onClick={() => this.updateFriend({name: this.state.nameField, age: this.state.ageField, email: this.state.emailField})}>Submit</button>
                </form>
                <button className="logout" onClick={
                () => {
                    localStorage.clear();
                    window.location.replace("http://localhost:3000/login");
                }
                }>Log out</button>
            </div>
        )
    }
}

export default withRouter(Friend)