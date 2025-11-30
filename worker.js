// 域名映射配置
const domain_mappings = {
  'github.com': 'gh.',
  'avatars.githubusercontent.com': 'avatars-githubusercontent-com.',
  'github.githubassets.com': 'github-githubassets-com.',
  'collector.github.com': 'collector-github-com.',
  'api.github.com': 'api-github-com.',
  'raw.githubusercontent.com': 'raw-githubusercontent-com.',
  'gist.githubusercontent.com': 'gist-githubusercontent-com.',
  'github.io': 'github-io.',
  'assets-cdn.github.com': 'assets-cdn-github-com.',
  'cdn.jsdelivr.net': 'cdn.jsdelivr-net.',
  'securitylab.github.com': 'securitylab-github-com.',
  'www.githubstatus.com': 'www-githubstatus-com.',
  'npmjs.com': 'npmjs-com.',
  'git-lfs.github.com': 'git-lfs-github-com.',
  'githubusercontent.com': 'githubusercontent-com.',
  'github.global.ssl.fastly.net': 'github-global-ssl-fastly-net.',
  'api.npms.io': 'api-npms-io.',
  'github.community': 'github-community.'
};

// 需要重定向的路径（此列表不再对外站重定向，交由下方“自制页面逻辑”处理）
const redirect_paths = []; // ['/', '/login', '/signup', '/copilot'];

