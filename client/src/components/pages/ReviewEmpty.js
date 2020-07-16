import React from "react";
import Header from "../ui/Header";
import Navigation from "../ui/Navigation";
import AppTemplate from "../ui/AppTemplate";
import { connect } from "react-redux";
import actions from "../../store/actions";

class ReviewEmpty extends React.Component {
   goToPrevCard() {
      this.props.dispatch({ type: actions.DECREMENT_QUEUE_INDEX });
      this.props.history.push("/review-answer");
   }

   getMoreCards() {
      this.props.dispatch({ type: actions.RESET_QUEUE });
      this.props.history.push("review-imagery");
   }

   render() {
      return (
         <AppTemplate>
            <Header />
            <Navigation />

            <h4 className="text-center text-muted mb-5 my-4">Out of cards</h4>

            {this.props.queue.index > 0 && (
               <button
                  className="btn btn-button"
                  onClick={() => {
                     this.goToPrevCard();
                  }}
               >
                  Previous card
               </button>
            )}

            <div className="float-right">
               <button
                  className="btn btn-outline-primary mr-4"
                  onClick={() => {
                     this.getMoreCards();
                  }}
               >
                  Get more cards
               </button>{" "}
            </div>
         </AppTemplate>
      );
   }
}

// global //
function mapStateToProps(state) {
   return {
      queue: state.queue,
   };
}

export default connect(mapStateToProps)(ReviewEmpty);
