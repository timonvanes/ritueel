function page(error) {
  return `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Inloggen — Ritueel</title>
<link rel="icon" type="image/svg+xml" href="/icon.svg">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#0E7A57">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Ritueel">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Work+Sans:wght@400;500;600;700&display=swap">
<style>
:root{
  --bg:#F1F2F4; --surface:#FFFFFF; --surface-2:#F6F7F8;
  --ink:#14171A; --muted:#6B7280; --border:#E7E9EC;
  --accent:#0E7A57; --accent-ink:#FFFFFF; --danger:#C0463A;
  color-scheme:light;
}
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){
    --bg:#0E1012; --surface:#17191C; --surface-2:#1D2023;
    --ink:#F2F3F4; --muted:#9AA1A9; --border:#2A2D31;
    --accent:#22A97A; --accent-ink:#06120C; --danger:#E08476;
    color-scheme:dark;
  }
}
:root[data-theme="dark"]{
  --bg:#0E1012; --surface:#17191C; --surface-2:#1D2023;
  --ink:#F2F3F4; --muted:#9AA1A9; --border:#2A2D31;
  --accent:#22A97A; --accent-ink:#06120C; --danger:#E08476;
  color-scheme:dark;
}
*{box-sizing:border-box;}
html,body{margin:0;padding:0;height:100%;}
body{
  background:var(--bg); color:var(--ink); font-family:"Work Sans",system-ui,sans-serif;
  display:flex; align-items:center; justify-content:center;
  padding:calc(24px + env(safe-area-inset-top)) 24px calc(24px + env(safe-area-inset-bottom));
}
.card{
  width:100%; max-width:360px; background:var(--surface); border:1px solid var(--border);
  border-radius:24px; padding:32px 28px; display:flex; flex-direction:column; gap:20px;
  box-shadow:0 1px 2px rgba(20,23,26,.04),0 20px 40px -24px rgba(20,23,26,.2);
}
.logo{width:56px;height:56px;border-radius:16px;display:block;margin:0 auto;}
h1{font-family:"Manrope",sans-serif;font-weight:800;font-size:20px;margin:0;text-align:center;}
.sub{font-size:13.5px;color:var(--muted);text-align:center;margin-top:-10px;}
form{display:flex;flex-direction:column;gap:14px;}
.frow{display:flex;flex-direction:column;gap:6px;}
label{font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);}
input{
  font-family:"Work Sans",sans-serif;font-size:16px;color:var(--ink);
  background:var(--surface-2);border:1.5px solid var(--border);border-radius:12px;
  padding:13px 14px;width:100%;
}
input:focus-visible{outline:2px solid var(--accent);outline-offset:1px;}
button{
  font-family:"Manrope",sans-serif;font-weight:700;font-size:15px;
  background:var(--accent);color:var(--accent-ink);border:none;border-radius:999px;
  padding:14px 18px;cursor:pointer;min-height:50px;margin-top:4px;
  box-shadow:0 1px 2px rgba(20,23,26,.08);
}
button:active{transform:scale(.98);}
.error{
  background:color-mix(in srgb, var(--danger) 12%, var(--surface));
  color:var(--danger); border-radius:12px; padding:10px 12px; font-size:13px; text-align:center;
}
</style>
</head>
<body>
  <div class="card">
    <svg class="logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="22" fill="#0E7A57"/>
      <path d="M50 21 C50 21 29 47 29 61.5 C29 73.4 38.4 82 50 82 C61.6 82 71 73.4 71 61.5 C71 47 50 21 50 21 Z" fill="#FFFFFF"/>
      <path d="M40.5 61 L47 67.5 L60.5 51.5" fill="none" stroke="#0E7A57" stroke-width="6.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <div>
      <h1>Ritueel</h1>
    </div>
    ${error ? '<div class="error">Onjuiste gebruikersnaam of wachtwoord.</div>' : ""}
    <form method="POST" action="/api/login">
      <div class="frow">
        <label for="user">Gebruikersnaam</label>
        <input type="text" id="user" name="user" autocomplete="username" required autofocus>
      </div>
      <div class="frow">
        <label for="pass">Wachtwoord</label>
        <input type="password" id="pass" name="pass" autocomplete="current-password" required>
      </div>
      <button type="submit">Inloggen</button>
    </form>
  </div>
</body>
</html>`;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const error = searchParams.get("error") === "1";
  return new Response(page(error), {
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}
