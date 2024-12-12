import React from "react";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { axiosApi } from "../services/axios";
import { ColumnSizing } from "@tanstack/react-table";


//1-criando a instancia do context do react
export const AuthContext = createContext();
//2- criando o componente que amazenará todo o contexto
export const AuthProvider = ({ children }) => {

  // variavel que armazena se o usuarioe stá logado ou não
  const [cliente, setcliente] = useState(null);
  const [clienteId, setclienteId] = useState('');
  const [clienteNome, setclienteNome] = useState('');
  const [clienteCNPJ, setclienteCNPJ] = useState('');
  const [clienteTipo, setclienteTipo] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [caixa, setCaixa] = useState('');
  //4- verifico se existe usuario logado no navegador
  useEffect(() => {

    const loadingStoreData = () => {

   
      //verifico se existem dados salvos
      const storageClienteId = JSON.parse(localStorage.getItem("@Auth:clienteId"));
      const storageClienteTipo = JSON.parse(localStorage.getItem("@Auth:clienteTipo"));
      const storageClienteNome = JSON.parse(localStorage.getItem("@Auth:clienteNome"));
      const storageClienteCNPJ = JSON.parse(localStorage.getItem("@Auth:clienteCNPJ"));
      const storageCaixa = JSON.parse(localStorage.getItem("@Auth:caixa"));
      const storageToken = localStorage.getItem("@Auth:token");

      // se existir, altero o status de cliente
      if (storageClienteNome && storageToken) {
        //console.log(clienteId)
        setclienteId(storageClienteId);
        setclienteNome(storageClienteNome);
        setclienteCNPJ(storageClienteCNPJ);
        setclienteTipo(storageClienteTipo);
        setCaixa(storageCaixa)
        //console.log(axiosApi.defaults.headers)
        axiosApi.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storageToken}`;

        axiosApi.defaults.headers.head[
          "clienteId"
        ] = JSON.parse(localStorage.getItem("@Auth:clienteId"));
        axiosApi.defaults.headers.head[
          "clienteTipo"
        ] = JSON.parse(localStorage.getItem("@Auth:clienteTipo"));
      } else {
        //console.log('sem login')
      }
    };
    loadingStoreData();
  }, []);

  //5- funcao "global" para envio do formulario login que será utilizadoo na pagina login
  const signIn = async ({ email, senha}) => {
    console.log(email, senha)
    try {
      //envio do formulario usando a instancia do axios
      const response = await axiosApi.post("auth/login", { email, senha});
      //verifico se a requisição deu certo

      if (response.data.error) {
        alert(response.data.error);
      } else {
        setcliente(response.data);
        //6- altero a confifuração da instancia do axios, inserindo os dados do header
        //console.log(axiosApi.defaults.headers)
        axiosApi.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        
        //7- salvo as informações no local storage
        localStorage.setItem("@Auth:clienteId", JSON.stringify(response.data.id));
        localStorage.setItem("@Auth:clienteNome", JSON.stringify(response.data.nome));
        localStorage.setItem("@Auth:clienteCNPJ", JSON.stringify(response.data.cnpj));
        localStorage.setItem("@Auth:clienteTipo", JSON.stringify(response.data.tipo));
        localStorage.setItem("@Auth:token", response.data.token);

        setclienteId(response.data.id);
        setclienteTipo(response.data.tipo);
        setclienteNome(response.data.nome);
        setclienteCNPJ(response.data.cnpj);
        
      }

    } catch (error) {
      alert(error.response.data.msg_alert);
    }
  };

  //funcao para sair
  const signOut = () => {

    localStorage.clear();
    setclienteId(null);
    axiosApi.defaults.headers.common[
      "Authorization"
    ] = null;
    window.location.replace('/login');
  };
  const updatePerido = (value) => {
   setPeriodo(value)
   localStorage.setItem("@Auth:periodoInicio", JSON.stringify(value[0]));
   localStorage.setItem("@Auth:periodoFim",JSON.stringify(value[1]));
  };
 const updateCaixa= (value) => {
  localStorage.setItem("@Auth:caixa", value);
   setCaixa(value)
  };
  return (
    //3- retornar o conteúdo do componente que armazena todo o conteudo
    <AuthContext.Provider

      value={{
        // variavis repassadas a toda a aplicação
        clienteId,
        clienteNome,
        clienteCNPJ,
        clienteTipo,
        periodo,
        caixa,
        signIn,
        signOut,
        updatePerido,
        updateCaixa,
        signed: !!clienteId,// a funcao que armazena true ou flase conforme state de cliente
      }}
    >
      {children}
    </AuthContext.Provider>

  );
};
