import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-[#1e1e2f] text-white">
      <Component {...pageProps} />
    </div>
  );
}
