import React from 'react';
import ReactDOM from 'react-dom';
import Shoppingcart from './cart'
function Mydemo(){
  return(
  <div>
    <Shoppingcart/>
  </div>
  );
}

ReactDOM.render(<Mydemo/>,document.getElementById("root"));