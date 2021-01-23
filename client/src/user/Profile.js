import React, { Component } from 'react'
import {Redirect, Link} from 'react-router-dom'
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
        <div className='row'>
        <div className='col-md-6'>
        <h2 className='mt-5 mb-5 text-primary'><strong>sociaList Profile</strong></h2>
        <div className='card bg-light mb-5 border-primary p-2 text-primary'
          style={{width: '18rem'}}>
        <p><strong>Hello</strong> {isAuthenticated().user.name}</p>
        <p><strong>Email:</strong> {isAuthenticated().user.email}</p>
        <p>
          <strong>Joined: </strong> 
          {`${new Date(user.created).toDateString()}`}
        </p>
        </div>
        </div>

        <div className='col-md-6'>
          {isAuthenticated().user && 
          isAuthenticated().user._id == user._id && (
            <div className='d-inline-block mt-5'>
              <Link className='btn btn-raised btn-outline-secondary mr-5'
                to={`/user/edit/${this.state.user._id}`}>
                Edit Profile
              </Link>
              <button className='btn btn-raised btn btn-outline-danger'>Delete Profile</button>
            </div>
          )}
        </div>
        </div>
      </div>
    )
  }
}

export default Profile
