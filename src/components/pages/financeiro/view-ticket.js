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
import { Link, useParams } from 'react-router-dom';
//IMPORTANDO COMPONENTES PERSONALIZADOS
import FormHistorico from './form-historico';
import ListaTickets from './list-tickets';
import { Card } from '@mui/material';

function VisualizarTicket() {
  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();
  //STATES PARA FUNCIONAMENTO GERAL DA PAGINA
  const nomePagina = 'Visualização do ticket: ' + id



  //FUNÇÃO PARA BUSCAR REGISTROS DO BANCO DE DADOS-------------------------------------------------------------------|

  //state
  const [registros, setRegistros] = useState([]);
  //requisição 
  const buscarRegistros = () => {
    axiosApi.get("/ticket_show/" + id)
      .then((response) => {
        setRegistros(response.data)
        console.log(response.data)
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
      <div className="card">

        <div className="surface-0" >
          <div className='flex'>
            <div className="field w-field col-6 md:col-6 flex justify-content-start">
              <div className="text-2xl text-900 mb-3">{'Ticket nº: ' + id}</div>
            </div>
            <div className="field w-field col-6 md:col-6 flex justify-content-end">
              <div class="text-right card-dataview-buttons" >
                <Button label={registros.status_descricao} className={` btn-border-none card-dataview-footer-opcoes-btn status-${registros.status_descricao}`}  >
                </Button>
              </div>
            </div>
          </div>
          <div className="text-500 mb-5">Detalhes do Ticket</div>
          <ul className="list-none">
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="field w-field col-6 md:col-6 flex">
                <div className="text-500">Serviço:</div>
                <div className="text-900">{registros.servico}</div>
                <div className="">
                  <Link to={"/o"} className="item" target="_blank">
                    <Button icon="pi pi-window-maximize" className="p-button-info" tooltip="Ver ticket" tooltipOptions={{ position: 'bottom' }} />
                  </Link>
                </div>
              </div>
              <div className="field w-field col-6 md:col-6 flex">
                <div className="text-500">Ordem serviço:</div>
                <div className="text-900">{registros.servico}</div>
                <div className="">
                  <Link to={"/o"} className="item" target="_blank">
                    <Button icon="pi pi-window-maximize" className="p-button-info" tooltip="Ver ticket" tooltipOptions={{ position: 'bottom' }} />
                  </Link>
                </div>
              </div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 ">Cliente:</div>
              <div className="text-900 ">{registros.nome}</div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 ">Descrição do ticket:</div>
              <div className="text-900 md:w-8 ">{registros.descricao}</div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 ">Tipo:</div>
              <div className="text-900 ">{registros.tipo}</div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 ">Setor:</div>
              <div className="text-900 ">{registros.setor}</div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">

              <div className="text-500 ">Valor:</div>
              <div className="text-900 ">{registros.valor}</div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="field w-field col-6 md:col-6 flex">
                <div className="text-500 ">Unidade:</div>
                <div className="text-900 ">{registros.unidade}</div>
              </div>
              <div className="field w-field col-6 md:col-6 flex">
                <div className="text-500">Quantidade:</div>
                <div className="text-900">{registros.quantidade}</div>
              </div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="field w-field col-12 md:col-4 flex">
                <div className="text-500 ">Registro:</div>
                <div className="text-900 ">{registros.data_registro}</div>
              </div>
              <div className="field w-field col-12 md:col-4 flex">
                <div className="text-500">Última aprovação:</div>
                <div className="text-900">{registros.data_liberacao}</div>
              </div>
              <div className="field w-field col-12 md:col-4 flex">
                <div className="text-500">Faturamento:</div>
                <div className="text-900">{registros.data_faturamento}</div>
              </div>
            </li>


          </ul>
        </div>
      </div>
    </>

  );

}

export default VisualizarTicket