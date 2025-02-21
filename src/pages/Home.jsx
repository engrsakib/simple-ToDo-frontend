import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../provider/AuthProvider';
import MyTasks from '../components/HomeComponents/MyTasks';



const Home = () => {
  const{user, loadding, dark} = useContext(AuthContext);
  

    return (
      <>
        <div className='container mt-20 lg:mt-36'>
          <MyTasks></MyTasks>
        </div>

        <Helmet>
          <meta charSet="utf-8" />
          <title>Home</title>
        </Helmet>
      </>
    );
};

export default Home;