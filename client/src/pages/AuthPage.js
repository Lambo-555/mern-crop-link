import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const {loading, error, request, clearError} = useHttp();

  const [isEmailValid, setIsEmailValid] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState('');
  const [emailNote, setEmailNote] = useState('');
  const [passwordNote, setPasswordNote] = useState('');


  const [form, setForm] = useState({
    email: '', password: ''
  });


  useEffect(() => {
    console.log('Error', error);
  }, [error, clearError]);

  useEffect(() => {
    const inputs = [...document.getElementsByTagName('input')];
    inputs.forEach((input, index) => {
      input.value = '';
    })
  }, []);

  const changeHandler = event => {
    //________ EMAIL validation _______
    if (event.target.name === 'email') {
      if (event.target.value.length > 3) {
        setIsEmailValid("is-valid");
        setEmailNote("Пока все в порядке");
      } else {
        setIsEmailValid("is-invalid");
        setEmailNote("Заполните почту");
      }
    }

    //________ PASSWORD validation _______
    if (event.target.name === 'password') {
      if (event.target.value.length > 3) {
        setIsPasswordValid("is-valid");
        setPasswordNote("Пока все в порядке");
      } else {
        setIsPasswordValid("is-invalid");
        setPasswordNote("Заполните пароль");
      }
    }

    //_____________ LOGIC _____________
    setForm({...form, [event.target.name]: event.target.value});
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      console.info('Data', data)
    } catch (e) {
    }
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data.token, data.userId);
      // console.info('loginHandler', data)
    } catch (e) {
    }
  };

  return (
      <div className="container">
        <div className="card mt-5 shadow-lg">
          <div className="card-header">
            Links shortify
          </div>
          <div className="card-body">
            <h5 className="card-title">Сокращение ссылок онлайн</h5>
            <p className="card-text">Создавайте собственные страницы переадресации для удобного доступа к нужным
              ресурсам</p>
            <hr/>
            <form>
              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                      type="email"
                      autoComplete="username"
                      className={"form-control " + isEmailValid}
                      id="email"
                      placeholder="writeYour@mail.com"
                      required
                      name="email"
                      value={form.email}
                      onChange={changeHandler}
                  />
                  <div className="valid-feedback">
                    {emailNote}
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                      type="password"
                      autoComplete="current-password"
                      className={"form-control " + isPasswordValid}
                      id="password"
                      placeholder="write your password"
                      required
                      name="password"
                      value={form.password}
                      onChange={changeHandler}
                  />
                  <div className="valid-feedback">
                    {passwordNote}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-6 mb-3">
                </div>
                <div className="col-md-6 mb-3">
                  <div className="btn-group btn-group-lg float-right" role="group" aria-label="Basic example">
                    <button
                        className="btn  btn-primary btn-lg"
                        type="submit"
                        onClick={loginHandler}
                        disabled={loading}
                    >
                      Login
                    </button>
                    <button
                        className="btn btn-outline-primary btn-lg"
                        type="submit"
                        onClick={registerHandler}
                        disabled={loading}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
};

export default AuthPage