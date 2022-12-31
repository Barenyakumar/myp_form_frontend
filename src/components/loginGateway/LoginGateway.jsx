import { Button } from '@mui/material'
import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import './logingateway.css'

function LoginGateway() {
  return (
    <div className="loginHolder">
      <div className="loginResearcher">
        <Link
          to="/researcher/login"
          style={{ color: "white", textDecoration: "none" }}
        >
          Login as Researcher
        </Link>
      </div>
      <br />
      <br />
      <div className="loginParticipant">
        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
          Login as Participant
        </Link>
      </div>
      {/* <Button component="link" to={"/login"}>
        Login as Participant
      </Button> */}
    </div>
  )
}

export default LoginGateway