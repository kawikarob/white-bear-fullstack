import React from "react";
import editIcon from "../../icons/edit.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../store/actions";

class MemoryCard extends React.Component {
   storeEditableCard() {
      console.log("STORING EDITABLE CARD");
      this.props.dispatch({
         type: actions.STORE_EDITABLE_CARD,
         payload: {
            card: this.props.card,
            prevRoute: "/all-cards",
         },
      });
   }

   render() {
      return (
         <div className="row mb-4">
            <div className="col-10">
               <div className="card bg-primary">
                  <div
                     className="card-body"
                     style={{ fontSize: "16px !important" }}
                  >
                     {this.props.card.imagery}
                  </div>
               </div>
               <div className="card bg-secondary">
                  <div
                     className="card-body"
                     style={{ fontSize: "16px !important" }}
                  >
                     {this.props.card.answer}
                  </div>
               </div>
            </div>
            <div className="col-2 justify-content-left">
               <Link
                  to="/edit"
                  className="btn btn-link float-right"
                  onClick={() => {
                     this.storeEditableCard();
                  }}
               >
                  <img src={editIcon} width="25 px" alt="" />
                  Edit
               </Link>
            </div>
         </div>
      );
   }
}

// global //
// state = store
function mapStateToProps(state) {
   return {};
}

export default connect(mapStateToProps)(MemoryCard);
