  // Searches for passed in string job title
  async function grabJobIds(page) {
    try {
        // Grabs randomly generated jobIds and puts them into an array
        // It keeps adding empty strings into array for some reason so i had to filter out empty strings
        await page.waitForSelector('ul.scaffold-layout__list-container li', { visible: true });
        let jobIds = await page.$$eval('[data-occludable-job-id]', elements => elements.map(el => el.getAttribute('data-occludable-job-id')));
        return jobIds
      } catch (error) {
        console.log(error, 'grabJobIds failed')
    }
    
  }
  
  module.exports = grabJobIds; // Make the function available for import
  