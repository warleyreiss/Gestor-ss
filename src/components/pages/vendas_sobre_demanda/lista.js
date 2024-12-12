//IMPORTANTO HOOKS E DEMAIS RECURSOS DO REACT
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
//IMPORTANTO COMPONENTES DE BIBLIOTECAS DE INTERFACES
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Sidebar } from 'primereact/sidebar';
import { ToggleButton } from 'primereact/togglebutton';
import { Calendar } from 'primereact/calendar';

import { Divider } from 'primereact/divider';
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
import { ScrollPanel } from 'primereact/scrollpanel';
import { Panel } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import { Fieldset } from 'primereact/fieldset';
import { InputNumber } from 'primereact/inputnumber';
import { mask } from 'primereact/utils';
import 'primeicons/primeicons.css';
import Select from 'react-select'
import './styles.css';
//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { useForm, Controller } from 'react-hook-form';
import { axiosApi } from '../../../services/axios';
import { useNavigate } from 'react-router-dom'
import ListaProdutos from '../includes_ordens_servico/produtos'
import ListaServicos from '../includes_ordens_servico/servicos'
import ListaPagamentos from '../includes_ordens_servico/pagamentos'
import { Card } from '@mui/material';

import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
function ListaVendaSobDemanda() {
  const { periodo } = useContext(AuthContext)
  //STATES PARA FUNCIONAMENTO GERAL DA PAGINA

   //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
   const navigate = useNavigate()

  const [loading, setLoading] = useState(false);

  //REQUISIÇÃO DOS REGISTROS DO BANCO DE DADOS-------------------------------------------------------------------|
  //state
  const [registros, setRegistros] = useState([]);

  const [listaClientes, setListaClientes] = useState([]);
  const [listaProdutos, setListaProdutos] = useState([]);
  const [listaServicos, setListaServicos] = useState([]);

  //requisisção 
  useEffect(() => {
    //inicia animacao de carregamento
    setLoading(true);
    //axiosApi.get("/vendas_sob_demanda/"+periodo[0].toJSON()+"/"+periodo[1].toJSON())
    axiosApi.get("/vendas_sob_demanda")
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


  //requisisção lista de produtos 
  useEffect(() => {
    //inicia animacao de carregamento
    setLoading(true);
    axiosApi.get("/produtos")
      .then((response) => {
        setListaProdutos(response.data)
      })
      .catch(function (error) {
      });
    //finaliza animacao de carregamento
    setLoading(false)
    //inicar o recurso de pesquisa da tabela
    initFilters1();
  }, [])

  //requisisção lista de produtos 
  useEffect(() => {
    //inicia animacao de carregamento
    setLoading(true);
    axiosApi.get("/clientes")
      .then((response) => {
        setListaClientes(response.data)
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
    { field: 'id', header: 'ident.' },
    { field: 'numero', header: 'Número' },
    { field: 'nome', header: 'Cliente' },
    { field: 'valor_produtos', header: 'Parcial produtos' },
    { field: 'valor_servicos', header: 'Parcial serviços' },
    { field: 'custo_produtos', header: 'Custo produtos' },
    { field: 'custo_servicos', header: 'Custo serviços' },
    { field: 'data_venda', header: 'Data venda' },
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


  const op = useRef(null);
  const rightContents = (
    <React.Fragment>
      <InputText value={globalFilterValue1} icon="pi pi-search" onChange={onGlobalFilterChange1} placeholder="Filtrar registros" />
      <Button icon="pi pi-plus" onClick={() => openNew(true)} className='p-button-outlined p-button-success' />
      <Button type="button" icon="pi pi-chevron-down" iconPos="right" onClick={(e) => op.current.toggle(e)} aria-haspopup aria-controls="overlay_panel" className="p-button-outlined p-button-info " />

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
  const [dadosRegistro, setDadosRegistro] = useState([]);
  const [visibleRight, setVisibleRight] = useState(false);
  const [visibleFullScreen, setVisibleFullScreen] = useState(false);
  const [tipoPessoa, setTipoPessoa] = useState('fisica');
  const [checked2, setChecked2] = useState(false);
  const [mask, setMask] = useState("999.999.999-99");
  const { register, handleSubmit, reset, setValue/*, formStates:{erros}*/ } = useForm();

  //funcao alterar mascara documento e tipo de pessoa
  const changeMsk = (value) => {
    if (value) {
      setMask('999.999.999-99')
      setTipoPessoa('fisica')
    } else {
      setMask('99.999.999/9999-99')
      setTipoPessoa('fisica')
    }
  }

  const [listaProduto, setListaProduto] = useState([]) //esse estate é utilizado no envio do formulario
  const [listaServico, setListaServico] = useState([])
  const [listaPagamento, setListaPagamento] = useState([])

  const [somaFaturamento, setSomaFaturamento] = useState();

  const objListaProdutosSelecionados = r => {
    setListaProduto(r)
    calculoFaturamento()
  }
  const objListaServicosSelecionados = r => {
    setListaServico(r)
    calculoFaturamento()
  }
  const objListaPagamentosRecebidos = r => {
    setListaPagamento(r)
    calculoFaturamento()
  }

  const calculoFaturamento = () => {
    setSomaFaturamento((listaProduto.somaVenda + listaServico.somaVenda))

  }
  //envio do formulario CRUD
  const veonSubmitVendasSobDemanda = (formContent) => {
    formContent.tipo = '2'
    let _registros = [...registros];
    let _registro = { ...formContent };
  
      axiosApi.post("/ordens_servico", formContent)
        .then((response) => {
          _registro.id = response.data.id
          _registros.push(_registro);
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Cliente cadastrado', life: 3000 });
          setRegistros(_registros);
          setregistro(emptyregistro);
          reset()
          setVisibleRight(false)

        })
        .catch(function (error) {
        });
  };

 //envio do formulario CRUD
 const vendasSobDemanda = (next) => {
 const  formContent={}
  formContent.id = inPreview.id
  formContent.listaProdutos = listaProduto.lista
  formContent.listaServicos = listaServico.lista
  formContent.tipo = '2'
  let _registros = [...registros];
  let _registro = { ...formContent };
    axiosApi.patch("/ordens_servico", formContent)
      .then((response) => {
        let _registros = [...registros];
        let _registro = { ...response.data };
        const index = findIndexById(response.data.id);
        _registros[index] = _registro;
        setRegistros(_registros);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'registro Updated', life: 3000 });
        reset()
        setVisibleRight(false)

        if(next){
         navigate('/pagamentos/'+ _registro.id)
        }
      })
      .catch(function (error) {
        toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
      });
 }


  const [inPreview, setInPreview] = useState([]);
  const [dadosClientes, setDadosClientes] = useState([]);

  //funcao preenchimento do formulario para edicao 
  const editregistro = (registro) => {
    calculoFaturamento()
    setInPreview(registro);

    axiosApi.get("/clientes/" + registro.cliente_id)
      .then((response) => {
        setDadosClientes(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });
    setVisibleFullScreen(true);
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
  const hiddenFullScreen = () => {
    setVisibleFullScreen(false)
    setInPreview('')
    reset()
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
    axiosApi.delete("/ordens_servico/" + registro.id)
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
  //envio do formulario CRUD


  const headerFullScreen = (
    <React.Fragment>
      <div className='w-os-header'>
        <h3 style={{ color: 'WHITE' }}>ORDEM SE SERVIÇO Nº {inPreview.id}</h3>
      </div>
    </React.Fragment>

  )

  const selecaoCliente = (value) => {
    const cliente = listaClientes.find((element) => element['id'] == value);

    setValue('cliente_id', cliente.id)


  }


  return (
    <>
     <div className="card">
   
     </div>
      <Toast ref={toastBR} position="bottom-right" />
      <Sidebar className='w-sidebar-right' header={<h3>Cria uma ordem de serviço</h3>} visible={visibleRight} position="right" blockScroll onHide={() => setVisibleRight(false)} style={{ width: '30em' }}>
        <div className="card w-card">

          <form onSubmit={handleSubmit(veonSubmitVendasSobDemanda)} className="p-fluid w-form" >
            <InputText hidden {...register("id")} />

            <div className="p-fluid grid">

              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Nº de referência:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-info-circle"></i>
                  </span>
                  <InputText {...register("numero")} />
                </div>
              </div>

              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Selecione um cliente:</label>
                <div className="p-inputgroup w-inputgroup-select">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <Select
                    options={listaClientes.map(sup => ({ value: sup.id, label: sup.nome }))}
                    onChange={(e) => { selecaoCliente(e.value) }}
                    placeholder=''
                  />
                </div>
              </div>
              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Data de inicio/venda:</label>
                <div className="p-inputgroup "> 
                  <span className="p-inputgroup-addon">
                    <i className="pi  pi-calendar"></i>
                  </span>
                  <Calendar  touchUI {...register("data_venda")} />
                </div>
              </div>
              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Observações:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-align-right"></i>
                  </span>
                  <InputText {...register("observacao")} />
                </div>
              </div>
              <div className="field w-field col-12 md:col-12">
                <Button type="submit" label="Submit" className="w-form-button" icon="pi pi-save" iconPos="right" />
              </div>
            </div>


          </form>
        </div>
      </Sidebar>
      <Sidebar className='w-os-sidebarFull' visible={visibleFullScreen} header={headerFullScreen} fullScreen onHide={() => hiddenFullScreen()} >

        <form onSubmit={handleSubmit(veonSubmitVendasSobDemanda)} className="p-fluid" >

          <div className='w-os-body-gridInfo'>
            <div className="grid">
              <div className="col-12 md:col-4 lg:col-4">
                <div className="w-os-body-gridInfo-dados">
                  <div class="flex align-items-center border-bottom-1 surface-border surface-overlay w-full ">
                    <p class="w-4 text-left font-bold mr-3">Inicio:</p>
                    <p class="text-lg w-8">{inPreview.data_registro}</p>
                  </div>
                  <div class="flex align-items-center border-bottom-1 surface-border surface-overlay w-full ">
                    <p class="w-4 text-left font-bold mr-3">Cliente:</p>
                    <p class="text-lg w-8">{dadosClientes.nome}</p>
                  </div>
                  <div class="flex align-items-center border-bottom-1 surface-border surface-overlay w-full ">
                    <p class="w-4 text-left font-bold mr-3">Contato:</p>
                    <p class="text-lg w-8">{dadosClientes.telefone}</p>
                  </div>
                </div>
              </div>

              <div className="col-12 md:col-2 lg:col-2">
                <div className="p-3 w-os-body-gridInfo-quadros">
                  <div className="flex justify-content-between mb-3">
                    <div>
                      <span className="block text-500 font-medium mb-3 w-os-body-gridInfo-quadros-titulo">Produtos utiizados</span>
                      <div className="font-medium text-xl w-os-body-gridInfo-quadros-valores">{'R$:' + listaProduto.somaVenda}</div>
                    </div>
                    <div className="flex align-items-center justify-content-center w-os-body-gridInfo-quadros-icons" style={{ width: '2.5rem', height: '2.5rem' }}>
                      <i className="pi pi-money-bill"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 md:col-2 lg:col-2">
                <div className="p-3 w-os-body-gridInfo-quadros">
                  <div className="flex justify-content-between mb-3">
                    <div>
                      <span className="block text-500 font-medium mb-3 w-os-body-gridInfo-quadros-titulo">Serviços executado</span>
                      <div className="font-medium text-xl w-os-body-gridInfo-quadros-valores">{'R$:' + listaServico.somaVenda}</div>
                    </div>
                    <div className="flex align-items-center justify-content-center w-os-body-gridInfo-quadros-icons" style={{ width: '2.5rem', height: '2.5rem' }}>
                      <i className="pi pi-money-bill"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 md:col-2 lg:col-2">
                <div className="p-3 w-os-body-gridInfo-quadros">
                  <div className="flex justify-content-between mb-3">
                    <div>
                      <span className="block text-500 font-medium mb-3 w-os-body-gridInfo-quadros-titulo">Pagamentos Recebidos</span>
                      <div className="font-medium text-xl w-os-body-gridInfo-quadros-valores">{'R$:' + listaPagamento.somaPagamentos}</div>
                    </div>
                    <div className="flex align-items-center justify-content-center w-os-body-gridInfo-quadros-icons" style={{ width: '2.5rem', height: '2.5rem' }}>
                      <i className="pi pi-money-bill"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 md:col-2 lg:col-2">
                <div className="p-3 w-os-body-gridInfo-quadros-principal">
                  <div className="flex justify-content-between mb-3">
                    <div>
                      <span className="block text-500 font-medium mb-3 w-os-body-gridInfo-quadros-titulo">Valor total da OS</span>
                      <div className="font-medium text-xl w-os-body-gridInfo-quadros-valores">{'R$:' + somaFaturamento}</div>
                    </div>
                    <div className="flex align-items-center justify-content-center w-os-body-gridInfo-quadros-icons" style={{ width: '2.5rem', height: '2.5rem' }}>
                      <i className="pi pi-money-bill"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-os-body-gridConteudo'>
            <div className="grid">
              <div className="col-10">
                <Accordion  multiple activeIndex={[0,1,2]} className='w-os-body-gridConteudo-accordion'>
                  <AccordionTab header="Produtos utilizados" className='w-os-body-gridConteudo-accordion-tab p-accordion-tab-active' >
                    <ListaProdutos receberPropsfilhoProdutos={objListaProdutosSelecionados} id={inPreview.id} />
                  </AccordionTab>
                  <AccordionTab header="Serviços realizados" className='w-os-body-gridConteudo-accordion-tab p-accordion-tab-active'>
                    <ListaServicos ReceberPropsfilhoServicos={objListaServicosSelecionados} id={inPreview.id} />
                  </AccordionTab>
                  <AccordionTab header="Pagamentos recebidos" className='w-os-body-gridConteudo-accordion-tab p-accordion-tab-active'>
                    <ListaPagamentos ReceberPropsfilhoPagamentos={objListaPagamentosRecebidos} id={inPreview.id} />
                  </AccordionTab>

                </Accordion>


              </div>
              <div className="col-2 relative  border-round ">

                <div class="block bg-primary font-bold text-center p-2 mb-12 mt-3">
                  <Button type='button' label="Salvar " icon="pi pi-save" iconPos="right" onClick={(e)=>{vendasSobDemanda(false)}}/>
                </div>

                <div class="block bg-primary font-bold text-center p-2  mb-12 mt-3">
                    <Button type='button' label="Finalizar venda" icon="pi pi-check" iconPos="right" onClick={(e)=>{vendasSobDemanda(true)}}/>
                </div>
              </div>

            </div>
          </div>
        </form>

      </Sidebar>
      <Toast ref={toast} />
      <div className="card">

        <DataTable value={registros}
          filters={filters1}
          ref={dt}
          stateStorage="local" stateKey="dt-state-demo-local"
          scrollable scrollHeight="400px"
          loading={loading}
          scrollDirection="both"
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

export default ListaVendaSobDemanda