const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000; // Porta do Server


// Middleware
app.use(cors());
app.use(express.json());

// ** endpoints **

function getDate(){
  const data = new Date(); // Gera a data atual
  const dataFormatada = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
  return dataFormatada;
}

// Listar todos os clientes
app.get('/api/users', (req, res) => {
  const query  = 'SELECT * FROM Cliente;'; //Lista todos os clientes
  db.query(query, (err, results) => { //Executa a consulta
    if(err){
      console.error("Erro ao executar a consulta:", err.message);
      res.status(500).json({ message: 'Erro no servidor'}); //Erro
      return;
    }
    res.json(results);//Envia os resultados
  });
});

// Buscar cliente por ID
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10); //Converte para inteiro base 10
  const query = 'SELECT * FROM Cliente WHERE id = ' + id + ';'; //Pesquisa pelo usuário
  db.query(query, (err, results) => { //Executa
    if(err){
      console.error("Erro ao executar a consulta:", err.message);
      res.status(500).json({ message: 'Erro no servidor'}); //Erro
      return;
    }
    res.json(results);
  });
});

// Criar um novo cliente
app.post('/api/users', (req, res) => {
  const { name, cpf, phone } = req.body;
  if (!name || !cpf || !phone) { //Verifica se os campos foram preenchidos
    res.status(400).json({ message: 'Preencha os campos obrigatórios' });
    return;
  }
  const values = [name, cpf, phone]; //Valores para inserir
  const sql = 'INSERT INTO Cliente (nome, cpf, telefone) VALUES (?, ?, ?);'; //SQL insert
  db.query(sql, values, (err, results) => {
    if(err){
      console.error("Erro ao executar a inserção:", err.message);
      res.status(500).json({ message: 'Erro no servidor'}); //Erro
      return;
    }
    //Sucesso
    res.status(201).json({ message: 'Cliente inserido com sucesso', id: results.insertId});
  })
});

// Atualizar cliente por ID
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10); //Converte para int
  const { name, cpf, phone } = req.body;
  if (!name || !cpf || !phone) { //Verifica se os campos foram preenchidos
    res.status(400).json({ message: 'Preencha os campos obrigatórios' });
    return;
  }

  const sql = 'UPDATE Cliente SET nome = ?, cpf = ?, telefone = ? WHERE id = ?;';
  const values = [name, cpf, phone, id];

  db.query(sql, values, (err, results) =>{
    if(err){
      console.error("Erro ao executar a atualização:", err.message);
      res.status(500).json({ message: 'Erro no servidor'}); //Erro
      return;
    }

    //Não encontrou o cliente
    if(results.affectedRows == 0){
      res.status(404).json({ message: 'Cliente não encontrado' });
      return;
    }

    //Sucesso
    res.status(200).json({ message: 'Cliente atualizado com sucesso!' });
  });
});

// Deletar cliente por ID
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10); //Converte para int

  const sql = 'DELETE FROM Cliente WHERE id = ?;';

  db.query(sql, [id], (err, results) => {
    if(err){
      console.error("Erro ao executar a exclusão:", err.message);
      res.status(500).json({ message: 'Erro no servidor'}); //Erro
      return;
    }

    //Não encontrou o cliente
    if(results.affectedRows == 0){
      res.status(404).json({ message: 'Cliente não encontrado' });
      return;
    }

    //Sucesso
    res.status(200).json({ message: 'Cliente excluído com sucesso!' });
  });
});

// Listar todos os produtos
app.get('/api/products', (req, res) => {
  const query  = 'SELECT * FROM Produto_PET;'; //Lista todos os produtos PET
  db.query(query, (err, results) => { //Executa a consulta
    if(err){
      console.error("Erro ao executar a consulta:", err.message);
      res.status(500).json({ message: 'Erro no servidor'}); //Erro
      return;
    }
    res.json(results);//Envia os resultados
  });
  });

