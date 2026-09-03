import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  ArrowRight, Sparkles, Compass, Bookmark, History, User, Home,
  Search, X, Check, Plus, ChevronRight, ChevronLeft, BookOpen,
  TrendingUp, Target, Lightbulb, Wrench, Star, ExternalLink,
  Sun, ArrowLeft, Info
} from "lucide-react";

const POOL = [
  { id: "t1", title: "Local-first apps are quietly rewriting how software gets built", category: "Technology", tags: ["Technology", "Developer", "Software"], blurb: "A growing number of teams are designing apps that work fully offline and sync later, instead of depending on a constant connection to a server.", source: "Ars Technica" },
  { id: "t2", title: "Small AI models are starting to outperform giant ones on narrow tasks", category: "AI", tags: ["AI", "Technology", "Developer"], blurb: "Researchers are finding that a focused model trained on the right data can beat a much larger general model at specific jobs, using a fraction of the compute.", source: "MIT Technology Review" },
  { id: "t3", title: "Why more teams are choosing boring technology on purpose", category: "Technology", tags: ["Technology", "Developer", "Business"], blurb: "A popular engineering philosophy argues that picking dependable, well-understood tools — instead of the newest ones — is what actually lets teams move fast.", source: "InfoQ" },
  { id: "d1", title: "Museums are redesigning galleries around how people actually walk", category: "Design", tags: ["Design", "Architecture", "Art"], blurb: "New exhibition design research tracks visitor movement to figure out where people slow down, rush past, or get lost — and reshapes layouts around it.", source: "Dezeen" },
  { id: "d2", title: "The return of texture: why flat design is losing ground", category: "Design", tags: ["Design", "Technology"], blurb: "After a decade of flat, minimal interfaces, designers are bringing back depth, grain and tactile detail to make digital products feel less sterile.", source: "Smashing Magazine" },
  { id: "a1", title: "Timber high-rises are becoming a serious answer to concrete", category: "Architecture", tags: ["Architecture", "Sustainability", "Design"], blurb: "Engineered wood is now strong enough for mid-rise buildings, and it stores carbon instead of releasing it — cities are starting to change their codes to allow it.", source: "Architectural Digest" },
  { id: "a2", title: "The 15-minute city idea is being tested block by block", category: "Architecture", tags: ["Architecture", "Sustainability", "Business"], blurb: "Planners are studying whether reshaping single neighborhoods — not whole cities — around walkable amenities actually changes how people live.", source: "CityLab" },
  { id: "a3", title: "What courtyard housing from 2,000 years ago can teach modern cooling design", category: "Architecture", tags: ["Architecture", "Sustainability"], blurb: "As heat waves strain air conditioning grids, architects are revisiting ancient courtyard layouts that cool buildings using airflow and shade alone.", source: "Dezeen" },
  { id: "b1", title: "Subscription fatigue is changing how startups price their products", category: "Business", tags: ["Business", "Entrepreneur", "Marketing"], blurb: "As customers cancel overlapping subscriptions, more companies are testing usage-based pricing instead of flat monthly fees.", source: "Harvard Business Review" },
  { id: "b2", title: "Why some founders are deliberately staying small", category: "Business", tags: ["Business", "Entrepreneur"], blurb: "A wave of profitable, single-founder software companies is challenging the assumption that growth always means hiring and raising money.", source: "Indie Hackers" },
  { id: "m1", title: "Search is splitting in two: answers versus links", category: "Marketing", tags: ["Marketing", "Business", "Technology"], blurb: "As AI answer engines summarize results directly, marketers are rethinking what it even means to rank on a search page.", source: "Marketing Week" },
  { id: "m2", title: "Short-form video fatigue may be opening a lane for longer content", category: "Marketing", tags: ["Marketing", "Content creator", "Business"], blurb: "Some creators report stronger engagement returning to longer videos and posts, as audiences grow tired of endless short clips.", source: "Digiday" },
  { id: "f1", title: "What the shift toward real interest rates means for savers", category: "Finance", tags: ["Finance", "Business"], blurb: "After years of near-zero returns, ordinary savings accounts are paying enough that financial planners are rethinking basic advice.", source: "The Economist" },
  { id: "sci1", title: "A simpler theory is gaining ground for why we sleep", category: "Science", tags: ["Science", "Health", "Psychology"], blurb: "New research suggests sleep's main job may be clearing metabolic waste from the brain, reframing decades of theories about memory and rest.", source: "Nature News" },
  { id: "sci2", title: "Lab-grown materials are starting to replace mined ones", category: "Science", tags: ["Science", "Sustainability", "Technology"], blurb: "Companies are growing materials like leather-alternatives and construction aggregates from bacteria and fungi instead of extracting them.", source: "Scientific American" },
  { id: "h1", title: "Short walks after meals may matter more than long workouts", category: "Health", tags: ["Health", "Science"], blurb: "Several small studies now suggest a 10-minute walk after eating does more for blood sugar control than a single longer workout later in the day.", source: "Harvard Health" },
  { id: "p1", title: "The 'planning fallacy' explains why every project runs late", category: "Psychology", tags: ["Psychology", "Productivity", "Business"], blurb: "Decades of research show people reliably underestimate how long tasks take — even when they know about the bias and try to correct for it.", source: "Psychology Today" },
  { id: "p2", title: "Why decision fatigue is worse in the afternoon", category: "Psychology", tags: ["Psychology", "Productivity", "Health"], blurb: "Studies of judges, doctors and shoppers find decision quality reliably drops as the day goes on, regardless of how rested people feel.", source: "The Atlantic" },
  { id: "w1", title: "Editors say the best writing advice is still 'cut it in half'", category: "Writing", tags: ["Writing", "Content creator", "Education"], blurb: "A survey of longtime magazine editors finds the most common note they give is still about length, not style.", source: "Poynter" },
  { id: "sus1", title: "Repair cafés are turning into a real economic model", category: "Sustainability", tags: ["Sustainability", "Business", "Design"], blurb: "Volunteer-run repair events are inspiring paid repair businesses, as new 'right to repair' laws make spare parts easier to get.", source: "Fast Company" },
  { id: "art1", title: "AI image tools are pushing illustrators toward process, not just output", category: "Art", tags: ["Art", "Design", "Content creator"], blurb: "Some illustrators are responding to generative tools by publishing their sketch process and reasoning, not just finished images, as the differentiator.", source: "It's Nice That" },
  { id: "mus1", title: "Vinyl's comeback has quietly outgrown nostalgia", category: "Music", tags: ["Music", "Business", "Art"], blurb: "Vinyl sales are now driven mostly by listeners under 35, and labels are treating it as a real format again rather than a collector's novelty.", source: "Rolling Stone" },
  { id: "edu1", title: "Mastery-based grading is spreading beyond pilot schools", category: "Education", tags: ["Education", "Student", "Psychology"], blurb: "More schools are letting students retake assessments until they show mastery, instead of averaging every attempt into one grade.", source: "Chalkbeat" },
  { id: "pr1", title: "The two-list method for prioritizing tasks, explained", category: "Productivity", tags: ["Productivity", "Business", "Professional"], blurb: "A simple technique — write 25 goals, circle your top 5, actively avoid the other 20 — keeps resurfacing in productivity research as unusually effective.", source: "James Clear" },
  { id: "dev1", title: "Why more teams are shipping without a staging environment", category: "Developer", tags: ["Developer", "Technology", "Business"], blurb: "Feature flags and fast rollbacks are letting some teams test directly in production safely, cutting out a slow, expensive middle step.", source: "The Pragmatic Engineer" },
  { id: "dev2", title: "Type checkers are becoming the default, even for small scripts", category: "Developer", tags: ["Developer", "Technology"], blurb: "Lightweight static type tools are spreading from large codebases into small personal projects, as editors make the extra syntax nearly invisible.", source: "Real Python" },
  { id: "gen1", title: "The 'weak tie' theory of why new ideas rarely come from close friends", category: "Curiosity", tags: ["Psychology", "Business", "Curiosity"], blurb: "Classic sociology research keeps being reconfirmed: job leads, new ideas and opportunities disproportionately come from casual acquaintances, not close friends.", source: "The Atlantic" },
  { id: "gen2", title: "Why airports are quietly some of the best-tested design labs", category: "Curiosity", tags: ["Design", "Architecture", "Curiosity"], blurb: "With millions of stressed, time-pressured users a year, airports iterate on wayfinding and signage faster than almost any other public space.", source: "99% Invisible" },
  { id: "gen3", title: "The surprising origin of the 'move fast and break things' motto", category: "Curiosity", tags: ["Business", "Technology", "Curiosity"], blurb: "The phrase's own history is messier than its reputation — and the person who coined it has spent years publicly walking it back.", source: "Wired" },
  { id: "biz3", title: "Why more consultants are packaging advice as software instead of hours", category: "Business", tags: ["Business", "Entrepreneur", "Professional"], blurb: "Independent consultants are turning repeatable advice into small paid tools, trading hourly billing for a product that scales without more of their time.", source: "Harvard Business Review" },
  { id: "des3", title: "Why grid systems are making a comeback in web design", category: "Design", tags: ["Design", "Developer", "Technology"], blurb: "After years of freeform layouts, designers are returning to strict underlying grids, arguing constraint is what made mid-century print design age well.", source: "Smashing Magazine" },
  { id: "arch4", title: "Daylighting design is being treated as a health feature, not decoration", category: "Architecture", tags: ["Architecture", "Health", "Design"], blurb: "New office and school designs are prioritizing natural light exposure as a measurable wellbeing factor, backed by circadian-rhythm research.", source: "Architectural Digest" },
  { id: "sci3", title: "A quiet rethink of how much protein people actually need", category: "Science", tags: ["Science", "Health"], blurb: "Newer studies are questioning long-standing protein intake guidelines, suggesting needs vary far more by activity level and age than older charts assumed.", source: "Scientific American" },
  { id: "fin2", title: "Why 'boring' index investing keeps winning the long game", category: "Finance", tags: ["Finance", "Business"], blurb: "Another decade of data shows most actively managed funds still underperform simple low-cost index funds after fees.", source: "The Economist" },
];

