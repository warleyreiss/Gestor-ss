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


function ServicosCru(props) {

  //STATES PARA FUNCIONAMENTO GERAL DA PAGINA
  const [loading, setLoading] = useState(false);
  const nomePagina = 'Cadastros de Servços'

  const toastBR = useRef(null);

  //FUNÇÃO PARA BUSCAR REGISTROS DO BANCO DE DADOS-------------------------------------------------------------------|

  //state
  const [registrosClientes, setRegistrosClientes] = useState([]);
  const [registrosTecnicos, setRegistrosTecnicos] = useState([]);

  const [registro, setRegistro] = useState(props.registro);

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
        //aqui preciso criar um array que preencha a lista de tecnicos
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
  const onInputSimpleSelectChange = (e, name) => {
    const val = e['value'] || 0;
    let _registro = { ...registro };
    _registro[`${name}`] = val;
    setRegistro(_registro);
  }

  const onInputMultiSelectChange = (e, name) => {

    const val = e.map(c => c.value)
    let _registro = { ...registro };
    _registro[`${name}`] = val;
    setRegistro(_registro);
  }
  //array de opções dos inputs selects
  const turnos = [
    { label: 'DIURNO - DIA UTIL', value: 'DIURNO - DIA UTIL' },
    { label: 'NOTURNO - DIA UTIL', value: 'NOTURNO - DIA UTIL' },
    { label: 'DIURNO - FIM DE SEMANA', value: 'DIURNO - FIM DE SEMANA' },
    { label: 'NOTURNO - FIM DE SEMANA', value: 'NOTURNO - FIM DE SEMANA' }
  ];

  //envio do formulario CRUD
  const saveRegistro = () => {
    let _validacao = []
    if (registro.chamado == null ||registro.chamado == '') { _validacao.push({ severity: 'info', summary: 'Pendente', detail: 'informe número do chamado', life: 3000 }) }
    if (registro.cliente_id == null || registro.cliente_id == '') { _validacao.push({ severity: 'info', summary: 'Pendente', detail: 'informe o nome do cliente', life: 3000 }) }
    if (registro.inicio == null || registro.inicio =='') { _validacao.push({ severity: 'info', summary: 'Pendente', detail: 'informe a data prevista para início', life: 3000 }) }
    if (registro.termino == null ||registro.termino == '') { _validacao.push({ severity: 'info', summary: 'Pendente', detail: 'informe a data prevista para término', life: 3000 }) }
    if (registro.turno == null ||registro.turno == '') { _validacao.push({ severity: 'info', summary: 'Pendente', detail: 'informe o turno de trablho', life: 3000 }) }
    
    if (registro.km == null ||registro.km == '') { _validacao.push({ severity: 'info', summary: 'Pendente', detail: 'informe a previsão de km à ser percorrido', life: 3000 }) }
    if (registro.usuario_id == null || registro.usuario_id==[] || registro.usuario_id[0]==null) { _validacao.push({ severity: 'info', summary: 'Pendente', detail: 'informe pelo ao menos 1 técnico no serviço', life: 3000 }) }
    if (_validacao.length == 0) {
      if (registro.id) {

        axiosApi.patch("/update_service", registro)
          .then((response) => {
            
            props.filhoParaPaiPatch(response.data)
            toastBR.current.show({ severity: 'success', summary: 'Successo', detail: 'Serviço editado', life: 3000 });
          })
          .catch(function (error) {
            toastBR.current.show({ severity: 'error', summary: 'Erro', detail: 'Tente novamente!', life: 3000 });
          });
      }
      else {
        axiosApi.post("/create_service", registro)
    
          .then((response) => {
            props.filhoParaPaiPost(response.data)
            toastBR.current.show({ severity: 'success', summary: 'Successo', detail: 'Serviço criado', life: 3000 });
          })
          .catch(function (error) {
            toastBR.current.show({ severity: 'error', summary: 'Erro', detail: 'Tente novamente!', life: 3000 });
          });

      }
    } else {
      toastBR.current.show(_validacao);
    }




  }



  return (
    <>
      <Toast ref={toastBR} position="bottom-right" />
      <div className="card w-card" >
        <div className="p-fluid w-form" >
          <div className="p-fluid grid">
            <InputText value={registro.id} onChange={(e) => onInputChange(e, 'id')} hidden />
            <div className="field w-field col-12 md:col-12">
              <label class="font-medium text-900">Chamado nº:</label>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-tag"></i>
                </span>
                <InputText value={registro.chamado} onChange={(e) => onInputChange(e, 'chamado')} />
              </div>
            </div>
            <div className="field w-field col-12 md:col-9">
              <label class="font-medium text-900">Cliente:</label>
              <div className="p-inputgroup w-inputgroup-select">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-building"></i>
                </span>
                <Select
                  defaultValue={{ value: registro.cliente_id, label: registro.nome }}
                  options={registrosClientes.map(sup => ({ value: sup.id, label: sup.nome }))}
                  onChange={(e) => { onInputSimpleSelectChange(e, 'cliente_id') }}
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
                <InputNumber value={registro.km} onChange={(e) => onInputNumberChange(e, 'km')}  useGrouping={false} />
              </div>
            </div>
            <div className="field w-field col-12 md:col-4">
              <label class="font-medium text-900">Início previsto:</label>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-calendar-plus"></i>
                </span>
                <Calendar value={registro.inicio} onChange={(e) => onInputChange(e, 'inicio')} />
              </div>
            </div>
            <div className="field w-field col-12 md:col-4">
              <label class="font-medium text-900">Término previsto:</label>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-calendar-times"></i>
                </span>
                <Calendar value={registro.termino} onChange={(e) => onInputChange(e, 'termino')} />
              </div>
            </div>
            <div className="field w-field col-12 md:col-4">
              <label class="font-medium text-900">Turno de operação:</label>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-sun"></i>
                </span>
                <Dropdown value={registro.turno} options={turnos} onChange={(e) => onInputChange(e, 'turno')} />
              </div>
            </div>
            <div className="field w-field col-12 md:col-12">
              <label class="font-medium text-900">Técnicos relacionados:</label>
              <div className="p-inputgroup w-inputgroup-select">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-users"></i>
                </span>
                <Select

                  //  defaultValue={registro.usuario_id.map(sup => ({ value: sup }))} registros.filter(val => val.id !== data.id);
                  options={registrosTecnicos.map(sup => ({ value: sup.id, label: sup.nome }))}
                  onChange={(e) => { onInputMultiSelectChange(e, 'usuario_id') }}
                  placeholder=''
                  isMulti
                />
              </div>
            </div>
            <div className="field w-field col-12 md:col-12">
              <label class="font-medium text-900">Observações/orientações referente ao serviço:</label>
              <div className="p-inputgroup w-inputgroup-select">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-building"></i>
                </span>
                <InputTextarea value={registro.observacao} onChange={(e) => onInputChange(e, 'observacao')} rows={2} cols={30} />
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