import React, { useEffect, useState } from "react";
import "./FnO.css";

const FnO = () => {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [movers, setMovers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    // Simulated data — replace with real API fetch later
    const demoStocks = [
      { name: "RELIANCE", change: "+5.6%", price: 238.6 },
      { name: "TATASTEEL", change: "+4.2%", price: 145.4 },
      { name: "INFY", change: "-2.1%", price: 15.45 },
      { name: "HDFCBANK", change: "-1.5%", price: 156.4 },
      { name: "ICICIBANK", change: "+3.3%", price: 780.9 },
    ];

    setGainers(demoStocks.filter((stock) => stock.change.includes("+")));
    setLosers(demoStocks.filter((stock) => stock.change.includes("-")));
    setMovers(demoStocks);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortStocks = (stocks) => {
    return [...stocks].sort((a, b) => {
      const changeA = parseFloat(a.change.replace("%", ""));
      const changeB = parseFloat(b.change.replace("%", ""));
      return changeB - changeA;
    });
  };

  const getColorClass = (change) => {
    const val = parseFloat(change.replace("%", ""));
    return val > 0 ? "positive" : "negative";
  };

  const getVolatility = (change) => {
    const val = Math.abs(parseFloat(change));
    if (val >= 5) return "High";
    if (val >= 2) return "Medium";
    return "Low";
  };

  return (
    <div className="fno-container">
      <h2>Futures & Options (F&O) Summary</h2>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <div className="fno-section">
            <h3>Top Gainers</h3>
            <ul>
              {sortStocks(gainers).map((stock, i) => (
                <li key={i} className={`stock-item ${getColorClass(stock.change)}`}>
                  <div className="stock-info">
                    <p>
                      <strong>{stock.name}</strong> - {stock.change}
                    </p>
                    <p>Price: ₹{stock.price}</p>
                    <p>Volatility: {getVolatility(stock.change)}</p>
                    <div
                      className="change-bar"
                      style={{
                        width: `${Math.abs(parseFloat(stock.change)) * 10}px`,
                        backgroundColor:
                          getColorClass(stock.change) === "positive"
                            ? "green"
                            : "red",
                      }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="fno-section">
            <h3>Top Losers</h3>
            <ul>
              {sortStocks(losers).map((stock, i) => (
                <li key={i} className={`stock-item ${getColorClass(stock.change)}`}>
                  <div className="stock-info">
                    <p>
                      <strong>{stock.name}</strong> - {stock.change}
                    </p>
                    <p>Price: ₹{stock.price}</p>
                    <p>Volatility: {getVolatility(stock.change)}</p>
                    <div
                      className="change-bar"
                      style={{
                        width: `${Math.abs(parseFloat(stock.change)) * 10}px`,
                        backgroundColor:
                          getColorClass(stock.change) === "positive"
                            ? "green"
                            : "red",
                      }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="fno-section">
            <h3>Top Movers</h3>
            <ul>
              {movers.map((stock, i) => (
                <li key={i} className={`stock-item ${getColorClass(stock.change)}`}>
                  <div className="stock-info">
                    <p>
                      <strong>{stock.name}</strong> - {stock.change}
                    </p>
                    <p>Price: ₹{stock.price}</p>
                    <p>Volatility: {getVolatility(stock.change)}</p>
                    <div
                      className="change-bar"
                      style={{
                        width: `${Math.abs(parseFloat(stock.change)) * 10}px`,
                        backgroundColor:
                          getColorClass(stock.change) === "positive"
                            ? "green"
                            : "red",
                      }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default FnO;
