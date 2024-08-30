import logo from './logo.svg';
import './App.css';
// .. lib
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
// .. router
import RoutesApp from './router/Router';
        

function App() {
    return (
        <PrimeReactProvider>
            <div className="App" >
                <RoutesApp />
            </div>
        </PrimeReactProvider>
    );
}

export default App;
