import "@fontsource/oswald/400.css";
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/700.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login";
import { FullScreenLoader } from "./components";
import useAppLoader from "./hooks/useAppLoader";

import AdminContactUsList from "./pages/admin/AdminContactusList";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminSlideshow from "./pages/admin/AdminSlideshow";
import AdminWhyChooseUs from "./pages/admin/AdminWhyChooseUs";
import AdminCredentials from "./pages/admin/AdminCredentials";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import HomePageV2 from "./pages/HomePageV2";
import Credentials from "./pages/Credentials";
import CredentialsV2 from "./pages/CredentialsV2";
import ProductsAndServices from "./pages/ProductsAndServices";
import ProductsAndServicesV2 from "./pages/ProductsAndServicesV2";
import ProductsList from "./pages/ProductsList";
import ProductsListV2 from "./pages/ProductsListV2";
import ContactUs from "./pages/ContactUs";
import ContactUsV2 from "./pages/ContactUsV2";
import { useScrollToTop } from "./hooks/useScrollToTop";

function App() {
  const { isLoading } = useAppLoader();
  useScrollToTop();
  return (
    <>
      <FullScreenLoader isVisible={isLoading} />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePageV2 />} />
        <Route path="/old-home" element={<HomePage />} />
        <Route path="/credentials" element={<CredentialsV2 />} />
        <Route path="/old-credentials" element={<Credentials />} />
        <Route path="/products" element={<ProductsAndServicesV2 />} />
        <Route path="/old-products" element={<ProductsAndServices />} />
        <Route path="/category/:id/products" element={<ProductsListV2 />} />
        <Route path="/old-category/:id/products" element={<ProductsList />} />
        <Route path="/contact" element={<ContactUsV2 />} />
        <Route path="/old-contact" element={<ContactUs />} />
        <Route path="/admin" element={<LoginPage />} />
        <Route path="/admin/slideshow" element={<AdminSlideshow />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/contactus" element={<AdminContactUsList />} />
        <Route path="/admin/whychooseus" element={<AdminWhyChooseUs />} />
        <Route path="/admin/credentials" element={<AdminCredentials />} />
      </Routes>
    </>
  );
}

export default App;
