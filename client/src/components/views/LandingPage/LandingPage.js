import React,{ useEffect }from 'react';
import axios from 'axios';


function LandingPage() {

  useEffect(() => {
    axios.get('/api/hello')//서버로 보낸다
    .then(res => console.log(res.data)) //서버에서 보내온 걸 받는다
  }, [])



  return (
    <div>
      landing
    </div>
  )
}

export default LandingPage
