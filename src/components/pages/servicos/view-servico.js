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
import { Card } from '@mui/material';


function VisualizarServico(props) {
  const [registros, setRegistros] = useState([]);
  const [registroDelete, setRegistroDelete] = useState([]);
  const [ordemServicos, setOrdemServicos] = useState([]);
  const [visitas, setVisitas] = useState([]);
  const [ajuste, setAjuste] = useState(false);
  const toastBR = useRef(null);
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DOS DADOS DO REGISTRO DO SERVICO
  useEffect(() => {
    
    //REQUISIÇÃO COM A BIBLIOTECA AXIOS
    axiosApi.get("/service_show/" + props.registro.id)
      .then((response) => {
        setRegistros(response.data.service)
        setOrdemServicos(response.data.ordem_service)
        setVisitas(response.data.visit)
      })
      .catch(function (error) {
      });
  }, [])
  //--------------------------------------------------------------------------------------------------------------|
  const actionBodyTemplate = (rowData) => {
    if (rowData.status != '0') {
      return (
        <React.Fragment>
          <Button icon="pi pi pi-trash" className="p-button-outlined p-button-danger" onClick={() => delete confirmDeleteregistro(rowData)} />
        </React.Fragment>
      );
    }
  }
  const carBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          {rowData.placa + " - " + rowData.frota}
        </span>
      </React.Fragment>
    );
  }
  const statusBodyTemplate = (rowData) => {
    if (rowData.ajuste == 'SIM') {
      return (
        <React.Fragment>
         <span> <i className="pi pi-exclamation-circle"></i></span>
        </React.Fragment>
      );
    }
  }
    //função para popular state registro com o motivo do cancelamento do serviço
    const onInputChangeDelete = (e, name) => {
      const val = (e.target && e.target.value) || '';
      let _registro = { ...registroDelete};
      _registro[`${name}`] = val
      setRegistroDelete(_registro);
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
    setRegistroDelete(registro);
    setDeleteregistroDialog(true);
  }
  //funcao ocultar/cancelar alerta de confirmação pelo usuario
  const hideDeleteregistroDialog = () => {
    setDeleteregistroDialog(false);
  }

  //funcao que deleta o registro do banco de dados e da tabela
  const deleteregistro = () => {
    console.log(registroDelete)
    let _registros = [...ordemServicos];
    axiosApi.patch("/order_service_cancel",registroDelete)
      .then((response) => {
        const index = findIndexById(registroDelete.id);
        _registros[index] = response.data;
        setDeleteregistroDialog(false);
        setRegistroDelete([]);
        toastBR.current.show({ severity: 'success', summary: 'Successful', detail: 'Cliente deletado', life: 3000 });
      })
      .catch(function (error) {
        toastBR.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
      });
  }

  //LAYOUT RODAPÉ MODAL CANCELAMENTO -----------------------------------------------------------------------------|
  const deleteregistroDialogFooter = (
    <React.Fragment>
      <Button label="Cancelar" icon="pi pi-times" className="p-button-outlined p-button-danger" onClick={hideDeleteregistroDialog} />
      <Button label="Confirmar" icon="pi pi-check" className="p-button-outlined p-button-success" onClick={deleteregistro} />
    </React.Fragment>
  );

  //--------------------------------------------------------------------------------------------------------------|

  return (
    <>

      <Toast ref={toastBR} position="bottom-right" />
      <div style={{ marginTop: '10px' }}>

        <div className="card w-card" >
          <div className="p-fluid w-form" >
            <div className="p-fluid grid">
              <div className="field w-field col-12 md:col-3">
                <label class="font-medium text-900">Nº do chamado:</label>
                <div className="p-inputgroup">
                  <InputText value={registros.chamado} disabled />
                </div>
              </div>
              <div className="field w-field col-12 md:col-9">
                <label class="font-medium text-900">Cliente:</label>
                <div className="p-inputgroup">
                  <InputText value={registros.nome} disabled />
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="card w-card" >
          <h3>Ordens de servços</h3>
          <div>
            <div className="card">
              <DataTable value={ordemServicos} responsiveLayout="scroll">
                <Column field="tipo" header="Tipo:"></Column>
                <Column field="produto" header="Produto:"></Column>
                <Column header={'Veículo:'} body={carBodyTemplate} />
                <Column field="nome" header="Executante:"></Column>
                <Column header={'opções:'} body={actionBodyTemplate} />
              </DataTable>
            </div>
          </div>
        </div>
        <div className="card w-card" >
          <h3>Visitas Realizadas</h3>
          <DataTable value={visitas} responsiveLayout="scroll">
                <Column field="inicio" header="início:"></Column>
                <Column field="termino" header="Término:"></Column>
                <Column field="nome" header="Nome:"></Column>
                <Column header={''} body={statusBodyTemplate} />
              </DataTable>
        </div>
      </div >


      <Dialog visible={deleteregistroDialog} style={{ width: '450px' }} header="Confirm  " modal footer={deleteregistroDialogFooter} onHide={hideDeleteregistroDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          <h3>Descreva o motivo do caneclamento desta OS:</h3>
          <div className="card w-card" style={{ margin: '0px', padding: "0px" }} >
            <div className="p-fluid w-form" style={{ margin: '0px', padding: "0px" }}>
              <div className="p-fluid grid">

                <div className="field w-field col-12 md:col-12">
                  <label class="font-medium text-900">Motivo do cancelamento:</label>
                  <div className="p-inputgroup w-inputgroup-select" style={{ marginTop: '0px' }}>
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-tag"></i>
                    </span>
                    <InputTextarea value={registroDelete.motivo_cancelamento} onChange={(e) => onInputChangeDelete(e, 'motivo_cancelamento')} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>

  );

}

export default VisualizarServico