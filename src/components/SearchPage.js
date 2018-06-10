import React, {Component}  from 'react'
import * as BooksAPI from './../BooksAPI'
import './../App.css'
import placeholder from './images/no-cover-image.png'
import {Link} from 'react-router-dom'
import CategoryBooks from './CategoryBooks'

class SearchPage extends Component {
	state = {
		query:'',
		Books:[]
	}
/*This functions sets the Category/shelf on which each books belong[Default value is none].If it is added in myReads shelf 
value will be same as the shelf in which it is added */
	setCategory = (books) =>{
		for(let book of books)
		{
			 book.shelf='none'
		}
	for (let book of books) {
      for (let oldbook of this.props.addedBooks) {
        if (oldbook.id === book.id) {
          book.shelf = oldbook.shelf
        }
      }
    }
		return books
		
	}
/*This function sets the state of query string to whatever is added ,searches the books and sets the state 
	of Books array to the newly searched array*/
	searchBooks = (event)=>{
		let q = event.target.value;
		this.setState({
			query:q
		})
	BooksAPI.search(q).then( book=>{
		if(book===undefined||(book.error))
		{
		this.setState({
				Books:[]
			})	
		}
		else {
			book=this.setCategory(book)
			this.setState({
			Books:book
		   })
		}
	})
	}
	render() {
		return (
			<div className="search-books">
	            <div className="search-books-bar">
	            	<Link className="close-search" to='/'>Close</Link>
	            	<div className="search-books-input-wrapper">
	            		<input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.searchBooks}/>
	            	</div>
	            </div>
	        <div className="search-books-results">
              <ol className="books-grid">
              {this.state.Books && this.state.Books.map(book=>

              	<li key={book.id}>
              		<div className="book">
              			<div className="book-top">

							<div className="book-cover" style={{ 
						      	width: 128,
						      	height: 193, 
						      	backgroundImage: `url(${book.imageLinks?book.imageLinks.thumbnail:placeholder})` }}>
						     </div>
						    <div className="book-shelf-changer">
                              <select onChange={(event) =>this.props.changeCategory(book,event.target.value)} defaultValue={book.shelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
						</div>
						<div className="book-title">{book.title}</div>
						{book.authors && book.authors.map((author,index) =>
						  <div className="book-authors" key={index}>
                          	{author}
                          </div>
						  	)}
              		</div>
              	</li>
              	)}
              </ol>
             </div>
            </div>
			)
	}
}

export default SearchPage;