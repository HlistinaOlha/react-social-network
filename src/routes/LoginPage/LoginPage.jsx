import {Navigate} from "react-router-dom";
import styles from './LoginPage.module.css'
import React from "react";
import {useAuth} from "../../hook/useAuth";
import {reduxForm} from 'redux-form'
import {getCaptcha, login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import Preloader from "../../components/common/Preloader/Preloader";
import {Checkbox, createField, Input} from "../../components/common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {getCaptchaUrl, getCurrentUser, getIsFetching} from "../../redux/selectors/auth-selectors";
import {useLocation} from "react-router";

const maxLength10 = maxLengthCreator(10)

const LoginForm = ({handleSubmit, error, captchaUrl, getCaptcha}) => {

    //const navigate = useNavigate();
    //const location = useLocation();

    const {signIn} = useAuth();

    //const fromPage = location.state?.from?.pathname || '/';

    /*  const handleSubmit = (e) => {
          e.preventDefault();

          const form = e.target;
          //const user = form.username.value;

          //signIn(user, () => navigate(fromPage, {replace: true}))
      }*/
    return (
        <form className={styles.loginForm}
              onSubmit={handleSubmit}>
            {createField(Input, "login", "Login", [required])}
            {createField(Input, "password", "Password", [required, maxLength10], {type: "password"})}
            {
                error && (
                    <div className={styles.error}>
                        <span>{error}</span>
                    </div>
                )
            }
            {captchaUrl && (
                <div className={styles.captcha}>
                    <img src={captchaUrl} width="180"/>
                    <div className={styles.generator}
                         onClick={getCaptcha}>Generate new image
                    </div>
                    {createField(Input, "captcha", "Code", [required, maxLength10])}
                    <div>Type the code from the image</div>
                </div>

            )}
            {createField(Checkbox, "rememberMe", null, [], {type: "checkbox"}, "rememberMe")}
            <button type="submit">Login</button>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const LoginPage = ({isFetching, login, captchaUrl, getCaptcha}) => {

    const {currentUser} = useAuth()


    const onSubmit = (data) => {
        const {email, password, rememberMe, captcha} = {
            email: data.login,
            password: data.password,
            rememberMe: data.rememberMe,
            captcha: data.captcha
        }
        login({email, password, rememberMe, captcha})
    }
    if (!currentUser) {
        return !isFetching ?
            <div>
                <h1>Login</h1>
                <LoginReduxForm onSubmit={onSubmit}
                                captchaUrl={captchaUrl}
                                getCaptcha={getCaptcha}
                />
            </div>
            :
            <Preloader/>
    }
    return <>
        <Navigate to="/profile"/>
    </>


}

const mapStateToProps = (state) => {
    return {
        currentUser: getCurrentUser(state),
        isFetching: getIsFetching(state),
        captchaUrl: getCaptchaUrl(state)
    }
}

//we created container component over login
//and passed and object with a link to a thunk creator "login"
// instead of mapDispatchToProps (we can do so)
//in LoginPage component we get prop - login - it is not that thunk creator we passed
//is is a callback function that was created by 'connect HOC' under the hood
// that dispatches the thunk creator inside of it

export default connect(mapStateToProps, {login, getCaptcha})(LoginPage)
