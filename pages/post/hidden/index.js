import Head from 'next/head';

import Hero from '/src/components/homePage/Hero/index';

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Le Blog tech de Guillaume</title>
        <meta name="description" content="programation et developpement" />
      </Head>
      <Hero />
    </>
  );
}

// export async function getStaticProps() {
//   return {
//     props: {
//       posts: data.getFeaturedPosts,
//     },
//   };
// }

export default HomePage;
