//This Component will list all the books which are fetched from and categorize the using another component CategoryBook.js
import React, {Component}  from 'react'
import * as BooksAPI from './../BooksAPI'
import './../App.css'
import CategoryBooks from './CategoryBooks'

class BookList extends Component {
	render() {
		return ( 
			<div className="list-books">
			  <div className="list-books-title">
			    <h1>MyReads</h1>
			  </div>
			  <div className="list-books-content">
		           <CategoryBooks books={this.props.books.filter(book=>book.shelf==='currentlyReading')} title='Currently Reading' ChangeCategory={this.props.ChangeCategory}/>
		           <CategoryBooks books={this.props.books.filter(book=>book.shelf==='read')} title='Read' ChangeCategory={this.props.ChangeCategory} />
		           <CategoryBooks books={this.props.books.filter(book=>book.shelf==='wantToRead')} title='Want to Read' ChangeCategory={this.props.ChangeCategory}/>    
			  </div>
			</div>	
        )
	}
}

export default BookList;