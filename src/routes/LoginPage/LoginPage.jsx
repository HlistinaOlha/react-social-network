import {Navigate} from "react-router-dom";
import styles from './LoginPage.module.scss'
import React from "react";
import {useAuth} from "../../hook/useAuth";
import {reduxForm} from 'redux-form'
import {getCaptcha, login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import Preloader from "../../components/common/Preloader/Preloader";
import {Checkbox, createField, Input} from "../../components/common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {getCaptchaUrl, getIsFetching} from "../../redux/selectors/auth-selectors";
import {Button, Col, Form, Row} from "react-bootstrap";
import Container from 'react-bootstrap/Container';

const maxLength10 = maxLengthCreator(10)

const LoginForm = ({handleSubmit, captchaUrl, getCaptcha}) => {

    return (
        <>
            {/*  <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Your email"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Your Password"/>
                </Form.Group>
                {
                    error && (
                        <Form.Control.Feedback type="invalid">
                            {error}
                        </Form.Control.Feedback>
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
            </Form>*/}

            <Form className={styles.loginForm}
                  onSubmit={handleSubmit}>
                {createField(Input, "login", "Your Email", [required])}
                {createField(Input, "password", "Your Password", [required, maxLength10],
                    {type: "password"})}
                {captchaUrl && (
                    <div className={styles.captcha}>
                        <img src={captchaUrl} width="180" alt="captcha"/>
                        <div className={styles.generator}
                             onClick={getCaptcha}>Generate new image
                        </div>
                        {createField(Input, "captcha", "Code", [required, maxLength10])}
                        <div>Type the code from the image</div>
                    </div>

                )}
                {createField(Checkbox, "rememberMe", null, [], {type: "checkbox"}, "Remember Me")}
                <div className="d-grid gap-2">
                    <Button className='mt-3 full-width btn-lg' type="submit">Login</Button>
                </div>
            </Form>
        </>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const LoginPage = ({isFetching, login, captchaUrl, getCaptcha}) => {

    const {isAuthorized} = useAuth() //useContext(AuthContext)

    const onSubmit = (data) => {
        const {email, password, rememberMe, captcha} = {
            email: data.login,
            password: data.password,
            rememberMe: data.rememberMe,
            captcha: data.captcha
        }
        login({email, password, rememberMe, captcha})
    }
    if (!isAuthorized) {
        return !isFetching ?
            <Container>
                <Row>
                    <Col xl={6}>
                        <div className={styles.landingContent}>
                            <h1>Welcome to the Biggest Social Network in the World</h1>
                            <p>We are the best and biggest social network with 5 billion active users all around the
                                world.
                                Share you
                                thoughts, write blog posts, show your favourite music via Stopify, earn badges and much
                                more!
                            </p>
                            <Button href="#" variant="secondary" className={styles.registerBtn}>Register Now!</Button>
                        </div>
                    </Col>
                    <Col xl={5}>
                        <div className={styles.loginPane}>
                            <h6 className={`h6 ${styles.title}`}>Login to your Account</h6>
                            <LoginReduxForm onSubmit={onSubmit}
                                            captchaUrl={captchaUrl}
                                            getCaptcha={getCaptcha}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
            :
            <Preloader/>
    }
    return <>
        <Navigate to="/profile"/>
    </>


}

const mapStateToProps = (state) => {
    return {
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
