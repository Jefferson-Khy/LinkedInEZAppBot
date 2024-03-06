const puppeteer = require('puppeteer');
const performSearch = require('./performSearch')
const performFilters = require('./performFilters');
const grabJobIds = require('./grabJobIds');
const performApply = require('./performApply');
const loginProcedure = require('./loginUserInput')

async function openBrowser() {
  const browser = await puppeteer.launch({ headless: false }); // Launches Chrome
  const pages = await browser.pages(); // Gets all open pages (tabs)
  // const delay = time => new Promise(resolve => setTimeout(resolve, time));
  const delay = (time, message) => new Promise(resolve => {
    console.log(`Starting delay: ${message} for ${time} milliseconds.`);
    setTimeout(() => {
      resolve();
    }, time);
  });
  if (pages.length > 1) {
    await pages[0].close(); // Closes the initial blank page
  }
  const page = await pages[pages.length - 1]; // Uses the new page
  await page.setViewport({ width: 1250, height: 1080 });
  await page.goto('https://linkedin.com'); // Navigates to the website

  await delay(1800, 'delay clicking login so page can fully load')
  await page.click('a.nav__button-secondary'); // Click the login button/link
  
  // Login function
  await loginProcedure(page, delay)

  // Type in search bar field
  // Replace text to desired job title
  await performSearch(page, 'software developer')

  // Help prevent bot detection
  // Job button
  await delay(5000, 'delay to allow jobs button to populate');
  const jobButton = await page.waitForSelector('.artdeco-pill', { visible: true });
  await jobButton.click();

  await delay(2000, 'delay to allow time for filters to load')
  // Applies filters Ez-apply and Remote
  await performFilters(page, delay)

  let jobCount = 0
  let listPage = 1
  while (jobCount < 10) {
    // Grabs jobIds in UL
    await delay(1500, 'wait for list of jobs to load'); // Wait for the initial list of jobs to load
    let jobIDs = await grabJobIds(page); // Grab initial list of job IDs

    for (const job of jobIDs) {
        if (jobCount >= 10) {
          // Break out of the for loop if we've reached the job application limit
          break;
        }
        await page.click(`[data-occludable-job-id="${job}"]`);
        await delay(3500, "delay between each apply button click");
        // Start application process
        jobCount = await performApply(page, jobCount);
        console.log(jobCount);
    }
    listPage += 1; // Move to the next page
    await page.click(`[aria-label="Page ${listPage}"][type="button"]`);
    await delay(3500, 'wait for list of jobs to load after page change'); // Wait for the next list of jobs to load

    // Check if it's necessary to continue
    if (jobCount >= 10) break; // If you've already processed 100 jobs, no need to grab new IDs

    // Update jobIDs with the new set from the next page
    jobIDs = await grabJobIds(page); // Grab new set of job IDs after the page has loaded
}

  console.log(`Finished Applying! Applied to ${jobcount} jobs!!`)
  await browser.close()
}

openBrowser();





  