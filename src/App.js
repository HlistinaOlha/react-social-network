import React, {Component, lazy, Suspense} from "react";
import './App.css';
import {BrowserRouter, createBrowserRouter, Route, Routes} from 'react-router-dom';
import Homepage from "./routes/Homepage/Homepage";
import UsersListContainer from "./components/Users/UsersList/UsersListContainer";
import Layout from "./components/Layout/Layout";
import ErrorPage from "./routes/ErrorPage/ErrorPage";
import LoginPage from "./routes/LoginPage/LoginPage";
import {AuthProvider} from "./hoc/AuthProvider";
import {RequireAuth} from "./hoc/RequireAuth";
import {Provider, useDispatch, useSelector} from "react-redux";
import {initializeApp} from './redux/app-reducer'
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {getIsInitialized} from "./redux/selectors/app-selectors";
import {RouterProvider, useNavigate} from "react-router";

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));
const News = lazy(() => import('./components/News/News'));
const Music = lazy(() => import('./components/Music/Music'));
const Settings = lazy(() => import('./components/Settings/Settings'));
const MessageItem = lazy(() => import('./components/Dialogs/MessageItem/MessageItem'));
const Profile = lazy(() => import('./components/Profile/Profile'));
//const App = () => { another option to write (arrow func)

const AppContainer = () => {
    const dispatch = useDispatch()
    const isInitialized = useSelector(state => getIsInitialized(state))

    const handleInitializeApp = () => {
        dispatch(initializeApp())
    }

    return <AuthProvider>
        <AppAPI isInitialized={isInitialized}
                handleInitializeApp={handleInitializeApp}/>
    </AuthProvider>

}

class AppAPI extends Component {

    componentDidMount() {
        this.props.handleInitializeApp()
    }

    render() {
        if (!this.props.isInitialized) {
            return <Preloader/>
        }
        return <App/>

    }
}

const App = () => {

    return (
        <div className="app-wrapper">
            <RouterProvider router={router}/>
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {index: true, element: <RequireAuth><Homepage/></RequireAuth>},
            {
                path: "login",
                element: <LoginPage/>,
            },
            {
                path: "profile/:id?",
                element: <RequireAuth>
                    <Profile/>
                </RequireAuth>
            },
            {
                path: "dialogs",
                element: <RequireAuth>
                    <DialogsContainer/>
                </RequireAuth>,
                children: [
                    {
                        path: "dialogs/:id",
                        element: <MessageItem/>
                    }
                ]
            },
            {
                path: "users",
                element: <RequireAuth>
                    <UsersListContainer/>
                </RequireAuth>,
            },
            {
                path: "news",
                element: <RequireAuth>
                    <News/>
                </RequireAuth>,
            },
            {
                path: "music",
                element: <RequireAuth>
                    <Music/>
                </RequireAuth>,
            },
            {
                path: "settings",
                element: <RequireAuth>
                    <Settings/>
                </RequireAuth>,
            }
        ]
    }
]);

export const SamuraiJsApp = () => {
    return <Suspense fallback={<Preloader/>}>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </Suspense>
}

export default SamuraiJsApp;


{/* <AuthProvider>
                 <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Homepage/>}/>
                        <Route path='/profile/:id?' element={
                            <RequireAuth>
                                <Profile/>
                            </RequireAuth>
                        }/>
                        <Route path='/dialogs' element={
                            <RequireAuth>
                                <DialogsContainer/>
                            </RequireAuth>
                        }/>
                        <Route path='/dialogs/:id' element={<MessageItem/>}/>
                        <Route path='/users' element={<UsersListContainer/>}/>
                        <Route path='/news' element={<News/>}/>
                        <Route path='/music' element={<Music/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                        <Route path='*' element={<ErrorPage/>}/>
                        <Route path='/login' element={<LoginPage/>}/>
                    </Route>
                </Routes>
            </AuthProvider>*/
}
