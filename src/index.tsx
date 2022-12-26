import ReactDOM from 'react-dom/client';
import './reset.css';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import store from './redux/redux-store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);