import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
export const HomePage = () => {
    const [searchParams] = useSearchParams();
    const [foods,setFoods] = useState([]);
    const [addFood,setAddfood] = useState<any[]>([]);
    const navigate = useNavigate();
    function getFoods():any {
        axios.get("http://localhost:3000/api/m3/food/").then(res=>{
            setFoods(res.data);
        })
    }
    useEffect(()=>{
        const userId = searchParams.get("id");
        console.log(userId);
        getFoods()
    },[]);
    function handleAddtoCart(foodImg:string,foodName:string,foodPrice:number) {
        const newFoodItems = {foodImg,foodName,foodPrice};
        setAddfood((prevAddfood)=>[...prevAddfood,newFoodItems])
        console.log(newFoodItems);
        const existingItems = localStorage.getItem("itemsOnCart");
        const itemsArray = existingItems ? JSON.parse(existingItems) : [];
        itemsArray.push(newFoodItems);
        localStorage.setItem("itemsOnCart",JSON.stringify(itemsArray));
    }
    return(
        <div className="flex justify-center">
            <div className="flex flex-col justify-center text-center">
                <h1 className="font-bold text-4xl p-5">Food Order App</h1>
                <h2 className="font-semibold pt">How about "Delicious Bites, Delivered Fast!"?</h2>
                <p className="font-medium text-slate-400 pb-5">It’s catchy and captures the essence of quick and tasty food delivery!</p>
                <div className="grid grid-cols-3 gap-10 p-10 bg-slate-100 rounded-sm">
                    {foods.map(food=>(
                        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                        <img src={food.foodImg} alt="Card Image" className="w-full h-48 object-cover rounded-t-xl" />
                        <div className="p-4 md:p-5">
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                          {food.foodName}
                          </h3>
                          <p className="mt-1 text-gray-500 dark:text-neutral-400">
                            {food.foodPrice} Rs <br />
                            {food.isStockAvailable ? "Available" : "Not Available"}
                          </p>
                          <button className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" onClick={()=>handleAddtoCart(food.foodImg, food.foodName, food.foodPrice)}>
                            Add to cart
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="pt-10">
                    <button onClick={()=>{
                        navigate("/cart")
                    }} className="text-white  bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">🛒</button>
                </div>
            </div>
        </div>
    );
}