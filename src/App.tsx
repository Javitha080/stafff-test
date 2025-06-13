
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import AboutStaff from "./pages/AboutStaff";
import GroupPhoto from "./pages/GroupPhoto";
import HeadStaff from "./pages/HeadStaff";
import HeadTeachers from "./pages/HeadTeachers";
import PrimaryTeachers from "./pages/PrimaryTeachers";
import SeniorTeachers from "./pages/SeniorTeachers";
import StudentPrefects from "./pages/StudentPrefects";
import SecurityCleaning from "./pages/SecurityCleaning";
import EditorDashboard from "./pages/EditorDashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <ThemeProvider defaultTheme="system" storageKey="staff-directory-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/editor-dashboard" element={<EditorDashboard />} />
                <Route path="/about-staff" element={<AboutStaff />} />
                <Route path="/group-photo" element={<GroupPhoto />} />
                <Route path="/head-staff" element={<HeadStaff />} />
                <Route path="/head-teachers" element={<HeadTeachers />} />
                <Route path="/primary-teachers" element={<PrimaryTeachers />} />
                <Route path="/senior-teachers" element={<SeniorTeachers />} />
                <Route path="/student-prefects" element={<StudentPrefects />} />
                <Route path="/security-cleaning" element={<SecurityCleaning />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
