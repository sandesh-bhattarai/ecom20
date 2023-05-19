import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/app";
import LoginPage from "../pages/auth/login.page";
import RegisterPage from "../pages/auth/register.page";
import ErrorPage from "../pages/error/error.page";
import CategoryListPage from "../pages/home/category-product.page";
import HomePageLayout from "../pages/home/home.layout";
import AdminPageLayout from "../pages/admin/admin.layout";
import AdminDashboard from "../pages/admin/dashboard/admin-dasboard.page";
import PrivateRoutes from "./private.routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import AdminBannerList from "../pages/admin/banner/admin-banner-list.page";
import AdminBannerCreate from "../pages/admin/banner/banner-create.page";
import AdminBannerEdit from "../pages/admin/banner/admin-baner-edit.component";


import AdminBrandList from "../pages/admin/brand/admin-brand-list.page";
import AdminBrandCreate from "../pages/admin/brand/brand-create.page";
import AdminBrandEdit from "../pages/admin/brand/admin-brand-edit.component";

import AdminCategoryList from "../pages/admin/category/admin-category-list.page";
import AdminCategoryCreate from "../pages/admin/category/admin-category-create.page";
import AdminCategoryEdit from "../pages/admin/category/admin-category-edit.page";

import AdminProductList from "../pages/admin/product/admin-product-list.page";
import AdminProductCreate from "../pages/admin/product/product-create.page";
import AdminProductEdit from "../pages/admin/product/admin-product-edit.component";

import BrandListPage from "../pages/home/brand/brand-list.page";
import BrandProductList from "../pages/home/brand/brand-product-list.page";

import ProductDetailPage from "../pages/home/product/detail.page";
import CartList from "../pages/home/cart/cart-list.page";

import { Provider } from "react-redux";
import store from "../store";
import Checkout from "../pages/home/cart/checkout.page";

const Routing = () => {
    return (<>
        <Provider store={store}>
            <ToastContainer />
            <BrowserRouter>
                {/* <TestComponent /> */}
                <Routes>
                    <Route path='/' element={<HomePageLayout />}>

                        <Route index element={<HomePage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />

                        <Route path="brands" element={<BrandListPage />} />
                        <Route path="brand/:brandSlug" element={<BrandProductList />} />

                        <Route path="product/:slug" element={<ProductDetailPage />}></Route>

                        <Route path="category/:catSlug" element={<CategoryListPage />}/>
                        <Route path="category/:catSlug/:childCat" element={<CategoryListPage />}/>

                        <Route path="cart" element={<CartList />}></Route>
                        
                        {/* 404 routes */}
                        <Route path="*" element={<ErrorPage />}/>
                    </Route>

                    <Route path="checkout" element={<PrivateRoutes toCheck={"customer"}><Checkout /></PrivateRoutes>}></Route>


                    <Route path="/admin" element={<PrivateRoutes toCheck="admin">
                        <AdminPageLayout />
                    </PrivateRoutes>}>
                        <Route index element={<AdminDashboard />}/>
                        <Route path="banner" element={<AdminBannerList />} />
                        <Route path="banner/create" element={<AdminBannerCreate />} />
                        <Route path="banner/edit/:id" element={<AdminBannerEdit />} />

                        <Route path="brand" element={<AdminBrandList />} />
                        <Route path="brand/create" element={<AdminBrandCreate />} />
                        <Route path="brand/edit/:id" element={<AdminBrandEdit />} />


                        <Route path="category" element={<AdminCategoryList />}/>
                        <Route path="category/create" element={<AdminCategoryCreate />}/>
                        <Route path="category/edit/:id" element={<AdminCategoryEdit />}/>

                        <Route path="product" element={<AdminProductList />}/>
                        <Route path="product/create" element={<AdminProductCreate />}/>
                        <Route path="product/edit/:id" element={<AdminProductEdit />}/>
                    </Route>

                    <Route path="/seller" element={<PrivateRoutes toCheck="seller">
                            <AdminPageLayout />
                        </PrivateRoutes>}>
                        <Route index element={<AdminDashboard />}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </>)
}

export default Routing;