

//const PathRoute = () => {
// Header 와 Footer 사용
// 로그인 정보에 따라 보여줄 페이지 설정
// 이외 전체 페이지 경로 설정
// ViewController 와 같은 역할
import {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import CompanyPage from "../pages/CompanyPage";
import AdminPage from "../pages/AdminPage";
import UserPage from "../pages/UserPage";
import PostList from "../pages/posts/PostList";
import SearchPosts from "../pages/posts/SearchPosts";
import InsertPost from "../pages/posts/InsertPost";
import PostDetail from "../pages/posts/PostDetail";
import UpdatePost from "../pages/posts/UpdatePost";
import Main from "../pages/boot-page/Main";
import NavBar from "./NavBar";
import ProductList from "../pages/product/ProductList";
import ProductDetail from "../pages/product/ProductDetail";
import ProductSearch from "../pages/product/ProductSearch";
import ClothesList from "../pages/clothes/ClothesList";
import ClothesDetail from "../pages/clothes/ClothesDetail";
import AddClothes from "../pages/clothes/AddClothes";
import EditClothes from "../pages/clothes/EditClothes";

function PathRoute () {
    const[user, setUser] = useState(null);

    return(
        <BrowserRouter >
            {/*
            경로와 관계 없는 jsx 파일은
            Routes 외부에 작성
            */}
            {/*
            네비게이션바 헤더 푸터의 경우
            BrowserRouter 내부이며,
            Routes        외부에 작성
            */}
            <NavBar  user={user}/>

            <Routes>
                {/* 0. 관리자, 회사, 유저에 관계 없이 전체 접근 가능 Components */}
                <Route path="/home" element={<Home/>     } />
                <Route path="/" element={<Main/>     } />

                <Route path="/posts" element={<PostList />} />
                <Route path="/posts/:postId" element={<PostDetail />} />
                <Route path="/posts/search" element={<SearchPosts />} />
                <Route path="/posts/create" element={<InsertPost />} />
                {/* PostDetail 에서 수정 버튼 내부 to 속성에 작성한 경로 값 설정 */}
                <Route path="/posts/edit/:postId" element={<UpdatePost />} />

                {/* Product 경로 설정*/}
                <Route path="/products" element={<ProductList />} />>
                <Route path="/products/search" element={<ProductSearch />} />
                <Route path="/products/:productId" element={<ProductDetail />} />
                <Route path="/products/add" element={<InsertPost/>} />

                {/*Clothes 경로 설정*/}
                <Route path="/clothesList" element={<ClothesList />} />
                <Route path="/clothes/:id" element={<ClothesDetail />} />
                <Route path="/clothes/add" element={<AddClothes />} />
                <Route path="/clothes/edit/:id" element={<EditClothes />} />





                <Route path="/login" element={<Login setUser={setUser}  />} />
                {/* 1. 관리자만 접근 가능 Components */}
                <Route path="/company" element={   <ProtectedRoute allowedRoles={ [1] }>
                    <AdminPage user={user} />
                </ProtectedRoute>                       }
                />

                {/* 2.   회사만 접근 가능 Components */}
                <Route path="/company" element={   <ProtectedRoute allowedRoles={ [2] }>
                    <CompanyPage user={user} />
                </ProtectedRoute>                       }
                />
                {/* 3.   유저만 접근 가능 Components */}
                <Route path="/company" element={   <ProtectedRoute allowedRoles={ [3] }>
                    <UserPage user={user} />
                </ProtectedRoute>                       }
                />

            </Routes>




        </BrowserRouter>
    )


}

export  default PathRoute;