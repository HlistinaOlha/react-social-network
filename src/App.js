import React, {Component, lazy, Suspense} from "react";
import {createHashRouter} from 'react-router-dom';
import Homepage from "./routes/Homepage/Homepage";
import Layout from "./components/Layout/Layout";
import ErrorPage from "./routes/ErrorPage/ErrorPage";
import LoginPage from "./routes/LoginPage/LoginPage";
import {AuthProvider} from "./hoc/AuthProvider";
import {RequireAuth} from "./hoc/RequireAuth";
import {Provider, useDispatch, useSelector} from "react-redux";
import {initializeApp} from './redux/app-reducer.ts'
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {getIsInitialized} from "./redux/selectors/app-selectors";
import {RouterProvider} from "react-router";
import {useAuth} from "./hook/useAuth";
import ProfileTimeline from "./components/Profile/ProfileItem/ProfileItemTimeline/ProfileItemTimeline";
import ProfileAbout from "./components/Profile/ProfileItem/ProfileItemAbout/ProfileItemAbout";
import FriendsPage from "./routes/FriendsPage/FriendsPage";
import classNames from 'classnames';
import UsersPage from "./routes/UsersPage/UsersPage";

const Profile = lazy(() => import('./components/Profile/Profile'));

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

    catchAllUnhandledErrors = (promiseRejectionEvent) => {
        alert("Some error occured")
        console.error(promiseRejectionEvent)
    }

    componentDidMount() {
        this.props.handleInitializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.isInitialized) {
            return <Preloader/>
        }
        return <App/>

    }
}

const App = () => {

    const {isAuthorized} = useAuth()

    return (
        <div className={classNames({
            'bg-wrapper': !isAuthorized
        }, 'app-wrapper')}>
            <RouterProvider router={router}/>
        </div>
    )
}

export const SamuraiJsApp = () => {
    return <Suspense fallback={<Preloader/>}>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </Suspense>
}

const router = createHashRouter([
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
                </RequireAuth>,
                children: [
                    {
                        path: "",
                        element: <RequireAuth>
                            <ProfileTimeline/>
                        </RequireAuth>
                    },
                    {
                        path: "about",
                        element: <RequireAuth>
                            <ProfileAbout/>
                        </RequireAuth>
                    },
                    {
                        path: "friends",
                        element: <RequireAuth>
                            <FriendsPage/>
                        </RequireAuth>
                    }
                ]
            },
            {
                path: "users",
                element: <RequireAuth>
                    <UsersPage/>
                </RequireAuth>,
            }
        ]
    }
]);

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