// ===== 自制 403 页面=====
const HTML_403 = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>403 Forbidden</title>
<meta name="turbo-cache-control" content="no-cache">
<meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate, max-age=0">
<meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Expires" content="0">
<style>
  :root{
    color-scheme:dark light;
    --bg-top:#0f141b; --bg-btm:#0b1118;
    --grid:rgba(255,255,255,.045);
    --noise:rgba(255,255,255,.08);
    --card:#101620; --line:#1f2732;
    --fg:#e6eaf1; --mut:#9aa6b2;
    --pri1:#3b82f6; --pri2:#06b6d4;
    --ring:0 14px 40px rgba(59,130,246,.28);
    --accent:#7dd3fc;
  }
  @media (prefers-color-scheme:light){
    :root{
      --bg-top:#e9edf5; --bg-btm:#e5eaf2; --grid:rgba(0,0,0,.06); --noise:rgba(0,0,0,.08);
      --card:#ffffff; --line:#e6e9ef; --fg:#0f172a; --mut:#617089; --ring:0 14px 34px rgba(59,130,246,.16);
      --accent:#3b82f6;
    }
  }
  *{box-sizing:border-box}
  html,body{height:100%}
  body{
    margin:0;display:grid;place-items:center;padding:24px;
    background:
      radial-gradient(70% 55% at 12% -10%, rgba(59,130,246,.14), transparent 65%),
      radial-gradient(55% 45% at 108% 12%, rgba(6,182,212,.12), transparent 65%),
      linear-gradient(180deg,var(--bg-top),var(--bg-btm));
    color:var(--fg);
    font:15px/1.6 ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,"PingFang SC","Microsoft YaHei","Noto Sans",sans-serif;
    overflow:hidden;
  }
  body::before{
    content:"";position:fixed;inset:0;pointer-events:none;opacity:.16;
    background:
      linear-gradient(to right, transparent 23px, var(--grid) 24px),
      linear-gradient(to bottom, transparent 23px, var(--grid) 24px);
    background-size:24px 24px;mix-blend-mode:overlay;
  }
  body::after{
    content:"";position:fixed;inset:0;pointer-events:none;opacity:.06;
    background-image:url("data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'>\
<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/>\
<feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='table' tableValues='0 0 .06 .12 .18 .12 .06 0'/></feComponentTransfer></filter>\
<rect width='100%' height='100%' filter='url(#n)'/></svg>");
    background-size:160px 160px;mix-blend-mode:overlay;
  }
  .aurora{position:fixed;inset:-20% -10%;pointer-events:none;filter:blur(44px);opacity:.55}
  .aurora span{
    position:absolute;inset:auto;width:44vw;height:44vw;border-radius:50%;
    background:radial-gradient(circle at 30% 30%, rgba(59,130,246,.35), transparent 60%),
               radial-gradient(circle at 70% 70%, rgba(6,182,212,.30), transparent 60%);
    animation:float 18s ease-in-out infinite;
    mix-blend-mode:screen;
  }
  .aurora .a1{left:-6%;top:10%;animation-delay:-3s}
  .aurora .a2{right:-10%;top:0%;animation-delay:-9s}
  .aurora .a3{left:20%;bottom:-14%;animation-delay:-6s}
  @keyframes float{
    0%,100%{transform:translate3d(0,0,0) scale(1)}
    50%{transform:translate3d(4%, -3%, 0) scale(1.06)}
  }
  @media (prefers-reduced-motion:reduce){.aurora{display:none}}
  .card{
    position:relative;width:min(720px,100%);max-width:720px;
    background:linear-gradient(180deg, color-mix(in oklab, var(--card) 96%, transparent), var(--card));
    border:1px solid var(--line);border-radius:22px;
    padding:32px 28px 86px;box-shadow:var(--ring);overflow:hidden;
    transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));
    transform-style:preserve-3d;transition:transform .2s ease, box-shadow .2s ease, border-color .2s ease;
    will-change:transform;animation:pop .28s ease-out both
  }
  .card:hover{border-color: color-mix(in oklab, var(--line), var(--accent) 22%)}
  .card::before{
    content:"";position:absolute;inset:-1px;border-radius:24px;pointer-events:none;
    background:conic-gradient(from 230deg at 50% 50%, transparent 0 30%, rgba(125,211,252,.28) 40%, transparent 60% 100%);
    mask:linear-gradient(#000,#000) content-box, linear-gradient(#000,#000);
    -webkit-mask:linear-gradient(#000,#000) content-box, linear-gradient(#000,#000);
    padding:1px;opacity:.7;mix-blend-mode:overlay;
  }
  .card::after{
    content:"";position:absolute;inset:0;border-radius:22px;pointer-events:none;
    box-shadow:inset 0 1px 0 rgba(255,255,255,.05), inset 0 -1px 0 rgba(0,0,0,.12);
  }
  .stamp{position:absolute;right:14px;top:6px;font:800 90px/1 ui-sans-serif,system-ui;opacity:.06;user-select:none;letter-spacing:2px}
  .row{display:flex;gap:18px;align-items:center}
  .badge{width:72px;height:72px;border-radius:18px;display:grid;place-items:center;
         background:linear-gradient(135deg, rgba(59,130,246,.18), rgba(6,182,212,.16));
         box-shadow:inset 0 1px 0 rgba(255,255,255,.08)}
  .badge svg{width:38px;height:38px}
  h1{margin:0 0 6px;font-size:28px;letter-spacing:.2px}
  .sub{margin:0;color:var(--mut)}
  .hint{margin-top:10px;font-size:13px;color:var(--mut);opacity:.9;display:flex;align-items:center;gap:8px}
  .dot{width:6px;height:6px;border-radius:999px;background:linear-gradient(135deg,var(--pri1),var(--pri2));box-shadow:0 0 10px rgba(59,130,246,.5)}
  .actions{margin-top:22px;display:flex;gap:12px;flex-wrap:wrap}
  .btn{
    position:relative;appearance:none;cursor:pointer;border-radius:12px;padding:12px 18px;font-weight:800;line-height:1;
    border:1px solid var(--line);background:transparent;color:var(--fg);
    transition:transform .08s ease,background .2s ease,border-color .2s ease,opacity .2s ease, box-shadow .2s ease;
    outline:none;text-decoration:none;display:inline-flex;align-items:center;gap:8px
  }
  .btn:hover{border-color: color-mix(in oklab, var(--line), var(--accent) 28%); box-shadow:0 6px 18px rgba(59,130,246,.20)}
  .btn:active{transform:translateY(1px) scale(.99)}
  .btn:focus-visible{box-shadow:0 0 0 3px color-mix(in oklab, var(--pri1) 40%, transparent)}
  .primary{background:linear-gradient(135deg,var(--pri1),var(--pri2));border-color:transparent;color:#fff;box-shadow:var(--ring)}
  .lang{position:absolute;right:16px;bottom:16px}
  .switch{
    display:inline-flex;align-items:center;gap:8px;padding:7px 12px;border-radius:999px;
    border:1px solid var(--line);background:rgba(255,255,255,.04);
    backdrop-filter:saturate(140%) blur(6px);color:var(--fg);font-weight:800;cursor:pointer;user-select:none;opacity:.9;
    transition:opacity .2s ease, border-color .2s ease, box-shadow .2s ease;
  }
  .switch:hover{opacity:1;border-color: color-mix(in oklab, var(--line), var(--accent) 24%); box-shadow:0 8px 20px rgba(59,130,246,.18)}
  .sep{opacity:.5}
  .cur{color:var(--pri1); text-shadow:0 0 14px color-mix(in oklab, var(--pri1), transparent 70%)}
  @keyframes pop{from{transform:translateY(8px) scale(.98);opacity:0}to{transform:translateY(0) scale(1);opacity:1}}
</style>
</head>
<body>
  <div class="aurora" aria-hidden="true"><span class="a1"></span><span class="a2"></span><span class="a3"></span></div>
  <main class="card" role="main" aria-labelledby="t-title">
    <div class="stamp" aria-hidden="true">403</div>
    <div class="row">
      <div class="badge" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3.5" y="10" width="17" height="10" rx="2"></rect>
          <path d="M7.5 10V7.5a4.5 4.5 0 0 1 9 0V10"></path>
          <circle cx="12" cy="15" r="1.6"></circle>
        </svg>
      </div>
      <div>
        <h1 id="t-title">Forbidden</h1>
        <p class="sub" id="t-desc">Sign-in and sign-up endpoints are disabled.</p>
        <div class="hint"><span class="dot" aria-hidden="true"></span><span id="t-hint">Error code: 403</span></div>
      </div>
    </div>
    <div class="actions" role="group">
      <button class="btn primary" id="btn-back" type="button">Go Back</button>
      <a class="btn" id="btn-home" href="/">Home</a>
    </div>
    <div class="lang">
      <button class="switch" id="lang" title="Switch Language / 切换语言"><span id="lab-zh">中</span><span class="sep">/</span><span id="lab-en">EN</span></button>
    </div>
  </main>
<script>
  const T={en:{t:'Forbidden',d:'Sign-in and sign-up endpoints are disabled.',b:'Go Back',h:'Home'},
           zh:{t:'拒绝访问',d:'登录与注册接口已关闭。',b:'返回上一页',h:'首页'}};
  const $=s=>document.querySelector(s);
  function pref(){
    const list=(navigator.languages||[navigator.language||'en']).map(s=>String(s).toLowerCase());
    return list.some(l=>l.startsWith('zh'))?'zh':'en';
  }
  function setLang(k){
    const v=T[k]||T.en;
    document.documentElement.lang=(k==='zh')?'zh-CN':'en';
    $('#t-title').textContent=v.t; $('#t-desc').textContent=v.d;
    $('#btn-back').textContent=v.b; $('#btn-home').textContent=v.h;
    $('#lab-zh').classList.toggle('cur',k==='zh'); $('#lab-en').classList.toggle('cur',k==='en');
  }
  function back(){
    try{ if(document.referrer){ const u=new URL(document.referrer); if(u.host===location.host){ history.back(); return; } } }catch(_){}
    location.href='/';
  }
  (function(){
    let cur=pref(); setLang(cur);
    $('#btn-back').addEventListener('click', back);
    $('#lang').addEventListener('click', ()=>{ cur = (cur==='zh')?'en':'zh'; setLang(cur); });
  })();
  (function(){
    const card=document.querySelector('.card');
    if(!card) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!reduce){
      const clamp=(n,min,max)=>Math.min(Math.max(n,min),max);
      const onMove=(e)=>{
        const r=card.getBoundingClientRect();
        const mx=e.clientX-(r.left+r.width/2);
        const my=e.clientY-(r.top+r.height/2);
        const rx=clamp((-my/r.height)*6,-8,8);
        const ry=clamp((mx/r.width)*10,-12,12);
        card.style.setProperty('--rx', rx.toFixed(2)+'deg');
        card.style.setProperty('--ry', ry.toFixed(2)+'deg');
      };
      const reset=()=>{ card.style.removeProperty('--rx'); card.style.removeProperty('--ry'); };
      window.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', reset, {passive:true});
    }
  })();
</script>
</body>
</html>`;

// ————————————————————————————————————————————————————————

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const current_host = url.host;

  // 检测Host头，优先使用Host头中的域名来决定后缀
  const host_header = request.headers.get('Host');
  const effective_host = host_header || current_host;

  // ===== 自制页面逻辑（优先）=====
  // 1) 直接访问 /403.html → 返回自制 403 页面
  if (url.pathname === '/403.html') {
    return new Response(HTML_403, {
      status: 403,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=600'
      }
    });
  }
  // 2) 命中登录/注册/ Copilot 等路径 → 重定向到本域的 /403.html
  if (['/login', '/signup'].includes(url.pathname)) {
    return Response.redirect(`https://${effective_host}/403.html`, 302);
  }

  // 强制使用 HTTPS
  if (url.protocol === 'http:') {
    url.protocol = 'https:';
    return Response.redirect(url.href);
  }

  // 从有效主机名中提取前缀
  const host_prefix = getProxyPrefix(effective_host);
  if (!host_prefix) {
    return new Response('Domain not configured for proxy', { status: 404 });
  }

  // 根据前缀找到对应的原始域名
  let target_host = null;
  for (const [original, prefix] of Object.entries(domain_mappings)) {
    if (prefix === host_prefix) {
      target_host = original;
      break;
    }
  }
  if (!target_host) {
    return new Response('Domain not configured for proxy', { status: 404 });
  }

  // 直接使用正则表达式处理最常见的嵌套URL问题
  let pathname = url.pathname;
  // 修复特定的嵌套URL模式 - 直接移除嵌套URL部分
  // 匹配 /xxx/xxx/latest-commit/main/https%3A%2F%2Fgh.xxx.xxx/ 或 /xxx/xxx/tree-commit-info/main/https%3A%2F%2Fgh.xxx.xxx/
  pathname = pathname.replace(
    /(\/[^\/]+\/[^\/]+\/(?:latest-commit|tree-commit-info)\/[^\/]+)\/https%3A(?:%2F%2F|\/\/)[^\/]+\/.*/,
    '$1'
  );
  // 同样处理非编码版本
  pathname = pathname.replace(
    /(\/[^\/]+\/[^\/]+\/(?:latest-commit|tree-commit-info)\/[^\/]+)\/https:\/\/[^\/]+\/.*/,
    '$1'
  );

  // 构建新的请求URL
  const new_url = new URL(url);
  new_url.host = target_host;
  new_url.pathname = pathname;
  new_url.protocol = 'https:';

  // // ===== 构造“白名单”请求头，并把 referer 还原成原站域名 =====
  // const new_headers = new Headers();
  // for (const h of [
  //   'accept', 'accept-language', 'user-agent', 'cookie',
  //   'range', 'if-none-match', 'if-modified-since', 'cache-control'
  // ]) {
  //   const v = request.headers.get(h);
  //   if (v) new_headers.set(h, v);
  // }
  // // 把浏览器传来的 referer（代理域）还原回原站域名；不要把 Referer 设为资源自身
  // const incomingRef = request.headers.get('referer');
  // if (incomingRef) new_headers.set('referer', toOriginURL(incomingRef));

  // // 对 githubassets 兜底：强制安全 Referer，且不带 Cookie
  // if (target_host === 'github.githubassets.com') {
  //   new_headers.set('referer', 'https://github.com/');
  //   new_headers.delete('cookie');
  // }

  // ===== 构造“白名单 + 片段请求头”，并还原 referer =====
  const new_headers = new Headers();

  // 允许的常规头
  const allowList = new Set([
    'accept', 'accept-language', 'user-agent', 'cookie',
    'range', 'if-none-match', 'if-modified-since', 'cache-control',
    // key：片段 / PJAX / Turbo 请求需要的头，防止整页被当片段塞进来
    'x-requested-with',        // XMLHttpRequest
    'x-pjax',                  // PJAX
    'x-pjax-container',        // PJAX container
    'turbo-frame',             // Hotwire Turbo
    'turbo-visit',             // Hotwire Turbo
    'x-turbo-request-id'       // Turbo request id（如存在）
  ]);

  // 复制请求头：允许 allowList 里的；允许其它 x-*，但排除 x-forwarded-*/x-real-ip
  for (const [k, v] of request.headers) {
    const lk = k.toLowerCase();
    if (
      allowList.has(lk) ||
      (lk.startsWith('x-') &&
        !lk.startsWith('x-forwarded-') &&
        lk !== 'x-real-ip' &&
        lk !== 'x-forwarded-proto' &&
        lk !== 'x-forwarded-for')
    ) {
      new_headers.set(k, v);
    }
  }

  // 还原 referer 到原站域名（key）
  const incomingRef = request.headers.get('referer');
  if (incomingRef) new_headers.set('referer', toOriginURL(incomingRef));

  // 对 githubassets 兜底：固定安全 Referer 且去掉 Cookie
  if (target_host === 'github.githubassets.com') {
    new_headers.set('referer', 'https://github.com/');
    new_headers.delete('cookie');
  }
  // 不要手动设置 Host；fetch 会按 URL 自动带上

  try {
    // 发起请求
    const response = await fetch(new_url.href, {
      method: request.method,
      headers: new_headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined
    });

    // 设置新的响应头
    const new_response_headers = new Headers(response.headers);
    new_response_headers.set('access-control-allow-origin', '*');
    new_response_headers.set('access-control-allow-credentials', 'true');
    new_response_headers.set('cache-control', 'public, max-age=14400');
    new_response_headers.delete('content-security-policy');
    new_response_headers.delete('content-security-policy-report-only');
    new_response_headers.delete('clear-site-data');
    // 调试：请求已进入 Worker
    new_response_headers.set('x-proxy', 'gh-worker');

    // 仅在需要改写时才读取文本并替换；改写后清理压缩相关头
    const content_type = response.headers.get('content-type') || '';
    const shouldRewrite =
      content_type.includes('text/') ||
      content_type.includes('application/javascript') ||
      content_type.includes('application/json') ||
      content_type.includes('application/xml') ||
      content_type.includes('image/svg+xml');

    if (shouldRewrite) {
      const response_clone = response.clone();
      const modified_body = await modifyResponse(response_clone, host_prefix, effective_host);
      // 改写过正文后必须去掉压缩/长度头，避免解码失败
      new_response_headers.delete('content-encoding');
      new_response_headers.delete('content-length');
      new_response_headers.delete('transfer-encoding');
      return new Response(modified_body, {
        status: response.status,
        headers: new_response_headers
      });
    } else {
      // 非文本/无需改写的内容直接透传
      return new Response(response.body, {
        status: response.status,
        headers: new_response_headers
      });
    }
  } catch (err) {
    return new Response(`Proxy Error: ${err.message}`, { status: 502 });
  }
}

