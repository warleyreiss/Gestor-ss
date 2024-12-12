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
import 'primeicons/primeicons.css';

//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { useForm, Controller } from 'react-hook-form';
import { axiosApi } from '../../../services/axios';


function ListaClientes() {

  //STATES PARA FUNCIONAMENTO GERAL DA PAGINA
  const [loading, setLoading] = useState(false);

  //REQUISIÇÃO DOS REGISTROS DO BANCO DE DADOS-------------------------------------------------------------------|
  //state
  const [registros, setRegistros] = useState([]);

  //requisisção 
  useEffect(() => {
    //inicia animacao de carregamento
    setLoading(true);
    axiosApi.get("/clientes")
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });
    //finaliza animacao de carregamento
    setLoading(false)
    //inicar o recurso de pesquisa da tabela
    initFilters1();
  }, [])
  //-------------------------------------------------------------------------------------------------------------|

  //OPÇÃO DE COL TOGGLE DA INTERFACE DO USUARIO------------------------------------------------------------------|
  //colunas
  const columns = [
    { field: 'id', header: 'id.' },
    { field: 'nome', header: 'Nome' },
    { field: 'email', header: 'E-mail' },
    { field: 'documento', header: 'Documento' },
    { field: 'tipo', header: 'Tipo' },
    { field: 'telefone', header: 'Telefone' },
    { field: 'data_nascimento', header: 'Data nascimento' },
    { field: 'endereco', header: 'Endereço' }

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

  //OPÇÃO DE FILTRO POR PESQUISA -------------------------------------------------------------------------------|
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
      saveAsExcelFile(excelBuffer, 'lista_clientes');
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

  //OPÇÃO DE IMPORTAR REGISTROS DA TABELA FORMATO ---------------------------------------------------------------|
  //states
  const [totalSize, setTotalSize] = useState(0);

  //instancias
  const fileUploadRef = useRef(null);
  const toast = useRef(null);

  //funcao acionada ao importar
  const onUpload = () => {

    toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }

  //--------------------------------------------------------------------------------------------------------------|

  //ESTRUTURA DA TABELA DE DADOS ---------------------------------------------------------------------------------|

  //componentes a esquerda do cabeçalho
  const leftContents = (
    <span>tebela</span>
  );

  //componentes a direita do cabeçalho
  const openNew = () => {
    setVisibleRight(true)
    setregistro(emptyregistro);
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
      <InputText value={globalFilterValue1} icon="pi pi-search" onChange={onGlobalFilterChange1} placeholder="Filtrar registros" />
      <Button icon="pi pi-plus" onClick={() => openNew(true)} className='p-button-outlined p-button-success' />
      <Button type="button" icon="pi pi-chevron-down" iconPos="right" onClick={(e) => op.current.toggle(e)} aria-haspopup aria-controls="overlay_panel" className="p-button-outlined p-button-info " />
      <OverlayPanel ref={op} showCloseIcon id="overlay_panel" style={{ width: '450px' }} className="overlaypanel-demo">
        <Accordion activeIndex={0}>
          <AccordionTab header="Exportar:">
            <Button type="button" label='.csv' icon="pi pi-file-excel" onClick={() => exportCSV(false)} className='p-button-outlined p-button-secondary' data-pr-tooltip="CSV" />
            <Button type="button" label='.xls' icon="pi pi-file-excel" onClick={exportExcel} className='p-button-outlined p-button-secondary' data-pr-tooltip="XLS" />
          </AccordionTab>
          <AccordionTab header="Importar:">
            <FileUpload name="demo" url="p" className='p-button-outlined p-button-secondary' onUpload={onUpload} accept="csv/*" maxFileSize={1000000}
              emptyTemplate={<p >solte aqui seu arquivo formato csv.</p>} />
          </AccordionTab>
          <AccordionTab header="Selecionar colunas:">
            <MultiSelect value={selectedColumns} options={columns} optionLabel="header" onChange={onColumnToggle} style={{ width: '20em' }} />
          </AccordionTab>
          <AccordionTab header="Header III">
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
              cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>
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
  //colunas
  //é definido pelo state "selectedColumns"

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
  const footer = `Total de ${registros ? registros.length : 0} clientes.`;

  //--------------------------------------------------------------------------------------------------------------|

  //FORMULARIO CRUD ----------------------------------------------------------------------------------------------|

  //states
  const [id, setId] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const [tipoPessoa, setTipoPessoa] = useState('fisica');
  const [checked2, setChecked2] = useState(false);
  const [mask, setMask] = useState("999.999.999-99");
  const { register, handleSubmit, reset, setValue/*, formStates:{erros}*/ } = useForm();

  //funcao alterar mascara documento e tipo de pessoa
  const changeMsk = (value) => {
    if (value) {
     // setMask('999.999.999-99')
      setTipoPessoa('fisica')
    } else {
     // setMask('99.999.999/9999-99')
      setTipoPessoa('juridica')
    }
  }

  //envio do formulario CRUD
  const onSubmit = (formContent) => {

    if (formContent.nome.trim()) {
      let _registros = [...registros];
      let _registro = { ...formContent };
      if (_registro.id) {

        axiosApi.patch("/clientes", formContent)
          .then((response) => {
            _registro.data_nascimento = '---';// preciso mudr formato do date aqui, posso pegar o vindo do post
            const index = findIndexById(registro.id);
            _registros[index] = _registro;
            setRegistros(_registros);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'registro Updated', life: 3000 });
            reset()
            setVisibleRight(false)
          })
          .catch(function (error) {
            toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
          });
      }
      else {
        axiosApi.post("/clientes", formContent)
          .then((response) => {
            _registro.id = response.data.id
            _registro.data_nascimento = '---';// preciso mudr formato do date aqui, posso pegar o vindo do post
            _registros.push(_registro);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Cliente cadastrado', life: 3000 });
            setRegistros(_registros);
            setregistro(emptyregistro);
            reset()
            setVisibleRight(false)

          })
          .catch(function (error) {
            toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
          });

      }
    }
  };



  //funcao preenchimento do formulario para edicao 
  const editregistro = (registro) => {
    setregistro({ ...registro });
    reset(registro);
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
  let emptyregistro = {
    id: null
  };
  const [registro, setregistro] = useState(emptyregistro);

  const [deleteregistroDialog, setDeleteregistroDialog] = useState(false);
  // funcao para mostrar alerta de confimação pelo usuario
  const confirmDeleteregistro = (registro) => {
    setregistro(registro);
    setDeleteregistroDialog(true);
  }
  //funcao ocultar/cancelar alerta de confirmação pelo usuario
  const hideDeleteregistroDialog = () => {
    setDeleteregistroDialog(false);
  }

  //funcao que deleta o registro do banco de dados e da tabela
  const deleteregistro = () => {
    axiosApi.delete("/clientes/" + registro.id)
      .then((response) => {
        let _registros = registros.filter(val => val.id !== registro.id);
        setRegistros(_registros);
        setDeleteregistroDialog(false);
        setregistro(emptyregistro);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Cliente deletado', life: 3000 });
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
    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'cliente ' + detail + ' cadastrada', life: 3000 });
  }

  //--------------------------------------------------------------------------------------------------------------|


  return (
    <>
      <Toast ref={toastBR} position="bottom-right" />
      <Sidebar className='w-sidebar-right' header={<h3>Cadastro clientes</h3>} visible={visibleRight} position="right" blockScroll onHide={() => setVisibleRight(false)} style={{ width: '30em' }}>
        <div className="card w-card" >
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid w-form" >
            <InputText hidden {...register("id")} />
            <div className="p-fluid grid">

              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Nome completo:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText {...register("nome")} />
                </div>
              </div>
              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Email pessoal:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-send"></i>
                  </span>
                  <InputText {...register("email")} />
                </div>
              </div>

              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Documento pessoal:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-id-card"></i>
                  </span>
                  <InputText  {...register("documento")} />
                  <ToggleButton checked={checked2} onChange={(e) => setChecked2(e.value)} onClick={(e) => changeMsk(checked2)} onLabel="CNPJ" offLabel="CPF" onIcon="pi pi-arrow-right-arrow-left" offIcon="pi pi-arrow-right-arrow-left" style={{ width: '10em' }} aria-label="Confirmation" />
                </div>
              </div>
              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Data nascimento:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi  pi-calendar"></i>
                  </span>
                  <Calendar  touchUI {...register("data_nascimento")} />
                </div>
              </div>
              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Telefone pessoal:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-whatsapp"></i>
                  </span>
                  <InputText {...register("telefone")} />
                </div>
              </div>

              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Endereço completo:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-home"></i>
                  </span>
                  <InputText {...register("endereco")} />
                </div>
              </div>

              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Observações:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-file-edit"></i>
                  </span>
                  <InputTextarea rows={3} cols={30} autoResize {...register("observacao")} />
                </div>
              </div>
              <div className="field w-field col-12 md:col-12">
                <Button type="submit" label="Salvar cadastro" className="w-form-button" icon="pi pi-save" iconPos='right' />
              </div>
            </div>
          </form>
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
          <Column header={'Opções'} body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>

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

export default ListaClientes