document.getElementById('startButton').addEventListener('click', async () => {
  console.log('over here');
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // chrome.tabs.onUpdated.addListener(async function listener(tabId, changeInfo, updatedTab) {
  //   if (tabId !== tab.id) {
  //     return;
  //   }
  //   console.log("🚀 ~ listener ~ updatedTab.url:", updatedTab.url)
  //   if (updatedTab.url.startsWith('https://xacthuc.dichvucong.gov.vn/authenticationendpoint/login.do')) {

  //     // execute script
  //     chrome.scripting.executeScript({
  //       target: { tabId: tab.id },
  //       function: () => {
  //         const loginIDPButton = document.querySelector('.login-IDP');
  //         if (loginIDPButton) {
  //           loginIDPButton.click();
  //           console.log('Clicked on the login-IDP button');
  //         } else {
  //           console.error('The login-IDP button is not available');
  //         }

  //       },
  //     });
  //   }
  //   if (updatedTab.url.startsWith('https://sso.dancuquocgia.gov.vn/auth')) {
  //     chrome.scripting.executeScript({
  //       target: { tabId: tab.id },
  //       function: () => {
  //         // type in input.username
  //         const usernameInput = document.querySelector('input#username');
  //         if (usernameInput) {
  //           usernameInput.value = '052097013984';
  //           console.log('Typed in the username');
  //         } else {
  //           console.error('The username input is not available');
  //         }
  //         // type in input.password
  //         const passwordInput = document.querySelector('input#password');
  //         if (passwordInput) {
  //           passwordInput.value = 'Trocap123!';
  //           console.log('Typed in the password');
  //         } else {
  //           console.error('The password input is not available');
  //         }

  //       },
  //     });


  //   }
  // });

  // send message to background.js
  chrome.runtime.sendMessage('start_automation', (response) => {
    console.log("🚀 ~ response", response
    );
  });
  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   function: startAutomation,
  // });
  // let active tabs do the listening
  // Add a listener to the active tab

});

function startAutomation() {
  console.log('Automation started');
  // open a url
  const url = 'https://dichvucong.gov.vn/p/home/dvc-trang-chu.html';
  window.location.href = url;
  console.log(`Navigated to ${url}`);
  // wait for the .btn-register element to be available
  const registerButton = document.querySelector('.btn-register');
  if (registerButton) {
    registerButton.click();
    console.log('Clicked on the register button');
    setTimeout(() => {
      debugger;
      const loginIDPButton = document.querySelector('.login-IDP');
      if (loginIDPButton) {
        loginIDPButton.click();
        console.log('Clicked on the login-IDP button');
      } else {
        console.error('The login-IDP button is not available');
      }
    }, 3000)

  } else {
    console.error('The register button is not available');
  }




}
