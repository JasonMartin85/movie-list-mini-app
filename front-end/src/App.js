




function App() {
  const movies = [
    {title: 'Mean Girls'},
    {title: 'Hackers'},
    {title: 'The Grey'},
    {title: 'Sunshine'},
    {title: 'Ex Machina'},
  ];

  return (<>
  <h1>Movie List</h1>
  {console.log(movies)}
  <ul>
    {movies.map((movie,index) => <li key={index}>{movie.title}</li>)}
  </ul>

</>);
}

export default App;
