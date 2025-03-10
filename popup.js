document.addEventListener("DOMContentLoaded", function () {
    let linksBox = document.getElementById("links");
    let saveButton = document.getElementById("save");
    let openButton = document.getElementById("open");

    // Load saved links from storage
    chrome.storage.sync.get("savedLinks", function (data) {
        if (data.savedLinks) {
            linksBox.value = data.savedLinks.join("\n");
        }
    });

    // Save links when clicking 'Save'
    saveButton.addEventListener("click", function () {
        let links = linksBox.value.split("\n").map(link => link.trim()).filter(link => link);
        chrome.storage.sync.set({ savedLinks: links }, function () {
            alert("Links Saved!");
        });
    });

    // Open links in new tabs
    openButton.addEventListener("click", function () {
        chrome.storage.sync.get("savedLinks", function (data) {
            if (data.savedLinks) {
                data.savedLinks.forEach(link => {
                    chrome.tabs.create({ url: link });
                });
            }
        });
    });
});
