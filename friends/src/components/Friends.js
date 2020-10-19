import React from 'react';
import {axiosAuth} from '../utils/axiosAuth';

class Friends extends React.Component {
    state = {
        friends: [],
        nameField: "",
        ageField: 0,
        emailField: ""
    }

    componentDidMount(){
        this.getFriends();
        console.log(this.state.friends)
    }

    getFriends = async () => {
        const friends = await axiosAuth().get("http://localhost:5000/api/friends");
        // console.log(friends.data);
        this.setState({
            ...this.state,
            friends:friends.data
        });
        console.log(this.state.friends);
    }

    addFriend = async (friend) => {
        const newFriendList = await axiosAuth().post("http://localhost:5000/api/friends", friend);
        console.log(newFriendList);
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

    render () {
        return (
            <div id="friends-page">
                <form id="add-friend">
                    <h2>Add Friend</h2>
                    <label>Name: </label>
                    <input type="text" onChange={this.nameChanges} placeholder="Enter a name"></input>
                    <label>Age: </label>
                    <input type="number" onChange={this.ageChanges} placeholder="Enter a number"></input>
                    <label>Email: </label>
                    <input type="email" onChange={this.emailChanges} placeholder="Enter an email"></input>
                    <button onClick={() => this.addFriend({name: this.state.nameField, age: this.state.ageField, email: this.state.emailField})}>Submit</button>
                </form>
                {this.state.friends.map((friend) => {
                return (
                    <div className="friends">
                        <h2>{friend.name}</h2>
                        <p>Age: {friend.age}</p>
                        <p>Email: {friend.email}</p>
                    </div>
                )
            })}
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

export default Friends