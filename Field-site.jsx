import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Menu, X, Search, ArrowRight, ArrowLeft, Play, Pause, BarChart3, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

/* ============================== DATA ============================== */

const CATEGORIES = ['テクノロジー', 'ビジネス', 'サイエンス', 'カルチャー'];

const ARTICLES = [
  {
    id: 'ai-work',
    category: 'テクノロジー',
    title: '生成AIは働き方をどう変えるか',
    dek: '実務にすぐ効く示唆を、5分で。',
    excerpt: '資料作成から意思決定まで、生成AIは業務のどこに効くのか。3社の事例から見えた共通点を整理する。',
    readTime: 6,
    date: '2026.07.28',
    body: [
      { type: 'p', text: '生成AIの導入は「試してみた」段階から「業務に組み込む」段階に移りつつある。だが実際に時間を生み出しているのは、派手な自動化ではなく、地味な下準備の圧縮だ。' },
      { type: 'image', caption: 'テクノロジー・概観' },
      { type: 'p', text: '資料のたたき台、議事録の要約、一次調査 —— いずれも「ゼロから作る」時間を「直す」時間に変える。この置き換えだけで、担当者の手元に戻ってくる時間は小さくない。' },
      {
        type: 'diagram', caption: '週あたりの業務時間(導入前後)', yLabel: '時間/週',
        series: [{ key: 'before', label: '導入前', color: '#d6d3d1' }, { key: 'after', label: '導入後', color: '#1c1917' }],
        data: [{ name: '資料作成', before: 8, after: 3 }, { name: '議事録', before: 4, after: 1 }, { name: '一次調査', before: 6, after: 3 }],
      },
      { type: 'p', text: '重要なのは、削減した時間をどこに再投資するかだ。取材した3社はいずれも、浮いた時間を「検証」と「対話」に振り向けていた。アウトプットの速度ではなく、判断の質が変わっている。' },
      { type: 'audio', caption: '音声解説', title: '編集部による3分解説' },
      { type: 'p', text: '一方で、導入がうまくいかない現場に共通するのは、既存の業務フローを変えずにツールだけを足していることだ。フローそのものを見直さない限り、時間は増えない。' },
      { type: 'video', caption: '現場取材', title: '導入企業への取材動画' },
      { type: 'quote', text: '速くなったのではなく、迷う時間が減った —— 導入企業の担当者の言葉が、この変化の本質を最もよく表している。' },
      { type: 'p', text: '生成AIが働き方を変えるのは、作業を代行するからではない。判断に使える時間を取り戻すからだ。' },
    ],
  },
  {
    id: 'remote-team',
    category: 'ビジネス',
    title: 'リモートチームの生産性を高める組織設計',
    dek: '「会わない」を前提にした仕組みづくり。',
    excerpt: '対面を前提にした慣習をそのまま持ち込むと、リモートチームは静かに機能不全に陥る。設計から見直す。',
    readTime: 5,
    date: '2026.07.22',
    body: [
      { type: 'p', text: 'リモートチームが失速する原因の多くは、怠慢ではなく設計の不在にある。誰が何を決めるか、誰がいつまでに返すかが曖昧なまま「とりあえずSlack」で回している組織は多い。' },
      { type: 'image', caption: 'ビジネス・概観' },
      { type: 'p', text: '機能していた組織に共通していたのは、意思決定の所在を明文化していたことだ。誰が最終決定者かが分かっていれば、非同期でも合意形成は止まらない。' },
      {
        type: 'diagram', caption: '意思決定までの日数(導入前後)', yLabel: '日数',
        series: [{ key: 'before', label: '導入前', color: '#d6d3d1' }, { key: 'after', label: '導入後', color: '#1c1917' }],
        data: [{ name: '小規模決定', before: 3, after: 1 }, { name: '中規模決定', before: 7, after: 3 }, { name: '大規模決定', before: 14, after: 8 }],
      },
      { type: 'p', text: '非同期を前提にすると、会議は「決めるため」ではなく「決まったことを深めるため」に使われるようになる。この順序が逆になっている組織ほど、会議は長く、決定は遅い。' },
      { type: 'p', text: 'リモートは自由度が高い分、構造がなければ簡単に崩れる。設計とは自由を制限することではなく、自由に機能するための土台をつくることだ。' },
    ],
  },
  {
    id: 'sleep-science',
    category: 'サイエンス',
    title: '睡眠の科学:質の高い休息をつくる方法',
    dek: '眠る時間より、眠り方を変える。',
    excerpt: '睡眠時間を削らずとも、眠りの質は設計できる。体内時計と光の使い方から見直す。',
    readTime: 7,
    date: '2026.07.15',
    body: [
      { type: 'p', text: '睡眠の質を左右するのは、寝る直前の行動よりも、起きてから最初の1時間の過ごし方だという研究が増えている。体内時計は「眠る合図」より「起きる合図」に強く反応する。' },
      { type: 'image', caption: 'サイエンス・概観' },
      { type: 'p', text: '特に影響が大きいのが光だ。起床後に浴びる光の量と、深い睡眠にかかる時間には明確な相関がある。' },
      {
        type: 'diagram', caption: '起床後の光量と深い睡眠時間', yLabel: '分',
        series: [{ key: 'value', label: '深い睡眠(分)', color: '#1c1917' }],
        data: [{ name: '明るい光', value: 92 }, { name: '普通の光', value: 74 }, { name: '暗いまま', value: 58 }],
      },
      { type: 'p', text: 'つまり「早く寝る」努力よりも「朝、正しく光を浴びる」設計の方が、費用対効果が高い。特にカーテンを開けて過ごす最初の10分は、体内時計への影響が大きい。' },
      { type: 'audio', caption: '研究者インタビュー', title: '睡眠研究者インタビュー(抜粋)' },
      { type: 'p', text: '睡眠は意志の力で改善するものではなく、環境の設計で改善するものだ。何時に寝るかより、朝どう過ごすかを変える方が、再現性が高い。' },
    ],
  },
  {
    id: 'focus-habits',
    category: 'カルチャー',
    title: '集中力を取り戻すための5つの習慣',
    dek: '「意志の弱さ」のせいにしない。',
    excerpt: '集中できないのは意志が弱いからではなく、環境が集中を妨げる設計になっているからだ。',
    readTime: 4,
    date: '2026.07.10',
    body: [
      { type: 'p', text: '集中力の低下を自己責任として語る言説は多いが、実際に効果があるのは精神論ではなく環境の調整だ。' },
      { type: 'image', caption: 'カルチャー・概観' },
      { type: 'p', text: '最も効果が確認されているのは、作業開始までの手数を減らすことだ。「始めるまでの摩擦」が1つ増えるごとに、着手率は目に見えて下がる。' },
      { type: 'audio', caption: '実践編', title: '5つの習慣を音声で解説' },
      { type: 'p', text: '通知を切る、机の上を減らす、開始の合図を決める —— 地味な工夫の積み重ねが、意志力よりずっと再現性の高い解決策になる。' },
      { type: 'p', text: '集中力は生まれつきの資質ではなく、環境によって毎回作り直されるものだ。' },
    ],
  },
  {
    id: 'startup-metrics',
    category: 'ビジネス',
    title: 'スタートアップの成長を支える指標設計',
    dek: '追う数字を減らすほど、速く進める。',
    excerpt: '指標が多すぎるチームほど、実は前に進むスピードが遅い。本当に見るべき数字はいくつあればいいのか。',
    readTime: 5,
    date: '2026.07.03',
    body: [
      { type: 'p', text: '成長期のチームがよく陥る罠は、指標を増やしすぎることだ。見るべき数字が10個あるチームは、実質的に「何も見ていない」チームと変わらない。' },
      { type: 'image', caption: 'ビジネス・概観' },
      {
        type: 'diagram', caption: '四半期ごとの主要指標の推移', yLabel: '成長率(%)',
        series: [{ key: 'value', label: '成長率', color: '#1c1917' }],
        data: [{ name: 'Q1', value: 12 }, { name: 'Q2', value: 18 }, { name: 'Q3', value: 31 }, { name: 'Q4', value: 45 }],
      },
      { type: 'p', text: '機能していたチームはどこも、四半期ごとに「今、本当に動かすべき1つの数字」を決め、それ以外は意図的に無視していた。' },
      { type: 'p', text: '指標設計とは、何を測るかではなく、何を測らないかを決める作業だ。' },
    ],
  },
  {
    id: 'minimalism-city',
    category: 'カルチャー',
    title: '都市を歩くように暮らす:ミニマリズムという選択',
    dek: '持たないことは、目的ではなく手段だ。',
    excerpt: 'モノを減らすことそのものは目的ではない。何のための余白か、を問い直す。',
    readTime: 4,
    date: '2026.06.28',
    body: [
      { type: 'p', text: 'ミニマリズムが誤解されるのは、それが「モノを減らす技術」として消費されるときだ。本質は、何にどれだけの注意を払うかを自分で決め直すことにある。' },
      { type: 'image', caption: 'カルチャー・概観' },
      { type: 'p', text: '都市を歩くとき、人は無数の選択肢の中から見るものを選び取っている。暮らしも同じで、余白があるほど、本当に見たいものが見えてくる。' },
      { type: 'p', text: '持たないことは目的ではない。何を持つかを、自分の意思で選び直すための手段だ。' },
    ],
  },
];

