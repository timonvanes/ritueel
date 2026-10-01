const HTML = `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Ritueel</title>
<link rel="icon" type="image/svg+xml" href="/icon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
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
  --bg:#F1F2F4;
  --surface:#FFFFFF;
  --surface-2:#F6F7F8;
  --ink:#14171A;
  --muted:#6B7280;
  --border:#E7E9EC;
  --accent:#0E7A57;
  --accent-ink:#FFFFFF;
  --skin:#0E7A57;
  --hair:#64748B;
  --done:#0E7A57;
  --danger:#C0463A;
  color-scheme:light;
}
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){
    --bg:#0E1012; --surface:#17191C; --surface-2:#1D2023;
    --ink:#F2F3F4; --muted:#9AA1A9; --border:#2A2D31;
    --accent:#22A97A; --accent-ink:#06120C;
    --skin:#22A97A; --hair:#8B97A6; --done:#22A97A; --danger:#E08476;
    color-scheme:dark;
  }
}
:root[data-theme="dark"]{
  --bg:#0E1012; --surface:#17191C; --surface-2:#1D2023;
  --ink:#F2F3F4; --muted:#9AA1A9; --border:#2A2D31;
  --accent:#22A97A; --accent-ink:#06120C;
  --skin:#22A97A; --hair:#8B97A6; --done:#22A97A; --danger:#E08476;
  color-scheme:dark;
}

*{box-sizing:border-box;}
html,body{margin:0;padding:0;}
body{
  background:var(--bg); color:var(--ink);
  font-family:"Work Sans",system-ui,sans-serif;
  font-size:15.5px;
  padding:0 16px;
  padding-block:calc(20px + env(safe-area-inset-top)) calc(56px + env(safe-area-inset-bottom));
}
.wrap{max-width:760px;margin:0 auto;display:flex;flex-direction:column;gap:22px;}

h1,h2,h3{font-family:"Manrope",system-ui,sans-serif;font-weight:800;margin:0;text-wrap:balance;}
.label-caps{font-family:"Work Sans",sans-serif;font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);}

header.top{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding-block:4px;}
header.top .title-line{display:flex;align-items:center;gap:10px;}
header.top .logo-mark{width:30px;height:30px;border-radius:9px;flex-shrink:0;}
header.top .title-block h1{font-size:25px;line-height:1.15;}
header.top .title-block .date{margin-top:5px;color:var(--muted);font-size:13.5px;}
header.top .title-block .date a{color:var(--muted);text-decoration:none;}
header.top .title-block .date a:hover{color:var(--accent);}
.streak{
  background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:12px 20px;
  text-align:center;min-width:92px;flex-shrink:0;
  box-shadow:0 1px 2px rgba(20,23,26,.05),0 10px 24px -16px rgba(20,23,26,.16);
}
.streak .num{font-family:"Manrope",sans-serif;font-size:28px;font-weight:800;color:var(--ink);font-variant-numeric:tabular-nums;line-height:1;}
.streak .txt{font-size:10.5px;color:var(--muted);letter-spacing:.04em;margin-top:5px;}

nav.tabs{display:flex;gap:4px;border-bottom:1px solid var(--border);}
nav.tabs button{
  font-family:"Manrope",sans-serif;font-size:14.5px;font-weight:700;letter-spacing:.02em;
  background:none;border:none;color:var(--muted);padding:13px 6px;margin-right:22px;cursor:pointer;
  border-bottom:3px solid transparent;translate:0 1.5px;
}
nav.tabs button.active{color:var(--accent);border-bottom-color:var(--accent);}
nav.tabs button:focus-visible{outline:2px solid var(--accent);outline-offset:2px;}

.banner{background:var(--surface-2);border:1px dashed var(--border);border-radius:12px;padding:12px 14px;font-size:13.5px;color:var(--muted);}

.daynav{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:16px;}
.daynav .navbtn{
  width:38px;height:38px;border-radius:50%;border:1px solid var(--border);background:var(--surface);
  color:var(--ink);font-size:18px;font-family:"Manrope",sans-serif;font-weight:700;cursor:pointer;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
.daynav .navbtn:disabled{opacity:.25;cursor:default;}
.daynav #dayLabel{
  background:none;border:none;font-family:"Manrope",sans-serif;font-weight:700;font-size:15px;color:var(--ink);
  cursor:pointer;padding:6px 10px;border-radius:10px;min-width:170px;text-align:center;
}
.daynav #dayLabel:hover{background:var(--surface-2);}
.daynav #dayLabel.is-today{color:var(--accent);}

.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
@media (max-width:640px){.grid-2{grid-template-columns:1fr;}}

.card{
  background:var(--surface);border:1px solid var(--border);border-radius:22px;padding:18px;
  display:flex;flex-direction:column;gap:10px;
  box-shadow:0 1px 2px rgba(20,23,26,.04),0 10px 24px -18px rgba(20,23,26,.14);
}
.card.active-time{border-color:var(--accent);box-shadow:0 0 0 1.5px var(--accent) inset;}
.card-head{display:flex;align-items:baseline;justify-content:space-between;gap:8px;}
.card-head h2{font-size:19px;}
.card-head .count{font-family:"Manrope",sans-serif;font-weight:700;font-size:13.5px;color:var(--muted);font-variant-numeric:tabular-nums;}

.rows{display:flex;flex-direction:column;}
.row-wrap{display:flex;align-items:center;gap:2px;border-bottom:1px solid var(--border);}
.row-wrap:last-child{border-bottom:none;}
.row-wrap:hover{background:var(--surface-2);}
.row-wrap.skipped{opacity:.5;}
.row-main{
  display:flex;align-items:center;gap:13px;padding:13px 4px 13px 4px;cursor:pointer;
  min-height:56px;flex:1;min-width:0;-webkit-tap-highlight-color:transparent;
}
.row-main input{position:absolute;opacity:0;width:0;height:0;}
.chk{
  width:27px;height:27px;border-radius:50%;border:2px solid var(--border);
  background:var(--surface);flex-shrink:0;position:relative;transition:background .1s,border-color .1s;
}
.row-main input:checked + .chk{background:var(--done);border-color:var(--done);}
.row-main input:checked + .chk::after{
  content:"";position:absolute;left:8px;top:4px;width:7px;height:13px;
  border:solid var(--accent-ink);border-width:0 3px 3px 0;transform:rotate(40deg);
}
.row-main input:focus-visible + .chk{outline:2px solid var(--accent);outline-offset:2px;}
.skip-dash{
  width:27px;height:27px;border-radius:50%;border:2px dashed var(--border);flex-shrink:0;
  display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:15px;line-height:1;
}
.row-body{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1;}
.row-name-line{display:flex;align-items:center;gap:7px;flex-wrap:wrap;}
.row-name{font-size:15px;font-weight:500;}
.row-main.done .row-name{color:var(--muted);text-decoration:line-through;text-decoration-color:var(--border);font-weight:400;}
.dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.row-notes{font-size:12.5px;color:var(--muted);}
.suggest-tag{
  font-family:"Work Sans",sans-serif;font-size:10px;letter-spacing:.04em;text-transform:uppercase;
  color:var(--accent);border:1px solid var(--accent);border-radius:6px;padding:1px 6px;
}
.skip-btn{
  flex-shrink:0;background:none;border:none;color:var(--muted);font-family:"Work Sans",sans-serif;
  font-size:10.5px;letter-spacing:.03em;text-transform:uppercase;padding:10px 10px;border-radius:10px;
  cursor:pointer;min-height:40px;min-width:52px;
}
.skip-btn:hover{background:var(--surface-2);color:var(--ink);}
.skip-btn.active{color:var(--accent);}
.skip-btn:disabled{opacity:.3;cursor:default;}
.row-actions{display:flex;flex-direction:column;gap:2px;flex-shrink:0;align-items:stretch;}
.row-actions .skip-btn{min-width:88px;}
.empty-row{font-size:13.5px;color:var(--muted);padding:10px 8px;}

.history{display:flex;flex-direction:column;gap:9px;}
.hist-strip{display:flex;gap:6px;}
.hist-day{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;}
.hist-box{width:100%;aspect-ratio:1;border-radius:9px;background:var(--surface-2);border:1px solid var(--border);position:relative;overflow:hidden;}
.hist-box.today{border-color:var(--accent);border-width:2px;}
.hist-box.viewed{box-shadow:0 0 0 2px var(--ink) inset;}
.hist-fill{position:absolute;left:0;bottom:0;width:100%;background:var(--done);}
.hist-day .dlabel{font-family:"Work Sans",sans-serif;font-size:10.5px;color:var(--muted);}

button.btn{
  font-family:"Manrope",sans-serif;font-weight:700;font-size:14.5px;
  border-radius:14px;border:1.5px solid var(--border);background:var(--surface);color:var(--ink);
  padding:13px 18px;cursor:pointer;min-height:48px;
}
button.btn.primary{
  background:var(--accent);border-color:var(--accent);color:var(--accent-ink);
  border-radius:999px;box-shadow:0 1px 2px rgba(20,23,26,.08);
}
button.btn.block{width:100%;}
button.btn.ghost{background:none;border-color:transparent;color:var(--muted);padding:8px 10px;font-size:13px;min-height:40px;}
button.btn.danger-step{color:var(--danger);}
button.btn:active{transform:scale(.98);}
button.btn:focus-visible{outline:2px solid var(--accent);outline-offset:2px;}

.products-head{display:flex;flex-direction:column;gap:10px;}

form.pform{
  background:var(--surface);border:1px solid var(--border);border-radius:22px;padding:18px;
  display:flex;flex-direction:column;gap:16px;
  box-shadow:0 1px 2px rgba(20,23,26,.04),0 10px 24px -18px rgba(20,23,26,.14);
}
form.pform .frow{display:flex;flex-direction:column;gap:7px;}
form.pform label{font-family:"Work Sans",sans-serif;font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);}
form.pform input[type="text"],form.pform textarea{
  font-family:"Work Sans",sans-serif;font-size:16px;color:var(--ink);
  background:var(--surface-2);border:1.5px solid var(--border);border-radius:10px;padding:12px 13px;
  width:100%;resize:vertical;
}
form.pform input:focus-visible,form.pform textarea:focus-visible{outline:2px solid var(--accent);outline-offset:1px;}
.seg{display:flex;gap:7px;flex-wrap:wrap;}
.seg button{
  font-family:"Manrope",sans-serif;font-size:13.5px;font-weight:700;
  border:1.5px solid var(--border);background:var(--surface-2);color:var(--muted);
  border-radius:22px;padding:9px 16px;cursor:pointer;min-height:40px;
}
.seg button.on{background:var(--ink);color:var(--surface);border-color:var(--ink);}
.seg button.add-cat{color:var(--accent);border-color:var(--accent);border-style:dashed;background:none;}
.seg.days button{padding:9px 13px;min-width:44px;}
.seg-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
.seg-row .allday{font-size:12px;padding:7px 12px;min-height:34px;color:var(--accent);border-color:var(--accent);background:none;}
.form-actions{display:flex;gap:10px;}
.form-actions .btn{flex:1;}

.group-label{display:flex;align-items:center;gap:8px;margin-top:8px;}
.group-label .dot{width:9px;height:9px;}
.plist{display:flex;flex-direction:column;gap:9px;}
.pcard{
  background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:14px 15px;
  display:flex;align-items:flex-start;justify-content:space-between;gap:10px;
  box-shadow:0 1px 2px rgba(20,23,26,.04),0 8px 18px -16px rgba(20,23,26,.14);
}
.pcard .pinfo{display:flex;flex-direction:column;gap:4px;min-width:0;}
.pcard .pname{font-size:15px;font-weight:600;}
.pcard .ptags{display:flex;gap:6px;flex-wrap:wrap;margin-top:2px;}
.tag{font-family:"Work Sans",sans-serif;font-size:10.5px;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);border:1px solid var(--border);border-radius:6px;padding:2px 7px;}
.pcard .pnotes{font-size:12.5px;color:var(--muted);}
.pcard .pactions{display:flex;flex-direction:column;gap:2px;flex-shrink:0;}

[hidden]{display:none!important;}
</style>
</head>
<body>
<div class="wrap">
  <header class="top">
    <div class="title-block">
      <div class="title-line">
        <svg class="logo-mark" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="100" height="100" rx="22" fill="#0E7A57"/>
          <path d="M50 21 C50 21 29 47 29 61.5 C29 73.4 38.4 82 50 82 C61.6 82 71 73.4 71 61.5 C71 47 50 21 50 21 Z" fill="#FFFFFF"/>
          <path d="M40.5 61 L47 67.5 L60.5 51.5" fill="none" stroke="#0E7A57" stroke-width="6.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h1>Ritueel</h1>
      </div>
      <div class="date"><span id="todayLabel">—</span> · <a href="/api/logout">uitloggen</a></div>
    </div>
    <div class="streak">
      <div class="num" id="streakNum">0</div>
      <div class="txt">dagen op rij</div>
    </div>
  </header>

  <div class="banner" id="offlineBanner" hidden>
    Kon geen verbinding maken met de opslag — je kunt wel rondkijken, wijzigingen worden niet bewaard.
  </div>

  <nav class="tabs">
    <button class="active" data-tab="vandaag">Vandaag</button>
    <button data-tab="producten">Producten</button>
    <button data-tab="instellingen">Instellingen</button>
  </nav>

  <section id="tab-vandaag">
    <div class="daynav" id="dayNav">
      <button type="button" class="navbtn" id="dayPrev" aria-label="Vorige dag">‹</button>
      <button type="button" id="dayLabel">Vandaag</button>
      <button type="button" class="navbtn" id="dayNext" aria-label="Volgende dag">›</button>
    </div>

    <div class="grid-2">
      <div class="card" id="card-ochtend">
        <div class="card-head">
          <h2>Ochtend</h2>
          <span class="count" id="count-ochtend">0/0</span>
        </div>
        <div class="rows" id="rows-ochtend"></div>
      </div>
      <div class="card" id="card-avond">
        <div class="card-head">
          <h2>Avond</h2>
          <span class="count" id="count-avond">0/0</span>
        </div>
        <div class="rows" id="rows-avond"></div>
      </div>
    </div>

    <div class="history" style="margin-top:18px;">
      <div class="label-caps">Laatste 7 dagen</div>
      <div class="hist-strip" id="histStrip"></div>
    </div>
  </section>

  <section id="tab-producten" hidden>
    <div class="products-head">
      <div class="label-caps">Jouw routine-stappen</div>
      <button class="btn primary block" id="btnNew">+ Nieuw product</button>
    </div>

    <form class="pform" id="pform" hidden style="margin-top:14px;">
      <div class="frow">
        <label for="f-name">Naam</label>
        <input type="text" id="f-name" placeholder="bv. Andrelon Oil &amp; Care shampoo" required>
      </div>
      <div class="frow">
        <label>Categorie</label>
        <div class="seg" id="seg-cat"></div>
      </div>
      <div class="frow">
        <label>Moment</label>
        <div class="seg" id="seg-time">
          <button type="button" data-val="ochtend">Ochtend</button>
          <button type="button" data-val="avond">Avond</button>
        </div>
      </div>
      <div class="frow">
        <label>Herhaling</label>
        <div class="seg" id="seg-schedtype">
          <button type="button" data-val="weekly">Vaste dagen</button>
          <button type="button" data-val="interval">Elke zoveel dagen</button>
          <button type="button" data-val="linked">Gekoppeld aan ander product</button>
        </div>
      </div>
      <div class="frow" id="schedWeekly">
        <label>Dagen</label>
        <div class="seg-row">
          <div class="seg days" id="seg-days">
            <button type="button" data-val="1">Ma</button>
            <button type="button" data-val="2">Di</button>
            <button type="button" data-val="3">Wo</button>
            <button type="button" data-val="4">Do</button>
            <button type="button" data-val="5">Vr</button>
            <button type="button" data-val="6">Za</button>
            <button type="button" data-val="0">Zo</button>
          </div>
          <button type="button" class="btn allday" id="btnAllDays">Elke dag</button>
        </div>
      </div>
      <div class="frow" id="schedInterval" hidden>
        <label for="f-every">Elke hoeveel dagen</label>
        <input type="text" inputmode="numeric" id="f-every" placeholder="bv. 2">
      </div>
      <div class="frow" id="schedLinked" hidden>
        <label>Gekoppeld aan</label>
        <div class="seg" id="seg-linked"></div>
      </div>
      <div class="frow">
        <label for="f-notes">Notitie (optioneel)</label>
        <textarea id="f-notes" rows="2" placeholder="bv. niet combineren met retinol"></textarea>
      </div>
      <div class="form-actions">
        <button type="button" class="btn" id="btnCancelForm">Annuleren</button>
        <button type="submit" class="btn primary" id="btnSaveForm">Opslaan</button>
      </div>
    </form>

    <div class="plist" id="productList" style="margin-top:16px;"></div>
  </section>

  <section id="tab-instellingen" hidden>
    <div class="card">
      <div class="card-head"><h2>Meldingen</h2></div>
      <div class="row-notes">Elke dag om 7:00 en 22:00 een melding: "Vergeet het niet".</div>
      <button class="btn primary" id="btnNotifToggle" style="margin-top:6px;">Meldingen aanzetten</button>
      <div class="row-notes" id="notifStatus"></div>
      <button class="btn" id="btnNotifTest" style="margin-top:10px;">Stuur testmelding</button>
      <div class="row-notes" id="notifTestStatus"></div>
    </div>
  </section>
</div>

<script>window.__VAPID_PUBLIC_KEY__ = ${JSON.stringify(process.env.VAPID_PUBLIC_KEY || "")};</script>
<script>
(function(){
  var DAYS = ["zo","ma","di","wo","do","vr","za"];
  var DAY_LABEL = {0:"Zo",1:"Ma",2:"Di",3:"Wo",4:"Do",5:"Vr",6:"Za"};
  var WEEK_ORDER = [1,2,3,4,5,6,0];
  var MONTHS = ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"];
  var ALL_DAYS = [0,1,2,3,4,5,6];

  function pad(n){ return n<10 ? "0"+n : ""+n; }
  function fmtId(d){ return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate()); }
  function addDays(d,n){ var r=new Date(d); r.setDate(r.getDate()+n); return r; }

  var todayDate = new Date();
  var todayId = fmtId(todayDate);
  var todayWeekday = todayDate.getDay();
  document.getElementById("todayLabel").textContent =
    DAYS[todayWeekday].charAt(0).toUpperCase()+DAYS[todayWeekday].slice(1)+" "+todayDate.getDate()+" "+MONTHS[todayDate.getMonth()];

  function addDaysId(id,n){ return fmtId(addDays(parseId(id), n)); }

  var state = {
    readOnly: true,
    steps: [],
    categories: [],
    viewedId: todayId,
    logsByDate: {}
  };

  function currentLog(){
    return state.logsByDate[state.viewedId] || { date: state.viewedId, done:{}, skipped:{}, total:0 };
  }
  function viewedWeekday(){
    return parseId(state.viewedId).getDay();
  }
  // Steps stored with the old "flex" moment (before this card existed)
  // fall back to Ochtend so they stay visible instead of disappearing.
  function momentOf(step){
    return step.moment==="avond" ? "avond" : "ochtend";
  }

  var CATEGORY_COLORS = ["#0E7A57","#64748B","#B45309","#6D28D9","#0369A1","#BE185D"];
  function categoryColor(catId){
    var idx = state.categories.findIndex(function(c){ return c.id===catId; });
    if(idx<0) idx = 0;
    return CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
  }

  function parseId(id){
    var p = id.split("-");
    return new Date(parseInt(p[0],10), parseInt(p[1],10)-1, parseInt(p[2],10));
  }
  function daysBetweenIds(id1,id2){
    return Math.round((parseId(id2)-parseId(id1))/86400000);
  }
  // Covers enough past/future days to browse around today without extra
  // fetches: /api/logs caps at 60 dates per call, this uses 45.
  function datesInWindow(){
    var out = [];
    for(var i=30;i>=-14;i--) out.push(fmtId(addDays(todayDate,-i)));
    return out;
  }

  function findLastDone(stepId){
    var best = null;
    Object.keys(state.logsByDate).forEach(function(id){
      if(id>state.viewedId) return;
      var log = state.logsByDate[id];
      if(log && log.done && log.done[stepId] && !(log.skipped && log.skipped[stepId])){
        if(!best || id>best) best = id;
      }
    });
    return best;
  }

  function findStep(id){
    return state.steps.find(function(s){ return s.id===id; });
  }

  // A step is "due" today depending on its schedule type:
  // - weekly: fixed days of the week (the original model)
  // - interval: every N days since this step was itself last logged,
  //   so an early or late check-in simply restarts the count from today
  // - linked: due whenever the step it's linked to is due (used for
  //   "conditioner OR mask, whichever goes with today's wash")
  function isStepDue(step, seen){
    var type = step.scheduleType || "weekly";
    if(type==="interval"){
      var last = findLastDone(step.id);
      if(!last) return true;
      return daysBetweenIds(last, state.viewedId) >= (step.everyDays||1);
    }
    if(type==="linked"){
      seen = seen || {};
      if(seen[step.id]) return false;
      seen[step.id] = true;
      var target = findStep(step.linkedTo);
      return target ? isStepDue(target, seen) : true;
    }
    return (step.days||[]).indexOf(viewedWeekday())!==-1;
  }

  function stepsForDay(){
    // Applicable set for the viewed day's total/streak count. Includes
    // anything already logged that day even if a fresh isStepDue() would
    // now say otherwise (checking an interval step moves its own due date,
    // so without this it would vanish from the count the instant it's ticked).
    return state.steps.filter(function(s){ return isStepDue(s) || stepLoggedOnViewed(s); });
  }

  // Among steps linked to the same target, suggest whichever was used
  // least recently (never-used siblings first) — generalizes the old
  // conditioner/masker alternation to any number of linked siblings.
  function suggestedLinkedSibling(targetId){
    var siblings = state.steps.filter(function(s){ return s.scheduleType==="linked" && s.linkedTo===targetId; });
    if(siblings.length===0) return null;
    var withDates = siblings.map(function(s){ return { id:s.id, last: findLastDone(s.id) }; });
    withDates.sort(function(a,b){
      if(!a.last && !b.last) return 0;
      if(!a.last) return -1;
      if(!b.last) return 1;
      return a.last<b.last ? -1 : (a.last>b.last ? 1 : 0);
    });
    return withDates[0].id;
  }

  function intervalHintText(step){
    var last = findLastDone(step.id);
    if(!last) return "Nog niet eerder gelogd — begin wanneer je wilt";
    var daysSince = daysBetweenIds(last, state.viewedId);
    var since = daysSince<=0 ? "Op deze dag gedaan" : daysSince===1 ? "1 dag eerder gedaan" : daysSince+" dagen eerder gedaan";
    var nextIn = Math.max(0, (step.everyDays||1) - daysSince);
    if(nextIn<=0) return since+" · aanbevolen: nu weer";
    var next = nextIn===1 ? "volgende keer over 1 dag" : "volgende keer over "+nextIn+" dagen";
    return since+" · "+next;
  }

  function isDayComplete(log){
    if(!log || !log.total) return false;
    var doneCount = 0, d = log.done||{};
    for(var k in d){ if(d[k]) doneCount++; }
    return doneCount >= log.total;
  }

  function computeStreak(){
    var streak = 0;
    var cursor = new Date(todayDate);
    if(!isDayComplete(state.logsByDate[todayId])) cursor = addDays(cursor,-1);
    while(true){
      var id = fmtId(cursor);
      if(isDayComplete(state.logsByDate[id])){ streak++; cursor = addDays(cursor,-1); } else break;
      if(streak>3650) break;
    }
    return streak;
  }
  function renderStreak(){ document.getElementById("streakNum").textContent = computeStreak(); }

  function renderHistory(){
    var strip = document.getElementById("histStrip");
    strip.innerHTML = "";
    for(var i=6;i>=0;i--){
      var d = addDays(todayDate,-i);
      var id = fmtId(d);
      var log = state.logsByDate[id];
      var pct = 0;
      if(log && log.total>0){
        var doneCount=0, dd=log.done||{};
        for(var k in dd){ if(dd[k]) doneCount++; }
        pct = Math.round((doneCount/log.total)*100);
      }
      var day = document.createElement("div");
      day.className = "hist-day";
      var box = document.createElement("div");
      box.className = "hist-box"+(id===todayId?" today":"")+(id===state.viewedId?" viewed":"");
      box.style.cursor = "pointer";
      box.addEventListener("click", (function(forId){ return function(){ goToDate(forId); }; })(id));
      var fill = document.createElement("div");
      fill.className = "hist-fill";
      fill.style.height = pct+"%";
      box.appendChild(fill);
      var lbl = document.createElement("div");
      lbl.className = "dlabel";
      lbl.textContent = DAYS[d.getDay()];
      day.appendChild(box);
      day.appendChild(lbl);
      strip.appendChild(day);
    }
  }

  function catLabel(c){
    var found = state.categories.find(function(x){ return x.id===c; });
    return found ? found.name : c;
  }
  function daysLabel(days){
    if(!days || days.length===0) return "Nooit";
    if(days.length===7) return "Elke dag";
    var sorted = WEEK_ORDER.filter(function(w){ return days.indexOf(w)!==-1; });
    return sorted.map(function(w){ return DAY_LABEL[w]; }).join(" ");
  }
  function scheduleLabel(s){
    var type = s.scheduleType || "weekly";
    if(type==="interval") return (s.everyDays||1)===1 ? "Elke dag" : "Elke "+s.everyDays+" dagen";
    if(type==="linked"){
      var t = findStep(s.linkedTo);
      return "Gekoppeld aan "+(t?t.name:"?");
    }
    return daysLabel(s.days);
  }

  function buildRowBody(step, isSkipped){
    var body = document.createElement("div");
    body.className = "row-body";
    var nameLine = document.createElement("div");
    nameLine.className = "row-name-line";
    var dot = document.createElement("span");
    dot.className = "dot";
    dot.style.background = categoryColor(step.category);
    var name = document.createElement("span");
    name.className = "row-name";
    name.textContent = step.name;
    nameLine.appendChild(dot);
    nameLine.appendChild(name);
    if(!isSkipped && step.scheduleType==="linked" && suggestedLinkedSibling(step.linkedTo)===step.id){
      var tag = document.createElement("span");
      tag.className = "suggest-tag";
      tag.textContent = "Voorgesteld";
      nameLine.appendChild(tag);
    }
    body.appendChild(nameLine);
    var noteText = isSkipped ? "Overgeslagen" : (step.notes||"");
    if(!isSkipped && step.scheduleType==="interval"){
      var hint = intervalHintText(step);
      noteText = noteText ? noteText+" · "+hint : hint;
    }
    if(noteText){
      var notes = document.createElement("div");
      notes.className = "row-notes";
      notes.textContent = noteText;
      body.appendChild(notes);
    }
    return body;
  }

  function stepLoggedOnViewed(step){
    var log = currentLog();
    return !!log.done[step.id] || !!(log.skipped && log.skipped[step.id]);
  }

  function buildRow(step){
    var log = currentLog();
    var skipped = !!(log.skipped && log.skipped[step.id]);
    var checked = !!log.done[step.id];
    var wrap = document.createElement("div");
    wrap.className = "row-wrap"+(skipped?" skipped":"");

    if(skipped){
      var main = document.createElement("div");
      main.className = "row-main";
      var dash = document.createElement("span");
      dash.className = "skip-dash";
      dash.textContent = "–";
      main.appendChild(dash);
      main.appendChild(buildRowBody(step, true));
      wrap.appendChild(main);
    } else {
      var label = document.createElement("label");
      label.className = "row-main"+(checked?" done":"");
      var input = document.createElement("input");
      input.type = "checkbox";
      input.checked = checked;
      input.disabled = state.readOnly;
      input.addEventListener("change", function(){ toggleDone(step.id); });
      var chk = document.createElement("span");
      chk.className = "chk";
      label.appendChild(input);
      label.appendChild(chk);
      label.appendChild(buildRowBody(step, false));
      wrap.appendChild(label);
    }

    var showNowBtn = state.viewedId>todayId && !checked && !skipped;
    var actions = showNowBtn ? document.createElement("div") : wrap;
    if(showNowBtn) actions.className = "row-actions";

    if(showNowBtn){
      var nowBtn = document.createElement("button");
      nowBtn.type = "button";
      nowBtn.className = "skip-btn";
      nowBtn.textContent = "Nu al gedaan";
      nowBtn.disabled = state.readOnly;
      nowBtn.addEventListener("click", function(){ logForToday(step.id); });
      actions.appendChild(nowBtn);
    }

    var skipBtn = document.createElement("button");
    skipBtn.type = "button";
    skipBtn.className = "skip-btn"+(skipped?" active":"");
    skipBtn.textContent = skipped ? "Herstel" : "Sla over";
    skipBtn.disabled = state.readOnly || checked;
    skipBtn.addEventListener("click", function(){ toggleSkip(step.id); });
    actions.appendChild(skipBtn);
    if(showNowBtn) wrap.appendChild(actions);
    return wrap;
  }

  function renderRoutine(moment, mountId, countId){
    var mount = document.getElementById(mountId);
    mount.innerHTML = "";
    var log = currentLog();

    var momentSteps = state.steps.filter(function(s){ return momentOf(s)===moment; });
    var dueItems = momentSteps.filter(function(s){ return isStepDue(s) || stepLoggedOnViewed(s); });
    var notDueFlexible = momentSteps.filter(function(s){
      return !isStepDue(s) && !stepLoggedOnViewed(s) && (s.scheduleType==="interval" || s.scheduleType==="linked");
    });

    var doneN = 0, totalN = 0;
    dueItems.forEach(function(it){
      if(log.skipped && log.skipped[it.id]) return;
      totalN++;
      if(log.done[it.id]) doneN++;
    });
    document.getElementById(countId).textContent = doneN+"/"+totalN;

    if(dueItems.length===0 && notDueFlexible.length===0){
      var empty = document.createElement("div");
      empty.className = "empty-row";
      empty.textContent = "Niets gepland.";
      mount.appendChild(empty);
      return;
    }

    dueItems.forEach(function(step){ mount.appendChild(buildRow(step)); });

    if(notDueFlexible.length>0){
      var label = notDueFlexible.length===1 ? "stap" : "stappen";
      var closedText = "+ "+notDueFlexible.length+" "+label+" nog niet aan de beurt — toon";
      var more = document.createElement("button");
      more.type = "button";
      more.className = "skip-btn";
      more.style.cssText = "width:100%;text-align:left;padding:10px 8px;";
      more.textContent = closedText;
      var extraWrap = document.createElement("div");
      extraWrap.hidden = true;
      notDueFlexible.forEach(function(step){ extraWrap.appendChild(buildRow(step)); });
      more.addEventListener("click", function(){
        extraWrap.hidden = !extraWrap.hidden;
        more.textContent = extraWrap.hidden ? closedText : "Verbergen";
      });
      mount.appendChild(more);
      mount.appendChild(extraWrap);
    }
  }

  function highlightActiveTime(){
    var isToday = state.viewedId===todayId;
    var hour = new Date().getHours();
    var activeIsEvening = hour>=15;
    document.getElementById("card-ochtend").classList.toggle("active-time", isToday && !activeIsEvening);
    document.getElementById("card-avond").classList.toggle("active-time", isToday && activeIsEvening);
  }

  function updateDayNav(){
    var diff = daysBetweenIds(todayId, state.viewedId);
    var label = document.getElementById("dayLabel");
    if(diff===0) label.textContent = "Vandaag";
    else if(diff===1) label.textContent = "Morgen";
    else if(diff===-1) label.textContent = "Gisteren";
    else {
      var d = parseId(state.viewedId);
      label.textContent = DAYS[d.getDay()].charAt(0).toUpperCase()+DAYS[d.getDay()].slice(1)+" "+d.getDate()+" "+MONTHS[d.getMonth()];
    }
    label.classList.toggle("is-today", diff===0);
    document.getElementById("dayPrev").disabled = state.logsByDate[addDaysId(state.viewedId,-1)]===undefined;
    document.getElementById("dayNext").disabled = state.logsByDate[addDaysId(state.viewedId,1)]===undefined;
  }
  function goToDate(id){
    if(state.logsByDate[id]===undefined) return;
    state.viewedId = id;
    renderAll();
  }
  document.getElementById("dayPrev").addEventListener("click", function(){ goToDate(addDaysId(state.viewedId,-1)); });
  document.getElementById("dayNext").addEventListener("click", function(){ goToDate(addDaysId(state.viewedId,1)); });
  document.getElementById("dayLabel").addEventListener("click", function(){ goToDate(todayId); });

  function renderProducts(){
    var mount = document.getElementById("productList");
    mount.innerHTML = "";
    var cats = state.categories.map(function(c){ return c.id; });
    cats.forEach(function(cat){
      var items = state.steps.filter(function(s){ return s.category===cat; });
      if(items.length===0) return;
      var glabel = document.createElement("div");
      glabel.className = "group-label";
      var gdot = document.createElement("span");
      gdot.className = "dot";
      gdot.style.background = categoryColor(cat);
      var gtext = document.createElement("span");
      gtext.className = "label-caps";
      gtext.textContent = catLabel(cat);
      glabel.appendChild(gdot);
      glabel.appendChild(gtext);
      mount.appendChild(glabel);

      items.forEach(function(s){
        var card = document.createElement("div");
        card.className = "pcard";
        var info = document.createElement("div");
        info.className = "pinfo";
        var name = document.createElement("div");
        name.className = "pname";
        name.textContent = s.name;
        var tags = document.createElement("div");
        tags.className = "ptags";
        var t1 = document.createElement("span");
        t1.className = "tag";
        t1.textContent = momentOf(s)==="ochtend"?"Ochtend":"Avond";
        var t2 = document.createElement("span");
        t2.className = "tag";
        t2.textContent = scheduleLabel(s);
        tags.appendChild(t1);
        tags.appendChild(t2);
        info.appendChild(name);
        info.appendChild(tags);
        if(s.notes){
          var notes = document.createElement("div");
          notes.className = "pnotes";
          notes.textContent = s.notes;
          info.appendChild(notes);
        }
        var actions = document.createElement("div");
        actions.className = "pactions";
        var editBtn = document.createElement("button");
        editBtn.className = "btn ghost";
        editBtn.textContent = "Bewerk";
        editBtn.disabled = state.readOnly;
        editBtn.addEventListener("click", function(){ openForm(s); });
        var delBtn = document.createElement("button");
        delBtn.className = "btn ghost danger-step";
        delBtn.textContent = "Verwijder";
        delBtn.disabled = state.readOnly;
        var confirming = false;
        delBtn.addEventListener("click", function(){
          if(!confirming){
            confirming = true;
            delBtn.textContent = "Zeker weten?";
            setTimeout(function(){ confirming=false; delBtn.textContent="Verwijder"; }, 4000);
          } else {
            deleteStepApi(s.id);
          }
        });
        actions.appendChild(editBtn);
        actions.appendChild(delBtn);
        card.appendChild(info);
        card.appendChild(actions);
        mount.appendChild(card);
      });
    });
    if(state.steps.length===0){
      var empty = document.createElement("div");
      empty.className = "empty-row";
      empty.textContent = "Nog geen producten toegevoegd.";
      mount.appendChild(empty);
    }
  }

  function renderAll(){
    renderRoutine("ochtend","rows-ochtend","count-ochtend");
    renderRoutine("avond","rows-avond","count-avond");
    renderHistory();
    renderStreak();
    renderProducts();
    highlightActiveTime();
    updateDayNav();
  }

  var TAB_IDS = ["vandaag","producten","instellingen"];
  document.querySelectorAll("nav.tabs button").forEach(function(btn){
    btn.addEventListener("click", function(){
      document.querySelectorAll("nav.tabs button").forEach(function(b){ b.classList.remove("active"); });
      btn.classList.add("active");
      TAB_IDS.forEach(function(id){
        document.getElementById("tab-"+id).hidden = btn.dataset.tab!==id;
      });
    });
  });

  var pform = document.getElementById("pform");
  var editingId = null;
  var formCat = "huid", formTime = "ochtend", formDays = [];
  var formScheduleType = "weekly", formLinkedTo = null;

  function setSeg(container, value){
    container.querySelectorAll("button").forEach(function(b){ b.classList.toggle("on", b.dataset.val===value); });
  }
  function setDaySeg(){
    document.getElementById("seg-days").querySelectorAll("button").forEach(function(b){
      b.classList.toggle("on", formDays.indexOf(parseInt(b.dataset.val,10))!==-1);
    });
  }
  function renderCategorySeg(){
    var container = document.getElementById("seg-cat");
    container.innerHTML = "";
    state.categories.forEach(function(c){
      var b = document.createElement("button");
      b.type = "button";
      b.dataset.val = c.id;
      b.textContent = c.name;
      b.className = formCat===c.id ? "on" : "";
      b.addEventListener("click", function(){ formCat=c.id; renderCategorySeg(); });
      container.appendChild(b);
    });
    var addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "add-cat";
    addBtn.textContent = "+ Nieuw";
    addBtn.addEventListener("click", function(){
      var name = window.prompt("Naam van de nieuwe categorie:");
      if(name && name.trim()){ createCategoryApi(name.trim()); }
    });
    container.appendChild(addBtn);
  }
  function createCategoryApi(name){
    api("/api/categories", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({name:name}) })
      .then(function(cat){
        if(!state.categories.some(function(c){ return c.id===cat.id; })) state.categories.push(cat);
        formCat = cat.id;
        renderCategorySeg();
      })
      .catch(function(){ alert("Kon categorie niet toevoegen."); });
  }
  document.getElementById("seg-time").querySelectorAll("button").forEach(function(b){
    b.addEventListener("click", function(){ formTime=b.dataset.val; setSeg(document.getElementById("seg-time"),formTime); });
  });
  document.getElementById("seg-days").querySelectorAll("button").forEach(function(b){
    b.addEventListener("click", function(){
      var v = parseInt(b.dataset.val,10);
      var idx = formDays.indexOf(v);
      if(idx===-1) formDays.push(v); else formDays.splice(idx,1);
      setDaySeg();
    });
  });
  document.getElementById("btnAllDays").addEventListener("click", function(){
    formDays = ALL_DAYS.slice();
    setDaySeg();
  });

  function setScheduleVisibility(){
    document.getElementById("schedWeekly").hidden = formScheduleType!=="weekly";
    document.getElementById("schedInterval").hidden = formScheduleType!=="interval";
    document.getElementById("schedLinked").hidden = formScheduleType!=="linked";
    setSeg(document.getElementById("seg-schedtype"), formScheduleType);
  }
  document.getElementById("seg-schedtype").querySelectorAll("button").forEach(function(b){
    b.addEventListener("click", function(){
      formScheduleType = b.dataset.val;
      if(formScheduleType==="linked") renderLinkedSeg();
      setScheduleVisibility();
    });
  });
  function renderLinkedSeg(){
    var container = document.getElementById("seg-linked");
    container.innerHTML = "";
    var options = state.steps.filter(function(s){ return s.id!==editingId; });
    if(options.length===0){
      var empty = document.createElement("div");
      empty.className = "row-notes";
      empty.textContent = "Nog geen ander product om aan te koppelen.";
      container.appendChild(empty);
      return;
    }
    if(!formLinkedTo || !options.some(function(s){ return s.id===formLinkedTo; })){
      formLinkedTo = options[0].id;
    }
    options.forEach(function(s){
      var b = document.createElement("button");
      b.type = "button";
      b.dataset.val = s.id;
      b.textContent = s.name;
      b.className = formLinkedTo===s.id ? "on" : "";
      b.addEventListener("click", function(){ formLinkedTo=s.id; renderLinkedSeg(); });
      container.appendChild(b);
    });
  }

  function openForm(step){
    editingId = step ? step.id : null;
    document.getElementById("f-name").value = step ? step.name : "";
    document.getElementById("f-notes").value = step ? (step.notes||"") : "";
    formCat = step ? step.category : (state.categories[0] ? state.categories[0].id : "huid");
    formTime = step ? momentOf(step) : "ochtend";
    formScheduleType = step ? (step.scheduleType || "weekly") : "weekly";
    formDays = step && step.days ? step.days.slice() : [1,2,3,4,5,6,0];
    document.getElementById("f-every").value = step && step.everyDays ? step.everyDays : "2";
    formLinkedTo = step ? (step.linkedTo || null) : null;
    renderCategorySeg();
    setSeg(document.getElementById("seg-time"), formTime);
    setDaySeg();
    setScheduleVisibility();
    if(formScheduleType==="linked") renderLinkedSeg();
    document.getElementById("btnSaveForm").textContent = step ? "Wijzigingen opslaan" : "Opslaan";
    pform.hidden = false;
    document.getElementById("f-name").focus();
  }
  function closeForm(){ pform.hidden = true; editingId = null; pform.reset(); }
  document.getElementById("btnNew").addEventListener("click", function(){ openForm(null); });
  document.getElementById("btnCancelForm").addEventListener("click", closeForm);

  pform.addEventListener("submit", function(e){
    e.preventDefault();
    if(state.readOnly) return;
    var name = document.getElementById("f-name").value.trim();
    if(!name) return;
    var data = {
      name: name, category: formCat, moment: formTime,
      scheduleType: formScheduleType,
      notes: document.getElementById("f-notes").value.trim()
    };
    if(formScheduleType==="weekly"){
      if(formDays.length===0) return;
      data.days = formDays.slice();
    } else if(formScheduleType==="interval"){
      var n = parseInt(document.getElementById("f-every").value, 10);
      data.everyDays = (n && n>0) ? n : 1;
      data.days = ALL_DAYS.slice();
    } else if(formScheduleType==="linked"){
      if(!formLinkedTo) return;
      data.linkedTo = formLinkedTo;
      data.days = ALL_DAYS.slice();
    }
    if(editingId){ updateStepApi(editingId, data); } else { createStepApi(data); }
    closeForm();
  });

  function api(path, opts){
    return fetch(path, opts).then(function(res){
      if(!res.ok) throw new Error("request failed");
      return res.status===204 ? null : res.json();
    });
  }

  function saveLogForDate(id, done, skipped){
    // stepsForDay() reads state.viewedId, so borrow it briefly to compute
    // the right total for the target date even when that is not the day
    // on screen (used by "Nu al gedaan" while browsing a future day).
    var savedViewedId = state.viewedId;
    state.viewedId = id;
    var applicable = stepsForDay();
    state.viewedId = savedViewedId;
    var skippedApplicable = applicable.filter(function(s){ return !!skipped[s.id]; }).length;
    var total = applicable.length - skippedApplicable;
    var body = { done: done, skipped: skipped, total: total };
    state.logsByDate[id] = Object.assign({date:id}, body);
    renderAll();
    api("/api/logs/"+id, { method:"PUT", headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) })
      .catch(function(){});
  }
  function saveViewedLog(done, skipped){
    saveLogForDate(state.viewedId, done, skipped);
  }
  function logForToday(key){
    if(state.readOnly) return;
    var log = state.logsByDate[todayId] || {date:todayId, done:{}, skipped:{}, total:0};
    var newDone = Object.assign({}, log.done);
    newDone[key] = true;
    var step = findStep(key);
    if(step && step.scheduleType==="linked"){
      state.steps.filter(function(s){ return s.scheduleType==="linked" && s.linkedTo===step.linkedTo && s.id!==key; })
        .forEach(function(sib){ newDone[sib.id] = false; });
    }
    saveLogForDate(todayId, newDone, log.skipped||{});
  }
  function toggleDone(key){
    if(state.readOnly) return;
    var log = currentLog();
    if(log.skipped && log.skipped[key]) return;
    var newDone = Object.assign({}, log.done);
    newDone[key] = !newDone[key];
    if(newDone[key]){
      var step = findStep(key);
      if(step && step.scheduleType==="linked"){
        state.steps.filter(function(s){ return s.scheduleType==="linked" && s.linkedTo===step.linkedTo && s.id!==key; })
          .forEach(function(sib){ newDone[sib.id] = false; });
      }
    }
    saveViewedLog(newDone, log.skipped||{});
  }
  function toggleSkip(key){
    if(state.readOnly) return;
    var log = currentLog();
    var newSkipped = Object.assign({}, log.skipped||{});
    var newDone = Object.assign({}, log.done);
    newSkipped[key] = !newSkipped[key];
    if(newSkipped[key]) newDone[key] = false;
    saveViewedLog(newDone, newSkipped);
  }

  function createStepApi(data){
    api("/api/steps", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(data) })
      .then(function(step){ state.steps.push(step); renderAll(); })
      .catch(function(){});
  }
  function updateStepApi(id, data){
    api("/api/steps/"+id, { method:"PATCH", headers:{"Content-Type":"application/json"}, body: JSON.stringify(data) })
      .then(function(step){
        var idx = state.steps.findIndex(function(s){ return s.id===id; });
        if(idx!==-1) state.steps[idx] = step;
        renderAll();
      })
      .catch(function(){});
  }
  function deleteStepApi(id){
    api("/api/steps/"+id, { method:"DELETE" })
      .then(function(){ state.steps = state.steps.filter(function(s){ return s.id!==id; }); renderAll(); })
      .catch(function(){});
  }

  function loadAll(){
    var dates = datesInWindow();
    Promise.all([
      api("/api/steps"),
      api("/api/logs?dates="+dates.join(",")),
      api("/api/categories")
    ]).then(function(results){
      state.steps = results[0];
      var logsMap = results[1];
      state.categories = results[2];
      state.logsByDate = {};
      dates.forEach(function(d){
        state.logsByDate[d] = logsMap[d]
          ? Object.assign({date:d, done:{}, skipped:{}}, logsMap[d])
          : {date:d, done:{}, skipped:{}, total:0};
      });
      state.readOnly = false;
      document.getElementById("offlineBanner").hidden = true;
      renderAll();
    }).catch(function(){
      state.readOnly = true;
      document.getElementById("offlineBanner").hidden = false;
      renderAll();
    });
  }

  window.addEventListener("focus", loadAll);

  function urlBase64ToUint8Array(base64String){
    var padding = "=".repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    var raw = window.atob(base64);
    var out = new Uint8Array(raw.length);
    for(var i=0;i<raw.length;i++) out[i] = raw.charCodeAt(i);
    return out;
  }
  function pushSupported(){ return "serviceWorker" in navigator && "PushManager" in window; }
  function getExistingSubscription(){
    if(!pushSupported()) return Promise.resolve(null);
    return navigator.serviceWorker.getRegistration().then(function(reg){
      return reg ? reg.pushManager.getSubscription() : null;
    });
  }
  function refreshNotifUI(){
    var btn = document.getElementById("btnNotifToggle");
    var status = document.getElementById("notifStatus");
    if(!pushSupported()){
      btn.disabled = true;
      btn.textContent = "Niet ondersteund op dit toestel";
      status.textContent = "Voeg de app eerst toe aan je beginscherm (iOS) of gebruik een moderne browser.";
      return;
    }
    getExistingSubscription().then(function(sub){
      if(sub){
        btn.textContent = "Meldingen uitzetten";
        btn.classList.remove("primary");
        status.textContent = "Meldingen staan aan op dit toestel.";
      } else {
        btn.textContent = "Meldingen aanzetten";
        btn.classList.add("primary");
        status.textContent = "";
      }
    });
  }
  function enableNotifications(){
    navigator.serviceWorker.register("/sw.js").then(function(reg){
      return Notification.requestPermission().then(function(perm){
        if(perm!=="granted"){ alert("Zonder toestemming kan ik geen meldingen sturen."); return; }
        var key = window.__VAPID_PUBLIC_KEY__;
        if(!key){ alert("Meldingen zijn nog niet ingesteld (VAPID-sleutels ontbreken)."); return; }
        return reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(key)
        }).then(function(sub){
          return api("/api/push/subscribe", {
            method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(sub)
          });
        });
      });
    }).then(refreshNotifUI).catch(function(err){
      alert("Kon meldingen niet aanzetten: "+err.message);
      refreshNotifUI();
    });
  }
  function disableNotifications(){
    getExistingSubscription().then(function(sub){
      if(!sub) return;
      var endpoint = sub.endpoint;
      return sub.unsubscribe().then(function(){
        return api("/api/push/unsubscribe", {
          method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({endpoint:endpoint})
        }).catch(function(){});
      });
    }).then(refreshNotifUI);
  }
  document.getElementById("btnNotifToggle").addEventListener("click", function(){
    getExistingSubscription().then(function(sub){
      if(sub) disableNotifications(); else enableNotifications();
    });
  });
  document.getElementById("btnNotifTest").addEventListener("click", function(){
    var status = document.getElementById("notifTestStatus");
    status.textContent = "Versturen...";
    api("/api/push/test", { method:"POST" })
      .then(function(res){
        status.textContent = res.total>0
          ? "Verstuurd naar "+res.sent+" van "+res.total+" aangemelde toestel(len)."
          : "Nog geen toestel aangemeld — zet meldingen eerst aan.";
      })
      .catch(function(){ status.textContent = "Versturen mislukt."; });
  });
  refreshNotifUI();

  renderAll();
  loadAll();
})();
</script>
</body>
</html>`;

export async function GET() {
  return new Response(HTML, {
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}
