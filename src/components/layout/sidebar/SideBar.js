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
import { Sidebar } from 'primereact/sidebar';

import { Menu } from 'primereact/menu';
//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { useForm, Controller } from 'react-hook-form';
import { axiosApi } from '../../../services/axios';

import './styles.css';
import { Divider, Icon } from '@mui/material';

function SideBar() {
  const { periodo } = useContext(AuthContext)
  const { updatePerido } = useContext(AuthContext)
  const { updateCaixa } = useContext(AuthContext)
  const { signed } = useContext(AuthContext)
  const { signOut } = useContext(AuthContext)
  const { user } = useContext(AuthContext)
  const menu = useRef(null);
  const toast = useRef(null);



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


  const itens = [
    {
      label: 'Sair',
      icon: 'pi pi-power-off',
      command: () => { signOut()},
    }
  ];
  useEffect(() => {
    //setCheckedCaixa(caixa)

  });

  const rightContents = (
    <React.Fragment>
      <React.Fragment>
               <Menu model={itens} popup ref={menu} id="popup_menu" />
               <Button label={user} icon="pi pi-angle-down" iconPos='right' className="p-button-text p-button-plain" onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup style={{marginRight:'10px'}} />
   </React.Fragment>
    </React.Fragment>
  );
  const leftContents = (
    <React.Fragment>
      <h4 className='w-header-page-title'>{'SS Telemática e Serviços Ltda'} </h4>
    </React.Fragment>
  );

  if (signed == true) {
    return (
      <>
       
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
                <Link to="/servicos" className="item">
                  <a href="#" className="link_nav flex_nav">
                    <i className="pi pi-android"></i>
                    <span>Hardware</span>  
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
            
              <ul className="menu_item_nav">
                <Link onClick={signOut}>
                  <a href="#" className="link_nav flex_nav">
                    <i className="pi pi-power-off"></i>
                    <span>Sair</span>
                  </a>
                </Link>
              </ul>
              */}
            </div>
          </div>
        </nav>

      </>
    );
  }
}

export default SideBar