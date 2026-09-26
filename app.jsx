// Sneha Biradar — Portfolio
// Bento card grid with category pills, tweakable.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "Pastel playground",
  "wordmarkWeight": 700,
  "showReading": true,
  "showWriting": true,
  "showProjects": true,
  "pills": [
    {"id":"about",      "label":"About me",        "tone":"butter"},
    {"id":"osource",    "label":"Outsource",       "tone":"osource"},
    {"id":"approach",   "label":"Approach",        "tone":"orange"},
    {"id":"strategy",   "label":"Strategy",        "tone":"green"},
    {"id":"research",   "label":"Research",        "tone":"ivory"},
    {"id":"psychology", "label":"Psychology",      "tone":"blue"},
    {"id":"baking",     "label":"Baking pastries", "tone":"baking"}
  ],
  "projects": [
    {"id":"p1","title":"MAPS 2.0 — Safety & Accessibility","episode":"The One Where The Map Saw People","company":"Google Maps Redesign","role":"Lead UI/UX","year":"2025","tag":"PRODUCT","outcome":"Reimagined Google Maps to prioritise certainty over speed — illuminated safe paths and live accessibility overlays.","thumbA":"#26120a","thumbB":"#0e0805","href":"projects/maps-2.0.html","thumb":"projects/hero-city.png"},
    {"id":"p2","title":"Clarify — The XAI Diabetes App","episode":"The One That Made Numbers Make Sense","company":"mHealth · Chronic Care","role":"Product Designer","year":"2025","tag":"MOBILE","outcome":"Solving “numerical fatigue” in diabetes care — turning raw glucose data into actionable metabolic trajectories.","thumbA":"#1a0608","thumbB":"#0a0203","href":"projects/clarify.html","thumb":"projects/clarify-thumb.png"},
    {"id":"p3","title":"Binaried — Unified Workspace OS","episode":"The One Where Everything Lived In One Place","company":"Binaried · Internal Tools","role":"Product &amp; UI Designer","year":"2026","tag":"DASHBOARD","outcome":"A unified business workspace — dashboards, sales analytics, admin and config — built on a single purple design system and cognitive-load principles.","thumbA":"#7B61FF","thumbB":"#4a32c0","href":"projects/binaried.html","thumb":"projects/binaried-thumb.png"},
    {"id":"p4","title":"The Network handbook","episode":"The One With The Operating Manual","company":"Outsource","role":"Brand & Strategy","year":"2023","tag":"BRAND","outcome":"120-page culture and operating manual for a remote design network. Print + web.","thumbA":"#2a2a2a","thumbB":"#101010"}
  ]
}/*EDITMODE-END*/;

// Map palette name → CSS variable overrides
const PALETTES = {
  "Pastel playground": {
    "--c-blue":"#b8d0e8","--c-cream":"#f5f1e6","--c-orange":"#e85e3a",
    "--c-sage":"#b8d2a4","--c-butter":"#f5d35a","--c-forest":"#1e3a2c",
    "--c-mint":"#e1ecd6","--c-ivory":"#fbf8f1","--bg":"#ffffff","--ink":"#0e1110"
  },
  "Cool & muted": {
    "--c-blue":"#bcc8d6","--c-cream":"#eceae4","--c-orange":"#b86a52",
    "--c-sage":"#aabea3","--c-butter":"#d8c889","--c-forest":"#243334",
    "--c-mint":"#d4dfd5","--c-ivory":"#f6f4ee","--bg":"#f0eee8","--ink":"#1b1f1f"
  },
  "Warm terracotta": {
    "--c-blue":"#e3d1bc","--c-cream":"#f4ebd9","--c-orange":"#c8553d",
    "--c-sage":"#b8a679","--c-butter":"#e8b85b","--c-forest":"#3a2418",
    "--c-mint":"#e8dcc4","--c-ivory":"#faf3e6","--bg":"#f5ecd9","--ink":"#211610"
  },
  "Mono + ink": {
    "--c-blue":"#e5e5e5","--c-cream":"#ededed","--c-orange":"#161a17",
    "--c-sage":"#dcdcdc","--c-butter":"#f0f0f0","--c-forest":"#0a0a0a",
    "--c-mint":"#e8e8e8","--c-ivory":"#fafafa","--bg":"#f5f5f5","--ink":"#0a0a0a"
  }
};

function applyPalette(name){
  const p = PALETTES[name] || PALETTES["Pastel playground"];
  const root = document.documentElement;
  for (const k in p) root.style.setProperty(k, p[k]);
}