const CATEGORY_TIMELY = {
  Technology: "Moving fast this month", AI: "Shifting week to week", Design: "Trending right now",
  Architecture: "Gaining traction this season", Business: "Active discussion this week", Marketing: "Shifting fast this quarter",
  Finance: "Relevant this earnings season", Science: "New this month", Health: "Recently updated guidance",
  Psychology: "Getting renewed attention", Writing: "Worth acting on now", Sustainability: "Accelerating this year",
  Art: "Fresh this week", Music: "Trending this month", Education: "Rolling out this term",
  Productivity: "Useful to start today", Developer: "Shipping-relevant this week", Curiosity: "A good one for today",
};

function pseudoCount(id, min, max) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) % 9973;
  return min + (hash % (max - min));
}

function simplify(blurb) {
  const first = blurb.split(/(?<=[.!?])\s/)[0];
  return first.length > 20 ? first : blurb;
}

const SOURCE_URLS = {
  "Ars Technica": "https://arstechnica.com", "MIT Technology Review": "https://www.technologyreview.com",
  "InfoQ": "https://www.infoq.com", "Dezeen": "https://www.dezeen.com", "Smashing Magazine": "https://www.smashingmagazine.com",
  "Architectural Digest": "https://www.architecturaldigest.com", "CityLab": "https://www.bloomberg.com/citylab",
  "Harvard Business Review": "https://hbr.org", "Indie Hackers": "https://www.indiehackers.com",
  "Marketing Week": "https://www.marketingweek.com", "Digiday": "https://digiday.com", "The Economist": "https://www.economist.com",
  "Nature News": "https://www.nature.com/news", "Scientific American": "https://www.scientificamerican.com",
  "Harvard Health": "https://www.health.harvard.edu", "Psychology Today": "https://www.psychologytoday.com",
  "The Atlantic": "https://www.theatlantic.com", "Poynter": "https://www.poynter.org", "Fast Company": "https://www.fastcompany.com",
  "It's Nice That": "https://www.itsnicethat.com", "Rolling Stone": "https://www.rollingstone.com",
  "Chalkbeat": "https://www.chalkbeat.org", "James Clear": "https://jamesclear.com",
  "The Pragmatic Engineer": "https://newsletter.pragmaticengineer.com", "Real Python": "https://realpython.com",
  "99% Invisible": "https://99percentinvisible.org", "Wired": "https://www.wired.com",
};

