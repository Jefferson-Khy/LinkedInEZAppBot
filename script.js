const puppeteer = require('puppeteer');
const performLogin = require('./performLogin');
const performSearch = require('./performSearch')
const performFilters = require('./performFilters');
const grabJobIds = require('./grabJobIds');
const performApply = require('./performApply');

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

  // Login function
  // Replace email/username and password
  await performLogin(page, 'USERNAME HERE', 'PASSWORD HERE');

  // Delay sign in button click to help prevent bot detection
  await delay(2000, 'delay before clicking log-in button'); // Pauses for xxxx milliseconds
  await page.click('button.btn__primary--large')

  await Promise.race([
    page.waitForNavigation({ waitUntil: 'networkidle0' }), // Waits for navigation to complete
    delay(17000, 'delay incase captcha appears') // Waits (input/1000) seconds, allowing time for manual CAPTCHA resolution
  ]);

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

  // Grabs jobIds in UL
  await delay(2500, 'wait for list of jobs to load')
  const jobIDs = await grabJobIds(page)

  let count = 1
  let listPage = 1
  while(count > -1){
    for(const job of jobIDs){
      await page.click(`[data-occludable-job-id="${job}"]`);
      await delay(3500)
      // Start application process
      await performApply(page)
    }
    listPage += 1
    await page.click(`[aria-label="Page ${listPage}"][type="button"]`)
    await delay(3500)
    count--
  }  


  console.log('finished applying!!')
  await browser.close
}

openBrowser();





  