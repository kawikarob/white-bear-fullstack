import React from "react";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import hash from "object-hash";
import { v4 as getUuid } from "uuid";
import axios from "axios";
import { connect } from "react-redux";
import actions from "../../store/actions";

class Login extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         isDisplayingInputs: true,
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }

   ShowInputs() {
      this.setState({
         isDisplayingInputs: true,
      });
   }

   async setEmailState(emailInput) {
      const lowerCasedEmailInput = emailInput.toLowerCase();
      console.log(lowerCasedEmailInput);
      // eslint-disable-next-line
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailInput === "")
         this.setState({
            emailError: "Please enter your email address.",
            hasEmailError: true,
         });
      else if (emailRegex.test(lowerCasedEmailInput) === false) {
         console.log("Not a valid EMAIl");
         this.setState({
            emailError: "Please enter a valid email address.",
            hasEmailError: true,
         });
      } else {
         this.setState({ emailError: "", hasEmailError: false });
      }
   }
   checkHasLocalPart(passwordInput, emailInput) {
      const localPart = emailInput.split("@")[0];
      if (localPart === "") return false;
      else if (localPart.length < 4) return false;
      else return passwordInput.includes(localPart);
   }

   async setPasswordState(passwordInput) {
      console.log(passwordInput);

      if (passwordInput === "")
         this.setState({
            passwordError: "Please enter your password.",
            hasPasswordError: true,
         });
      else {
         this.setState({ passwordError: "", hasPasswordError: false });
      }
   }

   async validateAndCreateUser() {
      //   console.log("VALIDATE ME");
      const emailInput = document.getElementById("login-email-input").value;
      //   console.log(emailInput);
      const passwordInput = document.getElementById("login-password-input")
         .value;
      await this.setEmailState(emailInput);
      await this.setPasswordState(passwordInput, emailInput);
      if (
         this.state.hasEmailError === false &&
         this.state.hasPasswordError === false
      ) {
         const user = {
            id: getUuid(),
            email: emailInput,
            password: hash(passwordInput),
            createdAt: Date.now(),
         };
         console.log("Created user object for POST: ", user);
         // Mimic API Presponse:
         axios
            .get(
               "https://raw.githubusercontent.com/kawikarob/white-bear-mpa/master/src/mock-data/user.json"
            )
            .then((res) => {
               // handle success
               const currentUser = res.data;
               console.log(currentUser);
               this.props.dispatch({
                  type: actions.UPDATE_CURRENT_USER,
                  payload: res.data,
               });
            })
            .catch((error) => {
               // handle error
               console.log(error);
            });
         // redirect the user
         this.props.history.push("/create-answer");
      }
   }

   render() {
      return (
         <div className="col-xl-5 offset-xl-1 col-lg-5 col-md-5 col-sm-6">
            <div className="card landing-padding ">
               <div className="landing-card-text">
                  <h2 className="card-title mb-4">Welcome back</h2>
                  <p className="mb-4">
                     Log in with your email address and password.
                  </p>
                  {this.state.isDisplayingInputs && (
                     <div>
                        <div className="form-group">
                           <label
                              className="text-muted"
                              htmlFor="existingEmail"
                           >
                              Email address
                           </label>
                           <input
                              type="email"
                              className={classnames({
                                 "form-control": true,
                                 "is-invalid": this.state.hasEmailError,
                              })}
                              id="login-email-input"
                           />
                           {this.state.hasEmailError && (
                              <div className="text-danger">
                                 {this.state.emailError}
                              </div>
                           )}
                        </div>
                        <div className="form-group mb-4">
                           <label
                              className="text-muted"
                              htmlFor="login-password-input"
                           >
                              Password
                           </label>
                           <input
                              type="password"
                              className={classnames({
                                 "form-control": true,
                                 "is-invalid": this.state.hasPasswordError,
                              })}
                              id="login-password-input"
                           />
                           {this.state.hasPasswordError && (
                              <div className="text-danger">
                                 {this.state.passwordError}
                              </div>
                           )}

                           <button
                              to="create-answer"
                              className="btn btn-success bt-lg float-right mt-4"
                              onClick={() => {
                                 this.validateAndCreateUser();
                              }}
                           >
                              Log in
                           </button>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      );
   }
}

// global state //
function mapStateToProps(state) {
   return {};
}

export default withRouter(connect(mapStateToProps)(Login));
