import './App.css';
import Sidebar from './components/Sidebar';
// import Footer from './pages/Footer';
import Header from './pages/Header';
import MyRoute from './routes/MyRoute';
function App() {
  const login=JSON.parse(localStorage.getItem("Admin"));
  return (
    <>
    {login?(
      <>
      {login.User.role==="admin"?(
        <>
         <div className='rowsidebar row'>
              <div className='col col-2 sidebar-container'>
                <Sidebar />
              </div>
              <div className='col col-10 content-container'>
                <Header  />
                <MyRoute />
              </div>
            </div>
        </>
      ):(
        <>
          <div className='full-height'>
              <Header className='header-container' />
              <div className='scrollable-content'>
                <MyRoute className='route-container'/>
              </div> 
            </div>
        </>
      )}
      </>
    ):(
      <>
      <MyRoute/>
      </>
    )}
   
    {/* <Footer/> */}
    </>
  );
}

export default App;
