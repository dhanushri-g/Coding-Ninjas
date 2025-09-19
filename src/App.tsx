import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import ClaimChecker from "./pages/ClaimChecker";
import TrendingNews from "./pages/TrendingNews";
import CognitiveBiasMirror from "./pages/CognitiveBiasMirror";
import Learn from "./pages/Learn";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth routes without Layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Main app routes with Layout */}
            <Route path="*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/check" element={<ClaimChecker />} />
                  <Route path="/trending" element={<TrendingNews />} />
                  <Route path="/bias-mirror" element={<CognitiveBiasMirror />} />
                  <Route path="/learn" element={<Learn />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
