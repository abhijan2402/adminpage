import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
const Forgotpass = () => {
  const [email, setemail] = useState(null)
  const ResetLink = async () => {
    try {
      sendPasswordResetEmail(auth, email)
        .then(() => {

          console.log("link sent successfully")
          setemail("")
          alert("Link Send Successfully (Check Spam Also)")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
          console.log(errorMessage)
        });
    } catch (error) {
      console.log(error);
    }
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
          <Typography variant="h5" padding={3} textAlign="center">Forgot Password</Typography>


          <TextField margin="normal" type={'email'} variant="outlined" placeholder="Email" onChange={(event) => setemail(event.target.value)} />

          <Button
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="warning"
            onClick={ResetLink}
          >Forgot Password</Button>


        </Box>
      </form>
    </div>
  );
};

export default Forgotpass;
