import React, { Component } from 'react'
import { list } from './apiUser'
import { Link } from 'react-router-dom'

class Users extends Component {

  constructor(){
    super()
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    list()
    .then(data => {
      if (data.error) {
        console.table(data.error)
    } else {
        this.setState({ users: data })
    }
    })
  }

  render() {
    return (
      <div className='container'>
        <h2 className='mt-5 mb-5 text-primary'>
          <strong>Members</strong>
        </h2>
      </div>
    )
  }
}

export default Users
