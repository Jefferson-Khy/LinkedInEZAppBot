  // Searches for passed in string job title
async function performSearch(page, jobTitle) {
  try {
    await page.waitForSelector('.search-global-typeahead__input', { visible: true });
    await page.type('.search-global-typeahead__input', jobTitle);
    await page.keyboard.press('Enter');
  } catch (error) {
    console.log(error, 'performSearch failed')
  }
    
  }
  
  module.exports = performSearch; // Make the function available for import
  