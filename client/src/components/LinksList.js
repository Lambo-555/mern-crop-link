import React from 'react'
import {Link} from "react-router-dom";

export const LinksList = ({links}) => {
  if (!links.length) {
    return <p className="d-flex justify-content-center mt-5">
      Ссылок пока нет
    </p>
  }

  return (
      <table className="table table-dark">
        <caption>Список сокращенных ссылок</caption>
        <thead>
        <tr>
          <th scope="col">№</th>
          <th scope="col">Оригинальная</th>
          <th scope="col">Сокращенная</th>
          <th scope="col">Кликов</th>
          <th scope="col">Создана</th>
          <th scope="col">Детали</th>
        </tr>
        </thead>

        <tbody>
        {links.map((link, index) => {
          return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td style={{
                  overflowWrap: 'anywhere'
                }}>{link.from}</td>
                <td style={{
                  maxWight: '70px',
                  overflowWrap: 'anywhere'
                }}>{link.to}</td>
                <td>{link.clicks}</td>
                <td>
                  {new Date(link.date)
                      .toLocaleDateString('en-GB')}
                </td>
                <td>
                  <Link to={`detail/${link._id}`}>Открыть</Link>
                </td>
              </tr>
          )
        })}
        </tbody>
      </table>
  )
};