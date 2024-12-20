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
import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';
import 'primeicons/primeicons.css';

//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { useForm, Controller } from 'react-hook-form';
import { axiosApi } from '../../../services/axios';
import { Link } from 'react-router-dom';


import ServicosCru from './form-cru';
const Servicos = () => {
  const [visibleMenuRight, setVisibleMenuRight] = useState(false);
  const nomePagina = 'Serviços em Aberto'
  const [registros, setRegistros] = useState(null);
  const [layout, setLayout] = useState('list');
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const rows = useRef(10);
  const datasource = useRef(null);
  const isMounted = useRef(false);
  const toast = useRef(null);
  useEffect(() => {
    if (isMounted.current) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setTimeout(() => {
      isMounted.current = true;
      axiosApi.get("/list_service")
        .then((response) => {
          datasource.current = response.data
          setTotalRecords(response.data.length)
          setRegistros(datasource.current.slice(0, rows.current))
          setLoading(false)
        })
        .catch(function (error) {
        });
      setLoading(false)
    }, 1000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onPage = (event) => {
    setLoading(true);

    //imitate delay of a backend call
    setTimeout(() => {
      const startIndex = event.first;
      const endIndex = Math.min(event.first + rows.current, totalRecords - 1);
      const newregistros = startIndex === endIndex ? datasource.current.slice(startIndex) : datasource.current.slice(startIndex, endIndex);
      setFirst(startIndex);
      setRegistros(newregistros);
      setLoading(false);
    }, 1000);
  }

  //LAYOUT DOS DATAVIEW/CARDS ---------------------------------------------------------------------------------------

  const renderListItem = (data) => {
    return (
      <Card title={data.nome} subTitle={data.inicio + " - " + data.termino} style={{ width: '100em', height: 'auto' }} >
        <div class="grid">
          <div class="col-12 md:col-9 lg:col-9">
            <div class="text-left ">nome</div>
          </div>
          <div class="col-12 md:col-3 lg:col-3">
            <div class="text-right ">
              <Button icon="pi pi-chart-line" className="p-button-rounded p-button-success p-button-outlined p-button-sm" aria-label="Editar" />
              <Button icon="pi pi-pencil" className="p-button-rounded p-button-outlined p-button-sm" aria-label="Editar" onClick={e => { editeRegistro(data) }} />
            </div>
          </div>
          <div class="col-12 md:col-12 lg:col-12">
            <div class="text-center ">conteudo</div>
          </div>
          <div class="col-12 md:col-12 lg:col-12">
            <div class="text-center">
              <div class="flex justify-content-end flex-wrap">
                <div class="flex align-items-center justify-content-center ">
                  <span className="p-buttonset">
                    <Button label="Save" icon="pi pi-check" />
                    <Button label="Delete" icon="pi pi-trash" />
                    <Button label="Cancel" icon="pi pi-times" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  const itemTemplate = (product) => {
    if (!product) {
      return;
    }
    return renderListItem(product);
  }

  const leftContents = (
    <span>{nomePagina}</span>
  );

  const op = useRef(null);

  const rightContents = (
    <React.Fragment>
      <Button icon="pi pi-th-large" onClick={() => setVisibleMenuRight(true)} className='p-button-outlined p-button-success' />
    </React.Fragment>
  );

  //cabecalho
  const header = (
    <div className="table-header" >
      <Toolbar left={leftContents} right={rightContents} />
    </div>
  );


  //FORMULARIO CRUD ----------------------------------------------------------------------------------------------|

  //states
  let emptyregistro = {
    id: null
  };
  const [registro, setRegistro] = useState(emptyregistro);
  const [id, setId] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);

  const openNew = () => {
    setRegistro(emptyregistro);
    setVisibleRight(true)
  }
  const closedNew = () => {
    setVisibleRight(false)
    setVisibleMenuRight(false)
  }
  const editeRegistro = (registro) => {
    let _registro = { ...registro };
    _registro.inicio = new Date(_registro.inicio)
    _registro.termino = new Date(_registro.termino)
    setRegistro(_registro)
    setVisibleRight(true)
  }
  const RecebidoDoFilhoPost = (registro) => {
    let _registros = [...registros];
    let _registro = { ...registro };
    _registro.id = registro.id
    _registros.push(_registro);
    setRegistro(emptyregistro);
  }
  const RecebidoDoFilhoPatch = (registro) => {
    let _registros = [...registros];
    let _registro = { ...registro };
    const index = findIndexById(registro.id);
    _registros[index] = _registro;
    setRegistro(emptyregistro);
    setRegistros(_registros);
    setRegistro(emptyregistro);
  }

  //funcao para retonar qual o indice do registro da tabela para alteracao
  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < registros.length; i++) {
      if (registros[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  //delete registro

  const [deleteregistroDialog, setDeleteregistroDialog] = useState(false);
  // funcao para mostrar alerta de confimação pelo usuario
  const confirmDeleteregistro = (registro) => {
    setRegistro(registro);
    setDeleteregistroDialog(true);
  }
  //funcao ocultar/cancelar alerta de confirmação pelo usuario
  const hideDeleteregistroDialog = () => {
    setDeleteregistroDialog(false);
  }

  //funcao que deleta o registro do banco de dados e da tabela
  const deleteregistro = () => {
    axiosApi.delete("/delete_client/" + registro.id)
      .then((response) => {
        let _registros = registros.filter(val => val.id !== registro.id);
        setRegistros(_registros);
        setDeleteregistroDialog(false);
        setRegistro(emptyregistro);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuáriodeletado', life: 3000 });
      })
      .catch(function (error) {
        toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
      });
  }

  //botoes de acao do alerta de confirmacao pelo usuario
  const deleteregistroDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteregistroDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteregistro} />
    </React.Fragment>
  );


  //--------------------------------------------------------------------------------------------------------------|
  //MENSAGENS AO USUARIO------------------------------------------------------------------------------------------|
  const toastBR = useRef(null);
  const showSuccess = (detail) => {
    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Usuário' + detail + ' cadastrada', life: 3000 });
  }

  //--------------------------------------------------------------------------------------------------------------|

  return (
    <>
      <Toast ref={toastBR} position="bottom-right" />
      <div className="dataview">
        <div className="card">
          <DataView value={registros} layout={layout} header={header}
            itemTemplate={itemTemplate} lazy paginator rows={rows.current}
            totalRecords={totalRecords} first={first} onPage={onPage} loading={loading} />
        </div>
      </div>
      <Sidebar className='w-sidebar-right' header={<h3>O que gostaria de fazer?</h3>} visible={visibleMenuRight} position="right" blockScroll onHide={() => setVisibleMenuRight(false)} style={{ width: '550px' }}>
        <div className="card w-card" >
          <div className="grid p-card-grid">
            <div className="col-fixed p-card-grid-col">
              <Link className='p-card-grid-col-link' onClick={() => openNew(true)} >
                <div className="grid nested-grid p-card-grid-col-link-grid">
                  <div className="grid p-card-grid-col-link-grid-grid">
                    <div className="col-10 p-card-grid-col-link-grid-grid-title">
                      Serviço interno
                    </div>
                    <div className="col-2 p-card-grid-col-link-grid-grid-icon">
                      <i className="pi pi-plus"></i>
                    </div>
                    <div className="col-12 p-card-grid-col-link-grid-grid-desc">
                      Cadastre um novo serviço para sua equipe interna
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Sidebar>
      <Sidebar className='w-sidebar-right' header={<h3>{nomePagina.toUpperCase()}</h3>} visible={visibleRight} position="right" blockScroll onHide={() => closedNew()} style={{ width: '100em' }}>
        <ServicosCru registro={registro} filhoParaPaiPost={RecebidoDoFilhoPost} filhoParaPaiPatch={RecebidoDoFilhoPatch} />
      </Sidebar>
      <Dialog visible={deleteregistroDialog} style={{ width: '450px' }} header="Confirm  " modal footer={deleteregistroDialogFooter} onHide={hideDeleteregistroDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {registro && <span>Are you sure you want to delete <b>{registro.name}</b>?</span>}
        </div>
      </Dialog>
    </>
  );
}

export default Servicos