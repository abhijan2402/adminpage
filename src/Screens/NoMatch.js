import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./NoMatch.css";
export default function NoMatch() {
  const navigate = useNavigate();
  useEffect(()=>{
    navigate('/')
  })
  return (
    <>
      <div className="error-msg">
        Page not found!!!!
        <br></br>
      </div>
    </>
  );
}
