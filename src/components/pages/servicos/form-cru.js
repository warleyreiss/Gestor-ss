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
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import 'primeicons/primeicons.css';

//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { useForm, Controller } from 'react-hook-form';
import { axiosApi } from '../../../services/axios';
import { Link } from 'react-router-dom';


function ServicosCru(props,{filhoParaPaiPost,filhoParaPaiPatch}) {

  //STATES PARA FUNCIONAMENTO GERAL DA PAGINA
  const [loading, setLoading] = useState(false);
  const nomePagina = 'Cadastros de Servços'

  
  const toast = useRef(null);

  //FUNÇÃO PARA BUSCAR REGISTROS DO BANCO DE DADOS-------------------------------------------------------------------|

  //state
  const [registrosClientes, setRegistrosClientes] = useState([]);
  const [registrosTecnicos, setRegistrosTecnicos] = useState([]);
  
  const [registro, setRegistro] = useState(props.registro);
console.log(props.registro)

  //requisição 
  const buscarRegistros = () => {
    setLoading(true);
      axiosApi.get("/list_client_input")
      .then((response) => {
        setRegistrosClientes(response.data)
      })
      .catch(function (error) {
      });
      axiosApi.get("/list_user_input")
      .then((response) => {
        setRegistrosTecnicos(response.data)
        console.log(response.data)
      })
      .catch(function (error) {
      });
    setLoading(false)
  }

  //requisisção 
  useEffect(() => {
    buscarRegistros()
  }, [])
  //-------------------------------------------------------------------------------------------------------------|

  //FORMULARIO CRUD ----------------------------------------------------------------------------------------------|
  //funções de preenchimento do formulario
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _registro = { ...registro };
    _registro[`${name}`] = val;

    setRegistro(_registro);
  }
  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _registro = { ...registro };
    _registro[`${name}`] = val;

    setRegistro(_registro);
  }

    //array de opções dos inputs selects
    const turnos= [
      { label: 'DIURNO - DIA UTIL', value: 'DIURNO - DIA UTIL' },
      { label: 'NOTURNO - DIA UTIL', value: 'NOTURNO - DIA UTIL' },
      { label: 'DIURNO - FIM DE SEMANA', value: 'DIURNO - FIM DE SEMANA' },
      { label: 'NOTURNO - FIM DE SEMANA', value: 'NOTURNO - FIM DE SEMANA' }
  ];

  //envio do formulario CRUD
  const saveRegistro = () => {

    if (registro.cliente_id.trim()) {
      if (registro.id) {
        axiosApi.patch("/update_service", registro)
          .then((response) => {
            console.log('editado')
            filhoParaPaiPatch(response.data)
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Veículo alterado!', life: 3000 });
          })
          .catch(function (error) {
            toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
          });
      }
      else {
        axiosApi.post("/create_service", registro)
          .then((response) => {
            filhoParaPaiPost(response.data)//enviar novo registro aqui
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Veículo cadastrado!', life: 3000 });
          })
          .catch(function (error) {
            toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
          });
      }
    
    }
  };


  return (
    <>
      <div className="card w-card" >
          <div className="p-fluid w-form" >
            <div className="p-fluid grid">
              <InputText value={registro.id} onChange={(e) => onInputChange(e, 'id')} hidden />
             
              <div className="field w-field col-12 md:col-9">
                <label class="font-medium text-900">Cliente:</label>
                <div className="p-inputgroup w-inputgroup-select">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-building"></i>
                  </span>
                  <Select
                    defaultValue={ {value: registro.cliente_id, label: registro.nome }}
                    options={registrosClientes.map(sup => ({ value: sup.id, label: sup.nome }))}
                    onChange={(e) => { onInputNumberChange(e, 'cliente_id') }}
                    placeholder=''
                  />
                </div>
              </div>
              <div className="field w-field col-12 md:col-3">
                <label class="font-medium text-900">KM previsto:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-map-marker"></i>
                  </span>
                  <InputNumber value={registro.km} onChange={(e) => onInputChange(e, 'km')}  mode="decimal" useGrouping={false} />
                </div>
              </div> 
              <div className="field w-field col-12 md:col-4">
                <label class="font-medium text-900">Início previsto:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-calendar-plus"></i>
                  </span>
                  <Calendar value={registro.inicio} onChange={(e) => onInputChange(e, 'inicio')}/>
                </div>
              </div>
              <div className="field w-field col-12 md:col-4">
                <label class="font-medium text-900">Término previsto:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-calendar-times"></i>
                  </span>
                  <Calendar value={registro.termino} onChange={(e) => onInputChange(e, 'termino')}/>
                </div>
              </div> 
              <div className="field w-field col-12 md:col-4">
                <label class="font-medium text-900">Turno de operação:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-sun"></i>
                  </span>
                  <Dropdown value={registro.turno} options={turnos} onChange={(e) => onInputChange(e, 'turno')}/>
                </div>
              </div>
              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Técnicos relacionados:</label>
                <div className="p-inputgroup w-inputgroup-select">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-users"></i>
                  </span>
                  <Select
                  //  defaultValue={registrosTecnicos.usuario_id.map(sup => ({ value: sup.id, label: sup.nome }))}
                    options={registrosTecnicos.map(sup => ({ value: sup.id, label: sup.nome }))}
                    onChange={(e) => { onInputNumberChange(e, 'usuario_id[]') }}
                    placeholder=''
                  />
                </div>
              </div>
              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Observações/orientações referente ao serviço:</label>
                <div className="p-inputgroup w-inputgroup-select">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-building"></i>
                  </span>
                  <InputTextarea value={registro.observacoes} onChange={(e) => onInputChange(e, 'observacoes')}rows={2} cols={30} />
                </div>
              </div>
              <div className="field w-field col-12 md:col-12">
                <Button label="Salvar cadastro" className="w-form-button" icon="pi pi-save" iconPos='right' onClick={saveRegistro} />
              </div>
            </div>
          </div>
        </div>
    </>

  );

}

export default ServicosCru