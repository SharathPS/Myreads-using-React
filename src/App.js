import React,{Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from "./components/BookList";
import {Link,Route} from 'react-router-dom'
import SearchPage from './components/SearchPage'

class BooksApp extends Component {
  state = {
    books:[]
  }

  /*
  * DOM elements are created once this method is being called.
  * It fetchs all the inital books from the API
  */

    componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({
      books
    }))
  }

  /*
  * Function to update shelf when user changes their shelfs
  */

  changeCategory = (ChangedBook,ChangeCategory) => {
    BooksAPI.update(ChangedBook,ChangeCategory).then(res=>{
      ChangedBook.shelf=ChangeCategory;

      /*
      * NewBooks: Displays the list of books other than the selected books.
      */

      let NewBooks = this.state.books.filter(book=> book.id!==ChangedBook.id)
      NewBooks.push(ChangedBook);
      this.setState({
        books:NewBooks
      })
    })
  }
  render() {
    return (
      <div className="app">
        <Route path="/" exact render={()=>(
          <div>
          <BookList books={this.state.books} ChangeCategory={this.changeCategory} />
            <div className="open-search">
              <Link to="/search" >Add a book </Link>
            </div>
          </div>
          )} />
          <Route path='/search' render={()=>(
              <SearchPage addedBooks={this.state.books} changeCategory={this.changeCategory}/>
            )} />
      </div>
    )
  }
}

export default BooksApp
