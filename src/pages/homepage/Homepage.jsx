import { useEffect, useState } from "react";
import Figure from "./CardComponent";
import myTasks from './assets/myTasks.jpeg';

function Homepage() {
    
    const [logOut, setLogOut] = useState(false)

    useEffect(() => {
        if(logOut){
            window.sessionStorage.clear()
            window.location.href = "/login"
        }
    }, [logOut])


  return (
    <div>
        <div className="banner" style={{ height: "100px", width: "100%"}}></div>


        <div className="row" style={{margin: "1%"}}></div>


      <h1 style={{display: "inline"}}>Welcome </h1> <h1 style={{color: "red", display: "inline"}}>{window.sessionStorage.username}</h1>


        <div className="row" style={{margin: "1%"}}></div>

        <div className="row" style={{paddingLeft: "3%"}}>
            <button className="options">
            <div className="col-12">
                <h3>Account settings</h3>
            </div>
            </button>
            <button className="options" onClick={() => setLogOut(true)}>
            <div className="col-12">
                <h3>Logout</h3>
            </div>
            </button>

        </div>
      <div className="row" style={{margin: "3%"}}></div>

      <div className="row" style={{ color: "red" }}>
        <div className="col-md-4">
          <Figure
            imageSrc={myTasks}
            day="Last edit"
            month="TODO"
            heading="Task overview"
            description="Open, edit and clear tasks here"
            endpoint={"/myTasks"}
          />
        </div>
        <div className="col-md-4">
          <Figure
            imageSrc="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg"
            day="02"
            month="May"
            heading="Card 2"
            description="This is a description for card 2."
          />
        </div>
        <div className="col-md-4">
          <Figure
            imageSrc="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg"
            day="03"
            month="May"
            heading="Card 3"
            description="This is a description for card 3."
          />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
