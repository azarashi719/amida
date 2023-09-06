import ReactDOM from 'react-dom/client'
import ContainerComponent from './App.tsx'
import { Provider } from "react-redux";
import { store } from "./states/store/store";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ContainerComponent />
    </Provider>,
)
