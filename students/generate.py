import os

# Users data (name and chatflowid)
users = [
    ("Lucy", "dd293430-1ef1-4db3-aa80-dddf51f6a3cd"),
    ("Libby", "06594a03-fe15-40bf-9ecd-e4ca362852ce"),
    ("Annabella", "6457ae75-f2ae-4391-99f4-9488ea475c73"),
    ("Xaveire", "e1511f7f-b9b5-403b-bb21-14cce257f95f"),
    ("Sam", "49d54035-5e30-480c-946b-0f15a1d571b3"),
    ("Wesley", "dd7d2ed3-e60c-4bf4-abad-af2b8d73fa0e"),
    ("Cassidy", "981067d8-dc37-46b9-a2cf-4bd5d73ae11a"),
    ("Emilio", "9b9ccc28-ecbf-4d29-a2ad-df00ce0aa25b"),
    ("Robert", "ae55ed86-f291-41fc-9a36-e6d41e0e357f"),
    ("Wyatt", "f9599cc0-bdca-4236-ab81-cb27f6d9cfc5"),
    ("Sydney", "3d6f3e18-e15f-46e4-9673-a3186a24640c"),
    ("Logan", "fbfababa-2b06-40c9-a124-8a97e8c49858"),
    ("Malachi", "200435d3-5163-4e87-9585-10c224ef726d"),
    ("Nellie", "d9e32d2e-e258-473f-92f8-6feac16ec43b"),
    ("Adelle", "9b253922-cc43-4d0e-bea9-8ad1ed9446ab"),
    ("Elisabeth", "8a8059bb-dd2d-497a-ae5c-bcd5710b2773"),
    ("Natalia", "52867096-fcee-49ee-a4c0-9d1df14fb52b")
]

# HTML template
html_template = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ArtSensei</title>
    <link rel="icon" type="image/x-icon" href="../Cathy.ico">
    <link rel="preload" href="../css/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="../css/styles.css"></noscript>
    <style>
        body {{
            margin-top: 20px;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: 'Poppins', sans-serif;
        }}
        img {{
            max-width: 80%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }}
        h2 {{
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 3rem;
            font-weight: bold;
            text-align: center;
        }}
        .subtext {{
            font-size: 1.3rem;
            color: #000;
            font-weight: normal;
            text-align: center;
        }}
        #logContainer {{
            max-height: 300px;
            min-height: 100px;
            overflow-y: auto;
            border: 1px solid #ccc;
            padding: 10px;
            margin-top: 20px;
            font-family: monospace;
            background-color: #f9f9f9;
            white-space: pre-wrap;
        }}
        .bodytext {{
            margin: 0 52px 20px 52px;
            font-size: 1.1rem;
            line-height: 1.3em;
            color: #4a4a4a;
            font-family: 'Lora', serif;
            max-width: 900px;
            min-height: 100px;
        }}
        .log {{ color: black; }}
        .warn {{ color: orange; }}
        .error {{ color: red; }}
        flowise-chatbot {{
            margin-top: 20px;
        }}
        .max-width {{
            max-width: 1200px;
            margin: 0 auto;
        }}
    </style>
</head>
<body>

    <img id="artImage" alt="Art Image" width="320" height="370">
    <h2 id="senseiName"></h2>
    <input type="hidden" id="voiceId" value="F0yTXVI2WXEIiShs00dR">
    <p class="subtext">Lesson: The Anatomy of Trees</p>
    <div style="display: none;" id="logContainer"></div>
    <div class="max-width">
        <p class="bodytext">
            Hello {name}! Welcome to ArtSensei. I'm here to guide you through the lesson on trees. Let's work together on achieving your goals in drawing!
            <br><br>
            Ready? Press the chat button to get started. At the top of our chat window is a speaker icon. Press it to hear me talk. Press the mic button below to speak to me.
            <br><br>
            Since I'm in beta, I occasionally make errors. Let's work together anyway!
        </p>
    </div>

    <script type="module">
        const name = "{name}";
        document.getElementById("artImage").src = `https://cdn.jsdelivr.net/gh/Just-Hammad/artsensei2@5dbbad242d73390373422f3ee5e36a9fbf82c6ae/avatar/${{name}}.webp`;
        document.getElementById("senseiName").textContent = `${name}`;
        
        import Chatbot from "https://cdn.jsdelivr.net/gh/Just-Hammad/artsensei2@8ea1acf3f2ecd92f082d726fcd9b629fdd8496ba/js/webmin.js";
        Chatbot.init({{
            chatflowid: "{chatflowid}",
            apiHost: "https://chat.artsensei.ai",
            theme: {{
                chatWindow: {{
                    showTitle: true,
                    title: `${name}`,
                    titleAvatarSrc: `https://cdn.jsdelivr.net/gh/Just-Hammad/artsensei2@5dbbad242d73390373422f3ee5e36a9fbf82c6ae/avatar/${{name}}.webp`,
                    showAgentMessages: false,
                    welcomeMessage: `Hello {name}! Are you ready to work on drawings of trees?`,
                    errorMessage: 'Error: Please contact teacher',
                    backgroundColor: "#212121",
                    height: 700,
                    width: '100%',
                    fontSize: 16,
                    poweredByTextColor: "#b3b3b3",
                    botMessage: {{
                        backgroundColor: "#212121",
                        textColor: "#b3b3b3",
                        showAvatar: true,
                        avatarSrc: `https://cdn.jsdelivr.net/gh/Just-Hammad/artsensei2@5dbbad242d73390373422f3ee5e36a9fbf82c6ae/avatar/${{name}}.webp`,
                        maxWidth: '100%',
                        marginRight: '60px',
                    }},
                    userMessage: {{
                        backgroundColor: "#333333",
                        textColor: "#ffffff",
                        showAvatar: false,
                        avatarSrc: "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
                    }},
                    textInput: {{
                        placeholder: 'Type your question',
                        backgroundColor: '#212121',
                        textColor: '#b3b3b3',
                        sendButtonColor: '#3B81F6',
                        maxChars: 300,
                        maxCharsWarningMessage: 'You exceeded the characters limit. Please input less than 300 characters.',
                        autoFocus: true,
                        width: '100%',
                        boxSizing: 'border-box',
                    }},
                    feedback: {{
                        color: '#b3b3b3',
                    }},
                    footer: {{
                        textColor: '#b3b3b3',
                        text: 'Powered by',
                        company: 'Artsensei',
                        companyLink: 'https://artsensei.ai',
                    }}
                }}
            }}
        }});
    </script>
    
    <script src="../js/log-errors.js" defer></script>
    <script src="../js/override-chatbot-styles.js" defer></script>
    <script src="../js/tts-service.js" defer></script>
</body>
</html>
"""

# Create directory to save HTML files
output_dir = "output_html_files"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Generate HTML files for each user with capitalization
for name, chatflowid in users:
    capitalized_name = name.capitalize()  # Ensure capitalization
    html_content = html_template.format(name=capitalized_name, chatflowid=chatflowid)
    file_name = f"{capitalized_name}.html"
    file_path = os.path.join(output_dir, file_name)
    
    with open(file_path, "w", encoding="utf-8") as file:
        file.write(html_content)

print(f"HTML files generated in '{output_dir}' directory.")
