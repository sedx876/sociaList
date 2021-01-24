import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { read, update, updateUser } from "./apiUser";
import { Redirect } from "react-router-dom";
import DefaultProfile from "../images/avatar.jpg";

class EditProfile extends Component {

  constructor(){
    super()
    this.state = {
      id: '',
      name: '',
      email: '',
      password: '',
      redirectToProfile: false
    }
  }

  init = userId => {
    const token = isAuthenticated().token
    read(userId, token)
    .then(data => {
      if(data.error){
        this.setState({ redirectToProfile: true })
        console.table('ERROR')
      }else{
        this.setState({ 
          id: data._id, 
          name: data.name, 
          email: data.email,
          error: ''})
        console.table(data)
      }
    })
    console.table('User ID from Route Params', this.props.match.params.userId)
  }

  componentDidMount(){
    const userId = this.props.match.params.userId
    this.init(userId)
  }

  clickSubmit = event => {
    event.preventDefault()
    const { name, email, password } = this.state
    const user = {
        name,
        email,
        password: password || undefined
    }
    console.table(user)
    const userId = this.props.match.params.userId
    const token = isAuthenticated().token
    update(userId, token, user)
    .then(data => {
      if(data.error) this.setState({ error: data.error })
      else this.setState({
        redirectToProfile: true
      })
    })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  editForm = (name, email, password) => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input 
          onChange={this.handleChange('name')} 
          type='text' 
          className='form-control'
          value={name}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input 
          onChange={this.handleChange('email')} 
          type='text' 
          className='form-control'
          value={email}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input 
           onChange={this.handleChange('password')} 
          type='password' 
          className='form-control'
          value={password}
        />
      </div>

      <button onClick={this.clickSubmit} className='btn btn-raised btn-outline-primary'>Update Profile</button>
    </form>
  )

  render(){
    const { id, name, email, password, redirectToProfile } = this.state

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    return(
    <div className='container'>
      <h2 className='mt-5 mb-5 text-primary text-center'>
        <strong>Update Profile</strong>
        {this.editForm(name, email, password)}
      </h2>
    </div>
    )
  }
}

export default EditProfile