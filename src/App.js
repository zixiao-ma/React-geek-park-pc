import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import HomeLayout from "@/pages/Layout";
import {AuthRoute} from "@/components/AuthRoute";
import {DataOverview} from "@/pages/DataOverview";
import {ContentManagement} from "@/pages/ContentManagement";
import {PostArticle} from "@/pages/PostArticle";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>

                <div className={'App'}>
                    <Routes>
                        <Route path='/login' element={<Login/>}></Route>
                        <Route path='/' element={
                            <AuthRoute>
                                <HomeLayout/>
                            </AuthRoute>
                        }>

                            <Route index element={<DataOverview/>}></Route>
                            <Route path='contentManagement' element={<ContentManagement/>}></Route>
                            <Route path='/postArticle' element={<PostArticle/>}></Route>
                        </Route>
                    </Routes>
                </div>

            </BrowserRouter>

        )
    }
}

export default App
