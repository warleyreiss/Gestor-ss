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
import FormCru from './form-cru';

function ListaDetalhadaTicketsPendentes(props) {
  //STATES PARA FUNCIONAMENTO GERAL DA PAGINA
  const [visibleMenuRight, setVisibleMenuRight] = useState(false);
  const [loading, setLoading] = useState(false);
  const nomePagina = 'SERVIÇO: ' + props.registro.servico_id + "- " + props.registro.nome
  const toastBR = useRef(null);

  //FUNÇÃO PARA BUSCAR REGISTROS DO BANCO DE DADOS-------------------------------------------------------------------|

  //state
  const [registros, setRegistros] = useState([]);
  const [registrosAccept, setRegistrosAccepts] = useState([]);
  //requisição 
  const buscarRegistros = () => {
    setLoading(true);
    axiosApi.get("/list_ticket_pendente_detail_servico/" + props.registro.servico_id)
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
    { field: 'id', header: 'Id:' },
    { field: 'tipo', header: 'Tipo:' },
    { field: 'descricao', header: 'Descrição:' },
    { field: 'valor', header: 'Valor:' }
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
      <InputText value={globalFilterValue1} icon="pi pi-search" onChange={onGlobalFilterChange1} placeholder="Filtrar..." />
      <Button type="button" icon="pi pi-chevron-down" iconPos="right" onClick={(e) => op.current.toggle(e)} aria-haspopup aria-controls="overlay_panel" className="p-button-outlined p-button-info " />
      <OverlayPanel ref={op} showCloseIcon id="overlay_panel" style={{ width: '450px' }} className="overlaypanel-demo">
        <Accordion activeIndex={0}>
          <AccordionTab header="Exportar:">
            <Button type="button" label='.csv' icon="pi pi-file-excel" onClick={() => exportCSV(false)} className='p-button-outlined p-button-secondary' data-pr-tooltip="CSV" />
            <Button type="button" label='.xls' icon="pi pi-file-excel" onClick={exportExcel} className='p-button-outlined p-button-secondary' data-pr-tooltip="XLS" />
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

  //linhas opçes
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <Button icon="pi pi-pencil" className="p-button-outlined p-button-info" onClick={e => { viewRegistro(rowData) }} />*/}
      </React.Fragment>
    );
  }
  //rodapé
  const footer = `Total de ${registros ? registros.length : 0} registros.`;

  //--------------------------------------------------------------------------------------------------------------|

  //FORMULARIO CRUD ----------------------------------------------------------------------------------------------|
  //OBS: FORMULARIO É IMPORTADO COMO COMPONENTE PERSONALIZADO

  //states
  const [selectProducts, setSelectProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [visibleCRUD, setVisibleCRUD] = useState(false);

  const setSelectedRow = (value) => {
    let novoArray = []
    novoArray = value.map(c => c.id)
    setSelected(novoArray)
    setSelectProducts(value)
    if (value.length > 0) {
      setVisibleCRUD(true)
    } else {
      setVisibleCRUD(false)
    }

  }

  //função para cancelar um novo cadastro ou edição
  const closedNew = () => {
    setVisibleCRUD(false)
    setVisibleMenuRight(false)
  }
  //função para editar dados de um cadastro existente
  const viewRegistro = (registro) => {
    setRegistro(emptyregistro);
    let _registro = { ...registro };
    setRegistro(_registro)
    setVisibleCRUD(true)
  }
  //função que recebe os dados de um novo cadastro
  const recebidoDoFilhoPost = (registro) => {
    let _registros = [...registros];
    let _registro = { ...registro };
    _registro.id = registro.id
    _registros.push(_registro);
    setRegistro(emptyregistro);
    setVisibleCRUD(false)
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
    setVisibleCRUD(false)
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

  //APROVAÇÃO DOS TICKETS-----------------------------------------------------------------------------------------|
  let emptyregistro = {
    cliente_id:props.registro.cliente_id,
    vencimento: null,
    motivo:null,
  };
  const [registro, setRegistro] = useState(emptyregistro);

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _registro = { ...registro };
    _registro[`${name}`] = val;
    setRegistro(_registro);
  }
  const aprovar = () => {
    let _registro = { ...registro };
    _registro[`faturamento_id`] = selected;
      axiosApi.post('/accept_ticket',_registro)
        .then(function (response) {
          toastBR.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Tickets aprovados', life: 3000 });
setRegistro(emptyregistro)
props.filhoParaPaiPost(props.registro.servico_id)
        })
        .catch(function (error) {
          toastBR.current.show({ severity: 'warn', summary: 'Pendência', detail: error.response.data.msg, life: 3000 });

        });
  
  }
  const extrato = () => {
    let _validacao = []

    if (registro.vencimento == null) {
      _validacao.push({ severity: 'info', summary: 'Pendente', detail: 'Informe a data de vencimento do extrato', life: 3000 })
      toastBR.current.show(_validacao);
    } else {
      let _registro = { ...registro };
      _registro[`faturamento_id`] = selected;
  
      axiosApi.post('/create_ticket',_registro)
        .then(function (response) {
          toastBR.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Extrato criado!', life: 3000 });
          setRegistro(emptyregistro)
          props.filhoParaPaiPost(props.registro.servico_id)
        })
        .catch(function (error) {
          toastBR.current.show({ severity: 'warn', summary: 'Pendência', detail: error.response.data.msg, life: 3000 });

        });
      }
  }
  const excluir = () => {
    let _validacao = []

    if (registro.justificativa == null) {
      _validacao.push({ severity: 'info', summary: 'Pendente', detail: 'Informe o motivo do cancelamento', life: 3000 })
      toastBR.current.show(_validacao);
    } else {
      let _registro = { ...registro };
      _registro[`faturamento_id`] = selected;
   
      axiosApi.post('/refuse_ticket',_registro)
        .then(function (response) {
          toastBR.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Tickets cancelados', life: 3000 });
          setRegistro(emptyregistro)
          props.filhoParaPaiPost(props.registro.servico_id)
        })
        .catch(function (error) {
          toastBR.current.show({ severity: 'warn', summary: 'Pendência', detail: error.response.data.msg, life: 3000 });

        });
      }
  }
  
  //--------------------------------------------------------------------------------------------------------------|

  return (
    <>

      <Toast ref={toastBR} position="top-right" style={{zIndex:'100000'}} />
      <Sidebar header={selectProducts.length + " Tickets selecionados"} visible={visibleCRUD} position="bottom" style={{ height: '23vh', width: '50em', position: 'absolute', right: '0px', padding: '10px' }} onHide={() => closedNew()} modal={false} showCloseIcon={false} closeOnEscape={false} dismissable={false}>

        <div className="grid p-fluid" style={{ marginTop: "10px", justifyContent: "flex-end" }}>

          <div className="col-2">
            <div className="p-inputgroup p-inputgroup-divider">
              <Button label="Exlcuir " icon="pi pi-trash" className="w-form-button p-button-danger" iconPos='right' style={{ justifyContent: 'flex-end!important', width: '100%' }} onClick={()=>{excluir()}}/>
            </div>
          </div>
          <div className="col-4">
            <div className="p-inputgroup p-inputgroup-divider">
              <Calendar value={registro.vencimento} onChange={(e) => onInputChange(e, 'vencimento')} />
              <Button label="Extrato " icon="pi pi-file-export" className="w-form-button p-button-warning" iconPos='right' onClick={()=>{extrato()}}/>
            </div>
          </div>
          <div className="col-2">
            <div className="p-inputgroup p-inputgroup-divider">
              <Button label="Aprovar" icon="pi pi-check" className="w-form-button p-button-primary" iconPos='right' style={{ justifyContent: 'flex-end!important', width: '100%' }} onClick={()=>{aprovar()}} />
            </div>
          </div>

        </div>

      </Sidebar>

      <div className="card" style={{ height: '70vh' }}>
        <DataTable value={registros}
          filters={filters1}
          selection={selectProducts} onSelectionChange={e => setSelectedRow(e.value)} dataKey="id"
          ref={dt}
          stateStorage="local" stateKey="dt-state-demo-local"
          scrollable scrollHeight="60vh"
          loading={loading} scrollDirection="both"
          size="small"
          stripedRows
          responsiveLayout="stack" breakpoint="960px"
          resizableColumns columnResizeMode="fit"
          header={header}
          paginator
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          rows={10}
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
          {columnComponents}
       </DataTable>
      </div>

    </>

  );

}

export default ListaDetalhadaTicketsPendentes