// 获取当前主机名的前缀，用于匹配反向映射
function getProxyPrefix(host) {
  // 检查主机名是否以 gh. 开头
  if (host.startsWith('gh.')) {
    return 'gh.';
  }
  // 检查其他映射前缀
  for (const prefix of Object.values(domain_mappings)) {
    if (host.startsWith(prefix)) {
      return prefix;
    }
  }
  return null;
}

// 把代理域的 URL 还原为原站域名（用于转发 referer）
function toOriginURL(urlStr) {
  try {
    const u = new URL(urlStr);
    const host_prefix = getProxyPrefix(u.host);
    if (host_prefix) {
      for (const [original, prefix] of Object.entries(domain_mappings)) {
        if (prefix === host_prefix) {
          u.host = original;
          break;
        }
      }
    }
    u.protocol = 'https:';
    return u.toString();
  } catch {
    return urlStr;
  }
}

async function modifyResponse(response, host_prefix, effective_hostname) {
  // 只处理文本内容
  const content_type = response.headers.get('content-type') || '';
  if (
    !content_type.includes('text/') &&
    !content_type.includes('application/json') &&
    !content_type.includes('application/javascript') &&
    !content_type.includes('application/xml') &&
    !content_type.includes('image/svg+xml')
  ) {
    return response.body;
  }

  let text = await response.text();

  // 使用有效主机名获取域名后缀部分（用于构建完整的代理域名）
  const domain_suffix = effective_hostname.substring(host_prefix.length);

  // 替换所有域名引用
  for (const [original_domain, proxy_prefix] of Object.entries(domain_mappings)) {
    const escaped_domain = original_domain.replace(/\./g, '\\.');
    const full_proxy_domain = `${proxy_prefix}${domain_suffix}`;
    // 替换完整URLs
    text = text.replace(
      new RegExp(`https?://${escaped_domain}(?=/|"|'|\\s|$)`, 'g'),
      `https://${full_proxy_domain}`
    );
    // 替换协议相对URLs
    text = text.replace(
      new RegExp(`//${escaped_domain}(?=/|"|'|\\s|$)`, 'g'),
      `//${full_proxy_domain}`
    );
  }

  // 处理相对路径，使用有效主机名
  if (host_prefix === 'gh.') {
    text = text.replace(
      /(?<=["'])\/(?!\/|[a-zA-Z]+:)/g,
      `https://${effective_hostname}/`
    );
  }

  return text;
}