// — Icons —
const I = {
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7"/><path d="M9 7h8v8"/>
    </svg>
  ),
  arrowL: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/>
    </svg>
  ),
  arrowR: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/>
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.5 4.5l5 5L8 21H3v-5z"/>
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z"/>
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M3 7h6l2 2h10v10H3z"/>
    </svg>
  ),
  cookie: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="#e2a96a"/>
      <circle cx="9" cy="10" r="1.1" fill="#5a3217"/>
      <circle cx="14" cy="9" r=".9" fill="#5a3217"/>
      <circle cx="13" cy="14" r="1.2" fill="#5a3217"/>
      <circle cx="9" cy="15" r=".8" fill="#5a3217"/>
    </svg>
  ),
  paperclip: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.5l-8.5 8.5a5.5 5.5 0 0 1-7.8-7.8L13 4.9a3.7 3.7 0 0 1 5.2 5.2l-8.3 8.3a1.9 1.9 0 1 1-2.7-2.7L14.5 8"/>
    </svg>
  ),
  diamond: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l5 6-5 14L7 8z" fill="#fff"/>
    </svg>
  ),
  pencil: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21l3.5-1 12-12-2.5-2.5-12 12z"/><path d="M14.5 5.5l3 3"/>
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 4h7v16H4z"/><path d="M11 4h9v16h-9z"/>
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M5 5l14 14M19 5L5 19"/>
    </svg>
  )
};

// — Pill component —
function Pill({ pill, active, dim, onClick }) {
  const isFriends = pill.tone === "friends";

  if (isFriends) {
    // Render with dots between letters (Friends-style)
    return (
      <button
        className={"pill friends " + (active ? "is-active " : "") + (dim ? "is-dim" : "")}
        data-tone="ivory"
        onClick={onClick}
        title="Click to activate"
      >
        <span className="ch">
          {(pill.label || "F·R·I·E·N·D·S").split("").map((ch, i) => (
            <span key={i} style={{padding:"0 1px"}}>{ch}</span>
          ))}
        </span>
      </button>
    );
  }

  // Some pills have an image dot rather than an SVG icon.
  const dotImage = {
    about:      "assets/about-me.png",
    osource:    "assets/osrc.png",
    baking:     "assets/pastry.jpg",
    psychology: "assets/psychology.png"
  }[pill.id];

  const dotIcon = pill.icon || {
    approach: I.spark,
    strategy: I.paperclip, research: I.pencil
  }[pill.id] || I.spark;

  return (
    <button
      className={"pill " + (active ? "is-active " : "") + (dim ? "is-dim" : "")}
      data-tone={pill.tone}
      onClick={onClick}
    >
      <span className="dot" style={{color:"#fff"}}>
        {dotImage
          ? <img src={dotImage} alt="" style={{width:"100%",height:"100%",objectFit:"cover",display:"block",borderRadius:"50%"}} />
          : <span style={{width:11,height:11,display:"block"}}>{dotIcon}</span>
        }
      </span>
      <span>{pill.label}</span>
    </button>
  );
}

// — Cards — each declares its categories[] for filtering —
function CardBlueFolder({ onOpen, dim }) {
  // macOS Finder-style folder icon — back tab + front body, two-tone gradient.
  return (
    <div className={"card c-folder-wrap span-7 " + (dim ? "is-dim" : "")}>
      <svg className="folder" viewBox="0 0 300 280" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="folderBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#cfe0f0"/>
            <stop offset="1" stopColor="#a6c4dd"/>
          </linearGradient>
          <linearGradient id="folderFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#bcd5eb"/>
            <stop offset="1" stopColor="#86a8c6"/>
          </linearGradient>
        </defs>
        {/* Back piece — with tab on top-left */}
        <path
          d="
            M 14 6
            H 96
            Q 108 6 116 14
            L 132 30
            Q 138 36 148 36
            L 286 36
            Q 300 36 300 50
            L 300 262
            Q 300 276 286 276
            L 14 276
            Q 0 276 0 262
            L 0 20
            Q 0 6 14 6 Z"
          fill="url(#folderBack)"
        />
        {/* Front piece — sits over body, leaves tab visible */}
        <path
          d="
            M 14 50
            L 286 50
            Q 300 50 300 64
            L 300 262
            Q 300 276 286 276
            L 14 276
            Q 0 276 0 262
            L 0 64
            Q 0 50 14 50 Z"
          fill="url(#folderFront)"
        />
        {/* Top highlight on the front piece */}
        <path
          d="M 6 51 Q 0 51 0 60 V 64 Q 0 56 8 56 H 292 Q 300 56 300 64 V 60 Q 300 51 294 51 Z"
          fill="rgba(255,255,255,.55)"
        />
      </svg>
      <button
        onClick={onOpen}
        style={{
          position:"absolute",right:18,bottom:18,
          background:"var(--c-butter)",color:"#1a1404",border:0,borderRadius:999,
          padding:"9px 16px",fontWeight:600,fontSize:14,letterSpacing:"-.005em",
          cursor:"pointer",fontFamily:"var(--font-body)",zIndex:1,
          boxShadow:"0 1px 0 rgba(0,0,0,.08), 0 4px 10px rgba(0,0,0,.06)"
        }}
      >
        About me
      </button>
    </div>
  );
}

function CardCurrentRole({ onOpen, dim, data }) {
  return (
    <div className={"card c-cream span-6 " + (dim ? "is-dim" : "")} onClick={onOpen} style={{cursor:"pointer"}}>
      <h3>Head of Brand &amp; Strategy at Outsource</h3>
      <div className="meta">
        <div className="current-role-label">current role</div>
        <div className="role-badge">O.SRC</div>
      </div>
    </div>
  );
}

