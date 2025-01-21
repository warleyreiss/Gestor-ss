import React from "react";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { axiosApi } from "../services/axios";


//1-criando a instancia do context do react
export const AuthContext = createContext();
//2- criando o componente que amazenará todo o contexto
export const AuthProvider = ({ children }) => {

  // variavel que armazena se o usuarioe stá logado ou não
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState('');
  const [userTipo, setUserTipo] = useState('');
  const [userSetor, setUserSetor] = useState('');
  const [userClient, setUserClient] = useState('');
  const [vehicleId, setVehicleId] = useState(null);
  const [vehicleDesc, setVehicleDesc] = useState(null);
  //4- verifico se existe usuario logado no navegador
  useEffect(() => {

    const loadingStoreData = () => {
      //verifico se existem dados salvos
      const storageUser = JSON.parse(localStorage.getItem("@Auth:user"));
      const storageUserId = JSON.parse(localStorage.getItem("@Auth:userId"));
      const storageUserTipo = JSON.parse(localStorage.getItem("@Auth:userTipo"));
      const storageUserSetor = JSON.parse(localStorage.getItem("@Auth:userSetor"));
      const storageUserClient = JSON.parse(localStorage.getItem("@Auth:userClient"));
      const storageVehicleId = JSON.parse(localStorage.getItem("@Auth:vehicleId"));
      const storageVehicleDesc = JSON.parse(localStorage.getItem("@Auth:vehicleDesc"));
      const storageToken = localStorage.getItem("@Auth:token");

      // se existir, altero o status de user
      if (storageUser && storageToken) {
        setUser(storageUser);
        setUserId(storageUserId);
        setUserTipo(storageUserTipo);
        setUserSetor(storageUserSetor);
        setUserClient(storageUserClient);
        setVehicleId(storageVehicleId);
        setVehicleDesc(storageVehicleDesc);
        axiosApi.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storageToken}`;

        axiosApi.defaults.headers.head[
          "userId"
        ] = JSON.parse(localStorage.getItem("@Auth:userId"));
        axiosApi.defaults.headers.head[
          "userClientId"
        ] = JSON.parse(localStorage.getItem("@Auth:userClient"));
        axiosApi.defaults.headers.head[
          "vehicleId"
        ] = JSON.parse(localStorage.getItem("@Auth:vehicleId"));
        axiosApi.defaults.headers.head[
          "vehicleDesc"
        ] = JSON.parse(localStorage.getItem("@Auth:vehicleDesc"));
        
      } else {

      }
    };
    loadingStoreData();
    
  }, []);

  //5- funcao "global" para envio do formulario login que será utilizadoo na pagina login
  const signIn = async ({ email, password }) => {
    try {
      //envio do formulario usando a instancia do axios
      const response = await axiosApi.post("auth/login", { email, password });
      //verifico se a requisição deu certo

      if (response.data.error) {
        alert(response.data.error);
      } else {
        setUser(response.data);
        //6- altero a confifuração da instancia do axios, inserindo os dados do header
        axiosApi.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        //7- salvo as informações no local storage
        localStorage.setItem("@Auth:user", JSON.stringify(response.data.nome));
        localStorage.setItem("@Auth:userId", JSON.stringify(response.data.id));
        localStorage.setItem("@Auth:userTipo", JSON.stringify(response.data.tipo));
        localStorage.setItem("@Auth:userSetor", JSON.stringify(response.data.setor));
        localStorage.setItem("@Auth:userClient", JSON.stringify(response.data.cliente));
        localStorage.setItem("@Auth:vehicleId", JSON.stringify(response.data.veiculoId));
        localStorage.setItem("@Auth:vehicleDesc", JSON.stringify(response.data.veiculoDesc));
        localStorage.setItem("@Auth:token", response.data.token);
        const storageUser = JSON.parse(localStorage.getItem("@Auth:user"));
        const storageUserId = JSON.parse(localStorage.getItem("@Auth:userId"));
        const storageUserTipo = JSON.parse(localStorage.getItem("@Auth:userTipo"));
        const storageUserSetor = JSON.parse(localStorage.getItem("@Auth:userSetor"));
        const storageUserClient = JSON.parse(localStorage.getItem("@Auth:userClient"));
        const storageVehicleId = JSON.parse(localStorage.getItem("@Auth:vehicleId"));
        const storageVehicleDesc = JSON.parse(localStorage.getItem("@Auth:vehicleDesc"));
        const storageToken = localStorage.getItem("@Auth:token");
        setUser(storageUser);
        setUserId(storageUserId);
        setUserTipo(storageUserTipo);
        setUserSetor(storageUserSetor);
        setUserClient(storageUserClient);
        setVehicleId(storageVehicleId);
        setVehicleDesc(storageVehicleDesc);
        window.location.replace('/servicos');
      }
    } catch (error) {
      alert(error.response.data.msg_alert);
    }
  };

  //funcao para sair
  const signOut = () => {

    localStorage.clear();
    setUser(null);
    axiosApi.defaults.headers.common[
      "Authorization"
    ] = null;
    window.location.replace('/login');
  };

  // funcao para salvar visita no local storage
  const selectedCar = (obj) => {
    setVehicleId(obj.id);
    setVehicleDesc(obj.frota);
    localStorage.setItem("@Auth:vehicleId", JSON.stringify(obj.id));
    localStorage.setItem("@Auth:vehicleDesc", JSON.stringify(obj.frota));
  };
  return (
    //3- retornar o conteúdo do componente que armazena todo o conteudo
    <AuthContext.Provider

      value={{
        user,
        userId,
        userTipo,
        userSetor,
        userClient,
        vehicleDesc,
        vehicleId,
        signIn,
        signOut,
        selectedCar,
        signed: !!user,// a funcao que armazena true ou flase conforme state de user
      }}
    >
      {children}
    </AuthContext.Provider>

  );
};