const ROLE_OPTIONS = ["Student", "Entrepreneur", "Designer", "Developer", "Professional", "Content creator", "Other"];
const INTEREST_OPTIONS = ["Technology", "AI", "Design", "Architecture", "Business", "Marketing", "Finance", "Science", "Health", "Psychology", "Writing", "Sustainability", "Art", "Music", "Education", "Productivity"];
const SKILL_SUGGESTIONS = ["Public speaking", "Writing", "Coding", "Leadership", "Design thinking", "Data analysis", "Negotiation", "Time management", "Sketching", "Financial literacy"];
const TOPIC_SUGGESTIONS = ["AI developments", "Startup news", "Design trends", "Climate solutions", "Productivity methods", "Architecture", "Health research", "Creative tools"];

function seededShuffle(arr, seed) {
  const a = [...arr]; let s = seed;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function whyRelevant(item, profile) {
  const field = profile.field?.trim();
  if (field && item.tags.some(t => t.toLowerCase() === field.toLowerCase())) return `Matches your field: ${field}.`;
  const matchedInterest = profile.interests.find(i => item.tags.includes(i));
  if (matchedInterest) return `You said you're interested in ${matchedInterest.toLowerCase()}.`;
  const matchedSkill = profile.skills.find(s => item.tags.some(t => s.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(s.toLowerCase())));
  if (matchedSkill) return `Related to a skill you're building: ${matchedSkill}.`;
  const matchedTopic = profile.topics.find(t => item.tags.some(tag => t.toLowerCase().includes(tag.toLowerCase()) || tag.toLowerCase().includes(t.toLowerCase())));
  if (matchedTopic) return `Connects to a topic you're following: ${matchedTopic}.`;
  return "A useful discovery outside your usual areas, picked to broaden your day.";
}

function dayNumber(offsetFromToday = 0) { return Math.floor(Date.now() / 86400000) - offsetFromToday; }

function buildDayFeed(profile, absoluteDay) {
  const interestSet = new Set([...profile.interests, profile.field].filter(Boolean));
  const inField = POOL.filter(i => i.tags.some(t => interestSet.has(t)));
  const outField = POOL.filter(i => !i.tags.some(t => interestSet.has(t)));
  const skillMatches = POOL.filter(i => profile.skills.some(s => i.tags.some(t => s.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(s.toLowerCase()))));
  const topicMatches = POOL.filter(i => profile.topics.some(t => i.tags.some(tag => t.toLowerCase().includes(tag.toLowerCase()) || tag.toLowerCase().includes(t.toLowerCase()))));
  const seed = 1000 + absoluteDay * 37;
  const inShuf = seededShuffle(inField.length ? inField : POOL, seed);
  const outShuf = seededShuffle(outField.length ? outField : POOL, seed + 7);
  const skillShuf = seededShuffle(skillMatches.length ? skillMatches : POOL, seed + 13);
  const topicShuf = seededShuffle(topicMatches.length ? topicMatches : POOL, seed + 19);
  const allShuf = seededShuffle(POOL, seed + 29);
  const used = new Set();
  const take = (arr, n) => { const out = []; for (const item of arr) { if (out.length >= n) break; if (used.has(item.id)) continue; used.add(item.id); out.push(item); } return out; };
  const ratio = typeof profile.curveballRatio === "number" ? profile.curveballRatio : 30;
  const outCount = Math.max(1, Math.min(5, Math.round((ratio / 100) * 6)));
  const fieldCount = 6 - outCount;
  return {
    learnToday: take(inShuf, 3), whatsNew: take(allShuf, 3), yourField: take(inShuf, fieldCount),
    skillBuilder: take(skillShuf, 3), usefulDiscovery: take(outShuf, outCount),
    recommended: take(topicShuf.length ? topicShuf : allShuf, 3),
  };
}

const SECTION_META = {
  learnToday: { title: "Learn today", icon: BookOpen, desc: "Fresh ideas in your field, picked for today" },
  whatsNew: { title: "What's new", icon: TrendingUp, desc: "Developments worth knowing about" },
  yourField: { title: "Your field", icon: Target, desc: "Closest to what you do" },
  skillBuilder: { title: "Skill builder", icon: Wrench, desc: "Aimed at the skills you're improving" },
  usefulDiscovery: { title: "Useful discovery", icon: Lightbulb, desc: "Outside your usual areas, on purpose" },
  recommended: { title: "Recommended for you", icon: Star, desc: "Matched to the topics you follow" },
};

function Chip({ label, selected, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: "8px 14px", borderRadius: 999, border: selected ? "1.5px solid #1C1B18" : "1.5px solid #E4E0D4", background: selected ? "#1C1B18" : "#FFFFFF", color: selected ? "#F7F6F2" : "#4A4840", fontSize: 14, fontFamily: "Inter, sans-serif", cursor: "pointer", transition: "all 0.15s ease", whiteSpace: "nowrap" }}>
      {label}
    </button>
  );
}

function ChipMultiSelect({ options, selected, onToggle, onAddCustom }) {
  const [custom, setCustom] = useState("");
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {options.map(opt => (<Chip key={opt} label={opt} selected={selected.includes(opt)} onClick={() => onToggle(opt)} />))}
        {selected.filter(s => !options.includes(s)).map(opt => (<Chip key={opt} label={opt} selected onClick={() => onToggle(opt)} />))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input value={custom} onChange={e => setCustom(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && custom.trim()) { onAddCustom(custom.trim()); setCustom(""); } }} placeholder="Add your own" style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1.5px solid #E4E0D4", fontSize: 14, fontFamily: "Inter, sans-serif", outline: "none" }} />
        <button onClick={() => { if (custom.trim()) { onAddCustom(custom.trim()); setCustom(""); } }} style={{ width: 40, height: 40, borderRadius: 10, border: "1.5px solid #E4E0D4", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} aria-label="Add">
          <Plus size={18} color="#4A4840" />
        </button>
 
