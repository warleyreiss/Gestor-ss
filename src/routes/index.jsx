
//import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'

//COMPONENTES DA PAGINA
import SideBar from '../components/layout/sidebar/SideBar'
//PAGINAS
import Signin from '../components/pages/auth/signin'

import Clientes from '../components/pages/cliente/index'
import Financeiro from '../components/pages/financeiro'
import FinanceiroExtratos from '../components/pages/financeiro/extratos'
import VisualizarTicket from '../components/pages/financeiro/view-ticket'
import FrotaInterna from '../components/pages/frota_interna/index'
import HistoricoServicos from '../components/pages/historicos/servicos'
import HistoricoTickets from '../components/pages/historicos/tickets'
import HistoricoTicketsOpen from '../components/pages/historicos/tickets-open'
import HistoricoVisitas from '../components/pages/historicos/visitas'
import Materiais from '../components/pages/materiais/index'
import Servicos from '../components/pages/servicos/index'
import ListaTicketsPendentes from '../components/pages/servicos/list-tickets-pendentes'
import Usuarios from '../components/pages/usuarios/index'
import Veiculos from '../components/pages/veiculos/index'
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
        <Route path="/financeiro" element={<PrivateRoute />} >
          <Route path="/financeiro" element={<Financeiro/>} />
        </Route>
        <Route path="/financeiro/extratos" element={<PrivateRoute />} >
          <Route path="/financeiro/extratos" element={<FinanceiroExtratos/>} />
        </Route>
        <Route path="/financeiro/visualizar_ticket/:id" element={<PrivateRoute />} >
          <Route path="/financeiro/visualizar_ticket/:id" element={<VisualizarTicket/>} />
        </Route>
        <Route path="/financeiro/tickets_retornados" element={<PrivateRoute />} >
          <Route path="/financeiro/tickets_retornados" element={<VisualizarTicket/>} />
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
        <Route path="/historico_tickets_open" element={<PrivateRoute />} >
          <Route path="/historico_tickets_open" element={<HistoricoTicketsOpen/>} />
        </Route>
        <Route path="/historico_visitas/:inicio/:fim" element={<PrivateRoute />} >
          <Route path="/historico_visitas/:inicio/:fim" element={<HistoricoVisitas/>} />
        </Route>
        <Route path="/materiais" element={<PrivateRoute />} >
          <Route path="/materiais" element={<Materiais/>} />
        </Route>
        <Route path="/servicos" element={<PrivateRoute />} >
          <Route path="/servicos" element={<Servicos/>} />
        </Route>
        <Route path="/servicos/tickets_pendentes" element={<PrivateRoute />} >
          <Route path="/servicos/tickets_pendentes" element={<ListaTicketsPendentes/>} />
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