function CardEthosOrange({ onOpen, dim, count }) {
  return (
    <div className={"card c-orange c-work-entry span-6 " + (dim ? "is-dim" : "")} onClick={onOpen}>
      <div className="ck">Selected work — case studies</div>
      <h3>How people actually choose, decide, and trust.</h3>
      <p>Six projects across marketplaces, fintech, healthcare and brand.</p>
      <div className="work-foot">
        <span className="chip">{String(count).padStart(2,"0")} projects</span>
        <span className="open-arrow">Open →</span>
      </div>
    </div>
  );
}

function CardImage({ id, caption, dim, span = "span-6", placeholderLabel, tall, src, hoverSrc, objectPosition, hoverObjectPosition }) {
  return (
    <div className={"card c-img " + span + " " + (tall ? "is-tall " : "") + (dim ? "is-dim" : "")}>
      {src ? (
        <React.Fragment>
          <img className="c-img-fill is-default" src={src} alt="" style={objectPosition ? {objectPosition} : undefined} />
          {hoverSrc && (
            <img className="c-img-fill is-hover" src={hoverSrc} alt="" style={hoverObjectPosition ? {objectPosition: hoverObjectPosition} : undefined} />
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <image-slot id={id} placeholder={placeholderLabel || "Drop image"} shape="rounded" radius="26"></image-slot>
          <div className="placeholder" style={{pointerEvents:"none"}}>
            <div className="ph-label">{placeholderLabel || "image · 1:1"}</div>
            <div className="ph-corner tl"></div>
            <div className="ph-corner tr"></div>
            <div className="ph-corner bl"></div>
            <div className="ph-corner br"></div>
          </div>
        </React.Fragment>
      )}
      {caption && <div className="caption">{caption}</div>}
    </div>
  );
}

function CardName({ dim, onOpen }) {
  return (
    <div className={"card c-sage span-6 " + (dim ? "is-dim" : "")} onClick={onOpen} style={{cursor:"pointer", fontWeight: 300}}>
      <div className="word">sneha</div>
      <div className="ipa">/ˈsneɪ·hɑː/</div>
      <div className="deva">स्नेह</div>
      <div className="pos"><b>noun</b> &nbsp;affection, love</div>
      <div className="origin">from Sanskrit — also means oil, the thing that keeps things together.</div>
    </div>
  );
}

function CardStrategy({ dim, onOpen, data }) {
  return (
    <div className={"card c-butter span-6 " + (dim ? "is-dim" : "")} onClick={onOpen} style={{cursor:"pointer"}}>
      <h3>{data.line}</h3>
      <p style={{marginTop:"auto"}}>{data.body}</p>
    </div>
  );
}

function CardEthosForest({ dim, onOpen, data }) {
  return (
    <div className={"card c-forest span-10 " + (dim ? "is-dim" : "")} onClick={onOpen} style={{cursor:"pointer"}}>
      <h3>{data.line}</h3>
      <p style={{marginTop:"auto",maxWidth:"36ch"}}>{data.body}</p>
    </div>
  );
}

function MedalRosette({ play }) {
  return (
    <div className={"rosette" + (play ? " is-play" : "")} aria-label="Conversation Participation award ribbon">
      <svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="medFill" cx="42%" cy="36%" r="70%">
            <stop offset="0" stopColor="#cdb6f2"/><stop offset="1" stopColor="#a07fe0"/>
          </radialGradient>
          <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f7e7a8"/><stop offset="1" stopColor="#d9b95f"/>
          </linearGradient>
        </defs>
        <path className="tail tl" d="M78 196 L60 270 L82 252 L92 268 L96 206 Z" fill="#8a5fd6"/>
        <path className="tail tr" d="M122 196 L140 270 L118 252 L108 268 L104 206 Z" fill="#8a5fd6"/>
        <path className="tail tc" d="M86 200 H114 V262 L100 250 L86 262 Z" fill="#c9b2ee" stroke="url(#gold)" strokeWidth="3"/>
        <text className="yay" x="100" y="222" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" letterSpacing="3" fill="#7a57c4">YAY</text>
        <g className="ring">
          <circle cx="100" cy="100" r="92" fill="url(#gold)"/>
          <circle cx="100" cy="100" r="86" fill="#b89be8"/>
          <circle cx="100" cy="100" r="78" fill="url(#medFill)" stroke="url(#gold)" strokeWidth="3"/>
        </g>
        <g className="medal">
          <circle cx="100" cy="100" r="62" fill="none" stroke="#8a5fd6" strokeWidth="2.5"/>
          <path id="arcTop" d="M52 100 A48 48 0 0 1 148 100" fill="none"/>
          <path id="arcBot" d="M150 100 A50 50 0 0 1 50 100" fill="none"/>
          <text fontFamily="Geist Mono, monospace" fontSize="12.5" letterSpacing="2.5" fill="#fff8ee" fontWeight="600">
            <textPath href="#arcTop" startOffset="50%" textAnchor="middle">REWATCH CLUB</textPath>
          </text>
          <text fontFamily="Geist Mono, monospace" fontSize="11" letterSpacing="2" fill="#efe2ff">
            <textPath href="#arcBot" startOffset="50%" textAnchor="middle">10 SEASONS · NO SKIPS</textPath>
          </text>
          <path className="star" d="M100 66 l4.6 9.8 10.8 1.3 -8 7.3 2.1 10.6 -9.5 -5.3 -9.5 5.3 2.1 -10.6 -8 -7.3 10.8 -1.3 Z" fill="#fff5dd"/>
          <line x1="64" y1="104" x2="136" y2="104" stroke="#fff8ee" strokeWidth="2"/>
          <line x1="64" y1="122" x2="136" y2="122" stroke="#fff8ee" strokeWidth="2"/>
          <text x="100" y="118" textAnchor="middle" fontFamily="Onest, sans-serif" fontSize="17" letterSpacing="2" fontWeight="800" fill="#fff8ee">PIVOT!</text>
        </g>
      </svg>
    </div>
  );
}

function CardCertificate({ dim, certText }) {
  const [open, setOpen] = React.useState(false);
  const [play, setPlay] = React.useState(false);
  const show = () => { setOpen(true); setPlay(false); setTimeout(()=>setPlay(true), 60); };
  const close = () => setOpen(false);
  React.useEffect(() => {
    const h = (e) => { if (e.key === "Escape") close(); };
    if (open) window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open]);
  return (
    <React.Fragment>
      <div className={"card c-mint span-7 " + (dim ? "is-dim" : "")}
           onClick={show} role="button" tabIndex={0}
           onKeyDown={(e)=>{ if(e.key==="Enter"||e.key===" ") show(); }}>
        <div className="stamp">Self-certified</div>
        <div className="seal"><span>{certText.sealTop}<br/>{certText.sealMid}<br/>{certText.sealBot}</span></div>
        <div className="since">{certText.since}</div>
        <div className="award">{certText.award}</div>
        <div className="note">{certText.note}</div>
      </div>

      <div className={"medal-bg " + (open ? "open" : "")} onClick={close}></div>
      <div className={"medal-modal " + (open ? "open" : "")} role="dialog" aria-modal="true" aria-label="Comfort Viewing award">
        <button className="medal-x" onClick={close} aria-label="Close">{I.x}</button>
        <div className="medal-kicker">The Friends Rewatch Club presents</div>
        <MedalRosette play={play && open} />
        <div className="medal-title">Gold Medal · Comfort Viewing</div>
        <div className="medal-sub">est. every weekend · 10 seasons, no skips</div>
        <button className="medal-replay" onClick={(e)=>{e.stopPropagation();setPlay(false);setTimeout(()=>setPlay(true),40);}}>Replay ↺</button>
      </div>
    </React.Fragment>
  );
}

function CardWriting({ dim, onOpen, data }) {
  return (
    <div className={"card c-ivory span-7 " + (dim ? "is-dim" : "")} onClick={onOpen} style={{cursor:"pointer"}}>
      <h3>{data.title}</h3>
      <p style={{marginTop:8}}>{data.body}</p>
      <div className="tags">
        {data.tags.map((tag,i) => <span className="tag" key={i}>{tag}</span>)}
      </div>
      <a className="cta" style={{marginTop:"auto"}}>
        <span>Read my publication</span> {I.arrow}
      </a>
    </div>
  );
}

// — Selected Work card (in bento) —
function CardWork({ dim, count, projects, onOpen }) {
  const previewProjects = projects.slice(0, 4);
  return (
    <div className={"card c-work span-6 " + (dim ? "is-dim" : "")} onClick={onOpen}>
      <div className="kicker">Selected work</div>
      <h3>Things I've shipped —<br/>and what they shifted.</h3>
      <div className="strips">
        {previewProjects.map((p, i) => (
          <div key={i} className="s" style={{"--a": p.thumbA, "--b": p.thumbB}}></div>
        ))}
      </div>
      <div className="count">
        <span className="n">{String(count).padStart(2,"0")}</span>
        <span className="l">projects · view all →</span>
      </div>
      <div className="arrow">{I.arrow}</div>
    </div>
  );
}

// — Selected Work overlay (horizontal scroll) —
function WorkOverlay({ open, onClose, projects }) {
  const scrollerRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);

  // shared easing engine — driven by setTimeout (fires even when rAF is paused),
  // animating via direct scrollLeft writes since scrollBy({smooth}) is unreliable here.
  const animRef = React.useRef({ target: 0, timer: null });

  const animateTo = React.useCallback((value) => {
    const sc = scrollerRef.current;
    if (!sc) return;
    const max = sc.scrollWidth - sc.clientWidth;
    const a = animRef.current;
    a.target = Math.max(0, Math.min(max, value));
    if (a.timer) return;
    sc.style.scrollSnapType = 'none';   // snap fights incremental writes — off while animating
    const tick = () => {
      const el = scrollerRef.current;
      if (!el) { a.timer = null; return; }
      const diff = a.target - el.scrollLeft;
      if (Math.abs(diff) < 0.5) {
        el.scrollLeft = a.target; a.timer = null;
        el.style.scrollSnapType = '';   // restore so manual trackpad scroll still snaps
        return;
      }
      el.scrollLeft += diff * 0.22;
      a.timer = setTimeout(tick, 16);
    };
    tick();
  }, []);

  const stepSize = () => {
    const sc = scrollerRef.current;
    if (!sc) return 0;
    const card = sc.querySelector('.work-card');
    return card ? card.getBoundingClientRect().width + 28 : sc.clientWidth * 0.7;
  };

  const nudge = (dir) => {
    const sc = scrollerRef.current;
    if (!sc) return;
    const base = animRef.current.timer ? animRef.current.target : sc.scrollLeft;
    animateTo(base + dir * stepSize());
  };

  React.useEffect(() => {
    if (!open) return;
    const sc = scrollerRef.current;
    if (!sc) return;
    sc.scrollLeft = 0;   // always start at the first card
    setTimeout(()=>{ if (scrollerRef.current) scrollerRef.current.scrollLeft = 0; }, 40);
    setTimeout(()=>{ if (scrollerRef.current) scrollerRef.current.scrollLeft = 0; }, 360);

    const onKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowRight") { e.preventDefault(); nudge(1); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); nudge(-1); }
    };

    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // native trackpad horizontal
      e.preventDefault();
      const base = animRef.current.timer ? animRef.current.target : sc.scrollLeft;
      animateTo(base + e.deltaY * 1.1);
    };

    const onScroll = () => {
      const max = sc.scrollWidth - sc.clientWidth;
      setProgress(max > 0 ? sc.scrollLeft / max : 0);
    };

    window.addEventListener("keydown", onKey);
    sc.addEventListener("wheel", onWheel, { passive:false });
    sc.addEventListener("scroll", onScroll, { passive:true });
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      sc.removeEventListener("wheel", onWheel);
      sc.removeEventListener("scroll", onScroll);
      if (animRef.current.timer) { clearTimeout(animRef.current.timer); animRef.current.timer = null; }
      document.body.style.overflow = prev;
    };
  }, [open, onClose, animateTo]);

  return (
    <React.Fragment>
      <div className={"work-bg " + (open ? "open" : "")} onClick={onClose}></div>
      <div className={"work-panel " + (open ? "open" : "")} role="dialog" aria-modal="true">
        <div className="head">
          <div>
            <h2 className="ttl">Selected work</h2>
            <div className="sub-row">
              <span className="sub">{projects.length} projects · 2022 — 2025</span>
              <span className="quip">could <i>BE</i> more selected.</span>
            </div>
          </div>
          <div className="head-controls">
            <button className="nav" onClick={()=>nudge(-1)} aria-label="Scroll left">{I.arrowL}</button>
            <button className="nav" onClick={()=>nudge(1)}  aria-label="Scroll right">{I.arrowR}</button>
            <button className="nav" onClick={onClose} aria-label="Close">{I.x}</button>
          </div>
        </div>

        <div className="scroller" ref={scrollerRef}>
          {projects.map((p, idx) => (
            <React.Fragment key={p.id}>
              {p.href ? (
                <a className="work-card is-link" href={p.href} style={{"--a": p.thumbA, "--b": p.thumbB}}>
                  <div className="img">
                    {p.thumb
                      ? <img className="work-thumb" src={p.thumb} alt={p.title} />
                      : <image-slot id={"work-"+p.id} placeholder={p.title}></image-slot>}
                    <div className="tag">{p.tag}</div>
                    <div className="ep">EP. {String(idx+1).padStart(2,"0")} · {p.year}</div>
                  </div>
                  <div className="body">
                    {p.episode && <div className="episode-tag">{p.episode}</div>}
                    <h4>{p.title}</h4>
                    <div className="meta"><b>{p.company}</b> · {p.role}</div>
                    <p className="out">{p.outcome}</p>
                    <div className="card-foot">
                      <span className="case">View case study →</span>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="work-card" style={{"--a": p.thumbA, "--b": p.thumbB}}>
                  <div className="img">
                    <image-slot id={"work-"+p.id} placeholder={p.title}></image-slot>
                    <div className="tag">{p.tag}</div>
                    <div className="ep">EP. {String(idx+1).padStart(2,"0")} · {p.year}</div>
                  </div>
                  <div className="body">
                    {p.episode && <div className="episode-tag">{p.episode}</div>}
                    <h4>{p.title}</h4>
                    <div className="meta"><b>{p.company}</b> · {p.role}</div>
                    <p className="out">{p.outcome}</p>
                    <div className="card-foot">
                      <span className="case case-soon">Case study coming soon</span>
                    </div>
                  </div>
                </div>
              )}
              {idx === 1 && (
                <div className="pivot-divider" aria-hidden="true">
                  <div className="word">PIVOT!</div>
                  <div className="sub">keep scrolling</div>
                </div>
              )}
              {idx === 2 && (
                <div className="pivot-divider" aria-hidden="true">
                  <div className="word">PIVOT!</div>
                  <div className="sub">I promise this is the last one</div>
                </div>
              )}
            </React.Fragment>
          ))}
          <div className="sofa" aria-hidden="true">
            <svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg">
              {/* Central Perk orange sofa silhouette */}
              <defs>
                <linearGradient id="sofaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#e85e3a"/>
                  <stop offset="1" stopColor="#a83a1f"/>
                </linearGradient>
                <linearGradient id="sofaHi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ff8b66"/>
                  <stop offset="1" stopColor="#e85e3a"/>
                </linearGradient>
              </defs>
              {/* back cushion */}
              <path d="M40 70 Q40 40 70 40 L290 40 Q320 40 320 70 L320 130 L40 130 Z" fill="url(#sofaHi)"/>
              {/* seat */}
              <path d="M20 130 Q20 120 32 120 L328 120 Q340 120 340 130 L340 180 Q340 195 325 195 L35 195 Q20 195 20 180 Z" fill="url(#sofaGrad)"/>
              {/* arm rests */}
              <rect x="20" y="100" width="34" height="95" rx="14" fill="#c84a2c"/>
              <rect x="306" y="100" width="34" height="95" rx="14" fill="#c84a2c"/>
              {/* cushion seams */}
              <line x1="180" y1="130" x2="180" y2="190" stroke="#8a2e18" strokeWidth="1.5" opacity=".5"/>
              <line x1="120" y1="48" x2="120" y2="125" stroke="#c84a2c" strokeWidth="1" opacity=".5"/>
              <line x1="240" y1="48" x2="240" y2="125" stroke="#c84a2c" strokeWidth="1" opacity=".5"/>
              {/* legs */}
              <rect x="40" y="195" width="10" height="14" rx="2" fill="#3a1a0d"/>
              <rect x="310" y="195" width="10" height="14" rx="2" fill="#3a1a0d"/>
            </svg>
          </div>
          <div className="fin-card">
            <div className="couch" aria-hidden="true">☕</div>
            <div className="fin-stamp">fin.</div>
            <h4>Let's discuss<br/>over a coffee.</h4>
            <p>If something here sparked an idea — or a question — I'd love to hear about it. The best conversations start away from the deck.</p>
            <a className="cta-light" href="mailto:work.snehabiradar@gmail.com">work.snehabiradar@gmail.com →</a>
            <div className="micro">we'll <b>BE</b> there for you.</div>
          </div>
        </div>

        <div className="scroll-hint">
          <span>scroll · or ← / → keys</span>
          <span className="bar"><span className="bar-fill" style={{width: (progress*100)+"%"}}></span></span>
          <span>esc to close</span>
        </div>
      </div>
    </React.Fragment>
  );
}

