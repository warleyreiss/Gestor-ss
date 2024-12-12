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
import { useNavigate } from 'react-router-dom'
import { Divider } from 'primereact/divider';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { mask } from 'primereact/utils';
import 'primeicons/primeicons.css';
import Select from 'react-select'
import { Card } from 'primereact/card';
//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { useForm, Controller } from 'react-hook-form';
import { axiosApi } from '../../../services/axios';
import { useParams } from 'react-router-dom';
import FormasPagamento from './formaPagamento';

function Pagamento(props) {
  const toast = useRef(null);
  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

  const { ordens_servico_id } = useParams();

  const { register, handleSubmit, reset, setValue } = useForm();
  //REQUISIÇÃO DOS REGISTROS DE Tarifas NO BANCO DE DADOS-------------------------------------------------------------------|
  //state
  const [produtos, setProdutos] = useState(0);
  const [servicos, setServicos] = useState(0);
  const [entradas, setEntradas] = useState(0);
  const [receber, setReceber] = useState(0);
  const [desconto, setDesconto] = useState(0);
  const [pagamento, setPagamento] = useState({})
  const [formContent, setFormContent] = useState({})
  //requisisção 
  useEffect(() => {
    axiosApi.get("/entradas/finalizacao/" + ordens_servico_id)
      .then((response) => {
        setProdutos(response.data.somaProdutos)
        setServicos(response.data.somaServicos)
        setEntradas(response.data.somaEntradas)
        setReceber(response.data.somaProdutos + response.data.somaServicos - response.data.somaEntradas)
      })
      .catch(function (error) {
      });
  }, [])




  const objDadosPagamento = r => {
    const formContent2 = {}
    formContent2.ordens_servico_id = ordens_servico_id
    formContent2.pagamento = r
    formContent2.ordens_servico_status = '2'
    setFormContent(formContent2)
    onSubmit(formContent2)
  }


  //envio do formulario CRUD
  const onSubmit = (form) => {
    console.log(form.pagamento.valor_pago,form.pagamento.valor_desconto)
    const valor = (parseFloat(form.pagamento.valor_pago) + parseFloat(form.pagamento.valor_desconto))
    if (valor > receber) {
      toast.current.show({ severity: 'warn', summary: 'Alerta!!', detail: 'Valor acima do esperado, gentileza conferir!', life: 3000 });
    } else {
      if (valor == receber) {
console.log('igual')
      axiosApi.post("/entradas", form)
          .then((response) => {
            onHide()
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'pagamento bem sucedido!', life: 3000 });
            navigate(-1)
          })
          .catch(function (error) {
            toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
          });
      } else {
        console.log('diferente')
        confirmPagamentoInfoerior(form)

      }
    }
  }
  //--------------------------------------------------------------------------------------------------------------|
  const [displayBasic, setDisplayBasic] = useState(false);
  const [diferenca, setDiferenca] = useState(false);

  const renderFooter = (name) => {
    return (
      <div>
        <div className="p-fluid grid" style={{ margin: '10px' }}>

          <div className="field w-field col-3 md:col-2">
          </div>
          <div className="field w-field col-3 md:col-3">
            <Button label="Retomar" className="w-form-button" icon='pi pi-times' iconPos='right' onClick={() => onHide(true)} />
          </div>

          <div className="field w-field col-3 md:col-3">
            <Button label="Finalizar" className="w-form-button" icon='pi pi-save' iconPos='right' onClick={() => osFechada(formContent)} />
          </div>
          <div className="field w-field col-3 md:col-4">
            <Button label="Deixar aberta" className="w-form-button" icon='pi pi-save' iconPos='right' onClick={() => osPendente(formContent)} />
          </div>

        </div>
      </div>
    );
  }

  const confirmPagamentoInfoerior = (form) => {
    const valor = (parseFloat(form.pagamento.valor_pago) + parseFloat(form.pagamento.valor_desconto))
    setDiferenca(receber - valor)
    setDisplayBasic(true)
  }
  const onHide = () => {
    setDisplayBasic(false)
  }

  const retomar = () => {
    setDisplayBasic(false)
  }
  const osFechada = (form) => {
    form.ordens_servico_status = '2'
    axiosApi.post("/entradas", form)
      .then((response) => {
          //se tiver um retorno possitivo entao faço post para cadastrar entrada pendente
          const formPendente={}
          formPendente.ordens_servico_id=form.ordens_servico_id
          formPendente.valor_a_pagar=diferenca
          axiosApi.post("/entradas_pendentes", formPendente)
            .then((response) => {
              toast.current.show({ severity: 'success', summary: 'Successful', detail: 'pagamento bem sucedido!', life: 3000 });
              navigate(-1)
            })
            .catch(function (error) {
              toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
            });
      })
      .catch(function (error) {
        toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
      });
  }
  const osPendente = (form) => {
    form.ordens_servico_status = '1'
    axiosApi.post("/entradas", form)
      .then((response) => {
     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'pagamento bem sucedido!', life: 3000 });
        navigate(-1)

      })
      .catch(function (error) {
        toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Tente novamente!', life: 3000 });
      });

  }

  return (
    <>
      <Toast ref={toast} position="bottom-right" />

      <Card className='w-card' style={{ marginTop: '5px', height: '87vh' }}>

        <div className="grid" style={{ padding: '20px' }}>
          <div className="col-5">
            <div className="p-fluid grid">

              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Valor total dos produtos:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">

                  </span>
                  <InputText value={'R$: ' + produtos} disabled />
                </div>
              </div>
              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Valor total dos Serviços:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">

                  </span>
                  <InputText value={'R$: ' + servicos} disabled />
                </div>
              </div>
            
              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Valor total já antecipado:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">

                  </span>
                  <InputText value={entradas ? 'R$: ' + entradas : 'R$: ' + 0} disabled />
                </div>
              </div>
              <div className="field w-field col-12 md:col-12">
                <label class="font-medium text-900">Valor à receber:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">

                  </span>
                  <InputText value={'R$: ' + receber} disabled />
                </div>
              </div>

            </div>
          </div>
          <div className="col-2">
            <Divider layout="vertical">

            </Divider>
          </div>
          <div className="col-5 ">
            <FormasPagamento ReceberPropsfilhoFormaPagamentos={objDadosPagamento} />
          </div>
        </div>

      </Card>



      <Dialog header="Header" visible={displayBasic} style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide()}>
        <p>O valor que está sendo pago é inferior ao valor à receber. R$ {diferenca} restantes! A ordem de serviço continuará em aberto até o conclusão do pagamento</p>
      </Dialog>
    </>


  );

}
export default Pagamento