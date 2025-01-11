import React from 'react';
import { Link, link_nav } from 'react-router-dom'
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { ToggleButton } from 'primereact/togglebutton';

import { useEffect } from "react";
import { SpeedDial } from 'primereact/speeddial';
import { Avatar } from 'primereact/avatar';
import { ReactComponent as LogoSideBar } from "./logotipo.svg";
import { Dock } from 'primereact/dock';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Sidebar } from 'primereact/sidebar';
//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { useForm, Controller } from 'react-hook-form';
import { axiosApi } from '../../../services/axios';

import './styles.css';
import { Divider, Icon } from '@mui/material';

function SideBar() {
  const { clienteNome } = useContext(AuthContext)
  const { periodo } = useContext(AuthContext)
  const { caixa } = useContext(AuthContext)
  const { updatePerido } = useContext(AuthContext)
  const { updateCaixa } = useContext(AuthContext)
  const { signed } = useContext(AuthContext)
  const { signOut } = useContext(AuthContext)
  const { register, handleSubmit, reset, setValue/*, formStates:{erros}*/ } = useForm();
  // Selecting the sidebar and buttons
  const sidebar = document.querySelector(".sidebar");
  const sidebarOpenBtn = document.querySelector("#sidebar-open");
  const sidebarclose_navBtn = document.querySelector("#sidebar-close_nav");
  const sidebarLockBtn = document.querySelector("#lock-icon");

  // Function to toggle the lock state of the sidebar
  const toggleLock = () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarLockBtn = document.querySelector("#lock-icon");
    const bodypd = document.getElementById('body-pd')
    sidebar.classList.toggle("locked");
    // If the sidebar is not locked
    if (!sidebar.classList.contains("locked")) {
      sidebar.classList.add("hoverable");
      sidebarLockBtn.classList.replace("pi-lock-alt", "pi-lock-open-alt");
      bodypd.classList.remove('expander')
    } else {
      sidebar.classList.remove("hoverable");
      sidebarLockBtn.classList.replace("pi-lock-open-alt", "pi-lock-alt");
      bodypd.classList.add('expander')
    }
  };

  // Function to show the sidebar when the mouse enter
  const showSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar.classList.contains("hoverable")) {
      sidebar.classList.remove("close_nav");
    }
  };
  // Function to hide the sidebar when the mouse leaves
  const hideSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar.classList.contains("hoverable")) {
      sidebar.classList.add("close_nav");
    }

  };

  const items = [
    {
      label: 'Configurar',
      icon: 'pi pi-cog',
    },
    {
      label: 'Sair',
      icon: 'pi pi-power-off',
    },
  ]



  const atualizarPeriodo = (value) => {
    setDataPeriodo(value)
    updatePerido(value)

  }
  const [dataPeriodo, setDataPeriodo] = useState(periodo);


  const [visibleRight, setVisibleRight] = useState(false);
  const [checkedCaixa, setCheckedCaixa] = useState(true);
  //const [caixaAtual, setCaixaAtual] = useState('');
  const [resumoDespesasExtras, setResumoDespesasExtras] = useState([]);
  const [resumoOrdensPagamentos, setResumoOrdensPagamentos] = useState([]);
  const [resumoEntradas, setResumoEntradas] = useState([]);
  const [resumoDespesasExtrasConta, setResumoDespesasExtrasConta] = useState([]);
  const [resumoOrdensPagamentosConta, setResumoOrdensPagamentosConta] = useState([]);
  const [resumoEntradasConta, setResumoEntradasConta] = useState([]);

  useEffect(() => {
    //setCheckedCaixa(caixa)

  });

  const showCaixa = () => {
let teste=''
    axiosApi.get("/controle_caixas")
      .then((response) => {
        console.log(response.data)
        if (response.data.status=='true') {
          console.log('response data é true,agora será false')
          setCheckedCaixa(false)
          teste=false
          setValue('valor_inicial_caixa', response.data.valor_inicial_caixa)
          setValue('valor_inicial_conta', response.data.valor_inicial_conta)
        } else {
          console.log('response data é false ,agora será true')
         teste=true
          setCheckedCaixa(true)
          setValue('valor_inicial_caixa', response.data.valor_final_caixa)
          setValue('valor_inicial_conta', response.data.valor_final_conta)
        }
       
      })
      .catch(function (error) {
        console.log(error)
      });
    if (teste) {
      //se o caixa estiver fechado preencho os valores iniciais com o fechamento anterior
      console.log('buscar fechamento de ontem, mas nada mais precisa')

    } else {
      console.log('buscar historico movimentacao')
      axiosApi.get("/controle_caixas/resumos")
        .then((response) => {
          setValue('controle_caixa_id', response.data.caixaInicio.id)
          setResumoOrdensPagamentos(response.data.resumoOrdensPagamentos)
          const somaPagamentosCaixa = response.data.resumoOrdensPagamentos.reduce(function (acumulador, valorAtual,) {
            return acumulador + parseFloat(valorAtual.valor_a_pagar);
          }, 0);
          setResumoDespesasExtras(response.data.resumoDespesasExtras)
          const somaDespesasExtrasCaixa = response.data.resumoDespesasExtras.reduce(function (acumulador, valorAtual,) {
            return acumulador + parseFloat(valorAtual.valor_pago);
          }, 0);
          setResumoEntradas(response.data.resumoEntradas)
          const somaEntradasCaixa = response.data.resumoEntradas.reduce(function (acumulador, valorAtual,) {
            return acumulador + parseFloat(valorAtual.valor_recebido);
          }, 0);
          setResumoOrdensPagamentosConta(response.data.resumoOrdensPagamentosConta)
          const somaPagamentosConta = response.data.resumoOrdensPagamentosConta.reduce(function (acumulador, valorAtual,) {
            return acumulador + parseFloat(valorAtual.valor_a_pagar);
          }, 0);
          setResumoDespesasExtrasConta(response.data.resumoDespesasExtrasConta)
          const somaDespesasExtrasConta = response.data.resumoDespesasExtrasConta.reduce(function (acumulador, valorAtual,) {
            return acumulador + parseFloat(valorAtual.valor_pago);
          }, 0);
          setResumoEntradasConta(response.data.resumoEntradasConta)
          const somaEntradasConta = response.data.resumoEntradasConta.reduce(function (acumulador, valorAtual,) {
            return acumulador + parseFloat(valorAtual.valor_recebido);
          }, 0);
          setValue('valor_inicial_caixa', response.data.caixaInicio.valor_inicial_caixa)
          setValue('valor_inicial_conta', response.data.caixaInicio.valor_inicial_conta)
          setValue('valor_final_caixa', (parseFloat(response.data.caixaInicio.valor_inicial_caixa) + somaEntradasCaixa - somaDespesasExtrasCaixa - somaPagamentosCaixa).toFixed(2))
          setValue('valor_final_conta', (parseFloat(response.data.caixaInicio.valor_inicial_conta) + somaEntradasConta - somaDespesasExtrasConta - somaPagamentosConta).toFixed(2))
        })
        .catch(function (error) {
        });
    }
    setVisibleRight(true)
  }
  /*
    const atualizarCaixa = (value) => {
      if (value == true) {
  
        console.log('inical visivel')
        setAlter(false)
      } else {
        console.log(caixaAtual)
  
      }
      setValue('status_caixa', value)
      setDisplayResponsive(true)
  
    }
      */
  const onSubmit = (formContent) => {
    formContent.status_caixa = checkedCaixa
    if (checkedCaixa) {
      axiosApi.post("/controle_caixas", formContent)
        .then((response) => {
          setCheckedCaixa(false)
          updateCaixa(false)
          reset()
          setVisibleRight(false)
        })
        .catch(function (error) {
        });
    } else {
      //fechar
      axiosApi.patch("/controle_caixas", formContent)
        .then((response) => {
          console.log(response.data)
          setCheckedCaixa(true)
          updateCaixa(true)
          setVisibleRight(false)
          reset()
          
        })
        .catch(function (error) {
        });

    }
  }



  const rightContents = (
    <React.Fragment>
     
    </React.Fragment>
  );
  const leftContents = (
    <React.Fragment>
      <h4 className='w-header-page-title'>{clienteNome} </h4>
    </React.Fragment>
  );
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const onHide = () => {
    setDisplayResponsive(false)
  }

  const Entradas = (
    <React.Fragment>
      <Card>
        <table>
          {resumoEntradas.map((registro, key) => {
            return (
              <tr key={key}>
                <td>{'=>'}</td>
                <td>{registro.valor_recebido}</td>
              </tr>
            )
          })}
        </table>
      </Card>
    </React.Fragment>
  )
  const SaidasDespesasExtras = (
    <React.Fragment>
      <Card>
        <table>
          {resumoDespesasExtras.map((registro, key) => {
            return (
              <tr key={key}>
                <td>{'=>'}</td>
                <td>{registro.valor_pago}</td>
              </tr>
            )
          })}
        </table>
      </Card>
    </React.Fragment>
  )
  const SaidasOrdensPagamentos = (
    <React.Fragment>
      <Card>
        <table>
          {resumoOrdensPagamentos.map((registro, key) => {
            return (
              <tr key={key}>
                <td>{'=>'}</td>
                <td>{registro.valor_pago}</td>
              </tr>
            )
          })}
        </table>
      </Card>
    </React.Fragment>
  )

  if (signed == true) {
    return (
      <>
        <Sidebar className='w-sidebar-right w-sidebar-right-caixa' style={{ backgroundColor: '  ' }} header={<h3 style={{ color: 'white' }}>Fluxo de caixa</h3>} visible={visibleRight} position="right" onHide={() => setVisibleRight(false)} style={{ width: '40em' }}>


          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid" style={{ margin: '20px' }} >

            <div className="p-fluid grid" style={{ marginTop: '90px' }}>
              <div className="field w-field col-6 md:col-6" style={{ backgroundColor: '#dee2e6', borderRight: '10px solid white' }}>
                <label class="font-medium text-900">Valor Inicial do caixa:</label>
                <div className="p-inputgroup" style={{backgroundColor:'white'}}>
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-dollar"></i>
                  </span>
                  <InputText {...register("valor_inicial_caixa")} disabled={!checkedCaixa} required={checkedCaixa} />
                </div>
              </div>
           

              <div className="field w-field col-6 md:col-6" style={{ backgroundColor: '#dee2e6', borderLeft: '10px solid white' }}>
                <label class="font-medium text-900">Valor carteira virtual:</label>
                <div className="p-inputgroup" style={{backgroundColor:'white'}}>
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-dollar"></i>
                  </span>
                  <InputText {...register("valor_inicial_conta")} disabled={!checkedCaixa} required={checkedCaixa} />
                </div>
              </div>
              <div hidden={!checkedCaixa}>
                <div className="field w-field col-12 md:col-12">
                  <Button type="submit" label="Abrir caixas" className="w-form-button" icon='pi pi-lock-open' iconPos='right' />
                </div>
              </div>
            </div>
            <InputText hidden {...register("controle_caixa_id")} />
            <div hidden={checkedCaixa} style={{ marginTop: '10px', marginBottom: '10px' }}>

              <div className="flex">
                <div className="p-fluid grid">
                  <div className="field w-field col-11 md:col-11">
                    <label class="font-medium text-900">Entradas:</label>
                    <Card>
                      <table>
                        {resumoEntradas.map((registro, key) => {
                          return (
                            <tr key={key}>
                              <td>{'R$'}</td>
                              <td>{registro.valor_recebido}</td>
                              <td>{registro.forma_pagamento}</td>
                            </tr>
                          )
                        })}
                      </table>
                    </Card>
                  </div>
                  <div className="field w-field col-11 md:col-11">
                    <label class="font-medium text-900">Saídas extras::</label>
                    <Card  >
                      <table>
                        {resumoDespesasExtras.map((registro, key) => {
                          return (
                            <tr key={key}>
                              <td>{'R$'}</td>
                              <td>{registro.valor_pago}</td>

                              <td>{registro.forma_pagamento}</td>
                            </tr>
                          )
                        })}
                      </table>
                    </Card>
                  </div>
                  <div className="field w-field col-11 md:col-11">
                    <label class="font-medium text-900">Pagamentos de contas::</label>
                    <Card >
                      <table>
                        {resumoOrdensPagamentos.map((registro, key) => {
                          return (
                            <tr key={key}>
                              <td>{'R$'}</td>
                              <td>{registro.valor_a_pagar}</td>
                              <td>{registro.forma_pagamento}</td>
                            </tr>
                          )
                        })}
                      </table>
                    </Card>
                  </div>

                </div>
                <Divider layout="vertical" />
                <div className="p-fluid grid" >
                  <div className="field w-field col-12 md:col-12">
                    <label class="font-medium text-900">Entradas:</label>
                    <Card>
                      <table>
                        {resumoEntradasConta.map((registro, key) => {
                          return (
                            <tr key={key}>
                              <td>{'R$'}</td>
                              <td>{registro.valor_recebido}</td>
                              <td>{registro.forma_pagamento}</td>
                            </tr>
                          )
                        })}
                      </table>
                    </Card>
                  </div>
                  <div className="field w-field col-12 md:col-12">
                    <label class="font-medium text-900">Saídas extras:</label>
                    <Card  >
                      <table>
                        {resumoDespesasExtrasConta.map((registro, key) => {
                          return (
                            <tr key={key}>
                              <td>{'R$'}</td>
                              <td>{registro.valor_pago}</td>
                              <td>{registro.forma_pagamento}</td>
                            </tr>
                          )
                        })}
                      </table>
                    </Card>
                  </div>
                  <div className="field w-field col-12 md:col-12">
                    <label class="font-medium text-900">Pagamentos de contas:</label>
                    <Card >
                      <table>
                        {resumoOrdensPagamentosConta.map((registro, key) => {
                          return (
                            <tr key={key}>
                              <td>{'R$'}</td>
                              <td>{registro.valor_a_pagar}</td>
                              <td>{registro.forma_pagamento}</td>
                            </tr>
                          )
                        })}
                      </table>
                    </Card>
                  </div>


                </div>

              </div>

              <div className="p-fluid grid" style={{marginTop:'10px'}}>
                <div className="field w-field col-6 md:col-6" style={{ backgroundColor: '#dee2e6', borderRight: '10px solid white' }}>
                  <label class="font-medium text-900">Valor final caixa:</label>
                  <div className="p-inputgroup" style={{backgroundColor:'white'}}>
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-dollar"></i>
                    </span>
                    <InputText  {...register("valor_final_caixa")} disabled={checkedCaixa} required={!checkedCaixa} />
                  </div>
                </div>

                <div className="field w-field col-6 md:col-6" style={{ backgroundColor: '#dee2e6', borderLeft: '10px solid white' }}>
                  <label class="font-medium text-900">Valor final conta:</label>
                  <div className="p-inputgroup" style={{backgroundColor:'white'}}>
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-dollar"></i>
                    </span>
                    <InputText {...register("valor_final_conta")} disabled={checkedCaixa} required={!checkedCaixa} />
                  </div>
                </div>

              </div>
              <div className="p-fluid grid">
                <div className="field w-field col-12 md:col-12">
                  <Button type="submit" label="Fechar caixas" className="w-form-button" icon='pi pi-lock' iconPos='right' />
                </div>
              </div>

            </div>

          </form>
        </Sidebar >

        <Toolbar className='w-header-page' left={leftContents} right={rightContents} />

        <nav className="sidebar locked" style={{ zIndex: '300', backgroundColor: '#161a2d', color: '#fff' }} onMouseEnter={(e) => { showSidebar() }} onMouseLeave={(e) => hideSidebar()}>
          <div className="logo_items_nav flex_nav">
            <span className="nav_image_nav">
              <LogoSideBar height={'40px'} />
            </span>
            <span className="logo_name_nav">Proativa Gestão</span>
            <i className="bx bx-lock-alt" id="lock-icon" title_nav="Unlock Sidebar" onClick={(e) => { toggleLock() }}></i>
            <i className="bx bx-x" id="sidebar-close_nav"></i>
          </div>

          <div className="menu_container_nav">
            <div className="menu_item_navs">
              <Link to="/dashboard" className="item">
                <a href="#" className="link_nav flex_nav  w-item-chart">
                  <i className="pi pi-chart-pie"></i>
                  <span>Dashboard </span>
                </a>
              </Link>
              <ul className="menu_item_nav">
                <div className="menu_title_nav flex_nav">
                  <span className="title_nav">Menu_Pricipal</span>
                  <span className="line_nav"></span>
                </div>
                <Link to="/servicos" className="item">
                  <a href="#" className="link_nav flex_nav">
                    <i className="pi pi-wrench"></i>
                    <span>Serviços</span> 
                  </a>
                </Link>
                <Link to="/financeiro" className="item">
                  <a href="#" className="link_nav flex_nav">
                    <i className="pi pi-dollar"></i>
                    <span>Financeiro</span>
                  </a>
                </Link>
                <Link to="/servicos/menu" className="item">
                  <a href="#" className="link_nav flex_nav">
                    <i className="pi pi-android"></i>
                    <span>Hardware</span>  
                  </a>
                </Link>
                <Link to="/servicos/menu" className="item">
                  <a href="#" className="link_nav flex_nav">
                    <i className="pi pi-dollar"></i>
                    <span>Fincanceiro</span>  
                  </a>
                </Link>
              </ul>

              <ul className="menu_item_nav">
                <div className="menu_title_nav flex_nav">
                  <span className="title_nav">CADASTROS</span>
                  <span className="line_nav"></span>
                </div>
                <Link to="/clientes" className="item">
                  <a href="#" className="link_nav flex_nav">
                    <i className="pi pi-building"></i>
                    <span>Clientes</span>
                  </a>
                </Link>
                <Link to="/veiculos" className="item">
                  <a href="#" className="link_nav flex_nav">
                    <i className="pi pi-truck"></i>
                    <span>Veículos</span>
                  </a>
                </Link>
                <Link to="/usuarios" className="item">
                  <a href="#" className="link_nav flex_nav">
                    <i className="pi pi-users"></i>
                    <span>Usuários</span>
                  </a>
                </Link>
                <Link to="/frota_interna" className="item">
                  <a href="#" className="link_nav flex_nav">
                    <i className="pi pi-car"></i>
                    <span>Frota interna</span>
                  </a>
                </Link>
              </ul>



            </div>

            <div className="sidebar_profile flex_nav">
              {/*
            <span className="nav_image_nav">
              <img src="images/profile.jpg" alt="logo_img" />
            </span>
            <div className="data_text">
              <span className="name">David Oliva</span>
              <span className="email">david@gmail.com</span>
            </div>
            */}
              <ul className="menu_item_nav">
                <Link onClick={signOut}>
                  <a href="#" className="link_nav flex_nav">
                    <i className="pi pi-power-off"></i>
                    <span>Sair</span>
                  </a>
                </Link>
              </ul>
            </div>
          </div>
        </nav>

      </>
    );
  }
}

export default SideBar