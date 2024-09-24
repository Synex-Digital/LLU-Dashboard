import { Suspense } from "react";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { HelmetProvider } from "react-helmet-async";
import { io } from "socket.io-client";

function App() {
    const socket = io("http://18.188.214.41:3000");

    socket.on("connect", () => {
        console.log(socket.connected);
    });

    socket.on("disconnect", () => {
        console.log(socket.connected);
    });
    
    return (
        <HelmetProvider>
            <Suspense fallback={<h1>Loading....</h1>}>
                <AppRouter />
            </Suspense>
        </HelmetProvider>
    );
}

export default App;
