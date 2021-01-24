import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {

  render() {
    return (
      <Html lang="en">
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
           <link rel="stylesheet" 
           href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/css/bootstrap.min.css" 
           integrity="sha512-oc9+XSs1H243/FRN9Rw62Fn8EtxjEYWHXRvjS43YtueEewbS6ObfXcJNyohjHqVKFPoXXUxwc+q1K7Dee6vv9g==" 
           crossOrigin="anonymous" />
           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" 
           integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" 
           crossorigin="anonymous" />
           <link rel="shortcut icon" type="image/jpg" href="/static/assets/favicon.ico"/>
           <link rel="stylesheet" href="/static/styles/styles.css"/>
           <link rel="stylesheet" href="/static/styles/react_quill_snow.css"/>
           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/react-quill/0.4.1/quill.snow.css" integrity="sha512-z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==" crossorigin="anonymous" />
         
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;