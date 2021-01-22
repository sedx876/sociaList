import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import { read } from "./apiUser"

class Profile extends Component {

  constructor(){
    super()
    this.state = {
      user: '',
      redirectToSignin: false
    }
  }

  init = userId => {
    const token = isAuthenticated().token
    read(userId, token)
    .then(data => {
      if(data.error){
        this.setState({ redirectToSignIn: true })
        console.table('ERROR')
      }else{
        this.setState({ user: data })
        console.table(data)
      }
    })
    console.table('User ID from Route Params', this.props.match.params.userId)
  }

  componentDidMount(){
    const userId = this.props.match.params.userId
    this.init(userId)
  }

  render() {
    const { redirectToSignin, user, posts } = this.state
    if (redirectToSignin) return <Redirect to="/signin" />

    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>Profile</h2>
        <p><strong>Hello</strong> {isAuthenticated().user.name}</p>
        <p><strong>Email:</strong> {isAuthenticated().user.email}</p>
        <p>
          <strong>Joined: </strong> 
          {`${new Date(this.state.user.created).toDateString()}`}
        </p>
      </div>
    )
  }
}

export default Profile
