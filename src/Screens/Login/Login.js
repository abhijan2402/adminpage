import React, { useState,useContext } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import {ContextData} from '../../App';
import { useEffect } from "react";
const Login = () => {
  const {getAutherUserDetails}=useContext(ContextData);
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('');
  useEffect(()=>{
    getAutherUserDetails()
  },[])
  const newUser = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user.uid)
        getAutherUserDetails(userCredential.user.uid)
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            alert("Incorrect Email")
            break;
          case "auth/wrong-password":
            alert("Incorrect Password");
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
          boxShadow={"5px 5px 10px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px 10px #ccc",
            },
          }}
        >
          <Typography variant="h5" padding={3} textAlign="center">Login</Typography>

          {/* <TextField margin="normal" type={'text'} variant="outlined" placeholder="Name" /> */}
          <TextField margin="normal" type={'email'} variant="outlined" placeholder="Email" onChange={(event) => setemail(event.target.value)} />
          <TextField margin="normal" type={'password'} variant="outlined" placeholder="Password" onChange={(event) => setpassword(event.target.value)} />

          <Button
            sx={{ marginTop: 3, borderRadius: 1, width: "57%", backgroundColor: "orange", }}
            variant="contained"
            color="warning"
            onClick={newUser}
          >Login</Button>
          <Link
            style={{
              textDecoration: 'none',
              color: "white",
              height: 40,
              width: "57%",
              backgroundColor: "orange",
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: 'center',
              marginTop: 10,
            }}
            to="/VTechadmin/sign">
            Create Account
          </Link>
          <Link
            style={{
              textDecoration: 'none',
              color: "white",
              height: 40,
              width: "57%",
              backgroundColor: "orange",
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: 'center',
              marginTop: 10,
            }}
            to="/VTechadmin/ForgotPassword">
            Forgot password?
          </Link>
        </Box>
      </form>
    </div>
  );
};

export default Login;
