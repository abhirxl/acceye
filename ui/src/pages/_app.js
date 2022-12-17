import DashboardLayout from 'src/layouts/DashboardLayout'
import ThemeCustomization from 'src/themes'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeCustomization>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </ThemeCustomization>
  )
}

export default MyApp
