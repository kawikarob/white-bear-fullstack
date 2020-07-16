import React from "react";
import landingLogo from "../../img/logo-landing.png";
import SignUp from "../ui/SignUp";
import Login from "../ui/Login";

export default function Landing() {
   return (
      <div className="background-img">
         <div className="container">
            <div className="row">
               <div className="col">
                  {/* logo and text */}
                  <div className="row mt-6">
                     <div className="">
                        <div className="d-flex justify-content-start">
                           <img src={landingLogo} alt="Landing Logo" />
                           <h1>White Bear</h1>
                        </div>
                     </div>
                  </div>
                  <div className="row mt-5">
                     {/* card 1 */}
                     <SignUp />

                     {/* card 2 */}
                     <Login />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
