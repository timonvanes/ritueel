const HTML = `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Huid & Haar Ritueel</title>
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
  padding:0 16px; padding-block:20px 56px;
}
.wrap{max-width:760px;margin:0 auto;display:flex;flex-direction:column;gap:22px;}

h1,h2,h3{font-family:"Manrope",system-ui,sans-serif;font-weight:800;margin:0;text-wrap:balance;}
.label-caps{font-family:"Work Sans",sans-serif;font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);}

header.top{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding-block:4px;}
header.top .title-block h1{font-size:25px;line-height:1.15;}
header.top .title-block .date{margin-top:5px;color:var(--muted);font-size:13.5px;}
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
.dot.huid{background:var(--skin);}
.dot.haar{background:var(--hair);}
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
.empty-row{font-size:13.5px;color:var(--muted);padding:10px 8px;}

.history{display:flex;flex-direction:column;gap:9px;}
.hist-strip{display:flex;gap:6px;}
.hist-day{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;}
.hist-box{width:100%;aspect-ratio:1;border-radius:9px;background:var(--surface-2);border:1px solid var(--border);position:relative;overflow:hidden;}
.hist-box.today{border-color:var(--accent);border-width:2px;}
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
      <h1>Huid &amp; Haar Ritueel</h1>
      <div class="date" id="todayLabel">—</div>
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
  </nav>

  <section id="tab-vandaag">
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
        <div class="seg" id="seg-cat">
          <button type="button" data-val="huid">Huid</button>
          <button type="button" data-val="haar">Haar</button>
        </div>
      </div>
      <div class="frow">
        <label>Moment</label>
        <div class="seg" id="seg-time">
          <button type="button" data-val="ochtend">Ochtend</button>
          <button type="button" data-val="avond">Avond</button>
        </div>
      </div>
      <div class="frow">
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
</div>

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

  var state = {
    readOnly: true,
    steps: [],
    todayLog: { date: todayId, done: {}, skipped: {}, total: 0 },
    logsByDate: {}
  };

  function stepsForDay(weekday){
    return state.steps.filter(function(s){ return (s.days||[]).indexOf(weekday)!==-1; });
  }
  function parseId(id){
    var p = id.split("-");
    return new Date(parseInt(p[0],10), parseInt(p[1],10)-1, parseInt(p[2],10));
  }
  function daysBetweenIds(id1,id2){
    return Math.round((parseId(id2)-parseId(id1))/86400000);
  }
  function last21Dates(){
    var out = [];
    for(var i=0;i<21;i++) out.push(fmtId(addDays(todayDate,-i)));
    return out;
  }

  var WASH_INTERVAL_DAYS = 2;

  function computeWashSuggestion(){
    var bestDate = null, bestVariant = null;
    Object.keys(state.logsByDate).forEach(function(id){
      if(id>todayId) return;
      var log = state.logsByDate[id];
      if(!log || !log.done || !log.done.shampoo) return;
      if(log.skipped && log.skipped.shampoo) return;
      if(!bestDate || id>bestDate){
        bestDate = id;
        if(log.done.conditioner) bestVariant = "conditioner";
        else if(log.done.keratinemasker) bestVariant = "masker";
        else bestVariant = null;
      }
    });
    var daysSince = bestDate===null ? null : daysBetweenIds(bestDate, todayId);
    var nextInDays = daysSince===null ? 0 : Math.max(0, WASH_INTERVAL_DAYS - daysSince);
    return {
      daysSince: daysSince,
      nextInDays: nextInDays,
      variant: bestVariant==="conditioner" ? "masker" : "conditioner"
    };
  }
  function washHintText(s){
    if(!s || s.daysSince===null) return "Nog geen wasbeurt gelogd — begin wanneer je wilt";
    if(s.daysSince<=0) return "Vandaag al gewassen";
    var since = s.daysSince===1 ? "Gisteren gewassen" : s.daysSince+" dagen geleden gewassen";
    if(s.nextInDays<=0) return since+" · aanbevolen: was gerust vandaag";
    var next = s.nextInDays===1 ? "volgende wasbeurt over 1 dag" : "volgende wasbeurt over "+s.nextInDays+" dagen";
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
      box.className = "hist-box"+(id===todayId?" today":"");
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

  function catLabel(c){ return c==="huid" ? "Huid" : "Haar"; }
  function daysLabel(days){
    if(!days || days.length===0) return "Nooit";
    if(days.length===7) return "Elke dag";
    var sorted = WEEK_ORDER.filter(function(w){ return days.indexOf(w)!==-1; });
    return sorted.map(function(w){ return DAY_LABEL[w]; }).join(" ");
  }

  function buildRowBody(step, isSkipped, suggestion){
    var body = document.createElement("div");
    body.className = "row-body";
    var nameLine = document.createElement("div");
    nameLine.className = "row-name-line";
    var dot = document.createElement("span");
    dot.className = "dot "+step.category;
    var name = document.createElement("span");
    name.className = "row-name";
    name.textContent = step.name;
    nameLine.appendChild(dot);
    nameLine.appendChild(name);
    if(!isSkipped && suggestion && (step.id==="conditioner" || step.id==="keratinemasker")){
      var wants = step.id==="conditioner" ? "conditioner" : "masker";
      if(suggestion.variant===wants){
        var tag = document.createElement("span");
        tag.className = "suggest-tag";
        tag.textContent = "Voorgesteld";
        nameLine.appendChild(tag);
      }
    }
    body.appendChild(nameLine);
    var noteText = isSkipped ? "Overgeslagen vandaag" : (step.notes||"");
    if(!isSkipped && step.id==="shampoo"){
      var hint = washHintText(suggestion);
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

  function renderRoutine(moment, mountId, countId){
    var mount = document.getElementById(mountId);
    mount.innerHTML = "";
    var items = state.steps.filter(function(s){ return s.moment===moment && (s.days||[]).indexOf(todayWeekday)!==-1; });

    var doneN = 0, totalN = 0;
    items.forEach(function(it){
      if(state.todayLog.skipped && state.todayLog.skipped[it.id]) return;
      totalN++;
      if(state.todayLog.done[it.id]) doneN++;
    });
    document.getElementById(countId).textContent = doneN+"/"+totalN;

    if(items.length===0){
      var empty = document.createElement("div");
      empty.className = "empty-row";
      empty.textContent = "Niets gepland vandaag.";
      mount.appendChild(empty);
      return;
    }

    var suggestion = computeWashSuggestion();

    items.forEach(function(step){
      var skipped = !!(state.todayLog.skipped && state.todayLog.skipped[step.id]);
      var checked = !!state.todayLog.done[step.id];
      var wrap = document.createElement("div");
      wrap.className = "row-wrap"+(skipped?" skipped":"");

      if(skipped){
        var main = document.createElement("div");
        main.className = "row-main";
        var dash = document.createElement("span");
        dash.className = "skip-dash";
        dash.textContent = "–";
        main.appendChild(dash);
        main.appendChild(buildRowBody(step, true, suggestion));
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
        label.appendChild(buildRowBody(step, false, suggestion));
        wrap.appendChild(label);
      }

      var skipBtn = document.createElement("button");
      skipBtn.type = "button";
      skipBtn.className = "skip-btn"+(skipped?" active":"");
      skipBtn.textContent = skipped ? "Herstel" : "Sla over";
      skipBtn.disabled = state.readOnly || checked;
      skipBtn.addEventListener("click", function(){ toggleSkip(step.id); });
      wrap.appendChild(skipBtn);

      mount.appendChild(wrap);
    });
  }

  function highlightActiveTime(){
    var hour = new Date().getHours();
    var activeIsEvening = hour>=15;
    document.getElementById("card-ochtend").classList.toggle("active-time", !activeIsEvening);
    document.getElementById("card-avond").classList.toggle("active-time", activeIsEvening);
  }

  function renderProducts(){
    var mount = document.getElementById("productList");
    mount.innerHTML = "";
    var cats = ["huid","haar"];
    cats.forEach(function(cat){
      var items = state.steps.filter(function(s){ return s.category===cat; });
      if(items.length===0) return;
      var glabel = document.createElement("div");
      glabel.className = "group-label";
      var gdot = document.createElement("span");
      gdot.className = "dot "+cat;
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
        t1.textContent = s.moment==="ochtend"?"Ochtend":"Avond";
        var t2 = document.createElement("span");
        t2.className = "tag";
        t2.textContent = daysLabel(s.days);
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
  }

  document.querySelectorAll("nav.tabs button").forEach(function(btn){
    btn.addEventListener("click", function(){
      document.querySelectorAll("nav.tabs button").forEach(function(b){ b.classList.remove("active"); });
      btn.classList.add("active");
      document.getElementById("tab-vandaag").hidden = btn.dataset.tab!=="vandaag";
      document.getElementById("tab-producten").hidden = btn.dataset.tab!=="producten";
    });
  });

  var pform = document.getElementById("pform");
  var editingId = null;
  var formCat = "huid", formTime = "ochtend", formDays = [];

  function setSeg(container, value){
    container.querySelectorAll("button").forEach(function(b){ b.classList.toggle("on", b.dataset.val===value); });
  }
  function setDaySeg(){
    document.getElementById("seg-days").querySelectorAll("button").forEach(function(b){
      b.classList.toggle("on", formDays.indexOf(parseInt(b.dataset.val,10))!==-1);
    });
  }
  document.getElementById("seg-cat").querySelectorAll("button").forEach(function(b){
    b.addEventListener("click", function(){ formCat=b.dataset.val; setSeg(document.getElementById("seg-cat"),formCat); });
  });
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

  function openForm(step){
    editingId = step ? step.id : null;
    document.getElementById("f-name").value = step ? step.name : "";
    document.getElementById("f-notes").value = step ? (step.notes||"") : "";
    formCat = step ? step.category : "huid";
    formTime = step ? step.moment : "ochtend";
    formDays = step ? (step.days||[]).slice() : [1,2,3,4,5,6,0];
    setSeg(document.getElementById("seg-cat"), formCat);
    setSeg(document.getElementById("seg-time"), formTime);
    setDaySeg();
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
    if(!name || formDays.length===0) return;
    var data = {
      name: name, category: formCat, moment: formTime,
      days: formDays.slice(),
      notes: document.getElementById("f-notes").value.trim()
    };
    if(editingId){ updateStepApi(editingId, data); } else { createStepApi(data); }
    closeForm();
  });

  function api(path, opts){
    return fetch(path, opts).then(function(res){
      if(!res.ok) throw new Error("request failed");
      return res.status===204 ? null : res.json();
    });
  }

  var WASH_VARIANT_PAIR = { conditioner: "keratinemasker", keratinemasker: "conditioner" };

  function saveTodayLog(done, skipped){
    var applicable = stepsForDay(todayWeekday);
    var skippedApplicable = applicable.filter(function(s){ return !!skipped[s.id]; }).length;
    var total = applicable.length - skippedApplicable;
    var body = { done: done, skipped: skipped, total: total };
    state.todayLog = Object.assign({date:todayId}, body);
    state.logsByDate[todayId] = state.todayLog;
    renderAll();
    api("/api/logs/"+todayId, { method:"PUT", headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) })
      .catch(function(){});
  }
  function toggleDone(key){
    if(state.readOnly) return;
    if(state.todayLog.skipped && state.todayLog.skipped[key]) return;
    var newDone = Object.assign({}, state.todayLog.done);
    newDone[key] = !newDone[key];
    if(newDone[key] && WASH_VARIANT_PAIR[key]){
      newDone[WASH_VARIANT_PAIR[key]] = false;
    }
    saveTodayLog(newDone, state.todayLog.skipped||{});
  }
  function toggleSkip(key){
    if(state.readOnly) return;
    var newSkipped = Object.assign({}, state.todayLog.skipped||{});
    var newDone = Object.assign({}, state.todayLog.done);
    newSkipped[key] = !newSkipped[key];
    if(newSkipped[key]) newDone[key] = false;
    saveTodayLog(newDone, newSkipped);
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
    var dates = last21Dates();
    Promise.all([
      api("/api/steps"),
      api("/api/logs?dates="+dates.join(","))
    ]).then(function(results){
      state.steps = results[0];
      var logsMap = results[1];
      state.logsByDate = {};
      dates.forEach(function(d){
        state.logsByDate[d] = logsMap[d]
          ? Object.assign({date:d, done:{}, skipped:{}}, logsMap[d])
          : {date:d, done:{}, skipped:{}, total:0};
      });
      state.todayLog = state.logsByDate[todayId];
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
