import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { TreeTable } from 'primereact/treetable';

//IMPORTANTO RECURSOS DE FRAMEWORKS E BIBLIOTECAS
import { axiosApi } from '../../../services/axios';
import { Link } from 'react-router-dom';

export default function DataviewConteudo(props) {
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true);
    const buscarRegistros = () => {
        setLoading(true);
        axiosApi.get("/list_order_service_filter/" + props.data.id)
            .then((response) => {
                setRegistros(response.data)
                console.log(response.data)
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

        return(
        <div className="text-right" >
            < Link to={{ pathname: `/ordem-de-servico/show/${rowData.id}` }} >
                <span className={`text-right product-badge status-${rowData.status_descricao.toLowerCase().replace(/\s/g, '')}`}>{rowData.status_descricao}</span>
            </Link >
        </div>
        )
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

        </>
    )
}