import {useState, useEffect} from "react";
import {style} from './css/styles';
import {APP_NAME, API_KEY, COMPANY_EMAIL} from '@env'
// API Source
// book isbn api: open library
// book review api: https://gist.github.com/anwarmontasir/bb8ab501163168c5149bb19d1bac95f9
// book price api: https://booksrun.com/page/api-reference


const gapi = process.env.REACT_APP_GOOGLE_API_KEY 
import Img from './assets/noImg.png'

async function getBooks(search){           
    if(search===""|typeof search==="undefined"){
        return null;
    }
    const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${API_KEY}&startIndex=0&maxResults=40&printType=books&orderBy=relevance`;
    let googleBooks = ""
    googleBooks = await fetch(googleBooksUrl)
        .then(res => res.json())
        .then(data => data.items)
        .catch(error => {
            console.log(error);
            return [error];
        }
    );

    let fieldsList = ["title","authors","industryIdentifiers","description","categories","averageRating","ratingsCount"]
    
    let books = [];
    try{        
        for (let book of googleBooks) {   
            let newBook = {}       
            fieldsList.forEach((key)=>{
                newBook[key]=typeof book.volumeInfo[key] === 'undefined' ? `Unknown ${key}` : book.volumeInfo[key];                
            })
            newBook['imageLinks'] = typeof book.volumeInfo.imageLinks === "undefined"? {smallThumbnail:Img,thumbnail:Img}:book.volumeInfo.imageLinks
            newBook['kind']=typeof book.kind === "undefined" ? "Unknown Kind":book.kind
            newBook['id']= typeof book.id ==="undefined"? "Unknown id": book.id
            newBook['etag']=typeof book.etag==="undefined"? "Unknown etag": book.etag
            newBook['selfLink']=typeof book.selfLink==="undefined"? "Unknown selfLink":book.selfLink
            newBook["saleInfo"]=typeof book.saleInfo==="undefined"? "Unknown saleInfo":book.saleInfo
            newBook["accessInfo"]=typeof book.accessInfo==="undefined"? "Unknown accessInfo": book.accessInfo
            newBook["searchInfo"]=typeof book.searchInfo==="undefined"? "Unknown searchInfo": book.searchInfo
            newBook["isbn10"]=typeof book.volumeInfo.industryIdentifiers[0]["identifier"]==="undefined"? "Unknown isbn10":book.volumeInfo.industryIdentifiers[0]["identifier"]
            newBook["pageCount"]=typeof book.volumeInfo.pageCount==="undefined"? 0:book.volumeInfo.pageCount
            newBook["publishedDate"]=typeof book.volumeInfo.publishedDate==="undefined"? 0:new Date(book.volumeInfo.publishedDate)
            books.push(newBook)
        }   
        
    }catch(e){
        console.error(e)
    }
    console.log(`The number of books retrieved for serach ${search} is ${books.length}`)
    return books;
}


export function useBooks(search){
    const [loading, setLoading] = useState(true);
    const [books,setBooks]=useState([])
    const [error,setError]=useState(null)  
    
    console.log(`Beginning to search for ${search} in useBooks`)
    useEffect(()=>{  
        (async () =>{  
            try{  
                console.log(`The getBooks() function was called with ${search}`)
                setBooks(await getBooks(search));                  
            } catch(e){
                console.error(e)
                console.log(`An error was invoked ${e} for search parameter: ${search}!`);
                setError(e);                
            }finally{
                if(books===undefined){
                    setBooks([])
                }
                setLoading(false);
            }
        })();
    }, [search]);


    return {loading,books,error}       
}



async function connectOpenLibrary(author){
    // Fetch 3 books from the same Author.
    const openLibraryURL = `https://openlibrary.org/search.json?person=${author}&limit=3`;

    let OpenWorks = ""
    OpenWorks = await fetch(openLibraryURL)
        .then(res => res.json())
        .then(data => data.docs)
        .catch(error => {
            console.log(error);
            return [error];
        }
    );
    console.log(JSON.stringify(OpenWorks))
    let works = [];
    let fieldsList = ["title",'author_name',"number_of_pages_median"]
    try{
        for (let book of OpenWorks){
            let newBook={}
            fieldsList.forEach((key)=>{
                newBook[key]=typeof book[key] === 'undefined' ? `Unknown ${key}` : book[key];                
            })
            works.push(newBook)
        }
    }
    catch(e){
        console.error(e)
    }
    return works;
}

export function getAuthorWorks(author){
    const [loading, setLoading] = useState(true);
    const [works,setWorks]=useState([])
    const [error,setError]=useState(null)  
    
    
    useEffect(()=>{  
        (async () =>{  
            try{  
                setWorks(await connectOpenLibrary(author));                  
            } catch(e){
                console.error(e)
                console.log(`An error was invoked ${e} for author: ${author}!`);
                setError(e);                
            }finally{
                if(works===undefined){
                    setWorks([])
                }
                setLoading(false);
            }
        })();
    }, [author]);


    return {loading,works,error}    
    
}