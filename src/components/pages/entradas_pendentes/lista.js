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

import { InputNumber } from 'primereact/inputnumber';
import { mask } from 'primereact/utils';
import 'primeicons/primeicons.css';

//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { useForm, Controller } from 'react-hook-form';
import { axiosApi } from '../../../services/axios';

import FormasPagamento from '../entradas/formaPagamento';

function ListaEntradasPendentes(props) {

  const toast = useRef(null);
  //STATES PARA FUNCIONAMENTO GERAL DA PAGINA
  const [loading, setLoading] = useState(false);

  //REQUISIÇÃO DOS REGISTROS DO BANCO DE DADOS-------------------------------------------------------------------|
  //state
  const [registros, setRegistros] = useState([]);

  //requisisção 
  useEffect(() => {
    //inicia animacao de carregamento

    axiosApi.get("/entradas_pendentes")
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });

    initFilters1();
  }, [])
  //-------------------------------------------------------------------------------------------------------------|
  //OPÇÃO DE COL TOGGLE DA INTERFACE DO USUARIO------------------------------------------------------------------|
  //colunas
  const columns = [
    { field: 'id', header: 'id' },
    { field: 'valor_a_pagar', header: 'Valor Pendente' },
    { field: 'data_registro', header: 'Desde:' }
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
      saveAsExcelFile(excelBuffer, 'lista_despesas_extras');
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

    </React.Fragment>
  );
  //cabecalho
  const header = (
    <div className="table-header" >
      <Toolbar right={rightContents} />
    </div>
  );
  //colunas
  //é definido pelo state "selectedColumns"

  //linhas
  const columnComponents = selectedColumns.map(col => {
    return <Column key={col.field} field={col.field} header={col.header} sortable={col.sortable} />;
  });
  //linhas opçes
  //linhas opçoes
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-thumbs-up" className="p-button-outlined p-button-success" onClick={() => editregistro(rowData)} />
      </React.Fragment>
    );
  }

  //rodapé
  const footer = `Total de ${registros ? registros.length : 0} despesas extras.`;
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;

  //--------------------------------------------------------------------------------------------------------------|

  //FORMULARIO CRUD ----------------------------------------------------------------------------------------------|

  //states
  const [id, setId] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const [tipoPessoa, setTipoPessoa] = useState('fisica');
  const [checked2, setChecked2] = useState(false);
  const [mask, setMask] = useState("999.999.999-99");
  const { register, handleSubmit, reset, setValue/*, formStates:{erros}*/ } = useForm();



  //envio do formulario CRUD
  const onSubmitForm = (form) => {
    form.ordens_servico_id = inEdit.id



//valor pago será disable















    if (form.pagamento.forma_pagamento.trim()) {
      let _registros = [...registros];
      let _registro = { ...form };

      axiosApi.post("/entradas", form)
        .then((response) => {

          axiosApi.patch("/entradas_pendentes", form.ordens_servico_id)
            .then((response) => {
              let _registros = registros.filter(val => val.id !== registro.id);
              setRegistros(_registros);
              setregistro(emptyregistro);
              reset()
              setVisibleRight(false)
            })
            .catch(function (error) {
              toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
            });
        })
        .catch(function (error) {
          toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
        });
    }
  };


  const [inEdit, setInEdit] = useState('');
  //funcao preenchimento do formulario para edicao 
  const editregistro = (registro) => {
    setregistro({ ...registro });
    setInEdit(registro);
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
  const confirmDeleteRegistro = (registro) => {
    setregistro(registro);
    setDeleteregistroDialog(true);
  }
  //funcao ocultar/cancelar alerta de confirmação pelo usuario
  const hideDeleteRegistroDialog = () => {
    setDeleteregistroDialog(false);
  }



  //botoes de acao do alerta de confirmacao pelo usuario
  const deleteregistroDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteRegistroDialog} />
    </React.Fragment>
  );


  //--------------------------------------------------------------------------------------------------------------|

  //MENSAGENS AO USUARIO------------------------------------------------------------------------------------------|
  const toastBR = useRef(null);
  const showSuccess = (detail) => {
    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'cliente ' + detail + ' cadastrada', life: 3000 });
  }

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
    let _registros = [...registros];
    let { newData, index } = e;

    _registros[index] = newData;

    setRegistros(_registros);
    updateRegistros(_registros)
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

  //FUNCAO QUE ENVIA AS INFOMRACOES PARA OS COMPONENTES PAI POR MEIO DE PROPS -----------------------------------|

  const updateRegistros = (lista) => {

    const somaPagamentos = lista.reduce(function (acumulador, valorAtual,) {
      return acumulador + parseFloat(valorAtual.valor_pago);
    }, 0);

    var objListaPagamentosRecebidos = new Object()
    objListaPagamentosRecebidos.lista = lista
    objListaPagamentosRecebidos.somaPagamentos = somaPagamentos
    props.ReceberPropsfilhoPagamentos(objListaPagamentosRecebidos) //enviar as informacoes para o componete pai
  }
  //-------------------------------------------------------------------------------------------------------------|


  const objFormaPagamento = r => {
    const form = {}
    form.ordens_servico_id = props.id
    form.pagamento = r
    onSubmitForm(form)
  }
  return (
    <>
      <Toast ref={toastBR} position="bottom-right" />
      <Sidebar className='w-sidebar-right' header={<h3>Registrar pagamento antecipado</h3>} visible={visibleRight} position="right" blockScroll onHide={() => setVisibleRight(false)} style={{ width: '30em' }}>
        <div className='card w-card'>
          <FormasPagamento ReceberPropsfilhoFormaPagamentos={objFormaPagamento} />
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
          paginatorLeft={paginatorLeft}
          rows={10}
          rowsPerPageOptions={[10, 20, 50]}>
          {columnComponents}
          <Column header={'Opções'} body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>

        </DataTable>
      </div>


    </>

  );

}

export default ListaEntradasPendentes