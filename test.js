// Perform Login 
async function performLogin(page, email, password, delay) {
  let loginSuccess = false; // Flag to check the login success
  try {
     // Now that the page is refreshed, proceed with the login
     await page.type('#username', email); // Type in the email
     await page.type('#password', password); // Type in the password
    // Delay sign in button click to help prevent bot detection
    await delay(2000, 'delay before clicking log-in button'); // Pauses for xxxx milliseconds
    await page.click('button.btn__primary--large')
    // Replace '.expected-element' with the selector for the element you expect to be present on successful login
    loginSuccess = await page.evaluate(() => !!document.querySelector('.global-nav__primary-link global-nav__primary-link-me-menu-trigger artdeco-dropdown__trigger artdeco-dropdown__trigger--placement-bottom ember-view'));
    if (!loginSuccess) {
      throw new Error('Login failed: Expected element not found'); // This will be caught by the catch block below
    }
  } catch (error) {
    console.log(error, 'performLogin failed');
    loginSuccess = false; // Set to false if there was an error or login failed
  }
  return loginSuccess; // Return the status of the login attempt
}

module.exports = performLogin;
