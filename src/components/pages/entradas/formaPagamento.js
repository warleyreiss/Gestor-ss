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


function FormasPagamento(props) {


  const toast = useRef(null);
  //REQUISIÇÃO DOS REGISTROS DE Tarifas NO BANCO DE DADOS-------------------------------------------------------------------|
  //state
  const [registroTarifas, setregistroTarifas] = useState('');
  const [listaMaquininhas, setListaMaquininhas] = useState([]);
  const [listaBandeirasCartao, setlistaBandeirasCartao] = useState([]);
  const [disablePagamentoCartao, setDisablePagamentoCartao] = useState(true);
  //requisisção 
  useEffect(() => {
    axiosApi.get("/maquina_cartoes")
      .then((response) => {
        if (response.data.listaCartoes) {
          setListaMaquininhas(response.data.listaCartoes)
        }

      })
      .catch(function (error) {
      });

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

    var objDadosPagamento = new Object()
    objDadosPagamento.lista = lista
    props.receberPropsfilhoCartoes(objDadosPagamento) //enviar as informacoes para o componete pai
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
  const [valorPago, setValorPago] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  const [maquinaCartaoId, setMaquinaCartaoId] = useState(null);
  const [bandeiraCartao, setBandeiraCartao] = useState('');
  const [custoCartao, setCustoCartao] = useState('');
  const [prazoCartao, setPrazoCartao] = useState('');
  const [valorDesconto, setValorDesconto] = useState('0');
  const limparState = () => {
    setMaquinaCartaoId(null)
    setBandeiraCartao('')
    setCustoCartao('')
    setPrazoCartao('')
    setlistaBandeirasCartao([])
    setValorDesconto('0')
    setDisablePagamentoCartao(true)
  }
  const formas = [
    { value: 'CARTAO', label: 'CARTÃO' },
    { value: 'DINHEIRO', label: 'DINHEIRO EM ESPÉCIE' },
    { value: 'PIX', label: 'PIX' }
  ]

  const selecaoFormaPagamento = (value) => {
    setFormaPagamento(value)
    if (value == 'CARTAO') {
      setDisablePagamentoCartao(false)
    } else {
      limparState()
    }

  }
  const selecaoMaquinaCartao = (value) => {
    setMaquinaCartaoId(value)
    const cartao = listaMaquininhas.find((element) => element['id'] == value);
    setValue('maquina_cartao_id', cartao.id)
    if (cartao.tarifas) {
      setlistaBandeirasCartao(cartao.tarifas)
    } else {
      setlistaBandeirasCartao([])
    }

  }
  const selecaoBandeiraCartao = (value) => {
    const tarifa = listaBandeirasCartao.find((element) => element['bandeira'] == value);
    setBandeiraCartao(tarifa.bandeira)
    setCustoCartao(tarifa.custo)
    setPrazoCartao(tarifa.prazo)
    setValue('maquina_cartao_tarifas_bandeira', tarifa.bandeira)
    setValue('maquina_cartao_tarifas_custo', tarifa.custo)
    setValue('maquina_cartao_tarifas_prazo', tarifa.prazo)
  }
  //--------------------------------------------------------------------------------------------------------------|


  const dadosPagamentos = () => {
    const dados = {}
    dados.valor_pago = valorPago
    dados.valor_desconto = valorDesconto
    dados.forma_pagamento = formaPagamento
    dados.maquina_cartao_id = maquinaCartaoId
    dados.maquina_cartao_tarifas_bandeira = bandeiraCartao
    dados.maquina_cartao_tarifas_custo = custoCartao
    dados.maquina_cartao_tarifas_prazo = prazoCartao
    props.ReceberPropsfilhoFormaPagamentos(dados)
  }

  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid" >

        <div className="p-fluid grid">
        <div className="field w-field col-12 md:col-12">
            <label class="font-medium text-900">Desconto ofertado:</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-dollar"></i>
              </span>
              <Calendar {...register("data_recebimento")} value={ new Date()} />
            </div>
          </div>

          <div className="field w-field col-12 md:col-12">
            <label class="font-medium text-900">Desconto ofertado:</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-dollar"></i>
              </span>
              <InputText onChange={(e) => {setValorDesconto(e.target.value)}}/>
            </div>
          </div>
          <div className="field w-field col-12 md:col-12">
            <label class="font-medium text-900">Valor pago:</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-dollar"></i>
              </span>
              <InputText onChange={(e) => { setValorPago(e.target.value) }} mode="decimal" useGrouping={false} required />
            </div>
          </div>
          <div className="field w-field col-12 md:col-12">
            <label class="font-medium text-900">Forma de pagamento:</label>
            <div className="p-inputgroup w-inputgroup-select">
              <span className="p-inputgroup-addon">
                <i className="pi  pi-wallet"></i>
              </span>
              <Select
                options={formas.map(sup => ({ value: sup.value, label: sup.value }))}
                onChange={(e) => { selecaoFormaPagamento(e.value) }}
                placeholder=''
                required
              />
            </div>
          </div>
          <div className="field w-field col-6 md:col-6">
            <label class="font-medium text-900">Maquina cartão:</label>
            <div className="p-inputgroup w-inputgroup-select">
              <span className="p-inputgroup-addon">
                <i className="pi pi-calculator"></i>
              </span>
              <Select
                isDisabled={disablePagamentoCartao}
                options={listaMaquininhas.map(sup => ({ value: sup.id, label: sup.surname }))}
                onChange={(e) => { selecaoMaquinaCartao(e.value) }}
                placeholder=''
              />
            </div>
          </div>
          <div className="field w-field col-6 md:col-6">
            <label class="font-medium text-900">Bandeira do cartão:</label>
            <div className="p-inputgroup w-inputgroup-select">
              <span className="p-inputgroup-addon">
                <i className="pi pi-credit-card"></i>
              </span>
              <Select
                isDisabled={disablePagamentoCartao}
                options={listaBandeirasCartao.map(sup => ({ value: sup.bandeira, label: sup.bandeira }))}
                onChange={(e) => { selecaoBandeiraCartao(e.value) }}
                placeholder=''
              />
            </div>
          </div>
          <div className="field w-field col-12 md:col-12">
          <label class="font-medium text-900"></label>
            <Button type="button" label="Confimar" className="w-form-button" icon='pi pi-save' iconPos='right' onClick={dadosPagamentos} />
          </div>
        </div>

        <div hidden>
          <InputText  {...register("maquina_cartao_id")} disabled />
          <InputText  {...register("maquina_cartao_tarifas_bandeira")} disabled />
          <InputText {...register("maquina_cartao_tarifas_custo")} disabled />
          <InputText {...register("maquina_cartao_tarifas_prazo")} disabled />
        </div>

      </form >

    </>

  );

}
export default FormasPagamento