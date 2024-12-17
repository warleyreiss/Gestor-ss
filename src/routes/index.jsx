
//import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'

//COMPONENTES DA PAGINA
import SideBar from '../components/layout/sidebar/SideBar'
//PAGINAS
import Signin from '../components/pages/auth/signin'

import Clientes from '../components/pages/cliente/index'
import FrotaInterna from '../components/pages/frota_interna/index'
import HistoricoServicos from '../components/pages/historicos/servicos'
import HistoricoTickets from '../components/pages/historicos/tickets'
import HistoricoVisitas from '../components/pages/historicos/visitas'
import Usuarios from '../components/pages/usuarios/index'
import Veiculos from '../components/pages/veiculos/index'
/*
import Home from '../components/pages/home/home_tecnica'


import ContratcMenu from '../components/pages/contract/menu'
import ContractCRU from '../components/pages/contract/form-cru'
import ContractView from '../components/pages/contract/view'

import EquipmentMenu from '../components/pages/equipment/menu'
import EquipmentCRU from '../components/pages/equipment/form-cru'
import EquipmentCompulsory from '../components/pages/equipment/form-compulsory'
import EquipmentCompulsoryUnworn from '../components/pages/equipment/form-compulsory-unworn'
import EquipmentDelete from '../components/pages/equipment/form-delete'
import EquipmentFormTracking from '../components/pages/equipment/form-tracking'//rastreio
import EquipmentTransfer from '../components/pages/equipment/form-transfer'
//import EquipmentTransferSmart from './components/pages/equipment/form-transfer-smart'
import EquipmentAccept from '../components/pages/equipment/view-accept'
import EquipmentStocks from '../components/pages/equipment/view-stocks'//todos estoques
import EquipmentWarehouse from '../components/pages/equipment/view-warehouse'
import EquipmentMe from '../components/pages/equipment/view-me'
import EquipmentAll from '../components/pages/equipment/view-all'
import EquipmentUser from '../components/pages/equipment/view-user'
import EquipmentTracking from '../components/pages/equipment/view-tracking'
import EquipmentReturn from '../components/pages/equipment/form-return'
import EquipmentAdjust from '../components/pages/equipment/form-adjust'
import RequestShow from '../components/pages/equipment/view-request-show'
import RequestList from '../components/pages/equipment/view-request-list'
import ErrorView from '../components/pages/error/view'

import HardwareMenu from '../components/pages/hardware/menu'
import HardwareListInspection from '../components/pages/hardware/view-order-service-inspection'
import HardwareInspection from '../components/pages/hardware/view-inspection'
import HardwareListMaintenance from '../components/pages/hardware/view-order-service-maintenance'
import HardwareMaintenance from '../components/pages/hardware/view-maintenance'
import HardwareListView from '../components/pages/hardware/view'
import HardwareServiceShow from '../components/pages/hardware/view-service-show'
import HardwareOrderOfServiceShow from '../components/pages/hardware/view-order-service-show'

import HistoryService from '../components/pages/history/view-service'
import HistoryVisite from '../components/pages/history/view-visite'
import HistoryTicket from '../components/pages/history/view-ticket'
import HistoryServiceHardware from '../components/pages/history/view-hardware'
import HistoryInternalFleetMaintenance from '../components/pages/history/view-internal-fleet-maintenance'
import HistoryInternalFleetMaintenanceId from '../components/pages/history/view-internal-fleet-maintenance-Id'
import HistoryInternalFleetFuel from '../components/pages/history/view-internal-fleet-fuel'
import HistoryInternalFleetFuelId from '../components/pages/history/view-internal-fleet-fuel-id'

import InternalFleetCRU from '../components/pages/internal-fleet/form-cru'
import InternalFleetTrasnfer from '../components/pages/internal-fleet/form-transfer'
import InternalFleetView from '../components/pages/internal-fleet/view'
import InternalFleetMenu from '../components/pages/internal-fleet/menu'
import InternalFleetTracking from '../components/pages/internal-fleet/view-tracking'
import InternalFleetTransferShow from '../components/pages/internal-fleet/view-transfer-show'
import VehicleFuel from '../components/pages/internal-fleet/form-fuel'

import OrderServiceCRU from '../components/pages/order-service/form-cru'
import OrderServiceAssess from '../components/pages/order-service/form-assess' //avaliação
import OrderServiceInstallation from '../components/pages/order-service/form-installation'
import OrderServiceMaintenance from '../components/pages/order-service/form-maintenance'
import OrderServiceTraining from '../components/pages/order-service/form-training'
import OrderServiceRemoval from '../components/pages/order-service/form-removal'
import OrderServiceSignature from '../components/pages/order-service/form-signature'//assiantura
import OrderServiceShow from '../components/pages/order-service/view-show'
import OrderOfServiceCancel from '../components/pages/order-service/form-cancel'

import ServiceMenu from '../components/pages/service/menu'
import ServiceCRU from '../components/pages/service/form-cru'
import ServiceFormSearch from '../components/pages/service/form-search'
import ServiceAll from '../components/pages/service/view-all'
import ServiceShow from '../components/pages/service/view-show'
import ServiceView from '../components/pages/service/view'
import ServiceCancel from '../components/pages/service/form-cancel'
import ServiceFinalize from '../components/pages/service/form-finalize'

import TicketMenu from '../components/pages/ticket/menu'
import TicketAccept from '../components/pages/ticket/view-accept'
import TicketExtract from '../components/pages/ticket/view-extract2'
import TicketConsolidatedOpen from '../components/pages/ticket/view-consolidated-open'
import TicketConsolidated from '../components/pages/ticket/view-consolidated'
import TicketFaturamento from '../components/pages/ticket/view-faturamento'
import TicketShow from '../components/pages/ticket/view-show'
import TicketReturn from '../components/pages/ticket/form-return'
import TicketEdite from '../components/pages/ticket/form-edite'
import TicketTracking from '../components/pages/ticket/view-tracking'
import TicketCancel from '../components/pages/ticket/form-cancel'
import TicketCancelExtract from '../components/pages/ticket/form-cancel-extract'
import TicketAcceptReturn from '../components/pages/ticket/view-return'
import TicketReaccept from '../components/pages/ticket/form-reaccept'

import UserMenu from '../components/pages/user/menu'
import UserCRU from '../components/pages/user/form-cru'
import UserView from '../components/pages/user/view'
import PerfilUser from '../components/pages/user/view-perfil'

import VehicleCRU from '../components/pages/vehicle/form-cru'
import VehicleView from '../components/pages/vehicle/view'
import VisitShow from '../components/pages/visit/view-show'

import JustificationVisit from '../components/pages/visit/form-justification'
import CorrectionVisit from '../components/pages/visit/form-correction'
*/

