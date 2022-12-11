import React, { useEffect } from "react"
import {  Grid, TextField } from "@mui/material"
import { Paper, Typography } from "@mui/material"
import "./formview.css"
import Button from "@mui/material/Button"
import RadioGroup from "@mui/material/RadioGroup"
import Divider from "@mui/material/Divider"
import axios from "axios"
import { useParams } from "react-router-dom"

function FormView() {
  const [formData, setFormData] = React.useState()
  const [user,setUser] = React.useState("")
  const answerOption = React.useRef()
  const [value, setValue] = React.useState("")

  const { formId } = useParams()
  const getFormData = async () => {
    const res = await axios.get(`/api/forms/${formId}`)
    setFormData(res.data)
    console.log(res.data)
  }

  useEffect(() => {
    getFormData()
    // console.log(formData.questions)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submitResponse = () => {
     
  }

  return (
    <div
      className="formview_section"
      style={{ minHeight: "80vh", marginTop: "2rem" }}
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
                      <TextField
                        id="outlined-basic"
                        label="Enter your name"
                        variant="outlined"
                        onChange={(e) => {
                          setUser(e.target.value)
                        }}
                      />
                    </div>
                  </Paper>
                </div>
              </div>
            </Grid>

            {2 < 3 ? (
              <div>
                <Grid>
                  {/* { questions.map((ques, i)=>(
                        
                      ))} */}

                  <div>
                    <br></br>
                    <Paper>
                      {formData?.questions.map((question, i) => (
                        <div key={i}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              marginLeft: "6px",
                              paddingTop: "15px",
                              paddingBottom: "15px",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              style={{ marginLeft: "10px" }}
                            >
                              {i + 1}. {question.questionText}
                            </Typography>

                            <div>
                              <RadioGroup
                                aria-label="quiz"
                                name="quiz"
                                value={value}
                                // onChange={(e) => {
                                //   handleRadioChange(e.target.value, 1)
                                // }}
                              >
                                {/* {ques.options.map((op, j) => (
                                  
                                ))} */}

                                <div>
                                  {question.options.map((option, j) => (
                                    <div
                                      key={j}
                                      style={{
                                        display: "flex",
                                        marginLeft: "7px",
                                      }}
                                      ref={answerOption}
                                    >
                                      {/* <FormControlLabel
                                        value={j}
                                        control={question.questionType==="radio" ? <Radio /> : <CheckBox />}
                                        label={option.optionText}
                                      /> */}
                                      <div className="optionWrapper">
                                        <input
                                          value={j}
                                          type={question.questionType}
                                          style={{
                                            marginRight: "10px",
                                            padding: "0.3rem 0px",
                                          }}
                                          name={`question_option${i}`}
                                          onChange={() => {
                                            // handleAnswerChange(j)
                                          }}
                                        />
                                        <div style={{ fontSize: "1 rem" }}>
                                          {option.optionText}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                  <div
                                    style={{
                                      display: "flex",
                                      marginLeft: "10px",
                                    }}
                                  >
                                    {/* {op.optionImage !== "" ? (
                                      <img
                                        src={op.optionImage}
                                        width="64%"
                                        height="auto"
                                      />
                                    ) : (
                                      ""
                                    )} */}
                                    <Divider />
                                  </div>
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Paper>
                  </div>
                </Grid>
                <Grid>
                  <br></br>
                  <div style={{ display: "flex" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={submitResponse}
                    >
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
    </div>
  )
}

export default FormView

