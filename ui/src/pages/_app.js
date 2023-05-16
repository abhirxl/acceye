import ThemeCustomization from "src/themes";
import "../styles/globals.css";

function MyApp({ router, Component, pageProps }) {
  // console.log("main page ", router);
  return (
    <ThemeCustomization>
      <Component {...pageProps} />
    </ThemeCustomization>
  );
}

export default MyApp;
