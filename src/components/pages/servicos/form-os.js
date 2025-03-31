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


function ServicosOS(props) {

  //STATES PARA FUNCIONAMENTO GERAL DA PAGINA
  const [loading, setLoading] = useState(false);
  const nomePagina = 'Cadastros de Servços'
  const toastBR = useRef(null);

  //FUNÇÃO PARA BUSCAR REGISTROS DO BANCO DE DADOS-------------------------------------------------------------------|

  //state
  const [registrosVeiculos, setRegistrosVeiculos] = useState([]);
  const [registro, setRegistro] = useState([]);

  //requisição 
  const buscarRegistros = () => {
    setLoading(true);
    axiosApi.get("/list_vehicle_input/" + props.registro)
      .then((response) => {
        setRegistrosVeiculos(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
    setLoading(false)
  }

  //requisisção 
  useEffect(() => {
    buscarRegistros()
    let _registro = { ...registro }
    _registro.servico_id = props.registro
    setRegistro(_registro)
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
  const onInputMultiSelectChange = (e, name) => {
    const val = e.map(c => c.value)
    let _registro = { ...registro };
    _registro[`${name}`] = val;
    setRegistro(_registro);
  }
  //array de opções dos inputs selects
  const tipos = [
    { label: 'INSTALAÇÃO', value: 'INSTALACAO' },
    { label: 'INSTALAÇÃO SETUP', value: 'INSTALACAO SETUP' },
    { label: 'MANUTENÇÃO', value: 'MANUTENCAO' },
    { label: 'REMOÇÃO', value: 'REMOCAO' }
  ];
  const produtos = [
    { label: 'TELEMETRIA ÁUDIO', value: 'TELEMETRIA AUDIO' },
    { label: 'TELEMETRIA ÁUDIO ROTOGRAMA', value: 'TELEMETRIA AUDIO ROTOGRAMA' },
    { label: 'TELEMETRIA BIPADA', value: 'TELEMETRIA BIPADA' },
    { label: 'RASTREAMENTO BÁSICO', value: 'RASTREAMENTO BASICO' },
    { label: 'RASTREAMENTO COM IDENTIFICAÇÃO', value: 'RASTREAMENTO COM IDENTIFICACAO' },
    { label: 'MONITORAMENTO FADIGA', value: 'MONITORAMENTO FADIGA' },
    { label: 'MONITORAMENTO CAMERAS OFFLINE', value: 'MONITORAMENTO CAMERAS OFFLINE' },
    { label: 'RASTREAMENTO COM IDENTIFICAÇÃO', value: 'RASTREAMENTO COM IDENTIFICACAO' },
    { label: 'INTEGRACAO MAESTRIA', value: 'INTEGRACAO MAESTRIA' },

  ];
  //envio do formulario CRUD
  const saveRegistro = () => {
    let _validacao = []
    if (registro.tipo == null) { _validacao.push({ severity: 'info', summary: 'Pendente', detail: 'informe o tipo de atividade', life: 3000 }) }
    if (registro.produto == null) { _validacao.push({ severity: 'info', summary: 'Pendente', detail: 'informe o produto fornecido', life: 3000 }) }
    if (registro.veiculo_id2 == null || registro.veiculo_id2.length == 0) { _validacao.push({ severity: 'info', summary: 'Pendente', detail: 'informe pelo ao menos um veículo', life: 3000 }) }
    if (_validacao.length == 0) {
      axiosApi.post("/create_order_service", registro)
        .then((response) => {
          props.filhoParaPaiPostOS(response.data)
          toastBR.current.show({ severity: 'success', summary: 'Successo', detail: 'OS criada', life: 3000 });
        })
        .catch(function (error) {
          toastBR.current.show({ severity: 'error', summary: 'Erro', detail: 'Tente novamente!', life: 3000 });
        });


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
              <label class="font-medium text-900">Tipo de OS:</label>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-wrench"></i>
                </span>
                <Dropdown value={registro.tipo} options={tipos} onChange={(e) => onInputChange(e, 'tipo')} />
              </div>
            </div>
            <div className="field w-field col-12 md:col-12">
              <label class="font-medium text-900">Produto:</label>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-shopping-bag"></i>
                </span>
                <Dropdown value={registro.produto} options={produtos} onChange={(e) => onInputChange(e, 'produto')} />
              </div>
            </div>
            <div className="field w-field col-12 md:col-12">
              <label class="font-medium text-900">Veículos:</label>
              <div className="p-inputgroup w-inputgroup-select">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-truck"></i>
                </span>
                <Select
                  options={registrosVeiculos.map(sup => ({ value: sup.id, label: sup.placa + " - " + sup.frota }))}
                  onChange={(e) => { onInputMultiSelectChange(e, 'veiculo_id2') }}
                  placeholder=''
                  isMulti
                />
              </div>
            </div>
            <div className="field w-field col-12 md:col-12">
              <label class="font-medium text-900">Observações/orientações referente ao OS:</label>
              <div className="p-inputgroup w-inputgroup-select">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-align-right"></i>
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

export default ServicosOS