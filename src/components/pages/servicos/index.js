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
import { Panel } from 'primereact/panel';
import { Divider } from 'primereact/divider';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import 'primeicons/primeicons.css';

//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { axiosApi } from '../../../services/axios';
import { Link } from 'react-router-dom';


//IMPORTANDO COMPONENTES PERSONALIZADOS
import ServicosCru from './form-cru';
import ServicosOS from './form-os';
import FormHistorico from './form-historico';
import DataviewConteudo from './dataview-conteudo';
import VisualizarOS from './view-os';
import VisualizarServico from './view-servico';

const Servicos = () => {

  //STATES E INSTANCIAS DA PAGINA -----------------------------------------------------------------------------|
  const [servicoAtualOS, setServicoAtualOS] = useState(null);
  const [visibleMenuRight, setVisibleMenuRight] = useState(false);
  const nomePagina = 'Serviços em Aberto'
  const [registros, setRegistros] = useState(null);
  const [registrosSemFiltros, setRegistrosSemFiltros] = useState(null);
  const [layout, setLayout] = useState('list');
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const rows = useRef(10);
  const datasource = useRef(null);
  const isMounted = useRef(false);
  const toastBR = useRef(null);
  //------------------------------------------------------------------------------------------------------------|

  const buscarRegistros = () => {
    setLoading(true)
    setTimeout(() => {
      isMounted.current = true;
      axiosApi.get("/list_service")
        .then((response) => {
          setRegistrosSemFiltros(response.data)
          datasource.current = response.data
          setTotalRecords(response.data.length)
          setRegistros(datasource.current.slice(0, rows.current))
          setLoading(false)
        })
        .catch(function (error) {
        });
      setLoading(false)
    }, 2000);
  }
  //CHAMADA DE REQUISIÇÃO E CARREGAMENTO DAS FUNCOES DO DATAVIEW DO FRAMEWORK ----------------------------------|


  useEffect(() => {
    buscarRegistros()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isMounted.current) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

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
    }, 2000);
  }
  //------------------------------------------------------------------------------------------------------------|


  //FUNÇÃO PARA REFRESH DA LISTA DE CADASTRO DA PAGINA-----------------------------------------------------------|
  const refresh = () => {
    buscarRegistros()
  }
  //--------------------------------------------------------------------------------------------------------------|

  //OPÇÃO DE FILTRO/PESQUISA -----------------------------------------------------------------------------------|
  //states
  const [filterValue, setFilterValue] = useState(null);
  //funcao ao mudar o campo do filtro
  const filterChange = (e) => {
    let value = e.target.value;
    let _registros = { ...registrosSemFiltros };
    const _filtro = Object.values(_registros).filter((item => item.nome.toLowerCase().includes(value.toLowerCase())))
    datasource.current = Object.values(_filtro)
    setTotalRecords(_filtro.length)
    setRegistros(datasource.current.slice(0, rows.current))
  }

  //------------------------------------------------------------------------------------------------------------|


  //LAYOUT DA PAGINA -------------------------------------------------------------------------------------------|

  //cabecalho
  const op = useRef(null);
  const leftContents = (
    <span>{nomePagina}</span>
  );

  const rightContents = (
    <React.Fragment>
      <Button icon="pi pi-refresh" onClick={() => refresh()} className='p-button-outlined p-button-info' />
      <InputText value={filterValue} icon="pi pi-search" onChange={filterChange} placeholder="Filtrar..." style={{ marginLeft: '10px' }} />
      <Button icon="pi pi-th-large" onClick={() => setVisibleMenuRight(true)} className='p-button-outlined p-button-primary' />
    </React.Fragment>
  );

  const header = (
    <div className="table-header" >
      <Toolbar left={leftContents} right={rightContents} />
    </div>
  );

  //------------------------------------------------------------------------------------------------------------|

  //LAYOUT DOS DATAVIEW/CARDS ----------------------------------------------------------------------------------|

  //cabeçalho dataview
  const headerCard = (data) => {
    return (
      <div>
        <span className='p-card-title card-dataview-header-title'>{data.nome}</span>
        <span className='p-card-subtitle card-dataview-header-subtitle'>{new Date(data.inicio).toLocaleDateString("pt-br") + " - " + new Date(data.termino).toLocaleDateString("pt-br")}</span>
      </div>
    )
  }

  //conteúdo dataview
  const renderListItem = (data) => {
    return (
      <Card className='relative card-dataview' title={headerCard(data)} style={{ width: '100em', height: 'auto' }} >
        <div class="absolute top-0 right-0 flex align-items-center justify-content-center card-dataview-content ">
          <div class="text-right card-dataview-buttons" >
            <Button icon="pi pi-chart-line" className="p-button-rounded p-button-success p-button-outlined p-button-sm" onClick={e => { viewRegistro(data) }}/>
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-outlined p-button-sm" aria-label="Editar" onClick={e => { editeRegistro(data) }} />
          </div>
        </div>
        <Panel className='flex flex-column-reverse card-dataview-body-panel-os' toggleable collapsed style={{ border: 'none' }}>
          <DataviewConteudo data={data} className='card-dataview-body-panel-os-content' style={{ border: 'none' }} />
        </Panel>
        <div class="text-left card-dataview-body-obs">
          {data.observacoes ? data.observacoes : "Sem orientações"}
        </div>
        <div class="text-center card-dataview-footer-opcoes">
          <div class="flex justify-content-end flex-wrap">
            <div class="flex align-items-center justify-content-center">
              <span className="p-buttonset">
                <Button label="Criar OS" className='p-button-primary card-dataview-footer-opcoes-btn' icon="pi pi-plus" onClick={() => newOS(data)} />
                <Button label="Cancelar" className='p-button-danger card-dataview-footer-opcoes-btn' icon="pi pi-times" onClick={() => delete confirmDeleteregistro(data)} />
                <Button label="Finalizar" className='p-button-success card-dataview-footer-opcoes-btn' icon="pi pi-check" onClick={() => finalizar(data)} />
              </span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  //template do dataview
  const itemTemplate = (product) => {
    setServicoAtualOS(product)
    if (!product) {
      return;
    }
    return renderListItem(product);
  }

  //FORMULARIO CRUD ----------------------------------------------------------------------------------------------|
  //OBS: FORMULARIO É IMPORTADO COMO COMPONENTE PERSONALIZADO

  //states
  let emptyregistro = {
    id: null
  };
  const [registro, setRegistro] = useState(emptyregistro);
  const [registroServico, setRegistroServico] = useState([]);
  const [visibleCRUD, setVisibleCRUD] = useState(false);
  const [visibleServico, setVisibleServico] = useState(false);
  //função para novo adastro
  const openNew = () => {
    setRegistro(emptyregistro);
    setVisibleCRUD(true)
  }
  //função para cancelar um novo cadastro ou edição
  const closedNew = () => {
    setVisibleCRUD(false)
    setVisibleMenuRight(false)
  }
  //função para editar dados de um cadastro existente
  const editeRegistro = (registro) => {
    console.log(registro)
    let _registro = { ...registro };
    _registro.inicio = new Date(_registro.inicio)
    _registro.termino = new Date(_registro.termino)
    setRegistro(_registro)
    setVisibleCRUD(true)
  }
  const viewRegistro= (registro) => {
    setRegistroServico(registro)
    setVisibleServico(true)
  }
  //função que recebe os dados de um novo cadastro
  const recebidoDoFilhoPost = (registro) => {
    console.log(registro)
    let _registros = [...registros];
    let _registro = { ...registro };
    _registros.push(_registro);
    setRegistro(emptyregistro);
    setVisibleCRUD(false)
    setVisibleMenuRight(false)
  }
  //função que recebi os dados de um cadastro editado
  const recebidoDoFilhoPatch = (registro) => {
    let _registros = [...registros];
    let _registro = { ...registro };
    _registros.push(_registro);
    setRegistros(_registros);
    setRegistro(emptyregistro);
    setVisibleCRUD(false)
    setVisibleMenuRight(false)
  }
  const recebidoDoFilhoPostOS = (registro) => {
   // itemTemplate(servicoAtualOS)
    setVisibleOS(false)
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
  const finalizar = (data) => {
    axiosApi.patch("/service_finalized", data)
      .then((response) => {
        let _registros = registros.filter(val => val.id !== data.id);
        setRegistros(_registros);
        setDeleteregistroDialog(false);
        setRegistro(emptyregistro);
        toastBR.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Serviço finalizado', life: 3000 });
      })
      .catch(function (error) {
        toastBR.current.show({ severity: 'warn', summary: 'Pendência', detail: error.response.data.msg, life: 3000 });
      });
  }
  //--------------------------------------------------------------------------------------------------------------|
  //CANCELAMENTO DE UM SERVIÇO -----------------------------------------------------------------------------------|
  //states
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
  //função para popular state registro com o motivo do cancelamento do serviço
  const onInputChangeDelete = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _registro = { ...registro };
    _registro[`${name}`] = val;
    setRegistro(_registro);
  }
  //funcao que deleta o registro do banco de dados e da tabela
  const deleteregistro = () => {
    axiosApi.patch("/service_cancel/", registro)
      .then((response) => {
        let _registros = registros.filter(val => val.id !== registro.id);
        setRegistros(_registros);
        setDeleteregistroDialog(false);
        setRegistro(emptyregistro);
        toastBR.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Serviço cancelado', life: 3000 });

      })
      .catch(function (error) {
        toastBR.current.show({ severity: 'warn', summary: 'Pendência', detail: error.response.data.msg, life: 3000 });
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

  //VIEW OS ----------------------------------------------------------------------------------------------|
 
  //states
  let emptyregistroOS = {
    id: null
  };
  const [registroOS, setRegistroOS] = useState(emptyregistro);
  const [visibleOS, setVisibleOS] = useState(false);
  //função para novo adastro
  const newOS = (data) => {
    setRegistroOS(data);
    setVisibleOS(true)
  }
  //--------------------------------------------------------------------------------------------------------------|
  //MENSAGENS AO USUARIO------------------------------------------------------------------------------------------|

  const showSuccess = (detail) => {
    toastBR.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Usuário' + detail + ' cadastrada', life: 3000 });
  }
  //--------------------------------------------------------------------------------------------------------------|

  return (
    <>
      <Toast ref={toastBR} position="bottom-right" />
      <div className="dataview">
        <div className="card dataview-card" style={{ backgroundColor: 'withe' }}>
          <DataView value={registros} layout={layout} header={header}
            itemTemplate={itemTemplate} lazy paginator rows={rows.current}
            totalRecords={totalRecords} first={first} onPage={onPage} loading={loading} />
        </div>
      </div>
      <Sidebar className='w-sidebar-right w-sidebar-right-menu ' header={<h3>O que gostaria de fazer?</h3>} visible={visibleMenuRight} position="right" blockScroll onHide={() => setVisibleMenuRight(false)} style={{ width: '550px' }}>
        <div className="card w-card" >
          <Divider align="right" type="dashed">
            <b>Tarefas rápidas</b>
          </Divider>
          <div className="grid p-card-grid">
            <div className="col-fixed p-card-grid-col">
              <Link className='p-card-grid-col-link' onClick={() => openNew(true)} >
                <div className="grid nested-grid p-card-grid-col-link-grid">
                  <div className="grid p-card-grid-col-link-grid-grid">
                    <div className="col-10 p-card-grid-col-link-grid-grid-title">
                      Novo Serviço
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
          <Divider align="right" type="dashed">
            <b>Históricos e registros</b>
          </Divider>
          <div className="grid p-card-grid">
            <div className="col-fixed p-card-grid-col" style={{ height: '150px' }}>
              <div className="grid nested-grid p-card-grid-col-link-grid">
                <div className="grid p-card-grid-col-link-grid-grid">
                  <div className="col-10 p-card-grid-col-link-grid-grid-title">
                    Histórico serviços
                  </div>
                  <div className="col-2 p-card-grid-col-link-grid-grid-icon">
                    <i className="pi pi-history"></i>
                  </div>

                  <Inplace closable className='p-inplace-mini-form'>
                    <InplaceDisplay>
                      {<div className="col-12 p-card-grid-col-link-grid-grid-desc" >
                        Liste todo extrato de informações referente aos serviços realizados
                      </div>}
                    </InplaceDisplay>
                    <InplaceContent className='ola'>
                      <FormHistorico url={'/historico_servicos'} />
                    </InplaceContent>
                  </Inplace>
                </div>
              </div>
            </div>
            <div className="col-fixed p-card-grid-col" style={{ height: '150px' }}>
              <div className="grid nested-grid p-card-grid-col-link-grid">
                <div className="grid p-card-grid-col-link-grid-grid">
                  <div className="col-10 p-card-grid-col-link-grid-grid-title">
                    Histórico visitas
                  </div>
                  <div className="col-2 p-card-grid-col-link-grid-grid-icon">
                    <i className="pi pi-history"></i>
                  </div>

                  <Inplace closable className='p-inplace-mini-form'>
                    <InplaceDisplay>
                      {<div className="col-12 p-card-grid-col-link-grid-grid-desc" style={{ height: '100px' }}>
                        Liste todo extrato de informações referente as visitas realziadas
                      </div>}
                    </InplaceDisplay>
                    <InplaceContent className='ola'>
                      <FormHistorico url={'/historico_visitas'} />
                    </InplaceContent>
                  </Inplace>
                </div>
              </div>
            </div>
          </div>


          <Divider align="right" type="dashed">
            <b>Atalhos úteis</b>
          </Divider>
          <div className="grid p-card-grid">
            <div className="col-fixed p-card-grid-col">
              <Link className='p-card-grid-col-link' to={'/servicos/tickets_pendentes'}>
                <div className="grid nested-grid p-card-grid-col-link-grid">
                  <div className="grid p-card-grid-col-link-grid-grid">
                    <div className="col-10 p-card-grid-col-link-grid-grid-title">
                      Tickets pendentes
                    </div>
                    <div className="col-2 p-card-grid-col-link-grid-grid-icon">
                      <i className="pi pi-stopwatch"></i>
                    </div>
                    <div className="col-12 p-card-grid-col-link-grid-grid-desc">
                      Veja os tickets pendentes de aprovação ou retornados
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-fixed p-card-grid-col">
              <Link className='p-card-grid-col-link' to={'/financeiro/extratos'}>
                <div className="grid nested-grid p-card-grid-col-link-grid">
                  <div className="grid p-card-grid-col-link-grid-grid">
                    <div className="col-10 p-card-grid-col-link-grid-grid-title">
                      Extratos abertos
                    </div>
                    <div className="col-2 p-card-grid-col-link-grid-grid-icon">
                      <i className="pi pi-file"></i>
                    </div>
                    <div className="col-12 p-card-grid-col-link-grid-grid-desc">
                      Acompanhe os extratos de faturamento criados
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Sidebar>
      <Sidebar className='w-sidebar-right' header={<h3>{nomePagina.toUpperCase()}</h3>} visible={visibleCRUD} position="right" blockScroll onHide={() => closedNew()} style={{ width: '100em' }}>
      </Sidebar>
      <Sidebar className='w-sidebar-right w-sidebar-right ' header={<h3>Cadastrar Ordem de Serviço</h3>} visible={visibleOS} position="right" blockScroll dismissable={true} onHide={() => setVisibleOS(false)} style={{ width: '550px' }}>
      <ServicosOS registro={registroOS} filhoParaPaiPostOS={recebidoDoFilhoPostOS}/>
      </Sidebar>
      <Sidebar className='w-sidebar-right w-sidebar-right ' header={<h3>{'Detalhamento de serviço: '+registroServico.id}</h3>} visible={visibleServico} blockScroll fullScreen  onHide={() => setVisibleServico(false)}>
      <VisualizarServico registro={registroServico} filhoParaPaiPostOS={recebidoDoFilhoPostOS}/>
      </Sidebar>
      <Dialog className='w-dialog-delete' visible={deleteregistroDialog} style={{ width: '450px' }} modal footer={deleteregistroDialogFooter} onHide={hideDeleteregistroDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          <h3>Descreva o motivo do caneclamento deste serviço</h3>
          <div className="card w-card" style={{ margin: '0px', padding: "0px" }} >
            <div className="p-fluid w-form" style={{ margin: '0px', padding: "0px" }}>
              <div className="p-fluid grid">

                <div className="field w-field col-12 md:col-12">
                  <label class="font-medium text-900">Motivo do cancelamento:</label>
                  <div className="p-inputgroup w-inputgroup-select" style={{ marginTop: '0px' }}>
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-tag"></i>
                    </span>
                    <InputTextarea value={registro.motivo} onChange={(e) => onInputChangeDelete(e, 'motivo')} />
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

export default Servicos