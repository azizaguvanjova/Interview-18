import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css"

const useBitcoin = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState(undefined)
  const [loading, setLoading] = useState(true)

useEffect(()=>{
  const fetchBitcoinPrice = async () => {
    try {
      const response =  await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      const price = response.data.bpi
      setBitcoinPrice(price)
      setLoading(false)
    } catch (error){
      console.error('API yuklenırken hata oluştu')
    }
  }
    fetchBitcoinPrice()
    const internal = setInterval(fetchBitcoinPrice,60000)
    return () => clearInterval(internal)
},[])

return {bitcoinPrice, loading}

};

function App() {
  const {bitcoinPrice,loading} = useBitcoin()

return (
  <div className="border backdrop-blur-lg border-black w-96 h-56 rounded ml-[600px] mt-44">
    {loading ? (
      <div>Loading...</div>
    ) : (
      <div className="">
      <h2 className="text-center font-bold text-2xl p-5 ">Bitcoin döviz kurları </h2>
      <p className="flex justify-between text-xl px-3">
        <span>{bitcoinPrice?.USD.description}</span>
        <span>${bitcoinPrice?.USD.rate}</span>
      </p>
      <p className="flex justify-between text-xl px-3">
        <span>{bitcoinPrice?.EUR.description}</span>
        <span>{bitcoinPrice?.EUR.rate}</span>
      </p>
      <p className="flex justify-between text-xl px-3"> 
        <span>{bitcoinPrice?.GBP.description}</span>
        <span>{bitcoinPrice?.GBP.rate}</span>
      </p>

      </div>
    )}
  </div>
)


}

export default App;
