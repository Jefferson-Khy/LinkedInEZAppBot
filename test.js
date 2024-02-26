




if (error) {
  // Handle the error (e.g., prompt for input)
  const allTexts = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('label'));
      return elements
        .filter(el => el.textContent.trim().endsWith('?'))
        .map(el => {
          const text = el.textContent.trim();
          // Use the for attribute of the label to extract numbers
          const forAttribute = el.getAttribute('for');
          // Adjust the regex to match the specific part after "FormElement-"
          const match = forAttribute.match(/FormElement-(\d+-\d+)/);
          const numbers = match ? match[1] : ''; // This captures the numbers after "FormElement-"
          return { text, labelId: numbers };
        });
        
  });
    
  
  for (const text of allTexts) {
      // Prompt the user for each input field that has an error
      console.log(`Please fill in the field for: ${text.text} JobID: ${text.labelId}`);
      const readline = require('readline').createInterface({
          input: process.stdin,
          output: process.stdout
        });
        
      const askQuestion = (questionText) => new Promise((resolve) => {
          readline.question(questionText, (input) => {
              resolve(input);
              readline.close(); // Consider closing readline only when completely done, not after each question.
          });
      });
        
      // Usage in your loop
      const userResponse = await askQuestion('Enter something: ');
      console.log(`You entered: ${userResponse}`);
      await page.evaluate((selector) => {
          document.querySelector(selector).value = '';
      }, `[id*="${text.labelId}"]`);
        
      await page.type(`[id*="${text.labelId}"]`, userResponse);

      // ... Collect user input and fill in the field
      // You would need to implement the logic to actually collect user input and fill the field
  }
} else {
  // Click the next button if no error is present
  const nextButton = await page.waitForSelector('[data-easy-apply-next-button][type="button"]', { visible: true });
  await nextButton.click();
}




const labelsText = await page.evaluate(() => {
  const labels = document.querySelectorAll('div[data-test-text-entity-list-form-component] label, div[data-test-single-line-text-form-component] label');
  const texts = Array.from(labels).map(label => label.textContent.trim());
  return texts;
});



const allTexts = await page.evaluate(() => {
  // Targeting labels within specific divs
  const elements = Array.from(document.querySelectorAll('div[data-test-text-entity-list-form-component] label, div[data-test-single-line-text-form-component] label'));
  return elements
    .filter(el => el.textContent.trim().endsWith('?'))
    .map(el => {
      const text = el.textContent.trim();
      // Extract numbers from the "for" attribute related to "FormElement-"
      const forAttribute = el.getAttribute('for');
      const match = forAttribute ? forAttribute.match(/FormElement-(\d+-\d+)/) : null;
      const numbers = match ? match[1] : '';
      return { text, labelId: numbers };
    });
});



const jobEzAppButtonExists = await page.$('.jobs-apply-button');
if (!jobEzAppButtonExists) {
  console.log('Apply button not found, exiting function.');
  return; // Exit the function early
}
// If the button exists, proceed to click it
const jobEzAppButton = await page.waitForSelector('.jobs-apply-button', { visible: true });
await jobEzAppButton.click();




await page.waitForSelector("[custom-user-id='12w3541234']");
