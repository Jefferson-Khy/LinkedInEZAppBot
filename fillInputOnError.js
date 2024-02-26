  // Fills out input fields 
  async function inputText(page) {
        try {
                // Handle the error (e.g., prompt for input)
                const allTexts = await page.evaluate(() => {
                    const elements = Array.from(document.querySelectorAll('div[data-test-text-entity-list-form-component] label, div[data-test-single-line-text-form-component] label, fieldset[data-test-form-builder-radio-button-form-component="true"]'));
                    return elements
                    .filter(el => el.textContent.trim())//.endsWith('?')
                    .map(el => {
                        const text = el.textContent.replace(/\s+/g, ' ').trim();
                        const cleanedText = text.replace(/(.+?)\1+/, "$1");
                        // Use the for attribute of the label to extract numbers
                        const forAttribute = el.getAttribute('for');
                        // Attribute of radio section
                        const idAttribute = el.getAttribute('id')
                        // Adjust the regex to match the specific part after "FormElement-"
                        const forMatch = forAttribute ? forAttribute.match(/FormElement-(\d+-\d+)/) : null;
                        const forNumbers = forMatch ? forMatch[1] : null; // This captures the numbers
                        const idMatch = idAttribute ? idAttribute.match(/FormElement-(\d+-\d+)/) : null;
                        const idNumbers = idMatch ? idMatch[1] : null; // This captures the numbers 
                        return { cleanedText, labelId: forNumbers, radioId: idNumbers };
                    });
                    
                });
                
                for (const text of allTexts) {
                    // Prompt the user for each input field that has an error
                    // console.log(`Please fill in the field for: ${text.text} JobID: ${text.labelId}`);
                    console.log(`Please fill in the field for: ${text.cleanedText} ${text.radioId ? "RadioID: " + text.radioId : "JobID: " + text.labelId}`);
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
                    
                    if(text.radioId != null){
                        if(userResponse == 0 || userResponse.toLowerCase() == "yes"){
                            await page.click('[data-test-text-selectable-option__label="Yes"]')
                        }
                        else {
                            await page.click('[data-test-text-selectable-option__label="No"]')
                        }
                    }
                    else{
                        await page.evaluate((selector) => {
                            document.querySelector(selector).value = '';
                        }, `[id*="${text.labelId}"]`);
                        
                        await page.type(`[id*="${text.labelId}"]`, userResponse);
                    }
                    
            
                    // ... Collect user input and fill in the field
                    // You would need to implement the logic to actually collect user input and fill the field
                }
        } catch (error) {
        console.log(error, 'filling out input field failed')
        }
      
    }
    
    module.exports = inputText; // Make the function available for import