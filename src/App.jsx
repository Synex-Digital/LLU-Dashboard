import { Suspense } from "react";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./AuthProvider";

function App() {
    return (
        <AuthProvider>
            <HelmetProvider>
                <Suspense fallback={<h1>Loading....</h1>}>
                    <AppRouter />
                </Suspense>
            </HelmetProvider>
        </AuthProvider>
    );
}

export default App;
