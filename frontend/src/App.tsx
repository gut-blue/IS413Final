import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import HomePage from './pages/HomePage';
import EntertainerListPage from './pages/EntertainerListPage';
import AddEntertainerPage from './pages/AddEntertainerPage';
import EntertainerDetailsPage from './pages/EntertainerDetailsPage';
import EditEntertainerPage from './pages/EditEntertainerPage';

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/entertainers" element={<EntertainerListPage />} />
        <Route path="/entertainers/add" element={<AddEntertainerPage />} />
        <Route path="/entertainers/:id" element={<EntertainerDetailsPage />} />
        <Route path="/entertainers/:id/edit" element={<EditEntertainerPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
