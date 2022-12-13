import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { db } from "../../firebase";
import { addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
const Course = () => {
  const [dense] = React.useState(false);
  const [secondary] = React.useState(false);
  const [courseName, setcourseName] = useState("")
  const [Cdescription, setCdescription] = useState("")
  const [CImageUrl, setCImageUrl] = useState("")
  const [CAName, setCAName] = useState("")
  const [CAExp, setCAExp] = useState("")

  const [orderDetail, setOrderDetail] = useState([]);


  useEffect(() => {
    getOrderData();
  }, [])
  const getOrderData = async () => {
    let resultArray = [];
    const docRef = collection(db, "Courses");
    try {
      const docSnap = await getDocs(docRef);
      docSnap.forEach((item) => {
        resultArray.push({ id: item.id, ...item.data() });
        console.log("hi");
      });
      console.log(resultArray);
      setOrderDetail(resultArray);

    } catch (error) {
      console.log(error)
    }
  }

  const Deletecourse = async (item) => {
    console.log(item.id)
    try {
      const docref = doc(db, "Courses", item.id);
      await deleteDoc(docref);
      toast.success('Your Course has deleted', {
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
    }
  }
  const SubmitFeedback = async () => {

    console.log(courseName)
    console.log(Cdescription)
    console.log(CImageUrl)
    if (courseName === "" || Cdescription === "" || CImageUrl === "") {
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
        await addDoc(collection(db, "Courses"), {
          Name: courseName,
          Description: Cdescription,
          ImageUrl: CImageUrl,
          adminName: CAName,
          AdminExperience: CAExp

        }).then((docRef) => {
          console.log(docRef.id)

          getOrderData();
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
        console.log(error);
      }
    }

  }
  return (
    <>
      <Box display="flex"
        flexDirection={"row"}>
        <div style={{ width: "50%" }}>
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

              <Typography variant="h5" padding={3} textAlign="center">Course</Typography>

              <TextField sx={{ width: 300 }} margin="normal" type={'text'} variant="outlined" placeholder="Course Name" onChange={(event) => setcourseName(event.target.value)} />
              <TextField sx={{ width: 300 }} margin="normal" type={'text'} variant="outlined" placeholder="Course Detail" onChange={(event) => setCdescription(event.target.value)} />
              <TextField sx={{ width: 300 }} margin="normal" type={'text'} variant="outlined" placeholder="Course ImageUrl" onChange={(event) => setCImageUrl(event.target.value)} />
              <TextField sx={{ width: 300 }} margin="normal" type={'text'} variant="outlined" placeholder="Course Admin Name" onChange={(event) => setCAName(event.target.value)} />
              <TextField sx={{ width: 300 }} margin="normal" type={'text'} variant="outlined" placeholder="Course Admin Exp" onChange={(event) => setCAExp(event.target.value)} />

              {/* mui list code */}

              <Button
                sx={{ marginTop: 3, borderRadius: 3, width: 220 }}
                variant="contained"
                color="warning"
                onClick={SubmitFeedback}
              >Add</Button>

              {/* mui list code */}



            </Box>

          </form>
        </div>
        <div>
          <Box
            display="flex"
            flexDirection={"column"}
            maxWidth={400}
            marginTop={5}
            padding={3}
            borderRadius={5}
            height="500px"
            boxShadow={"5px 5px 10px #ccc"}
            sx={{
              ":hover": {
                boxShadow: "10px 10px 20px #ccc",
              },
            }}>

            <Grid container spacing={2} overflow="scroll">

              <Grid item xs={12} md={6}  >
                <Typography sx={{ mt: 4, mb: 2, }} variant="h6" component="div" marginLeft={7}>
                  Course List
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
                                <DeleteIcon onClick={() => Deletecourse(item)} />
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
                                // primary={item.Name}
                                primary={<p>{item.Name}</p>}
                                secondary={secondary ? 'Secondary text' : null}
                              />
                              <ListItemText

                                primary={item.Description}
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

        </div>


      </Box>
      <ToastContainer />

    </>

  );
};

export default Course;
