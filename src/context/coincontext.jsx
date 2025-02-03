import { createContext } from "react";
export const Coincontext = createContext();
import { useState, useEffect } from "react";

const CoinContextProvider = (props) => {
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-MRswDyvWdWF5XTp5ohJJFpxR"}
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((res) => res.json())
      .then((res) => setAllCoins(res))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allCoins,
    currency,
    setCurrency,
  };
  return (
    <Coincontext.Provider value={contextValue}>
      {props.children}
    </Coincontext.Provider>
  );
};

export default CoinContextProvider;
