// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        {/* اضافه کردن المان برای استفاده از Portal */}
        <div id="portal-root"></div>
      </body>
    </Html>
  );
}
