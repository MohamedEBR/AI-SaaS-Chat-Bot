import { TypeAnimation } from 'react-type-animation';


export const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Chat with Your OWN AI',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Built with OpenAI 🤖',
        1000,
        'Your Own Customized ChatGPT',
        1000,
      ]}
      speed={50}
      style={{ fontSize: '60px', display: 'inline-block', color: "white", textShadow: "1px 1px 20px #000" }}
      repeat={Infinity}
    />
  );
};