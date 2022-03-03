import { Container, Description, Picture, Spacer, Title } from './style';

function Hero() {
  return (
    <Container>
      <Spacer />
      <Picture src="/images/site/myself.jpeg" alt="myself" width={350} height={350} />
      <Title>👋 Je suis Guillaume</Title>
      <Description>
        Ce projet est né d'un auto-formation sur Next.js,
        <p>puis est né l'idée de vous presenter son contenu au passage du titre</p>
        .. pour le papier qui dit que je suis dev 🍻
      </Description>
    </Container>
  );
}
export default Hero;
