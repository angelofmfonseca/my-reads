import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { search } from '../BooksAPI';
import Book from '../Components/Book';
import { getAll } from '../BooksAPI';

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            query: "",
            books: []
        }
    }
    async componentDidMount(){
        try {
            const books = await getAll();
            this.props.moreBooks(books);
        } catch (error){
            console.log(error);
        }
    }
    handleChange = async (event) => {
        try {
            const query = event.target.value;
            this.setState({ query })
            if (query.trim()){
                const results = await search(query)
                if (results.error){
                    this.setState({ books: [] })
                } else {
                    this.setState({ books: results })
                }
            } else { 
                this.setState({ books: [] })
            }
        } catch (error){
            console.log(error);
        }
    }
    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to={ "/" } className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author" 
                            onChange={ this.handleChange } 
                            value ={ this.state.query }
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.books.length > 0 &&
                            this.state.books.map(book => {
                                const lookShelf = this.props.books.find(
                                    searchBook => searchBook.id === book.id)
                                if (lookShelf){
                                    book.shelf = lookShelf.shelf
                                } else {
                                    book.shelf = "none"
                                }
                                return (
                                    <Book 
                                        key={ book.id } 
                                        { ...book } 
                                        changeShelf={ this.props.changeShelf }
                                    />
                                )
                            })
                        }
                        {
                            this.state.books.length === 0 &&
                            <h1 style={{ textAlign: "center" }}>
                                No Books Found
                            </h1>
                        }
                    </ol>
                </div>
            </div>
        )
    }
}
export default Search