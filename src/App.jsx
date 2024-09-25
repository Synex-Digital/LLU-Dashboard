import { Suspense } from "react";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { HelmetProvider } from "react-helmet-async";

function App() {
    return (
        <HelmetProvider>
            <Suspense fallback={<h1>Loading....</h1>}>
                <AppRouter />
            </Suspense>
        </HelmetProvider>
    );
}

export default App;
