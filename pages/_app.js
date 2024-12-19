// pages/_app.js
import '../styles/globals.css';
import { GameProvider } from '../context/GameContext';

function MyApp({ Component, pageProps }) {
  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  );
}

export default MyApp;
