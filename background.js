chrome.action.onClicked.addListener(() => {
    chrome.runtime.openOptionsPage();
});



chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    let tabId = null;

    // Handle the message
    console.log("Message received:", message);
    async function executeInAutomatedTab(callback, interval = 1000) {
        return new Promise(resolve => setTimeout(async () => {
            await chrome.scripting.executeScript({
                target: { tabId },
                world: 'MAIN',
                function: callback,
            });
            resolve();

        }, interval));
    }

    // Execute the script
    if (message === 'start_automation') {
        // open a new tab
        const tab = await chrome.tabs.create({ url: 'https://dichvucong.gov.vn' });
        tabId = tab.id;

      
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
        await executeInAutomatedTab(async () => {
            async function simulateTyping(inputElement, text, delay = 100) {
                inputElement.focus();
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
                nativeInputValueSetter.call(inputElement, text);
                const inputEvent = new Event('input', { bubbles: true });
                inputElement.dispatchEvent(inputEvent);
                await new Promise(resolve => setTimeout(resolve, delay));
            }

            //* edit here
            const CCCD = undefined;
            const password = undefined;

            
            const resolveButton = document.querySelector('button.custom-btn-resolve');
            if (resolveButton) {
                resolveButton.click();
                console.log('Clicked on the resolve button');
            } else {
                console.error('The resolve button is not available');
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            const usernameInput = document.querySelector('input#username');
            console.log("🚀 ~ awaitexecuteInAutomatedTab ~ usernameInput:", usernameInput)
            if (usernameInput) {
                simulateTyping(usernameInput, CCCD);
            } else {
                console.error('The username input is not available');
            }
            // type in input.password
            const passwordInput = document.querySelector('input#password');
            if (passwordInput) {
                simulateTyping(passwordInput, password);
            } else {
                console.error('The password input is not available');
            }

            if (resolveButton) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                resolveButton.click();
                console.log('Clicked on the resolve button');
            } else {
                console.error('The resolve button is not available');
            }
        }, 3000);



    }

    if (message === 'go_to_dktt') {
        const newTab = await chrome.tabs.create({ url: 'https://dichvucong.bocongan.gov.vn/bo-cong-an/tiep-nhan-online/chon-truong-hop-ho-so?ma-thu-tuc-public=56952' });
        tabId = newTab.id;
        executeInAutomatedTab(async () => {
            console.log('Redirected to the DKTT page');
            const loaiXeSelect = document.querySelector('select#_fcmaLoaiXe');
            console.log("🚀 ~ executeInAutomatedTab ~ _fcmaLoaiXe:", loaiXeSelect)
            if (loaiXeSelect) {
                loaiXeSelect.selectedIndex = 1;
                loaiXeSelect.dispatchEvent(new Event('change'));
                
            } else {
                console.error('The vehicle type select is not available');
            }
            await new Promise(resolve => setTimeout(resolve, 1000));

            const dungTichXeSelect = document.querySelector('select#_fcdungTichXe');
            if (dungTichXeSelect) {
                dungTichXeSelect.selectedIndex = 1;
                dungTichXeSelect.dispatchEvent(new Event('change'));
            } else {
                console.error('The vehicle capacity select is not available');
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            const diaChiDangKySelect = document.querySelector('select#_fcdiaChiDangKy');
            if (diaChiDangKySelect) {
                diaChiDangKySelect.selectedIndex = 1;
                diaChiDangKySelect.dispatchEvent(new Event('change'));
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            const nextButton = document.querySelector('button#btn-next');
            if (nextButton) {
                nextButton.click();
            } else {
                console.error('The next button is not available');
            }
        }, 1000);

        
    }

    // Send a response back
    sendResponse({ status: "Message received" });

    // Return true to indicate you want to send a response asynchronously
    return true;
});