const HERO_VARIANTS = {
  A: { label: '特集を読む', style: 'filled' },
  B: { label: '5分で読む', style: 'outline' },
};

// 隠れた真の転換率(シミュレーション用)。Bがわずかに優れている、という想定。
const TRUE_RATES = { A: 0.06, B: 0.09 };
const EMPTY_EXPERIMENT = { A: { impressions: 0, conversions: 0 }, B: { impressions: 0, conversions: 0 } };

/* ============================== LOGIC ============================== */

async function loadHistory() {
  try {
    const res = await window.storage.get('user:view-history', false);
    return res ? JSON.parse(res.value) : [];
  } catch (e) {
    return [];
  }
}

async function saveHistory(history) {
  try {
    await window.storage.set('user:view-history', JSON.stringify(history), false);
  } catch (e) {
    /* 保存に失敗しても致命的ではないため無視 */
  }
}

async function loadExperiment() {
  try {
    const res = await window.storage.get('experiment:hero-cta', true);
    return res ? JSON.parse(res.value) : EMPTY_EXPERIMENT;
  } catch (e) {
    return EMPTY_EXPERIMENT;
  }
}

async function saveExperiment(stats) {
  try {
    await window.storage.set('experiment:hero-cta', JSON.stringify(stats), true);
  } catch (e) {
    /* 保存に失敗しても致命的ではないため無視 */
  }
}

