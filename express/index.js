const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dados simulados (em memória)
let users = [];

let products = [];

let compras = [];

let idUser = 0;

let idProd = 0;

// Gera um ID único para novos usuários
const generateUsersId = () => idUser++;

const generateProdId = () => idProd++;

// ** Rotas **

// Listar todos os usuários
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Buscar usuário por ID
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

// Criar um novo usuário
app.post('/api/users', (req, res) => {
  const { name, cpf, phone } = req.body;
  if (!name || !cpf || !phone) {
    return res.status(400).json({ message: 'Preencha os campos obrigatórios' });
  }
  const newUser = { id: generateUsersId(), name, cpf, phone };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Atualizar usuário por ID
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, cpf, phone } = req.body;

  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex !== -1) {
    const updatedUser = { ...users[userIndex], name, cpf, phone };
    users[userIndex] = updatedUser;
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

// Deletar usuário por ID
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

// Listar todos os usuários
app.get('/api/products', (req, res) => {
    res.json(products);
  });


// Buscar usuário por ID
app.get('/api/products/:code', (req, res) => {
    const code = parseInt(req.params.code, 10);
    const prod = products.find(u => u.code === code);
    if (prod) {
      res.json(prod);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  });
  
  // Criar um novo usuário
  app.post('/api/products', (req, res) => {
    const { name, value} = req.body;
    if (!name || (!value && value !== 0)) {
      return res.status(400).json({ message: 'Preencha os campos obrigatórios' });
    }
  
    const newProd = { code: generateProdId(), name, value};
    products.push(newProd);
    res.status(201).json(newProd);
  });
  
  // Atualizar usuário por ID
  app.put('/api/products/:code', (req, res) => {
    const code = parseInt(req.params.code, 10);
    const { name, value} = req.body;
  
    const prodIndex = products.findIndex(u => u.code === code);
    if (prodIndex !== -1) {
      const updatedProd = { ...products[prodIndex], name, value};
      products[prodIndex] = updatedProd;
      res.json(updatedProd);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  });
  
  // Deletar usuário por ID
  app.delete('/api/products/:code', (req, res) => {
    const code = parseInt(req.params.code, 10);
    const prodIndex = products.findIndex(u => u.code === code);
  
    if (prodIndex !== -1) {
      const deletedProd = products.splice(prodIndex, 1);
      res.json(deletedProd);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  });

  // Listar todos os usuários
app.get('/api/compras', (req, res) => {
    res.json(compras);
  });

  // Listar todos os usuários
app.get('/api/compras/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = compras.filter((u) => u.user_id == id)  
  res.json(data);
  });

//Atualiza a compra
app.put("/api/compras/:id/:code", (req, res) =>{
    const code = parseInt(req.params.code, 10);
    const id = parseInt(req.params.id, 10);
    const { quantity } = req.body;
  
    const compraIndex = compras.findIndex(u => (u.code_product === code) && (u.user_id === id));
    const prod = products.find((u) => u.code === code);
    if (compraIndex !== -1) {
      let value = prod.value * quantity;
      const updatedCompra = { ...compras[compraIndex], quantity, value};
      compras[compraIndex] = updatedCompra;
      res.json(updatedCompra);
    } else {
      res.status(404).json({ message: 'Compra não encontrada' });
    }
});

   // Criar um novo usuário
app.post('/api/compras', (req, res) => {
    const { code_product, user_id, quantidade} = req.body;
    if ((!code_product && code_product !== 0) || (!user_id && user_id !== 0)|| !quantidade) {
      return res.status(400).json({ message: 'Preencha os campos obrigatórios' });
    }
  
    const prod = products.find(u => (u.code === code_product));
    if(!prod) return res.status(400).json({message: 'Produto não encontrado'});

    const user = users.find(u => (u.id === user_id));
    if(!user) return res.status(400).json({message: "Usuário não encontrado"});
    const date = new Date();

    const total = prod.value * quantidade;

    const newCompra = { code_product, user_id, value: total, data: date.toISOString(), quantity: quantidade, name: prod.name};
    compras.push(newCompra);
    res.status(201).json(newCompra);
  });


// Deletar usuário por ID
app.delete('/api/compras/:id_cliente/:code_product', (req, res) => {
    const id_cliente = parseInt(req.params.id_cliente, 10);
    const code_product = parseInt(req.params.code_product, 10);
    const compraIndex = compras.findIndex(u => (u.user_id === id_cliente) && (u.code_product === code_product));
  
    if (compraIndex !== -1) {
      const deletedCompra = compras.splice(compraIndex, 1);
      res.json(deletedCompra);
    } else {
      res.status(404).json({ message: 'Compra não encontrada' });
    }
  });


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
