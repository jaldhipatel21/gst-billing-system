import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import CreateInvoice from "./pages/CreateInvoice";
import InvoiceHistory from "./pages/InvoiceHistory";
import CompanySettings from "./pages/CompanySettings";
import EditInvoice from "./pages/EditInvoice";
import ViewInvoice from "./pages/ViewInvoice";
import Company from "./pages/Company";
import GSTReports from "./pages/GSTReports";
import PrivateRoute from "./components/PrivateRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute>
          <Dashboard/>
        </PrivateRoute>} />
        <Route path="/customers" element={<PrivateRoute><Customers /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
        <Route path="/invoice" element={<PrivateRoute><CreateInvoice /></PrivateRoute>} />
        <Route path="/invoice-history" element={<PrivateRoute><InvoiceHistory /></PrivateRoute>} />
        <Route path="/company-settings" element={<PrivateRoute><CompanySettings /></PrivateRoute>} />
        <Route path="/invoice/:id" element={<PrivateRoute><ViewInvoice /></PrivateRoute>} />
        <Route path="/edit-invoice/:id" element={<PrivateRoute><EditInvoice /></PrivateRoute>} />
        <Route path="/company" element={<PrivateRoute><Company /></PrivateRoute>} />
        <Route path="/gst-reports" element={<PrivateRoute><GSTReports /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;