import '@styles/globals.css';

import Navbar from '@components/Navbar.jsx'

export const metadata = {
    title: '',
    description : '',
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <div className='main'>
                <div className='gradient'/>
            </div>
            <main className='app'>
                <Navbar></Navbar>
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout