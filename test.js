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
                    console.log(`\nPlease fill in the field for: ${text.cleanedText} `); //${text.radioId ? "RadioID: " + text.radioId : "JobID: " + text.labelId}
                  
                    const readline = require('readline').createInterface({
                        input: process.stdin,
                        output: process.stdout
                    });
                  
                    const askQuestion = (questionText) => new Promise((resolve) => {
                        readline.question(questionText, (input) => {
                            resolve(input.trim().toLowerCase());
                        });
                    });
                  
                    let userResponse;
                    if (text.radioId != null) {
                        do {
                            userResponse = await askQuestion('\nPlease enter "yes" or "0" for Yes, "no" or "1" for No: ');
                  
                            if (userResponse === "yes" || userResponse === "0" || userResponse === "no" || userResponse === "1") {
                                break; // Valid input
                            } else {
                                console.log('\nInvalid input. Please enter "yes" or "0" for Yes, "no" or "1" for No.');
                            }
                        } while (true);
                    } else {
                        // For text input fields, ask the user for input without validation
                        userResponse = await askQuestion('\nEnter something: ');
                    }
                  
                    console.log(`\nYou entered: ${userResponse}`);
                  
                    // Processing based on the response
                    // if (text.radioId != null) {
                    //     if (userResponse === "yes" || userResponse === "0") {
                    //         await page.click('[data-test-text-selectable-option__label="Yes"]');
                    //     } else if (userResponse === "no" || userResponse === "1") {
                    //         await page.click('[data-test-text-selectable-option__label="No"]');
                    //     }
                    // }
                    if (text.radioId != null) {
                        await page.evaluate((radioId) => {
                            const parentElement = document.querySelector(`[id*="${radioId}"]`);
                            if (parentElement) {
                                const yesOption = parentElement.querySelector('[data-test-text-selectable-option__label="Yes"]');
                                if (yesOption) {
                                    yesOption.click();
                                }
                            }
                        }, text.radioId);
                    } else {
                        await page.evaluate((selector) => {
                            document.querySelector(selector).value = '';
                        }, `[id*="${text.labelId}"]`);
                        
                        await page.type(`[id*="${text.labelId}"]`, userResponse);
                    }
                  }

            readline.close(); // Consider closing readline only when completely done, not after each question.
        } catch (error) {
        console.log(error, '\nfilling out input field failed')
        }
      
    }
    
    module.exports = inputText; // Make the function available for import