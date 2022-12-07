import Head from 'next/head';
import ContactForm from 'src/components/ContactForm/index';
import { NotificationContextProvider } from 'src/components/context/NotificationContext';

function ContactPage() {
  return (
    <>
      <Head>
        <title>contactez moi</title>
        <meta name="description" content="envoyez moi vos messages" />
      </Head>
      <NotificationContextProvider value={null}>
        <ContactForm />;
      </NotificationContextProvider>
    </>
  );
}
export default ContactPage;
