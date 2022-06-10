import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

    return (
        <Html>
            <Head>
                <title>Pdp fast food</title>
                <meta name="description" content="Web site created by Umidjon"/>
                <meta name="theme-color" content="#343A40"/>
                <link rel="icon" href="https://www.pdp.uz/assets/icons/logo.ico"/>
                <link rel="apple-touch-icon" href="https://www.pdp.uz/assets/icons/logo.ico"/>
                <link rel="manifest" href="/manifest.json" />
                <meta name="color-scheme" content="light dark"/>
            </Head>
            <body>
            <Main />
            <NextScript />
            <script
                src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.1.4/sockjs.min.js"/>
            <script
                src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"/>
            </body>
        </Html>
    )
}