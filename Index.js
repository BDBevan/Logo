const fs = require('fs');
const inquirer = require('inquirer').default;

// This is the funciton to generate SVG content which can be opened within the browser.
const generateSVG = (text, textColor, shape, shapeColor) => {
  let shapeElement;
  switch (shape) {
    case 'circle':
      shapeElement = `<circle cx="150" cy="100" r="80" fill="${shapeColor}" />`;
      break;
    case 'triangle':
      shapeElement = `<polygon points="150,18 244,182 56,182" fill="${shapeColor}" />`;
      break;
    case 'square':
      shapeElement = `<rect x="50" y="50" width="200" height="200" fill="${shapeColor}" />`;
      break;
    default:
      throw new Error('Invalid shape');
  }

  const svgContent = `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  ${shapeElement}
  <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>`;
  
  return svgContent;
};

// This is the function to prompt the user for input using inquirer.
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter text (up to 3 characters):',
      validate: (input) => input.length <= 3 || 'Text must be 3 characters or less.',
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter text color (keyword or hexadecimal):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter shape color (keyword or hexadecimal):',
    },
  ]);
};

// This is the main function to run the application.
const run = async () => {
  try {
    const answers = await promptUser();
    const { text, textColor, shape, shapeColor } = answers;

    const svgContent = generateSVG(text, textColor, shape, shapeColor);

    fs.writeFileSync('logo.svg', svgContent);
    console.log('Generated logo.svg');
  } catch (error) {
    console.error('Error generating logo:', error);
  }
};

run();
