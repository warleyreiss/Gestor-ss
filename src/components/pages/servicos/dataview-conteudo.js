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
    return (
        <>
            <DataTable value={registros} responsiveLayout="scroll" className='data-table-os'>
                <Column field="id" header="ID"></Column>
                <Column field="price" header="Placa/Frota" body={veiculoBodyTemplate}></Column>
                <Column field="tipo" header="Demanda"></Column>
                <Column field="produto" header="Produto"></Column>
                <Column field="status" header="Status" body={statusBodyTemplate}></Column>
            </DataTable>
            <Sidebar className='w-sidebar-right' header={<h3>{'Detalhes da Ordem de Serviço: '+registroview.id}</h3>} visible={visibleOS} position="right" blockScroll onHide={() => closedview()} style={{ width: '40em' }}>
          <VisualizarOS registro={registroview}/>
            </Sidebar>
        </>
    )
}