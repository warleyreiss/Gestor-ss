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
import { useNavigate } from 'react-router-dom';

function FormHistorico(props) {
  //STATES PARA FUNCIONAMENTO GERAL DA PAGINA
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate()
  //state
  const [registro, setRegistro] = useState([]);

  //FORMULARIO CRUD ----------------------------------------------------------------------------------------------|
  //funções de preenchimento do formulario
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _registro = { ...registro };
    _registro[`${name}`] = val;
    setRegistro(_registro);
  }
  //envio do formulario CRUD
  const saveRegistro = () => {
    navigate(props.url + "/" + registro.inicio.toISOString().split('T')[0] + "/" + registro.termino.toISOString().split('T')[0])
  };


  return (
    <>
      <div className="p-fluid grid mini-form-grid" style={{margin:'5px'}} >

        <div className="col-12 md:col-12"  style={{ padding: '2px 5px' }}>
         
          <div className="p-inputgroup" style={{padding:'2px'}}>
            <span className="p-inputgroup-addon">
              <i className="pi pi-calendar-plus"></i>
            </span>
            <Calendar placeholder='Início' value={registro.inicio} onChange={(e) => onInputChange(e, 'inicio')} className='mini-grid-field-inputgroup-input' />
          </div>
        </div>
        <div className="col-12 md:col-12" style={{ padding: '2px 5px' }}>
       
          <div className="p-inputgroup" style={{padding:'2px'}}>
            <span className="p-inputgroup-addon">
              <i className="pi pi-calendar-times"></i>
            </span>
            <Calendar placeholder='Término' value={registro.termino} onChange={(e) => onInputChange(e, 'termino')} className='mini-grid-field-inputgroup-input' />
            </div>
        </div>
        
        <div className="col-12 md:col-8" style={{ padding: '2px 5px' }}>
          <Button label="Buscar registros "  onClick={saveRegistro} style={{ width: '160px', paddingRight: '10px' }} />
        </div>
      </div>
    </>

  );

}

export default FormHistorico