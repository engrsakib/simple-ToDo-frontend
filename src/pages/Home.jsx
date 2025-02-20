import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../provider/AuthProvider';
import ToDo from '../components/HomeComponents/ToDo';
import Inprogress from '../components/HomeComponents/Inprogress';
import Done from '../components/HomeComponents/Done';



const Home = () => {
  const{user, loadding, dark} = useContext(AuthContext);
  

    return (
      <>
        <div className='container my-36 grid grid-cols-1 lg:grid-cols-3 gap-4'>
          <ToDo></ToDo>
          <Inprogress></Inprogress>
          <Done></Done>
        </div>

        <Helmet>
          <meta charSet="utf-8" />
          <title>Home</title>
        </Helmet>
      </>
    );
};

export default Home;