import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { db } from "../../firebase";
import { addDoc, collection, getDocs, where, query, doc, updateDoc } from "firebase/firestore";
import { DataGrid } from '@mui/x-data-grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Feedback = () => {
  let i = 1;
  const den = []
  const [ReviewName, setReviewName] = useState("")
  const [QuizID, setQuizID] = useState('')
  const [UserID, setUserID] = useState('')
  const [Feedback, setFeedback] = useState("")
  const [orderDetail, setOrderDetail] = useState([]);
  const [selectedActivity, selctedActivityForFeedback] = useState([]);
  const [mainId, setmainId] = useState("")
  const [ReviewStars, setReviewStars] = useState('')
  const [Stars, setStars] = useState([])
  useEffect(() => {
    getOrderData();
  }, [])
  const getOrderData = async () => {
    let resultArray = [];
    try {
      let conditionTwo = where("status", "==", 'Pending');
      const baseQuery = query(collection(db, "UserPerformance"), conditionTwo);
      getDocs(baseQuery).then((res) => {
        res.forEach((item) => {
          resultArray.push({ id: item.id, ...item.data() });
        })
        setOrderDetail(resultArray);

      })
    } catch (error) {
      console.log(error)
    }
  }
  const SubmitFeedback = async () => {
    setArrayStars();
    if (Feedback === "" || QuizID === "" || UserID === "" || ReviewName === "") {
      toast.warning('Please fill all the fields', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "light",
        type: "error"
      });
    }
    else {
      try {
        const dbRef = doc(db, "UserPerformance", mainId);
        await updateDoc(dbRef, {
          AdminFeedback: Feedback,
          status: "completed",
          ReviewerName: ReviewName,
          StarArray: Stars
        }).then((docRef) => {
          toast.success('🦄 Your feedback has given to student', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            theme: "light",
          });
          getOrderData();
          setQuizID('');
          setUserID('');
        }).catch((error) => {
          console.log(error.code)
          console.log(error.message)
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  const filterSelectedData = (selectedID) => {
    const resultedActivity = orderDetail.filter((item) => {
      return item.id === selectedID.id
    })
    selctedActivityForFeedback(resultedActivity[0].QuesArray);
    setQuizID(resultedActivity[0].UserID)
    setUserID(resultedActivity[0].quizID)
    setmainId(resultedActivity[0].id)

  }
  const setArrayStars = () => {
    setStars([])
    let i = 0;
    for (i = 0; i < ReviewStars; i++) {
      Stars.push("stars")
    }

  }
  const setnumques = (num) => {
    if (num.target.value > 5) {
      alert("Maximum 5 questions are allow");
      return;
    }
    setReviewStars(num.target.value)
  }
  return (
    <>
      <Box display="flex"
        flexDirection={"row"}>
        <div style={{ marginLeft: "5%" }}>
          <form>
            <Box
              display="flex"
              flexDirection={"column"}
              maxWidth={400}
              alignItems={"center"}
              justifyContent={"center"}
              margin="auto"
              marginTop={5}
              padding={3}
              borderRadius={5}
              boxShadow={"5px 5px 10px #ccc"}
              sx={{
                ":hover": {
                  boxShadow: "10px 10px 20px 10px #ccc",
                },
              }}
            >
              <Typography variant="h5" padding={3} textAlign="center">Feedback Form</Typography>
              <TextField sx={{ width: 350 }} margin="normal" type={'text'} variant="outlined" placeholder="Quiz ID" value={QuizID} />
              <TextField sx={{ width: 350 }} margin="normal" type={'text'} variant="outlined" placeholder="UserID" value={UserID} />
              <TextField sx={{ width: 350 }} margin="normal" type={'text'} variant="outlined" placeholder="Reviewer Name" onChange={(event) => setReviewName(event.target.value)} />
              <TextField sx={{ width: 350 }} InputProps={{ sx: { height: 180 } }} margin="normal" type='text' variant="outlined" placeholder="Feedback" onChange={(event) => setFeedback(event.target.value)} />
              <TextField sx={{ width: 350 }} margin="normal" type='number' variant="outlined" placeholder="Stars" onChange={(event) => setnumques(event)} inputProps={{
                maxLength: 2,
              }} />

              <Button
                sx={{ marginTop: 3, borderRadius: 3, width: 220 }}
                variant="contained"
                color="warning"
                onClick={SubmitFeedback}
              >Submit</Button>
            </Box>
          </form>
        </div>
        <div style={{ height: "500px", margin: "auto", width: "auto", marginTop: "30px", marginBottom: "10%", borderRadius: "35px", width: "60%" }}>
          <h1>Feedback on assignment</h1>
          <DataGrid
            onRowClick={(params) => filterSelectedData(params)}
            rows={
              orderDetail.map((item, index) => (
                { sno: i++, id: item.id, Feedback: item.AdminFeedback, Name: item.ReviewerName, status: item.status }
              ))}
            columns={[
              { field: 'sno', headerName: 'sno', width: 40 },
              { field: 'id', headerName: 'ID', width: 210 },
              { field: 'Name', headerName: 'Name', width: 200 },
              { field: 'Feedback', headerName: 'Feedback', width: 300 },
              { field: 'status', headerName: 'status', width: 150 },
            ]}
            pageSize={9}
            rowsPerPageOptions={[8]}
            style={{ margin: "auto", borderRadius: "5px", BorderColor: "black", width: "100%", border: "2px solid black", padding: "10px" }}
          />
        </div>
      </Box>
      <ToastContainer />
      {
        selectedActivity.length === 0 ? null :
          selectedActivity.map((item, index) => (
            <div>
              <div style={{
                width: 500,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 10,
                marginBottom: 10,
              }} className="qustion-div">
                <div style={{ width: '80%' }}>
                  <h3 style={{ fontWeight: "bold", textAlign: "left", marginLeft: 10 }}>Question {index + 1}</h3>
                  <h4 style={{ fontWeight: "bold", textAlign: "left", marginLeft: 25 }}>{item.question}</h4>
                </div>
                <div style={{ width: '80%', }}>
                  <h3 style={{ fontWeight: "bold", textAlign: "left", marginLeft: 10 }}>Options</h3>
                  {
                    item.options.map((val, index) => (
                      <h4 style={{ fontWeight: "bold", textAlign: "left", marginLeft: 25 }}>{val.answer}</h4>
                    ))
                  }
                </div>
                <div style={{ width: "100%", }}>
                  <h3 style={{ fontWeight: "bold", textAlign: "left", marginLeft: 25 }}>Answer Given by User</h3>
                  <h4 style={{ fontWeight: "bold", textAlign: "left", marginLeft: 25 }}>{item.userAnswer}</h4>
                </div>
                <div style={{ width: '90%', display: "flex", justifyContent: 'space-between', }}>
                  <h4 style={{ fontWeight: "bold", textAlign: "left", }}>
                    Correct Answer {item.correctAnswerIndex + 1}
                  </h4>
                  <h4 style={{ fontWeight: "bold", textAlign: "left", }}>
                    Selected option By User {item.selectedOption + 1}
                  </h4>
                </div>
              </div>
            </div>
          ))
      }
    </>
  );
};
export default Feedback;