import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import CategoryPage from './pages/CategoryPage/CategoryPage'
import ProductPage from './pages/Product/ProductPage'
import MainLayout from './layout/mainLayout'
const App = () => {
      return (
            <BrowserRouter>
                  <Routes>
                        <Route path="/" element={<MainLayout />}>
                              <Route index element={<Navigate to="/all" replace />} />
                              <Route path="/:categoryName" element={<CategoryPage />} />
                              <Route path="/product/:id" element={<ProductPage />} />
                        </Route>
                  </Routes>
            </BrowserRouter>
      )
}
export default App;