// Buscar produto por ID
app.get('/api/products/:code', (req, res) => {
    const code = parseInt(req.params.code, 10); //Converte para int base 10
    const query = 'SELECT * FROM Produto_PET WHERE codigo_de_barras = ' + code + ';';
    db.query(query, (err, results) => {
      if(err){
        console.error("Erro ao executar a consulta:", err.message);
        res.status(500).json({ message: 'Erro no servidor'}); //Erro
        return;
      }
      //Sucesso
      res.json(results);
    });
  });
  
  // Criar um novo produto
  app.post('/api/products', (req, res) => {
    const { name, value, code} = req.body;
    if (!name || (!value && value !== 0) || (!code && code !== 0)) { //Verifica se os campos foram preenchidos
      res.status(400).json({ message: 'Preencha os campos obrigatórios' });
      return;
    }

    const sql = 'INSERT INTO Produto_PET (codigo_de_barras, nome, valor) VALUES (?, ?, ?);';
    const values = [code, name, value];

    db.query(sql,  values, (err, results) =>{
      if(err){
        console.error("Erro ao executar a inserção:", err.message);
        res.status(500).json({ message: 'Erro no servidor'}); //Erro
        return;
      }
      //Sucesso
      res.status(201).json({ message: 'Produto inserido com sucesso', id: results.insertId});
    })
  });
  
  // Atualizar produto por ID
  app.put('/api/products/:code', (req, res) => {
    const code = parseInt(req.params.code, 10); //COnverte para int
    const { name, value} = req.body;
    if (!name || (!value && value !== 0)) { //Verifica se os campos foram preenchidos
      res.status(400).json({ message: 'Preencha os campos obrigatórios' });
      return;
    }
    const sql = 'UPDATE Produto_PET SET nome = ?, valor = ? WHERE codigo_de_barras = ?;';
    const values = [name, value, code];

    db.query(sql, values, (err, results) =>{
      if(err){
        console.error("Erro ao executar a atualização:", err.message);
        res.status(500).json({ message: 'Erro no servidor'}); //Erro
        return;
      }
  
      //Não encontrou o Produto
      if(results.affectedRows == 0){
        res.status(404).json({ message: 'Produto não encontrado' });
        return;
      }
  
      //Sucesso
      res.status(200).json({ message: 'Produto atualizado com sucesso!' });
    });
  });
  
  // Deletar produto por ID
  app.delete('/api/products/:code', (req, res) => {
    const code = parseInt(req.params.code, 10);

    const sql = 'DELETE FROM Produto_PET WHERE codigo_de_barras = ?;';

    db.query(sql, [code], (err, results) => {
      if(err){
        console.error("Erro ao executar a exclusão:", err.message);
        res.status(500).json({ message: 'Erro no servidor'}); //Erro
        return;
      }

      //Não encontrou o produto
      if(results.affectedRows == 0){
         res.status(404).json({ message: 'Produto não encontrado' });
         return;
      }

      //Sucesso
      res.status(200).json({ message: 'Produto excluído com sucesso!' });
    });
  });

  // Listar todas as compras
app.get('/api/compras', (req, res) => {
  const query  = 'SELECT * FROM Compra_produto_pet;'; //Lista todas as compras
  db.query(query, (err, results) => { //Executa a consulta
    if(err){
      console.error("Erro ao executar a consulta:", err.message);
      res.status(500).json({ message: 'Erro no servidor'}); //Erro
      return;
    }
    res.json(results);//Envia os resultados
    });
  });

// Listar todas as compras de um usuário
app.get('/api/compras/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const query  = 'SELECT * FROM Compra_produto_pet WHERE fk_Cliente_ID = ?;'; //Lista todas as compras
  db.query(query, [id], (err, results) => { //Executa a consulta
    if(err){
      console.error("Erro ao executar a consulta:", err.message);
      res.status(500).json({ message: 'Erro no servidor'}); //Erro
      return;
    }
    res.json(results);//Envia os resultados
    });
  });


// Listar uma compra específica do cliente
app.get('/api/compras/:id/:code', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const code = parseInt(req.params.code, 10);
  const query  = 'SELECT * FROM Compra_produto_pet WHERE fk_Cliente_ID = ? and  fk_Produto_PET_Codigo_de_Barras = ?;'; //Lista todas as compras
  db.query(query, [id, code], (err, results) => { //Executa a consulta
    if(err){
      console.error("Erro ao executar a consulta:", err.message);
      res.status(500).json({ message: 'Erro no servidor'}); //Erro
      return;
    }
    res.json(results);//Envia os resultados
    });
  });  

