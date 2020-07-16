import React from "react";
import saveIcon from "../../icons/save.svg";
import Header from "../ui/Header";
import Navigation from "../ui/Navigation";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";

export default class CreateImagery extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         imageryText: "",
      };
   }

   checkHasInvalidCharCount() {
      if (
         this.state.imageryText.length > MAX_CARD_CHARS ||
         this.state.imageryText.length === 0
      ) {
         return true;
      } else {
         return false;
      }
   }

   setImageryText(e) {
      console.log(e.target, e.target.value);
      this.setState({ imageryText: e.target.value });
   }

   render() {
      return (
         <AppTemplate>
            <Header />
            <Navigation />

            <h4 className="my-4 text-center text-muted">
               Add memorable imagery
            </h4>

            <div className="mb-4">
               <div className="card bg-primary">
                  <div className="card-body">
                     {/* <textarea
                        rows="11"
                        className="d-sm-none"
                        autoFocus={true}
                        onChange={(e) => this.setImageryText(e)}
                     ></textarea> */}
                     <textarea
                        rows="6"
                        className="d-none d-sm-block"
                        autoFocus={true}
                        onChange={(e) => this.setImageryText(e)}
                     ></textarea>
                  </div>
               </div>

               <div className="card bg-secondary">
                  <div className="card-body">
                     One morning, when Gregor Samsa woke from troubled dreams,
                     he found himself transformed in his bed into a horrible
                     vermin. He lay on his armour-like back, and if he lifted
                     his head a little he could see his brown belly, slightly
                     domed and divided by arches into stiff sections. The
                     bedding was hardly able to cover it and seemed ready to
                     slide off any moment. His many legs, pitifully thin
                     compared with the size of the rest of him, waved about
                     helplessly as he looked. "What's happened to me?" he
                     thought. It wasn't a dream. His room, a proper human
                  </div>
               </div>

               <span
                  className={classnames({
                     "float-right": true,
                     "text-danger": checkIsOver(
                        this.state.imageryText,
                        MAX_CARD_CHARS
                     ),
                  })}
               >
                  {this.state.imageryText.length}/{MAX_CARD_CHARS}
               </span>

               <div className="clearfix"></div>
            </div>
            <Link
               to="create-answer"
               className="btn btn-link"
               id="error-imagery"
            >
               Back to answer
            </Link>

            <Link
               to="create-answer"
               className={classnames("btn btn-primary btn-lg float-right", {
                  disabled: this.checkHasInvalidCharCount(),
               })}
            >
               <img
                  src={saveIcon}
                  width="30px"
                  style={{ marginBottom: "2px" }}
                  className="mr-1"
                  alt=""
               />
               Save
            </Link>
         </AppTemplate>
      );
   }
}
