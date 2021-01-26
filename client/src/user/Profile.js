import React, { Component } from 'react'
import {Redirect, Link} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import { read } from "./apiUser"
import DefaultProfile from '../images/avatar.jpg'
import DeleteUser from './DeleteUser'
import FollowProfileButton from './FollowProfileButton'

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

  UNSAFE_componentWillReceiveProps(props) {
    const userId = props.match.params.userId
    this.init(userId)
  }

  render() {
    const { redirectToSignin, user, posts } = this.state
    if (redirectToSignin) return <Redirect to="/signin" />

    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : DefaultProfile

    return (
      <div className='container'>
        <h2 className='mt-5 mb-5 text-primary text-center'>
          <strong>sociaList Profile</strong>
        </h2>
        <div className='row'>
        <div className='col-md-6'>
        <div className='card bg-light mb-5 border-primary p-2 text-primary'
          style={{width: '18rem'}}>
        <p className='text-center'><strong>Hello</strong> {user.name}</p>
        <img
              style={{ height: "300px", width: "auto" }}
              className="img-thumbnail"
              src={photoUrl}
              onError={i => (i.target.src = `${DefaultProfile}`)}
              alt={user.name}
            />
        <p className='pt-3'><strong>Email:</strong> {user.email}</p>
        <p>
          <strong>Joined: </strong> 
          {`${new Date(user.created).toDateString()}`}
        </p>
        </div>
        </div>

        <div className='col-md-6'>
          {isAuthenticated().user && 
          isAuthenticated().user._id === user._id && (
            <div className='d-inline-block mt-5'>
              <Link className='btn btn-raised btn-outline-secondary mr-5'
                to={`/user/edit/${this.state.user._id}`}>
                Edit Profile
              </Link>
              <DeleteUser userId={user._id}/>
            </div>
          )}
        </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
          <p className="card lead text-center bg-light mb-5 border-primary p-2 text-primary"
            style={{width: '18rem'}}>
              <h3 style={{textDecoration: 'underline'}}><strong>About Me:</strong></h3>
              <strong>{user.about}</strong></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
