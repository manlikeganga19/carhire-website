import React, { useState } from "react";
import masterCard from "../../assets/all-images/master-card.jpg";
import paypal from "../../assets/all-images/paypal.jpg";
import "../../styles/payment-method.css";

const PaymentMethod = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleRadioChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <div className="payment">
        <label htmlFor="" className="d-flex align-items-center gap-2">
            <input
            type="radio"
            checked={selectedOption === "bankTransfer"}
            onChange={() => handleRadioChange("bankTransfer")}
          />
          Direct Bank Transfer
        </label>
      </div>

      <div className="payment mt-3">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            checked={selectedOption === "chequePayment"}
            onChange={() => handleRadioChange("chequePayment")}
          />
          Cheque Payment
        </label>
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            checked={selectedOption === "masterCard"}
            onChange={() => handleRadioChange("masterCard")}
          />
          Master Card
        </label>

        <img src={masterCard} alt="" />
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            checked={selectedOption === "paypal"}
            onChange={() => handleRadioChange("paypal")}
          />
          Paypal
        </label>

        <img src={paypal} alt="" />
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            checked={selectedOption === "mpesa"}
            onChange={() => handleRadioChange("mpesa")}
          />
          Mpesa
        </label>
      </div>

      <div className="payment text-end mt-5">
        <button>Reserve Now</button>
      </div>
    </>
  );
};

export default PaymentMethod;
