import React, { useState, useRef, useEffect } from "react"
import "./accordian.css"
import { styled } from "@mui/material/styles"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { AddCircleOutline } from "@mui/icons-material"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import CloseIcon from "@mui/icons-material/Close"
import MuiAccordion from "@mui/material/Accordion"
import MuiAccordionSummary from "@mui/material/AccordionSummary"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import ShortTextIcon from "@mui/icons-material/ShortText"
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  Switch,
  Tooltip,
} from "@mui/material"

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}))

export default function Accordian(props) {
  var [question, setQuestion] = useState(props.question)
  const [options, setOptions] = useState(props.question.options)
  const [questionType, setQuestionType] = useState("radio")
  const [answer, setAnswer] = useState([])
  const [isPrimary, setIsPrimary] = useState(false)

  const [expanded, setExpanded] = React.useState("panel1")

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  async function removeOption(j) {
    if (options.length > 1) {
      const ops = [...options]
      setOptions((prev) => {
        ops.splice(j, 1)
        prev = [...ops]
        return prev
      })
      setQuestion((prev) => {
        prev.options = options
        prev.answer = answer
        prev.isPrimary = isPrimary
        return prev
      })
      props.questionCallback(props.index, question)
      //  setQuestions(removeOptionQuestions)
    }
  }

  function addOption() {
    if (options.length < 5) {
      const newOption = { optionText: " Option " + (options.length + 1) }
      setOptions((prev) => [...prev, newOption])
      setQuestion((prev) => {
        prev.options = [...options]
        return prev
      })
      props.questionCallback(props.index, question)
    } else {
      console.log("Max 5 questions ")
    }
    // this.forceUpdate();
    //  setQuestions(optionsOfQuestion)
  }

  function addQuestionType(type) {
    setQuestion((prev) => {
      prev.questionType = type
      return prev
    })
    setQuestionType(type)

    // let qs =prev
    //console.log(question)
    // qs[i].questionType = type
    // setQuestion(qs)
  }

  var handleAnswerChange = (j) => {
    if (questionType === "radio") {
      setAnswer([j])
    } else {
      setAnswer((prev) => {
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

  function changeAnsColor(ind) {
    if (questionType !== "text")
      options?.forEach((op, i) => {
        if (ind.includes(i))
          document.getElementById(`optionbody_${i + 1}`).style.background =
            "#7ce3b58a"
        else
          document.getElementById(`optionbody_${i + 1}`).style.background =
            "white"
      })
  }
  //console.log(answer)

  const questionSubmit = () => {
    setQuestion((prev) => {
      prev.options = options
      prev.answer = answer
      prev.isPrimary = isPrimary
      return prev
    })
    // console.log(question)
    props.questionCallback(props.index, question)
  }

  const changePrimary = (event) => {
    setIsPrimary(event.target.checked)
  }

  useEffect(() => {
    changeAnsColor(answer)
    console.log(answer)
  }, [answer])

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>
            {question.questionText.substring(0, 30) + "..."}
          </Typography>
        </AccordionSummary>
        <form>
          <AccordionDetails>
            <div className="add_question_top">
              <input
                type="text"
                className="question"
                placeholder={question.questionText}
                onChange={(e) => {
                  setQuestion((prev) => {
                    prev.questionText = e.target.value
                    return prev
                  })
                  props.questionCallback(props.index, question)
                }}
                required
              />
              <p>Type</p>

              {/* <Select
              labelId="demo-simple-select-label"
              className="select"
              style={{ color: "#5f6368", fontsize: "13px" }}
              label="fdsa"
            > */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={questionType}
                label="Question Type"
                // onChange={handleChange}
              >
                <MenuItem
                  id="checkbox"
                  value="checkbox"
                  onClick={() => {
                    addQuestionType("checkbox")
                  }}
                >
                  {/* <CheckBoxIcon style={{ marginRight: "10px" }} checked /> */}
                  Multiple Choices
                </MenuItem>
                <MenuItem
                  id="radio"
                  value="radio"
                  onClick={() => {
                    addQuestionType("radio")
                  }}
                >
                  {/* <Radio style={{ marginRight: "10px" }} /> */}
                  Single Choice
                </MenuItem>
                <MenuItem
                  id="text"
                  value="text"
                  onClick={() => {
                    addQuestionType("text")
                  }}
                >
                  {/* <Radio style={{ marginRight: "10px" }} /> */}
                  Short Answer
                </MenuItem>
              </Select>
              <div className="question_edit">
                <AddCircleOutline
                  className="edit"
                  onClick={props.addQuestionCallback}
                />
                <DeleteOutlinedIcon
                  className="edit"
                  onClick={() => {
                    props.deleteQuestionCallback(props.index)
                  }}
                />
                {/* <CropOriginalOutlined className="edit" />
              <TextFieldsOutlined className="edit" /> */}
              </div>
            </div>

            <div className="question_options">
              {options.map((option, j) => (
                <div
                  className="add_question_body"
                  key={j}
                  id={`optionbody_${j + 1}`}
                >
                  {questionType != "text" ? (
                    <>
                      <input
                        type={questionType}
                        style={{ marginRight: "10px" }}
                        name="question_option"
                        onChange={() => {
                          handleAnswerChange(j)
                        }}
                      />

                      <div style={{ width: "70%" }}>
                        <input
                          type="text"
                          className="text_input"
                          placeholder={option.optionText}
                          required
                          onChange={(e) => {
                            setOptions((prev) => {
                              prev[j].optionText = e.target.value
                              return prev
                            })
                            setQuestion((prev) => {
                              prev.options = [...options]
                              return prev
                            })
                            props.questionCallback(props.index, question)
                          }}
                        />
                      </div>

                      {/* <CropOriginalOutlined style={{ color: "#5f6368" }} /> */}
                      <IconButton
                        aria-label="addOption"
                        onClick={() => {
                          addOption(props.index)
                        }}
                      >
                        <AddOutlinedIcon />
                      </IconButton>
                      {/* <Button
                        size="small"
                        onClick={() => {
                          addOption(props.index)
                        }}
                      >
                        {" "}
                        Add option
                      </Button> */}
                      <IconButton
                        aria-label="delete"
                        onClick={() => removeOption(j)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <ShortTextIcon style={{ marginRight: "10px" }} />
                      <div style={{ width: "70%" }}>
                        <input
                          type="text"
                          className="question"
                          placeholder={option.optionText}
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="primary-container">
              <span>Primary</span>
              <Switch
                // ref={questionAnswer}
                name="checkedA"
                color="primary"
                checked={isPrimary}
                inputProps={{ "aria-label": "controlled" }}
                onChange={(e) => {
                  changePrimary(e)
                }}
              />
              <Tooltip title="Add" placement="top">
                <InfoOutlinedIcon />
              </Tooltip>
            </div>
          </AccordionDetails>
        </form>
      </Accordion>
    </div>
  )
}
