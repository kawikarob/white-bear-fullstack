import React from "react";
import Header from "../ui/Header";
import Navigation from "../ui/Navigation";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";

export default class CreateAnswer extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         answerText: "",
      };
   }

   checkHasInvalidCharCount() {
      if (
         this.state.answerText.length > MAX_CARD_CHARS ||
         this.state.answerText.length === 0
      ) {
         return true;
      } else {
         return false;
      }
   }

   setanswerText(e) {
      console.log(e.target, e.target.value);
      this.setState({ answerText: e.target.value });
   }

   render() {
      return (
         <AppTemplate>
            <Header />
            <Navigation />

            <h4 className="my-4 text-center text-muted">Add an answer</h4>
            <div className="mb-3">
               <div className="card bg-secondary">
                  <div className="card-body">
                     <textarea
                        rows="11"
                        className="d-none d-sm-block"
                        // id="answerInput"
                        autoFocus={true}
                        // defaultValue={memoryCard.imagery}
                        onChange={(e) => this.setanswerText(e)}
                     ></textarea>
                  </div>
               </div>
            </div>
            <div className="float-right mb-5" id="overLimit">
               <span
                  className={classnames({
                     "text-danger": checkIsOver(
                        this.state.answerText,
                        MAX_CARD_CHARS
                     ),
                  })}
               >
                  {this.state.answerText.length}
               </span>
               /{MAX_CARD_CHARS}
            </div>

            <div className="clearfix"></div>

            <Link
               to="create-imagery"
               className={classnames("btn btn-outline-primary float-right", {
                  disabled: this.checkHasInvalidCharCount(),
               })}
            >
               Next
            </Link>
         </AppTemplate>
      );
   }
}
