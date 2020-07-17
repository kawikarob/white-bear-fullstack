import React from "react";
import Header from "../ui/Header";
import Navigation from "../ui/Navigation";
import AppTemplate from "../ui/AppTemplate";
import MemoryCard from "../ui/MemoryCard";
import axios from "axios";
const userId = "cd977c3b-d1f3-40a6-8799-8043c7baf089";

export default class AllCards extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         order: "memory_cards.created_at%20DESC",
         memoryCards: [],
         searchTerm: "",
      };
   }

   componentDidMount() {
      this.setMemoryCards();
   }

   setOrder(e) {
      const newOrder = e.target.value;
      console.log(newOrder);
      this.setState({ order: newOrder }, () => {
         this.setMemoryCards();
      });
   }

   setSearchTerm() {
      const searchInput = document.getElementById("search-input").value;
      this.setState({ searchTerm: searchInput }, () => {
         this.setMemoryCards();
      });
   }

   setMemoryCards() {
      axios
         .get(
            `/api/v1/memory-cards?userId=${userId}&searchTerm=${this.state.searchTerm}&order=${this.state.order}`
         )
         .then((res) => {
            // handle success
            console.log(res.data);
            this.setState({
               memoryCards: res.data,
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
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
                  onClick={() => this.setSearchTerm()}
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
                     <option value="memory_cards.created_at%20DESC">
                        Most recent
                     </option>
                     <option value="memory_cards.created_at%20ASC">
                        Oldest
                     </option>
                     <option value="memory_cards.total_successful_attempts%20ASC,%20memory_cards.created_at%20ASC">
                        Hardest
                     </option>
                     <option value="memory_cards.total_successful_attempts%20DESC,%20memory_cards.created_at%20DESC">
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

            {this.state.memoryCards.map((memoryCard) => {
               return <MemoryCard card={memoryCard} key={memoryCard.id} />;
            })}
         </AppTemplate>
      );
   }
}
