import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { db } from "../../firebase";
import { addDoc, collection, getDocs, updateDoc , deleteDoc, doc } from "firebase/firestore";
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import ActivityQuestions from './ActivityQuestions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ListActivity = () => {
    const [dense, setDense] = React.useState(false);
    const [quizID,setQuizId]=useState('');
    const [NOQuestion, setNOQuestion] = useState(0)
    const [orderDetail, setOrderDetail] = useState([]);
    const [secondary, setSecondary] = React.useState(false);
    const [activityQuestionsDetails,setActivitydetails]=useState([]);
    const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  useEffect(() => {
    getOrderData();
  }, [])
  const getOrderData = async () => {
    let resultArray = [];
    const docRef = collection(db, "Quiz");
    try {
      const docSnap = await getDocs(docRef);
      docSnap.forEach((item) => {
        resultArray.push({ id: item.id, ...item.data() });
      });
      console.log(resultArray);
      setOrderDetail(resultArray);

    } catch (error) {
      console.log(error)
    }
  }
  const DeleteActivity = async (item) => {
    console.log(item.id)
    try {
      const docref = doc(db, "Quiz", item.id);
      await deleteDoc(docref);
      console.log("delete successfully")
      toast.success('🦄 Your Activity has is Deleted Successfull', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "light",
      });
      getOrderData();
    } catch (error) {
      console.log(error)
      toast.success('Your Activity has not Delete', {
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
  }
  const setActivtiyData=(activityData)=>{
    setNOQuestion(activityData.NOQues);
    setActivitydetails(activityData.QuesArray);
    setQuizId(activityData.id);
  }
  const updateActivityData=async(newQuizData)=>{
    try {
        const quizRef = doc(db, "Quiz", quizID);
        updateDoc(quizRef, {
            QuesArray:newQuizData
        })
        .then(()=>{
          toast.success('🦄 Your Activity has is added', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            theme: "light",
          });
        })
        .catch((e)=>{
          console.log(e);
          toast.success('Your Activity has not added', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            theme: "light",
            type: "error"
          });
        })
    } catch (error) {
        console.log(error)
    }

  }
  return (
    <div style={{
      display:"flex",
      width:"100%",
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
          <Typography variant="h5" padding={3} textAlign="center">View Activity</Typography>
          <Grid container spacing={2} alignContent="center">

            <Grid item xs={12} md={6}  >
              <Typography sx={{ mt: 4, mb: 2, }} variant="h6" component="div" marginLeft={7}>
                Quiz List
              </Typography>
              <Demo sx={{ m: 1 }}>
                <List dense={dense} >
                  {
                    orderDetail.length === 0 ? null :
                      orderDetail.map((item, index) => (
                        <ListItem
                          key={index}
                          sx={{ m: 3, width: 300 }}
                          secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                              <DeleteIcon onClick={() => DeleteActivity(item)} />
                            </IconButton>
                          }
                        >
                          <ListItemAvatar   >
                            <Avatar>
                              <FolderIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <ListItemText
                                onClick={()=>setActivtiyData(item)}
                                primary={item.ActivityName}
                                secondary={secondary ? 'Secondary text' : null}
                            />
                            <ListItemText

                              primary={item.id}
                              secondary={secondary ? 'Secondary text' : null}
                            />
                          </div>
                        </ListItem>
                      ))
                  }
                </List>
              </Demo>
            </Grid>
          </Grid>
        </Box>
      </form>
      {
        NOQuestion===0?null:
        <ActivityQuestions
          numofQues={NOQuestion}
          uploadFunction={updateActivityData}
          title="Update Quiz"
          alreadyUploadedQuiiz={activityQuestionsDetails}
          message={"Updated"}
          quizID={quizID}
        />
      }
      <ToastContainer />
    </div>
  );
};

export default ListActivity;