// イプシロン・グリーディ方式のバンディットアルゴリズム。
// 実績が良い方の案を優先的に出しつつ、一定確率でもう一方も試し続ける。
function chooseVariant(stats) {
  if (stats.A.impressions === 0) return 'A';
  if (stats.B.impressions === 0) return 'B';
  const rateA = stats.A.conversions / stats.A.impressions;
  const rateB = stats.B.conversions / stats.B.impressions;
  if (Math.random() < 0.1) return Math.random() < 0.5 ? 'A' : 'B';
  return rateA >= rateB ? 'A' : 'B';
}

function simulateBatch(stats, n) {
  const next = { A: { ...stats.A }, B: { ...stats.B } };
  for (let i = 0; i < n; i++) {
    const v = chooseVariant(next);
    next[v] = { ...next[v], impressions: next[v].impressions + 1 };
    if (Math.random() < TRUE_RATES[v]) {
      next[v] = { ...next[v], conversions: next[v].conversions + 1 };
    }
  }
  return next;
}

function recordView(history, article) {
  const next = [...history, { id: article.id, category: article.category, ts: Date.now() }];
  return next.slice(-50);
}

// 閲覧履歴のカテゴリ傾向にもとづく簡易パーソナライズ。履歴がなければ null(呼び出し側でデフォルト順を使う)。
function getRecommendations(history, articles, currentId, count) {
  const viewedIds = new Set(history.map((h) => h.id));
  const categoryCounts = {};
  history.forEach((h) => {
    categoryCounts[h.category] = (categoryCounts[h.category] || 0) + 1;
  });
  const candidates = articles.filter((a) => a.id !== currentId && !viewedIds.has(a.id));
  if (history.length === 0) return candidates.slice(0, count || 3);
  return [...candidates]
    .sort((a, b) => (categoryCounts[b.category] || 0) - (categoryCounts[a.category] || 0))
    .slice(0, count || 3);
}

/* ============================== HOOKS ============================== */

function useInViewFade() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '80px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

/* ============================== SMALL PARTS ============================== */

function FigCaption({ figNum, label }) {
  return (
    <p className="mt-3 font-mono text-xs tracking-wider text-stone-500 uppercase">
      Fig.{String(figNum).padStart(2, '0')} — {label}
    </p>
  );
}

