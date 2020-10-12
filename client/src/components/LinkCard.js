import React from 'react'

export const LinkCard = ({link}) => {
  return (
      <>
        <div className="row d-flex justify-content-center mt-5">
          <div className="col-lg-6 col-sm-12">
            <div className="card mb-3"
            >
              <div className="card-header">Ссылка</div>
              <div className="card-body">
                <p className="card-text">Ссылка, которую вы ввели</p>
                <a href={link.from}
                   target="_blank"
                   rel="nofollow noopener noreferrer">
                  {link.from}
                </a>
                <hr/>
                <p className="card-text">Сокращенная ссылка</p>
                <a href={link.to}
                   target="_blank"
                   rel="nofollow noopener noreferrer">
                  {link.to}
                </a>
                <hr/>
                <p className="card-text">
                  <small className="text-muted">
                    Количество кликов: <strong>
                    {link.clicks}
                  </strong>
                  </small>
                </p>
                <hr/>
                <p className="card-text">
                  <small className="text-muted">
                    Дата создания: <strong>
                    {new Date(link.date).toLocaleDateString('en-GB')}
                  </strong>
                  </small>
                </p>

              </div>
            </div>
          </div>
        </div>
      </>
  )
};

