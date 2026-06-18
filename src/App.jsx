import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import CreateInvoice from "./pages/CreateInvoice";
import InvoiceHistory from "./pages/InvoiceHistory";
import CompanySettings from "./pages/CompanySettings";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;