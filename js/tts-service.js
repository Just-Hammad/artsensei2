let SoundOn = false;
let currentAudio = new Audio();
function getLastBubbleText() {
    const shadowRoot = document.querySelector('flowise-chatbot').shadowRoot;
    const bubbles = shadowRoot.querySelectorAll('.chatbot-host-bubble, .chatbot-guest-bubble');
    
    if (bubbles.length > 0) {
        const lastBubble = bubbles[bubbles.length - 1];
        const lastBubbleText = lastBubble.textContent.trim();
        // console.log('Last bubble text detected:', lastBubbleText);
        return lastBubbleText;
    }
    console.log('No bubbles detected.');
    return null;
}

function startObservingChat() {
    setTimeout(() => {

    const chatContainer = document.querySelector('flowise-chatbot').shadowRoot.querySelector('.chatbot-container');
    let lastText = '';

    const textarea = document.querySelector('flowise-chatbot').shadowRoot.querySelector('textarea');
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'disabled') {
                // Check if the textarea is no longer disabled (meaning chat processing is done)
                if (!textarea.disabled) {
                    console.log('Chat processing is done.');
                    const textToConvert = getLastBubbleText();  // Get the text from the last bubble
                    
                    // Process the text if it's not the same as the last processed text
                    if (textToConvert && textToConvert !== lastText) {
                        lastText = textToConvert;  // Update the last processed text
                        // console.log('New text to send to server:', textToConvert);
                        sendTextToServer(textToConvert);  // Send the final text for audio conversion
                    } else {
                        console.log('No new text detected or text already processed.');
                    }
                } else {
                    console.log('Waiting for chat processing to complete.');
                }
            }
        });
    });

    observer.observe(textarea, { attributes: true });
    observer.observe(chatContainer, { childList: true, subtree: true });
    }, 100); // Delay of 100 milliseconds
}

