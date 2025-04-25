const main=document.querySelector(".main2");
const chatsContainer=document.querySelector(".chats-container2");
const container=document.querySelector(".container2");
const promptForm=document.querySelector(".prompt-form2");
const promptInput=promptForm.querySelector(".prompt-input2");
const fileInput=promptForm.querySelector("#file-input2");
const fileUploadWrapper=promptForm.querySelector(".file-upload-wrapper2");
const themeToggle=document.querySelector("#theme-toggle-btn2");
const API_KEY="AIzaSyBYVx8UHzCMB0ZAnRU5DRtzkYY_hEkGRFI";
const API_URL=`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

let typingInterval,controller;
const chatHistory=[];
const userData={message:"",file:{}};
const createMsgElement=(content,...classes)=>{
    const div=document.createElement("div");
    div.classList.add("message2",...classes);
    div.innerHTML=content;
    return div;
}
//scroll to bottom of container
// const scrollToBottom=()=>container.scrollTo({top:container.scrollHeight,behavior:"smooth"});
let userScrolledUp = false; // Flag to track if user scrolled up

const scrollToBottom = () => {
    if (!userScrolledUp) { // Only scroll if user is near the bottom
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
};

// Detect user scroll and stop auto-scroll if scrolling up
container.addEventListener("scroll", () => {
    const nearBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 50;
    userScrolledUp = !nearBottom; // If not near the bottom, stop auto-scroll
});

//simulate typing effect for bot response
const typingEffect=(text,textElement,botMsgDiv)=>{
    textElement.textContent="";
    const words=text.split(" ");
    let wordIndex=0;
    //set an iterval to type each word
    typingInterval=setInterval(()=>{
        if(wordIndex<words.length){
            textElement.textContent+=(wordIndex===0?"":" ")+words[wordIndex++];
            scrollToBottom();
        }else{
            clearInterval(typingInterval);
            botMsgDiv.classList.remove("loading2");
            document.body.classList.remove("bot-responding2");

        }
    },40)
}
//Make Api call and generate bot response
const generateBotResponse=async(botMsgDiv)=>{
    const textElement=botMsgDiv.querySelector(".message-text2");
    controller=new AbortController();
    //Add user msg and file data in chat history
    chatHistory.push({
        role:"user",
        parts:[{text:userData.message},...(userData.file.data?[{inline_data:(({fileName,isImage,...rest})=>rest)(userData.file)}]:[])]
    })
    try{
        //send chat history to get response;
        const response=await fetch(API_URL,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({contents:chatHistory}),
            signal:controller.signal
        });
        const data=await response.json();
        if(!response.ok) throw new Error(data.error.message);
        const responseText=data.candidates[0].content.parts[0].text.replace(/\*\*([^*]+)\*\*/g,"$1").trim();
        typingEffect(responseText,textElement,botMsgDiv);
        chatHistory.push({
            role:"model",
            parts:[{text:responseText}]
        })
        
    }catch(error){
       textElement.style.color="#d62939";
       textElement.textContent=error.name==="AbortError"?"Response generation stopped.":error.message;
       botMsgDiv.classList.remove("loading2");
       document.body.classList.remove("bot-responding2");
       scrollToBottom();


    }finally{
        userData.file={};
    }
}
const handleFormSubmit=(e)=>{
    e.preventDefault();
    const userMessage=promptInput.value.trim();
   
    if(!userMessage||document.body.classList.contains("bot-responding2")) return;
    promptInput.value="";
    userData.message=userMessage;
    document.body.classList.add("bot-responding2");
    fileUploadWrapper.classList.remove("active2","img-attached2","file-attached2");
    const userMsgHTML=` <p class="message-text2"></p>
    ${userData.file.data?(userData.file.isImage?`<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="img-attachment2"/>`:`<p class="file-attachment2"><span class="material-symbols-rounded">description</span>${userData.file.fileName}</p>`):""}`;
    const userMsgDiv=createMsgElement(userMsgHTML,"user-message2");
    userMsgDiv.querySelector(".message-text2").textContent=userMessage;
    chatsContainer.appendChild(userMsgDiv);
    scrollToBottom();
    //genertate bot message html after 600ms and add in chat container
    setTimeout(()=>{
        const botMsgHTML=`  <img src="/Zennylogo.png" alt="" class="Zenny2">
                <p class="message-text2">Just a sec....</p>`
        const botMsgDiv=createMsgElement(botMsgHTML,"bot-message2","loading2");
       
        chatsContainer.appendChild(botMsgDiv);
        scrollToBottom();
        generateBotResponse(botMsgDiv);
    },600)
    
}
//handle file input change(file upload)
fileInput.addEventListener("change",()=>{
    const file=fileInput.files[0];
    if(!file) return;
    const isImage=file.type.startsWith("image/");
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=(e)=>{
        fileInput.value="";
        const base64String=e.target.result.split(",")[1];
        fileUploadWrapper.querySelector(".file-preview2").src=e.target.result;
        fileUploadWrapper.classList.add("active2",isImage?"img-attached2":"file-attached2");
        //store file data in userData  obj
        userData.file={fileName:file.name,data:base64String,mime_type:file.type,isImage};
    }
});
//cancel file upload
document.querySelector("#cancel-file-btn2").addEventListener("click",()=>{
    userData.file={};
    fileUploadWrapper.classList.remove("active2","img-attached2","file-attached2");
})
//stop ongoing bot response
document.querySelector("#stop-response-btn2").addEventListener("click",()=>{
    userData.file={};
    controller?.abort();
    clearInterval(typingInterval);
    chatsContainer.querySelector(".bot-message2.loading2").classList.remove("loading2");
    document.body.classList.remove("bot-responding2");
    
})
//delete all chats
document.querySelector("#delete-chats-btn2").addEventListener("click",()=>{
    chatHistory.length=0;
    chatsContainer.innerHTML="";
    document.body.classList.remove("bot-responding2");

})
//toggle dark/light theme
themeToggle.addEventListener("click", () => {
    const isLightTheme = document.body.classList.toggle("dark-theme2");
    localStorage.setItem("themeColor2", isLightTheme ? "dark_mode" : "light_mode");
    themeToggle.textContent = isLightTheme ? "dark_mode" : "light_mode";
    
  });
  //set initial theme for localstorage
  const isLightTheme = localStorage.getItem("themeColor2") === "dark_mode";
  document.body.classList.toggle("dark-theme2", isLightTheme);
  themeToggle.textContent = isLightTheme ? "dark_mode" : "light_mode";
  

promptForm.addEventListener("submit",handleFormSubmit);
promptForm.querySelector("#add-file-btn2").addEventListener("click",()=>fileInput.click());

//selection search

document.addEventListener("mouseup", () => {
    let selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        userData.message = `Explain this: "${selectedText} in laymans language"`; // Add selected text as user message
        autoExplainSelection();
    }
});
function autoExplainSelection() {
    if (document.body.classList.contains("bot-responding2")) return;
    document.querySelector(".main2").classList.add("visible")
    document.body.classList.add("bot-responding2");

    const userMsgHTML = `<p class="message-text2"></p>`;
    const userMsgDiv = createMsgElement(userMsgHTML, "user-message2");
    userMsgDiv.querySelector(".message-text2").textContent = userData.message;
    chatsContainer.appendChild(userMsgDiv);
    scrollToBottom();

    setTimeout(() => {
        const botMsgHTML = `<img src="/Zennylogo.png" alt="" class="Zenny2">
                <p class="message-text2">Just a sec...</p>`;
        const botMsgDiv = createMsgElement(botMsgHTML, "bot-message2", "loading2");

        chatsContainer.appendChild(botMsgDiv);
        scrollToBottom();
        generateBotResponse(botMsgDiv);
    }, 600);
}
 //explain this page
 function getPageText() {
    let clonedBody = document.body.cloneNode(true); // Clone the body to avoid modifying the actual page

    // Remove elements that should be ignored
    let excludedSelectors = [
        ".main2",        // Exclude the chatbot UI
        "nav", "footer", "header", "aside", // Common unwanted elements
        "button", "script", "style", "form" // Remove non-text elements
    ];

    excludedSelectors.forEach(selector => {
        clonedBody.querySelectorAll(selector).forEach(el => el.remove());
    });

    return clonedBody.innerText.trim().substring(0, 4000); // Extract visible text, limit to 4000 chars
}

 document.querySelector(".explain").addEventListener("click", async () => {
    if (document.body.classList.contains("bot-responding2")) return;

    document.body.classList.add("bot-responding2");

    let pageContent = getPageText();
    if (!pageContent) {
        alert("No readable content found on this page.");
        return;
    }

    const botMsgHTML = `
        <img src="/Zennylogo.png" alt="" class="Zenny2">
        <p class="message-text2">Analyzing the page...</p>`;
    const botMsgDiv = createMsgElement(botMsgHTML, "bot-message2", "loading2");

    chatsContainer.appendChild(botMsgDiv);
    scrollToBottom();

    generateBotExplanation(botMsgDiv, pageContent);
});
document.querySelector(".summarize").addEventListener("click", async () => {
    if (document.body.classList.contains("bot-responding2")) return;

    document.body.classList.add("bot-responding2");

    let pageContent = getPageText();
    if (!pageContent) {
        alert("No readable content found on this page.");
        return;
    }

    const botMsgHTML = `
        <img src="/Zennylogo.png" alt="" class="Zenny2">
        <p class="message-text2">Summarizing the page...</p>`;
    const botMsgDiv = createMsgElement(botMsgHTML, "bot-message2", "loading2");

    chatsContainer.appendChild(botMsgDiv);
    scrollToBottom();

    generateBotSummarization(botMsgDiv, pageContent);
});
const generateBotExplanation = async (botMsgDiv, pageContent) => {
    const textElement = botMsgDiv.querySelector(".message-text2");
    controller = new AbortController();

    try {
        // Send only the page content to the API without user seeing it
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: "explain this page: " + pageContent }]
                    }
                ]
            }),
            signal: controller.signal
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message);

        const responseText = data.candidates[0].content.parts[0].text.replace(/\*\*([^*]+)\*\*/g, "$1").trim();
        typingEffect(responseText, textElement, botMsgDiv);
        
    } catch (error) {
        textElement.style.color = "#d62939";
        textElement.textContent = error.name === "AbortError" ? "Response generation stopped." : error.message;
        botMsgDiv.classList.remove("loading2");
        document.body.classList.remove("bot-responding2");
        scrollToBottom();
    }
};
const generateBotSummarization = async (botMsgDiv, pageContent) => {
    const textElement = botMsgDiv.querySelector(".message-text2");
    controller = new AbortController();

    try {
        // Send only the page content to the API without user seeing it
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: "summarize this page: " + pageContent }]
                    }
                ]
            }),
            signal: controller.signal
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message);

        const responseText = data.candidates[0].content.parts[0].text.replace(/\*\*([^*]+)\*\*/g, "$1").trim();
        typingEffect(responseText, textElement, botMsgDiv);
        
    } catch (error) {
        textElement.style.color = "#d62939";
        textElement.textContent = error.name === "AbortError" ? "Response generation stopped." : error.message;
        botMsgDiv.classList.remove("loading2");
        document.body.classList.remove("bot-responding2");
        scrollToBottom();
    }
};
document.querySelector(".Zenny-icon-ani").addEventListener("click",()=>{
    main.classList.toggle("visible");
    if(main.classList.contains("visible")){
        document.querySelector(".main").classList.add("z-index");
        document.querySelector(".chats-container2").innerHTML='';

    }else{
        document.querySelector(".main").classList.remove("z-index"); 
        

    }
    // document.querySelector(".prompt-container2").classList.toggle("visible");
})
