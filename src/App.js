import "./App.css";
import { useEffect, useState } from "react";
import Graphique from "./components/Graphique";
import SelectButton from "./components/Select";
import React from "react";
function App() {
  const [selectedAction, setSelectedAction] = useState("");
  const handleSelectionChange = (e) => {
    setSelectedAction(e.target.value);
  };
  const [dataAction, setDataAction] = useState({ datasets: [] });
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
      data.reverse();
      setDataAction({
        labels: data.map((item) => item.date),
        datasets: [
          {
            label: "Prix de l'action en clôture " + result.symbol,
            data: data.map((item) => (item = item.close)),
            fill: true,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
    };
    if (selectedAction.length > 0) {
      fetchData(selectedAction);
    }
  }, [selectedAction]);
  return (
    <div className="App">
      <main>
        <div className="container">
          <div className="actionSearch"></div>
          <div className="ml-[30%] mt-[10%]">
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <SelectButton fonction={handleSelectionChange}></SelectButton>
            </div>
          </div>
          <div className="actionCurve">
            <Graphique data={dataAction}></Graphique>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
