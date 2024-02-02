import React, { useState, useEffect } from 'react';
import './App.css';

const GstLbetCalculator = () => {
  const [amount, setAmount] = useState(100);
  const [gstRate, setGstRate] = useState(18);
  const [lbetPer, setLbetPer] = useState(8);
  const [tmc, setTMC] = useState(4);

  const [gstAmount, setGstAmount] = useState(0);
  const [gstPeramt, setGstPeramt] = useState(0);
  const [gstValue, setGstValue] = useState(0);

  const [netAmount, setNetAmount] = useState(0);
  const [netValue, setNetValue] = useState('');

  const [lbet, setLbet] = useState(0);
  const [lbetPeramt, setLbetPeramt] = useState(0);
  const [lbetValue, setLbetValue] = useState(0);

  const [tmcInput, setTMCInput] = useState(tmc);

  const calculateValues = () => {
    const Amount = parseFloat(amount);
    const parsedGstRate = parseFloat(gstRate);
    const parsedLbetPer = parseFloat(lbetPer);
    const parsedTMC = parseFloat(tmcInput);

    const calculatedGstAmount = Amount * parsedGstRate;
    const calculatedGstPeramt = parsedGstRate + 100;
    const calculatedGstValue = calculatedGstAmount / calculatedGstPeramt;

    const calculatedNetAmount = Amount - parsedTMC - calculatedGstValue;

    const calculatedLbet = calculatedNetAmount * parsedLbetPer;
    const calculatedLbetPeramt = parsedLbetPer + 100;
    const calculatedLbetValue = calculatedLbet / calculatedLbetPeramt;

    // Check if calculated values are valid numbers, otherwise set them to 0
    const calculatedNetValue = isNaN(calculatedLbetValue) ? 0 : Amount - parsedTMC - calculatedGstValue - calculatedLbetValue;
    const calculatedGstValueResult = isNaN(calculatedGstValue) ? 0 : calculatedGstValue;
    const calculatedLbetValueResult = isNaN(calculatedLbetValue) ? 0 : calculatedLbetValue;
    const calculatedTMCResult = isNaN(parsedTMC) ? 0 : parsedTMC;
    const calculatedGstAmountResult = isNaN(calculatedGstAmount) ? 0 : calculatedGstAmount;

    setGstAmount(calculatedGstAmountResult.toFixed(2));
    setGstPeramt(calculatedGstPeramt.toFixed(2));
    setGstValue(calculatedGstValueResult.toFixed(2));

    setNetAmount(calculatedNetAmount.toFixed(2));
    setNetValue(calculatedNetValue.toFixed(2));

    setLbet(calculatedLbet.toFixed(2));
    setLbetPeramt(calculatedLbetPeramt.toFixed(2));
    setLbetValue(calculatedLbetValueResult.toFixed(2));
    setTMC(calculatedTMCResult.toFixed(2));
  };

  useEffect(() => {
    calculateValues();
  }, [amount, gstRate, lbetPer, tmcInput]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleGstRateChange = (event) => {
    setGstRate(event.target.value);
  };

  const handleLbetPerChange = (event) => {
    setLbetPer(event.target.value);
  };

  const handleTMCInputChange = (event) => {
    setTMCInput(event.target.value);
  };

  const handleTMCBlur = () => {
    setTMC(tmcInput);
  };

  return (
    <>
    <div className="header-container">
      <h1>GST and LBET Calculator</h1>
      </div>
      <div className="calculator-container">
      <label>
        Enter Amount:
        <input type="number" value={amount} onChange={handleAmountChange} />
      </label>
      <br />
      <label>
        GST Rate (%):
        <input type="number" value={gstRate} onChange={handleGstRateChange} />
      </label>
      <br />
      <label>
        LBET (%):
        <input type="number" value={lbetPer} onChange={handleLbetPerChange} />
      </label>
      <br />
      <label>
        TMC:
        <input type="number" value={tmcInput} onChange={handleTMCInputChange} onBlur={handleTMCBlur} />
      </label>
      <br />
      </div>
      {/* <div>
        <strong>GST Amount:</strong> {gstAmount}
      </div> */}
      <div className="result-container">
      <div className="result-Value">
        <strong>GST Value:</strong> 
        <p>{gstValue}</p>
      </div>
      <div className="result-Value">
        <strong>Net Amount:</strong> 
        <p>{netValue}</p>
      </div>
      <div className="result-Value">
        <strong>TMC:</strong> 
        <p>{tmc}</p>
      </div>
      <div className="result-Value">
        <strong>LBET Value:</strong> 
        <p>{lbetValue}</p>
      </div>
    </div>
    </>
  );
};

export default GstLbetCalculator;
