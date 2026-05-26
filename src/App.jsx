import { useState, useEffect, useRef } from "react";

// ── CSS ──
const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;700;900&family=DM+Serif+Display:ital@0;1&display=swap');
:root {
  --bg:#0E0E12;--surface:#16161C;--card:#1C1C24;--card2:#22222C;
  --border:#2E2E3E;--accent:#C8A96E;--accent2:#E8C98E;
  --accent-dim:rgba(200,169,110,0.12);--green:#5DBE8A;
  --green-dim:rgba(93,190,138,0.12);--red:#E07070;--red-dim:rgba(224,112,112,0.12);
  --blue:#7EB8E8;--blue-dim:rgba(126,184,232,0.12);
  --text:#F0EDE8;--text2:#A0A0B8;--text3:#60607A;
  --radius:14px;--radius-sm:9px;
  --font:'Zen Kaku Gothic New',sans-serif;
  --font-display:'DM Serif Display',serif;
}
.hbs *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
.hbs{background:var(--bg);font-family:var(--font);color:var(--text);
  display:flex;flex-direction:column;height:100dvh;min-height:500px;overflow:hidden;}
.hbs-scroll{flex:1;overflow-y:auto;overflow-x:hidden;padding:16px 16px 24px}
.hbs-header{padding:16px 18px 12px;background:var(--surface);border-bottom:1px solid var(--border);flex-shrink:0}
.hbs-header-row{display:flex;justify-content:space-between;align-items:center}
.hbs-header-title{font-family:var(--font-display);font-size:20px;color:var(--accent);letter-spacing:.02em}
.hbs-header-sub{font-size:11px;color:var(--text3);margin-top:3px}
.hbs-streak{background:var(--accent-dim);border:1px solid rgba(200,169,110,.3);border-radius:20px;
  padding:5px 12px;font-size:12px;color:var(--accent);font-weight:700}
.hbs-nav{display:flex;background:var(--surface);border-top:1px solid var(--border);flex-shrink:0;padding-bottom:8px}
.hbs-nav-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:10px 0;
  background:none;border:none;color:var(--text3);font-size:8.5px;font-family:var(--font);
  font-weight:700;cursor:pointer;transition:color .2s;letter-spacing:.03em}
.hbs-nav-btn .ni{font-size:18px;transition:transform .2s}
.hbs-nav-btn.active{color:var(--accent)}
.hbs-nav-btn.active .ni{transform:scale(1.15)}
.hbs-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;margin-bottom:12px}
.hbs-card-label{font-size:11px;font-weight:700;color:var(--text3);letter-spacing:.1em;text-transform:uppercase;margin-bottom:10px}
.hbs-mood-grid{display:flex;gap:6px}
.hbs-mood-btn{flex:1;padding:10px 4px 8px;border-radius:var(--radius-sm);border:1.5px solid var(--border);
  background:var(--card2);text-align:center;cursor:pointer;transition:all .15s;font-family:var(--font)}
.hbs-mood-btn .me{font-size:20px;display:block;margin-bottom:3px}
.hbs-mood-btn .ml{font-size:10px;color:var(--text3)}
.hbs-mood-btn.on{border-color:var(--accent);background:var(--accent-dim)}
.hbs-mood-btn.on .ml{color:var(--accent);font-weight:700}
.hbs-chips{display:flex;flex-wrap:wrap;gap:7px}
.hbs-chip{padding:7px 14px;border-radius:20px;border:1.5px solid var(--border);background:var(--card2);
  font-size:12px;color:var(--text2);cursor:pointer;transition:all .15s;font-family:var(--font)}
.hbs-chip.on{border-color:var(--accent);background:var(--accent-dim);color:var(--accent);font-weight:700}
.hbs-ta{width:100%;background:var(--card2);border:1.5px solid var(--border);border-radius:var(--radius-sm);
  padding:11px 13px;font-size:14px;font-family:var(--font);color:var(--text);
  outline:none;resize:none;transition:border-color .2s;line-height:1.6}
.hbs-ta:focus{border-color:var(--accent)}
.hbs-ta::placeholder{color:var(--text3)}
.hbs-stars{display:flex;gap:5px}
.hbs-star-btn{flex:1;padding:9px 4px;border-radius:var(--radius-sm);border:1.5px solid var(--border);
  background:var(--card2);font-size:11px;color:var(--text3);text-align:center;cursor:pointer;
  transition:all .15s;font-family:var(--font);line-height:1.4}
.hbs-star-btn.on{border-color:var(--accent);background:var(--accent-dim);color:var(--accent2)}
.hbs-times{display:flex;flex-wrap:wrap;gap:7px}
.hbs-time-chip{padding:7px 13px;border-radius:20px;border:1.5px solid var(--border);background:var(--card2);
  font-size:12px;color:var(--text2);cursor:pointer;transition:all .15s;font-family:var(--font)}
.hbs-time-chip.on{border-color:var(--green);background:var(--green-dim);color:var(--green);font-weight:700}
.hbs-save-btn{width:100%;padding:15px;border-radius:var(--radius);border:none;
  background:linear-gradient(135deg,#C8A96E,#E8C98E);color:#0E0E12;font-size:15px;font-weight:900;
  font-family:var(--font);cursor:pointer;letter-spacing:.05em;
  box-shadow:0 4px 20px rgba(200,169,110,.3);transition:all .15s}
.hbs-save-btn:active{transform:scale(.97)}
.hbs-save-btn:disabled{opacity:.6;cursor:not-allowed}
.hbs-prompt-box{background:var(--card2);border:1px solid rgba(200,169,110,.3);
  border-radius:var(--radius);padding:14px 16px;margin-top:12px}
.hbs-prompt-box-label{font-size:10px;color:var(--accent);font-weight:700;letter-spacing:.1em;
  display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.hbs-prompt-text{font-size:12px;line-height:1.7;color:var(--text2);white-space:pre-wrap;
  background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-sm);
  padding:10px 12px;max-height:200px;overflow-y:auto}
.hbs-copy-btn{background:var(--accent);color:#0E0E12;border:none;border-radius:8px;
  padding:5px 12px;font-size:11px;font-weight:700;font-family:var(--font);cursor:pointer;transition:all .15s}
.hbs-copy-btn:active{transform:scale(.94)}
.hbs-copy-btn.done{background:var(--green)}
.hbs-hint{font-size:11px;color:var(--text3);line-height:1.7;margin-top:8px}
.hbs-log-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);
  padding:14px 16px;margin-bottom:10px}
