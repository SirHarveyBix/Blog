import ContactForm from '/components/ContactForm/index';
import Head from 'next/head';

function ContactPage() {
  return (
    <>
      <Head>
        <title>contactez moi</title>
        <meta name="description" content="envoyez moi vos messages" />
      </Head>
      <ContactForm />;
    </>
  );
}
export default ContactPage;
