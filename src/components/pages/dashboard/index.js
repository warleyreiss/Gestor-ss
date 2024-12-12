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
import { ProgressSpinner } from 'primereact/progressspinner';

import { StyleClass } from 'primereact/styleclass/';
import { Tooltip } from 'primereact/tooltip';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';
import { TabView, TabPanel } from 'primereact/tabview';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { InputNumber } from 'primereact/inputnumber';
import { mask } from 'primereact/utils';
import 'primeicons/primeicons.css';

//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { useForm, Controller, set } from 'react-hook-form';
import { axiosApi } from '../../../services/axios';
import { Link } from 'react-router-dom';
import { Badge } from '@mui/material';

function Dashboard() {

  const [ordensPagamentosTotais, setOrdensPagamentosTotais] = useState([]);
  const [totalVendas, setTotalVendas] = useState([]);
  const [totalVendasRecebiveis, setTotalVendasRecebiveis] = useState([]);
  const [totalRecebido, setTotalRecebido] = useState([]);
  const [totalPendenteCartao, setTotalPendenteCartao] = useState([]);
  const [totalExecucao, setTotalExecucao] = useState([]);
  const [totalEntradasPendentes, setTotalEntradasPendentes] = useState([]);
  const [totalDesconto, setTotalDesconto] = useState([]);
  const [totalDescontoMaquininha, setTotalDescontoMaquininha] = useState([]);
  const [totalPago, setTotalPago] = useState([]);
  const [totalPagamentos, setTotalPagamentos] = useState([]);
  const [totalPendentePagamento, setTotalPendentePagamento] = useState([]);
  const [totalDespesasExtras, setTotalDespesasExtras] = useState([]);
  const [totalcustoProdutos, setTotalcustoProdutos] = useState([]);
  const [totalcustoServicos, setTotalcustoServicos] = useState([]);
  const [qdadeEntradasPendentes, setQdadeEntradasPendentes] = useState(0);
  const [qdadePendentePagamento, setQdadePendentePagamento] = useState(0);
  const [qdadePagamentosVecidos, setQdadePagamentosVecidos] = useState(0);
  const [chart, setChart] = useState({});
  const [chart2, setChart2] = useState({});
  const [chart3, setChart3] = useState({});
  const [chart4, setChart4] = useState({});
  const [chart5, setChart5] = useState({});

  //requisisção 

  const frasesMotivacionais = [
    '',
    "Você está mais perto do que imagina!",
    "Cada passo conta, continue avançando!",
    "A persistência é a chave do sucesso.",
    "O esforço de hoje é a vitória de amanhã.",
    "Acredite em si mesmo; você é capaz!",
    "O caminho pode ser difícil, mas a recompensa vale a pena.",
    "A linha de chegada está mais próxima do que parece.",
    "Você já percorreu um longo caminho; não desista agora!",
    "Cada pequeno progresso é uma grande conquista.",
    "O sucesso é a soma de pequenos esforços repetidos diariamente.",
    "Você tem tudo o que precisa dentro de você.",
    "A recompensa está a um passo da sua coragem.",
    "A vitória é mais doce quando você luta por ela.",
    "O seu sonho está a um esforço de distância.",
    "Mantenha o foco; a meta está logo ali!",
    "Lembre-se: cada dia é uma nova oportunidade.",
    "Você é mais forte do que pensa!",
    "A jornada é tão importante quanto o destino.",
    "Nunca subestime o poder da determinação.",
    "Dê o seu melhor, e o melhor virá!",
    "Acredite que você pode, e você já está no meio do caminho.",
    "A última milha é sempre a mais gratificante.",
    "Transforme suas dúvidas em combustível para a vitória.",
    "As dificuldades são temporárias, o sucesso é eterno.",
    "O sucesso não é um destino, mas uma jornada.",
    "Continue, mesmo quando parecer impossível.",
    "Grandes realizações requerem grandes esforços.",
    "Lute com coragem e chegue à vitória!",
    "Você é o arquiteto do seu próprio destino.",
    "As melhores coisas vêm para aqueles que não desistem.",
    "Cada desafio é uma nova oportunidade de crescer.",
    "A sua determinação hoje molda seu sucesso amanhã.",
    "Não olhe para trás; o futuro é brilhante!",
    "Celebre cada pequena conquista ao longo do caminho.",
    "Desistir nunca deve ser uma opção.",
    "A grandeza está a um passo da perseverança.",
    "Você já chegou até aqui; continue firme!",
    "O que parece difícil agora será sua história de sucesso amanhã.",
    "Seja a mudança que você quer ver em sua vida.",
    "A sua jornada é única; não a compare com a dos outros.",
    "Enfrente os desafios com um sorriso; você pode superar!",
    "A confiança é o primeiro passo para a realização.",
    "Você é capaz de realizar coisas incríveis.",
    "Mantenha a fé em si mesmo e no seu potencial.",
    "O seu esforço hoje define seu sucesso amanhã.",
    "A luta é real, mas a vitória é certa!",
    "Transforme cada obstáculo em um degrau rumo ao seu sonho.",
    "Acredite no seu processo; cada passo é importante.",
    "Você está prestes a realizar algo extraordinário!",
    "Continue, porque a melhor parte da sua jornada está chegando!"
  ];
  const frasesParabenizacao = [
    '',
    "Parabéns! Você está fazendo um trabalho incrível!",
    "Continue assim, você está se superando!",
    "É maravilhoso ver sua dedicação e esforço!",
    "Você merece todos os elogios pelo seu comprometimento!",
    "Parabéns por se manter firme na sua meta!",
    "Sua determinação é inspiradora, continue assim!",
    "Você está colhendo os frutos do seu trabalho duro!",
    "É incrível ver como você está progredindo!",
    "Você está realmente fazendo a diferença na sua vida!",
    "Parabéns por cada pequeno passo que você deu!",
    "Seu esforço está valendo a pena, continue!",
    "Você está provando que é capaz de grandes conquistas!",
    "A sua disciplina é admirável, parabéns!",
    "Você está alcançando seus objetivos com muita garra!",
    "A cada dia, você se aproxima mais do seu sonho!",
    "Você está fazendo tudo certo, continue nessa vibe!",
    "Parabéns por ser tão consistente e focado!",
    "Sua jornada é inspiradora, continue a brilhar!",
    "Você está se destacando de uma maneira incrível!",
    "Seu empenho é contagiante, mantenha o foco!",
    "Parabéns por transformar suas metas em realidade!",
    "Você é um exemplo de perseverança, continue assim!",
    "Seu trabalho duro não passa despercebido, parabéns!",
    "Cada dia é uma vitória, e você está ganhando!",
    "Você está mostrando que é possível alcançar suas metas!",
    "Parabéns por sua coragem e determinação!",
    "Você merece todo o sucesso que está conquistando!",
    "Seu progresso é uma prova de sua dedicação!",
    "Continue firme, você está indo muito bem!",
    "Parabéns por manter o foco e a disciplina!",
    "Você está fazendo um trabalho excepcional!",
    "Seu esforço é admirável, não pare agora!",
    "Parabéns! O sucesso é apenas uma questão de tempo!",
    "Você está indo longe, continue nesse caminho!",
    "A sua jornada é inspiradora para todos ao seu redor!",
    "Você está provando que a persistência traz resultados!",
    "Parabéns por ser uma fonte de motivação!",
    "Você está realmente alcançando seus objetivos!",
    "Continue assim, seu futuro é brilhante!",
    "Cada dia é uma nova chance de brilhar, e você está aproveitando!",
    "Parabéns pela coragem de seguir em frente!",
    "Você está escrevendo sua própria história de sucesso!",
    "Seu comprometimento é digno de aplausos!",
    "Parabéns! Você está superando suas próprias expectativas!",
    "A cada passo, você está mais perto do seu sonho!",
    "Seu esforço é um exemplo para todos nós!",
    "Parabéns! Você está construindo um futuro incrível!",
    "Continue a brilhar, você é capaz de muito mais!",
    "Você é a prova de que a determinação traz resultados!",
    "Parabéns por manter a constância na sua jornada!",
    "Você está fazendo história com suas conquistas!",
    "Seu foco e dedicação são realmente inspiradores!",
    "Parabéns! Você está fazendo valer a pena!",
    "Cada conquista sua é motivo de celebração!",
    "Continue firme, você é uma verdadeira inspiração!"
  ];


  const atualizar = () => {

    axiosApi.get("/dashboard/" + JSON.parse(localStorage.getItem("@Auth:periodoInicio")) + "/" + JSON.parse(localStorage.getItem("@Auth:periodoFim")))
      .then((response) => {

        setOrdensPagamentosTotais(response.data.ordensPagamentosStatus)
        setTotalRecebido(response.data.totalRecebido ?? 0)
        setTotalVendas((parseFloat(response.data.totalVendas) + parseFloat(response.data.qdadeEntradasPendentes.valor)).toFixed(2) ?? 0)
        setTotalVendasRecebiveis((parseFloat(response.data.totalVendasRecebiveis) + parseFloat(response.data.qdadeEntradasPendentes.valor)).toFixed(2) ?? 0)
        setTotalPendenteCartao(response.data.totalPendenteCartao ?? 0)
        setTotalExecucao(response.data.totalExecucao ?? 0)
        setTotalEntradasPendentes(response.data.totalEntradasPendentes ?? 0)
        setTotalDesconto(response.data.totalDesconto ?? 0)
        setTotalDescontoMaquininha(response.data.totalDescontoMaquininha ?? 0)
        setTotalPago(response.data.totalPago ?? 0)
        setTotalPagamentos(response.data.totalPagamentos ?? 0)
        setTotalPendentePagamento(response.data.totalPendentePagamento ?? 0)
        setTotalDespesasExtras(response.data.totalDespesasExtras ?? 0)
        setTotalcustoProdutos(response.data.totalcustoProdutos ?? 0)
        setTotalcustoServicos(response.data.totalcustoServicos ?? 0)
        setQdadeEntradasPendentes(response.data.qdadeEntradasPendentes ?? { valor: 0, qdade: 0 })
        setQdadePendentePagamento(response.data.qdadePendentePagamento ?? { valor: 0, qdade: 0 })
        setQdadePagamentosVecidos(response.data.qdadePagamentosVecidos ?? { valor: 0, qdade: 0 })
        setChart({
          labels: response.data.somaDiaria.map((item) => item.data),
          datasets: [
            {
              label: '',
              data: response.data.somaDiaria.map((item) => item.valor_pago),
              fill: true,
              borderColor: 'rgb(255,99,132)',
              backgroundColor: 'rgba(255,99,132,0.3)',
            }
          ]
        })

      })
      .catch(function (error) {
      });
  }


  const [spinner, setSpinner] = useState(true);

  const [titulo, setTitulo] = useState('');
  const [lista, setLista] = useState([]);
  const [frase, setFrase] = useState('');
  const [icon, setIcon] = useState('');
  const [cor, setCor] = useState('');
  const gestor = () => {
    setSpinner(false)
    const numeroAleatorio = Math.floor(Math.random() * (50)) + 0;
    const lista = []
    const hoje = new Date()
    const final = new Date(JSON.parse(localStorage.getItem("@Auth:periodoFim")))


    setTitulo('TUDO CERTO! CONTINUE ASSIM')
    setLista([])
    setFrase(frasesParabenizacao[numeroAleatorio])
    setCor('bg-green-500')
    setIcon(<i className="pi pi-check-circle" style={{ 'fontSize': '2em' }}></i>)

    setTimeout(function () {
      setSpinner(true)

      if (qdadeEntradasPendentes.qdade > 0) {
        //amarelo
        setTitulo('HÁ PENDÊNCIAS A SEREM OBSERVADAS')
        setIcon(<i className="pi pi-search-plus" style={{ 'fontSize': '2em' }}></i>)
        setCor('bg-yellow-400')
        setFrase(frasesMotivacionais[numeroAleatorio])
      }
      if (qdadePendentePagamento.qdade > 0 && hoje > final) {
        //amarelo
        setTitulo('HÁ PENDÊNCIAS A SEREM OBSERVADAS')
        setIcon(<i className="pi pi-search-plus" style={{ 'fontSize': '2em' }}></i>)
        setCor('bg-yellow-400')
        setFrase(frasesMotivacionais[numeroAleatorio])
        lista.push(<li>{'Há ' + qdadePendentePagamento.qdade + ' de registros de pagamento pendentes! um total de R$' + qdadePendentePagamento.valor + ' mas pode ficar tranquilo, ainda não estão vencidos'}</li>)

      }
      if (qdadePagamentosVecidos.qdade > 0) {
        //vermelho
        setTitulo('NECESSITA DE ATENÇÃO')
        setIcon(<i className="pi pi-discord" style={{ 'fontSize': '2em' }}></i>)
        setCor('bg-red-500')
        setFrase(frasesMotivacionais[numeroAleatorio])
        lista.push(<li>{'Há ' + qdadePagamentosVecidos.qdade + ' pagamentos vencidos! um total de R$' + qdadePagamentosVecidos.valor}</li>)
      }

      setLista(lista)
    }, 1000);

  }

  useEffect(() => {
    atualizar()
    gestor()
  }, [])

  const refresh = () => {
    atualizar()
    gestor()
  }
  return (
    <>
      <Card className='w-card' header={'Detalhamento de despesas Extras'} style={{ marginTop: '5px' }} onClick={(e) => { refresh() }}>
        <h6>{'vendas iniciadas no periodo de ' + JSON.parse(localStorage.getItem("@Auth:periodoInicio")) + " a " + JSON.parse(localStorage.getItem("@Auth:periodoFim"))}</h6>
        <div class="flex flex-row-reverse flex-wrap">
          <div class="flex align-items-center justify-content-center">
            <Button className="p-button-outlined" icon='pi pi-sync' />
          </div>
        </div>

        <div className="col-12" hidden={spinner}>
          <div className="text-center p-3 border-round-sm font-bold">
            <div className="card">
              <h5>Verificando....</h5>
              <ProgressSpinner />
            </div>
          </div>
        </div>
        <div hidden={!spinner} className={cor} style={{ marginBottom: '10px', marginTop: '20px', borderRadius: '3px' }}>
          <div className="grid nested-grid" >
            <div className="col-8">
              <div className="grid">
                <div className="col-12">
                  <div className="text-center p-3 border-round-sm font-bold"><h1 style={{ color: 'black' }}>{titulo}</h1></div>
                </div>
                <div className="col-12">
                  <div className="text-center p-3 border-round-sm font-bold" style={{ color: 'black' }}>{lista}</div>
                </div>
                <div className="col-12">
                  <div className="text-center p-3 border-round-sm font-bold"><h3 style={{ color: 'black' }}>{frase}</h3></div>
                </div>
              </div>
            </div>
            <div className="col-4">

              <div className="text-center p-3 border-round-sm h-full font-bold" style={{ fontSize: '4rem', color: 'black' }}>{icon}</div>
            </div>
          </div>

        </div>
        <div hidden={!spinner}>
          <div className="flex justify-content-between flex-wrap w-card-dashboard-stats">
            <div className="flex align-items-center justify-content-center  font-bold border-round m-2 w-card-dashboard-stats-cards" >
              <div className="flex flex-column" >
                <div className="flex align-items-center justify-content-center m-2"><h4>Volume total:</h4></div>
                <div className="flex align-items-center justify-content-center  m-2"><h1>{totalVendas}</h1></div>

                <div className="flex align-items-center">
                  <Tooltip target=".custom-tooltip-btn-1" >
                    <div style={{ padding: '10px' }}>
                      <h5> É o volume total das vendas realizadas:
                      </h5>
                      <h6>
                        Método: valor pago + valores inadiplendes + valor ofertado em desconto + tarifas <br />
                        Referência: data de início da VENDA/ORDEM SERVIÇO
                      </h6>
                    </div>
                  </Tooltip>
                  <Button className="custom-tooltip-btn-1" type="button" icon="pi  pi-question-circle" />
                </div>

              </div>
            </div>
            <div className="flex align-items-center justify-content-center  font-bold border-round m-2 w-card-dashboard-stats-cards" >
              <div className="flex flex-column" >
                <div className="flex align-items-center justify-content-center m-2"><h4>Total real:</h4></div>
                <div className="flex align-items-center justify-content-center  m-2"><h1>{totalVendasRecebiveis}</h1></div>

                <div className="flex align-items-center">
                  <Tooltip target=".custom-tooltip-btn-2" >
                    <div style={{ padding: '10px' }}>
                      <h5> É valor real dos recebiveis das vendas realizadas:
                      </h5>
                      <h6>
                        Método: valor já recebido + valores á receber de cartão + valores inadiplendes <br />
                        Referência: data de início da VENDA/ORDEM SERVIÇO
                      </h6>
                    </div>
                  </Tooltip>
                  <Button className="custom-tooltip-btn-2" type="button" icon="pi  pi-question-circle" />
                </div>

              </div>
            </div>
            <Divider layout="vertical" className='w-card-dashboard-estatisticas-divider' />
            <div className="flex align-items-center justify-content-center  font-bold border-round m-2 w-card-dashboard-stats-cards" >
              <div className="flex flex-column" >
                <div className="flex align-items-center justify-content-center m-2"><h4> já Recebido:</h4></div>
                <div className="flex align-items-center justify-content-center  m-2"><h1>{totalRecebido}</h1></div>
                <div className="flex align-items-center">
                  <Tooltip target=".custom-tooltip-btn-3" >
                    <div style={{ padding: '10px' }}>
                      <h5> É o valor já em sua posse:
                      </h5>
                      <h6>
                        Método: valores já recebido em cartão <br />
                        Referência: data de início da VENDA/ORDEM SERVIÇO
                      </h6>
                    </div>
                  </Tooltip>
                  <Button className="custom-tooltip-btn-3" type="button" icon="pi  pi-question-circle" />
                </div>
              </div>
            </div>
            <Divider layout="vertical" className='w-card-dashboard-estatisticas-divider' />
            <div className="flex align-items-center justify-content-center  font-bold border-round m-2 w-card-dashboard-stats-cards" >
              <div className="flex flex-column">
                <div className="flex align-items-center justify-content-center m-2"><h4>Á receber: (cartão)</h4></div>
                <div className="flex align-items-center justify-content-center  m-2"><h1>{totalPendenteCartao}</h1></div>
                <div className="flex align-items-center">
                  <Tooltip target=".custom-tooltip-btn-4" >
                    <div style={{ padding: '10px' }}>
                      <h5> É o valor recebido, porém esta em posse da operadora de cartao:
                      </h5>
                      <h6>
                        Método: valores á receber de cartão <br />
                        Referência: data de início da VENDA/ORDEM SERVIÇO
                      </h6>
                    </div>
                  </Tooltip>
                  <Button className="custom-tooltip-btn-4" type="button" icon="pi  pi-question-circle" />
                </div>
              </div>
            </div>
            <Divider layout="vertical" className='w-card-dashboard-estatisticas-divider' />
            <div className="flex align-items-center justify-content-center  font-bold border-round m-2 w-card-dashboard-stats-cards" >
              <div className="flex flex-column">
                <div className="flex align-items-center justify-content-center m-2"><h4>Inadiplência</h4></div>
                <div className="flex align-items-center justify-content-center  m-2"><h1>{totalEntradasPendentes}</h1></div>
                <div className="flex align-items-center">
                  <Tooltip target=".custom-tooltip-btn-4" >
                    <div style={{ padding: '10px' }}>
                      <h5> É o valor não pago que ficou pendente na finalização da venda
                      </h5>
                      <h6>
                        Método: valores á receber de clientes <br />
                        Referência: data de início da VENDA/ORDEM SERVIÇO
                      </h6>
                    </div>
                  </Tooltip>
                  <Button className="custom-tooltip-btn-4" type="button" icon="pi  pi-question-circle" />
                </div>

              </div>
            </div>
            <Divider layout="vertical" className='w-card-dashboard-estatisticas-divider' />
            <div className="flex align-items-center justify-content-center  font-bold border-round m-2 w-card-dashboard-stats-cards" >
              <div className="flex flex-column">
                <div className="flex align-items-center justify-content-center m-2"><h4>Tarifas:(cartão)</h4></div>
                <div className="flex align-items-center justify-content-center  m-2"><h1>{totalDescontoMaquininha}</h1></div>
                <div className="flex align-items-center">
                  <Tooltip target=".custom-tooltip-btn-5" >
                    <div style={{ padding: '10px' }}>
                      <h5> É o valor recolhido pela operadora de cartão
                      </h5>
                      <h6>
                        Método: valores pago para operadora de cartão <br />
                        Referência: data de início da VENDA/ORDEM SERVIÇO
                      </h6>
                    </div>
                  </Tooltip>
                  <Button className="custom-tooltip-btn-5" type="button" icon="pi  pi-question-circle" />
                </div>
              </div>
            </div>
            <Divider layout="vertical" className='w-card-dashboard-estatisticas-divider' />
            <div className="flex align-items-center justify-content-center  font-bold border-round m-2 w-card-dashboard-stats-cards" >
              <div className="flex flex-column">
                <div className="flex align-items-center justify-content-center m-2"><h4>Em execução</h4></div>
                <div className="flex align-items-center justify-content-center  m-2"><h1>{totalExecucao}</h1></div>
                <div className="flex align-items-center">
                  <Tooltip target=".custom-tooltip-btn-6" >
                    <div style={{ padding: '10px' }}>
                      <h5> É o valor de produtos e serviços que estão sendo executaos no momento
                      </h5>
                      <h6>
                        Método: valor total produtos + valor total serviços<br />
                        Referência: data de início da VENDA/ORDEM SERVIÇO
                      </h6>
                    </div>
                  </Tooltip>
                  <Button className="custom-tooltip-btn-6" type="button" icon="pi  pi-question-circle" />
                </div>
              </div>
            </div>
            <Divider layout="vertical" className='w-card-dashboard-estatisticas-divider' />
            <div className="flex align-items-center justify-content-center  font-bold border-round m-2 w-card-dashboard-stats-cards" >
              <div className="flex flex-column">
                <div className="flex align-items-center justify-content-center m-2"><h4>Valor desconto ofertado</h4></div>
                <div className="flex align-items-center justify-content-center  m-2"><h1>{totalDesconto}</h1></div>

              </div>
            </div>

          </div>
          <div className="flex justify-content-between flex-wrap w-card-dashboard-stats" style={{ marginTop: '10px' }}>
            <div className="flex align-items-center justify-content-center  font-bold border-round m-2 w-card-dashboard-stats-cards" >
              <div className="flex flex-column" >
                <div className="flex align-items-center justify-content-center m-2"><h4>Valor total de pagamentos</h4></div>
                <div className="flex align-items-center justify-content-center  m-2"><h1>{totalPagamentos}</h1></div>
              </div>
            </div>
            <Divider layout="vertical" className='w-card-dashboard-estatisticas-divider' />
            <div className="flex align-items-center justify-content-center  font-bold border-round m-2 w-card-dashboard-stats-cards" >
              <div className="flex flex-column" >
                <div className="flex align-items-center justify-content-center m-2"><h4>Valor pago</h4></div>
                <div className="flex align-items-center justify-content-center  m-2"><h1>{totalPago}</h1></div>
              </div>
            </div>
            <Divider layout="vertical" className='w-card-dashboard-estatisticas-divider' />
            <div className="flex align-items-center justify-content-center  font-bold border-round m-2 w-card-dashboard-stats-cards" >
              <div className="flex flex-column">
                <div className="flex align-items-center justify-content-center m-2"><h4>Valor Pendente para pagar</h4></div>
                <div className="flex align-items-center justify-content-center  m-2"><h1>{totalPendentePagamento}</h1></div>
              </div>
            </div>
            <Divider layout="vertical" className='w-card-dashboard-estatisticas-divider' />
            <div className="flex align-items-center justify-content-center  font-bold border-round m-2 w-card-dashboard-stats-cards" >
              <div className="flex flex-column">
                <div className="flex align-items-center justify-content-center m-2"><h4>Valor despesas extras</h4></div>
                <div className="flex align-items-center justify-content-center  m-2"><h1>{totalDespesasExtras}</h1></div>
              </div>
            </div>

            <Divider layout="vertical" className='w-card-dashboard-estatisticas-divider' />
          </div>
          <div className="flex justify-content-between flex-wrap w-card-dashboard-stats" style={{ marginTop: '10px' }}>
            <div className="flex align-items-center justify-content-center  font-bold border-round m-2 w-card-dashboard-stats-cards" >
              <div className="flex flex-column">
                <div className="flex align-items-center justify-content-center m-2"><h4>Valor desconto maquininha</h4></div>
                <div className="flex align-items-center justify-content-center  m-2"><h1>{totalDescontoMaquininha}</h1></div>
              </div>
            </div>
            <div className="flex align-items-center justify-content-center  font-bold border-round m-2 w-card-dashboard-stats-cards" >
              <div className="flex flex-column">
                <div className="flex align-items-center justify-content-center m-2"><h4>Custo dos produtos (OS finalizada)</h4></div>
                <div className="flex align-items-center justify-content-center  m-2"><h1>{totalcustoProdutos}</h1></div>
              </div>
            </div>

            <div className="flex align-items-center justify-content-center  font-bold border-round m-2 w-card-dashboard-stats-cards" >
              <div className="flex flex-column">
                <div className="flex align-items-center justify-content-center m-2"><h4>Custo serviços (OS finalizada)</h4></div>
                <div className="flex align-items-center justify-content-center  m-2"><h1>{totalcustoServicos}</h1></div>
              </div>
            </div>
          </div>
          <div className="p-fluid grid">
            <div className="field w-field col-12 md:col-8">
              <div className='w-card-dashboard-contents'>
                <span className='w-card-dashboard-contents-span'>Despesa por dia (radar)</span>
                <Chart type="radar" data={chart} style={{ width: '400px' }} />
              </div>
            </div>
            <div className="field w-field col-12 md:col-4">

            </div>
          </div>
        </div>
      </Card >
    </>

  );

}

export default Dashboard