.hbs-log-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px}
.hbs-log-date{font-size:11px;color:var(--text3)}
.hbs-log-skills{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px}
.hbs-log-skill{padding:3px 9px;border-radius:8px;background:var(--accent-dim);color:var(--accent);font-size:10px;font-weight:700}
.hbs-log-text{font-size:12px;color:var(--text2);line-height:1.7}
.hbs-del-btn{background:none;border:none;color:var(--text3);font-size:11px;cursor:pointer;
  padding:3px 8px;border-radius:6px;transition:all .15s;font-family:var(--font)}
.hbs-del-btn:hover{background:var(--red-dim);color:var(--red)}
.hbs-empty{text-align:center;padding:60px 20px;color:var(--text3);font-size:13px;line-height:2}
.hbs-stats-row{display:flex;gap:8px;margin-bottom:12px}
.hbs-stat-box{flex:1;background:var(--card);border:1px solid var(--border);
  border-radius:var(--radius);padding:14px 10px;text-align:center}
.hbs-stat-n{font-size:28px;font-weight:900;color:var(--accent);font-family:var(--font-display)}
.hbs-stat-l{font-size:10px;color:var(--text3);margin-top:2px;font-weight:700;letter-spacing:.05em}
.hbs-week-row{display:grid;grid-template-columns:repeat(7,1fr);gap:5px;margin-top:10px}
.hbs-week-cell{aspect-ratio:1;border-radius:8px;display:flex;flex-direction:column;align-items:center;
  justify-content:center;font-size:9px;font-weight:700;color:var(--text3);
  background:var(--card2);border:1px solid var(--border);gap:2px}
.hbs-week-cell.done{background:var(--accent-dim);border-color:rgba(200,169,110,.4);color:var(--accent)}
.hbs-bar-row{display:flex;align-items:center;gap:8px;margin-bottom:8px}
.hbs-bar-label{font-size:12px;color:var(--text2);width:68px;flex-shrink:0}
.hbs-bar-track{flex:1;background:var(--card2);border-radius:4px;height:8px;overflow:hidden}
.hbs-bar-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,var(--accent),var(--accent2));transition:width .6s ease}
.hbs-bar-count{font-size:11px;color:var(--text3);width:20px;text-align:right}
.hbs-role-chips{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:12px}
.hbs-role-chip{padding:8px 14px;border-radius:20px;border:1.5px solid var(--border);background:var(--card2);
  font-size:12px;color:var(--text2);cursor:pointer;transition:all .15s;font-family:var(--font)}
.hbs-role-chip.on{border-color:var(--blue);background:var(--blue-dim);color:var(--blue);font-weight:700}
.hbs-action-btn{width:100%;padding:12px;border-radius:var(--radius-sm);border:1.5px solid var(--border);
  background:var(--card2);color:var(--text2);font-size:13px;font-family:var(--font);
  cursor:pointer;transition:all .15s;text-align:left;margin-bottom:8px;display:block}
.hbs-action-btn:hover{border-color:var(--accent);color:var(--accent);background:var(--accent-dim)}
.hbs-action-btn.on{border-color:var(--accent);color:var(--accent);background:var(--accent-dim);font-weight:700}
.hbs-divider{height:1px;background:var(--border);margin:14px 0}
.hbs-section-title{font-size:11px;font-weight:700;color:var(--text3);
  letter-spacing:.12em;text-transform:uppercase;margin-bottom:12px;margin-top:4px}
.hbs-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%);
  background:var(--text);color:var(--bg);padding:10px 20px;border-radius:20px;
  font-size:13px;font-weight:700;opacity:0;pointer-events:none;
  transition:opacity .25s;z-index:999;white-space:nowrap;font-family:var(--font)}
.hbs-toast.show{opacity:1}
.hbs-guide{background:var(--blue-dim);border:1px solid rgba(126,184,232,0.3);border-radius:var(--radius-sm);
  padding:12px 14px;font-size:12px;color:var(--text2);line-height:1.8;margin-bottom:14px}
.hbs-guide b{color:var(--blue)}
.hbs-ai-launch{margin-top:12px;padding-top:12px;border-top:1px solid var(--border)}
.hbs-ai-launch-label{font-size:11px;color:var(--text3);font-weight:700;margin-bottom:8px;letter-spacing:.05em}
.hbs-ai-btn-row{display:flex;gap:8px}
.hbs-ai-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:11px 4px;
  border-radius:var(--radius-sm);border:1.5px solid var(--border);background:var(--card);
  color:var(--text2);font-size:11px;font-weight:700;font-family:var(--font);cursor:pointer;transition:all .15s}
