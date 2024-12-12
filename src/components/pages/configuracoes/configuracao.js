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

import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';
import { TabView, TabPanel } from 'primereact/tabview';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import { InputNumber } from 'primereact/inputnumber';
import { mask } from 'primereact/utils';
import 'primeicons/primeicons.css';

//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { useForm, Controller } from 'react-hook-form';
import { axiosApi } from '../../../services/axios';

import Tarifas from './tarifas'
function ConfiguracaoProjeto() {

  const toast = useRef(null);

  //STATES PARA FUNCIONAMENTO GERAL DA PAGINA
  const [loading, setLoading] = useState(false);

  //REQUISIÇÃO DOS CartoeS DO BANCO DE DADOS-------------------------------------------------------------------|
  //state
  const [cartoes, setCartoes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const [tarifas, setTarifas] = useState([]);
  //requisisção 
  useEffect(() => {
    //inicia animacao de carregamento
    setLoading(true);
    axiosApi.get("/maquina_cartoes")
      .then((response) => {
        setCartoes(response.data.listaCartoes)
      })
      .catch(function (error) {
      });
    //finaliza animacao de carregamento
    setLoading(false)
  }, [])
    //-------------------------------------------------------------------------------------------------------------|

    //ESTRUTURA DA TABELA DE DADOS ---------------------------------------------------------------------------------|
    ;

  //--------------------------------------------------------------------------------------------------------------|

  //FORMULARIO CRUD ----------------------------------------------------------------------------------------------|

  //states
  const { register, handleSubmit, reset, setValue/*, formStates:{erros}*/ } = useForm();


  //envio do formulario CRUD
  const onSubmit = (formContent) => {
    if (formContent.nome.trim()) {
      let _cartoes = [...cartoes];
      let _cartao = { ...formContent };

      axiosApi.post("/maquina_cartoes", formContent)
        .then((response) => {
          _cartao.id = response.data.id
          _cartoes.push(_cartao);
          setActiveIndex(_cartoes[_cartoes.length - 1])
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Cliente cadastrado', life: 3000 });
          setCartoes(_cartoes);
          setCartoe(emptyCartoe);
          reset()
        })
        .catch(function (error) {
          toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
        });


    }
  };



  //funcao preenchimento do formulario para edicao 
  const editCartoe = (Cartoe) => {
    setCartoe({ ...Cartoe });
    reset(Cartoe);
  }
  //funcao para retonar qual o indice do Cartoe da tabela para alteracao
  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < cartoes.length; i++) {
      if (cartoes[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  //delete Cartoe
  let emptyCartoe = {
    id: null
  };
  const [Cartoe, setCartoe] = useState(emptyCartoe);

  const [deleteCartoeDialog, setDeleteCartoeDialog] = useState(false);
  // funcao para mostrar alerta de confimação pelo usuario
  const confirmDeleteCartoe = (Cartoe) => {
    setCartoe(Cartoe);
    setDeleteCartoeDialog(true);
  }
  //funcao ocultar/cancelar alerta de confirmação pelo usuario
  const hideDeleteCartoeDialog = () => {
    setDeleteCartoeDialog(false);
  }

  //funcao que deleta o Cartoe do banco de dados e da tabela
  const deleteCartoe = () => {
    axiosApi.delete("/maquina_cartoes/" + Cartoe.id)
      .then((response) => {
        let _cartoes = cartoes.filter(val => val.id !== Cartoe.id);
        setCartoes(_cartoes);
        setDeleteCartoeDialog(false);
        setCartoe(emptyCartoe);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Cliente deletado', life: 3000 });
      })
      .catch(function (error) {
        toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
      });
  }

  //botoes de acao do alerta de confirmacao pelo usuario
  const deleteCartoeDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteCartoeDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteCartoe} />
    </React.Fragment>
  );


  //--------------------------------------------------------------------------------------------------------------|

  //MENSAGENS AO USUARIO------------------------------------------------------------------------------------------|
  const toastBR = useRef(null);
  const showSuccess = (detail) => {
    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'cliente ' + detail + ' cadastrada', life: 3000 });
  }

  //--------------------------------------------------------------------------------------------------------------|


  const [dadosPrincipais, setDadosPrincipais] = useState([]);// lista dos produtos já inseridos
  useEffect(() => {
    axiosApi.get("/associados/1")
      .then((response) => {
        setDadosPrincipais(response.data)
        reset(response.data)
      })
      .catch(function (error) {
      });
  }, [])

  const onSubmitDadosPrincipais = (formContentPrincipal) => {
    axiosApi.patch("/associados", formContentPrincipal)
      .then((response) => {
      //  setDadosPrincipais(response.data.listaCartoes);
        //chamada para authcontext aqui...
        reset(response.data)
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Dados atualizados', life: 3000 });
      })
      .catch(function (error) {
        toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
      });
  }

  const [maquinhaCartoes, setMaquinaCartoes] = useState(['']);
  useEffect(() => {
    axiosApi.get("/maquina_cartoes/1")
      .then((response) => {
        setMaquinaCartoes(response.data)
      })
      .catch(function (error) {
      });
  }, [])


  const objListaTarifas = r => {
    setTarifas(r.lista)
  }

  const updateTarifasCartao = (id) => {
    const form = {}
    form.id = id
    form.tarifas = tarifas
    console.log(form)
    axiosApi.patch("/maquina_cartoes", form)
      .then((response) => {
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Cartoe Updated', life: 3000 });
        reset()
        //setVisibleRight(false)
      })
      .catch(function (error) {
        toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
      });
  }
  const changeTab=(index)=>{
    setActiveIndex(index)
    setTarifas('')
  }

  const listItems = cartoes.map(tab =>
    <TabPanel header={tab.surname} leftIcon="pi pi-credit-card" key={tab.id} activeIndex={activeIndex} onTabChange={(e) => changeTab(e.index)}>
      <Tarifas receberPropsfilhoCartoes={objListaTarifas} id={tab.id} />
      <div class="flex flex-row-reverse flex-wrap" style={{margin:'10px 30px'}}> 
      <Button icon="pi pi pi-trash" className="p-button-outlined p-button-danger" onClick={() => delete confirmDeleteCartoe(tab)} />
      <Button icon="pi pi-save" className="p-button-outlined p-button-success" onClick={(e) => updateTarifasCartao(tab.id)} />
      </div>
    </TabPanel>
  );

  const cities = [
    { label: 'CRÉDITO', value: 'CREDITO' },
    { label: 'DÉBITO', value: 'DEBITO' },
    { label: 'PIX', value: 'PIX' }
  ];


  return (
    <>
      <Toast ref={toastBR} position="bottom-right" />

      <Toast ref={toast} />
      <Card title="Dados principais" className='' style={{ width: '100%', padding: '10px',marginBottom:'10px' }}>
        <form onSubmit={handleSubmit(onSubmitDadosPrincipais)} className="p-fluid w-form" >
          
          <InputText placeholder='id ' hidden {...register("id")} disabled />
          <div className="p-fluid grid">
            <div className="field w-field col-12 md:col-7">
              <div className="p-fluid grid">
                <div className="field w-field col-12 md:col-12">
                  <div className="formgrid grid">
                    <label class="font-medium text-900">Nome da sua empresa:</label>
                    <div className="p-inputgroup">
                      <span className="p-inputgroup-addon">
                        <i className="pi pi-building"></i>
                      </span>
                      <InputText {...register("nome")} />
                    </div>
                  </div>
                </div>
                <div className="field w-field col-12 md:col-12">
                  <div className="formgrid grid">
                    <label class="font-medium text-900">CNPJ da empresa:</label>
                    <div className="p-inputgroup">
                      <span className="p-inputgroup-addon">
                        <i className="pi pi-id-card"></i>
                      </span>
                      <InputText {...register("cnpj")} />
                    </div>
                  </div>
                </div>
                <div className="field w-field col-12 md:col-12">
                  <div className="formgrid grid">
                    <label class="font-medium text-900">Responsável pela empresa:</label>
                    <div className="p-inputgroup">
                      <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                      </span>
                      <InputText {...register("responsavel")} />
                    </div>
                  </div>
                </div>
                <div className="field w-field col-12 md:col-12">
                  <div className="formgrid grid">
                    <label class="font-medium text-900">Email de contato:</label>
                    <div className="p-inputgroup">
                      <span className="p-inputgroup-addon">
                        <i className="pi pi-send"></i>
                      </span>
                      <InputText {...register("email")} />
                    </div>
                  </div>
                </div>
                <div className="field w-field col-12 md:col-12">
                  <div className="formgrid grid">
                    <label class="font-medium text-900">Telefone de contato:</label>
                    <div className="p-inputgroup">
                      <span className="p-inputgroup-addon">
                        <i className="pi pi-phone"></i>
                      </span>
                      <InputText {...register("telefone")} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1">
              <Divider layout="vertical">

              </Divider>
            </div>
            <div className="field w-field col-12 md:col-4">
              <div className="p-fluid grid">
                <div className="field w-field col-12 md:col-12">
                  <div className="formgrid grid">
                    <label class="font-medium text-900">Opções adicionais:</label>
                    <div className="p-inputgroup">
                      <span className="p-inputgroup-addon">
                        <i className="pi pi-building"></i>
                      </span>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>



          <div className="p-fluid grid">
            <div className="field w-field col-12 md:col-12">
              <Button label="Submit" className='w-form-button' icon="pi pi-save" iconPos="right" />
            </div>

          </div>

        </form>
      </Card>

      <Card title="Maquininha de cartões" style={{  padding: '10px' }}>
      
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid w-form">

          <div className="p-fluid grid">

            <div className="field w-field col-12 md:col-8">
              <label class="font-medium text-900">Informe o nome da nova maquinha de cartão:</label>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-credit-card"></i>
                </span>
                <InputText {...register("surname")} />
              </div>
            </div>
            <div className="field w-field col-12 md:col-4" style={{paddingTop: '30px'}}>
              <Button type="submit" label="Cadastrar" className='w-form-button' icon='pi pi-plus' iconPos='right' />
            </div>
          </div>
        </form>
        <Divider />
        <div style={{margin:'10px'}}> 
        <label class="font-medium text-900" style={{}}>Cartões já cadatastro:</label>
        <TabView className="tabview-header-icon w-tabe">
          {listItems}
        </TabView>
        </div>
      </Card >


      <Dialog visible={deleteCartoeDialog} style={{ width: '450px' }} header="Confirm  " modal footer={deleteCartoeDialogFooter} onHide={hideDeleteCartoeDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {Cartoe && <span>Are you sure you want to delete <b>{Cartoe.name}</b>?</span>}
        </div>
      </Dialog>
    </>

  );

}

export default ConfiguracaoProjeto