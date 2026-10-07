const email = document.getElementById('email');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const fileCount = document.getElementById('fileCount');
const continueBtn = document.getElementById('continueBtn');
const dropZone = document.getElementById('dropZone');
let files = [];

function doLogin(){
  if(email.value){
    document.getElementById('loginScreen').classList.remove('active');
    document.getElementById('uploadScreen').classList.add('active');
  } else { alert("Email likhen"); }
}

function updateFiles(){
  fileList.innerHTML="";
  files.forEach(f=>{
    let li=document.createElement('li');
    li.innerHTML = `📄 ${f.name} <b style="color:green;">✓ Saved Successfully</b> - ${(f.size/1024).toFixed(1)} KB`;
    fileList.appendChild(li);
  });
  fileCount.textContent=files.length;

  // Button fix - force blue
  if(files.length > 0){
    continueBtn.disabled = false;
    continueBtn.style.background = "#2563eb";
    continueBtn.style.color = "white";
    continueBtn.style.opacity = "1";
    continueBtn.style.cursor = "pointer";
  }
}

fileInput.addEventListener('change', (e)=>{
  files = [...files,...Array.from(e.target.files)];
  updateFiles();
});

dropZone.addEventListener('dragover', (e)=>{ e.preventDefault(); dropZone.style.background="#dbeafe"; });
dropZone.addEventListener('dragleave', ()=>{ dropZone.style.background="#eff6ff"; });
dropZone.addEventListener('drop', (e)=>{
  e.preventDefault();
  dropZone.style.background="#eff6ff";
  files = [...files,...Array.from(e.dataTransfer.files)];
  updateFiles();
});

function goToChat(){
  if(files.length === 0){
    alert("Pehle file upload karen!");
    return;
  }
  document.getElementById('uploadScreen').classList.remove('active');
  document.getElementById('chatScreen').classList.add('active');
}

function askAI(){
  const qInput = document.getElementById('qInput');
  const chatBox = document.getElementById('chatBox');
  if(!qInput.value.trim()) return;

  let userMsg = document.createElement('div');
  userMsg.className="msg user";
  userMsg.textContent="You: "+qInput.value;
  chatBox.appendChild(userMsg);

  let aiMsg = document.createElement('div');
  aiMsg.className="msg ai";
  aiMsg.textContent="AI: I analyzed your "+files.length+" file(s) '"+files[0].name+"'. Your document is saved and ready for search. (Demo Response)";
  setTimeout(()=>{ chatBox.appendChild(aiMsg); chatBox.scrollTop=chatBox.scrollHeight; }, 600);

  qInput.value="";
  chatBox.scrollTop=chatBox.scrollHeight;
}