const updateServer = (operation, data) => {

  switch(operation) {
    case 'create': 
      fetch("http://localhost:8080/student", {
        method: 'POST',
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((data)=> {
        console.log("DATA RECEIVED:" + data)
      })
      .catch(err=>{
        console.error("ERRRRRRRRORRRRRRRRR: " + err);
      })
    break;
  }

}
export default updateServer;
