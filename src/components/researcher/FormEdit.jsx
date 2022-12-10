// import { AddCircleOutline, CropOriginalOutlined, OndemandVideoOutlined, TextFieldsOutlined } from "@mui/icons-material"
import { Button } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import Accordian from "../accordian/Accordian"
import './formedit.css'

export default function FormEdit() {
  const [formTitle, setFormTitle] = useState("")
  const [formDesc, setFormDesc] = useState("")
  const [researcherName, setResearcherName] = useState("")
  const [questions, setQuestions] = useState([
    {
      questionText: "Question 1",
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
    },
  ])

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
    console.log(questions)
  }

  const publishForm = async() => {

    const res = await axios.post("/api/forms/create", {
      name: formTitle,
      createdBy: researcherName,
      description: formDesc,
      questions : questions
    })
    console.log("form publish")
    console.log(res.data)
    console.log(`http://localhost:3000/${res.data._id}`)
  }

  return (
    <div className="section">
      <div className="question_title_section">
        <div className="question_form_top">
          <input
            type="text"
            className="question_form_top_name"
            placeholder="Form Title"
            onChange={(e) => {
              setFormTitle(e.target.value)
            }}
          />
          <input
            type="text"
            className="question_form_top_desc"
            placeholder="Form Description"
            onChange={(e) => {
              setFormDesc(e.target.value)
            }}
          />
          <input
            type="text"
            className="question_form_top_desc"
            placeholder="Researcher name"
            onChange={(e) => {
              setResearcherName(e.target.value)
            }}
          />
        </div>
      </div>

      <hr />

      {questions.map((question, i) => (
        <div key={i}>
          <Accordian
            question={question}
            index={i}
            
            questionCallback={questionCallback}
          />
          
        </div>
      ))}
      <Button variant="outlined" onClick={newQuestionFunc}>
        Add Question
      </Button>
      <Button variant="outlined" onClick={publishForm}>
        Publish
      </Button>
    </div>
  )
}
