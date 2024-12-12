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
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { mask } from 'primereact/utils';
import 'primeicons/primeicons.css';
import Select from 'react-select'

//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { useForm, Controller } from 'react-hook-form';
import { axiosApi } from '../../../services/axios';


function Tarifas(props) {


  const toast = useRef(null);
  //REQUISIÇÃO DOS REGISTROS DE Tarifas NO BANCO DE DADOS-------------------------------------------------------------------|
  //state
  const [registroTarifas, setregistroTarifas] = useState('');// lista dos Tarifas já inseridos


  //requisisção 
  useEffect(() => {
    axiosApi.get("/maquina_cartoes/" + props.id)
      .then((response) => {
        if (response.data.ListaTarifas) {
          updateTarifas(response.data.ListaTarifas)// funcao para controle das acoes envolvendo a lista de Tarifas isneridos
        }

      })
      .catch(function (error) {
      });
    //inicar o recurso de pesquisa da tabela
    initFilters1();

  }, [])

  //-------------------------------------------------------------------------------------------------------------|

  //FUNCAO QUE ENVIA AS INFOMRACOES PARA OS COMPONENTES PAI POR MEIO DE PROPS -----------------------------------|

  const updateTarifas = (lista) => {
    setregistroTarifas(lista) //carrega os dados da lista no state da pagina

    const somaVenda = lista.reduce(function (acumulador, valorAtual,) {
      return acumulador + parseFloat(valorAtual.preco_venda);
    }, 0);
    const somaCusto = lista.reduce(function (acumulador, valorAtual,) {
      return acumulador + parseFloat(valorAtual.preco_venda);
    }, 0);

    var objListaTarifas = new Object()
    objListaTarifas.lista = lista
    props.receberPropsfilhoCartoes(objListaTarifas) //enviar as informacoes para o componete pai
  }
  //-------------------------------------------------------------------------------------------------------------|

  //OPÇÃO DE FILTRO POR PESQUISA -------------------------------------------------------------------------------|
  //states
  const [filters1, setFilters1] = useState(null);
  const [globalFilterValue1, setGlobalFilterValue1] = useState('');

  //funcao de iniciar filtro acionado na requisicao dos registroTarifano banco de dados
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

  //ESTRUTURA DA TABELA DE DADOS ---------------------------------------------------------------------------------|

  //componentes a direita do cabeçalho
  const openNew = () => {
    setVisibleRight(true)
    setregistroTarifa(emptyregistroTarifa);
  }

  const [activeIndex, setActiveIndex] = useState(null);

  const op = useRef(null);
  const rightContents = (
    <React.Fragment>
      <InputText value={globalFilterValue1} icon="pi pi-search" onChange={onGlobalFilterChange1} placeholder="Filtrar registroTarifas" />
      <Button icon="pi pi-plus" type='button' onClick={() => openNew(true)} className='p-button-outlined p-button-success' />
    </React.Fragment>
  );
  //cabecalho
  const header = (
    <div className="table-header" >
      <Toolbar right={rightContents} />
    </div>
  );

  //linhas opçoes
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi pi-trash" className="p-button-rounded p-button-secondary p-button-text" onClick={() => delete confirmDeleteregistroTarifa(rowData)} />
      </React.Fragment>
    );
  }
  //--------------------------------------------------------------------------------------------------------------|

  //CRUD ---------------------------------------------------------------------------------------------------------|

  //states
  const [id, setId] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();


  //envio do formulario CRUD
  const onSubmit = (formContent) => {
    if (formContent.custo.trim()) {
      let _registroTarifas = [...registroTarifas];
      let _registroTarifa = { ...formContent };
      _registroTarifas.push(_registroTarifa);
      setregistroTarifa(emptyregistroTarifa);
      updateTarifas(_registroTarifas)
      reset()
      setVisibleRight(false)
      toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Tarifa inserida', life: 3000 });
    }
  }

  //delete registroTarifa
  let emptyregistroTarifa = {
    id: null
  };
  const [registroTarifa, setregistroTarifa] = useState(emptyregistroTarifa);
  const [deleteregistroTarifaDialog, setDeleteregistroTarifaDialog] = useState(false);
  // funcao para mostrar alerta de confimação pelo usuario
  const confirmDeleteregistroTarifa = (registroTarifa) => {
    setregistroTarifa(registroTarifa);
    setDeleteregistroTarifaDialog(true);
  }
  //funcao ocultar/cancelar alerta de confirmação pelo usuario
  const hideDeleteregistroTarifaDialog = () => {
    setDeleteregistroTarifaDialog(false);
  }

  //funcao que deleta o registroTarifa do banco de dados e da tabela
  const deleteregistroTarifa = () => {
    let _registroTarifas = registroTarifas.filter(val => val.id !== registroTarifa.id);
    setregistroTarifa(emptyregistroTarifa);
    setDeleteregistroTarifaDialog(false);
    updateTarifas(_registroTarifas)
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Tarifa removido', life: 3000 });
  }

  //botoes de acao do alerta de confirmacao pelo usuario
  const deleteregistroTarifaDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteregistroTarifaDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteregistroTarifa} />
    </React.Fragment>
  );


  //--------------------------------------------------------------------------------------------------------------|


  //EDICÇÃO DOS REGISTRO NA PROPRIA TABELA-------------------------------------------------------------------------|
  const isPositiveInteger = (val) => {
    let str = String(val);
    str = str.trim();
    if (!str) {
      return false;
    }
    str = str.replace(/^0+/, "") || "0";
    let n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
  }

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;

    switch (field) {
      case 'quantity':
      case 'price':
        if (isPositiveInteger(newValue))
          rowData[field] = newValue;
        else
          event.preventDefault();
        break;

      default:
        if (newValue.trim().length > 0)
          rowData[field] = newValue;
        else
          event.preventDefault();
        break;
    }
  }

  const onRowEditComplete1 = (e) => {
    let _registroTarifas = [...registroTarifas];
    let { newData, index } = e;

    _registroTarifas[index] = newData;

    setregistroTarifas(_registroTarifas);
    updateTarifas(_registroTarifas)
  }

  const cellEditor = (options) => {
    if (options.field === 'price')
      return priceEditor(options);
    else
      return textEditor(options);
  }

  const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  }

  const priceEditor = (options) => {
    return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="BRL" locale="pt-BR" />
  }


  const priceBodyTemplate = (rowData) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(rowData.preco_venda);
  }

  //--------------------------------------------------------------------------------------------------------------|


  return (
    <>
      <Toast ref={toast} position="bottom-right" />
      <Sidebar className='w-sidebar-right' header={<h3>Configurar tarifa cartões</h3>} visible={visibleRight} position="right" blockScroll onHide={() => setVisibleRight(false)} style={{ width: '30em'}}>
        <div className="card w-card">
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid w-form" >
            <div className="p-fluid grid">
              <div className="field w-field col-12 md:col-12">
                <div className="formgrid grid">
                  <label class="font-medium text-900">Bandeira cartão:</label>
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-building"></i>
                    </span>
                    <InputText {...register("bandeira")} />
                  </div>
                </div>
              </div>
              <div className="field w-field col-12 md:col-12">
                <div className="formgrid grid">
                  <label class="font-medium text-900">Custo da transação:</label>
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-building"></i>
                    </span>
                    <InputText {...register("custo")} />
                  </div>
                </div>
              </div>

              <div className="field w-field col-12 md:col-12">
                <div className="formgrid grid">
                  <label class="font-medium text-900">Prazo de recebimento:</label>
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-building"></i>
                    </span>
                    <InputText {...register("prazo")} />
                  </div>
                </div>
              </div>
              <div className="field w-field col-12 md:col-12">
                <Button type="submit" label="Cadastrar" className='w-form-button' icon='pi pi-save' iconPos='right' />
              </div>
            </div>  
          </form >
        </div >
      </Sidebar >
      <Toast ref={toast} />
      <div className="card" style={{ padding: '20px' }}>
      <div class="flex flex-row-reverse flex-wrap" style={{paddingRight:'10px'}}>
        <Button icon="pi pi-plus" type='button' onClick={() => openNew(true)} className='p-button-outlined p-button-success' />
          </div>
        <DataTable id='tabelaTarifasSelecionados' value={registroTarifas} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete1} responsiveLayout="scroll"
          filters={filters1}

          stripedRows
          resizableColumns
          columnResizeMode="fit" >
          <Column field="id" header="id" style={{ width: '20%' }} hidden></Column>
          <Column field="bandeira" header="Bandeira" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
          <Column field="custo" header="Custo" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
          <Column field="prazo" header="Prazo(dias)" Tarifa_qdade={'Tarifa_quantidade'} editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
          <Column rowEditor headerStyle={{ width: '10%', minWidth: '1rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
          <Column body={actionBodyTemplate} style={{ minWidth: '1rem' }}></Column>
        </DataTable>

      </div>

      <Dialog visible={deleteregistroTarifaDialog} style={{ width: '450px' }} header="Confirm  " modal footer={deleteregistroTarifaDialogFooter} onHide={hideDeleteregistroTarifaDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {registroTarifa && <span>Are you sure you want to delete <b>{registroTarifa.name}</b>?</span>}
        </div>
      </Dialog>
    </>

  );

}
export default Tarifas