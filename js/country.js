(function () {

  // ── Data from storage ──────────────────────────────────────────
  const storedImage = sessionStorage.getItem('selectedImage') || localStorage.getItem('selectedImage') || 'asia/jp.svg';
  const storedName  = sessionStorage.getItem('selectedName')  || localStorage.getItem('selectedName')  || '';

  // ── Country / destination metadata map ─────────────────────────
  const destinationMeta = {
    'asia/CN.svg':  { label: 'China',        code: 'CN', jp: '中国',        flag: '🇨🇳', area: 'Asia' },
    'asia/hk.svg':  { label: 'Hong Kong',    code: 'HK', jp: '香港',        flag: '🇭🇰', area: 'Asia' },
    'asia/IND.svg': { label: 'India',        code: 'IN', jp: 'インド',      flag: '🇮🇳', area: 'Asia' },
    'asia/jp.svg':  { label: 'Japan',        code: 'JP', jp: '日本',        flag: '🇯🇵', area: 'Asia' },
    'asia/kr.svg':  { label: 'Korea',        code: 'KR', jp: '韓国',        flag: '🇰🇷', area: 'Asia' },
    'asia/TW.svg':  { label: 'Taiwan',       code: 'TW', jp: '台湾',        flag: '🇹🇼', area: 'Asia' },
    'eu/ch.svg':    { label: 'Switzerland',  code: 'CH', jp: 'スイス',      flag: '🇨🇭', area: 'Europe' },
    'eu/italy.svg': { label: 'Italy',        code: 'IT', jp: 'イタリア',    flag: '🇮🇹', area: 'Europe' },
    'eu/no.svg':    { label: 'Norway',       code: 'NO', jp: 'ノルウェー',  flag: '🇳🇴', area: 'Europe' },
    'eu/paris.svg': { label: 'France',       code: 'FR', jp: 'フランス',    flag: '🇫🇷', area: 'Europe' },
    'eu/uk.svg':    { label: 'UK',           code: 'GB', jp: 'イギリス',    flag: '🇬🇧', area: 'Europe' },
    'oc/au.svg':    { label: 'Australia',    code: 'AU', jp: 'オーストラリア', flag: '🇦🇺', area: 'Oceania' },
    'oc/fiji.svg':  { label: 'Fiji',         code: 'FJ', jp: 'フィジー',     flag: '🇫🇯', area: 'Oceania' },
    'oc/nz.svg':    { label: 'New Zealand',  code: 'NZ', jp: 'ニュージーランド', flag: '🇳🇿', area: 'Oceania' },
    'se/bkk.svg':   { label: 'Thailand',     code: 'TH', jp: 'タイ',        flag: '🇹🇭', area: 'SE Asia' },
    'se/cam.svg':   { label: 'Cambodia',     code: 'KH', jp: 'カンボジア',  flag: '🇰🇭', area: 'SE Asia' },
    'se/kl.svg':    { label: 'Malaysia',     code: 'MY', jp: 'マレーシア',  flag: '🇲🇾', area: 'SE Asia' },
    'se/sg.svg':    { label: 'Singapore',    code: 'SG', jp: 'シンガポール', flag: '🇸🇬', area: 'SE Asia' },
    'se/vn.svg':    { label: 'Vietnam',      code: 'VN', jp: 'ベトナム',    flag: '🇻🇳', area: 'SE Asia' },
    'us/ca.svg':    { label: 'Canada',       code: 'CA', jp: 'カナダ',      flag: '🇨🇦', area: 'The Americas' },
    'us/pa.svg':    { label: 'Panama',       code: 'PA', jp: 'パナマ',      flag: '🇵🇦', area: 'The Americas' },
    'us/us.svg':    { label: 'USA',          code: 'US', jp: 'アメリカ',    flag: '🇺🇸', area: 'The Americas' },
  };

  const normalizedImage = storedImage.replace(/^(assets\/regions\/|assets\/|regions\/)/, '');
  const assetsBase = 'assets/regions/';

  async function setSvgDataUrl(element, src) {
    if (!element || !src || src.startsWith('data:')) return;
    if (!src.toLowerCase().endsWith('.svg')) {
      element.src = src;
      return;
    }
    try {
      const response = await fetch(src);
      if (!response.ok) throw new Error('Failed to fetch SVG');
      const text = await response.text();
      const base64 = btoa(unescape(encodeURIComponent(text)));
      element.src = 'data:image/svg+xml;base64,' + base64;
    } catch (error) {
      element.src = src;
    }
  }

  const imgEl = document.getElementById('countryImage');
  imgEl.src = assetsBase + normalizedImage;

  const meta = destinationMeta[normalizedImage];
  if (meta) {
    document.getElementById('destLabel').textContent = meta.label;
    const destCodeEl = document.getElementById('destCode');
    destCodeEl.src = assetsBase + normalizedImage;
    setSvgDataUrl(destCodeEl, assetsBase + normalizedImage);
    destCodeEl.setAttribute('title', meta.label);
    document.getElementById('destJp').textContent = meta.jp;
    document.getElementById('areaLabel').textContent = meta.area;
  } else {
    document.getElementById('destLabel').textContent = 'Unknown';
    const destCodeEl = document.getElementById('destCode');
    destCodeEl.src = assetsBase + normalizedImage;
    setSvgDataUrl(destCodeEl, assetsBase + normalizedImage);
    destCodeEl.setAttribute('title', 'Unknown');
    document.getElementById('destJp').textContent = 'ほか';
    document.getElementById('areaLabel').textContent = 'Other';
  }

  const nameEl = document.getElementById('userName');
  nameEl.textContent = storedName || '';

  const tsEl = document.getElementById('timestamp');
  function updateTimestamp() {
    if (!tsEl) return;
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    tsEl.textContent = `${now.getFullYear()}.${pad(now.getMonth()+1)}.${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }

  updateTimestamp();
  setInterval(updateTimestamp, 1000);

})();
