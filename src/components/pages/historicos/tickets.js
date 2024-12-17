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
import 'primeicons/primeicons.css';
import { useParams } from 'react-router-dom';
//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { useForm, Controller } from 'react-hook-form';
import { axiosApi } from '../../../services/axios';
import { Link } from 'react-router-dom';


function HistoricoTickets() {



  //STATES PARA FUNCIONAMENTO GERAL DA PAGINA
  const [loading, setLoading] = useState(false);
  const nomePagina = 'Extrato de tickets'

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { inicio } = useParams();
  const { fim } = useParams();

  const toast = useRef(null);


  //FUNÇÃO PARA BUSCAR REGISTROS DO BANCO DE DADOS-------------------------------------------------------------------|

  //state
  const [registros, setRegistros] = useState([]);
  //requisição 
  const buscarRegistros = () => {
    setLoading(true);
    axiosApi.get("/history/ticket/" + inicio + "/" + fim)
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
    { field: 'setor', header: 'Setor origem:' },
    { field: 'unidade', header: 'Unidade medida:' },
    { field: 'valor', header: 'Valor R$:' },
    { field: 'nome', header: 'cliente:' },
    { field: 'data_registro', header: 'Criado em:' },
    { field: 'data_liberacao', header: 'Aprovado em:' },
    { field: 'data_faturamento', header: 'Faturado em:' },
    { field: 'status descricao', header: 'Status:' },
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

  //componentes a esquerda do cabeçalho
  const leftContents = (
    <span>{nomePagina}</span>
  );


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

  const rightContents = (
    <React.Fragment>
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
  const priceBodyTemplate = (rowData) => {
    let value =(rowData.valor).replace('.',',')
    return value
  }
  const statusBodyTemplate = (rowData) => {
    return <span className={`product-badge status-${rowData.status_descricao.toLowerCase().replace(/\s/g, '')}`}>{rowData.status_descricao}</span>;
  }

  const formatDate = (value) => {
    let newValue ='---'
   if(value){
    newValue =new Date(value)
    newValue =newValue.toLocaleDateString("pt-br")
    return newValue
   }
}

  const dateBodyTemplate_dataLiberacao =(rowData) => {
    return formatDate(rowData.data_liberacao)
  }
  const dateBodyTemplate_dataRegistro =(rowData) => {
    return formatDate(rowData.data_registro)
  }
  const dateBodyTemplate_dataFaturamento =(rowData) => {
    return formatDate(rowData.data_faturamento)
  }

  //linhas opçes
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/*
        <Button icon="pi pi-arrow-right-arrow-left" className="p-button-outlined p-button-info" onClick={() => editregistro(rowData)} />
        <Button icon="pi pi pi-trash" className="p-button-outlined p-button-danger" onClick={() => delete confirmDeleteregistro(rowData)} />
      */}
      </React.Fragment>
    );
  }

  //rodapé
  const footer = `Total de ${registros ? registros.length : 0} registros.`;

  //--------------------------------------------------------------------------------------------------------------|

  //MENSAGENS AO USUARIO------------------------------------------------------------------------------------------|
  const toastBR = useRef(null);
  const showSuccess = (detail) => {
    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Veículo ' + detail + ' cadastrada', life: 3000 });
  }

  //--------------------------------------------------------------------------------------------------------------|

  return (
    <>
      <Toast ref={toastBR} position="bottom-right" />
      <Toast ref={toast} />
      <div className="card">
        <DataTable
          value={registros}
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

          <Column field="id" header="Id:"></Column>
          <Column field="tipo" header="Tipo:"></Column>
          <Column field="descricao" header="Descrição:"></Column>
          <Column field="setor" header="Setor origem:"></Column>
          <Column field="unidade" header="Medida:"></Column>
          <Column field="nome" header="Cliente:"></Column>
          <Column header="valor" body={priceBodyTemplate}></Column>
          <Column header="status" body={statusBodyTemplate}></Column>
          <Column field="nome" header="Cliente:"></Column>
          <Column header="data_liberacao" body={dateBodyTemplate_dataRegistro}></Column>
          <Column header="data_liberacao" body={dateBodyTemplate_dataLiberacao}></Column>
          <Column header="data_liberacao" body={dateBodyTemplate_dataFaturamento}></Column>
          <Column header={'Opções:'} body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>


        </DataTable>
      </div>
    </>

  );

}

export default HistoricoTickets