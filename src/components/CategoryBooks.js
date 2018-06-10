import React,{Component} from 'react'
import placeholder from './images/no-cover-image.png'
class CategoryBooks extends Component {
	render() {
		return (
			<div>
				<div className="bookshelf">
					<h2 className="bookshelf-title">{this.props.title}</h2>
				</div>
				<div className="bookshelf-books">
					<ol className="books-grid">
					{this.props.books.map(book =>
					    <li key={book.id}> 
							<div className="book">
								<div className="book-top">
									<div className="book-cover" style={{ 
								      	width: 128,
								      	height: 193, 
								      	backgroundImage: `url(${book.imageLinks?book.imageLinks.thumbnail:placeholder})` }}>
								     </div>
								    <div className="book-shelf-changer">
		                              <select onChange={(event) =>this.props.ChangeCategory(book,event.target.value)} defaultValue={book.shelf}>
		                                <option value="none" disabled>Move to...</option>
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

export default CategoryBooks;