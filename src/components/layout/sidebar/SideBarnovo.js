import React, { useRef } from 'react';
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
import { TieredMenu } from 'primereact/tieredmenu';
//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { useForm, Controller } from 'react-hook-form';
import { axiosApi } from '../../../services/axios';

import './styles.css';
import { Icon } from '@mui/material';

function SideBar() {
  const { clienteNome } = useContext(AuthContext)
  const { periodo } = useContext(AuthContext)
  const { caixa } = useContext(AuthContext)
  const { updatePerido } = useContext(AuthContext)
  const { updateCaixa } = useContext(AuthContext)
  const { caixaValor } = useContext(AuthContext)  
  const {  refreshValorCaixa } = useContext(AuthContext)
  const { signed } = useContext(AuthContext)
  const { signOut } = useContext(AuthContext)

  const menu = useRef(null);

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

  useEffect(() => {
    const loadingStoreData = () => {
      const date = new Date();
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      setDataPeriodo([firstDay, lastDay])
      updatePerido([firstDay, lastDay])
    }
    loadingStoreData();
  }, []);



  const [checkedCaixa, setCheckedCaixa] = useState(caixa);
  const [caixaAtual, setCaixaAtual] = useState('');
  
  

  const [alter, setAlter] = useState(false);
  const [resumoDespesasExtras, setResumoDespesasExtras] = useState([]);
  const [resumoOrdensPagamentos, setResumoOrdensPagamentos] = useState([]);
  const [resumoEntradas, setResumoEntradas] = useState([]);

  useEffect(() => {
    setCheckedCaixa(caixa)
  });
  const atualizarCaixa = (value) => {
    if (value == true) {
      axiosApi.get("/controle_caixas")
        .then((response) => {
          setValue('valor_inicial', response.data.valor_final)
          setValue('id', response.data.id)
        })
        .catch(function (error) {
        });
      console.log('inical visivel')
      setAlter(false)
    } else {
      console.log(caixaAtual)
      axiosApi.post("/controle_caixas/resumos", caixaAtual)
        .then((response) => {
          setResumoOrdensPagamentos(response.data.resumoOrdensPagamentos)
          setResumoDespesasExtras(response.data.resumoDespesasExtras)
          setResumoEntradas(response.data.resumoEntradas)
        })
        .catch(function (error) {
        });
      console.log('final visivel')
      setAlter(true)
    }
    setValue('status_caixa', value)
    setDisplayResponsive(true)

  }
  const onSubmit = (formContent) => {

    if (formContent.status_caixa == true) {
      axiosApi.post("/controle_caixas", formContent)
        .then((response) => {
          setCaixaAtual(response.data)
          setCheckedCaixa(formContent.status_caixa)
          updateCaixa(formContent.status_caixa)
          setDisplayResponsive(false)
          // reset()
        })
        .catch(function (error) {
        });
    } else {
      axiosApi.patch("/controle_caixas", formContent)
        .then((response) => {
          setCheckedCaixa(formContent.status_caixa)
          updateCaixa(formContent.status_caixa)
          setDisplayResponsive(false)
          setCaixaAtual('')
          //  reset()
        })
        .catch(function (error) {
        });
    }
  }

  const itemm = [
    {
      label: 'File',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            {
              label: 'Bookmark',
              icon: 'pi pi-fw pi-bookmark'
            },
            {
              label: 'Video',
              icon: 'pi pi-fw pi-video'
            },
          ]
        },
        {
          label: 'Delete',
          icon: 'pi pi-fw pi-trash'
        },
        {
          separator: true
        },
        {
          label: 'Export',
          icon: 'pi pi-fw pi-external-link'
        }
      ]
    },
    {
      label: 'Edit',
      icon: 'pi pi-fw pi-pencil',
      items: [
        {
          label: 'Left',
          icon: 'pi pi-fw pi-align-left'
        },
        {
          label: 'Right',
          icon: 'pi pi-fw pi-align-right'
        },
        {
          label: 'Center',
          icon: 'pi pi-fw pi-align-center'
        },
        {
          label: 'Justify',
          icon: 'pi pi-fw pi-align-justify'
        },

      ]
    },
    {
      label: 'Users',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-user-plus',

        },
        {
          label: 'Delete',
          icon: 'pi pi-fw pi-user-minus',

        },
        {
          label: 'Search',
          icon: 'pi pi-fw pi-users',
          items: [
            {
              label: 'Filter',
              icon: 'pi pi-fw pi-filter',
              items: [
                {
                  label: 'Print',
                  icon: 'pi pi-fw pi-print'
                }
              ]
            },
            {
              icon: 'pi pi-fw pi-bars',
              label: 'List'
            }
          ]
        }
      ]
    },
    {
      label: 'Events',
      icon: 'pi pi-fw pi-calendar',
      items: [
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
            {
              label: 'Save',
              icon: 'pi pi-fw pi-calendar-plus'
            },
            {
              label: 'Delete',
              icon: 'pi pi-fw pi-calendar-minus'
            }
          ]
        },
        {
          label: 'Archieve',
          icon: 'pi pi-fw pi-calendar-times',
          items: [
            {
              label: 'Remove',
              icon: 'pi pi-fw pi-calendar-minus'
            }
          ]
        }
      ]
    },
    {
      separator: true
    },
    {
      label: 'Quit',
      icon: 'pi pi-fw pi-power-off'
    }
  ];


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
        <Dialog header="Controle de caixa" visible={displayResponsive} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }} onHide={() => onHide()} >
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid" >
            <InputText hidden {...register("status_caixa")} />
            <InputText hidden {...register("id")} />
            <div hidden={alter}>
              <div className="p-fluid grid">
                <div className="field w-field col-12 md:col-12">
                  <label class="font-medium text-900">Valor Inicial:</label>
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-dollar"></i>
                    </span>
                    <InputText required={!alter} {...register("valor_inicial")} />
                  </div>
                </div>
                <div className="field w-field col-12 md:col-12">
                  <Button type="submit" label="Submit" className="w-form-button" icon='pi pi-lock-open' iconPos='right' />
                </div>
              </div>
            </div>
            <div hidden={!alter}>
              <div className="p-fluid grid">
                <div className="field w-field col-12 md:col-12">
                  <label class="font-medium text-900">Valor das entradas em dinheiro:</label>
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
                </div>
                <div className="field w-field col-12 md:col-12">
                  <label class="font-medium text-900">Valor das saídas extras em dinheiro:</label>
                  <Card  >
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
                </div>
                <div className="field w-field col-12 md:col-12">
                  <label class="font-medium text-900">Valor dos pagamentos de contas feitas em dinheiro:</label>
                  <Card >
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
                </div>
                <div className="field w-field col-12 md:col-12">
                  <label class="font-medium text-900">Valor final:</label>
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-dollar"></i>
                    </span>
                    <InputText placeholder='Nome fornecedor' required={alter} {...register("valor_final")} />
                  </div>
                </div>
                <div className="field w-field col-12 md:col-12">
                  <Button type="submit" label="Submit" className="w-form-button" icon='pi pi-lock' iconPos='right' />
                </div>
              </div>
            </div>

          </form>
        </Dialog>

        <div className='w-header-page flex justify-content-end flex-wrap'>
          <div className='flex align-items-center justify-content-center'>
            <h4 className='w-header-page-title'>{clienteNome} </h4>
          </div>
          <div className='flex align-items-center justify-content-center'>
            <div className="p-inputgroup">
              <Calendar id="range" value={dataPeriodo} onChange={(e) => atualizarPeriodo(e.value)} selectionMode="range" readOnlyInput showIcon />
            </div>
            <div className="p-inputgroup w-inputgroup-caixa">
              <ToggleButton checked={checkedCaixa} onChange={(e) => atualizarCaixa(e.value)} onLabel={"R$ "} offLabel="Caixa fechado " style={{ width: '10em' }} aria-label="Confirmation" iconPos="right" />

            </div>
            <div className="p-inputgroup" style={{ width: '40px', marginRight: '10px' }}>
              <Link to="/configuracao" className="item">
                <Button icon="pi pi-cog" />
              </Link>
            </div>
            <div className="grid">
              <div className="col-12">
                <div className="p-inputgroup">
                  <InputText value={"R$ " + caixaValor} disabled />
                  <Button className='p-inputgroup-addon' icon="pi pi-refresh" onClick={(e)=>{refreshValorCaixa(caixaAtual)}}/>
                  <TieredMenu model={itemm} popup ref={menu} id="overlay_tmenu" />
                  <Button className='p-inputgroup-addon' icon="pi pi-angle-down" onClick={(event) => menu.current.toggle(event)} aria-haspopup aria-controls="overlay_tmenu" />

                </div>
              </div>
            </div>
          </div>
        </div>

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
                    <span className="title_nav">VENDAS</span>
                    <span className="line_nav"></span>
                  </div>
                  <Link to="/vendas_balcao" className="item">
                    <a href="#" className="link_nav flex_nav">
                      <i className="pi pi-shopping-cart"></i>
                      <span>Balção</span>
                    </a>
                  </Link>
                  <Link to="/vendas_sob_demanda" className="item">
                    <a href="#" className="link_nav flex_nav">
                      <i className="pi pi-cart-plus"></i>
                      <span>Sob demanda</span>
                    </a>
                  </Link>
                  <Link to="/vendas/menu" className="item">
                    <a href="#" className="link_nav flex_nav">
                      <i className="pi pi-th-large"></i>
                      <span>Mais opçoes</span>
                    </a>
                  </Link>
                </ul>

                <ul className="menu_item_nav">
                  <div className="menu_title_nav flex_nav">
                    <span className="title_nav">ENTRADAS/SAÍDAS</span>
                    <span className="line_nav"></span>
                  </div>
                  <Link to="/ordens_pagamento" className="item">
                    <a href="#" className="link_nav flex_nav">
                      <i className="pi pi-stopwatch"></i>
                      <span>Programadas</span>
                    </a>
                  </Link>
                  <Link to="/despesas" className="item">
                    <a href="#" className="link_nav flex_nav">
                      <i className="pi pi-upload"></i>
                      <span>Despesas</span>
                    </a>
                  </Link>
                  <Link to="/entradas" className="item">
                    <a href="#" className="link_nav flex_nav">
                      <i className="pi pi-download"></i>
                      <span>Entradas</span>
                    </a>
                  </Link>
                  <Link to="/despesas/menu" className="item">
                    <a href="#" className="link_nav flex_nav">
                      <i className="pi pi-th-large"></i>
                      <span>Mais opçoes</span>
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
                      <i className="pi pi-users"></i>
                      <span>Clientes</span>
                    </a>
                  </Link>
                  <Link to="/produtos" className="item">
                    <a href="#" className="link_nav flex_nav">
                      <i className="pi pi-box"></i>
                      <span>Produtos</span>
                    </a>
                  </Link>
                  <Link to="/servicos" className="item">
                    <a href="#" className="link_nav flex_nav">
                      <i className="pi pi-wrench"></i>
                      <span>Servicos</span>
                    </a>
                  </Link>
                  <Link to="/fornecedores" className="item">
                    <a href="#" className="link_nav flex_nav">
                      <i className="pi pi-building"></i>
                      <span>Fornecedores</span>
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