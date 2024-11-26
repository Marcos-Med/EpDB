import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/Users/HomePage';
import UserCreate from './pages/Users/UserCreate';
import UserEdit from './pages/Users/UserEdit';
import UserList from './pages/Users/UserList';
import ProdList from './pages/Users/ProdList';
import ProdCreate from './pages/Users/ProdCreate';
import ProdEdit from './pages/Users/ProdEdit';
import Compras from './pages/Users/Compras';
import ComprasEdit from './pages/Users/ComprasEdit';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/users' element={<UserList />} />
        <Route path='/users/new' element={<UserCreate />} />
        <Route path='/users/:id' element={<UserEdit />} />
        <Route path='/products' element={<ProdList/>}/>
        <Route path='/products/new' element={<ProdCreate/>}/>
        <Route path='/products/:code' element={<ProdEdit/>}/>
        <Route path='/compras/:id' element={<Compras/>}/>
        <Route path='/compras/:id/:code' element={<ComprasEdit/>}/>
      </Route>
      <Route path='*' element={<HomePage />} />
    </Routes>
  );
};
export default AppRoutes; //Define as rotas que levam as páginas