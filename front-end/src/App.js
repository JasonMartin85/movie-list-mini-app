import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

function App() {
  const [movies,setMovies] = useState()
  const [inputs,setInputs] = useState()
  const [postInputs,setPostInputs] = useState()
  const [deleteInputs,setDeleteInputs] = useState()
  const [postTerms,setPostTerms] = useState()
  const [searchParams, setSearchParams] = useState({params:""})
  const navigate = useNavigate();
  const [hardcoded,setHardcoded] = useState(false);
  // const movies = [
  //   {title: 'Mean Girls'},
  //   {title: 'Hackers'},
  //   {title: 'The Grey'},
  //   {title: 'Sunshine'},
  //   {title: 'Ex Machina'},
  // ];

  useEffect(()=>{
    fetch(`http://localhost:3001/movies`)
    .then(res=>res.json())
    .then(data=>{
      setMovies(data)
      console.log(data)
    })
  },[])

  useEffect(()=>{
    if (searchParams !== undefined ) {
      fetch(`http://localhost:3001/movies/${searchParams.params}`)
      .then((res)=>{
        if(!res.ok) throw new Error(res.statusText);
        return(res.json())
      })
      .then(data=> {
        setMovies(data)
      })
    }
  },[searchParams])

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handlePostMovieChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPostInputs(values => ({...values, [name]: value}))
  }

  const handleDeleteMovieChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDeleteInputs( values => ({...values, [name]: value}))
  }

  const handleDeleteMovieSubmit = (event) => {
    event.preventDefault();
    console.log(deleteInputs)

    fetch(`http://localhost:3001/movies/${deleteInputs.id}`, {method: "DELETE"})
    .then(navigate(0))

  }

  const handlePostMovieSubmit = (event) => {
    event.preventDefault();
    setPostTerms(postInputs)
  }

  useEffect(()=>{
    if(postInputs !== undefined ) {
    const reqOpt = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(postInputs)
    }
    console.log(reqOpt)

    fetch(`http://localhost:3001/movies/`,reqOpt)
    .then(res=> {
      if(!res.ok) throw new Error(res.statusText);
      return(res.json())
    })
    .then(
      navigate(0)
    )
  }  
  },[postTerms])


  const handleSearch = (event) => {
    event.preventDefault();
    setSearchParams(inputs)
  }

  return (<>
  <form onSubmit={handleSearch}>
  <input name="params" placeholder="Search..." onChange={handleChange}/>
  </form>
  <h1>Movie List</h1>
  <button onClick={()=>setHardcoded(!hardcoded)}>Toggle Hardcoded Movies</button>
  <ol>
    {movies ? hardcoded === false ?
      movies.map(movie => <li key={movie.id}>{movie.title} Watched:{movie.watched.toString()}</li >) 
     : movies.filter(movie=>movie.hardcoded===true).map(movie => <li key={movie.id}>{movie.title} Watched:{movie.watched.toString()}</li >)
    : <></>}




  </ol>
  <h1>Add Movie</h1>
  <form onSubmit={handlePostMovieSubmit}>
    <input name="title" placeholder="Name..." onChange={handlePostMovieChange}/>
    <button type="submit">Add Movie!</button>
  </form>
  <h1>Delete Movie by ID</h1>
  <form onSubmit={handleDeleteMovieSubmit}>
    <input name="id" placeholder="Name..." onChange={handleDeleteMovieChange}/>
    <button type="submit">Delete Movie!</button>
  </form>

</>);
}

export default App;