// — About Me scrapbook overlay —
function AboutOverlay({ open, onClose }) {
  React.useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    if (open) {
      window.addEventListener("keydown", h);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const notes = [
    { cls:"n-engineer", text:"engineer who\nwandered into design" },
    { cls:"n-psych",    text:"obsessed with how\npeople actually think" },
    { cls:"n-bake",     text:"bakes when she's\nstuck on a problem" },
    { cls:"n-friends",  text:"rewatches Friends\non loop — no skips" },
    { cls:"n-read",     text:"reads the same five\nbooks again & again" },
    { cls:"n-film",     text:"shoots on film,\nthinks in frames" },
    { cls:"n-nature",   text:"happiest outside,\nsun on her face" }
  ];

  return (
    <React.Fragment>
      <div className={"about-bg " + (open ? "open" : "")} onClick={onClose}></div>
      <div className={"about-stage " + (open ? "open" : "")} role="dialog" aria-modal="true" aria-label="About Sneha">
        <button className="about-x" onClick={onClose} aria-label="Close">{I.x}</button>

        <div className="about-board">
          <div className="about-title">
            <span className="hi">hi, i'm sneha</span>
            <span className="sub">— me, in the things i love</span>
          </div>

          <div className="about-photo">
            <span className="tape tape-tl"></span>
            <span className="tape tape-br"></span>
            <img src="assets/about-character.png" alt="Illustrated portrait of Sneha" />
          </div>

          {notes.map((n,i)=>(
            <div className={"about-note " + n.cls} key={i}>
              <span className="pin"></span>
              {n.text.split("\n").map((line,j)=><span className="ln" key={j}>{line}</span>)}
            </div>
          ))}

          <div className="about-sign">— S.</div>
        </div>

        <div className="about-hint">a little about me · esc to close</div>
      </div>
    </React.Fragment>
  );
}

// — Detail sheet (modal) —
function Sheet({ open, onClose, data }) {
  React.useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);
  return (
    <React.Fragment>
      <div className={"sheet-bg " + (open ? "open":"")} onClick={onClose}></div>
      <div className={"sheet " + (open ? "open":"")} role="dialog" aria-modal="true">
        <button className="x" onClick={onClose} aria-label="Close">{I.x}</button>
        {data && (
          <React.Fragment>
            <div className="kicker">{data.kicker}</div>
            <h2>{data.title}</h2>
            {(data.body || []).map((p,i)=><p key={i}>{p}</p>)}
            {data.list && (
              <ul style={{padding:0,margin:"6px 0 12px 18px",color:"var(--ink-soft)",fontSize:16,lineHeight:1.6}}>
                {data.list.map((li,i)=><li key={i}>{li}</li>)}
              </ul>
            )}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

// — Header + Hero —
function Header({ wordmarkWeight }) {
  return (
    <div className="topbar">
      <div className="wordmark" style={{fontWeight: wordmarkWeight}}>sneha</div>
      <a className="email" href="mailto:work.snehabiradar@gmail.com">work.snehabiradar@gmail.com</a>
    </div>
  );
}

function Hero({ data }) {
  return (
    <div className="hero">
      <div className="avatar">
        <img className="av-default" src="assets/Profile.gif" alt="" />
        <img className="av-hover" src="assets/annoying.gif" alt="" />
      </div>
      <div className="hero-text">
        <h1>{data.name}</h1>
        <p className="role">{data.role}</p>
        <p className="bio">{data.bio}</p>
        <p className="loc">{I.pin} {data.loc}</p>
      </div>
    </div>
  );
}

// — App —
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [activeCat, setActiveCat] = React.useState(null); // null = all
  const [sheet, setSheet] = React.useState(null);
  const [workOpen, setWorkOpen] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);

  React.useEffect(() => { applyPalette(t.palette); }, [t.palette]);

  // reopen the work overlay when arriving back from a case study (?work=1)
  React.useEffect(() => {
    if (typeof window !== "undefined" && /[?&#]work/.test(window.location.search + window.location.hash)) {
      setWorkOpen(true);
    }
  }, []);

  const profile = {
    name: "Sneha Biradar",
    role: "Product designer · researcher · strategist",
    bio: "Engineer turned designer. I design tech products through the lens of how people actually think, decide, and trust.",
    loc: "Bangalore, India"
  };

  // Card → categories mapping (used for pill filtering)
  const cardCats = {
    folder:   ["about"],
    role:     ["about","strategy","osource"],
    ethosOr:  ["approach","psychology"],
    img1:     ["about","baking"],
    img2:     ["about"],
    name:     ["about"],
    strategy: ["strategy","osource"],
    forest:   ["approach","psychology"],
    reading:  ["about"],
    writing:  ["approach","research","psychology"]
  };

  const sheetData = {
    folder: { kicker:"About", title:"Hi, I'm Sneha.",
      body:["Engineer turned designer. Most days I'm shaping how tech products communicate, decide, and behave — with a heavy bias toward how people actually think.",
            "I care about the psychology under the interface: attention, trust, decision fatigue, social proof, the small frictions that quietly compound. The work I'm proudest of started with a research question, not a Figma file."]
    },
    role: { kicker:"Current role", title:"Strategy & design at Outsource",
      body:["Helping Outsource grow a network of designers, developers and operators by making the brand more legible and the product behavior more intentional.",
            "Designing the connective tissue: voice, partnerships, decision systems, and the rituals that hold a remote team together."]
    },
    ethos: { kicker:"Approach", title:"I design for how people actually think.",
      body:["Most product problems are behavioral problems wearing a UI disguise. Before I touch a screen, I want to know what mental model the user already has, what they're trying to avoid, and where they're going to feel friction.",
            "The interesting work happens in that gap between what people say they want and how they actually behave."]
    },
    strategy: { kicker:"Strategy", title:"Strategy is just design with a deadline.",
      body:["I shape how brands and products show up — voice, look, direction, defaults. At Outsource that means being in the room where the trade-offs get made.",
            "Strategy without craft is a slide deck. Craft without strategy is a beautiful mess. The good work sits in between."]
    },
    forest: { kicker:"Philosophy", title:"Good design is a feeling, not a formula.",
      body:["The best products don't just look right — they feel right to use. That feeling is the residue of dozens of small psychological decisions: defaults, copy, latency, the order of options.",
            "I keep a running sketchbook of small, half-built things. Some become real. Most teach me what I didn't know I didn't know."]
    },
    writing: { kicker:"Writing", title:"Type of Culture",
      body:["Short essays on design, brand, and the psychology that runs under both.",
            "New issue when there's something honest to say."]
    },
    name: { kicker:"Etymology", title:"sneha — स्नेह",
      body:["In Sanskrit, sneha means affection, love — and also oil, the thing that keeps things moving. The same word for the soft and the structural.",
            "I like that the thing that holds something together and the thing that makes you love it can share a name."]
    },
    reading: { kicker:"Research shelf", title:"What I think with.",
      body:["A small set of books and papers I keep returning to — the ones that show up in how I scope problems, run research, and argue for defaults.",
            "I'll trade book recommendations all day."]
    }
  };

  const reading = [
    { title: "Thinking, Fast and Slow",   author: "Kahneman" },
    { title: "The Design of Everyday Things", author: "Norman" },
    { title: "Hooked",                     author: "Eyal" },
    { title: "Predictably Irrational",     author: "Ariely" },
    { title: "Don't Make Me Think",        author: "Krug" }
  ];

  const certText = {
    sealTop:"THE FRIENDS",
    sealMid:"REWATCH",
    sealBot:"CLUB",
    since:"est. every weekend",
    award:"Gold Medal,\nComfort Viewing",
    note:"10 seasons. no skips."
  };
  void certText;

  const isDim = (cardId) => {
    if (!activeCat) return false;
    return !cardCats[cardId].includes(activeCat);
  };

  const togglePill = (id) => {
    setActiveCat((cur) => cur === id ? null : id);
  };

  const openSheet = (key) => setSheet(sheetData[key]);

  return (
    <div className="wrap">
      <Header wordmarkWeight={t.wordmarkWeight} />
      <Hero data={profile} />

      <div className="pills">
        {t.pills.map((p, i) => (
          <Pill
            key={p.id}
            pill={p}
            active={activeCat === p.id}
            dim={activeCat && activeCat !== p.id}
            onClick={() => togglePill(p.id)}
          />
        ))}
      </div>

      <div className="grid">
        <CardBlueFolder onOpen={()=>setAboutOpen(true)} dim={isDim("folder")} />
        <CardCurrentRole onOpen={()=>openSheet("role")} dim={isDim("role")} data={{title:"Strategy at Outsource — building the network."}} />
        <CardEthosOrange dim={isDim("ethosOr")} count={t.projects.length} onOpen={()=>setWorkOpen(true)} />
        <CardImage
          id="img-friends-1"
          src="assets/friends-door.webp"
          objectPosition="38% 50%"
          caption="Could recite every line, still cries at the last episode. No regrets."
          dim={isDim("img1")}
          tall
          span="span-5"
        />

        <CardImage
          id="img-friends-2"
          src="assets/chandler.gif"
          hoverSrc="assets/chandler-hover.gif"
          dim={isDim("img2")}
          span="span-7"
        />
        <CardName onOpen={()=>openSheet("name")} dim={isDim("name")} />
        <CardStrategy
          onOpen={()=>openSheet("strategy")}
          dim={isDim("strategy")}
          data={{
            line:"Strategy is just design with a deadline.",
            body:"I shape how brands show up — their voice, their look, their direction. At Outsource, that means being in the room where the big decisions get made."
          }}
        />

        <CardEthosForest
          onOpen={()=>openSheet("forest")}
          dim={isDim("forest")}
          data={{
            line:"Good design is a feeling, not a formula.",
            body:"The best products feel right because of dozens of small psychological decisions — defaults, copy, latency, the order of options."
          }}
        />

        {t.showReading && (
          <CardCertificate dim={isDim("reading")} certText={certText} />
        )}

        {t.showWriting && (
          <CardWriting
            onOpen={()=>openSheet("writing")}
            dim={isDim("writing")}
            data={{
              title:"I write Type of Culture",
              body:"Where I think out loud about design, brand, and what makes things feel the way they do.",
              tags:["Brand","Design","Strategy","Culture"]
            }}
          />
        )}

      </div>

      <WorkOverlay open={workOpen} onClose={()=>setWorkOpen(false)} projects={t.projects} />
      <AboutOverlay open={aboutOpen} onClose={()=>setAboutOpen(false)} />

      <FooterMark weight={t.wordmarkWeight} />

      <Sheet open={!!sheet} onClose={()=>setSheet(null)} data={sheet} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakSelect
          label="Color set"
          value={t.palette}
          options={Object.keys(PALETTES)}
          onChange={(v)=>setTweak("palette", v)}
        />
        <TweakSection label="Wordmark" />
        <TweakRadio
          label="Weight"
          value={t.wordmarkWeight}
          options={[400, 700, 900]}
          onChange={(v)=>setTweak("wordmarkWeight", v)}
        />
        <TweakSection label="Cards" />
        <TweakToggle label="Reading shelf" value={t.showReading} onChange={(v)=>setTweak("showReading", v)} />
        <TweakToggle label="Writing card" value={t.showWriting} onChange={(v)=>setTweak("showWriting", v)} />

        <TweakSection label="Category pills — click ✎ to rename" />
        {t.pills.map((p, i) => (
          <TweakText
            key={p.id}
            label={p.id}
            value={p.label}
            onChange={(v)=>{
              const next = t.pills.slice();
              next[i] = { ...next[i], label: v };
              setTweak("pills", next);
            }}
          />
        ))}
      </TweaksPanel>
    </div>
  );
}

function FooterMark({ weight }) {
  return (
    <div>
      <div className="footer-mark">
        <img className="ava2" src="assets/footer-char.png" alt="" />
        <div className="big" style={{fontWeight: weight}}>sneha</div>
      </div>
      <div className="foot-meta">
        <span>© Sneha Biradar · 2026</span>
        <span>Bangalore → everywhere</span>
        <span>work.snehabiradar@gmail.com</span>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
