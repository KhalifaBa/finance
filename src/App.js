import "./App.css";
import { useEffect, useState } from "react";
import Graphique from "./components/Graphique";
import SelectButton from "./components/Select";
import React from "react";
function App() {
  const [dataAction, setDataAction] = useState({});
  useEffect(() => {
    const fetchData = async (selectedAction) => {
      const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${selectedAction}?apikey=HZB3QLhZxheh0su2eAiG2FeoDUKVfald`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, options);
      const result = await response.json();
      const data = result.historical;
      setDataAction({
        labels: data.map((item) => item.date),
        datasets: [
          {
            label: "Prix de l'action",
            data: data.map((item) => item.close),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
    };
    fetchData("AAPL");
  }, []);

  return (
    <div className="App">
      <main>
        <div className="container">
          <div className="actionSearch"></div>
          <div className="ml-[50%] mt-[10%]">
            <SelectButton fetchData={dataAction}></SelectButton>
          </div>
          <div className="actionCurve">
            <Graphique fetchData={dataAction}></Graphique>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
