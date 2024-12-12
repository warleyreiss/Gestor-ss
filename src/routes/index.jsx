
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext';
import { PrivateRoute } from '../components/layout/sidebar/privateRoutes'
//COMPONENTES DA PAGINA
import SideBar from '../components/layout/sidebar/SideBar'
import Signin from '../components/pages/login/signin'
import Home from '../components/pages/home/home'
import listaClientes from '../components/pages/clientes/lista'
//...


import ListaClientes from '../components/pages/clientes/lista'
import ListaProdutos from '../components/pages/produtos/lista'
import ListaServicos from '../components/pages/servicos/lista'
import  ListaVendaSobDemanda from '../components/pages/vendas_sobre_demanda/lista'
import ListaVendaBalcao from '../components/pages/vendas_balcao/lista'
import Entradas from '../components/pages/entradas/form'
import ConfiguracaoProjeto from '../components/pages/configuracoes/configuracao';
import ListaFornecedores from '../components/pages/fornecedores/lista';
import ListaDespesas from '../components/pages/despesas/lista';
import ListaOrdensPagamento from '../components/pages/ordens_pagamentos/lista';
import Dashboard from '../components/pages/dashboard/index';
import ListaEntradasPendentes from '../components/pages/entradas_pendentes/lista';
import ListaEntradas from '../components/pages/entradas/lista';
export const AppRouter = () => {
  return (
    <Router>
      <SideBar />
      <Routes>
        {/*
        <Route exact path="/" element={<PrivateRoute />} >
          <Route path="/" element={<Home />} />
        </Route>

        <Route exact path ="/home" element={<PrivateRoute />} >
          <Route path="/home" element={<Home />} />
        </Route>

        
 */}
        <Route path="/login" element={<Signin />} />
        <Route exact path ="/configuracao" element={<PrivateRoute />} >
          <Route path="/configuracao" element={<ConfiguracaoProjeto/>} />
        </Route> 
        <Route exact path ="/" element={<PrivateRoute />} >
          <Route path="/" element={<Home />} />
        </Route>
        <Route exact path ="/clientes" element={<PrivateRoute />} >
          <Route path="/clientes" element={<ListaClientes />} />
        </Route>
        <Route exact path ="/produtos" element={<PrivateRoute />} >
          <Route path="/produtos" element={<ListaProdutos />} />
        </Route>
        <Route exact path ="/servicos" element={<PrivateRoute />} >
          <Route path="/servicos" element={<ListaServicos/>} />
        </Route> 
        <Route exact path ="/vendas_sob_demanda" element={<PrivateRoute />} >
          <Route path="/vendas_sob_demanda" element={< ListaVendaSobDemanda/>} />
        </Route> 
        <Route exact path ="/vendas_balcao" element={<PrivateRoute />} >
          <Route path="/vendas_balcao" element={< ListaVendaBalcao/>} />
        </Route>
         <Route exact path ="/pagamentos/:ordens_servico_id" element={<PrivateRoute />} >
          <Route path="/pagamentos/:ordens_servico_id" element={<Entradas/>} />
        </Route> 
        <Route exact path ="/fornecedores" element={<PrivateRoute />} >
          <Route path="/fornecedores" element={<ListaFornecedores />} />
        </Route>
        <Route exact path ="/despesas" element={<PrivateRoute />} >
          <Route path="/despesas" element={<ListaDespesas/>} />
        </Route>
        <Route exact path ="/ordens_pagamento" element={<PrivateRoute />} >
          <Route path="/ordens_pagamento" element={<ListaOrdensPagamento/>} />
        </Route>
        <Route exact path ="/dashboard" element={<PrivateRoute />} >
          <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
        <Route exact path ="/entradas_pendentes" element={<PrivateRoute />} >
          <Route path="/entradas_pendentes" element={<ListaEntradasPendentes/>} />
        </Route>
        <Route exact path ="/entradas" element={<PrivateRoute />} >
          <Route path="/entradas" element={<ListaEntradas/>} />
        </Route>
      </Routes >
    </Router >

  );
};
