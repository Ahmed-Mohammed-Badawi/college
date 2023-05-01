// Import the useRouter hook from Next.js
import { useRouter } from 'next/router';
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
