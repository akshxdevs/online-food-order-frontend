import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import { Signin } from "./Pages/Signin";
import { HomePage } from "./Pages//HomePage";
import { Cart } from "./Pages//Cart";
import { Checkout } from "./Pages//Checkout";
import { Payment } from "./Pages//Payment";
import { MainPage } from "./Pages//MainPage";
import { Wallet } from "./Pages//Wallet";
import { Signup } from "./Pages/Signup";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/wallet" element={<Wallet/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
