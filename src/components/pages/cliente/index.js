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

import { InputNumber } from 'primereact/inputnumber';
import 'primeicons/primeicons.css';

//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { useForm, Controller } from 'react-hook-form';
import { axiosApi } from '../../../services/axios';
import { Link } from 'react-router-dom';


function Clientes() {

  //STATES PARA FUNCIONAMENTO GERAL DA PAGINA
  const [loading, setLoading] = useState(false);
  const nomePagina = 'Cadastros de clientes'

  const toast = useRef(null);


  //FUNÇÃO PARA BUSCAR REGISTROS DO BANCO DE DADOS-------------------------------------------------------------------|

  //state
  const [registros, setRegistros] = useState([]);
  //requisição 
  const buscarRegistros = () => {
    setLoading(true);
    axiosApi.get("/list_client")
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
  const refresh =()=>{
    buscarRegistros()
  }
 //--------------------------------------------------------------------------------------------------------------|
  //OPÇÃO DE COL TOGGLE DA INTERFACE DO USUARIO------------------------------------------------------------------|
  //definição das colunas
  const columns = [
    { field: 'nome', header: 'Nome:' },
    { field: 'responsavel', header: 'Padrinho:' }
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
  const openNew = () => {
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
  const { register, handleSubmit, reset, setValue/*, formStates:{erros}*/ } = useForm();

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

  //envio do formulario CRUD
  const saveRegistro = () => {

    if (registro.nome.trim()) {
      let _registros = [...registros];
      let _registro = { ...registro };
      if (registro.id) {
        axiosApi.patch("/update_client", registro)
          .then((response) => {
            const index = findIndexById(registro.id);
            _registros[index] = _registro;
           
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Cliente alterado!', life: 3000 });

          })
          .catch(function (error) {
            toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
          });
      }
      else {
        registro.contrato_id='1'
        axiosApi.post("/create_client", registro)
          .then((response) => {
            _registro.id = response.data.id
            _registros.push(_registro);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Cliente cadastrado!', life: 3000 });
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
      <Sidebar className='w-sidebar-right' header={<h3>{nomePagina.toUpperCase()}</h3>} visible={visibleRight} position="right" blockScroll onHide={() => setVisibleRight(false)} style={{ width: '100em' }}>
        <div className="card w-card" >
          <div className="p-fluid w-form" >
            <div className="p-fluid grid">
              <InputText value={registro.id} onChange={(e) => onInputChange(e, 'id')} hidden />
              <div className="field w-field col-12 md:col-6">
                <label class="font-medium text-900">Nome/razão social:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-building"></i>
                  </span>
                  <InputText value={registro.nome} onChange={(e) => onInputChange(e, 'name')} required />
                </div>
              </div>
              <div className="field w-field col-12 md:col-6">
                <label class="font-medium text-900">CNPJ:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-id-card"></i>
                  </span>
                  <InputMask value={registro.cnpj} onChange={(e) => onInputChange(e, 'cnpj')}mask="99.999.999/999.9-99" required></InputMask>
                </div>
              </div>
              <div className="field w-field col-12 md:col-4">
                <label class="font-medium text-900">Nome do responsável (padrinho):</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText value={registro.responsavel} onChange={(e) => onInputChange(e, 'responsavel')} required />
                </div>
              </div>
              <div className="field w-field col-12 md:col-4">
                <label class="font-medium text-900">Telefone pessoal:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-whatsapp"></i>
                  </span>
                  <InputMask value={registro.telefone} onChange={(e) => onInputChange(e, 'telefone')}mask="(99) 9 9999-9999" required></InputMask>
                </div>
              </div>
              <div className="field w-field col-12 md:col-4">
                <label class="font-medium text-900">Email pessoal:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-send"></i>
                  </span>
                  <InputText value={registro.email} onChange={(e) => onInputChange(e, 'email')} required />
                </div>
              </div>
              <div className="field w-field col-12 md:col-4">
                <label class="font-medium text-900">Nome do responsável 2 (padrinho):</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText value={registro.responsavel2} onChange={(e) => onInputChange(e, 'responsavel2')} required />
                </div>
              </div>
              <div className="field w-field col-12 md:col-4">
                <label class="font-medium text-900">Telefone pessoal:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-whatsapp"></i>
                  </span>
                  <InputMask value={registro.telefone2} onChange={(e) => onInputChange(e, 'telefone2')}mask="(99) 9 9999-9999" required></InputMask>
                </div>
              </div>
              <div className="field w-field col-12 md:col-4">
                <label class="font-medium text-900">Email pessoal:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-send"></i>
                  </span>
                  <InputText value={registro.email2} onChange={(e) => onInputChange(e, 'email2')} required />
                </div>
              </div>
              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Endereço completo:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-home"></i>
                  </span>
                  <InputText value={registro.endereco} onChange={(e) => onInputChange(e, 'endereco')} required />
                </div>
              </div>
              <div className="field w-field col-12 md:col-8">
                <label class="font-medium text-900">link GPS <Link to='https://www.google.com.br/maps/preview'> google maps</Link>:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-map-marker"></i>
                  </span>
                  <InputText value={registro.gps} onChange={(e) => onInputChange(e, 'gps')} required />
                </div>
              </div>
              <div className="field w-field col-12 md:col-4">
                <label class="font-medium text-900">Distância (km):</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-truck"></i>
                  </span>
                  <InputText value={registro.distancia} onChange={(e) => onInputChange(e, 'distancia')} required />
                </div>
              </div>

              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Valor alíquota ISS:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-dollar"></i>
                  </span>
                  <InputNumber value={registro.valor_iss} onValueChange={(e) => onInputNumberChange(e, 'valor_iss')} name='valor' inputId="currency-germany" mode="currency" currency="BRL" locale="pt-BR" />
                </div>
              </div>
              <div className="field w-field col-12 md:col-3">
                <label class="font-medium text-900">Valor da hora PS:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-dollar"></i>
                  </span>
                  <InputNumber value={registro.valor_hora} onValueChange={(e) => onInputNumberChange(e, 'valor_hora')} inputId="currency-germany" mode="currency" currency="BRL" locale="pt-BR" />
                </div>
              </div>
              <div className="field w-field col-12 md:col-3">
                <label class="font-medium text-900">Valor ociosidade:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-dollar"></i>
                  </span>
                  <InputNumber value={registro.valor_ociosidade} onValueChange={(e) => onInputNumberChange(e, 'valor_ociosidade')} inputId="currency-germany" mode="currency" currency="BRL" locale="pt-BR" />
                </div>
              </div>
              <div className="field w-field col-12 md:col-3">
                <label class="font-medium text-900">Valor atendimento frustado:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-dollar"></i>
                  </span>
                  <InputNumber value={registro.valor_atendimento_frustado} onValueChange={(e) => onInputNumberChange(e, 'valor_atendimento_frustado')} inputId="currency-germany" mode="currency" currency="BRL" locale="pt-BR" />
                </div>
              </div>

              <div className="field w-field col-12 md:col-3">
                <label class="font-medium text-900">Valor violação (sem danos):</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-dollar"></i>
                  </span>
                  <InputNumber value={registro.valor_violacao} onValueChange={(e) => onInputNumberChange(e, 'valor_violacao')} inputId="currency-germany" mode="currency" currency="BRL" locale="pt-BR" />
                </div>
              </div>
              <div className="field w-field col-12 md:col-3">
                <label class="font-medium text-900">Valor KM rodado:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-dollar"></i>
                  </span>
                  <InputNumber value={registro.valor_km} onValueChange={(e) => onInputNumberChange(e, 'valor_km')} inputId="currency-germany" mode="currency" currency="BRL" locale="pt-BR" />
                </div>
              </div>
              <div className="field w-field col-12 md:col-3">
                <label class="font-medium text-900">Valor Hospedagem:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-dollar"></i>
                  </span>
                  <InputNumber value={registro.valor_hospedagem} onValueChange={(e) => onInputNumberChange(e, 'valor_hospedagem')} inputId="currency-germany" mode="currency" currency="BRL" locale="pt-BR" />
                </div>
              </div>
              <div className="field w-field col-12 md:col-3">
                <label class="font-medium text-900">Valor alimentação:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-dollar"></i>
                  </span>
                  <InputNumber value={registro.valor_alimentacao} onValueChange={(e) => onInputNumberChange(e, 'valor_alimentacao')} inputId="currency-germany" mode="currency" currency="BRL" locale="pt-BR" />
                </div>
              </div>

              <div className="field w-field col-12 md:col-4">
                <label class="font-medium text-900">Valor instalação leve:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-dollar"></i>
                  </span>
                  <InputNumber value={registro.valor_instalacao_leve} onValueChange={(e) => onInputNumberChange(e, 'valor_instalacao_leve')} inputId="currency-germany" mode="currency" currency="BRL" locale="pt-BR" />
                </div>
              </div>
              <div className="field w-field col-12 md:col-4">
                <label class="font-medium text-900">Valor remoção leve</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-dollar"></i>
                  </span>
                  <InputNumber value={registro.valor_remocao_leve} onValueChange={(e) => onInputNumberChange(e, 'valor_remocao_leve')} inputId="currency-germany" mode="currency" currency="BRL" locale="pt-BR" />
                </div>
              </div>
              <div className="field w-field col-12 md:col-4">
                <label class="font-medium text-900">Valor substituição leve:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-dollar"></i>
                  </span>
                  <InputNumber value={registro.valor_substituicao_leve} onValueChange={(e) => onInputNumberChange(e, 'valor_substituicao_leve')} inputId="currency-germany" mode="currency" currency="BRL" locale="pt-BR" />
                </div>
              </div>

              <div className="field w-field col-12 md:col-4">
                <label class="font-medium text-900">Valor instalação pesada:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-dollar"></i>
                  </span>
                  <InputNumber value={registro.valor_instalacao_pesada} onValueChange={(e) => onInputNumberChange(e, 'valor_instalacao_pesada')} inputId="currency-germany" mode="currency" currency="BRL" locale="pt-BR" />
                </div>
              </div>
              <div className="field w-field col-12 md:col-4">
                <label class="font-medium text-900">Valor remoção leve</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-dollar"></i>
                  </span>
                  <InputNumber value={registro.valor_remocao_pesada} onValueChange={(e) => onInputNumberChange(e, 'valor_remocao_pesada')} inputId="currency-germany" mode="currency" currency="BRL" locale="pt-BR" />
                </div>
              </div>
              <div className="field w-field col-12 md:col-4">
                <label class="font-medium text-900">Valor substituição leve:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-dollar"></i>
                  </span>
                  <InputNumber value={registro.valor_substituicao_pesada} onValueChange={(e) => onInputNumberChange(e, 'valor_substituicao_pesada')} inputId="currency-germany" mode="currency" currency="BRL" locale="pt-BR" />
                </div>
              </div>

              <div className="field w-field col-12 md:col-12">
                <Button  label="Salvar cadastro" className="w-form-button" icon="pi pi-save" iconPos='right' onClick={saveRegistro}/>
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

export default Clientes