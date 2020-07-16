import React from "react";
import Header from "../ui/Header";
import Navigation from "../ui/Navigation";
import AppTemplate from "../ui/AppTemplate";
import MemoryCard from "../ui/MemoryCard";
import orderBy from "lodash/orderBy";
import axios from "axios";

export default class AllCards extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         order: '["createdAt","desc"]',
         displayedMemoryCards: [],
         allMemoryCards: [],
      };
   }

   componentDidMount() {
      axios
         .get(
            "https://raw.githubusercontent.com/kawikarob/white-bear-mpa/master/src/mock-data/memory-cards.json"
         )
         .then((res) => {
            // handle success
            console.log(res.data);
            const memoryCards = res.data;
            this.setState({
               displayedMemoryCards: orderBy(
                  memoryCards,
                  ["createdAt"],
                  ["desc"]
               ),
               allMemoryCards: orderBy(memoryCards, ["createdAt"], ["desc"]),
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   filterByInput() {
      const input = document.getElementById("search-input").value;
      const lowerCasedInput = input.toLowerCase();
      console.log(lowerCasedInput);
      const copyOfAllMemoryCards = [...this.state.allMemoryCards];
      console.log(copyOfAllMemoryCards);
      const filteredMemoryCards = copyOfAllMemoryCards.filter((memoryCard) => {
         const lowerCasedImagery = memoryCard.imagery.toLowerCase();
         const lowerCasedAnswer = memoryCard.answer.toLowerCase();
         if (
            lowerCasedImagery.includes(lowerCasedInput) ||
            lowerCasedAnswer.includes(lowerCasedInput)
         ) {
            return true;
         } else return false;
      });
      this.setState({ displayedMemoryCards: filteredMemoryCards }, () => {
         this.setMemoryCards();
      });
   }

   setOrder(e) {
      const newOrder = e.target.value;
      console.log(newOrder);
      this.setState({ order: newOrder }, () => {
         this.setMemoryCards();
      });
   }

   setMemoryCards() {
      console.log("setting memory cards");
      const copyOfDisplayedMemoryCards = [...this.state.displayedMemoryCards];
      const toJson = JSON.parse(this.state.order);
      console.log(...toJson);
      const orderedMemoryCards = orderBy(copyOfDisplayedMemoryCards, ...toJson);
      console.log(orderedMemoryCards);
      this.setState({ displayedMemoryCards: orderedMemoryCards });
   }

   setMemoryCardsOrder(e) {
      const newOrder = e.target.value;
      console.log(newOrder);
      const copyOfMemoryCards = [...this.state.memoryCards];
      const toJson = JSON.parse(newOrder);
      console.log(...toJson);
      const orderMemoryCards = orderBy(copyOfMemoryCards, ...toJson);
      console.log(orderMemoryCards);
      this.setState({ order: newOrder, memoryCards: orderMemoryCards });
   }

   render() {
      return (
         <AppTemplate>
            <Header />
            <Navigation />
            <div className="input-group-prepend mt-4 mb-5">
               <input
                  type="text"
                  className="form-control col-8 border"
                  placeholder="Search for a word"
                  id="search-input"
               />
               <button
                  type="submit"
                  className="btn btn-secondary btn-sm col-3 offset-1 thick-border"
                  onClick={() => this.filterByInput()}
               >
                  Search
               </button>
               <div className="clearfix"></div>
            </div>
            <div className="row">
               <div className="col-6">
                  <p className="text-muted mt-1">Sort cards by</p>
               </div>
               <div className="col-6 mb-5">
                  <select
                     value={this.state.order}
                     className="form-control border"
                     onChange={(e) => this.setOrder(e)}
                  >
                     <option value='["createdAt", "desc"]'>Most recent</option>
                     <option value='["createdAt","asc"]'>Oldest</option>
                     <option value='[["totalSuccessfulAttempts", "createdAt"],["asc", "asc"]]'>
                        Hardest
                     </option>
                     <option value='[["totalSuccessfulAttempts", "createdAt"],["desc", "desc"]]'>
                        Easiest
                     </option>
                  </select>
               </div>
            </div>

            {/* <select
                     value={this.state.orderBy}
                     className="thick-border form-control"
                     onChange={(e) => this.setCardOrder(e)}
                  >
                     <option value='["createdAt", "desc"]'>Most recent</option>
                     <option value='[["totalSuccessfulAttempts", "createdAt"], ["desc", "desc"]]'>
                        Easiest
                     </option>
                     <option value='[["totalSuccessfulAttempts", "createdAt"], ["asc", "asc"]]'>
                        Hardest
                     </option>
                     <option value='["createdAt", "asc"]'>Oldest</option>
                  </select> */}

            {this.state.displayedMemoryCards.map((memoryCard) => {
               return <MemoryCard card={memoryCard} key={memoryCard.id} />;
            })}
         </AppTemplate>
      );
   }
}
