import Nav from './components/nav';
import NewsFeed from './components/newsFeed';
import Stats from './components/stats';
import './app.css';
import {useState, useEffect} from 'react';

function App() {
  const [stock, setStock] = useState('TSLA');
  //get the name of the stock and pass it to news feed.

  function changeStock(stock) {
    setStock(stock);
  }
  
  return (
    <div className="app">
      <Nav />
      <div className="main">
        <NewsFeed stock={stock}/>
        <Stats changeStock={changeStock}/>
      </div>
    </div>
  );
}

export default App;
