document.getElementById('startButton').addEventListener('click', async () => {
  chrome.runtime.sendMessage('start_automation', (response) => {
    console.log("🚀 ~ response", response
    );
  });

});



document.getElementById('go_to_dktt').addEventListener('click', async () => {
  chrome.runtime.sendMessage('go_to_dktt', (response) => {
    console.log("🚀 ~ response", response);
  });
});
