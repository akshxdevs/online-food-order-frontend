import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Payment = () => {
    const [name,setName] = useState("");
    const [phoneNo,setPhoneNo] = useState<number>(0)
    const [address,setAddress] = useState("");
    const [city,setCity] = useState("");
    const [state,setState] = useState("");
    const [zip,setZip] = useState("");
    const [showError,setShowError] = useState(false);

    const navigate = useNavigate();
    const handleDetails = (e:any) => {
        e.preventDefault()
        console.log("okay!");
        if (!name||!phoneNo||!address||!city||!state||!zip) {
            setShowError(true);
        }else{
        const userId = localStorage.getItem("userId")
        navigate("/wallet?userid=" + userId)
        }
    }

    return(
        <div className="flex justify-center h-screen items-center">
            <div className="mx-auto max-w-xl">
                <h1 className="font-semibold text-2xl">User Info</h1>
            <form onSubmit={handleDetails} className="space-y-5">
                <div className="grid grid-cols-12 gap-5">
                <div className="col-span-6">
                    <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                    <input onChange={(e)=>setName(e.target.value)} type="text" id="example7" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="Joe" />
                </div>
                <div className="col-span-6">
                    <label className="mb-1 block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="number"  onChange={(e)=>{
                        const value = e.target.value
                        setPhoneNo(value ? parseInt(value):0)
                    }}
                    id="example8" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="90$%^&%" />
                </div>
                <div className="col-span-12">
                    <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
                    <input onChange={(e)=>setAddress(e.target.value)} type="text" id="example9" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="1864 Main Street" />
                </div>
                <div className="col-span-6">
                    <label  className="mb-1 block text-sm font-medium text-gray-700">City</label>
                    <input onChange={(e)=>setCity(e.target.value)} type="text" id="example10" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="" />
                </div>
                <div className="col-span-4">
                    <label  className="mb-1 block text-sm font-medium text-gray-700">State</label>
                    <select onChange={(e)=>setState(e.target.value)} id="example11" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50">
                    <option value="">Choose</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Banguluru">Banguluru</option>
                    </select>
                </div>
                <div className="col-span-2">
                    <label  className="mb-1 block text-sm font-medium text-gray-700">Zip</label>
                    <input onChange={(e)=>setZip(e.target.value)} type="text" id="example12" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="" />
                </div>
                <div className="col-span-12 flex items-center space-x-2">
                    <input type="checkbox" id="example13" className="h-4 w-4 rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400" />
                    <label  className="text-sm font-medium text-gray-700">Remember me</label>
                </div>
                <div>
                    {showError && (
                        <div className="text-red-600 w-screen">
                            *All fields are required!
                        </div>
                    )}
                </div>
                <div className="col-span-12 flex justify-center">
                    <button type="submit" className="rounded-lg border border-primary-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300">Submit</button>
                </div>
                </div>
            </form>
            </div>
        </div>
    );
}