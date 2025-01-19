//IMPORTANTO HOOKS E DEMAIS RECURSOS DO REACT
import React, { useState, useEffect, useRef } from 'react';

//IMPORTANTO COMPONENTES DE BIBLIOTECAS DE INTERFACES
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Sidebar } from 'primereact/sidebar';
import { ToggleButton } from 'primereact/togglebutton';
import { Calendar } from 'primereact/calendar';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { OverlayPanel } from 'primereact/overlaypanel';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { mask } from 'primereact/utils';
import Select from 'react-select'
import { InputNumber } from 'primereact/inputnumber';
import { Divider } from 'primereact/divider';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';

import { Dropdown } from 'primereact/dropdown';
import 'primeicons/primeicons.css';

//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { useForm, Controller } from 'react-hook-form';
import { axiosApi } from '../../../services/axios';
import { Link } from 'react-router-dom';

//IMPORTANDO COMPONENTES PERSONALIZADOS
import FormHistorico from './form-historico';
import ListaTickets from './list-tickets';

function VisualizarTicket(props) {

  //STATES PARA FUNCIONAMENTO GERAL DA PAGINA
  const nomePagina = 'Visualização do ticket: '+props.registro.id



  //FUNÇÃO PARA BUSCAR REGISTROS DO BANCO DE DADOS-------------------------------------------------------------------|

  //state
  const [registros, setRegistros] = useState([]);
  //requisição 
  const buscarRegistros = () => {
    axiosApi.get("/ticket_show/"+props.registro.id)
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });
  }
  
  //requisisção 
  useEffect(() => {
    buscarRegistros()
  }, [])
  //-------------------------------------------------------------------------------------------------------------|


  return (
    <>
   
    </>

  );

}

export default VisualizarTicket