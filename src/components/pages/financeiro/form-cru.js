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


function FormCru(props) {

  //STATES PARA FUNCIONAMENTO GERAL DA PAGINA
  const [loading, setLoading] = useState(false);
  const nomePagina = 'Cadastros de Servços'


  const toast = useRef(null);

  //FUNÇÃO PARA BUSCAR REGISTROS DO BANCO DE DADOS-------------------------------------------------------------------|

  //state
  const [registrosTipos, setRegistrosTipos] = useState([]);
  const [registro, setRegistro] = useState(props.registro);
  //console.log(props.registro)

  //requisição 
  const buscarRegistros = () => {
    setLoading(true);
    axiosApi.get("/list_equipment_input")
      .then((response) => {
        setRegistrosTipos(response.data)
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

    //array de opções dos inputs selects
    const motivos = [
      { label: 'PERCA/EXTRAVIO CLIENTE', value: 'PERCA/EXTRAVIO CLIENTE' },
      { label: 'PERCA/EXTRAVIO INTERNO', value: 'PERCA/EXTRAVIO INTERNO' },
      { label: 'DANO IRREPARAVEL CLIENTE', value: 'DANO IRREPARAVEL CLIENTE' },
      { label: 'DANO IRREPARAVEL INTERNO', value: 'DANO IRREPARAVEL INTERNO' }
    ];
    
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _registro = { ...registro };
    _registro[`${name}`] = val;

    setRegistro(_registro);
  }
  const onInputNumberChange = (e, name) => {
    console.log(e)
    const val = e.value || 0;
    let _registro = { ...registro };
    _registro[`${name}`] = val;
    console.log(_registro)
    setRegistro(_registro);
  }
  const onInputSimpleSelectChange = (e, name) => {
    console.log(e)
    const val = e['value'] || 0;
    let _registro = { ...registro };
    _registro[`${name}`] = val;
    console.log(_registro)
    setRegistro(_registro);
  }

  const onInputMultiSelectChange = (e, name) => {

    const val = e.map(c => c.value)
    let _registro = { ...registro };
    _registro[`${name}`] = val;
    console.log(_registro)
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
    if (registro.cliente_id) {
      if (registro.id) {

        axiosApi.patch("/update_service", registro)
          .then((response) => {
            console.log('editado')
            props.filhoParaPaiPatch(response.data)
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Veículo alterado!', life: 3000 });
          })
          .catch(function (error) {
            toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
          });
      }
      else {
        axiosApi.post("/create_service", registro)
          .then((response) => {
            console.log(response.data)
            props.filhoParaPaiPost(response.data)

          })
          .catch(function (error) {
            console.log(error)
          });

      }

    }
  };


  return (
    <>
      <div className="card w-card" >
        <div className="p-fluid w-form" >
          <div class="grid nested-grid">
            <div class="col-12 md:col-6 lg:col-6">
              <div className="p-fluid grid">
                <div className="field w-field col-12 md:col-12">
                  <label class="font-medium text-900">Identificador (ID):</label>
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-tags"></i>
                    </span>
                    <InputText value={registro.identificador} onChange={(e) => onInputChange(e, 'identificador')} required />
                  </div>
                </div>
                <div className="field w-field col-12 md:col-12">
                  <label class="font-medium text-900">Número de série (SN):</label>
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-mobile"></i>
                    </span>
                    <InputText value={registro.numero_serie} onChange={(e) => onInputChange(e, 'numero_serie')} required />
                  </div>
                </div>
                <div className="field w-field col-12 md:col-12">
                  <label class="font-medium text-900">Tipo:</label>
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-align-left"></i>
                    </span>
                    <Select
                      defaultValue={{ value: registro.tipo, label: registro.tipo }}
                      options={registrosTipos.map(sup => ({ value: sup.item, label: sup.item }))}
                      onChange={(e) => { onInputNumberChange(e, 'tipo') }}
                      placeholder=''
                    />
                  </div>
                </div>
                <div className="field w-field col-12 md:col-12">
                  <Button label="Salvar cadastro" className="w-form-button" icon="pi pi-save" iconPos='right' onClick={saveRegistro} />
                </div>
              </div>
            </div>
            <div class="col-12 md:col-6 lg:col-6">
            </div>
          </div>
        </div>
      </div>
    </>

  );

}

export default FormCru