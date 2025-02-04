import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import { Signup } from "./Signup";
import { Signin } from "./Signin";
import { HomePage } from "./HomePage";
import { Cart } from "./Cart";
import { Checkout } from "./Checkout";
import { Payment } from "./Payment";
import { MainPage } from "./MainPage";
import { Wallet } from "./Wallet";
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
