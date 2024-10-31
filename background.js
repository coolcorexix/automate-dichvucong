

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {


    // Handle the message
    console.log("Message received:", message);

    // Execute the script
    if (message === 'start_automation') {
        // open a new tab
        const tab = await chrome.tabs.create({ url: 'https://dichvucong.gov.vn' });
        const tabId = tab.id;

        function executeInAutomatedTab(callback, interval = 1000) {
            return new Promise(resolve => setTimeout(async () => {
                chrome.scripting.executeScript({
                    target: { tabId },
                    world: 'MAIN',
                    function: callback,
                });

            }, interval));
        }
        await new Promise(resolve => setTimeout(() => {
            chrome.scripting.executeScript({
                target: { tabId },
                world: 'MAIN',
                function: () => {
                    console.log('Automation started');
                    const registerButton = document.querySelector('.btn-register');
                    if (registerButton) {
                        registerButton.click();
                        console.log('Clicked on the register button');


                    } else {
                        console.error('The register button is not available');
                    }
                },
            });
            resolve();
        }, 1000));
        await new Promise(resolve => setTimeout(() => {
            chrome.scripting.executeScript({
                target: { tabId },
                world: 'MAIN',
                function: () => {
                    const loginIDPButton = document.querySelector('.login-IDP');
                    if (loginIDPButton) {
                        loginIDPButton.click();
                        console.log('Clicked on the login-IDP button');
                    } else {
                        console.error('The login-IDP button is not available');
                    }
                },
            });
            resolve();
        }, 1000));
        executeInAutomatedTab(() => {
            const usernameInput = document.querySelector('input#username');
            if (usernameInput) {
                usernameInput.value = '052097013984';
                console.log('Typed in the username');
            } else {
                console.error('The username input is not available');
            }
            // type in input.password
            const passwordInput = document.querySelector('input#password');
            if (passwordInput) {
                passwordInput.value = 'Trocap123!';
                console.log('Typed in the password');
            } else {
                console.error('The password input is not available');
            }
            const resolveButton = document.querySelector('button.custom-btn-resolve');
            if (resolveButton) {
                resolveButton.click();
                console.log('Clicked on the resolve button');
            } else {
                console.error('The resolve button is not available');
            }
        }, 3000);



    }

    // Send a response back
    sendResponse({ status: "Message received" });

    // Return true to indicate you want to send a response asynchronously
    return true;
});
