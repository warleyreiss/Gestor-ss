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

import { DownloadTableExcel } from 'react-export-table-to-excel';
import { Dropdown } from 'primereact/dropdown';
import 'primeicons/primeicons.css';

//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { useForm, Controller } from 'react-hook-form';
import { axiosApi } from '../../../services/axios';
import { Link } from 'react-router-dom';

//IMPORTANDO COMPONENTES PERSONALIZADOS
import Extrato from './extrato';

function FinanceiroExtratos() {

  //STATES PARA FUNCIONAMENTO GERAL DA PAGINA
  const [visibleMenuRight, setVisibleMenuRight] = useState(false);
  const [loading, setLoading] = useState(false);
  const nomePagina = 'Faturamentos em aberto'
  const toast = useRef(null);

  const tableRef = useRef(null);
  //FUNÇÃO PARA BUSCAR REGISTROS DO BANCO DE DADOS-------------------------------------------------------------------|

  //state
  const [registros, setRegistros] = useState([]);
  const [registrosAccept, setRegistrosAccepts] = useState([]);
  //requisição 
  const buscarRegistros = () => {
    setLoading(true);
    axiosApi.get("/list_ticket_open")
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });
    setLoading(false)
    initFilters1();
  }

  //requisisção 
  useEffect(() => {
    buscarRegistros()
  }, [])
  //-------------------------------------------------------------------------------------------------------------|


  //FUNÇÃO PARA REFRESH DA LISTA DE CADASTRO DA PAGINA-----------------------------------------------------------|
  const refresh = () => {
    buscarRegistros()
  }
  //--------------------------------------------------------------------------------------------------------------|
  //OPÇÃO DE COL TOGGLE DA INTERFACE DO USUARIO------------------------------------------------------------------|
  //definição das colunas
  const columns = [
    { field: 'id', header: 'Fatramento nº:' },
    { field: 'nome', header: 'Cliente:' },
    { field: 'vencimento', header: 'Vencimento:' },
  ];

  //state
  const [selectedColumns, setSelectedColumns] = useState(columns);

  //funcao ao mudar
  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter(col => selectedColumns.some(sCol => sCol.field === col.field));
    setSelectedColumns(orderedSelectedColumns);
  }
  //------------------------------------------------------------------------------------------------------------|

  //OPÇÃO DE FILTRO PARA PESQUISA -------------------------------------------------------------------------------|
  //states
  const [filters1, setFilters1] = useState(null);
  const [globalFilterValue1, setGlobalFilterValue1] = useState('');

  //funcao de iniciar filtro acionado na requisicao dos registro no banco de dados
  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue1('');
  }

  //funcao ao mudar o campo do filtro
  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1['global'].value = value;
    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  }

  //funcao para reinicar o filtro tabela
  const clearFilter1 = () => {
    initFilters1();
  }

  //------------------------------------------------------------------------------------------------------------|

  //OPÇÃO DE EXPORTAR REGISTROS DA TABELA FORMATO --------------------------------------------------------------|
  //csv
  const dt = useRef(null);

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  }

  //xls
  const exportExcel = () => {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(registros);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      saveAsExcelFile(excelBuffer, nomePagina);
    });
  }
  //funcao para forçar o download
  const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then(module => {
      if (module && module.default) {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE
        });
        module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
  }
  //-------------------------------------------------------------------------------------------------------------|


  //ESTRUTURA DA TABELA DE DADOS ---------------------------------------------------------------------------------|
  //componentes a direita do cabeçalho
  const [activeIndex, setActiveIndex] = useState(null);
  const onClick = (itemIndex) => {
    let _activeIndex = activeIndex ? [...activeIndex] : [];
    if (_activeIndex.length === 0) {
      _activeIndex.push(itemIndex);
    }
    else {
      const index = _activeIndex.indexOf(itemIndex);
      if (index === -1) {
        _activeIndex.push(itemIndex);
      }
      else {
        _activeIndex.splice(index, 1);
      }
    }
    setActiveIndex(_activeIndex);
  }

  const op = useRef(null);

  //componentes a esquerda do cabeçalho
  const leftContents = (
    <span>{nomePagina}</span>
  );
  const rightContents = (
    <React.Fragment>
      {registrosAccept.length > 0 ? <Link className='btn-secondary' to={{ pathname: `/equipment/accept` }}>
        <Button icon='pi pi-exclamation-triangle' label='há equipamentos aguardando aprovação ' className='p-button p-button-danger' iconPos='right' />
      </Link> : <></>}
      <Button icon="pi pi-refresh" onClick={() => refresh()} className='p-button-outlined p-button-info' />
      <InputText value={globalFilterValue1} icon="pi pi-search" onChange={onGlobalFilterChange1} placeholder="Filtrar..." />
      <Button type="button" icon="pi pi-chevron-down" iconPos="right" onClick={(e) => op.current.toggle(e)} aria-haspopup aria-controls="overlay_panel" className="p-button-outlined p-button-info " />
      <OverlayPanel ref={op} showCloseIcon id="overlay_panel" style={{ width: '450px' }} className="overlaypanel-demo">
        <Accordion activeIndex={0}>
          <AccordionTab header="Exportar:">
            <Button type="button" label='.csv' icon="pi pi-file-excel" onClick={() => exportCSV(false)} className='p-button-outlined p-button-secondary' data-pr-tooltip="CSV" />
            <Button type="button" label='.xls' icon="pi pi-file-excel" onClick={exportExcel} className='p-button-outlined p-button-secondary' data-pr-tooltip="XLS" />
          </AccordionTab>
          <AccordionTab header="Importar:">
            <p>Não diponível </p>
          </AccordionTab>
          <AccordionTab header="Selecionar colunas:">
            <MultiSelect value={selectedColumns} options={columns} optionLabel="header" onChange={onColumnToggle} style={{ width: '20em' }} />
          </AccordionTab>
        </Accordion>
      </OverlayPanel>


    </React.Fragment>
  );

  //cabecalho
  const header = (
    <div className="table-header" >
      <Toolbar left={leftContents} right={rightContents} />
    </div>
  );

  //linhas
  const columnComponents = selectedColumns.map(col => {
    return <Column key={col.field} field={col.field} header={col.header} sortable={col.sortable} />;
  });

  const statusBodyTemplate = (rowData) => {
    return <span className={`product-badge status-${rowData.status_descricao.toLowerCase().replace(/\s/g, '')}`}>{rowData.status_descricao}</span>;
  }
  const qddadeBodyTemplate = (rowData) => {
    return <span >{rowData.faturamento_id.length}</span>;
  }

  //linhas opçes
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-file" className="p-button-outlined p-button-info" onClick={e => { viewRegistro(rowData) }} />
        <Button icon="pi pi-check" className="p-button-outlined p-button-info" onClick={e => { finalziarRegistro(rowData) }} />
        <Button icon="pi pi pi-trash" className="p-button-outlined p-button-danger" onClick={() => delete confirmDeleteregistro(rowData)} />
      </React.Fragment>
    );
  }
  //rodapé
  const footer = `Total de ${registros ? registros.length : 0} registros.`;

  //--------------------------------------------------------------------------------------------------------------|

  //FORMULARIO CRUD ----------------------------------------------------------------------------------------------|
  //OBS: FORMULARIO É IMPORTADO COMO COMPONENTE PERSONALIZADO

  //states
  let emptyregistro = {
    id: null
  };

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [registro, setRegistro] = useState(emptyregistro);
  const [id, setId] = useState(false);
  const [visibleExtrato, setVisibleExtrato] = useState(false);

  const setSelectedRow = (value) => {
    console.log(value['id'])
    setVisibleExtrato(true)
    setSelectedProducts(value)
  }
  //função para novo adastro
  const openNew = () => {
    setRegistro(emptyregistro);
    setVisibleExtrato(true)
  }
  //função para cancelar um novo cadastro ou edição
  const closedExtrato = () => {
    setVisibleExtrato(false)
    setVisibleMenuRight(false)
  }
  //função para editar dados de um cadastro existente
  const viewRegistro = (registro) => {
    setRegistro(emptyregistro);
    let _registro = { ...registro };
    setRegistro(_registro)
    setVisibleExtrato(true)
  }
  //função que recebe os dados de um novo cadastro
  const recebidoDoFilhoPost = (registro) => {
    console.log(registro)
    let _registros = [...registros];
    let _registro = { ...registro };
    _registro.id = registro.id
    _registros.push(_registro);
    setRegistro(emptyregistro);
    setVisibleExtrato(false)
    setVisibleMenuRight(false)
  }
  //função que recebi os dados de um cadastro editado
  const recebidoDoFilhoPatch = (registro) => {
    let _registros = [...registros];
    let _registro = { ...registro };
    const index = findIndexById(registro.id);
    _registros[index] = _registro;
    setRegistros(_registros);
    setRegistro(emptyregistro);
    setVisibleExtrato(false)
    setVisibleMenuRight(false)
  }

  //função para retonar qual o indice do registro da tabela para alteracao
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
  //--------------------------------------------------------------------------------------------------------------|

  //FINALIZAÇÃO DE UM SERVIÇO -----------------------------------------------------------------------------|
  const finalziarRegistro = (data) => {
    axiosApi.patch("/ticket_confirm", data)
      .then((response) => {
        let _registros = registros.filter(val => val.id !== data.id);
        setRegistros(_registros);
        setRegistro(emptyregistro);
      })
      .catch(function (error) {
        console.log(error)
      });
  }
  //--------------------------------------------------------------------------------------------------------------|
  //CANCELAMENTO DE UM SERVIÇO -----------------------------------------------------------------------------------|
  //states
  const [deleteregistroDialog, setDeleteregistroDialog] = useState(false);

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
  // funcao para mostrar alerta de confimação pelo usuario
  const confirmDeleteregistro = (registro) => {
    setRegistro(registro);
    setDeleteregistroDialog(true);
  }
  //funcao ocultar/cancelar alerta de confirmação pelo usuario
  const hideDeleteregistroDialog = () => {
    setDeleteregistroDialog(false);
  }
  //função para popular state registro com o motivo do cancelamento do serviço
  const onInputChangeDelete = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _registro = { ...registro };
    _registro[`${name}`] = val;
    setRegistro(_registro);
  }
  //funcao que deleta o registro do banco de dados e da tabela
  const deleteregistro = () => {
    axiosApi.patch("/extract_cancel", registro)
      .then((response) => {
        let _registros = registros.filter(val => val.id !== registro.id);
        setRegistros(_registros);
        setDeleteregistroDialog(false);
        setRegistro(emptyregistro);
      })
      .catch(function (error) {
        console.log(error)
      });
  }
  //--------------------------------------------------------------------------------------------------------------|

  //LAYOUT RODAPÉ MODAL CANCELAMENTO -----------------------------------------------------------------------------|
  const deleteregistroDialogFooter = (
    <React.Fragment>
      <Button label="Cancelar" icon="pi pi-times" className="p-button-outlined p-button-danger" onClick={hideDeleteregistroDialog} />
      <Button label="Confirmar" icon="pi pi-check" className="p-button-outlined p-button-success" onClick={deleteregistro} />
    </React.Fragment>
  );

  //--------------------------------------------------------------------------------------------------------------|

  //MENSAGENS AO USUARIO------------------------------------------------------------------------------------------|
  const toastBR = useRef(null);
  const showSuccess = (detail) => {
    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Veículo ' + detail + ' cadastrada', life: 3000 });
  }

  //--------------------------------------------------------------------------------------------------------------|

  const customIcons = (
    <React.Fragment>
     

        
    </React.Fragment>
);
  return (
    <>
      <Toast ref={toastBR} position="bottom-right" />
      <Sidebar visible={visibleExtrato} fullScreen onHide={() => closedExtrato()} icons={customIcons}>
        <Extrato registro={registro} filhoParaPaiPost={recebidoDoFilhoPost} filhoParaPaiPatch={recebidoDoFilhoPatch} />
      </Sidebar>

      <Toast ref={toast} />
      <div className="card">
        <DataTable value={registros}
          filters={filters1}
          ref={dt}
          stateStorage="local" stateKey="dt-state-demo-local"
          scrollable scrollHeight="400px"
          loading={loading} scrollDirection="both"
          size="small"
          stripedRows
          responsiveLayout="stack" breakpoint="960px"
          resizableColumns columnResizeMode="fit"
          header={header} footer={footer}
          paginator
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          rows={10}
          rowsPerPageOptions={[10, 20, 50]}>
          {columnComponents}
          <Column header={'qdade. tickets:'} body={qddadeBodyTemplate}></Column>
          <Column header={'Opções:'} body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
        </DataTable>
      </div>

      <Dialog className='w-dialog-delete' visible={deleteregistroDialog} style={{ width: '450px' }} modal footer={deleteregistroDialogFooter} onHide={hideDeleteregistroDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          <h3>Qual motivo da exclusão?:</h3>
          <div className="card w-card" style={{ margin: '0px', padding: "0px" }} >
            <div className="p-fluid w-form" style={{ margin: '0px', padding: "0px" }}>
              <div className="p-fluid grid">

                <div className="field w-field col-12 md:col-12">
                  <label class="font-medium text-900">Justificativa/descrição do ocorrido:</label>
                  <div className="p-inputgroup w-inputgroup-select" style={{ marginTop: '0px' }}>
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-tag"></i>
                    </span>
                    <InputTextarea value={registro.justificativa} onChange={(e) => onInputChangeDelete(e, 'justificativa')} />
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

export default FinanceiroExtratos