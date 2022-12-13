
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { styled } from "@mui/material/styles"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import MuiAccordion from "@mui/material/Accordion"
import MuiAccordionSummary from "@mui/material/AccordionSummary"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import { Button } from '@mui/material'
import { useParams } from 'react-router-dom'

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

function ViewResponse() {
  const converter = 
  const [expanded, setExpanded] = React.useState("panel1")

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  // const [question, setQuestion] = useState()
  const [responses, setResponses] = useState()
  const {email} = useParams()
  async function getAllRes() {
    
    const res = await axios.get(`/api/response/${email}`);
    setResponses(res.data)
    console.log(res.data)
  }
  // async function getAllQues() {
  //   const 
  // }
  useEffect(() => {
    getAllRes()
  }, [])

  const convert_to_csv_func = async (id) => {
    const resp = await axios.get(`/api/response`)
  }
  
  return (
    <div>
      {responses?.map((res, i) => (
        <div key={i}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>
                {i + 1} {res.submittedBy}
              </Typography>
              <Button onclick={() => {
                convert_to_csv_func(res._id)
              }} >Download to csv</Button>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="question_options">
                  {res.questions.map((ques, j) => (
                    <div
                      className="add_question_body"
                      key={j}
                      id={`optionbody_${j + 1}`}
                    >
                      {j + 1} {ques.questionText}
                      <div>
                        {ques.response.map((res, k) => (
                          <div className="response_options" key={k}>
                             {res}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  )
}

export default ViewResponse