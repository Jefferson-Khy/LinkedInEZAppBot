// Define and export the login function
async function performLogin(page, email, password, delay) {
  let loginSuccess = false; // Flag to check the login success
  try {
    // Clear the input fields before typing new credentials
    await page.evaluate(() => { document.querySelector('#username').value = ''; });
    await page.evaluate(() => { document.querySelector('#password').value = ''; });
    await page.type('#username', email); // Type in the email
    await page.type('#password', password); // Type in the password
    await page.click('button.btn__primary--large'); // Click the submit button
    await delay(17000, '\ndelay incase captcha appears')
    // Replace '.expected-element' with the selector for the element you expect to be present on successful login
    loginSuccess = await page.evaluate(() => !!document.querySelector('.global-nav__primary-link.global-nav__primary-link-me-menu-trigger.artdeco-dropdown__trigger.artdeco-dropdown__trigger--placement-bottom.ember-view'));
    if (!loginSuccess) {
      throw new Error('\nLogin failed: Expected element not found'); // This will be caught by the catch block below
    }
  } catch (error) {
    console.log('\nperformLogin failed');
    loginSuccess = false; // Set to false if there was an error or login failed
  }
  return loginSuccess; // Return the status of the login attempt
}

module.exports = performLogin;

