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

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputNumber } from 'primereact/inputnumber';
import { mask } from 'primereact/utils';
import 'primeicons/primeicons.css';
import Select from 'react-select'

//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { useForm, Controller } from 'react-hook-form';
import { axiosApi } from '../../../services/axios';


function SelecaoProdutos(props) {


  const toast = useRef(null);
  //REQUISIÇÃO DOS REGISTROS DE PRODUTOS NO BANCO DE DADOS-------------------------------------------------------------------|
  //state
  const [registroProdutos, setregistroProdutos] = useState([]);// lista dos produtos já inseridos
  const [produtos, setProdutos] = useState([]); //state que armazena os produtos dos formularios
  useEffect(() => {
    axiosApi.get("/produtos")
      .then((response) => {
        setProdutos(response.data)
      })
      .catch(function (error) {
      });
    //inicar o recurso de pesquisa da tabela
    initFilters1();
  }, [])

  //requisisção 
  useEffect(() => {
    axiosApi.get("/ordens_servico/" + props.id)
      .then((response) => {
        if (response.data.ListaProdutosSelecionados) {
          updateProdutos(response.data.ListaProdutosSelecionados)// funcao para controle das acoes envolvendo a lista de produtos isneridos
        }
      })
      .catch(function (error) {
      });
    //inicar o recurso de pesquisa da tabela
    initFilters1();

  }, [])

  //-------------------------------------------------------------------------------------------------------------|

  //FUNCAO QUE ENVIA AS INFOMRACOES PARA OS COMPONENTES PAI POR MEIO DE PROPS -----------------------------------|

  const updateProdutos = (lista) => {
    setregistroProdutos(lista) //carrega os dados da lista no state da pagina

    const somaVenda = lista.reduce(function (acumulador, valorAtual,) {
      return acumulador + parseFloat(valorAtual.preco_venda * valorAtual.quantidade);
    }, 0);
    const somaCusto = lista.reduce(function (acumulador, valorAtual,) {
      return acumulador + parseFloat(valorAtual.preco_custo * valorAtual.quantidade);
    }, 0);

    var objListaProdutosSelecionados = new Object()
    objListaProdutosSelecionados.lista = lista
    objListaProdutosSelecionados.somaVenda = somaVenda
    objListaProdutosSelecionados.somaCusto = somaCusto
    objListaProdutosSelecionados.quantidade = lista.length
    props.receberPropsfilhoProdutos(objListaProdutosSelecionados) //enviar as informacoes para o componete pai
  }
  //-------------------------------------------------------------------------------------------------------------|

  //OPÇÃO DE FILTRO POR PESQUISA -------------------------------------------------------------------------------|
  //states
  const [filters1, setFilters1] = useState(null);
  const [globalFilterValue1, setGlobalFilterValue1] = useState('');

  //funcao de iniciar filtro acionado na requisicao dos registroProduto no banco de dados
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
    setregistroProduto(emptyregistroProduto);
  }

  const [activeIndex, setActiveIndex] = useState(null);

  const op = useRef(null);
  const rightContents = (
    <React.Fragment>
      <InputText value={globalFilterValue1} icon="pi pi-search" onChange={onGlobalFilterChange1} placeholder="Filtrar registroProdutos" />
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
        <Button icon="pi pi pi-trash" className="p-button-rounded p-button-secondary p-button-text" onClick={() => delete confirmDeleteregistroProduto(rowData)} />
      </React.Fragment>
    );
  }
  //--------------------------------------------------------------------------------------------------------------|

  //CRUD ---------------------------------------------------------------------------------------------------------|

  //states
  const [id, setId] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();

  const selecaoPoduto = (id) => {
    axiosApi.get("/produtos/" + id)
      .then((response) => {
        setValue('preco_venda', response.data.preco_venda)
        setValue('id', response.data.id)
        setValue('preco_custo', response.data.preco_custo)
        setValue('estoque_atual', response.data.estoque_atual)
        setValue('referencia', response.data.referencia)
        setValue('nome', response.data.nome)
      })
      .catch(function (error) {
      });

  }






  //envio do formulario CRUD
  const onSubmitProdutos = (formContent) => {
    console.log(formContent)
    if (formContent.preco_venda.trim()) {
      let _registroProdutos = [...registroProdutos];
      let _registroProduto = { ...formContent };
      _registroProduto.id = formContent.id
      _registroProdutos.push(_registroProduto);
      //setregistroProduto(emptyregistroProduto); vou excluir, nao vi necessidade
      updateProdutos(_registroProdutos)
      reset()
      setVisibleRight(false)
      toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Produto inserido', life: 3000 });
    }
  }

  //delete registroProduto
  let emptyregistroProduto = {
    id: null
  };
  const [registroProduto, setregistroProduto] = useState(emptyregistroProduto);
  const [deleteregistroProdutoDialog, setDeleteregistroProdutoDialog] = useState(false);
  // funcao para mostrar alerta de confimação pelo usuario
  const confirmDeleteregistroProduto = (registroProduto) => {
    setregistroProduto(registroProduto);
    setDeleteregistroProdutoDialog(true);
  }
  //funcao ocultar/cancelar alerta de confirmação pelo usuario
  const hideDeleteregistroProdutoDialog = () => {
    setDeleteregistroProdutoDialog(false);
  }

  //funcao que deleta o registroProduto do banco de dados e da tabela
  const deleteregistroProduto = () => {
    let _registroProdutos = registroProdutos.filter(val => val.id !== registroProduto.id);
    setregistroProduto(emptyregistroProduto);
    setDeleteregistroProdutoDialog(false);
    updateProdutos(_registroProdutos)
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Produto removido', life: 3000 });
  }

  //botoes de acao do alerta de confirmacao pelo usuario
  const deleteregistroProdutoDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteregistroProdutoDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteregistroProduto} />
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
    let _registroProdutos = [...registroProdutos];
    let { newData, index } = e;

    _registroProdutos[index] = newData;

    setregistroProdutos(_registroProdutos);
    updateProdutos(_registroProdutos)
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
      <Sidebar className='w-sidebar-right' header={<h3>Selecionar produtos</h3>} visible={visibleRight} position="right" blockScroll onHide={() => setVisibleRight(false)} style={{ width: '30em' }}>
        <div className="card w-card">
          <form onSubmit={handleSubmit(onSubmitProdutos)} className="p-fluid w-form" >
            <InputText placeholder='id ' hidden {...register("id")} />
            <div className="p-fluid grid">

              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Selecione um produto:</label>
                <div className="p-inputgroup w-inputgroup-select">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-box"></i>
                  </span>
                  <Select
                    options={produtos.map(sup => ({ value: sup.id, label: sup.nome }))}
                    onChange={(e) => { selecaoPoduto(e.value) }}
                    placeholder=''
                  />
                </div>
              </div>
              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Cód./referência:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-info-circle"></i>
                  </span>
                  <InputText {...register("referencia")} disabled />
                </div>
              </div>
              <div className="field w-field col-12 md:col-12" hidden>
                <label class="font-medium text-900">Descrição do produto:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-info-circle"></i>
                  </span>
                  <InputText {...register("nome")} disabled />
                </div>
              </div>

              <div className="field w-field col-4 md:col-4">
                <label class="font-medium text-900">Estoque atual:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-info-circle"></i>
                  </span>
                  <InputText {...register("estoque_atual")} disabled />
                </div>
              </div>
              <div className="field w-field col-4 md:col-4">
                <label class="font-medium text-900">Preço de custo:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-info-circle"></i>
                  </span>
                  <InputText {...register("preco_custo")} disabled />
                </div>
              </div>
              <div className="field w-field col-4 md:col-4">
                <label class="font-medium text-900">Preço de venda:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-info-circle"></i>
                  </span>
                  <InputText {...register("preco_venda")} disabled />
                </div>
              </div>
              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Qual a quantidade?:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-sort-numeric-down"></i>
                  </span>
                  <InputText {...register("quantidade")} />
                </div>
              </div>
              <div className="field w-field col-12 md:col-12">
              <Button type="submit" label="Submit" className="w-form-button" icon="pi pi-sabe" iconPos='right' />
              </div>
            </div>
          </form>
        </div>
      </Sidebar>
      <Toast ref={toast} />
      <div className="card" style={{ padding: '20px' }}>
        <DataTable id='tabelaProdutosSelecionados' value={registroProdutos} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete1} responsiveLayout="scroll"
          filters={filters1}
          header={header}
          stripedRows
          resizableColumns
          columnResizeMode="fit" >
          <Column field="id" header="id" name={'produto_id'} style={{ width: '20%' }} hidden></Column>
          <Column field="referencia" header="Cód/referê ncia" style={{ width: '20%' }}></Column>
          <Column field="nome" header="Nome do produto"  style={{ width: '20%' }}></Column>
          <Column field="preco_custo" header="Preo de custo" editor={(options) => textEditor(options)} style={{ width: '20%' }} hidden></Column>
          <Column field="quantidade" header="Qdade" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
          <Column field="preco_venda" header="Preço de venda" body={priceBodyTemplate} editor={(options) => priceEditor(options)} style={{ width: '20%' }}></Column>
          <Column rowEditor headerStyle={{ width: '10%', minWidth: '1rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
          <Column body={actionBodyTemplate} style={{ minWidth: '1rem' }}></Column>
        </DataTable>

      </div>

      <Dialog visible={deleteregistroProdutoDialog} style={{ width: '450px' }} header="Confirm  " modal footer={deleteregistroProdutoDialogFooter} onHide={hideDeleteregistroProdutoDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {registroProduto && <span>Are you sure you want to delete <b>{registroProduto.name}</b>?</span>}
        </div>
      </Dialog>
    </>

  );

}
export default SelecaoProdutos