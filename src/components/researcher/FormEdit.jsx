import { Button } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import Accordian from "../accordian/Accordian"
import "./formedit.css"
import Alert from "@mui/material/Alert"
import IconButton from "@mui/material/IconButton"
import Collapse from "@mui/material/Collapse"
import CloseIcon from "@mui/icons-material/Close"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"

export default function FormEdit() {
  const [formTitle, setFormTitle] = useState("")
  const [formDesc, setFormDesc] = useState("")
  const [researcherName, setResearcherName] = useState("")
  const [formLink, setFormLink] = useState("")
  const [alertOpen, setAlertOpen] = useState(false)
  const [questionTrigger, setQuestionTrigger] = useState(false)
  const [questions, setQuestions] = useState([
    {
      questionText: "Question 1",
      questionType: "radio",
      options: [
        { optionText: "Option 1" },
        // { optionText: "bad", optionImage: "" },
        // { optionText: "help", optionImage: "" },
      ],
      answer: [],

      // answerKey: "",
      // points: 0,
      // required: true, // keep all questions required,
      isPrimary: true,
      questionImage: "",
    },
  ])

  const deleteQuestionFunc = (data) => {
    if (questions.length > 1) {
      let qs = [...questions]
      setQuestions(prev =>{
        qs.splice(data, 1)
        prev = [...qs]
        return prev;
      })
    }
  }

  const newQuestionFunc = () => {
    const newQuestion = {
      questionText: `Question ${questions.length + 1}`,
      questionType: "radio",
      options: [
        { optionText: "option 1" },
        // { optionText: "bad", optionImage: "" },
        // { optionText: "help", optionImage: "" },
      ],
      answer: [],

      // answerKey: "",
      // points: 0,
      // required: true, // keep all questions required,
      isPrimary: true,
      questionImage: "",
    }
    setQuestions((prev) => [...prev, newQuestion])
  }

  const questionCallback = (i, data) => {
    setQuestions((prev) => {
      prev[i] = data
      return prev
    })
  }

  const publishForm = async (e) => {
    e.preventDefault()
    console.log("hhii")
    setQuestionTrigger(true)
    const res = await axios.post("/api/forms/create", {
      name: formTitle,
      createdBy: researcherName,
      description: formDesc,
      questions : questions
    })
    console.log("form publish")
    console.log(res.data)
    // console.log(`http://localhost:3000/${res.data._id}`)
    setFormLink(`http://localhost:3000/form/${res.data._id}`)
    setAlertOpen(true)
  }



  return (
    <form className="section" onSubmit={publishForm}>
      <Collapse in={alertOpen}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            <div>You've successfully published. </div>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={async () => {
                await navigator.clipboard.writeText(formLink)
              }}
            >
              <ContentCopyIcon fontSize="inherit" />
            </IconButton>
          </div>
        </Alert>
      </Collapse>
      <div className="question_title_section">
        <div className="question_form_top">
          <input
            type="text"
            className="question_form_top_name"
            placeholder="Form Title"
            onChange={(e) => {
              setFormTitle(e.target.value)
            }}
            required
          />
          <input
            type="text"
            className="question_form_top_desc"
            placeholder="Form Description"
            onChange={(e) => {
              setFormDesc(e.target.value)
            }}
            required
          />
          <input
            type="email"
            className="question_form_top_desc"
            placeholder="Researcher Email"
            onChange={(e) => {
              setResearcherName(e.target.value)
            }}
            required
          />
        </div>
      </div>

      <hr />

      {questions.map((question, i) => (
        <div key={i} style={{ padding: ".5rem 0px" }}>
          <Accordian
            question={question}
            index={i}
            addQuestionCallback={newQuestionFunc}
            deleteQuestionCallback={deleteQuestionFunc}
            questionCallback={questionCallback}
            questionTrigger={questionTrigger}
          />
        </div>
      ))}
      <Button variant="outlined" type="submit">
        Publish
      </Button>
    </form>
  )
}
