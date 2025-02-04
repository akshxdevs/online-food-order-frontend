import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const Wallet = () => {
    const [pin,setPin] = useState<number>(0);
    const userId = localStorage.getItem("userId");
    const totalPrice = localStorage.getItem("totalPricec")
    const [showTranscationPage,setShowTranscationPage] = useState(false);
    const [successMessage,setSuccessMessage] = useState(false);
    const [balance,setBalance] = useState<string>("");
    const [showCreatePin,setShowCreatePin] = useState(false);
    const [newPin,setNewPin] = useState<number>(0);
    const GenerateOrderId = () => {
        const randomFourDigits = Math.floor(Math.random()*10000).toString().padStart(4,"0");
        const orderId = (`11${randomFourDigits}`);
        console.log(orderId);
        
        return <div className="flex justify-center items-center">
        <h3 className="font-semibold text-xl">Order ID :{orderId}</h3>
        </div>
    }
    const getBalance = () => {
        axios.post("https://be.akshxdevs.com/api/m3/account/balance",{
            userId
        }).then((res)=>{
            const data = res.data
            console.log(data);
            let truncatedBalance = Math.floor(parseFloat(data.balance) * 100) / 100; // Multiplies, floors, then divides by 10
            setBalance(truncatedBalance.toString());             
        }).catch((err)=>{   
            console.error("Error fetching balance",err);
        });
    }
    useEffect(()=>{
        getBalance();
    },[])
    const navigate = useNavigate();
    const handleWallet = async() =>{
        console.log("wallet");
        const res = await axios.post("https://be.akshxdevs.com/api/m3/user/wallet/pin",{
            userId,
            pin
        })
        if (res) {
            setShowTranscationPage(true);
        }
    }

    const amount = totalPrice ? parseFloat(totalPrice) : 0;
    const handlePayment = async() => {
        await axios.post("https://be.akshxdevs.com/api/m3/account/transfer",{
            amount,
            userId  
        }).then((res)=>{
            if (res) {
                console.log("Order palced Successfully...");
                getBalance();
                setSuccessMessage(true)
                setTimeout(() => {
                }, 2000);          
                setTimeout(() => {      
                    localStorage.clear()
                    navigate("/signin")
                }, 7000);

            }
            else{
                console.error("Error occured while placing order!");
            }
        })
    }

    const handleCreatePin = () => {
        axios.post("https://be.akshxdevs.com/wallet",{
            userId,
            pin:newPin
        }).then((res)=>{
            if (res.status >= 200 && res.status < 300) {
                console.log("Pin Created sucessfully");
                setShowTranscationPage(false);
                setShowCreatePin(false)            
            };
        }).catch((err)=>{
            console.error(err);
        })
    }


    return <div className="flex h-screen justify-center items-center">
        {showTranscationPage ? (
        <div>
            <div className="flex justify-center mb-5">
                <div className="grid grid-cols-2 lg:items-center border border-gray-200 rounded-xl dark:border-neutral-700">
                    <div className="flex flex-col p-4">
                        <h4 className="text-gray-800 mb-1 dark:text-neutral-200">Balance</h4>
                        <div className="flex gap-x-1">
                        <span className="text-xl font-normal text-slate-800 dark:text-neutral-200">$</span>
                        <p data-hs-toggle-count='{
                            "target": "#toggle-count",
                            "min": 19,
                            "max": 29
                            }' className="text-gray-800 font-semibold text-3xl dark:text-neutral-200">
                            {balance}
                        </p>
                        </div>
                    </div>

                    <div className="flex flex-col p-4">
                        <div className="flex justify-between">
                        <h4 className="text-gray-800 mb-1 dark:text-neutral-200">Toatl Price</h4>
                        </div>
                        <div className="flex gap-x-1">
                        <span className="text-xl font-normal text-gray-800 dark:text-neutral-200">$</span>
                        <p data-hs-toggle-count='{
                            "target": "#toggle-count",
                            "min": 89,
                            "max": 99
                            }' className="text-gray-800 font-semibold text-3xl dark:text-neutral-200">
                            {totalPrice}
                        </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <button onClick={handlePayment} className="btn btn-solid-secondary ">Pay</button>
            </div>
        </div>
        ) : (
            <div className="max-w-sm space-y-3">
                <h1 className="text-2xl font-semibold text-center">Wallet</h1>
                <input type="number" onChange={(e)=>{
                    const value = e.target.value
                    setPin(value ? parseInt(value):0);
                }} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter your 4 digit pin..."/>
                <div className="flex justify-center">
                    <button onClick={handleWallet} className="btn btn-solid-success">Enter</button>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p className="text-sm text-slate-500 ">Don't have an wallet account already?</p>
                    <button onClick={()=>{
                        setShowCreatePin(true);
                    }} className="btn btn-outline-success mt-2">Create one 😀</button>
                </div>
            </div>
        )}
        {successMessage && (
            <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/50">
                <div className="text-center p-10 bg-gray-800 rounded-lg shadow-lg">
                    <h1 className="font-bold text-4xl text-slate-200">Order Placed Successfully</h1>
                    <GenerateOrderId/>
                    <h1 className="font-semibold text-2xl text-slate-300">Current Balance: {balance}</h1>
                    <p className="text-md text-slate-400">Redirecting....</p>
                </div>
            </div>

        )}
        {showCreatePin && (
            <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/50">
                <div className="text-center p-10 bg-gray-800 rounded-lg shadow-lg">
                    <h1 className="font-bold text-4xl text-slate-200">Create Your New Pin!</h1>
                    <input type="number" placeholder="Enter your pin..." onChange={(e)=>{
                        const value = e.target.value
                        setNewPin(value ? parseInt(value): 0)}} 
                    />                    
                    <button onClick={handleCreatePin} className="btn btn-outline-warning">Create Pin</button>
                </div>
            </div>

        )}
    </div>
}