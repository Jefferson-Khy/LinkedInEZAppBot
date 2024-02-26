// Define and export the login function
async function performLogin(page, email, password) {
  try {
    await page.click('a.nav__button-secondary'); // Click the login button/link
    await page.type('#username', email); // Type in the email
    await page.type('#password', password); // Type in the password
  } catch (error) {
    console.log(error, 'performLogin failed')
  }
  
}

module.exports = performLogin; // Make the function available for import
