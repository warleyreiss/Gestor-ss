import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { TreeTable } from 'primereact/treetable';

import { Sidebar } from 'primereact/sidebar';
//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { axiosApi } from '../../../services/axios';
import { Link } from 'react-router-dom';

import VisualizarOS from './view-os';
import ServicosOS from './form-os';
export default function DataviewConteudo(props) {
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true);
    const buscarRegistros = () => {
        setLoading(true);
        axiosApi.get("/list_order_service_filter/" + props.data.id)
            .then((response) => {
                setRegistros(response.data)
            })
            .catch(function (error) {
            });

        setLoading(false)
    }

    //requisisção 
    useEffect(() => {
        buscarRegistros()
    }, [])

    const veiculoBodyTemplate = (rowData) => {
        return <span>{rowData.placa + "/ " + rowData.frota}</span>
    }
    const statusBodyTemplate = (rowData) => {

        return (
            <div className="text-right" >
                <Button label={rowData.status_descricao} className={` btn-border-none card-dataview-footer-opcoes-btn status-${rowData.status_descricao.toLowerCase().replace(/\s/g, '')}`} onClick={() => viewOS(rowData)}  >
                </Button>
            </div>
        )
    }

    const [visibleOS, setVisibleOS] = useState(false);
    const [registroview, setVRegistroView] = useState([]);
    const viewOS = (data) => {
        setVRegistroView(data)
        setVisibleOS(true)
    }
    const closedview = () => {
        setVRegistroView([])
        setVisibleOS(false)
    }

    //states
    let emptyregistroOS = {
        id: null
    };
    const [registroOS, setRegistroOS] = useState(emptyregistroOS);
    const [visibleCRU, setVisibleCRU] = useState(false);
    const newOS = (data) => {
        setRegistroOS(data);
        setVisibleCRU(true)
    }
    //função que recebe os dados de um novo cadastro
  const recebidoDoFilhoPostOS = (registro) => {
    buscarRegistros()
    setRegistroOS(emptyregistroOS);
    setVisibleCRU(false)
  }
    return (
        <>
            <DataTable value={registros} responsiveLayout="scroll" className='data-table-os' >
                <Column field="id" header="ID"></Column>
                <Column field="price" header="Placa/Frota" body={veiculoBodyTemplate}></Column>
                <Column field="tipo" header="Demanda"></Column>
                <Column field="produto" header="Produto"></Column>
                <Column field="status" header="Status" body={statusBodyTemplate}></Column>
            </DataTable>
            <div class="text-center card-dataview-footer-opcoes" style={{margin:'15px'}}>
                      <div class="flex justify-content-end flex-wrap">
                        <div class="flex align-items-center justify-content-center">
                          <span className="p-buttonset">
                          <Button label="Criar OS" className='p-button-primary card-dataview-footer-opcoes-btn' icon="pi pi-plus" onClick={() => newOS(props.data.id)} />
              
                           </span>
                        </div>
                      </div>
                    </div>
            <Sidebar className='w-sidebar-right w-sidebar-right ' header={<h3>Cadastrar Ordem de Serviço</h3>} visible={visibleCRU} position="right" blockScroll dismissable={true} onHide={() => setVisibleCRU(false)} style={{ width: '550px' }}>
                <ServicosOS registro={props.data.id} filhoParaPaiPostOS={recebidoDoFilhoPostOS} />
            </Sidebar>
            <Sidebar className='w-sidebar-right' header={<h3>{'Detalhes da Ordem de Serviço: ' + registroview.id}</h3>} visible={visibleOS} position="right" blockScroll onHide={() => closedview()} style={{ width: '40em' }}>
                <VisualizarOS registro={registroview} />
            </Sidebar>
        </>
    )
}