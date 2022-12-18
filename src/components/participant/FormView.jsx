import React, { useEffect } from "react"
import { Grid, TextField } from "@mui/material"
import { Paper, Typography } from "@mui/material"
import "./formview.css"
import Button from "@mui/material/Button"
import RadioGroup from "@mui/material/RadioGroup"
import Divider from "@mui/material/Divider"
import axios from "axios"
import { useParams } from "react-router-dom"
import QuestionView from "../questionView/QuestionView"



function FormView() {
  const [formData, setFormData] = React.useState()
  const [user, setUser] = React.useState("")
  const [attempted, setAttempted] = React.useState(false)
  const [response, setResponse] = React.useState([])

  const { formId } = useParams()
  const getFormData = async () => {
    const res = await axios.get(`/api/form/${formId}`)
    await setFormData(res.data)
    console.log(res.data)
  }

  useEffect(() => {
     getFormData()
    // console.log(formData.questions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // const questions = formData.questions;

  const saveResponse = (response, i) => {
    setResponse((prev) => {
      const obj = { ...formData.questions[i], response }
      console.log(obj)
      if (prev.length > 0) prev[i] = obj
      else prev.push(obj)
      return prev
    })
  }
  const submitResponse = async (e) => {
    e.preventDefault()
    const formObj = {
      submittedBy: user,
      formId: formId,
      createdBy: formData.createdBy,
      questions: response,
    }

    console.log(formObj)

    const res = await axios.post("/api/response/create", formObj)
    console.log(res.data)
    setAttempted(true)
  }

  return (
    <form
      className="formview_section"
      style={{ minHeight: "80vh", marginTop: "2rem" }}
      onSubmit={submitResponse}
    >
      <div style={{ width: "80%" }}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12} sm={5} style={{ width: "100%" }}>
            <Grid style={{ borderTop: "10px solid teal", borderRadius: 10 }}>
              <div>
                <div>
                  <Paper elevation={2} style={{ width: "100%" }}>
                    {/* <div className="formviewHeader">
                      <div className="headerTitle">
                        Title
                      </div>
                      <div className="headerDesc">
                        Description
                      </div>
           </div> */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{
                          fontFamily: "sans-serif Roboto",
                          marginBottom: "15px",
                        }}
                      >
                        {formData?.name}
                      </Typography>
                      <Typography variant="subtitle1">
                        {formData?.description}
                      </Typography>
                      <input
                        type="email"
                        className="question_form_top_desc"
                        placeholder="Enter your email"
                        onChange={(e) => {
                          setUser(e.target.value)
                        }}
                        required
                      />
                    </div>
                  </Paper>
                </div>
              </div>
            </Grid>

            {!attempted ? (
              <div>
                <Grid>
                  {/* { questions.map((ques, i)=>(
                        
                      ))} */}

                  <div>
                    <br></br>
                    <Paper>
                      {formData?.questions?.map((question, i) => (
                        <div key={i}>
                          <QuestionView
                            question={question}
                            index={i}
                            saveResponseCallback={saveResponse}
                          />
                        </div>
                      ))}
                    </Paper>
                  </div>
                </Grid>
                <Grid>
                  <br></br>
                  <div style={{ display: "flex" }}>
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                  <br></br>

                  <br></br>
                </Grid>
              </div>
            ) : (
              <div>
                <Typography variant="body1">Form submitted</Typography>
                <Typography variant="body2">
                  Thanks for submiting form
                </Typography>

                <Button
                // onClick={reloadForAnotherResponse}
                >
                  Submit another response
                </Button>
              </div>
            )}
          </Grid>
        </Grid>

        {/* //TODO: Add a footer here */}
      </div>
    </form>
    // <h1>hii</h1>
  )
}

export default FormView