async function sendTextToServer(text) {
    const elevenLabsApiKey = '';
    const elevenLabsApiUrl = 'https://api.elevenlabs.io/v1/text-to-speech';
    const voiceId = document.getElementById('voiceId').value;
    if (SoundOn) {
        try {
            const response = await fetch(`${elevenLabsApiUrl}/${voiceId}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'xi-api-key': elevenLabsApiKey,
                },
                body: JSON.stringify({
                  text,
                  model_id: 'eleven_turbo_v2_5',
                  voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75
                  }
                }),
              });
        if (!response.ok) {
            console.error('Error generating audio from server:', response.json);
            return;
        }
        const audioUrl = URL.createObjectURL(await response.blob());
        currentAudio.src = audioUrl
        currentAudio.play();
        currentAudio.onended = () => {
            console.log('Audio finished playing.');
        };
        } catch (error) {
        console.error('Error sending text to server or playing audio:', error);
        }
    } else {
        console.log("Muted: Audio processing skipped!")
    }
}

function startObservingButton(){
    var button = document.querySelector('flowise-chatbot').shadowRoot.querySelector('button[part="button"]');
    button.onclick = startObservingChat;
    if (button) {
        button.addEventListener('click', startObservingChat => {
            // console.log('Button clicked!');
            setTimeout(() => {
                const Topcontainer = document.querySelector('flowise-chatbot').shadowRoot.querySelector('.flex.flex-row.items-center');
                const soundButton = document.createElement('button');
                soundButton.type = 'button';
                soundButton.className = 'py-2 px-2 justify-center font-semibold text-white flex items-center transition-all filter hover:brightness-90 active:brightness-75';
                soundButton.title = 'Play Sound'; // Optional title for the button
                soundButton.style = 'margin-right: 0px';

                const EnablesoundIconSVG = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                <path d="M13 3.7446C13 3.27314 12.8728 2.50021 12.1657 2.14424C11.4151 1.76635 10.7163 2.19354 10.3623 2.51158L4.94661 7.43717H3C1.89543 7.43717 1 8.3326 1 9.43717L1.00001 14.6248C1.00001 15.7293 1.89544 16.6248 3.00001 16.6248H4.95001L10.3623 21.4891C10.7175 21.8081 11.416 22.2331 12.1656 21.8554C12.8717 21.4998 13 20.7286 13 20.2561V3.7446Z" fill="#85f689"/>
                <path d="M17.336 3.79605L17.0952 3.72886C16.5633 3.58042 16.0117 3.89132 15.8632 4.42329L15.7289 4.90489C15.5804 5.43685 15.8913 5.98843 16.4233 6.13687L16.6641 6.20406C18.9551 6.84336 20.7501 9.14615 20.7501 12.0001C20.7501 14.854 18.9551 17.1568 16.6641 17.7961L16.4233 17.8632C15.8913 18.0117 15.5804 18.5633 15.7289 19.0952L15.8632 19.5768C16.0117 20.1088 16.5633 20.4197 17.0952 20.2713L17.336 20.2041C20.7957 19.2387 23.2501 15.8818 23.2501 12.0001C23.2501 8.11832 20.7957 4.76146 17.336 3.79605Z" fill="#85f689"/>
                <path d="M16.3581 7.80239L16.1185 7.73078C15.5894 7.57258 15.0322 7.87329 14.874 8.40243L14.7308 8.88148C14.5726 9.41062 14.8733 9.96782 15.4024 10.126L15.642 10.1976C16.1752 10.3571 16.75 11.012 16.75 12C16.75 12.9881 16.1752 13.643 15.642 13.8024L15.4024 13.874C14.8733 14.0322 14.5726 14.5894 14.7308 15.1185L14.874 15.5976C15.0322 16.1267 15.5894 16.4274 16.1185 16.2692L16.3581 16.1976C18.1251 15.6693 19.25 13.8987 19.25 12C19.25 10.1014 18.1251 8.33068 16.3581 7.80239Z" fill="#85f689"/>
                </svg>
                `;
                const DisablesoundIconSVG = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                <path d="M12.1657 2.14424C12.8728 2.50021 13 3.27314 13 3.7446V20.2561C13 20.7286 12.8717 21.4998 12.1656 21.8554C11.416 22.2331 10.7175 21.8081 10.3623 21.4891L4.95001 16.6248H3.00001C1.89544 16.6248 1.00001 15.7293 1.00001 14.6248L1 9.43717C1 8.3326 1.89543 7.43717 3 7.43717H4.94661L10.3623 2.51158C10.7163 2.19354 11.4151 1.76635 12.1657 2.14424Z" fill="#ff5555"/>
                <path d="M21.8232 15.6767C21.4327 16.0673 20.7995 16.0673 20.409 15.6768L18.5 13.7678L16.591 15.6768C16.2005 16.0673 15.5673 16.0673 15.1768 15.6767L14.8233 15.3232C14.4327 14.9327 14.4327 14.2995 14.8233 13.909L16.7322 12L14.8232 10.091C14.4327 9.70044 14.4327 9.06727 14.8232 8.67675L15.1767 8.3232C15.5673 7.93267 16.2004 7.93267 16.591 8.32319L18.5 10.2322L20.409 8.32319C20.7996 7.93267 21.4327 7.93267 21.8233 8.3232L22.1768 8.67675C22.5673 9.06727 22.5673 9.70044 22.1768 10.091L20.2678 12L22.1767 13.909C22.5673 14.2995 22.5673 14.9327 22.1767 15.3232L21.8232 15.6767Z" fill="#ff5555"/>
                </svg>
                </svg>
                `;

                
                if (SoundOn) {
                    soundButton.innerHTML = EnablesoundIconSVG; 
                } else {
                    soundButton.innerHTML = DisablesoundIconSVG;
                }

                Topcontainer.insertBefore(soundButton, Topcontainer.lastChild);

                soundButton.addEventListener('click', () => {
                    SoundOn = !SoundOn; // Toggle the state
                    if (SoundOn) {
                        soundButton.innerHTML = EnablesoundIconSVG;
                        console.warn("TTS Activated")
                        // sendTextToServer(getLastBubbleText());
                    } else {
                        soundButton.innerHTML = DisablesoundIconSVG;
                        console.warn("TTS De-activated")
                    }
                });
                currentAudio.src = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
                currentAudio.play().then(() => {
                    console.log('Silent sound played to unlock audio playback.');
                  }).catch((error) => {
                    console.error('Silent sound playback failed:', error);
                  });
                sendTextToServer(getLastBubbleText());
            }, 250);
        }, {once : true});
    } else {
        console.log('Button not found!');
    }
}

window.onload = function() {
    setTimeout(function() {
        console.log("Observing Button");
        startObservingButton();
    }, 400); // 500 ms delay
};
