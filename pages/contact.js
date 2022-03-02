import Head from 'next/head';

import ContactForm from '/src/components/ContactForm/index';

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
