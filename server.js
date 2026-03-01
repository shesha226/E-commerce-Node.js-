const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const orderRoutes = require("./src/routes/orderRoute");
const cartItemRouter = require("./src/routes/cartitemsRoute");
const userAddress = require("./src/routes/userAddressRoute");
const productCategoryRoutes = require("./src/routes/productCategoryRouter");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cartItem", cartItemRouter);
app.use("/api/userAddress", userAddress);
app.use("/api/productCategory", productCategoryRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));