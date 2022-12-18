import "./App.css"
import { BrowserRouter as Router, useRoutes } from "react-router-dom"
import FormEdit from "./components/researcher/FormEdit"
import FormView from "./components/participant/FormView"
import ViewResponse from "./components/viewResponses/ViewResponse"
import Home from "./components/Home/Home"
import SignUp from "./components/Auth/Signup"
import { useState } from "react"
// import FormEdit from "./components/researcher/FormEdit"

function App() {

    const [loginFlag, setLoginFlag] = useState(false)

    // console.log(loginFlag)
    const loginCallback = (data) => setLoginFlag(data)
  function AppRoutes() {
    const routes = useRoutes([
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp loginCallback={loginCallback} />,
      },
      {
        path: "/forms",
        element: <FormEdit />,
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
