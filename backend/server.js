const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

/* ==========================
   FOOD DATABASE (CATEGORIES)
========================== */

let foods = [
  { id: 1, category: "Indoor Foods", name: "Fried Rice & Chicken", price: 4500, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b" },
  { id: 2, category: "Indoor Foods", name: "Spaghetti Bolognese", price: 3800, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0" },
  { id: 3, category: "Traditional Foods", name: "Afang Soup & Fufu", price: 5000, image: "https://images.unsplash.com/photo-1625948515291-69613efd103f" },
  { id: 4, category: "Traditional Foods", name: "Edikang Ikong", price: 5200, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1" },
  { id: 5, category: "Occasional Foods", name: "Pepper Soup", price: 4000, image: "https://images.unsplash.com/photo-1604909052743-94e838986d24" },
  { id: 6, category: "Party Foods", name: "Small Chops Platter", price: 6000, image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092" },
  { id: 7, category: "Party Foods", name: "Jollof Rice Party Pack", price: 7000, image: "https://images.unsplash.com/photo-1553621042-f6e147245754" },
  { id: 8, category: "Indoor Foods", name: "Grilled Fish & Plantain", price: 5500, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836" }
];

let orders = [];
let transactions = [];

/* GET FOODS */
app.get("/foods", (req, res) => {
  res.json(foods);
});

/* PLACE ORDER */
app.post("/order", (req, res) => {
  const { foodId, location, paymentMethod } = req.body;

  const food = foods.find(f => f.id === foodId);
  if (!food) return res.status(404).json({ message: "Food not found" });

  let logistics = location === "Outside Uyo" ? 2000 : 1000;
  let total = food.price + logistics;

  const order = {
    id: orders.length + 1,
    foodName: food.name,
    location,
    logistics,
    total,
    status: "BOOKED",
    paymentMethod
  };

  orders.push(order);

  transactions.push({
    orderId: order.id,
    amount: total,
    method: paymentMethod
  });

  res.json(order);
});

/* CANCEL ORDER */
app.delete("/order/:id", (req, res) => {
  const order = orders.find(o => o.id == req.params.id);
  if (order) {
    order.status = "CANCELLED";
  }
  res.json({ message: "Order Cancelled" });
});

/* GET ORDERS */
app.get("/orders", (req, res) => {
  res.json(orders);
});

/* GET TRANSACTIONS */
app.get("/transactions", (req, res) => {
  res.json(transactions);
});

/* LOGIN */
app.post("/waiter-login", (req, res) => {
  const { username, password } = req.body;
  if (username === "waiter" && password === "1234") {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.post("/customer-login", (req, res) => {
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`MILLI RESTAURANT running on http://localhost:${PORT}`);
});

