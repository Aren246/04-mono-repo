const form = document.getElementById("guestForm");
const messagesDiv = document.getElementById("messages");


const API = "https://zero4-mono-repo-n7n0.onrender.com";

const loadMessages = async () => {
  const res = await fetch(`${API}/api/messages`);
  const data = await res.json();



  data.forEach(m => {
    const div = document.createElement("div");
    div.className = "msg";
    div.textContent = `${m.name}: ${m.message}`;
    messagesDiv.appendChild(div);
  });
};

form.addEventListener("submit", async e => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  await fetch(`${API}/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message })
  });

  form.reset();
  loadMessages();
});

loadMessages();
