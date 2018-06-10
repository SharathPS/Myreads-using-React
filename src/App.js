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
  //This method is called after DOM elements are created.It will fetch all the initial books from API
  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({
      books
    }))
  }
  //This function is called when the user changes the shelf of the book.This updates the shelf
  changeCategory = (ChangedBook,ChangeCategory) => {
    BooksAPI.update(ChangedBook,ChangeCategory).then(res=>{
      ChangedBook.shelf=ChangeCategory;
      //NewBooks contain all the book except the book selected
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
