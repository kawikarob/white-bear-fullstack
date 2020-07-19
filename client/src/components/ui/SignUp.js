import React from "react";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { v4 as getUuid } from "uuid";
// import axios from "axios";
import { connect } from "react-redux";
import axios from "axios";
// import actions from "../../store/actions";

class SignUp extends React.Component {
   constructor(props) {
      super(props);
      console.log("In a new class component");
      this.state = {
         isDisplayingInputs: false,
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

   async setPasswordState(passwordInput, emailInput) {
      console.log(passwordInput);

      const uniqChars = [...new Set(passwordInput)];

      if (passwordInput === "")
         this.setState({
            passwordError: "Please create a password.",
            hasPasswordError: true,
         });
      else if (passwordInput.length < 9) {
         this.setState({
            passwordError: "Your password must be at least 9 characters.",
            hasPasswordError: true,
         });
      } else if (this.checkHasLocalPart(passwordInput, emailInput)) {
         this.setState({
            passwordError:
               "For your safety, your password cannot contain your email address.",
            hasPasswordError: true,
         });
      } else if (uniqChars.length < 3) {
         this.setState({
            passwordError:
               "For your safety, your password must contain at least 3 unique characters.",
            hasPasswordError: true,
         });
      } else {
         this.setState({ passwordError: "", hasPasswordError: false });
      }
   }

   async validateAndCreateUser() {
      //   console.log("VALIDATE ME");
      const emailInput = document.getElementById("signup-email-input").value;
      //   console.log(emailInput);
      const passwordInput = document.getElementById("signup-password-input")
         .value;
      await this.setEmailState(emailInput);
      await this.setPasswordState(passwordInput, emailInput);
      if (
         this.state.hasEmailError === false &&
         this.state.hasPasswordError === false
      ) {
         // Create user obj
         const user = {
            id: getUuid(),
            email: emailInput,
            password: passwordInput,
            createdAt: Date.now(),
         };
         console.log("Created user object for POST: ", user);
         //post to API
         axios
            .post("/api/v1/users", user)
            .then((res) => {
               console.log(res);
            })
            .catch((err) => {
               console.log(err);
            });

         //this.props.history.push("/create-answer");

         // Mimic API Presponse:
         // axios
         //    .get(
         //       "https://raw.githubusercontent.com/kawikarob/white-bear-mpa/master/src/mock-data/user.json"
         //    )
         //    .then((res) => {
         //       // handle success
         //       const currentUser = res.data;
         //       console.log(currentUser);
         //       this.props.dispatch({
         //          type: actions.UPDATE_CURRENT_USER,
         //          payload: res.data,
         //       });
         //    })
         //    .catch((error) => {
         //       // handle error
         //       console.log(error);
         //    });
      }
   }

   render() {
      return (
         <div className="col-xl-5 offset-xl-1 mb-5 col-lg-5 offset-lg-1 col-md-5 offset-md-1 col-sm-6">
            <div className="card landing-padding mb-4 mr-5">
               <div className="landing-card-text" id="sign-up-card">
                  <h2 className="card-title">Nice to meet you</h2>
                  <p className="mb-4">Sign up for White Bear. Free forever.</p>

                  {this.state.isDisplayingInputs && (
                     <>
                        <p className="get-signed-up mb-4">
                           Let's get you signed up.
                        </p>
                        <label className="text-muted">Email address</label>

                        <input
                           type="email"
                           className={classnames({
                              "form-control": true,
                              "is-invalid": this.state.hasEmailError,
                           })}
                           id="signup-email-input"
                        />
                        {this.state.hasEmailError && (
                           <div className="text-danger">
                              {this.state.emailError}
                           </div>
                        )}

                        {/* <div
                           className="invalid-feedback"
                           id="warningUniqueEmail"
                           style={{ display: "none" }}
                        >
                           Email must contain at least 3 unique characters{" "}
                        </div> */}

                        <label className="text-muted mb-2">
                           Create a password
                           <br />
                           <span className="text-muted">
                              Must be at least 9 characters
                           </span>
                        </label>
                        <input
                           type="password"
                           className={classnames({
                              "form-control": true,
                              "is-invalid": this.state.hasPasswordError,
                           })}
                           id="signup-password-input"
                        />
                        {/* <div
                           className="invalid-feedback"
                           id="warningPassword"
                           style={{ display: "none" }}
                        > */}
                        {this.state.hasPasswordError && (
                           <div className="text-danger">
                              {this.state.passwordError}
                           </div>
                        )}

                        <div
                           className="invalid-feedback"
                           id="warningLength"
                           style={{ display: "none" }}
                        >
                           Your password must be at least 9 characters
                        </div>
                        <div
                           className="invalid-feedback"
                           id="warningSameAsLocal"
                           style={{ display: "none" }}
                        >
                           Your email address cannot be used in your password
                        </div>
                        <div
                           className="invalid-feedback"
                           id="warningStrongerPassword"
                           style={{ display: "none" }}
                        >
                           Please enter a stronger password{" "}
                        </div>

                        <button
                           to="create-answer"
                           className="btn btn-success btn-lg btn-block btn-lg landing-button mt-4"
                           onClick={() => {
                              this.validateAndCreateUser();
                           }}
                        >
                           Let's go!
                        </button>
                     </>
                  )}

                  {!this.state.isDisplayingInputs && (
                     <button
                        className="btn btn-success btn-lg btn-block btn-lg landing-button"
                        onClick={() => {
                           this.ShowInputs();
                        }}
                     >
                        Sign up
                     </button>
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

export default withRouter(connect(mapStateToProps)(SignUp));
