const inputText = require("./fillInputOnError");

  // Application process
  async function performApply(page) {
    try {
        try {
            const jobEzAppButtonExists = await page.$('.jobs-apply-button');
            if (!jobEzAppButtonExists) {
                console.log('Apply button not found, exiting function.');
            return; // Exit the function early
            }
             // Click apply button for current job selected
            const jobEzAppButton = await page.waitForSelector('.jobs-apply-button', { visible: true });
            await jobEzAppButton.click();
        } catch (error) {
            console.log(error, 'click apply button unsuccessful')
        }
       
        // Gets button handle otherwise return null
        let nextExists = await page.$('[data-easy-apply-next-button][type="button"]')
        // Keeps clicking next button
        try {
            while(nextExists != null){
                console.log('next button detected')
                // Check for the presence of the error message
                const error = await page.$('.artdeco-inline-feedback--error');
                if(error){
                    await inputText(page)
                } else {
                    // Click the next button if no error is present
                    const nextButton = await page.waitForSelector('[data-easy-apply-next-button][type="button"]', { visible: true });
                    await nextButton.click();
                }
               
                // Check again if the "Next" button exists
                nextExists = await page.$('[data-easy-apply-next-button][type="button"]')
            }
        } catch (error) {
            console.error(error, 'Next button click failed');
        }

        // Review button click
        let reviewButtonExists = await page.$('[aria-label="Review your application"]')
        try {
            while(reviewButtonExists != null){

                const error = await page.$('.artdeco-inline-feedback--error');
                if(error){
                    await inputText(page)
                } else {
                    const reviewButton = await page.waitForSelector('[aria-label="Review your application"]', { visible: true });
                    await reviewButton.click();
                }

                reviewButtonExists = await page.$('[aria-label="Review your application"]')
            }
        } catch (error) {
            console.log(error, 'review button unscucessful')
        }

        // Check if follow check input exists, click it
        const unfollowCheck = await page.$('#follow-company-checkbox');
        if(unfollowCheck){
            await unfollowCheck.click();
        }

        const submitAppButton = await page.waitForSelector('[aria-label="Submit application"]', { visible: true });
        await submitAppButton.click();

        await page.evaluate(() => {
            const doneButton = document.querySelector('button.artdeco-button span.artdeco-button__text').innerText.trim() === 'Done' ? document.querySelector('button.artdeco-button') : null;
            if (doneButton) doneButton.click();
          });
          

      } catch (error) {
        console.log(error, 'application process failed')
    }
    
  }
  
  module.exports = performApply; // Make the function available for import
  