//Atualiza a compra
app.put("/api/compras/:id/:code", (req, res) =>{
    const code = parseInt(req.params.code, 10);
    const id = parseInt(req.params.id, 10);
    const { quantity } = req.body;

    if (!quantity) { //Deve comprar pelo menos um
      res.status(400).json({ message: 'Quantidade deve ser maior que zero!' });
      return;
    }

    const query = 'SELECT * FROM Produto_PET WHERE codigo_de_barras = ?;'; //Busca o produto
    db.query(query, [code], (err, results) =>{
      if(err){
        console.error("Erro ao executar a atualização:", err.message);
        res.status(500).json({ message: 'Erro no servidor'}); //Erro
        return;
      }
      if(!results) {
        res.status(400).json({message: 'Produto não encontrado'}); //Produto não encontrado
        return;
      }
      const sql = 'UPDATE Compra_produto_pet SET Quantidade = ?, Data = ?, Valor = ? WHERE fk_Produto_PET_Codigo_de_Barras = ? and fk_Cliente_ID = ?;';
      const valor = results[0].Valor * quantity;
      const values = [quantity, getDate(), valor, code, id];
      db.query(sql, values,(e, r) => {
        if(e){
          console.error("Erro ao executar a atualização:", e.message);
          res.status(500).json({ message: 'Erro no servidor'}); //Erro
          return;
        }
        //Não encontrou o Compra
        if(r.affectedRows == 0){
           res.status(404).json({ message: 'Compra não encontrada' });
           return;
        }
  
        //Sucesso
        res.status(200).json({ message: 'Compra atualizada com sucesso!' });
    });
      });
});

   // Criar nova compra
app.post('/api/compras', (req, res) => {
    const { code_product, user_id, quantidade} = req.body;
    if ((!code_product && code_product !== 0) || (!user_id && user_id !== 0)|| !quantidade) {
      res.status(400).json({ message: 'Preencha os campos obrigatórios' });
      return;
    }

    const query = 'SELECT * FROM Produto_PET WHERE codigo_de_barras = ?;'; //Busca o produto
    db.query(query, [code_product], (err, results) => {
      if(err){
        console.error("Erro ao executar a consulta:", err.message);
        res.status(500).json({ message: 'Erro no servidor'}); //Erro
        return;
      }
      if(!results) {
        res.status(400).json({message: 'Produto não encontrado'}); //Produto não encontrado
        return;
      }
      let value_up = 0;
      let update = 0;
      const q = 'SELECT * FROM Compra_produto_pet WHERE fk_Produto_PET_Codigo_de_Barras = ? and fk_Cliente_ID = ?;';
      db.query(q, [code_product, user_id], (er, resul) =>{
        if(er){
          console.error("Erro ao executar a consulta:", er.message);
          res.status(500).json({ message: 'Erro no servidor'}); //Erro
          return;
        }
        if(resul[0]) {
          value_up = parseInt(resul[0].Valor, 10);
          update = resul[0].Quantidade; // compra
          update += quantidade;
          const cmd = 'UPDATE Compra_produto_pet SET Quantidade = ?, Data = ?, Valor = ? WHERE fk_Produto_PET_Codigo_de_Barras = ? and fk_Cliente_ID = ?;';
          const valor = results[0].Valor * quantidade;
          value_up += valor;
          const values = [update, getDate(), value_up, code_product, user_id];
         db.query(cmd, values,(e, r) => {
           if(e){
             console.error("Erro ao executar a compra:", e.message);
             res.status(500).json({ message: 'Erro no servidor'}); //Erro
             return;
           }
            //Sucesso
           res.status(200).json({ message: 'Compra feita com sucesso!', id: r.insertId });
           });
         }
         else{
          const sql = 'INSERT INTO Compra_produto_pet (fk_Produto_PET_Codigo_de_Barras, fk_Cliente_ID, Data, Quantidade, Valor) VALUES (?, ?, ?, ?, ?);'; //Cria nova compra
          const valor = results[0].Valor * quantidade; // Calcula o valor total
          const v = [code_product, user_id, getDate(), quantidade, valor];
          db.query(sql,  v, (e, r) =>{
            if(e){
              console.error("Erro ao executar a inserção:", e.message);
              res.status(500).json({ message: 'Erro no servidor'}); //Erro
              return;
            }
            //Sucesso
            res.status(201).json({ message: 'Compra feita com sucesso', id: r.insertId});
          });
         }
      });
    });
  });


// Deletar compra
app.delete('/api/compras/:id_cliente/:code_product', (req, res) => {
    const id_cliente = parseInt(req.params.id_cliente, 10);
    const code_product = parseInt(req.params.code_product, 10);
    const sql = 'DELETE FROM Compra_produto_pet WHERE fk_Produto_PET_Codigo_de_Barras = ? and fk_Cliente_ID = ?;'; //Deleta compra
    const values = [code_product, id_cliente];
    db.query(sql, values, (err, results) => {
      if(err){
        console.error("Erro ao executar a exclusão:", err.message);
        res.status(500).json({ message: 'Erro no servidor'}); //Erro
        return;
      }

      //Não encontrou a compra
      if(results.affectedRows == 0){
         res.status(404).json({ message: 'Compra não encontrada' });
         return;
      }

      //Sucesso
      res.status(200).json({ message: 'Compra excluída com sucesso!' });
    });
    });


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
