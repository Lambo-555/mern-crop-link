import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";

const DetailPage = props => {
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [link, setLink] = useState(null);
  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        authorization: `Bearer ${token}`
      });
      setLink(fetched);
    } catch (e) {
      console.log('DetailPage', e.message);
    }
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader/>
  }

  return (
      <>
        { !loading && link && <LinkCard link={link} />}
      </>
  )
};

export default DetailPage