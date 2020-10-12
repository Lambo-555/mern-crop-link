import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

const CreatePage = props => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const {request} = useHttp();
  const [isValid, setIsValid] = useState('');
  const [link, setLink] = useState('');

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request(
            '/api/link/generate',
            'POST',
            {from: link},
            {authorization: `Bearer ${auth.token}`}

        );
        console.info(data);
        history.push(`/detail/${data.link._id}`);

      } catch (e) {
        console.log('link enter error', e.message)
      }
    }
  };

  const formValidator = (event) => {
    if (event.target.value.length > 5) {
      setIsValid('is-valid');
    } else {
      setIsValid('is-invalid');
    }
  };

  useEffect(() => {
    const inputs = [...document.getElementsByTagName('input')];
    inputs.forEach((input, index) => {
      input.value = '';
    })
  }, []);

  return (
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-sm-12 mt-5">
            <input
                type="text"
                className={"form-control " + isValid}
                id="link"
                placeholder="Введите длинную ссылку"
                required
                value={link}
                onChange={e => {setLink(e.target.value);formValidator(e)}}//set value
                // onKeyUp={LinkChangeHandler}//validate
                onKeyPress={pressHandler}
            />
          </div>
        </div>
      </div>
  )
};

export default CreatePage