const updateService = (operation, inData, callback) => {
  var cb = typeof(callback) === 'function' ? callback : function(data,err) {};
  switch(operation) {
    case 'list':
      fetch("http://localhost:8080/student", {
        method: "GET"
      })
      .then((response)=>response.json())
      .then((data)=> {
        cb(data,null);
      })
      .catch(err=>{
        cb(null, err);
      })
    break

    case 'edit': 
      fetch("http://localhost:8080/student", {
        method: 'POST',
        body: JSON.stringify(inData)
      })
      .then((response) => response.json())
      .then((data)=> {
        cb(data, null)
      })
      .catch(err=>{
        cb(null, err); 
      })
    break;

    case 'delete': 
      fetch("http://localhost:8080/student/" + inData.id, {
        method: 'DELETE'
      })
      .then((response) => response.json())
      .then((data)=> {
        cb(data, null)
      })
      .catch(err=>{
        cb(null, err); 
      })
    break;
  }

}
export default updateService;
