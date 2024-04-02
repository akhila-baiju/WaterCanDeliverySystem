import { useState } from "react";
import PricingCard from "./PricingCard.js";
import "../../assets/css/PricingApp.css";

function Subscription() {
  const [selectMonthly, setSelectMonthly] = useState(true);
//  console.log(selectMonthly);
  return (
    <div className="PricingApp">
      <div className="app-container">
        {/* Header */}
        <header>
          <h1 className="header-topic">Available Plans</h1>
          <div className="header-row">
            <p>Monthly</p>
            <label className="price-switch">
              <input
                className="price-checkbox"
                onChange={() => {
                  setSelectMonthly((prev) => !prev);
                }}
                type="checkbox"
              />
              <div className="switch-slider"></div>
            </label>
            <p>Weekly</p>
          </div>
        </header>
        {/* Cards here */}
        <div className="pricing-cards">
          <PricingCard
            title="Essential"
            price={selectMonthly ? "240" : "80"}
           // storage="60 GB Storage"
            
          />
          <PricingCard
            title="Deluxe"
            price={selectMonthly ? "270" : "90"}
            //storage="70 GB Storage"
           
          />
          <PricingCard
            title="Premium"
            price={selectMonthly ? "400" : "100"}
            
          />
        </div>
      </div>
    </div>
  );
}

export default Subscription;