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
import { Divider } from 'primereact/divider';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';

import { Dropdown } from 'primereact/dropdown';
import 'primeicons/primeicons.css';

//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { useForm, Controller } from 'react-hook-form';
import { axiosApi } from '../../../services/axios';
import { Link } from 'react-router-dom';
import { Chip } from '@mui/material';


function VisualizarOS(props) {
  const [registro, setRegistro] = useState(props.registro);
  //--------------------------------------------------------------------------------------------------------------|

  return (
    <>
      <ul className="list-none p-0 m-0 list-os">
        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
          <div className=" font-medium">Atendimento realizado?:</div>
          <div className="view-os-detalhe">{registro.atendimento ??'---'}</div>
        </li>
        <div hidden={registro.atendimentoOs=='NAO'}>
          <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
            <div className="view-os-titulo font-medium">motivo do não atendimento:</div>
            <div className="view-os-detalhe">{registro.motivo_nao_atendimento ? registro.motivo_nao_atendimento : '---'}</div>
          </li>
        </div>
        <div >
          <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
            <div className="view-os-titulo font-medium">Violação identificada?:</div>
            <div className="view-os-detalhe">{registro.violacao ? registro.violacao : '---'}</div>
          </li>

        </div>
        <div >
          <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
            <div className="view-os-titulo font-medium">A violação causou danos?:</div>
            <div className="view-os-detalhe">{registro.danos ? registro.danos : '---'}</div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
            <div className="view-os-titulo font-medium">O que foi violado?:</div>
            <div className="view-os-detalhe">{registro.desc_violacao ? registro.desc_violacao : '---'}</div>
          </li>
        </div>
        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
          <div className="view-os-titulo font-medium">Efeito da falha?:</div>
          <div className="view-os-detalhe">{registro.efeito_falha ? registro.efeito_falha.replace('{"','').replace('"}','') : '---'}</div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
          <div className="view-os-titulo font-medium">Causa da falha?:</div>
          <div className="view-os-detalhe">{registro.causa_falha ? registro.causa_falha.replace('{"','').replace('"}','') : '---'}</div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
          <div className="view-os-titulo font-medium">Responsável da falha?:</div>
          <div className="view-os-detalhe">{registro.responsavel_falha ? registro.responsavel_falha.replace('{"','').replace('"}','') : '--'}</div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
          <div className="view-os-titulo font-medium">Solução aplicada?:</div>
          <div className="view-os-detalhe">
          {
                                                registro.solucao ?
                                                    registro.solucao.map((chip) =>
                                                        <>
                                                            <Chip label={chip} className="mr-2 mb-2" />
                                                        </>
                                                    )
                                                    : <h7>Nenhuma solucao aplicada</h7>
                                            }
          </div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
          <div className="view-os-titulo font-medium">Equipamento utilizado?:</div>
          <div className="view-os-detalhe">
          {
                                               registro.material_usado ?
                                                    registro.material_usado.map((chip) =>
                                                        <>
                                                            <Chip label={chip} className="mr-2 mb-2" />
                                                        </>
                                                    )
                                                    : <h7>Nenhum equipamento utilizado</h7>
                                            }
          </div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
          <div className="view-os-titulo font-medium">Equipamento removido?:</div>
          <div className="view-os-detalhe">
          {
                                                registro.material_retirado ?
                                                    registro.material_retirado.map((chip) =>
                                                        <>
                                                            <Chip label={chip} className="mr-2 mb-2" />
                                                        </>
                                                    )
                                                    : <h7>Nenhum equipamento removido</h7>
                                            }
          </div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
          <div className="view-os-titulo font-medium">Periferico?:</div>
          <div className="view-os-detalhe">
            {
                                               registro.periferico ?
                                                   registro.periferico.map((chip) =>
                                                        <>
                                                            <Chip label={chip} className="mr-2 mb-2" />
                                                        </>
                                                    )
                                                    : <h7>Nenhum material utilizado</h7>
                                            }
                                            </div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
          <div className="view-os-titulo font-medium">Registros fotográficos:</div>
          <div className="field w-field col-12 md:col-12" >
            <div className="p-inputgroup ">

              {
                registro.registro_fotograficos ?
                  registro.registro_fotograficos.map((foto) =>
                    <>
                      <img src={foto} alt="registros" width={'300px'} />
                      <Divider />
                    </>
                  )
                  : <h7>Nenhuma imagem salva</h7>
              }
            </div>
          </div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
          <div className="view-os-titulo font-medium">Nome do assinante:</div>
          <div className="view-os-detalhe">{registro.name_signature ? registro.name_signature : 'Sem identificação'}</div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
          <div className="view-os-titulo font-medium">Assinatura:</div>
          <div className="field w-field col-12 md:col-12" >
            <div className="p-inputgroup ">
              <img src={registro.assinatura} alt="assinatura" id='sig-image' />
            </div>
          </div>

        </li>

      </ul>

    </>

  );

}

export default VisualizarOS