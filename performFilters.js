  // Applies remote, easy apply filters
  async function performFilters(page, delay) {
    // Ez apply button
    const eZButton = await page.waitForSelector('[aria-label="Easy Apply filter."]', { visible: true });
    await eZButton.click();

    delay(2500, '\ngive time for taskbar reload then click remote')
    // Remote button
    const remoteButton = await page.waitForSelector('#searchFilter_workplaceType', { visible: true });
    await remoteButton.click();

    // Replace number to change options On-site = 1, Remote = 2, Hybrid = 3
    const remoteRadial = await page.waitForSelector('#workplaceType-2', { visible: true });
    await remoteRadial.click();

    // Show Results button
    const showResultsButton = await page.waitForSelector('.artdeco-button--2', { visible: true });
    await showResultsButton.click();
  }
  
  module.exports = performFilters; // Make the function available for import
  