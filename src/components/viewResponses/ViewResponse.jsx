
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
import Box from "@mui/material/Box"
import { DataGrid } from "@mui/x-data-grid"



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
  
  const converter = require("json-2-csv")
  

  // read JSON from a file
  // const todos = JSON.parse(fs.readFileSync("todos.json"))

  const [expanded, setExpanded] = React.useState("panel1")

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  // const [question, setQuestion] = useState()
  const [responses, setResponses] = useState([])
  const [userResponseArray, setUserResponseArray] = useState([])
  const { email } = useParams()
  

  async function getAllRes() {
    
    const res = await axios.get(`/api/forms/${email}`);
    setResponses(res.data)
    console.log(res.data)
    res.data.forEach(async userResp => {
      const resp = await axios.get(`/api/response/${email}`)
      setUserResponseArray(prev => {
        prev.push(resp.data);
        return prev;
      })
    })
  }
  // async function getAllQues() {
  //   const 
  // }
  useEffect(() => {
    getAllRes()
    console.log(userResponseArray)
  }, [])

  const convert_to_csv_func = async (id) => {
    const resp = await axios.get(`/api/response/${email}`)
    // console.log("hi")
    converter.json2csv(resp.data, (err, csv) => {
      if (err) {
        throw err
      }

      // print CSV string
      console.log(csv)
    })
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
                {i + 1} {res.name}
              </Typography>{" "}||{" "}
              <Typography>
                {i + 1} {res.description}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="question_options">
                  submitted by : {res.submittedBy}
                  <Box sx={{ height: 520, width: "100%" }}>
                    <DataGrid
                      rows={res.questions}
                      columns={columns}
                      getRowId={(row) => row._id}
                    />
                  </Box>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  )
}


var columns = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "questionText",
    headerName: "Question",
    width: 150,
    editable: true,
  },
  {
    field: "questionType",
    headerName: "Question Type",
    width: 150,
    editable: true,
  },
  {
    field: "response",
    headerName: "Response",
    width: 110,
    editable: true,
  },
  {
    field: "isPrimary",
    headerName: "Primary",
    width: 110,
    editable: true,
  },
  {
    field: "submittedBy",
    headerName: "Created By",
    description: "This response is submitted by",
    width: 160,
  },
]

var rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
]

export default ViewResponse