import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./pages/auth/AuthPages";
import DashLayout from "./pages/dash/DashLayout";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/auth/*" element={<AuthLayout />} />
          <Route path="/*" element={<DashLayout />} />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </QueryClientProvider>
  </RecoilRoot>
);
