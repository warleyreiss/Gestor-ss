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
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';

import { Password } from 'primereact/password';
import 'primeicons/primeicons.css';

//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { useForm, Controller } from 'react-hook-form';
import { axiosApi } from '../../../services/axios';
import { Link } from 'react-router-dom';


function Usuarios() {

  //STATES PARA FUNCIONAMENTO GERAL DA PAGINA
  const [loading, setLoading] = useState(false);
  const nomePagina = 'Cadastros Usuários'

  const toast = useRef(null);


  //FUNÇÃO PARA BUSCAR REGISTROS DO BANCO DE DADOS-------------------------------------------------------------------|

  //state
  const [registros, setRegistros] = useState([]);
  //requisição 
  const buscarRegistros = () => {
    setLoading(true);
    axiosApi.get("/list_user")
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
    { field: 'nome', header: 'Nome:' },
    { field: 'tipo', header: 'tipo de usuário:' },
    { field: 'setor', header: 'Setor/tipo:' },
    { field: 'email', header: 'Email:' },
    { field: 'nome_clientes', header: 'Cliente:' }
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

  //componentes a direita do cabeçalho
  const [registrosClientes, setRegistrosClientes] = useState([]);
  const openNew = () => {
    setLoading(true);

    axiosApi.get("/list_client_input")
      .then((response) => {
        setRegistrosClientes(response.data)
      })
      .catch(function (error) {
      });
    setLoading(false)
    setVisibleRight(true)
    setRegistro(emptyregistro);
  }

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
      <Button icon="pi pi-plus" onClick={() => openNew(true)} className='p-button-outlined p-button-success' />
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

  //linhas opçes
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-outlined p-button-info" onClick={() => editregistro(rowData)} />
        <Button icon="pi pi pi-trash" className="p-button-outlined p-button-danger" onClick={() => delete confirmDeleteregistro(rowData)} />
      </React.Fragment>
    );
  }
  //rodapé
  const footer = `Total de ${registros ? registros.length : 0} registros.`;

  //--------------------------------------------------------------------------------------------------------------|

  //FORMULARIO CRUD ----------------------------------------------------------------------------------------------|

  //states
  let emptyregistro = {
    id: null
  };
  const [registro, setRegistro] = useState(emptyregistro);
  const [id, setId] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);

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
  const setores = [
    { label: 'Compras', value: 'COMPRAS' },
    { label: 'Faturamento', value: 'FATURAMENTO' },
    { label: 'Materiais', value: 'MATERIAIS' },
    { label: 'Pós vendas', value: 'POS_VENDAS' },
    { label: 'Técnico', value: 'TECNICO' },
    { label: 'Hardware', value: 'hHARDWARE' },
    { label: 'Clientes', value: 'CLIENTE' }
  ];

  //envio do formulario CRUD
  const saveRegistro = () => {
    if (registro.email.trim()) {
      let _registros = [...registros];
      let _registro = { ...registro };
      if (registro.id) {
        axiosApi.patch("/update_user", registro)
          .then((response) => {
            const index = findIndexById(registro.id);
            _registros[index] = _registro;

            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuário alterado!', life: 3000 });

          })
          .catch(function (error) {
            toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
          });
      }
      else {
        registro.senha = '12345678'
        axiosApi.post("/create_user", registro)
          .then((response) => {
            _registro.id = response.data.id
            _registros.push(_registro);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuáriocadastrado!', life: 3000 });
          })
          .catch(function (error) {
            toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
          });
      }
      setRegistros(_registros);
      setRegistro(emptyregistro);
      setVisibleRight(false)

    }
  };
  const resetPass = () => {
    let _registros = [...registros];
    let _registro = { ...registro };
    _registro.senha='12345678'
    axiosApi.patch("/reset_user", _registro)
      .then((response) => {
    
        const index = findIndexById(_registro.id);
        _registros[index] = _registro;
        setRegistro(_registro)
        setRegistros(_registros)
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Senha resetada!', life: 3000 });

      })
      .catch(function (error) {
        console.log(error)
        toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
      });

  };


  //funcao preenchimento do formulario para edicao 
  const editregistro = (registro) => {
    setRegistro({ ...registro });
    setVisibleRight(true);
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
      <Sidebar className='w-sidebar-right' header={<h3>{nomePagina.toUpperCase()}</h3>} visible={visibleRight} position="right" blockScroll onHide={() => setVisibleRight(false)} style={{ width: '100em' }}>
        <div className="card w-card" >
          <div className="p-fluid w-form" >
            <div className="p-fluid grid">
              <InputText value={registro.id} onChange={(e) => onInputChange(e, 'id')} hidden />
              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Nome:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText value={registro.nome} onChange={(e) => onInputChange(e, 'nome')} required />
                </div>
              </div>
              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Setor:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <Dropdown value={registro.setor} options={setores} onChange={(e) => onInputChange(e, 'setor')} />

                </div>
              </div>
              <div className="field w-field col-12 md:col-6">
                <label class="font-medium text-900">Email de acesso:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-send"></i>
                  </span>
                  <InputText value={registro.email} onChange={(e) => onInputChange(e, 'email')} required />
                </div>
              </div>
              <div className="field w-field col-12 md:col-6">
                <label class="font-medium text-900">Senha:</label>
                <div className="p-inputgroup w-inputgroup-button">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-key"></i>
                  </span>
                  <Password value={registro.senha} onChange={(e) => onInputChange(e, 'senha')} required toggleMask />
                  <Button  className="w-form-button" icon="pi pi-refresh" onClick={() => { resetPass() }} />
                </div>
              </div>


              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Cliente/almoxarifado:</label>
                <div className="p-inputgroup w-inputgroup-select">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-building"></i>
                  </span>
                  <Select
                    defaultValue={{ value: registro.cliente_id, label: registro.nome_clientes }}
                    options={registrosClientes.map(sup => ({ value: sup.id, label: sup.nome }))}
                    onChange={(e) => { onInputNumberChange(e, 'cliente_id') }}
                    placeholder=''
                  />
                </div>
              </div>
              <div className="field w-field col-12 md:col-12">
                <Button label="Salvar cadastro" className="w-form-button" icon="pi pi-save" iconPos='right' onClick={saveRegistro} />
              </div>
            </div>
          </div>
        </div>
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
          <Column header={'Opções:'} body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>

        </DataTable>
      </div>

      <Dialog visible={deleteregistroDialog} style={{ width: '450px' }} header="Confirm  " modal footer={deleteregistroDialogFooter} onHide={hideDeleteregistroDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {registro && <span>Are you sure you want to delete <b>{registro.name}</b>?</span>}
        </div>
      </Dialog>
    </>

  );

}

export default Usuarios