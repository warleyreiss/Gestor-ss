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
  const [visit, setVisit] = useState(null);
  const [vehicleId, setVehicleId] = useState(null);
  const [vehicleDesc, setVehicleDesc] = useState(null);
  const [occurrence, setOccurrence] = useState(false);
  //4- verifico se existe usuario logado no navegador
  useEffect(() => {

    const loadingStoreData = () => {
      //verifico se existem dados salvos
      const storageUser = JSON.parse(localStorage.getItem("@Auth:user"));
      const storageUserId = JSON.parse(localStorage.getItem("@Auth:userId"));
      const storageUserTipo = JSON.parse(localStorage.getItem("@Auth:userTipo"));
      const storageUserSetor = JSON.parse(localStorage.getItem("@Auth:userSetor"));
      const storageUserClient = JSON.parse(localStorage.getItem("@Auth:userClient"));
      const storageVisit = JSON.parse(localStorage.getItem("@Auth:visit"));// && localStorage.getItem("@Auth:visit"));
      const storageOccurrence = JSON.parse(localStorage.getItem("@Auth:occurrence"));
      const storageVehicleId = JSON.parse(localStorage.getItem("@Auth:vehicleId"));
      const storageVehicleDesc = JSON.parse(localStorage.getItem("@Auth:vehicleDesc"));
      const storageToken = localStorage.getItem("@Auth:token");

      // se existir, altero o status de user
      if (storageUser && storageToken) {
        //console.log(userId)
        setUser(storageUser);
        setUserId(storageUserId);
        setUserTipo(storageUserTipo);
        setUserSetor(storageUserSetor);
        setUserClient(storageUserClient);
        setVisit(storageVisit);
        setOccurrence(storageOccurrence);
        setVehicleId(storageVehicleId);
        setVehicleDesc(storageVehicleDesc);
        //console.log(axiosApi.defaults.headers)
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
          "visite"
        ] = JSON.parse(localStorage.getItem("@Auth:visit"));
        axiosApi.defaults.headers.head[
          "occurrence"
        ] = JSON.parse(localStorage.getItem("@Auth:occurrence"));
        axiosApi.defaults.headers.head[
          "vehicleId"
        ] = JSON.parse(localStorage.getItem("@Auth:vehicleId"));
        axiosApi.defaults.headers.head[
          "vehicleDesc"
        ] = JSON.parse(localStorage.getItem("@Auth:vehicleDesc"));
        
      } else {
        //console.log('sem login')
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
        //console.log(axiosApi.defaults.headers)
        axiosApi.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        //7- salvo as informações no local storage
        console.log(response.data)
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
      }


      //envio do formulario usando a instancia do axios
      const responseVisit = await axiosApi.get("/open_visite");
      //verifico se a requisição deu certo
      if (responseVisit.data.error) {
        console.log(responseVisit.data.error);
      } else {
        setVisit(responseVisit.data);
        const storageVisit = localStorage.setItem("@Auth:visit", JSON.stringify(responseVisit.data));
      }


      //envio do formulario usando a instancia do axios
      const responseOccurrence = await axiosApi.get("/open_occurrence");
  
      //verifico se a requisição deu certo
      if (responseOccurrence.data.error) {
        console.log(responseOccurrence.data.error);
      } else {
        console.log(responseOccurrence.data)
        //setVisit(responseOccurrence.data);
        const storageOccurrence = localStorage.setItem("@Auth:occurrence", JSON.stringify(responseOccurrence.data));
        setOccurrence(true);
        console.log(occurrence)
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
  const onVisit = (data) => {
    setVisit(data);
    localStorage.setItem("@Auth:visit", JSON.stringify(data));
  };
  // funcao para salvar visita no local storage
  const onOccurrence = (data) => {
    setOccurrence(data);
    localStorage.setItem("@Auth:occurrence", JSON.stringify(data));
  };

  // funcao para remover visita do local storage
  //funcao para sair
  const endVisit = async (form) => {
    console.log(form)

    try {
      //envio da solicitação usando o axios
      const response = await axiosApi.patch('/closed_visite', form)
      //verifico se a requisição deu certo
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setVisit(null);
        setOccurrence(null);
        //console.log('visita encerrada')
        localStorage.setItem("@Auth:visit", null);
        localStorage.setItem("@Auth:occurrence", null);
      }
    } catch (error) {
      //console.log(error);
    }
  };
  const endOccurrence = async () => {
    try {
      //envio da solicitação usando o axios
      const response = await axiosApi.patch("closed_occurrence");
      //verifico se a requisição deu certo
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setOccurrence(null);
        //console.log('visita encerrada')
        localStorage.setItem("@Auth:occurrence", null);
      }
    } catch (error) {
      //console.log(error);
    }
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
        // variavis repassadas a toda a aplicação
        user,
        userId,
        userTipo,
        userSetor,
        userClient,
        vehicleDesc,
        vehicleId,
        visit,
        occurrence,
        exceed: false,
        correction: true,
        signIn,
        signOut,
        onVisit,
        endVisit,
        onOccurrence,
        endOccurrence,
        selectedCar,
        signed: !!user,// a funcao que armazena true ou flase conforme state de user
      }}
    >
      {children}
    </AuthContext.Provider>

  );
};
