import "./App.css"
import { BrowserRouter as Router, Navigate, useRoutes } from "react-router-dom"
import FormEdit from "./components/researcher/FormEdit"
import FormView from "./components/participant/FormView"
import ViewResponse from "./components/viewResponses/ViewResponse"
import Home from "./components/Home/Home"
import SignUp from "./components/ParticipantAuth/Signup"
import { useContext, useState } from "react"
import Login from "./components/ParticipantAuth/Login"
import { AuthContext } from "./context/AuthContext"
import ReseachserSignup from "./components/ResearcherAuth/Signup"
import ResearcherLogin from "./components/ResearcherAuth/Login"
import LoginGateway from "./components/loginGateway/LoginGateway"

function App() {

    const [loginFlag, setLoginFlag] = useState(false)
    const {user} = useContext(AuthContext)
    // console.log(loginFlag)
    const loginCallback = (data) => setLoginFlag(data)
  function AppRoutes() {
    const routes = useRoutes([
      {
        path: "/home",
        element: !user ? <Navigate to="/login" /> : <Home />,
      },
      {
        path: "/",
        element: <LoginGateway />,
      },
      {
        path: "/register",
        element: user ? (
          <Navigate to="/home" />
        ) : (
          <SignUp loginCallback={loginCallback} />
        ),
      },
      {
        path: "/login",
        element: user ? (
          <Navigate to="/home" />
        ) : (
          <Login loginCallback={loginCallback} />
        ),
      },
      {
        path: "/researcher/register",
        element: user ? (
          <Navigate to="/" />
        ) : (
          <ReseachserSignup loginCallback={loginCallback} />
        ),
      },
      {
        path: "/researcher/login",
        element: user ? (
          <Navigate to="/" />
        ) : (
          <ResearcherLogin loginCallback={loginCallback} />
        ),
      },
      {
        path: "/forms",
        element:
          !user || user === undefined ? <Navigate to="/" /> : <FormEdit />,
      },

      {
        path: "/form/:formId",
        element: <FormView />,
      },

      {
        path: "/response/:email",
        element: <ViewResponse />,
      },
    ])
    return routes
  }

  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App
