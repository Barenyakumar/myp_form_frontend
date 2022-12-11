
import { Divider, RadioGroup, Typography } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"

function QuestionView({ question, index, saveResponseCallback }) {
  const [response, setResponse] = useState([])
  const answerOption = useRef()
  const handleTextAnswerChange = () => setResponse([answerOption.current.value])
  const handleOtherAnswerChange = (j) => {
    if (question.questionType === "radio") setResponse([j])
    else {
      setResponse((prev) => {
        if (!prev.includes(j)) prev = [...prev, j]
        else {
          const newRes = [...prev]
          newRes.splice(newRes.indexOf(j), 1)
          prev = [...newRes]
        }

        return prev
      })
    }
  }

  useEffect(() => {
    saveResponseCallback(response, index)
  }, [handleOtherAnswerChange, handleTextAnswerChange])

  return (
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
      <Typography variant="subtitle1" style={{ marginLeft: "10px" }}>
        {index + 1}. {question.questionText}
      </Typography>

      <div>
        {/* <RadioGroup
          aria-label="quiz"
          name="quiz"
          value={index+1}
          // onChange={(e) => {
          //   handleRadioChange(e.target.value, 1)
          // }}
        > */}
        {/* {ques.options.map((op, j) => (
                                  
                                ))} */}

        <div>
          {question.questionType === "text" ? (
            <input
              type="text"
              className="question"
              placeholder="Write your answer"
              required
              style={{ width: "100%" }}
              ref={answerOption}
              onChange={handleTextAnswerChange}
            />
          ) : (
            <>
              {question.options.map((option, j) => (
                <div
                  key={j}
                  style={{
                    display: "flex",
                    marginLeft: "7px",
                  }}
                >
                  <div className="optionWrapper">
                    <input
                      type={question.questionType}
                      style={{
                        marginRight: "10px",
                        padding: "0.3rem 0px",
                      }}
                      name={`question_option${index}`}
                      value={j}
                      ref={answerOption}
                      onChange={() => {
                        handleOtherAnswerChange(j)
                      }}
                    />
                    <div style={{ fontSize: "1 rem" }}>{option.optionText}</div>
                  </div>
                </div>
              ))}
            </>
          )}

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
        {/* </RadioGroup> */}
      </div>
    </div>
  )
}

export default QuestionView
