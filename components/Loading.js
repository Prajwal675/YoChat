//import React from 'react'
// server side rendering
// we use inline styles

import { Circle } from "better-react-spinkit";
function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh"}}>
        <div>
            <img 
                src="/chat.png"
                alt=""
                style={{ marginBottom: 10}}
                height={200}
            />
            <Circle color="#FFA500" size={60} />
        </div>
    </center>  
    
  )
}

export default Loading