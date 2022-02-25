import { Container, Picture, Title, Description, Spacer } from './style';

function Hero() {
  return (
    <Container>
      <Spacer />
      <Picture src="/images/site/myself.jpeg" alt="myself" width={350} height={350} />
      <Title>Hi, I'm Guillaume</Title>
      <Description>
        I launch this project to increase my Next and react skill, but I'm rather oriented toward
        back end
      </Description>
    </Container>
  );
}
export default Hero;
