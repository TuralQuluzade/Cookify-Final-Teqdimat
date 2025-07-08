import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from "react-redux";
import  Router from "./router/Router.jsx"
import {store} from "./redux/store.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import "animate.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <Router/>
    </Provider>
  </StrictMode>,
)
