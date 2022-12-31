import axios from "axios"
import React, { useContext, useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import Popup from "../popup-box/Popup"
import genrateKey from "../../helper/genrateKey"
import CircularProgress from "@mui/material/CircularProgress"
import { Link } from "react-router-dom"
import {AuthContext} from "../../context/AuthContext"

export default function Signup() {
  const [val, setVal] = useState(1)
  const [otpMatched, setOtpMatched] = useState(false)
  const [userDataFlag, setUserDataFlag] = useState(false)
  const [pswFlag, setPswFlag] = useState(false)
  const [errMessage, setErrMessage] = useState("")
  const [err, setErr] = useState("")
  const [userCredentials, setUserCredentials] = useState({})

  useEffect(() => {
    console.log("hii")
    if (otpMatched) setVal(2)
  }, [val, otpMatched])

  function renderSwitch(param) {
    switch (param) {
      case 1:
        return (
          <>
            <h2 style={{ width: "100%", textAlign: "center" }}>
              Verify your Email
            </h2>
            <EmailVerify
              otpMatched={otpMatched}
              setOtpMatched={setOtpMatched}
              err={err}
              setErr={setErr}
              errMessage={errMessage}
              setErrMessage={setErrMessage}
              setUserCredentials={setUserCredentials}
              setVal={setVal}
            />
          </>
        )
      case 2:
        return (
          <UserDetails
            err={err}
            setErr={setErr}
            errMessage={errMessage}
            setErrMessage={setErrMessage}
            userCredentials={userCredentials}
            setUserCredentials={setUserCredentials}
            setVal={setVal}
            // setUserDataFlag={setUserDataFlag}
          />
        )
      // case 3:
      //   return (
      //     <ConfirmPassword
      //       // err={err}
      //       // setErr={setErr}
      //       // errMessage={errMessage}
      //       // setErrMessage={setErrMessage}
      //       // setUserCredentials={setUserCredentials}
      //       // setVal={setVal}
      //       // setPswFlag={setPswFlag}
      //     />
      //   )
      // case 4:
      //   return (
      //     <AvatarSelect
      //       // gender={userCredentials.gender}
      //       // userCredentials={userCredentials}
      //       // setUserCredentials={setUserCredentials}
      //       // setVal={setVal}
      //     />
      //   )
      default:
        return <h1>Default sign up page</h1>
    }
  }

  return (
    <div>
      <h1>Welcome on-board Myparticipants</h1>
      <div className="loginContainer">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Signup to get started | Myparticipants</title>
          <meta
            name="description"
            content="Learn and grow with help from your own skilled seniors"
          />
        </Helmet>

        <div className="logincontent">
          <div className="signupContentBox">{renderSwitch(val)}</div>
        </div>
        <div className="controlBtnWrapper">
          <Link to="/login" className="redirectLink">
            Alredy registered!{" "}
          </Link>
          {/* <IconButton aria-label="delete" size="small" onClick={nextVal}>
            Next
            <ArrowForwardIcon fontSize="inherit" />
          </IconButton> */}
        </div>
      </div>
    </div>
  )
}

function EmailVerify(props) {
  const otp = useRef()
  const email = useRef()
  const userName = useRef()

  const [otpSent, setotpSent] = useState(false)
  const [Otp, setOtp] = useState("")
  const [preloader, setPreloader] = useState(false)

  const errCallback = () => props.setErr("")

  const nextVal = () => {
    if (props.otpMatched) props.setVal((prev) => prev + 1)
    else {
      props.setErr("Wrong email!!!")
      props.setErrMessage("Verify your Email first to go to next step...")
    }
  }

  async function sendOTPHandler(e) {
    setPreloader(true)
    e.preventDefault()
    try {
      if (email !== "") {
        const otpvalue = genrateKey(6)
        setOtp({ email: email.current.value, otp: otpvalue })
        const res = await axios.post("/api/email/", {
          email: email.current.value,
          subject: `Welcome onboarding ${userName.current.value}`,
          text: `Your email authorization code is ${otpvalue}`,
        })
        console.log(Otp)
        setPreloader(false)
        setotpSent(true)
        console.log(res.data)
      } else {
        setPreloader(false)
        props.setErr("Wrong email!!!")
        props.setErrMessage("Please enter a valid email id")
      }
    } catch (error) {
      setPreloader(false)
      console.log(error)
      props.setErr("Wrong email!!!")
      props.setErrMessage(
        "Something went wrong while sending otp. Please try again..."
      )
    }
  }

  function matchOTP() {
    if (otp.current.value === Otp.otp && email.current.value === Otp.email) {
      props.setOtpMatched(true)
      setotpSent(false)
      props.setUserCredentials((prev) => ({
        ...prev,
        email: email.current.value,
        name: userName.current.value,
      }))
    }
  }

  return (
    <div className="emailWrapper">
      <img src="/images/email.jpg" alt="" />
      <form className="email_div" onSubmit={sendOTPHandler}>
        <input
          type="text"
          ref={userName}
          placeholder="Enter your name"
          name="name"
          required={true}
          disabled={otpSent}
        />
        <br />
        <input
          type="email"
          ref={email}
          placeholder="Email"
          name="email"
          required={true}
          style={
            props.otpMatched
              ? { boxShadow: "0px 0px 7px green", border: "none" }
              : { boxShadow: "0px 0px 7px red", border: "none" }
          }
          disabled={otpSent}
        />
        <button
          type="submit"
          // disabled={true}
          style={{
            fontSize: "1rem",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {!props.otpMatched ? (otpSent ? "Resend" : "Verify") : ""}
        </button>
      </form>
      {otpSent ? (
        <div className="otp_div">
          <input type="text" ref={otp} placeholder="Enter OTP" required />
          <button onClick={matchOTP}>Submit</button>
        </div>
      ) : (
        ""
      )}
      {props.err ? (
        <Popup
          flag={true}
          message={props.errMessage}
          errCallback={errCallback}
        />
      ) : (
        ""
      )}
      {preloader ? <CircularProgress /> : ""}
      {/* {preloader ? <Preloader /> : ""} */}
    </div>
  )
}

function UserDetails(props) {
  const gender = useRef()
  const password = useRef()
  const rePassword = useRef()
  const [passMatched, setPassMatched] = useState(false)
  const { user, isFetching, error, dispatch } = useContext(AuthContext)

  const errCallback = () => props.setErr("")

  async function handleFormSubmit(e) {
    e.preventDefault()
    if (passMatched) {
      const obj = {
        email: props.userCredentials.email,
        name: props.userCredentials.name,
        password: password.current.value,
        gender: gender.current.value,
      }
      try {
        const res = await axios.post("/api/researcher/register", obj)
        // console.log(res.data)

        localStorage.setItem("ed_pr_bk_gj_12_35", JSON.stringify(res.data))
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
        console.log("user: ")
        console.log(user);
      } catch (err) {
        // setPreloader(false)
        console.log(err)
        console.log("error: " + error)
        props.setErr(true)
        if (error.response.data.code === 11000) {
          props.setErrMessage(
            "Duplicate entry in " +
              Object.keys(error.response.data.keyValue) +
              " try other rather than " +
              Object.values(error.response.data.keyValue) +
              ".Try logging in."
          )
          // setErrMessage("Duplicate entry in "+ JSON.stringify(error.response.data.keyValue))
        } else if (
          error.response.data.code === 11600 ||
          error.response.data.code === 211
        ) {
          props.setErrMessage(
            "Database server is down...\n Try again after sometime..."
          )
        }
      }
    } else {
      props.setErr("wrong password")
      props.setErrMessage("Password does not match. Please try again...")
    }
  }

  function handleCheckPassword() {
    // const obj = {
    //   email: props.userCredentials.email,
    //   name: props.userCredentials.name,
    //   password: password.current.value
    // }
    if (password.current.value === rePassword.current.value)
      setPassMatched(true)
    // console.log(password.current.value + " " + rePassword.current.value)
  }
  return (
    <div className="userDetails">
      <h1>Hi, {props.userCredentials.name} complete few steps more...</h1>
      <div className="userDetailsInput">
        <form className="loginForm" onSubmit={handleFormSubmit}>
          <label htmlFor="gender">
            {" "}
            Gender:
            <select ref={gender} name="gender" id="gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            ref={password}
            placeholder="Password"
            name="passoword"
            minLength={6}
            required={true}
          />
          <label htmlFor="repassword">Confirm Password</label>
          <input
            id="repassword"
            type="password"
            ref={rePassword}
            placeholder="Confirm password"
            name="passoword"
            minLength={6}
            required={true}
            onChange={handleCheckPassword}
          />
          <button type="submit">Submit</button>
        </form>
        {props.err ? (
          <Popup
            flag={true}
            message={props.errMessage}
            errCallback={errCallback}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

// export default Signup
