import { useState, useEffect } from "react";

export default function AlertMessage({message, alertType}){

    const alertStyles = {
        success : {background:'green'},
        error: { backgroundColor: "red" },
        warning: { backgroundColor: "orange"},
        info: { backgroundColor: "blue"},
    };
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (message) {
            setIsVisible(true);

          const timer = setTimeout(() => {
            setIsVisible(false);
          }, 3000);  //close alert after 3secs
          return  ()=> clearTimeout(timer);  //at return anonymous funct run cleanup of the timer
        }
      }, [message]);
      if (!isVisible) return null;

    return (
        <>
            <div
                className="position-fixed top-0 start-50 text-center mt-4"  //mt-4 mx-auto col-4  //fixed si posiziona sempre x lo screen,don't check the parent!
                style={{
                    zIndex: 10,
                    padding: "10px",
                    borderRadius: "0.7rem",
                    color:'white',
                    ...alertStyles[alertType], // Applica lo stile dinamico
                }}
            >
                <h4 className='' style={{ paddingTop: "0.1rem" }}>{message}</h4>
            </div>
        </>
    );
}