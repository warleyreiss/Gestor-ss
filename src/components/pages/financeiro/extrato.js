//IMPORTANTO HOOKS E DEMAIS RECURSOS DO REACT
import React, { useState, useEffect, useRef } from 'react';

//IMPORTANTO COMPONENTES DE BIBLIOTECAS DE INTERFACES
import { Datatable } from 'primereact/datatable';
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
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import 'primeicons/primeicons.css';

import { DownloadTableExcel } from 'react-export-table-to-excel';
//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { useForm, Controller } from 'react-hook-form';
import { axiosApi } from '../../../services/axios';
import { Link } from 'react-router-dom';


function Extrato(props) {
  //STATES PARA FUNCIONAMENTO GERAL DA PAGINA
  const [loading, setLoading] = useState(false);
  const nomePagina = 'EXTRATO DETALHADO SERVIÇOS E PRODUTOS ENTREGUES'

  const tableRef = useRef(null);

  const toast = useRef(null);

  //FUNÇÃO PARA BUSCAR REGISTROS DO BANCO DE DADOS-------------------------------------------------------------------|

  //state
  const [tickets, setTickets] = useState([]);
  const [client, setClient] = useState('');
  const [contract, setContract] = useState('');
  const [sum, setSum] = useState('');
  const [IRPJ, setIRPJ] = useState('');
  const [PIS, setPIS] = useState('');
  const [COFIS, setCOFIS] = useState('');
  const [CSL, setCSL] = useState('');
  const [vencimento, setVenciemnto] = useState('');
  const [registro, setRegistro] = useState(props.registro);
  //console.log(props.registro)

  //requisição 
  const buscarRegistros = () => {
    setLoading(true);
    axiosApi.get("/ticket_extract/" + props.registro.id)
      .then((response) => {
        setClient(response.data.client)
        setContract(response.data.contract)
        setTickets(response.data.tickets)
        setSum(response.data.sum)
        setVenciemnto(response.data.vencimento)
      })
      .catch(function (error) {
      });
    setLoading(false)
  }

  //requisisção 
  useEffect(() => {
    buscarRegistros()
  }, [])
  //-------------------------------------------------------------------------------------------------------------|

  return (
    <><div className="d-flex flex-row-reverse bd-highlight" expand="lg" variant="light" bg="light">
    <div className="p-2"> <DownloadTableExcel filename={client.nome} sheet="users" currentTableRef={tableRef.current}>
      <Button className='float-right' size="sm"> Exportar </Button>
    </DownloadTableExcel></div>
   </div>
    
      <div className="flex" style={{justifyContent: 'center!important'}}>
        <div className="flex">
          <div classNameName='col-md-12 col-sm-12 form-group' id="dvData">
            <table id="datatable" className='extract-table' ref={tableRef}>
              <tr>
                <td className="" colspan="7"
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'white',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: '2px solid #12192c',
                    whiteSpace: 'nowrap',
                    fontSize: '12.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    width: '583pt',
                    backgroundColor: '#12192c',
                    marginBottom: '2rem',
                  }}>EXTRATO DETALHADO SERVIÇOS E PRODUTOS ENTREGUES</td>
              </tr>
              <tr>
                <td colspan="7"></td>
              </tr>
              <tr >
                <td className="" rowspan="4" colspan="2"
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderRight: '0.5pt solid windowtext',
                    borderBottom: '1pt solid windowtext',
                    borderLeft: '1pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderTop: '1pt solid windowtext',
                    textAlign: 'center'
                  }}
                >
                  <img src='https://sstelematica.com.br/wp-content/uploads/2022/07/SS-Telematica-Logomarca-2048x554.png' width={200}></img>
                </td>
                <td className="" colspan="5"
                  style={{
                    fontSize: '30px',
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderRight: '1pt solid windowtext',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    borderLeft: 'none',
                    width: '91pt',
                    borderTop: '1pt solid windowtext',
                  }}
                >{contract.nome}</td>
              </tr>
              <tr>
                <td className="" colspan="5"
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontWeight: '400',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontFamily: 'Arial, sans- serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderRight: '1pt solid windowtext',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: ' normal',
                    borderTop: 'none',
                    borderLeft: 'none',
                    width: '91pt',
                    fontSize: '16px',
                  }}>{contract.cnpj}</td>
              </tr>
              <tr>
                <td className="" colspan="5"
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontWeight: '400',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontFamily: 'Arial, sans- serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderRight: '1pt solid windowtext',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: ' normal',
                    borderTop: 'none',
                    borderLeft: 'none',
                    width: '91pt',
                    fontSize: '16px',
                  }}>{contract.endereco} </td>
              </tr>
              <tr>
                <td className="" colspan="5"
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontWeight: '400',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontFamily: 'Arial, sans- serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderRight: '1pt solid windowtext',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: ' normal',
                    borderTop: 'none',
                    borderLeft: 'none',
                    width: '91pt',
                    fontSize: '16px',
                    borderBottom: '1pt solid windowtext',
                  }}
                > {contract.responsavel + "/ " + contract.telefone + "/ " + contract.email}</td>
              </tr>
              <tr>
                <td colspan="7"></td>
              </tr>

              <tr className=''
                style={{
                  fontSize: '16px',
                  borderCollapse: 'collapse',
                  padding: '0px',
                  color: 'black',
                  fontStyle: 'normal',
                  textDecoration: 'none',
                  border: 'none',
                  whitePace: 'nowrap',
                  fontWeight: '700',
                  fontFamily: 'Arial, sans-serif',
                  textAlign: 'left',
                  verticalAlign: 'middle',
                }}>
                <td className="" colspan="1">CLIENTE:</td>
                <td className="" colspan="5">{client.nome}</td>
              </tr>
              <tr className=''
                style={{
                  fontSize: '16px',
                  borderCollapse: 'collapse',
                  padding: '0px',
                  color: 'black',
                  fontStyle: 'normal',
                  textDecoration: 'none',
                  border: 'none',
                  whitePace: 'nowrap',
                  fontWeight: '700',
                  fontFamily: 'Arial, sans-serif',
                  textAlign: 'left',
                  verticalAlign: 'middle',
                }}>
                <td className="" colspan="1">CNPJ:</td>
                <td className="" colspan="5">{client.cnpj}</td>
              </tr>
              <tr className=''
                style={{
                  fontSize: '16px',
                  borderCollapse: 'collapse',
                  padding: '0px',
                  color: 'black',
                  fontStyle: 'normal',
                  textDecoration: 'none',
                  border: 'none',
                  whitePace: 'nowrap',
                  fontWeight: '700',
                  fontFamily: 'Arial, sans-serif',
                  textAlign: 'left',
                  verticalAlign: 'middle',
                }}>
                <td className="" colspan="1">ENDEREÇO:</td>
                <td className="" colspan="5">{client.endereco}</td>
              </tr>
              <tr className=''
                style={{
                  fontSize: '16px',
                  borderCollapse: 'collapse',
                  padding: '0px',
                  color: 'black',
                  fontStyle: 'normal',
                  textDecoration: 'none',
                  border: 'none',
                  whitePace: 'nowrap',
                  fontWeight: '700',
                  fontFamily: 'Arial, sans-serif',
                  textAlign: 'left',
                  verticalAlign: 'middle',
                }}>
                <td className="" colspan="1">RESPONSÁVEL:</td>
                <td className="" colspan="5">{client.responsavel + " / " + client.telefone}</td>
              </tr>
              <tr className=''
                style={{
                  fontSize: '16px',
                  borderCollapse: 'collapse',
                  padding: '0px',
                  color: 'black',
                  fontStyle: 'normal',
                  textDecoration: 'none',
                  border: 'none',
                  whitePace: 'nowrap',
                  fontWeight: '700',
                  fontFamily: 'Arial, sans-serif',
                  textAlign: 'left',
                  verticalAlign: 'middle',
                }}>
                <td className="" colspan="1">DATA VENCIMENTO:</td>
                <td className="" colspan="5">{vencimento}</td>
              </tr>

              <tr className=''>
                <td colspan="7"></td>
              </tr>
              <tr className=""
                style={{
                  borderRight: '1pt solid windowtext',
                  borderBottom: '1pt solid windowtext',
                  borderLeft: '1pt solid windowtext',
                  borderTop: '1pt solid windowtext',
                  borderCollapse: 'collapse',
                  padding: '0px',
                  color: 'white',
                  textDecoration: 'none',
                  border: '2x solid #000000',
                  whiteSpace: 'nowrap',
                  color: 'black',
                  fontWeight: '700',
                  fontFamily: 'Arial, sans-serif',
                  backgroundColor: '#c6c6c6',
                  marginBottom: '2rem',
                  fontSize: '15px',
                }} >
                <td colspan="7" className='borda-lateral'>DESPESAS DE SERVICOS: </td>
              </tr>
              <tr
                style={{
                  borderLeft: '1pt solid windowtext',
                  borderRight: '1pt solid windowtext',
                }}>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    borderLeft: '0.5pt solid windowtext',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                  }}>ID:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>DATA:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    borderLeft: '0.5pt solid windowtext',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                  }}>DESCRIÇÃO:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>OBSERVAÇÃO:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>QDADE:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>OS:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }} >VALOR:</td>
              </tr>
              {tickets.map((registro, key) => {
                if (registro.tipo == 'SERVICO') {
                  return (
                    <tr
                      style={{
                        borderLeft: '1pt solid windowtext',
                        borderRight: '1pt solid windowtext',
                      }}>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontWeight: '700',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}> <Link className='link-table' to={{ pathname: `/ticket/show/${registro.id}` }}>{registro.id}</Link></td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{registro.data_registro}</td>
                      <td style={{
                        borderCollapse: 'collapse',
                        padding: '0px',
                        color: 'black',
                        fontStyle: 'normal',
                        textDecoration: 'none',
                        border: 'none',
                        fontSize: '10.0pt',
                        borderLeft: '0.5pt solid windowtext',
                        fontFamily: 'Arial, sans-serif',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        borderBottom: '0.5pt solid windowtext',
                        whiteSpace: 'normal',
                        borderTop: 'none',
                        width: '28pt',
                      }}>{registro.descricao}</td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{registro.observacao}</td>
                      <td style={{
                        borderCollapse: 'collapse',
                        padding: '0px',
                        color: 'black',
                        fontStyle: 'normal',
                        textDecoration: 'none',
                        border: 'none',
                        fontSize: '10.0pt',
                        borderLeft: '0.5pt solid windowtext',
                        fontFamily: 'Arial, sans-serif',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        borderBottom: '0.5pt solid windowtext',
                        whiteSpace: 'normal',
                        borderTop: 'none',
                        width: '28pt',
                      }}>{registro.quantidade}</td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}> <Link className='link-table' to={{ pathname: `/ordem-de-servico/show/${registro.ordem_servico_id}` }}>{registro.ordem_servico_id}</Link></td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{'R$ ' + registro.valor.replace('.', ',')}</td>
                    </tr>
                  )
                }
              })}

              <tr className='borda-lateral'>
                <td colspanName="5"></td>
              </tr>
              <tr className=""
                style={{
                  borderRight: '1pt solid windowtext',
                  borderBottom: '1pt solid windowtext',
                  borderLeft: '1pt solid windowtext',
                  borderTop: '1pt solid windowtext',
                  borderCollapse: 'collapse',
                  padding: '0px',
                  color: 'white',
                  textDecoration: 'none',
                  border: '2x solid #000000',
                  whiteSpace: 'nowrap',
                  color: 'black',
                  fontWeight: '700',
                  fontFamily: 'Arial, sans-serif',
                  backgroundColor: '#c6c6c6',
                  marginBottom: '2rem',
                  fontSize: '15px',
                }}  >
                <td colspan="7">DESPESAS MATERIAIS: </td>
              </tr>
              <tr
                style={{
                  borderLeft: '1pt solid windowtext',
                  borderRight: '1pt solid windowtext',
                }}>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>ID:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>DATA:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>DESCRIÇÃO:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>OBSERVAÇÃO:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>QDADE:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>CHAMADO:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>VALOR:</td>
              </tr>
              {tickets.map((registro, key) => {
                if (registro.tipo == 'MATERIAIS') {
                  return (
                    <tr
                      style={{
                        borderLeft: '1pt solid windowtext',
                        borderRight: '1pt solid windowtext',
                      }}>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontWeight: '700',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}> <Link className='link-table' to={{ pathname: `/ticket/show/${registro.id}` }}>{registro.id}</Link></td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }} >{registro.data_registro}</td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{registro.descricao}</td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{registro.observacao}</td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{registro.quantidade}</td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}> <Link className='link-table' to={{ pathname: `/quipment/request-show/${registro.chamado_id}` }}>{registro.chamado_id}</Link></td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{'R$ ' + registro.valor.replace('.', ',')}</td>
                    </tr>
                  )
                }
              })}
              <tr className=''>
                <td colspanName="5"></td>
              </tr>
              <tr className=""
                style={{
                  borderRight: '1pt solid windowtext',
                  borderBottom: '1pt solid windowtext',
                  borderLeft: '1pt solid windowtext',
                  borderTop: '1pt solid windowtext',
                  borderCollapse: 'collapse',
                  padding: '0px',
                  color: 'white',
                  textDecoration: 'none',
                  border: '2x solid #000000',
                  whiteSpace: 'nowrap',
                  color: 'black',
                  fontWeight: '700',
                  fontFamily: 'Arial, sans-serif',
                  backgroundColor: '#c6c6c6',
                  marginBottom: '2rem',
                  fontSize: '15px',
                }} >
                <td colspan="7">DESPESAS DE ADICIONAIS: </td>
              </tr>
              <tr style={{
                borderLeft: '1pt solid windowtext',
                borderRight: '1pt solid windowtext',
              }}>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>ID:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '10.0pt',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>DATA:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '10.0pt',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }} >DESCRIÇÃO:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>OBSERVAÇÃO:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>QDADE:</td>
                <td style={{
                  borderCollapse: 'collapse',
                  padding: '0px',
                  color: 'black',
                  fontStyle: 'normal',
                  textDecoration: 'none',
                  border: 'none',
                  fontSize: '10.0pt',
                  fontWeight: '700',
                  fontFamily: 'Arial, sans-serif',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  borderBottom: '0.5pt solid windowtext',
                  whiteSpace: 'normal',
                  borderTop: 'none',
                  width: '28pt',
                  borderLeft: '0.5pt solid windowtext',
                }} >OS:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }} >VALOR:</td>
              </tr>
              {tickets.map((registro, key) => {
                if (registro.tipo == 'ADICIONAL') {
                  return (
                    <tr
                      style={{
                        borderLeft: '1pt solid windowtext',
                        borderRight: '1pt solid windowtext',
                      }}>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontWeight: '700',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}> <Link className='link-table' to={{ pathname: `/ticket/show/${registro.id}` }}>{registro.id}</Link></td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{registro.data_registro}</td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{registro.descricao}</td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{registro.observacao}</td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{registro.qdade}</td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}> <Link className='link-table' to={{ pathname: `/ordem-de-servico/show/${registro.ordem_servico_id}` }}>{registro.ordem_servico_id}</Link></td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{'R$ ' + registro.valor.replace('.', ',')}</td>
                    </tr>
                  )
                }
              })}
              <tr >
                <td colspan="5 "></td>
              </tr>
              <tr className=""
                style={{
                  borderRight: '1pt solid windowtext',
                  borderBottom: '1pt solid windowtext',
                  borderLeft: '1pt solid windowtext',
                  borderTop: '1pt solid windowtext',
                  borderCollapse: 'collapse',
                  padding: '0px',
                  color: 'white',
                  textDecoration: 'none',
                  border: '2x solid #000000',
                  whiteSpace: 'nowrap',
                  color: 'black',
                  fontWeight: '700',
                  fontFamily: 'Arial, sans-serif',
                  backgroundColor: '#c6c6c6',
                  marginBottom: '2rem',
                  fontSize: '15px',
                }} >
                <td colspan="7">DESPESAS DE VISITA: </td>
              </tr>
              <tr
                style={{
                  borderLeft: '1pt solid windowtext',
                  borderRight: '1pt solid windowtext',
                }}>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>ID:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>DATA:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>DESCRIÇÃO:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>OBSERVAÇÃO:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>QDADE:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>SERVIÇOS:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>VALOR:</td>
              </tr>
              {tickets.map((registro, key) => {
                if (registro.tipo == 'VISITA') {
                  return (
                    <tr
                      style={{
                        borderLeft: '1pt solid windowtext',
                        borderRight: '1pt solid windowtext',
                      }}>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontWeight: '700',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }} > <Link className='link-table' to={{ pathname: `/ticket/show/${registro.id}` }}>{registro.id}</Link></td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{registro.data_registro}</td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{registro.descricao}</td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{registro.observacao}</td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{registro.quantidade}</td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}> <Link to={{ pathname: `/Service/show/${registro.servico_id}` }}>
                          {registro.servico_id}
                        </Link></td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{'R$ ' + registro.valor.replace('.', ',')}</td>
                    </tr>
                  )
                }
              })}
              <tr >
                <td colspan="5 "></td>
              </tr>
              <tr className=""
                style={{
                  borderRight: '1pt solid windowtext',
                  borderBottom: '1pt solid windowtext',
                  borderLeft: '1pt solid windowtext',
                  borderTop: '1pt solid windowtext',
                  borderCollapse: 'collapse',
                  padding: '0px',
                  color: 'white',
                  textDecoration: 'none',
                  border: '2x solid #000000',
                  whiteSpace: 'nowrap',
                  color: 'black',
                  fontWeight: '700',
                  fontFamily: 'Arial, sans-serif',
                  backgroundColor: '#c6c6c6',
                  marginBottom: '2rem',
                  fontSize: '15px',
                }} ></tr>
              <tr className=""
                style={{
                  borderRight: '1pt solid windowtext',
                  borderBottom: '1pt solid windowtext',
                  borderLeft: '1pt solid windowtext',
                  borderTop: '1pt solid windowtext',
                  borderCollapse: 'collapse',
                  padding: '0px',
                  color: 'white',
                  textDecoration: 'none',
                  border: '2x solid #000000',
                  whiteSpace: 'nowrap',
                  color: 'black',
                  fontWeight: '700',
                  fontFamily: 'Arial, sans-serif',
                  backgroundColor: '#c6c6c6',
                  marginBottom: '2rem',
                  fontSize: '15px',
                }} >

                <td colspan="7" className='borda-lateral'>DESPESAS DE HARDWARE: </td>
              </tr>
              <tr
                style={{
                  borderLeft: '1pt solid windowtext',
                  borderRight: '1pt solid windowtext',
                }}>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>ID:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>DATA:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>DESCRIÇÃO:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>OBSERVAÇÃO:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>QDADE:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>OS:</td>
                <td
                  style={{
                    borderCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    fontSize: '10.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    borderBottom: '0.5pt solid windowtext',
                    whiteSpace: 'normal',
                    borderTop: 'none',
                    width: '28pt',
                    borderLeft: '0.5pt solid windowtext',
                  }}>VALOR:</td>
              </tr>
              {tickets.map((registro, key) => {
                if (registro.tipo == 'SERVICO HARDWARE') {
                  return (
                    <tr
                      style={{
                        borderLeft: '1pt solid windowtext',
                        borderRight: '1pt solid windowtext',
                      }}>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontWeight: '700',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }} > <Link className='link-table' to={{ pathname: `/ticket/show/${registro.id}` }}>{registro.id}</Link></td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{registro.data_registro}</td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{registro.descricao}</td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{registro.observacao}</td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{registro.quantidade}</td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>

                        <Link className='link-table' to={{ pathname: `/hardware/service/show/${registro.hardware_ordem_servico_id}` }}>
                          {registro.hardware_ordem_servico_id}
                        </Link></td>
                      <td
                        style={{
                          borderCollapse: 'collapse',
                          padding: '0px',
                          color: 'black',
                          fontStyle: 'normal',
                          textDecoration: 'none',
                          border: 'none',
                          fontSize: '10.0pt',
                          borderLeft: '0.5pt solid windowtext',
                          fontFamily: 'Arial, sans-serif',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          borderBottom: '0.5pt solid windowtext',
                          whiteSpace: 'normal',
                          borderTop: 'none',
                          width: '28pt',
                        }}>{'R$ ' + registro.valor.replace('.', ',')}</td>
                    </tr>
                  )
                }
              })}
              <tr className=''>
                <td colspanName="5"></td>
              </tr>
              <tr
                style={{
                  borderCollapse: 'collapse',
                  padding: '0px',
                  color: 'white',
                  fontStyle: 'normal',
                  textDecoration: 'none',
                  border: '2px solid #12192c',
                  whiteSpace: 'nowrap',
                  fontSize: '12.0pt',
                  fontFamily: 'Arial, sans-serif',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  width: '583pt',
                  backgroundColor: '#12192c',
                  marginBottom: '2rem',
                }}>
                <td colspan="7" >RESUMO DA FATURA</td>
              </tr>
              <tr className=''>
                <td colspanName="5"></td>
              </tr>

              <tr>
                <td colspan="6"
                  style={{
                    bordeCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fonStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    whiteSpace: 'nowrap',
                    fontSize: '12.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'right',
                    verticalAlign: 'middle',
                  }}>VALOR TOTAL SERVIÇOS EXTRAS R$:</td>
                <td id="totalParcial" colspan="1"
                  style={{
                    bordeCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fonStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    whiteSpace: 'nowrap',
                    fontSize: '12.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'right',
                    verticalAlign: 'middle',
                  }}>{sum.sum} </td>
              </tr>
              <tr>
                <td>IRPJ:</td>
                <td
                  style={{
                    bordeCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fonStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    whiteSpace: 'nowrap',
                    fontSize: '12.0pt',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'right',
                    verticalAlign: 'middle',
                  }}>{contract.irpj + "%"}</td>
                <td colspan="4"
                  style={{
                    bordeCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fonStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    whiteSpace: 'nowrap',
                    fontSize: '12.0pt',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'right',
                    verticalAlign: 'middle',
                  }}>IMPOSTO RETIDO IRPJ R$:</td>
                <td id="irpj" colspan="1"
                  style={{
                    bordeCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fonStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    whiteSpace: 'nowrap',
                    fontSize: '12.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'right',
                    verticalAlign: 'middle',
                  }}>{(sum.sum * (contract.irpj / 100)).toFixed(2)}</td>
              </tr>
              <tr>
                <td>PIS:</td>
                <td
                  style={{
                    bordeCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fonStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    whiteSpace: 'nowrap',
                    fontSize: '12.0pt',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'right',
                    verticalAlign: 'middle',
                  }}>{contract.pis + "%"}</td>
                <td colspan="4"
                  style={{
                    bordeCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fonStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    whiteSpace: 'nowrap',
                    fontSize: '12.0pt',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'right',
                    verticalAlign: 'middle',
                  }}>IMPOSTO RETIDO PIS R$:</td>
                <td id="pis" colspan="1"
                  style={{
                    bordeCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fonStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    whiteSpace: 'nowrap',
                    fontSize: '12.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'right',
                    verticalAlign: 'middle',
                  }}>{(sum.sum * (contract.pis / 100)).toFixed(2)}</td>
              </tr>
              <tr>
                <td>COFINS:</td>
                <td
                  style={{
                    bordeCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fonStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    whiteSpace: 'nowrap',
                    fontSize: '12.0pt',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'right',
                    verticalAlign: 'middle',
                  }}>{contract.cofis + "%"}</td>
                <td colspan="4"
                  style={{
                    bordeCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fonStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    whiteSpace: 'nowrap',
                    fontSize: '12.0pt',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'right',
                    verticalAlign: 'middle',
                  }}>IMPOSTO RETIDO COFINS R$:</td>
                <td id="cofis" colspan="1"
                  style={{
                    bordeCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fonStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    whiteSpace: 'nowrap',
                    fontSize: '12.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'right',
                    verticalAlign: 'middle',
                  }}>{(sum.sum * (contract.cofis / 100)).toFixed(2)}</td>
              </tr>
              <tr>
                <td>CSL:</td>
                <td
                  style={{
                    bordeCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fonStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    whiteSpace: 'nowrap',
                    fontSize: '12.0pt',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'right',
                    verticalAlign: 'middle',
                  }}>{contract.csl + "%"}</td>
                <td colspan="4"
                  style={{
                    bordeCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fonStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    whiteSpace: 'nowrap',
                    fontSize: '12.0pt',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'right',
                    verticalAlign: 'middle',
                  }}>IMPOSTO RETIDO CSL R$:</td>
                <td id="csl" colspan="1"
                  style={{
                    bordeCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fonStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    whiteSpace: 'nowrap',
                    fontSize: '12.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'right',
                    verticalAlign: 'middle',
                  }}>{(sum.sum * (contract.csl / 100)).toFixed(2)}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td colspan="4"
                  style={{
                    bordeCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fonStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    whiteSpace: 'nowrap',
                    fontSize: '12.0pt',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'right',
                    verticalAlign: 'middle',
                  }}>TOTAL R$:</td>
                <td id="total" colspan="1"
                  style={{
                    bordeCollapse: 'collapse',
                    padding: '0px',
                    color: 'black',
                    fonStyle: 'normal',
                    textDecoration: 'none',
                    border: 'none',
                    whiteSpace: 'nowrap',
                    fontSize: '12.0pt',
                    fontWeight: '700',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'right',
                    verticalAlign: 'middle',
                  }}>
                  {
                    (sum.sum * ((100 - (parseFloat(contract.irpj) +
                      parseFloat(contract.pis) +
                      parseFloat(contract.cofis) +
                      parseFloat(contract.csl))) / 100)).toFixed(2)
                  }
                </td>
              </tr>
              <tr></tr>
              <tr></tr>
              <tr></tr>
              <tr></tr>

            </table>
          </div>
        </div>
      </div>
    </>

  );

}

export default Extrato