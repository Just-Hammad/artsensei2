document.addEventListener("DOMContentLoaded", function() {
    // console.log("Document loaded. Starting shadow root detection.");

    // Function to check for the shadow root
    function checkForShadowRoot() {
        var chatbot = document.querySelector("flowise-chatbot");
        if (chatbot && chatbot.shadowRoot) {
            // console.log("Shadow root found inside <flowise-chatbot>.");
            document.querySelector("flowise-chatbot").shadowRoot.querySelector("style").innerHTML += "div.flex.flex-row.items-center.w-full {background: rgb(59, 129, 246) !important;} div.w-full.px-5.pt-2 {padding-bottom: 10px; } button.px-12 { padding-left: 5px !important;} span.w-full { display: none !important;} .flex.flex-row.justify-start.mb-2.items-start.host-container {margin-right: 5px !important;}";

            clearInterval(checkInterval); // Stop the loop once shadow root is found
        }
    }

    // Set an interval to check for the shadow root
    var checkInterval = setInterval(checkForShadowRoot, 10); // Check every 10 milliseconds
});