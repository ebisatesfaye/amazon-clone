import { useReducer,useEffect, useContext } from 'react';
import './App.css';
import Routering from './Routering';
// import { ThemeProvider } from './note-Hooks/contextProvider';
// import ComponentA from './note-Hooks/ComponentA';
// import ComponentB from './note-Hooks/Component\\
import { Type } from './Utility/action.type';
import { auth } from './Utility/firebase';
import { DataContext } from './Components/DataProvider/DataProvider';

function App() {
  const [{user},dispatch] = useContext(DataContext);
  useEffect(() =>{
    auth.onAuthStateChanged((authUser) => {
if(authUser){
  // console.log(authUser)
  dispatch({
    type:Type.SET_USER,
    user:authUser,
  })
}else{
  dispatch({
    type:Type.SET_USER,
    user:null,
  })
}
    })
  }, [])

return(
<>
<Routering/>
</>
);
}

export default App;





































  //Reducer function 
  // let reducer = (state,action ) => {
  //   switch (action.type){
  //     case 'increase':
  //       return {count : state.count + 1};
  //     case 'decrease':
  //       return {count: state.count - 1};
  //     case 'reset':
  //       return {count : 0};
  //     default:
  //       return state;
  //   }
  // };
  // const [state,dispatch ] = useReducer(reducer,{count : 0})

    // <div className='buttons'> 
    // <h1>{state.count}</h1>
    // <button onClick={() => dispatch({type: 'increase'})}>Increase</button>
    // <button onClick={() => dispatch({type: 'decrease'})}>Decrease</button>
    // <button onClick={() => dispatch({type: 'reset'})}>Reset</button>

    // </div >


{/* <ThemeProvider>
  <ComponentA/>
  <ComponentB/>
</ThemeProvider> */}
