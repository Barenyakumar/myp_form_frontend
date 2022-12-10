import "./App.css"
import { BrowserRouter as Router, useRoutes } from "react-router-dom"
import FormEdit from "./components/researcher/FormEdit"
import FormView from "./components/participant/FormView"
// import FormEdit from "./components/researcher/FormEdit"

function App() {
  function AppRoutes() {
    const routes = useRoutes([
      {
        path: "/",
        element: <FormEdit/>
      },

      {
        path: "/form/:formId",
        element: <FormView />,
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