.hbs-ai-btn:active{transform:scale(.95)}
.hbs-ai-btn:hover{border-color:var(--accent);color:var(--accent);background:var(--accent-dim)}
`;

const MOOD_E = {最高:'😊',まあまあ:'😐',しんどい:'😔',疲れた:'😴',燃えてる:'🔥'};
const STAR_L = ['','★','★★','★★★','★★★★','★★★★★'];
const MOODS = ['最高','まあまあ','しんどい','疲れた','燃えてる'];
const MOOD_EMOJIS = ['😊','😐','😔','😴','🔥'];
const SKILLS_LIST = ['カット','カラー','パーマ','シャンプー','セット','接客練習','知識勉強','その他'];
const TIMES = ['15分','30分','1時間','1.5時間','2時間以上'];
const STARS = [[1,'★\nもう少し'],[2,'★★\n普通'],[3,'★★★\n良かった'],[4,'★★★★\nかなり良い'],[5,'★×5\n最高！']];
const STORE_KEY = 'hbs_logs_v3';
const COACH_KEY = 'hbs_coach_v1';

// ── コーチ設定 ──
const DEFAULT_COACH = {
  name: 'AIコーチ',
  callMe: '',            // 自分の呼ばれ方（例：〇〇さん、君）
  tone: 'warm',          // warm / friendly / cool / passionate / gentle
  strictness: 2,         // 1=甘め 2=ふつう 3=厳しめ
  emoji: 'some',         // none / some / many
  praise: true,          // よく褒める
  feedback: true,        // 具体的な改善点を出す
  formal: 'casual',      // casual / polite
  extra: ''              // 自由メモ（性格の追加指定）
};

const TONE_TEXT = {
  warm:      '温かく親しみやすい口調',
  friendly:  '元気で明るくフレンドリーな口調',
  cool:      '落ち着いてクールで的確な口調',
  passionate:'熱血で前向きに背中を押す口調',
  gentle:    'やさしく穏やかに寄り添う口調',
};
const STRICT_TEXT = { 1:'基本は肯定中心で、ダメ出しは控えめに', 2:'良い点と改善点をバランスよく', 3:'プロを目指す前提で、改善点ははっきり指摘して' };
const EMOJI_TEXT  = { none:'絵文字は使わない', some:'絵文字は適度に使う', many:'絵文字を多めに使って明るく' };
const PROFILE_KEY = 'hbs_profile_v1';

// ── 自分のプロフィール（コーチングに使う情報）──
const DEFAULT_PROFILE = {
  nickname: '',          // ニックネーム
  age: '',               // 年齢
  gender: '',            // 性別
  years: '',             // 美容師歴（経験年数・入社何年目など）
  shop: '',              // 職場の雰囲気・規模
  goal: '',              // 目標（スタイリストデビュー時期など）
  strongSkills: [],      // 得意なこと
  weakSkills: [],        // 苦手なこと
  personality: '',       // 自分の性格
  struggles: '',         // 今いちばんの悩み
  extra: ''              // 自由記入
};

// プロフィールを相談文用テキストに整形（空欄は出さない）
function buildProfileText(p) {
  if (!p) return '';
  const lines = [
    p.nickname && `名前/呼び名：${p.nickname}`,
    p.age && `年齢：${p.age}`,
    p.gender && `性別：${p.gender}`,
    p.years && `美容師歴：${p.years}`,
    p.shop && `職場：${p.shop}`,
    p.goal && `目標：${p.goal}`,
    p.strongSkills?.length && `得意：${p.strongSkills.join('・')}`,
    p.weakSkills?.length && `苦手：${p.weakSkills.join('・')}`,
    p.personality && `性格：${p.personality}`,
    p.struggles && `今の悩み：${p.struggles}`,
    p.extra && `その他：${p.extra}`,
  ].filter(Boolean);
  if (!lines.length) return '';
  return `\n\n【私のプロフィール】（これを踏まえてコーチングしてください）\n${lines.join('\n')}`;
}

// 設定からコーチの人格指示文を組み立てる
function buildPersona(c) {
  const s = c || DEFAULT_COACH;
  const parts = [];
  parts.push(`あなたは新卒美容師（18〜20歳のアシスタント）専属のAIコーチ「${s.name||'AIコーチ'}」です。`);
  parts.push(TONE_TEXT[s.tone] || TONE_TEXT.warm);
  parts.push(s.formal === 'polite' ? '丁寧語（ですます調）で話してください。' : 'フランクなため口で話してください。');
  if (s.callMe) parts.push(`私のことは「${s.callMe}」と呼んでください。`);
  parts.push(STRICT_TEXT[s.strictness] || STRICT_TEXT[2]);
  if (s.praise) parts.push('褒めるときは必ず具体的に褒めてください。');
  if (s.feedback) parts.push('改善点は実践できる具体的なアドバイスにしてください。');
  parts.push(EMOJI_TEXT[s.emoji] || EMOJI_TEXT.some);
  parts.push('薬剤の配合比率など安全に関わることは「先輩に確認してね」と添えてください。');
  if (s.extra.trim()) parts.push(`追加の性格・方針：${s.extra.trim()}`);
  return parts.join(' ');
}

// ── Storage（window.storage が無ければ localStorage を使う）──
async function kvSet(key, val) {
  const json = JSON.stringify(val);
  if (window.storage) {
    try { const r = await window.storage.set(key, json); if (r) return true; } catch(e){ console.error(e); }
  }
  try { localStorage.setItem(key, json); return true; } catch(e){ console.error(e); return false; }
}
async function kvGet(key) {
  if (window.storage) {
    try { const r = await window.storage.get(key); if (r && r.value) return JSON.parse(r.value); } catch(e){ console.error(e); }
  }
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch(e){ console.error(e); return null; }
}

async function storageSave(logs){ return kvSet(STORE_KEY, logs); }
async function storageLoad(){ return (await kvGet(STORE_KEY)) || []; }
async function coachSave(coach){ return kvSet(COACH_KEY, coach); }
async function coachLoad(){ return await kvGet(COACH_KEY); }
async function profileSave(p){ return kvSet(PROFILE_KEY, p); }
async function profileLoad(){ return await kvGet(PROFILE_KEY); }

// ── クリップボードコピー ──
async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {}
  // fallback
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch { return false; }
}

// ── 飛べるAIサービス ──
const AI_SERVICES = [
  { key:'chatgpt', name:'ChatGPT', emoji:'🟢', url:'https://chatgpt.com/' },
  { key:'claude',  name:'Claude',  emoji:'🟣', url:'https://claude.ai/new' },
  { key:'gemini',  name:'Gemini',  emoji:'🔵', url:'https://gemini.google.com/app' },
];

// ── コピペ用プロンプト表示ボックス ──
function PromptBox({ label, prompt }) {
  const [copied, setCopied] = useState(false);
  async function doCopy() {
    const ok = await copyText(prompt);
    if (ok) { setCopied(true); setTimeout(()=>setCopied(false), 1800); }
    return ok;
  }
  async function copyAndOpen(service) {
    await doCopy();
    // コピーしてから少し待ってAIを開く（コピー処理を確実に終わらせる）
    setTimeout(()=>{ window.open(service.url, '_blank', 'noopener'); }, 120);
  }
  return (
    <div className="hbs-prompt-box">
      <div className="hbs-prompt-box-label">
        <span>✦ {label}</span>
        <button className={`hbs-copy-btn${copied?' done':''}`} onClick={doCopy}>
          {copied ? '✓ コピー済み' : '📋 コピー'}
        </button>
      </div>
      <div className="hbs-prompt-text">{prompt}</div>
      <div className="hbs-ai-launch">
        <div className="hbs-ai-launch-label">コピーして相談するAIを開く ↓</div>
        <div className="hbs-ai-btn-row">
          {AI_SERVICES.map(s=>(
            <button key={s.key} className="hbs-ai-btn" onClick={()=>copyAndOpen(s)}>
              <span style={{fontSize:18}}>{s.emoji}</span>
              <span>{s.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="hbs-hint">ボタンを押すと相談文がコピーされ、AIが開きます。貼り付けて送信してね ✦</div>
    </div>
  );
}

// ══════════════════════════════
//  PAGE: 記録
// ══════════════════════════════
function PageLog({ logs, setLogs, coach, profile }) {
  const [mood, setMood] = useState('');
  const [skills, setSkills] = useState([]);
  const [content, setContent] = useState('');
  const [insight, setInsight] = useState('');
  const [tomorrow, setTomorrow] = useState('');
  const [sns, setSns] = useState('');
  const [time, setTime] = useState('');
  const [star, setStar] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [toast, setToast] = useState('');
  const [saving, setSaving] = useState(false);

  function showToast(msg){ setToast(msg); setTimeout(()=>setToast(''),2400); }
  function toggleSkill(s){ setSkills(p=>p.includes(s)?p.filter(x=>x!==s):[...p,s]); }

  async function saveLog() {
    if (!mood && !content && skills.length === 0) { showToast('気分か練習内容を入れてね！'); return; }
    setSaving(true);
    const now = new Date();
    const log = {
      id: Date.now(),
      date: now.toISOString().split('T')[0],
      dateLabel: now.toLocaleDateString('ja-JP',{year:'numeric',month:'long',day:'numeric',weekday:'short'}),
      mood, skills:[...skills], content, insight, tomorrow, sns, time, star
    };
    const next = [log, ...logs];
    setLogs(next);
    const ok = await storageSave(next);
    showToast(ok ? '✅ 保存しました！' : '✅ 保存（このセッションのみ）');

    // 相談用プロンプト生成（リセット前に確定させる）
    const summary = [
      mood && `気分：${mood}`,
      skills.length && `練習内容：${skills.join('・')}`,
      content && `やったこと：${content}`,
      insight && `気づき：${insight}`,
      tomorrow && `明日やること：${tomorrow}`,
      star && `自己採点：★${star}`,
      time && `練習時間：${time}`,
    ].filter(Boolean).join('\n');

    const builtPrompt = `${buildPersona(coach)}\n\n今日の練習記録です：\n${summary}\n\n①この記録から気づいたこと・良かった点を具体的に褒めて ②改善のヒントを1つ ③明日への一言メッセージ をお願いします。${buildProfileText(profile)}`;

    // reset form（先にフォームを空に）
    setMood(''); setSkills([]); setContent(''); setInsight('');
    setTomorrow(''); setSns(''); setTime(''); setStar(0);

    // 相談文は最後にセット（リセットの影響を受けない）
    setPrompt(builtPrompt);
    setSaving(false);
  }

  return (
    <div className="hbs-scroll">
      <div className="hbs-card">
        <div className="hbs-card-label">今日の気分</div>
        <div className="hbs-mood-grid">
          {MOODS.map((m,i)=>(
            <button key={m} className={`hbs-mood-btn${mood===m?' on':''}`} onClick={()=>setMood(m)}>
              <span className="me">{MOOD_EMOJIS[i]}</span><span className="ml">{m}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="hbs-card">
        <div className="hbs-card-label">今日練習したこと（複数OK）</div>
        <div className="hbs-chips">
          {SKILLS_LIST.map(s=>(
            <button key={s} className={`hbs-chip${skills.includes(s)?' on':''}`} onClick={()=>toggleSkill(s)}>{s}</button>
          ))}
        </div>
      </div>
      <div className="hbs-card">
        <div className="hbs-card-label">具体的にやったこと</div>
        <textarea className="hbs-ta" rows={3} value={content} onChange={e=>setContent(e.target.value)}
          placeholder="例：ワンレングスで右側のラインが崩れる。重心を下げる意識で少し改善した。"/>
      </div>
      <div className="hbs-card">
        <div className="hbs-card-label">今日の気づき・先輩から盗んだこと</div>
        <textarea className="hbs-ta" rows={2} value={insight} onChange={e=>setInsight(e.target.value)}
          placeholder="例：先輩のハサミの角度が自分より少し寝ていた"/>
      </div>
      <div className="hbs-card">
        <div className="hbs-card-label">明日やること・改善したいこと</div>
        <textarea className="hbs-ta" rows={2} value={tomorrow} onChange={e=>setTomorrow(e.target.value)}
          placeholder="例：右側カットのとき重心を意識する"/>
      </div>
      <div className="hbs-card">
        <div className="hbs-card-label">練習時間</div>
        <div className="hbs-times">
          {TIMES.map(t=>(
            <button key={t} className={`hbs-time-chip${time===t?' on':''}`} onClick={()=>setTime(t)}>{t}</button>
          ))}
        </div>
      </div>
      <div className="hbs-card">
        <div className="hbs-card-label">自己採点</div>
        <div className="hbs-stars">
          {STARS.map(([v,label])=>(
            <button key={v} className={`hbs-star-btn${star===v?' on':''}`} onClick={()=>setStar(v)}
              style={{whiteSpace:'pre-line'}}>{label}</button>
          ))}
        </div>
      </div>
      <div className="hbs-card">
        <div className="hbs-card-label">SNS投稿ネタ（後で使う）</div>
        <textarea className="hbs-ta" rows={2} value={sns} onChange={e=>setSns(e.target.value)}
          placeholder="例：シャンプーで「気持ちいい」って言ってもらえた！"/>
      </div>

      <button className="hbs-save-btn" onClick={saveLog} disabled={saving}>
        {saving ? '保存中...' : '記録を保存して AIコーチ相談文を作る →'}
      </button>

      {prompt && <PromptBox label="AIコーチに相談する文" prompt={prompt}/>}
      <div className={`hbs-toast${toast?' show':''}`}>{toast}</div>
    </div>
  );
}

// ══════════════════════════════
//  PAGE: 履歴
// ══════════════════════════════
function PageHist({ logs, setLogs }) {
  async function delLog(id){
    if(!confirm('この記録を削除しますか？')) return;
    const next = logs.filter(l=>l.id!==id);
    setLogs(next); await storageSave(next);
  }
  return (
    <div className="hbs-scroll">
      <div className="hbs-section-title">記録履歴</div>
      {!logs.length
        ? <div className="hbs-empty">まだ記録がありません<br/>最初の練習を記録してみよう ✦</div>
        : logs.map(log=>(
          <div key={log.id} className="hbs-log-card">
            <div className="hbs-log-header">
              <div>
                <div className="hbs-log-date">{log.dateLabel||log.date}</div>
                {log.star ? <div style={{fontSize:11,color:'var(--accent)',marginTop:2}}>{STAR_L[log.star]}</div> : null}
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:18}}>{MOOD_E[log.mood]||''}</span>
                <button className="hbs-del-btn" onClick={()=>delLog(log.id)}>削除</button>
              </div>
            </div>
            {log.skills?.length ? (
              <div className="hbs-log-skills">{log.skills.map(s=><span key={s} className="hbs-log-skill">{s}</span>)}</div>
            ) : null}
            {log.content && <div className="hbs-log-text">📝 {log.content}</div>}
            {log.insight && <div className="hbs-log-text" style={{color:'var(--green)',marginTop:4}}>💡 {log.insight}</div>}
            {log.tomorrow && <div className="hbs-log-text" style={{color:'var(--accent)',marginTop:4}}>🎯 {log.tomorrow}</div>}
            {log.time && <div style={{fontSize:10,color:'var(--text3)',marginTop:6}}>⏱ {log.time}</div>}
          </div>
        ))
      }
    </div>
  );
}

// ══════════════════════════════
//  PAGE: 集計
// ══════════════════════════════
function PageStats({ logs, coach, profile }) {
  const [prompt, setPrompt] = useState('');

  const today = new Date();
  const mon = new Date(today);
  mon.setDate(today.getDate() - ((today.getDay()+6)%7));
  mon.setHours(0,0,0,0);
  const weekLogs = logs.filter(l=>new Date(l.date)>=mon);

  let streak=0;
  const dates=[...new Set(logs.map(l=>l.date))].sort().reverse();
  const d=new Date(today); d.setHours(0,0,0,0);
  for(const date of dates){
    const diff=Math.round((d-new Date(date))/86400000);
    if(diff<=1){streak++;d.setDate(d.getDate()-1);}else break;
  }

  const cnt={};
  logs.forEach(l=>(l.skills||[]).forEach(s=>cnt[s]=(cnt[s]||0)+1));
  const sorted=Object.entries(cnt).sort((a,b)=>b[1]-a[1]);
  const max=sorted[0]?.[1]||1;

  const DAYS=['月','火','水','木','金','土','日'];
  const weekCells=DAYS.map((day,i)=>{
    const dd=new Date(mon); dd.setDate(mon.getDate()+i);
    const ds=dd.toISOString().split('T')[0];
    return {day,date:dd.getDate(),done:logs.some(l=>l.date===ds)};
  });
  const moods=logs.slice(0,7).map(l=>MOOD_E[l.mood]||'').filter(Boolean).reverse();

  function buildWeekly(){
    if(!weekLogs.length){ setPrompt('（今週の記録がまだないよ！まず練習を記録してね）'); return; }
    const summary=weekLogs.map(l=>[
      `【${l.dateLabel||l.date}】`,
      l.skills?.length && `練習：${l.skills.join('・')}`,
      l.content && `内容：${l.content}`,
      l.insight && `気づき：${l.insight}`,
      l.star && `採点：★${l.star}`,
      l.mood && `気分：${l.mood}`,
    ].filter(Boolean).join(' / ')).join('\n');
    setPrompt(`${buildPersona(coach)}\n\n今週の私（美容師アシスタント）の練習記録です：\n${summary}\n\n①今週の成長ポイント（具体的に） ②繰り返し出てきた課題 ③来週に向けて1つだけ意識すること ④今週を総評する一言 を分析してください。${buildProfileText(profile)}`);
  }

  return (
    <div className="hbs-scroll">
      <div className="hbs-stats-row">
        <div className="hbs-stat-box"><div className="hbs-stat-n">{logs.length}</div><div className="hbs-stat-l">累計記録</div></div>
        <div className="hbs-stat-box"><div className="hbs-stat-n">{weekLogs.length}</div><div className="hbs-stat-l">今週</div></div>
        <div className="hbs-stat-box"><div className="hbs-stat-n">{streak}</div><div className="hbs-stat-l">連続日数</div></div>
      </div>
      <div className="hbs-card">
        <div className="hbs-card-label">今週の練習カレンダー</div>
        <div className="hbs-week-row">
          {weekCells.map(c=>(
            <div key={c.day} className={`hbs-week-cell${c.done?' done':''}`}>
              <span style={{fontSize:8}}>{c.day}</span><span>{c.done?'✓':c.date}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hbs-card">
        <div className="hbs-card-label">よく練習したメニュー</div>
        {sorted.length ? sorted.map(([s,c])=>(
          <div key={s} className="hbs-bar-row">
            <span className="hbs-bar-label">{s}</span>
            <div className="hbs-bar-track"><div className="hbs-bar-fill" style={{width:`${(c/max)*100}%`}}/></div>
            <span className="hbs-bar-count">{c}</span>
          </div>
        )) : <div style={{color:'var(--text3)',fontSize:12}}>まだデータなし</div>}
      </div>
      <div className="hbs-card">
        <div className="hbs-card-label">今週の気分推移</div>
        <div style={{fontSize:22,letterSpacing:6,padding:'4px 0'}}>{moods.join(' ')}</div>
      </div>
      <div className="hbs-divider"/>
      <button className="hbs-action-btn" onClick={buildWeekly}>📊 今週の成長を分析してもらう相談文を作る</button>
      {prompt && <PromptBox label="今週の成長分析を頼む文" prompt={prompt}/>}
    </div>
  );
}

// ══════════════════════════════
//  PAGE: AI相談（コピペ方式）
// ══════════════════════════════
function PageAI({ logs, coach, profile }) {
  const [mode, setMode] = useState('coach');
  const [input, setInput] = useState('');
  const [prompt, setPrompt] = useState('');

  const MODE_LEAD = {
    coach: '成長コーチとして、具体的で実践的なアドバイスをください。',
    mental: 'メンタルケアの相手として、まず共感してから前向きな視点をください。解決策の押し付けはNG。',
    roleplay: '接客ロールプレイの相手役をしてください。私が美容師役、あなたがお客様役です。3往復ごとに一度フィードバックを入れてください。',
    knowledge: '美容技術の先生として、正確でわかりやすく説明してください。現場での応用例も添えて。'
  };

  function buildPrompt(userText) {
    if(!userText.trim()){ return; }
    // 直近の記録を少しだけ文脈に添える（任意）
    let ctx = '';
    if (logs.length) {
      const recent = logs.slice(0,3).map(l=>[
        l.dateLabel||l.date,
        l.skills?.length && l.skills.join('・'),
        l.content,
      ].filter(Boolean).join(' / ')).join('\n');
      ctx = `\n\n（参考：私の最近の練習記録）\n${recent}`;
    }
    setPrompt(`${buildPersona(coach)}\n${MODE_LEAD[mode]}\n\n${userText.trim()}${ctx}${buildProfileText(profile)}`);
  }

  const QUICK = [
    ['📈 今週の成長を振り返る', '今週の練習を振り返って、私の成長ポイントと次のステップを教えて。'],
    ['😠 クレーム対応を練習する', 'クレーム対応のロールプレイをしてください。「カラーが思ってたより暗い」と言うお客様役をお願いします。'],
    ['🎨 カラー理論を教えて', 'カラーのレベルスケールと補色の関係をわかりやすく教えて。現場で使えるポイントも添えて。'],
    ['😔 しんどいとき話を聞いて', '今日しんどかった。美容師を続けるモチベーションを取り戻すアドバイスがほしい。'],
  ];

  const MODES = [['coach','🎯 成長コーチ'],['mental','💆 メンタルケア'],['roleplay','🎭 接客ロールプレイ'],['knowledge','📚 技術・知識']];

  return (
    <div className="hbs-scroll">
      <div className="hbs-guide">
        💡 <b>使い方</b><br/>
        相談したいことを選ぶ or 入力すると、<b>AIコーチへの相談文</b>が作られます。お好きなAI（ChatGPT・Claude・Gemini）のボタンを押すと相談文がコピーされてAIが開くので、貼り付けて送信してね。AIがコーチとして答えてくれます ✦
      </div>

      <div className="hbs-section-title">モードを選ぶ</div>
      <div className="hbs-role-chips">
        {MODES.map(([m,label])=>(
          <button key={m} className={`hbs-role-chip${mode===m?' on':''}`} onClick={()=>setMode(m)}>{label}</button>
        ))}
      </div>

      <div className="hbs-section-title">クイック相談</div>
      {QUICK.map(([label,q])=>(
        <button key={label} className="hbs-action-btn" onClick={()=>buildPrompt(q)}>{label}</button>
      ))}

      <div className="hbs-divider"/>
      <div className="hbs-section-title">自由に相談する</div>
      <textarea className="hbs-ta" rows={3} value={input} onChange={e=>setInput(e.target.value)}
        placeholder="相談したいことを書いてね（例：右側のカットがいつも崩れる…）"/>
      <button className="hbs-save-btn" style={{marginTop:10}} onClick={()=>buildPrompt(input)} disabled={!input.trim()}>
        相談文を作る →
      </button>

      {prompt && <PromptBox label="AIコーチに相談する文" prompt={prompt}/>}
    </div>
  );
}

// ══════════════════════════════
//  PAGE: コーチ設定
// ══════════════════════════════
function PageSettings({ coach, setCoach, profile, setProfile }) {
  const [toast, setToast] = useState('');
  function showToast(msg){ setToast(msg); setTimeout(()=>setToast(''),2000); }

  function upd(key, val){
    const next = { ...coach, [key]: val };
    setCoach(next);
    coachSave(next);
  }
  function updP(key, val){
    const next = { ...profile, [key]: val };
    setProfile(next);
    profileSave(next);
  }
  function togP(key, val){
    const arr = profile[key] || [];
    const next = { ...profile, [key]: arr.includes(val) ? arr.filter(x=>x!==val) : [...arr, val] };
    setProfile(next);
    profileSave(next);
  }
  function resetAll(){
    if(!confirm('コーチ設定とプロフィールを初期状態に戻しますか？')) return;
    setCoach({ ...DEFAULT_COACH });    coachSave({ ...DEFAULT_COACH });
    setProfile({ ...DEFAULT_PROFILE }); profileSave({ ...DEFAULT_PROFILE });
    showToast('初期設定に戻しました');
  }

  const TONES = [['warm','温かい'],['friendly','元気'],['cool','クール'],['passionate','熱血'],['gentle','やさしい']];
  const GENDERS = ['女性','男性','その他/答えない'];

  return (
    <div className="hbs-scroll">
      <div className="hbs-guide">
        💡 ここで設定した<b>コーチの性格</b>と<b>あなたのプロフィール</b>は、記録・集計・AI相談で作られる相談文すべてに反映されるよ。入力するほどコーチングが的確になる ✦
      </div>

      <div className="hbs-section-title">自分のプロフィール</div>

      <div className="hbs-card">
        <div className="hbs-card-label">ニックネーム</div>
        <textarea className="hbs-ta" rows={1} value={profile.nickname}
          onChange={e=>updP('nickname', e.target.value)} placeholder="例：みき"/>
      </div>

      <div className="hbs-card" style={{display:'flex',gap:10}}>
        <div style={{flex:1}}>
          <div className="hbs-card-label">年齢</div>
          <textarea className="hbs-ta" rows={1} value={profile.age}
            onChange={e=>updP('age', e.target.value)} placeholder="例：19"/>
        </div>
      </div>

      <div className="hbs-card">
        <div className="hbs-card-label">性別</div>
        <div className="hbs-chips">
          {GENDERS.map(g=>(
            <button key={g} className={`hbs-chip${profile.gender===g?' on':''}`} onClick={()=>updP('gender',g)}>{g}</button>
          ))}
        </div>
      </div>

      <div className="hbs-card">
        <div className="hbs-card-label">美容師歴・入社何年目</div>
        <textarea className="hbs-ta" rows={1} value={profile.years}
          onChange={e=>updP('years', e.target.value)} placeholder="例：新卒1年目（アシスタント）"/>
      </div>

      <div className="hbs-card">
        <div className="hbs-card-label">職場の雰囲気・規模（任意）</div>
        <textarea className="hbs-ta" rows={2} value={profile.shop}
          onChange={e=>updP('shop', e.target.value)} placeholder="例：スタッフ8人の街のサロン。先輩が優しい。"/>
      </div>

      <div className="hbs-card">
        <div className="hbs-card-label">目標（任意）</div>
        <textarea className="hbs-ta" rows={2} value={profile.goal}
          onChange={e=>updP('goal', e.target.value)} placeholder="例：来年の春までにスタイリストデビューしたい"/>
      </div>

      <div className="hbs-card">
        <div className="hbs-card-label">得意なこと（複数OK）</div>
        <div className="hbs-chips">
          {SKILLS_LIST.map(s=>(
            <button key={s} className={`hbs-chip${(profile.strongSkills||[]).includes(s)?' on':''}`} onClick={()=>togP('strongSkills',s)}>{s}</button>
          ))}
        </div>
      </div>

      <div className="hbs-card">
        <div className="hbs-card-label">苦手なこと（複数OK）</div>
        <div className="hbs-chips">
          {SKILLS_LIST.map(s=>(
            <button key={s} className={`hbs-chip${(profile.weakSkills||[]).includes(s)?' on':''}`} onClick={()=>togP('weakSkills',s)}>{s}</button>
          ))}
        </div>
      </div>

      <div className="hbs-card">
        <div className="hbs-card-label">自分の性格（任意）</div>
        <textarea className="hbs-ta" rows={2} value={profile.personality}
          onChange={e=>updP('personality', e.target.value)} placeholder="例：人見知りだけど負けず嫌い。緊張しやすい。"/>
      </div>

      <div className="hbs-card">
        <div className="hbs-card-label">今いちばんの悩み（任意）</div>
        <textarea className="hbs-ta" rows={2} value={profile.struggles}
          onChange={e=>updP('struggles', e.target.value)} placeholder="例：カットのスピードが遅くて自信が持てない"/>
      </div>

      <div className="hbs-card">
        <div className="hbs-card-label">その他コーチに伝えたいこと（任意）</div>
        <textarea className="hbs-ta" rows={2} value={profile.extra}
          onChange={e=>updP('extra', e.target.value)} placeholder="例：体力に自信がない。立ち仕事がつらい日がある。"/>
      </div>

      <div className="hbs-divider"/>
      <div className="hbs-section-title">コーチの性格</div>

      <div className="hbs-card">
        <div className="hbs-card-label">コーチの名前</div>
        <textarea className="hbs-ta" rows={1} value={coach.name}
          onChange={e=>upd('name', e.target.value)} placeholder="例：さくらコーチ"/>
      </div>

      <div className="hbs-card">
        <div className="hbs-card-label">自分の呼ばれ方（任意）</div>
        <textarea className="hbs-ta" rows={1} value={coach.callMe}
          onChange={e=>upd('callMe', e.target.value)} placeholder="例：あなた、〇〇さん、君"/>
      </div>

      <div className="hbs-card">
        <div className="hbs-card-label">話し方のトーン</div>
        <div className="hbs-chips">
          {TONES.map(([v,label])=>(
            <button key={v} className={`hbs-chip${coach.tone===v?' on':''}`} onClick={()=>upd('tone',v)}>{label}</button>
          ))}
        </div>
      </div>

      <div className="hbs-card">
        <div className="hbs-card-label">言葉づかい</div>
        <div className="hbs-chips">
          <button className={`hbs-chip${coach.formal==='casual'?' on':''}`} onClick={()=>upd('formal','casual')}>ため口</button>
          <button className={`hbs-chip${coach.formal==='polite'?' on':''}`} onClick={()=>upd('formal','polite')}>ですます調</button>
        </div>
      </div>

      <div className="hbs-card">
        <div className="hbs-card-label">指導の厳しさ</div>
        <div className="hbs-chips">
          <button className={`hbs-chip${coach.strictness===1?' on':''}`} onClick={()=>upd('strictness',1)}>甘め（褒め中心）</button>
          <button className={`hbs-chip${coach.strictness===2?' on':''}`} onClick={()=>upd('strictness',2)}>ふつう</button>
          <button className={`hbs-chip${coach.strictness===3?' on':''}`} onClick={()=>upd('strictness',3)}>厳しめ</button>
        </div>
      </div>

      <div className="hbs-card">
        <div className="hbs-card-label">絵文字の量</div>
        <div className="hbs-chips">
          <button className={`hbs-chip${coach.emoji==='none'?' on':''}`} onClick={()=>upd('emoji','none')}>なし</button>
          <button className={`hbs-chip${coach.emoji==='some'?' on':''}`} onClick={()=>upd('emoji','some')}>ほどほど</button>
          <button className={`hbs-chip${coach.emoji==='many'?' on':''}`} onClick={()=>upd('emoji','many')}>多め</button>
        </div>
      </div>

      <div className="hbs-card">
        <div className="hbs-card-label">性格・方針の追加メモ（任意）</div>
        <textarea className="hbs-ta" rows={3} value={coach.extra}
          onChange={e=>upd('extra', e.target.value)}
          placeholder="例：たまに関西弁。失敗談を交えて励ましてくれる。憧れの先輩みたいに接して。"/>
      </div>

      <div className="hbs-card">
        <div className="hbs-card-label">相談文に入る内容のプレビュー</div>
        <div className="hbs-prompt-text">{buildPersona(coach)}{buildProfileText(profile)}</div>
      </div>

      <button className="hbs-action-btn" onClick={resetAll} style={{textAlign:'center'}}>↩ 初期設定に戻す</button>

      <div className={`hbs-toast${toast?' show':''}`}>{toast}</div>
    </div>
  );
}


//  ROOT
// ══════════════════════════════
export default function App() {
  const [page, setPage] = useState('log');
  const [logs, setLogsState] = useState([]);
  const [coach, setCoach] = useState({ ...DEFAULT_COACH });
  const [profile, setProfile] = useState({ ...DEFAULT_PROFILE });
  const [loaded, setLoaded] = useState(false);

  function setLogs(next){ setLogsState(next); }

  useEffect(()=>{
    const style=document.createElement('style');
    style.textContent=STYLE; document.head.appendChild(style);
    (async()=>{
      const saved=await storageLoad(); if(saved) setLogsState(saved);
      const c=await coachLoad(); if(c) setCoach({ ...DEFAULT_COACH, ...c });
      const pf=await profileLoad(); if(pf) setProfile({ ...DEFAULT_PROFILE, ...pf });
      setLoaded(true);
    })();
    return ()=>document.head.removeChild(style);
  },[]);

  const streak=(()=>{
    let s=0; const t=new Date(); t.setHours(0,0,0,0);
    const dates=[...new Set(logs.map(l=>l.date))].sort().reverse();
    const d=new Date(t);
    for(const date of dates){
      const diff=Math.round((d-new Date(date))/86400000);
      if(diff<=1){s++;d.setDate(d.getDate()-1);}else break;
    }
    return s;
  })();

  const today=new Date().toLocaleDateString('ja-JP',{year:'numeric',month:'long',day:'numeric',weekday:'short'});
  const NAV=[['log','📝','記録'],['hist','📋','履歴'],['stats','📊','集計'],['ai','🤖','AI相談'],['set','⚙️','設定']];

  if(!loaded) return (
    <div style={{background:'#0E0E12',height:'100dvh',display:'flex',alignItems:'center',justifyContent:'center',color:'#C8A96E'}}>
      読み込み中...
    </div>
  );

  return (
    <div className="hbs">
      <div className="hbs-header">
        <div className="hbs-header-row">
          <div>
            <div className="hbs-header-title">✂ 練習ログ</div>
            <div className="hbs-header-sub">{today}</div>
          </div>
          <div className="hbs-streak">🔥 {streak}日連続</div>
        </div>
      </div>

      {page==='log'  && <PageLog  logs={logs} setLogs={setLogs} coach={coach} profile={profile}/>}
      {page==='hist' && <PageHist logs={logs} setLogs={setLogs}/>}
      {page==='stats'&& <PageStats logs={logs} coach={coach} profile={profile}/>}
      {page==='ai'   && <PageAI logs={logs} coach={coach} profile={profile}/>}
      {page==='set'  && <PageSettings coach={coach} setCoach={setCoach} profile={profile} setProfile={setProfile}/>}

      <nav className="hbs-nav">
        {NAV.map(([p,icon,label])=>(
          <button key={p} className={`hbs-nav-btn${page===p?' active':''}`} onClick={()=>setPage(p)}>
            <span className="ni">{icon}</span>{label}
          </button>
        ))}
      </nav>
    </div>
  );
}
