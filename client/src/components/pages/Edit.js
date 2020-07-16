import React from "react";
import Header from "../ui/Header";
import Navigation from "../ui/Navigation";
import AppTemplate from "../ui/AppTemplate";
import saveIcon from "../../icons/save.svg";
import { Link } from "react-router-dom";
import memoryCards from "../../mock-data/memory-cards";
import toDisplayDate from "date-fns/format";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";
import { connect } from "react-redux";
import actions from "../../store/actions";
import isEmpty from "lodash/isEmpty";
import without from "lodash/without";

const memoryCard = memoryCards[0];

class Edit extends React.Component {
   constructor(props) {
      super(props);
      console.log("In the Edit component");
      this.state = {
         answerText: memoryCard.answer,
         imageryText: memoryCard.imagery,
         isDeleteChecked: false,
      };
   }

   checkHasInvalidCharCount() {
      if (
         this.state.imageryText.length > MAX_CARD_CHARS ||
         this.state.imageryText.length === 0 ||
         this.state.imageryText > MAX_CARD_CHARS ||
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

   setAnswerText(e) {
      console.log(e.target, e.target.value);
      this.setState({ answerText: e.target.value });
   }

   setDeleteButtonShown() {
      this.setState({ isDeleteChecked: !this.state.isDeleteChecked });
   }

   deleteCard() {
      // TODO: delete from database
      if (this.props.editableCard.prevRoute === "/review-answer") {
         this.deleteCardFromStore();
      }
      if (this.props.editableCard.prevRoute === "/all-cards") {
         this.props.history.push("/all-cards");
      }
   }

   deleteCardFromStore() {
      const deletedCard = this.props.editableCard.card;
      const cards = this.props.queue.cards;
      const filteredCards = without(cards, deletedCard);
      console.log(filteredCards);
      this.props.dispatch({
         type: actions.STORE_QUEUED_CARDS,
         payload: filteredCards,
      });
      if (filteredCards[this.props.queue.index] === undefined) {
         this.props.history.push("/review-empty");
      } else {
         this.props.history.push("/review-imagery");
      }
   }

   render() {
      return (
         <AppTemplate>
            <Header />
            <Navigation />

            <h4 className="my-4 text-center text-muted">Edit card</h4>

            {isEmpty(this.props.editableCard) === false && (
               <>
                  <div className="mb-4">
                     <div className="card bg-primary">
                        <div className="card-body">
                           {/* <textarea
                        rows="5"
                        className="d-sm-none"
                        defaultValue={memoryCard.imagery}
                     ></textarea> */}
                           <textarea
                              rows="4"
                              // className="d-none d-sm-block"
                              defaultValue={
                                 this.props.editableCard.card.imagery
                              }
                              onChange={(e) => this.setImageryText(e)}
                           ></textarea>
                        </div>
                     </div>

                     <div className="card bg-secondary">
                        <div className="card-body">
                           <textarea
                              rows="4"
                              defaultValue={this.props.editableCard.card.answer}
                              onChange={(e) => this.setAnswerText(e)}
                           ></textarea>
                        </div>
                     </div>

                     <p className="float-right text-muted">
                        <span
                           className={classnames({
                              "text-danger": checkIsOver(
                                 this.state.imageryText,
                                 MAX_CARD_CHARS
                              ),
                           })}
                        >
                           Top: {this.state.imageryText.length}/{MAX_CARD_CHARS}{" "}
                        </span>{" "}
                        &nbsp;&nbsp;
                        <span
                           className={classnames({
                              "text-danger": checkIsOver(
                                 this.state.answerText,
                                 MAX_CARD_CHARS
                              ),
                           })}
                        >
                           Bottom:
                           {this.state.answerText.length}/{MAX_CARD_CHARS}
                        </span>
                     </p>

                     <div className="clearfix"></div>
                  </div>
                  <Link
                     to={this.props.editableCard.prevRoute}
                     className="btn btn-link"
                  >
                     Discard changes
                  </Link>

                  <Link
                     to={this.props.editableCard.prevRoute}
                     className={classnames(
                        "btn btn-primary btn-lg float-right mb-6",
                        { disabled: this.checkHasInvalidCharCount() }
                     )}
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

                  <div className="clearfix"></div>
                  <div>
                     <h4 className="text-center text-muted mb-4">
                        Card properties
                     </h4>
                  </div>
                  <div className="row col-12">
                     <div className="text-muted mr-8 mb-4">
                        <p className="mb-2">Created on:</p>
                        <p className="mb-2">Last attempt:</p>
                        <p className="mb-2">Next attempt:</p>
                        <p className="mb-2">Consecutives:</p>
                     </div>
                     <div>
                        <p className="mb-2">
                           {toDisplayDate(
                              this.props.editableCard.card.createdAt,
                              "MMM. d, y"
                           )}
                        </p>
                        <p className="mb-2">
                           {toDisplayDate(
                              this.props.editableCard.card.lastAttemptAt,
                              "MMM. d, y"
                           )}
                        </p>
                        <p className="mb-2">
                           {toDisplayDate(
                              this.props.editableCard.card.nextAttemptAt,
                              "MMM. d, y"
                           )}
                        </p>
                        <p className="mb-2">
                           {
                              this.props.editableCard.card
                                 .totalSuccessfulAttempts
                           }
                        </p>
                     </div>

                     <div className="row col-8 mb-4">
                        <div className="custom-control custom-checkbox text-muted">
                           <input
                              type="checkbox"
                              className="custom-control-input"
                              onClick={() => {
                                 this.setDeleteButtonShown();
                              }}
                              id="delete-checkbox"
                           />
                           <label
                              className="custom-control-label"
                              htmlFor="delete-checkbox"
                           >
                              Show delete button
                           </label>
                        </div>
                     </div>
                  </div>
                  <div className="row col mb-4">
                     {this.state.isDeleteChecked && (
                        <button
                           className={classnames(
                              "btn btn-large btn-outline-danger"
                           )}
                           onClick={() => {
                              this.deleteCard();
                           }}
                           // id="delete-card"
                        >
                           Delete this card
                        </button>
                     )}
                  </div>
               </>
            )}
         </AppTemplate>
      );
   }
}

// global //
function mapStateToProps(state) {
   return {
      editableCard: state.editableCard,
      queue: state.queue,
   };
}

export default connect(mapStateToProps)(Edit);
