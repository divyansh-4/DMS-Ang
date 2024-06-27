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
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser=require('body-parser');
           
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
app.use(bodyParser.json());

// Initialize Database
// initializeDatabase();
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'my_store'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

// User authentication route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  db.query('SELECT * FROM Users WHERE username = ?', [username], (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.status(401).send('Invalid username or password1');
    }

    const user = results[0];

    // bcrypt.compare(password, user.password, (err, isMatch) => {
      // if (err) throw err;
      console.log(user.password);
      console.log(password);
      if (!(password===user.password)) {
        return res.status(401).send('Invalid username or password2');
      }

      const token = jwt.sign({ id: user.id, username: user.username }, 'secret_key', { expiresIn: '1h' });

    res.json({ token, userId: user.id });
      
      
    // });
  });
});
app.post('/addCart', (req, res) => {
  const { userId, productId } = req.body;
  console.log("Product id is:", productId);
  console.log("User id is:", userId);

  if (!userId || !productId) {
    return res.status(400).send('userId and productId are required');
  }

  // First, get the product details from the Products table
  db.query('SELECT name, image, price, rating, info FROM Products WHERE id = ?', [productId], (err, productResults) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database query error');
    }

    if (productResults.length === 0) {
      return res.status(404).send('Product not found');
    }

    const { name, image, price, rating, info } = productResults[0];

    // Check if a row with the given productId and userId exists in CartProducts
    db.query('SELECT qty FROM CartProducts WHERE userId = ? AND prodId = ?', [userId, productId], (err, cartResults) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Database query error');
      }

      if (cartResults.length > 0) {
        // If the row exists, update the qty by incrementing it by 1
        db.query('UPDATE CartProducts SET qty = qty + 1 WHERE userId = ? AND prodId = ?', [userId, productId], (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Database query error');
          }
          res.send('Product quantity updated successfully');
        });
      } else {
        // If the row does not exist, insert a new row
        const qty = 1; // initial quantity for new products
        db.query(
          'INSERT INTO CartProducts (prodId, userId, name, image, price, rating, info, qty) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [productId, userId, name, image, price, rating, info, qty],
          (err) => {
            if (err) {
              console.error(err);
              return res.status(500).send('Database query error');
            }
            res.send('Product added to cart successfully');
          }
        );
      }
    });
  });
});

// app.post('/addCart', (req, res) => {
//   const { userId, productId } = req.body;
//   console.log("Product id iss:", productId);
//   console.log("User id iss: ", userId)
//   if (!userId || !productId) {
//     return res.status(400).send('userId and productId are required');
//   }

//   db.query('SELECT cartDetails FROM CartItems WHERE userId = ?', [userId], (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Database query error');
//     }

//     let cartDetails = { products: {} };

//     if (results.length > 0) {
//       cartDetails = results[0].cartDetails ? JSON.parse(results[0].cartDetails) : { products: {} };
//     }

//     if (cartDetails.products[productId]) {
//       cartDetails.products[productId] += 1;
//     } else {
//       cartDetails.products[productId] = 1;
//     }

//     const updatedCartDetails = JSON.stringify(cartDetails);

//     db.query(
//       'INSERT INTO CartItems (userId, cartDetails) VALUES (?, ?) ON DUPLICATE KEY UPDATE cartDetails = ?',
//       [userId, updatedCartDetails, updatedCartDetails],
//       (err) => {
//         if (err) {
//           console.error(err);
//           return res.status(500).send('Database query error');
//         }
//         res.send('Product added to cart successfully');
//       }
//     );
//   });
// });


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
app.get('/getCartProducts/:userId', (req, res) => {
  const { userId } = req.params;
  console.log("Happening");

  db.query('SELECT * FROM CartProducts WHERE userId = ?', [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database query error');
    }
    console.log(results);
    res.json(results);
  });
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
app.post('/checkout', (req, res) => {
  console.log("STarted checkout");
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).send('userId is required');
  }

  db.query('SELECT * FROM CartProducts WHERE userId = ?', [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database query error');
    }

    if (results.length === 0) {
      return res.status(404).send('No cart items found');
    }

    const orderItems = results.map(item => [
      item.prodId, item.userId, item.name, item.image, item.price, item.rating, item.info, item.qty
    ]);

    db.query('INSERT INTO OrderItems (prodId, userId, name, image, price, rating, info, qty) VALUES ?', [orderItems], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Database query error');
      }

      db.query('DELETE FROM CartProducts WHERE userId = ?', [userId], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Database query error');
        }

        res.send('Order placed successfully');
      });
    });
  });
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
