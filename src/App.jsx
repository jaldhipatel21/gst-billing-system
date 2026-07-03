import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/invoice" element={<CreateInvoice />} />
        <Route path="/invoice-history" element={<InvoiceHistory />} />
        <Route path="/company-settings" element={<CompanySettings />} />
        <Route path="/invoice/:id" element={<ViewInvoice />} />
        <Route path="/edit-invoice/:id" element={<EditInvoice />} />
        <Route path="/company" element={<Company/>} />
        <Route path="/gst-reports" element={<GSTReports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;