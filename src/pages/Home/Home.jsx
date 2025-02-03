import React from 'react'
import './Home.css'
import { useContext } from 'react'
import { Coincontext } from '../../context/coincontext'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    const {allCoins, currency} = useContext(Coincontext);
    const [displayCoins, setDisplayCoins] = useState([]);
    const[input, setInput] = useState('');

    const inputHandler= (event)=> {
    setInput(event.target.value); 
    if(event.target.value === ""){
        setDisplayCoins(allCoins);
    }
    }
    const searchHandler = async (event)=>{
        event.preventDefault();
        const coins = await allCoins.filter((item)=>{
            return item.name.toLowerCase().includes(input.toLowerCase())
        })
        setDisplayCoins(coins);
    }

    useEffect(() => {
        setDisplayCoins(allCoins);
    }, [allCoins]);
  return (
    <div className='home'>
    <div className="hero">
        <h1>Largest <br/>Crypto Marketplace</h1><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat culpa veritatis distinctio alias ducimus possimus odit non, neque a eum, eveniet ex consequuntur assumenda quo!</p>      
    <form onSubmit={searchHandler}>

        <input onChange={inputHandler}list="coinlist" value={input} type="text" placeholder='Search Crypto...' required/>
        <datalist id="coinlist">
            {allCoins.map((item,index)=>(<option key={index} value={item.name}/>))}
        </datalist>
        <button type='submit'>Search</button>
    </form>
    </div>
    <div className="crypto-table">
        <div className="table-layout">
            <p>#</p>
            <p>Coins</p>
            <p>Price</p>
            <p style={{textAlign:"center"}}>24H Change</p>
            <p className='market-cap'>Market Cap</p>
        </div>
        {
            displayCoins.slice(0, 10).map((item, index) => (
                <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                    <p>{item.market_cap_rank}</p>
                <div>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name + " - " + item.symbol}</p>
                </div>
                <p>{currency.symbol} {item.current_price}</p>
                <p className={item.price_change_percentage_24h>0?"green":"red"}>
                    {Math.floor(item.price_change_percentage_24h*100)/100}</p>
                <p className='market-cap'>{currency.symbol}{item.market_cap.toLocaleString()}           </p>
                </Link>
            ))
        }
    


    </div>
    </div>
  )
}

export default Home
