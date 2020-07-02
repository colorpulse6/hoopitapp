import React from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
// import ReactLoading from "react-loading";
import "bootstrap/dist/css/bootstrap.css";
import loader from './loading-gif-1.json'

class Loading extends React.Component {


    render(){
  
      const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
  
      return(
        <div className="loader">
          
          <Lottie options={defaultOptions}
                height={400}
                width={400}
          />
        </div>
      )
    }
  }
  
  export default Loading