function ImageBlock({ figNum, caption }) {
  const [ref, inView] = useInViewFade();
  return (
    <figure
      ref={ref}
      className={`transition-opacity duration-500 motion-reduce:transition-none motion-reduce:opacity-100 ${inView ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="aspect-video bg-stone-100 border border-stone-200 flex items-center justify-center">
        <ImageIcon className="w-7 h-7 text-stone-300" strokeWidth={1} />
      </div>
      <FigCaption figNum={figNum} label={caption} />
    </figure>
  );
}

function DiagramBlock({ figNum, data, series, yLabel, caption }) {
  const [ref, inView] = useInViewFade();
  return (
    <figure
      ref={ref}
      className={`transition-opacity duration-500 motion-reduce:transition-none motion-reduce:opacity-100 ${inView ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="border border-stone-200 bg-white p-4 sm:p-6">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#78716c' }} axisLine={{ stroke: '#d6d3d1' }} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#78716c' }} axisLine={false} tickLine={false} width={32} />
            <Tooltip contentStyle={{ border: '1px solid #e7e5e4', borderRadius: 0, fontSize: 12 }} />
            {series.map((s) => (
              <Bar key={s.key} dataKey={s.key} name={s.label} fill={s.color} radius={[2, 2, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
        {series.length > 1 && (
          <div className="flex gap-5 mt-2 justify-center">
            {series.map((s) => (
              <span key={s.key} className="flex items-center gap-1.5 text-xs text-stone-500 font-mono">
                <span className="w-2.5 h-2.5 inline-block" style={{ backgroundColor: s.color }} />
                {s.label}
              </span>
            ))}
          </div>
        )}
        {yLabel && <p className="text-xs text-stone-400 mt-3 text-center">単位: {yLabel}</p>}
      </div>
      <FigCaption figNum={figNum} label={caption} />
    </figure>
  );
}

function AudioBlock({ figNum, caption, title }) {
  const [playing, setPlaying] = useState(false);
  const [ref, inView] = useInViewFade();
  return (
    <figure
      ref={ref}
      className={`transition-opacity duration-500 motion-reduce:transition-none motion-reduce:opacity-100 ${inView ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="border border-stone-200 bg-white p-5 flex items-center gap-4">
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? '一時停止' : '再生'}
          className="w-11 h-11 flex items-center justify-center bg-stone-900 text-white shrink-0 hover:bg-stone-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{title}</p>
          <p className="text-xs text-stone-400 mt-0.5">サンプル音声(ファイル未設定)</p>
          <div className="flex items-end gap-0.5 h-5 mt-2" aria-hidden="true">
            {Array.from({ length: 28 }).map((_, i) => (
              <span
                key={i}
                className={`w-1 bg-stone-300 ${playing ? 'animate-pulse' : ''}`}
                style={{ height: `${20 + ((i * 37) % 60)}%`, animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
      <FigCaption figNum={figNum} label={caption} />
    </figure>
  );
}

function VideoBlock({ figNum, caption, title }) {
  const [ref, inView] = useInViewFade();
  return (
    <figure
      ref={ref}
      className={`transition-opacity duration-500 motion-reduce:transition-none motion-reduce:opacity-100 ${inView ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="aspect-video bg-stone-900 border border-stone-200 relative flex items-center justify-center group cursor-pointer">
        <div className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center group-hover:bg-white group-hover:bg-opacity-10 transition-colors">
          <Play className="w-5 h-5 text-white ml-0.5" />
        </div>
        <span className="absolute bottom-3 left-3 text-white text-xs font-mono tracking-wider">{title}</span>
      </div>
      <p className="text-xs text-stone-400 mt-2">サンプル動画(ファイル未設定)</p>
      <FigCaption figNum={figNum} label={caption} />
    </figure>
  );
}

function PullQuote({ text }) {
  return (
    <blockquote className="border-l-2 border-stone-900 pl-6 py-1 my-2">
      <p className="text-xl sm:text-2xl font-medium leading-snug tracking-tight text-stone-900">{text}</p>
    </blockquote>
  );
}

function ArticleBody({ blocks }) {
  let fig = 0;
  return (
    <div className="space-y-7 text-stone-800 text-base sm:text-lg leading-relaxed">
      {blocks.map((b, i) => {
        if (b.type === 'p') return <p key={i}>{b.text}</p>;
        if (b.type === 'quote') return <PullQuote key={i} text={b.text} />;
        if (b.type === 'image') {
          fig++;
          return <ImageBlock key={i} figNum={fig} caption={b.caption} />;
        }
        if (b.type === 'diagram') {
          fig++;
          return <DiagramBlock key={i} figNum={fig} data={b.data} series={b.series} yLabel={b.yLabel} caption={b.caption} />;
        }
        if (b.type === 'audio') {
          fig++;
          return <AudioBlock key={i} figNum={fig} caption={b.caption} title={b.title} />;
        }
        if (b.type === 'video') {
          fig++;
          return <VideoBlock key={i} figNum={fig} caption={b.caption} title={b.title} />;
        }
        return null;
      })}
    </div>
  );
}

function ArticleCard({ article, onClick }) {
  const [ref, inView] = useInViewFade();
  return (
    <article
      ref={ref}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onClick();
      }}
      className={`group cursor-pointer transition-opacity duration-500 motion-reduce:transition-none motion-reduce:opacity-100 ${inView ? 'opacity-100' : 'opacity-0'} focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900`}
    >
      <div className="aspect-video bg-stone-100 border border-stone-200 flex items-center justify-center overflow-hidden group-hover:border-stone-400 transition-colors">
        <ImageIcon className="w-6 h-6 text-stone-300" strokeWidth={1} />
      </div>
      <p className="font-mono text-xs tracking-wider text-stone-500 uppercase mt-3">
        {article.category} · {article.readTime}分
      </p>
      <h3 className="text-xl font-bold tracking-tight mt-1 leading-snug group-hover:underline underline-offset-4">{article.title}</h3>
      <p className="text-stone-600 text-sm mt-2 leading-relaxed">{article.excerpt}</p>
    </article>
  );
}

function TopProgressBar({ state }) {
  const cls =
    state === 'loading'
      ? 'h-full bg-stone-900 w-2/3 transition-all duration-300'
      : state === 'done'
      ? 'h-full bg-stone-900 w-full transition-all duration-200'
      : 'h-full bg-stone-900 w-0';
  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-50">
      <div className={cls} />
    </div>
  );
}

function VariantRow({ label, name, style, stats, rate, allocation, leading }) {
  return (
    <div className={`p-4 border ${leading ? 'border-stone-900' : 'border-stone-200'}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`w-6 h-6 flex items-center justify-center text-xs font-mono shrink-0 ${
              style === 'filled' ? 'bg-stone-900 text-white' : 'border border-stone-900 text-stone-900'
            }`}
          >
            {label}
          </span>
          <span className="font-medium text-sm">{name}</span>
        </div>
        {leading && <span className="text-xs font-mono tracking-wider uppercase text-stone-900">優勢</span>}
      </div>
      <div className="grid grid-cols-4 gap-2 font-mono text-xs text-stone-500">
        <div>
          <span className="block text-stone-900 text-base">{stats.impressions}</span>表示
        </div>
        <div>
          <span className="block text-stone-900 text-base">{stats.conversions}</span>クリック
        </div>
        <div>
          <span className="block text-stone-900 text-base">{(rate * 100).toFixed(1)}%</span>転換率
        </div>
        <div>
          <span className="block text-stone-900 text-base">{allocation}%</span>配分
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, note }) {
  return (
    <div>
      <p className="text-2xl font-black tracking-tight">{value}</p>
      <p className="text-sm font-medium mt-1">{label}</p>
      <p className="text-xs text-stone-400 mt-1">{note}</p>
    </div>
  );
}

/* ============================== LAYOUT ============================== */

function Header({
  onNavigateHome,
  onNavigateInsights,
  onNavigateCategory,
  mobileMenuOpen,
  setMobileMenuOpen,
  searchOpen,
  setSearchOpen,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <header className="sticky top-0 z-40 bg-stone-50 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <button onClick={onNavigateHome} className="flex items-baseline gap-2 shrink-0 focus:outline-none">
          <span className="text-xl font-black tracking-tight">FIELD.</span>
          <span className="hidden md:inline text-xs font-mono text-stone-400">静かに、深く読む。</span>
        </button>
        <nav className="hidden md:flex items-center gap-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                onNavigateHome();
                onNavigateCategory(cat);
              }}
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              {cat}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center">
            {searchOpen ? (
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => {
                  if (!searchQuery) setSearchOpen(false);
                }}
                placeholder="検索…"
                className="border-b border-stone-300 bg-transparent text-sm px-1 py-1 w-36 focus:outline-none focus:border-stone-900"
              />
            ) : (
              <button onClick={() => setSearchOpen(true)} aria-label="検索を開く" className="text-stone-500 hover:text-stone-900">
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>
          <button onClick={onNavigateInsights} aria-label="サイト分析" className="hidden md:block text-stone-500 hover:text-stone-900">
            <BarChart3 className="w-4 h-4" />
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-stone-700" aria-label="メニューを開く">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-stone-50 px-4 sm:px-6 py-5 space-y-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                onNavigateHome();
                onNavigateCategory(cat);
                setMobileMenuOpen(false);
              }}
              className="block text-base font-medium text-stone-700"
            >
              {cat}
            </button>
          ))}
          <button
            onClick={() => {
              onNavigateInsights();
              setMobileMenuOpen(false);
            }}
            className="block text-base font-medium text-stone-700 pt-3 border-t border-stone-200 w-full text-left"
          >
            サイト分析
          </button>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="検索…"
            className="w-full border border-stone-300 text-sm px-3 py-2 mt-1 focus:outline-none focus:border-stone-900"
          />
        </div>
      )}
    </header>
  );
}

function Footer({ onNavigateInsights }) {
  return (
    <footer className="border-t border-stone-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm font-black tracking-tight">FIELD.</span>
        <p className="text-xs font-mono text-stone-400 tracking-wider text-center">© 2026 FIELD. — 本サイトはデモンストレーション用のテンプレートです。</p>
        <button
          onClick={onNavigateInsights}
          className="text-xs font-mono tracking-wider uppercase text-stone-400 hover:text-stone-700 underline underline-offset-4"
        >
          サイト分析を見る
        </button>
      </div>
    </footer>
  );
}

/* ============================== VIEWS ============================== */

function Hero({ featured, variant, onCtaClick }) {
  const cta = HERO_VARIANTS[variant];
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <p className="font-mono text-xs tracking-wider text-stone-500 uppercase mb-4">Eyebrow · 注目の記事</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none mb-6">{featured.title}</h1>
          <p className="text-lg text-stone-600 mb-8 max-w-md">{featured.dek}</p>
          <button
            onClick={onCtaClick}
            className={`inline-flex items-center gap-2 px-6 py-3 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 ${
              cta.style === 'filled' ? 'bg-stone-900 text-white hover:bg-stone-700' : 'border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white'
            }`}
          >
            {cta.label} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <ImageBlock figNum={1} caption={`${featured.category} · 概観`} />
      </div>
    </section>
  );
}

function RecommendedSection({ recommendations, onArticleClick }) {
  if (recommendations.length === 0) return null;
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 border-y border-stone-200">
      <p className="font-mono text-xs tracking-wider text-stone-500 uppercase mb-6">あなたの関心領域から</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {recommendations.slice(0, 3).map((a) => (
          <ArticleCard key={a.id} article={a} onClick={() => onArticleClick(a.id)} />
        ))}
      </div>
    </section>
  );
}

function HomeView({ variant, onCtaClick, onArticleClick, recommendations, hasHistory, searchQuery, categoryFilter, setCategoryFilter }) {
  const featured = ARTICLES[0];
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ARTICLES.filter(
      (a) =>
        a.id !== featured.id &&
        (categoryFilter === 'すべて' || a.category === categoryFilter) &&
        (q === '' || (a.title + a.category).toLowerCase().includes(q))
    );
  }, [categoryFilter, searchQuery, featured.id]);

  return (
    <>
      <Hero featured={featured} variant={variant} onCtaClick={onCtaClick} />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-4">
        <div className="flex items-center gap-2 flex-wrap border-b border-stone-200 pb-4">
          {['すべて', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`font-mono text-xs tracking-wider uppercase px-3 py-1.5 border transition-colors ${
                categoryFilter === cat ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 text-stone-500 hover:border-stone-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>
      {hasHistory && <RecommendedSection recommendations={recommendations} onArticleClick={onArticleClick} />}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <p className="font-mono text-xs tracking-wider text-stone-500 uppercase mb-6">{hasHistory ? 'すべての記事' : '注目の記事'}</p>
        {filtered.length === 0 ? (
          <p className="text-stone-500 py-16 text-center text-sm">該当する記事が見つかりません。</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filtered.map((a) => (
              <ArticleCard key={a.id} article={a} onClick={() => onArticleClick(a.id)} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function ArticleView({ article, onBack, recommendations, onArticleClick }) {
  return (
    <article className="pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-stone-500 hover:text-stone-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> 記事一覧に戻る
        </button>
        <p className="font-mono text-xs tracking-wider text-stone-500 uppercase mb-3">{article.category}</p>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-5">{article.title}</h1>
        <p className="text-lg text-stone-600 mb-6">{article.dek}</p>
        <div className="flex items-center gap-4 text-xs font-mono text-stone-500 uppercase tracking-wider pb-8 border-b border-stone-200">
          <span>編集部</span>
          <span>{article.date}</span>
          <span>{article.readTime}分</span>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10">
        <ArticleBody blocks={article.body} />
      </div>
      {recommendations.length > 0 && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 mt-4 border-t border-stone-200">
          <p className="font-mono text-xs tracking-wider text-stone-500 uppercase mb-6">次に読む</p>
          <div className="space-y-6">
            {recommendations.slice(0, 3).map((a) => (
              <button key={a.id} onClick={() => onArticleClick(a.id)} className="block text-left w-full group">
                <p className="font-mono text-xs tracking-wider text-stone-500 uppercase">
                  {a.category} · {a.readTime}分
                </p>
                <p className="text-lg font-bold tracking-tight group-hover:underline underline-offset-4">{a.title}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function InsightsView({ experiment, onSimulate, simLoading, onResetHistory, historyResetState, onResetExperiment, expResetState, historyCount }) {
  const rateA = experiment.A.impressions > 0 ? experiment.A.conversions / experiment.A.impressions : 0;
  const rateB = experiment.B.impressions > 0 ? experiment.B.conversions / experiment.B.impressions : 0;
  const totalImpressions = experiment.A.impressions + experiment.B.impressions;
  const leading = totalImpressions === 0 || rateA === rateB ? null : rateA > rateB ? 'A' : 'B';
  const allocA = totalImpressions > 0 ? Math.round((experiment.A.impressions / totalImpressions) * 100) : 50;
  const allocB = 100 - allocA;
  const chartData = [
    { name: 'A', rate: +(rateA * 100).toFixed(1) },
    { name: 'B', rate: +(rateB * 100).toFixed(1) },
  ];
  const steps = [
    { n: '01', label: 'Problem', desc: 'CTAのクリック率を最大化' },
    { n: '02', label: 'Plan', desc: '2案を比較' },
    { n: '03', label: 'Data', desc: `${totalImpressions}件を収集` },
    { n: '04', label: 'Analysis', desc: '転換率を算出' },
    { n: '05', label: 'Conclusion', desc: leading ? `${leading}案が優勢` : '判定待ち' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <p className="font-mono text-xs tracking-wider text-stone-500 uppercase mb-3">サイト分析</p>
      <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">実験ダッシュボード</h1>
      <p className="text-stone-600 max-w-xl mb-12">PPDACサイクルを自動で回し、ホームのCTAボタンを継続的に改善します。</p>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-stone-200 border border-stone-200 mb-12">
        {steps.map((step) => (
          <div key={step.n} className="bg-stone-50 p-4">
            <p className="font-mono text-xs text-stone-400">{step.n}</p>
            <p className="font-bold text-sm mt-1">{step.label}</p>
            <p className="text-xs text-stone-500 mt-1">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="border border-stone-200 p-6">
          <p className="font-mono text-xs tracking-wider text-stone-500 uppercase mb-4">Plan · 2案</p>
          <div className="space-y-4">
            <VariantRow label="A" name="特集を読む" style="filled" stats={experiment.A} rate={rateA} allocation={allocA} leading={leading === 'A'} />
            <VariantRow label="B" name="5分で読む" style="outline" stats={experiment.B} rate={rateB} allocation={allocB} leading={leading === 'B'} />
          </div>
          <button
            onClick={onSimulate}
            disabled={simLoading}
            className="mt-6 w-full flex items-center justify-center gap-2 border border-stone-300 py-2.5 text-sm font-medium hover:border-stone-900 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${simLoading ? 'animate-spin' : ''}`} />
            {simLoading ? '処理中…' : 'トラフィックをシミュレート(+50件)'}
          </button>
          <p className="text-xs text-stone-400 mt-2">実際の来訪データに、疑似的な来訪をバッチで追加し、学習の収束を確認できます。</p>
        </div>

        <div className="border border-stone-200 p-6">
          <p className="font-mono text-xs tracking-wider text-stone-500 uppercase mb-4">Analysis · 転換率</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#78716c' }} axisLine={{ stroke: '#d6d3d1' }} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#78716c' }} axisLine={false} tickLine={false} unit="%" width={36} />
              <Tooltip contentStyle={{ border: '1px solid #e7e5e4', borderRadius: 0, fontSize: 12 }} />
              <Bar dataKey="rate" radius={[2, 2, 0, 0]}>
                <Cell fill="#1c1917" />
                <Cell fill="#a8a29e" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-stone-400 mt-4">
            {totalImpressions < 20 ? 'データが少ないため、探索(ランダム表示)の比率を高めに維持しています。' : `現在の配分 — A: ${allocA}% / B: ${allocB}%(成績の良い案を自動的に優先)`}
          </p>
        </div>
      </div>

      <div className="border border-stone-200 p-6 mb-12">
        <p className="font-mono text-xs tracking-wider text-stone-500 uppercase mb-6">パフォーマンス指標(目安)</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <MetricCard label="初期表示" value="瞬時" note="外部フォント・重量級ライブラリ不使用" />
          <MetricCard label="画像読込" value="遅延" note="画面内に入ってから読込" />
          <MetricCard label="レイアウトずれ" value="ほぼ0" note="画像枠を事前確保" />
          <MetricCard label="ページ遷移" value="即時" note="サーバー往復なし" />
        </div>
        <p className="text-xs text-stone-400 mt-6">※実測のLighthouseスコアではなく、実装した最適化施策に基づく目安です。</p>
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs">
        <button
          onClick={onResetHistory}
          className="font-mono tracking-wider uppercase text-stone-400 hover:text-stone-700 underline underline-offset-4"
        >
          {historyResetState === 'confirm' ? 'もう一度押すと閲覧履歴を消去します' : `閲覧履歴をリセット(${historyCount}件)`}
        </button>
        <span className="text-stone-300">/</span>
        <button
          onClick={onResetExperiment}
          className="font-mono tracking-wider uppercase text-stone-400 hover:text-stone-700 underline underline-offset-4"
        >
          {expResetState === 'confirm' ? 'もう一度押すと実験データ(共有)を消去します' : '実験データをリセット(共有)'}
        </button>
      </div>
    </div>
  );
}

/* ============================== APP ============================== */

export default function App() {
  const [view, setView] = useState('home');
  const [currentArticleId, setCurrentArticleId] = useState(null);
  const [history, setHistory] = useState([]);
  const [experiment, setExperiment] = useState(EMPTY_EXPERIMENT);
  const [variant, setVariant] = useState('A');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('すべて');
  const [barState, setBarState] = useState('idle');
  const [simLoading, setSimLoading] = useState(false);
  const [historyResetState, setHistoryResetState] = useState('idle');
  const [expResetState, setExpResetState] = useState('idle');

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [h, stats] = await Promise.all([loadHistory(), loadExperiment()]);
      if (!mounted) return;
      setHistory(h);
      const v = chooseVariant(stats);
      const nextStats = { ...stats, [v]: { ...stats[v], impressions: stats[v].impressions + 1 } };
      setExperiment(nextStats);
      setVariant(v);
      saveExperiment(nextStats);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const currentArticle = useMemo(() => ARTICLES.find((a) => a.id === currentArticleId) || null, [currentArticleId]);
  const recommendations = useMemo(() => getRecommendations(history, ARTICLES, currentArticleId, 3), [history, currentArticleId]);

  const navigateTo = useCallback((nextView, articleId) => {
    setBarState('loading');
    setMobileMenuOpen(false);
    if (nextView === 'article' && articleId) {
      const article = ARTICLES.find((a) => a.id === articleId);
      if (article) {
        setHistory((prev) => {
          const next = recordView(prev, article);
          saveHistory(next);
          return next;
        });
      }
    }
    setView(nextView);
    setCurrentArticleId(articleId || null);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    setBarState('done');
    setTimeout(() => setBarState('idle'), 300);
  }, []);

  const handleCtaClick = useCallback(() => {
    setExperiment((prev) => {
      const next = { ...prev, [variant]: { ...prev[variant], conversions: prev[variant].conversions + 1 } };
      saveExperiment(next);
      return next;
    });
    navigateTo('article', 'ai-work');
  }, [variant, navigateTo]);

  const handleSimulate = useCallback(() => {
    setSimLoading(true);
    setTimeout(() => {
      setExperiment((prev) => {
        const next = simulateBatch(prev, 50);
        saveExperiment(next);
        return next;
      });
      setSimLoading(false);
    }, 450);
  }, []);

  const handleResetHistory = useCallback(() => {
    setHistoryResetState((prevState) => {
      if (prevState !== 'confirm') {
        setTimeout(() => setHistoryResetState('idle'), 3000);
        return 'confirm';
      }
      setHistory([]);
      saveHistory([]);
      return 'idle';
    });
  }, []);

  const handleResetExperiment = useCallback(() => {
    setExpResetState((prevState) => {
      if (prevState !== 'confirm') {
        setTimeout(() => setExpResetState('idle'), 3000);
        return 'confirm';
      }
      setExperiment(EMPTY_EXPERIMENT);
      saveExperiment(EMPTY_EXPERIMENT);
      return 'idle';
    });
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <TopProgressBar state={barState} />
      <Header
        onNavigateHome={() => navigateTo('home')}
        onNavigateInsights={() => navigateTo('insights')}
        onNavigateCategory={(cat) => setCategoryFilter(cat)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main>
        {view === 'home' && (
          <HomeView
            variant={variant}
            onCtaClick={handleCtaClick}
            onArticleClick={(id) => navigateTo('article', id)}
            recommendations={recommendations}
            hasHistory={history.length > 0}
            searchQuery={searchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
        )}
        {view === 'article' && currentArticle && (
          <ArticleView article={currentArticle} onBack={() => navigateTo('home')} recommendations={recommendations} onArticleClick={(id) => navigateTo('article', id)} />
        )}
        {view === 'insights' && (
          <InsightsView
            experiment={experiment}
            onSimulate={handleSimulate}
            simLoading={simLoading}
            onResetHistory={handleResetHistory}
            historyResetState={historyResetState}
            onResetExperiment={handleResetExperiment}
            expResetState={expResetState}
            historyCount={history.length}
          />
        )}
      </main>
      <Footer onNavigateInsights={() => navigateTo('insights')} />
    </div>
  );
}
