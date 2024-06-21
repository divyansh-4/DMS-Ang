// const express = require("express");
// const fs = require("fs");
// const cors = require("cors");

// const app = express();
// const port = 3000;

// // Cors configuration - Allows requests from localhost:4200
// const corsOptions = {
//   origin: "http://localhost:4200",
//   optionsSuccessStatus: 204,
//   methods: "GET, POST, PUT, DELETE",
// };

// // Use cors middleware
// app.use(cors(corsOptions));

// // Use express.json() middleware to parse JSON bodies of requests
// app.use(express.json());

// // GET route - Allows to get all the items
// // example: localhost:3000/clothes?page=0&perPage=2
// app.get("/clothes", (req, res) => {
//   const page = parseInt(req.query.page) || 0;
//   const perPage = parseInt(req.query.perPage) || 10;

//   fs.readFile("db.json", "utf8", (err, data) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//       return;
//     }

//     const jsonData = JSON.parse(data);

//     const start = page * perPage;
//     const end = start + perPage;

//     const result = jsonData.items.slice(start, end);

//     res.status(200).json({
//       items: result,
//       total: jsonData.items.length,
//       page,
//       perPage,
//       totalPages: Math.ceil(jsonData.items.length / perPage),
//     });
//   });
// });
// app.get("/clothes/:id", (req, res) => {
//   const id = parseInt(req.params.id);

//   fs.readFile("db.json", "utf8", (err, data) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//       return;
//     }

//     const jsonData = JSON.parse(data);

//     const item = jsonData.items.find((item) => item.id === id);

//     if (!item) {
//       res.status(404).send("Not Found");
//       return;
//     }

//     res.status(200).json(item);
//   });
// });

// // POST route - Allows to add a new item
// // example: localhost:3000/clothes
// /*
//   body: {
//     "image": "https://your-image-url.com/image.png",
//     "name": "T-shirt",
//     "price": "10",
//     "rating": 4
//   }
// */
// app.post("/clothes", (req, res) => {
//   const { image, name, price, rating } = req.body;

//   fs.readFile("db.json", "utf8", (err, data) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//       return;
//     }

//     const jsonData = JSON.parse(data);

//     const maxId = jsonData.items.reduce(
//       (max, item) => Math.max(max, item.id),
//       0
//     );

//     const newItem = {
//       id: maxId + 1,
//       image,
//       name,
//       price,
//       rating,
//     };

//     jsonData.items.push(newItem);

//     fs.writeFile("db.json", JSON.stringify(jsonData), (err) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send("Internal Server Error");
//         return;
//       }

//       res.status(201).json(newItem);
//     });
//   });
// });

// // PUT route - Allows to update an item
// // example: localhost:3000/clothes/1
// /*
//   body: {
//     "image": "https://your-image-url.com/image.png",
//     "name": "T-shirt",
//     "price": "10",
//     "rating": 4
//   }
// */
// app.put("/clothes/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const { image, name, price, rating } = req.body;

//   fs.readFile("db.json", "utf8", (err, data) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//       return;
//     }

//     const jsonData = JSON.parse(data);

//     const index = jsonData.items.findIndex((item) => item.id === id);

//     if (index === -1) {
//       res.status(404).send("Not Found");
//       return;
//     }

//     jsonData.items[index] = {
//       id,
//       image,
//       name,
//       price,
//       rating,
//     };

//     fs.writeFile("db.json", JSON.stringify(jsonData), (err) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send("Internal Server Error");
//         return;
//       }

//       res.status(200).json(jsonData.items[index]);
//     });
//   });
// });

// // DELETE route - Allows to delete an item
// // example: localhost:3000/clothes/1
// app.delete("/clothes/:id", (req, res) => {
//   const id = parseInt(req.params.id);

//   fs.readFile("db.json", "utf8", (err, data) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//       return;
//     }

//     const jsonData = JSON.parse(data);

//     const index = jsonData.items.findIndex((item) => item.id === id);

//     if (index === -1) {
//       res.status(404).send("Not Found");
//       return;
//     }

//     jsonData.items.splice(index, 1);

//     fs.writeFile("db.json", JSON.stringify(jsonData), (err) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send("Internal Server Error");
//         return;
//       }

//       res.status(204).send();
//     });
//   });
// });

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });

// src/server.js
// src/server.js
const express = require('express');
const cors = require('cors');
const initializeDatabase = require('./database/initialize');
const Product = require('./models/Product');
const User = require('./models/User');
const CartItem = require('./models/CartItem');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');
           
const app = express();
const port = 3000;

// Cors configuration - Allows requests from localhost:4200
const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 204,
  methods: "GET, POST, PUT, DELETE",
};

// Use cors middleware
app.use(cors(corsOptions));

// Use express.json() middleware to parse JSON bodies of requests
app.use(express.json());

// Initialize Database
initializeDatabase();

// GET route - Allows to get all the items
app.get("/clothes", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const perPage = parseInt(req.query.perPage) || 10;

    const products = await Product.findAndCountAll({
      offset: page * perPage,
      limit: perPage
    });

    res.status(200).json({
      items: products.rows,
      total: products.count,
      page,
      perPage,
      totalPages: Math.ceil(products.count / perPage),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/clothes/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).send("Not Found");
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// POST route - Allows to add a new item
app.post("/clothes", async (req, res) => {
  try {
    const { image, name, price, rating, info } = req.body;
    const newProduct = await Product.create({ image, name, price, rating, info });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT route - Allows to update an item
app.put("/clothes/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { image, name, price, rating, info } = req.body;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).send("Not Found");
      return;
    }

    await product.update({ image, name, price, rating, info });
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE route - Allows to delete an item
app.delete("/clothes/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).send("Not Found");
      return;
    }

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