import { AuthProvider } from '../context/AuthContext';
import { PrivateRoute } from '../components/layout/sidebar/privateRoutes'


export const AppRouter = () => {
  return (
    <Router>
      <SideBar />
      <Routes>
      <Route exact path="/" element={<PrivateRoute />} >
          <Route path="/" element={<Signin />}/>
        </Route>
      
        <Route path="/login" element={<Signin />} /> 
        
        <Route path="/clientes" element={<PrivateRoute />} >
          <Route path="/clientes" element={<Clientes/>} />
        </Route>
        <Route path="/frota_interna" element={<PrivateRoute />} >
          <Route path="/frota_interna" element={<FrotaInterna/>} />
        </Route>
        <Route path="/historico_servicos/:inicio/:fim" element={<PrivateRoute />} >
          <Route path="/historico_servicos/:inicio/:fim" element={<HistoricoServicos/>} />
        </Route>
        <Route path="/historico_tickets/:inicio/:fim" element={<PrivateRoute />} >
          <Route path="/historico_tickets/:inicio/:fim" element={<HistoricoTickets/>} />
        </Route>
        <Route path="/historico_visitas/:inicio/:fim" element={<PrivateRoute />} >
          <Route path="/historico_visitas/:inicio/:fim" element={<HistoricoVisitas/>} />
        </Route>
        <Route path="/usuarios" element={<PrivateRoute />} >
          <Route path="/usuarios" element={<Usuarios/>} />
        </Route>
        <Route path="/veiculos" element={<PrivateRoute />} >
          <Route path="/veiculos" element={<Veiculos/>} />
        </Route>
        {/*  
         <Route exact path="/" element={<PrivateRoute />} >
          <Route path="/" element={<ServiceView />} />
        </Route>
        <Route exact path="/home" element={<PrivateRoute />} >
          <Route path="/home" element={<ServiceView />} />
        </Route>

        <Route path="/client/form/:id?" element={<ClientCRU />} />
        <Route path="/client/view" element={<ClientView />} />
       
        <Route path="/contract" element={<PrivateRoute />} >
          <Route path="/contract" element={<ContratcMenu />} />
        </Route>
        <Route path="/contract/form/:id?" element={<ContractCRU />} />
        <Route path="/contract/view" element={<ContractView />} />
        <Route path="/equipment" element={<PrivateRoute />} >
          <Route path="/equipment" element={<EquipmentMenu />} />
        </Route>
        <Route path="/equipment/form/:id?" element={<EquipmentCRU />} />
        
        <Route path="/equipment/form-compulsory" element={<EquipmentCompulsory />} />
        <Route path="/equipment/form-compulsory-unworn" element={<EquipmentCompulsoryUnworn />} />
        <Route path="/equipment/form-delete/:id" element={<EquipmentDelete />} />
        <Route path="/equipment/form-tracking" element={<EquipmentFormTracking />} />
        <Route path="/equipment/transfer" element={<EquipmentTransfer />} />
        <Route path="/equipment/trasnfer-smart" element={<EquipmentAccept />} />
        <Route path="/equipment/stocks" element={<EquipmentStocks />} />
        <Route path="/equipment/warehouse/:id" element={<EquipmentWarehouse />} />
        <Route path="/equipment/accept" element={<EquipmentAccept />} />
        <Route path="/equipment/me" element={<EquipmentMe />} />
        <Route path="/equipment/all" element={<EquipmentAll />} />
        <Route path="/equipment/user/:id" element={<EquipmentUser />} />
        <Route path="/equipment/tracking/:id" element={< EquipmentTracking />} />
        <Route path="/equipment/form-return" element={< EquipmentReturn />} />
        <Route path="/equipment/form-adjust" element={< EquipmentAdjust />} />
        <Route path="/equipment/request-show/:id" element={< RequestShow />} />
        <Route path="/equipment/request-list" element={< RequestList />} />
        <Route path="*" element={<ErrorView />} />

        <Route path="/hardware" element={<PrivateRoute />} >
          <Route path="/hardware" element={<HardwareMenu />} />
        </Route>
        <Route path="/hardware/list-inspection" element={<HardwareListInspection />} />
        <Route path="/hardware/inspection/:object" element={<HardwareInspection />} />
        <Route path="/hardware/list-maintenance" element={<HardwareListMaintenance />} />
        <Route path="/hardware/maintenance/:object" element={<HardwareMaintenance />} />
        <Route path="/hardware/list-services" element={<HardwareListView />} />
        <Route path="/hardware/service/show/:id" element={<HardwareServiceShow />} />
        <Route path="/hardware/ordem-de-servico/show/:id" element={<HardwareOrderOfServiceShow />} />

        <Route path="/history/service/:inicio/:fim" element={<HistoryService />} />
        <Route path="/history/visite/:inicio/:fim" element={<HistoryVisite />} />
        <Route path="/history/ticket/:inicio/:fim" element={<HistoryTicket />} />
        <Route path="/hardware/history/service/:inicio/:fim" element={< HistoryServiceHardware />} />
        <Route path="/history/internal-fleet/fuel/:id?/:inicio/:fim" element={<HistoryInternalFleetFuel />} />
        <Route path="/history/internal-fleet/fuel/:id" element={<HistoryInternalFleetFuelId />} />
        <Route path="/history/internal-fleet/maintenance/:inicio/:fim" element={<HistoryInternalFleetMaintenance />} />
        <Route path="/history/internal-fleet/maintenance/:id" element={<HistoryInternalFleetMaintenanceId />} />

        <Route path="/internal-fleet/form/:id?" element={<InternalFleetCRU />} />
        <Route path="/internal-fleet/view" element={<InternalFleetView />} />
        <Route path="/internal-fleet/transfer/:id" element={<InternalFleetTrasnfer />} />
        <Route path="/internal-fleet/tracking/:id" element={<InternalFleetTracking />} />
        <Route path="/internal-fleet/transfer/show/:id" element={<InternalFleetTransferShow />} />
        <Route path="/internal-fleet/form-fuel/:id" element={<VehicleFuel />} />
        <Route path="/internal-fleet" element={<PrivateRoute />} >
          <Route path="/internal-fleet" element={<InternalFleetMenu />} />
        </Route>

        <Route path="/ordem-de-servico/form/:id" element={<OrderServiceCRU />} />
        <Route path="/ordem-de-servico/assess/:id" element={<OrderServiceAssess />} />
        <Route path="/ordem-de-servico/installation/:id" element={<OrderServiceInstallation />} />
        <Route path="/ordem-de-servico/removal/:id" element={<OrderServiceRemoval />} />
        <Route path="/ordem-de-servico/maintenance/:id" element={<OrderServiceMaintenance />} />
        <Route path="/ordem-de-servico/training/:id" element={<OrderServiceTraining/>} />
        <Route path="/ordem-de-servico/signature/:id" element={<OrderServiceSignature />} />
        <Route path="/ordem-de-servico/show/:id" element={<OrderServiceShow />} />
        <Route path="/ordem-de-servico/cancel/:id" element={<OrderOfServiceCancel />} />
        <Route path="/service" element={<PrivateRoute />} >
          <Route path="/service" element={<ServiceMenu />} />
        </Route>
        <Route path="/service/form/:outsourced?" element={<ServiceCRU />} />
        <Route path="/service/cancel/:id" element={<ServiceCancel />} />
        <Route path="/service/finalize/:id" element={<ServiceFinalize />} />
        <Route path="/service/search" element={<ServiceFormSearch />} />
        <Route path="/service/all" element={<ServiceAll />} />
        <Route path="/service/show/:id" element={<ServiceShow />} />
        <Route path="/service/view" element={<ServiceView />} />
        <Route path="/ticket" element={<PrivateRoute />} >
          <Route path="/ticket" element={<TicketMenu />} />
        </Route>
        <Route path="/ticket/consolidated" element={<TicketConsolidated />} />
        <Route path="/ticket/consolidated/:id" element={<TicketConsolidatedOpen />} />
        <Route path="/ticket/extract/:id" element={<TicketExtract />} />
        <Route path="/ticket/accept" element={<TicketAccept />} />
        <Route path="/ticket/faturamento" element={<TicketFaturamento />} />
        <Route path="/ticket/show/:id" element={<TicketShow />} />
        <Route path="/ticket/return/:id" element={<TicketReturn />} />
        <Route path="/ticket/edite/:id" element={<TicketEdite />} />
        <Route path="/ticket/tracking/:id" element={<TicketTracking />} />
        <Route path="/ticket/cancel/:id" element={<TicketCancel />} />
        <Route path="/ticket/extract/cancel/:id" element={<TicketCancelExtract />} />
        <Route path="/ticket/return" element={<TicketAcceptReturn />} />
        <Route path="/ticket/reaccept/:id" element={<TicketReaccept />} />

        <Route path="/user" element={<PrivateRoute />} >
          <Route path="/user" element={<UserMenu />} />
        </Route>
        <Route path="/user/form/:id?" element={<UserCRU />} />
        <Route path="/user/view" element={<UserView />} />
        <Route path="/user/profile" element={<PerfilUser />} />

        <Route path="/vehicle/form/:id?" element={<VehicleCRU />} />
        <Route path="/vehicle/view" element={<VehicleView />} />

        <Route path="/visit/show/:id" element={<VisitShow />} />
        <Route path="/teste" element={< CorrectionVisit />} />
         */}
      </Routes >
    </Router >
  );
};
