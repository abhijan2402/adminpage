import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth,db } from "../../firebase";
import { doc, setDoc, collection, } from "firebase/firestore";
import { Link,useNavigate } from "react-router-dom";
const Signup = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('');
  const navigate = useNavigate()
  const createNewUser = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid)
        const userRef = doc(db, 'UserCollection', user.uid);
        setDoc(userRef,{
          admin:true,
          email: email,
        })
        .then(() => {
          alert("Account Created");
          navigate('/VTechadmin')
        })
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("Email Already Exists")
            break;
          default:
            break;
        }
      });
  }
  return (
    <div>
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
          <Typography variant="h5" padding={3} textAlign="center">Sign Up</Typography>
          <TextField margin="normal" type={'email'} variant="outlined" placeholder="Email" onChange={(event) => setemail(event.target.value)} />
          <TextField margin="normal" type={'password'} variant="outlined" placeholder="Password" onChange={(event) => setpassword(event.target.value)} />
          <Button
            sx={{ marginTop: 3, borderRadius: 1, width: "57%",backgroundColor:"orange", }}
            variant="contained"
            onClick={createNewUser}
          >Sign Up</Button>
          <Link
            style={{
              textDecoration:'none',
              color:"white",
              height:40,
              width:"57%",
              backgroundColor:"orange",
              borderRadius:3,
              display:"flex",
              alignItems:"center",
              justifyContent: 'center',
              marginTop: 10,
            }}
            to="/">
              Login
            </Link>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
