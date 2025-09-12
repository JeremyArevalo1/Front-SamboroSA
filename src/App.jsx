import { useRoutes } from "react-router-dom";
import routes from "./routes.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  let element = useRoutes(routes);

  return (
    <>
      {element}
      <ToastContainer
        position="bottom-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}     
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </>
  );
};

export default App;