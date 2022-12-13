import React,{useContext} from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { getAuth, signOut } from "firebase/auth";
import { ContextData } from '../App';
import Button from '@mui/material/Button';
function Home() {
  const {  getAutherUserDetails } = useContext(ContextData);
  const logOut=()=>{
    const auth = getAuth();
    signOut(auth).then(() => {
      getAutherUserDetails(null)
      alert("Sign Out")
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <div className={styles.homeDiv}>
      <div style={{
        width:'90%',
        display:"flex",
        alignItems:"flex-end",
        flexDirection: 'column',
      }}>
        <Button 
            variant="contained" 
            sx={{width:150}}
            color="warning"
            onClick={logOut}
            style={{
              margin:10
            }}
          >
                LogOut
        </Button>
      </div>
      <div>Home</div>
      <div className={styles.buttonDiv}>
        <button
          onClick={() => {
            
          }}
        >
          <Link
            style={{
                textDecoration:'none',
                color:"white"
            }}
            to="/Course">Course</Link>
        </button>
        <button
          onClick={() => {
            
          }}
        >
            <Link
                style={{
                    textDecoration:'none',
                    color:"white"
                }}
            to="/Activity">Activity</Link>
        </button>
        <button
          onClick={() => {
            
          }}
        >
            <Link
                style={{
                    textDecoration:'none',
                    color:"white"
                }}
            to="/FeedBack">FeedBack</Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
