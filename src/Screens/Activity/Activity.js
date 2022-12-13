import React, { useState, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { db } from "../../firebase";
import { addDoc, collection,getDocs } from "firebase/firestore";
import ActivityQuestions from './ActivityQuestions';
import { Link } from "react-router-dom";
import './Activity.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Activity = () => {

  const [ActivityName, setActivityName] = useState('')
  const [NOQuestion, setNOQuestion] = useState('')
  const [courseref,setCousreref]=useState('');
  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    getOrderData();
  }, [setNOQuestion])

  const getCourse=(courseID)=>{
    const getCourse=orderDetail.filter((item)=>{
      return courseID===item.id;
    })
    setCousreref(getCourse[0]);
  }
  const getOrderData = async () => {
    let resultArray = [];
    const docRef = collection(db, "Courses");
    try {
      const docSnap = await getDocs(docRef);
      docSnap.forEach((item) => {
        resultArray.push({ id: item.id, ...item.data()});
      });
      setCousreref(resultArray[0]);
      setOrderDetail(resultArray);
    } catch (error) {
      console.log(error)
    }
  }
  const setnumques=(num)=>{
    if(num.target.value>5){
      alert("Maximum 5 questions are allow");
      return;
    }
    setNOQuestion(num.target.value)
  }
  const uploadToFireBase=(updatedQuizFormat)=>{
    try {
        if(ActivityName=='' || NOQuestion=='' || courseref==''){
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
          return ;
        }
        addDoc(collection(db, "Quiz"), {
            ActivityName: ActivityName,
            NOQues: NOQuestion,
            QuesArray: updatedQuizFormat,
            courseRef:courseref.id,
            courseName:courseref.Name
        }).then(() => {
           toast.success('🦄 Your Course has is added', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            theme: "light",
          });
        }).catch((error) => {
            console.log(error.code)
            console.log(error.message)  
            toast.success('Your Course has not added', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              theme: "light",
              type: "error"
            });
        });
    } catch (error) {
        alert(error);
    }
  }
  return (
    <div style={{
      display: "flex",
      width: "100%",
      justifyContent: 'space-around',
    }}>
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
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography
            variant="h5"
            padding={3}
            textAlign="center">
            Activity
          </Typography>

          <TextField
            sx={{ width: 350 }}
            margin="normal"
            type={'text'}
            variant="outlined"
            placeholder="Activity Name"
            onChange={(event) => setActivityName(event.target.value)}
          />
          <TextField 
              InputProps={{ inputProps: { min: 1 } }} sx={{ width: 350 }} 
              margin="normal" type={'number'} 
              variant="outlined" 
              placeholder="Number Of Question" 
              onChange={(event) => setnumques(event)} 
          />
          <select  
              style={{
                  width:'100%',
                  height:40,
                  margin:10,
                  textAlign:"left",
                  borderWidth:1,
                  borderRadius:5
              }}
              onChange={(item)=>getCourse(item.target.value)}>
                
              {
                  orderDetail.map((value)=>(
                      <option value={value} style={{marginTop:5,padding:10}}>{value.Name}</option>
                  ))
              }
          </select>
          <Link
            style={{
              textDecoration:'none',
              color:"white",
              height:40,
              width:"100%",
              backgroundColor:"orange",
              borderRadius:5,
              display:"flex",
              alignItems:"center",
              justifyContent: 'center',
            }}
            to="listactivity">
              Go To List
            </Link>
        </Box>
      </form>
      {
        NOQuestion === '' ? null :
          <ActivityQuestions
            numofQues={NOQuestion}
            uploadFunction={uploadToFireBase}
            title="Post Quiz"
            alreadyUploadedQuiiz={null}
            message={"Created"}
            activityName={ActivityName}
            quizID={null}
          />
      }
    <ToastContainer />
    </div>
  );
};

export default Activity;
