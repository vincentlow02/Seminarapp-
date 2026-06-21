const imageMap = {
    asia: ['asia/CN.svg', 'asia/hk.svg', 'asia/IND.svg', 'asia/jp.svg', 'asia/kr.svg', 'asia/TW.svg'],
    eu: ['eu/ch.svg', 'eu/italy.svg', 'eu/no.svg', 'eu/paris.svg', 'eu/uk.svg'],
    oc: ['oc/au.svg', 'oc/fiji.svg', 'oc/nz.svg'],
    se: ['se/bkk.svg', 'se/cam.svg', 'se/kl.svg', 'se/sg.svg', 'se/vn.svg'],
    us: ['us/ca.svg', 'us/pa.svg', 'us/us.svg'],
    other: ['other/au.svg', 'other/bkk.svg', 'other/ca.svg', 'other/cam.svg', 'other/ch.svg', 'other/CN.svg', 'other/fiji.svg', 'other/hk.svg', 'other/IND.svg', 'other/italy.svg', 'other/jp.svg', 'other/kl.svg', 'other/kr.svg', 'other/no.svg', 'other/nz.svg', 'other/other.svg', 'other/other2.svg', 'other/other3.svg', 'other/pa.svg', 'other/paris.svg', 'other/sg.svg', 'other/TW.svg', 'other/uk.svg', 'other/us.svg', 'other/vn.svg'],
};

let selectedRegion = null;

document.querySelectorAll('.region-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.region-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedRegion = btn.dataset.region;
    });
});

document.getElementById('recommendBtn').addEventListener('click', () => {
    const name = document.getElementById('nameInput').value.trim();
    if (!name) {
        alert('名前を入力してください');
        return;
    }
    if (!selectedRegion) {
        alert('地域を選択してください');
        return;
    }

    const candidates = imageMap[selectedRegion];
    const chosenImage = candidates[Math.floor(Math.random() * candidates.length)];
    
    sessionStorage.setItem('selectedImage', chosenImage);
    sessionStorage.setItem('selectedName', name);
    localStorage.setItem('selectedImage', chosenImage);
    localStorage.setItem('selectedName', name);

    const preloadImg = new Image();
    preloadImg.src = new URL('assets/regions/' + chosenImage, document.baseURI).href;
    window.location.href = 'country.html?v=' + new Date().getTime();
});

// --- Magnetic Button & Parallax Interaction ---
const btn = document.getElementById('recommendBtn');
const parallaxBg = document.querySelector('.blue-cloud-bg');

if (btn) {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.02)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0px, 0px) scale(1)`;
    });
}

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 0 && parallaxBg) {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        requestAnimationFrame(() => {
            parallaxBg.style.transform = `translate(${x * -15}px, ${y * -10}px) scale(1.05) rotateX(${y * 2}deg) rotateY(${x * -2}deg)`;
        });
    }
});

let time = 0;
function ambientBreathing() {
    time += 0.01;
    if (!document.querySelector(':hover') && parallaxBg) {
        const scale = 1.05 + Math.sin(time) * 0.01;
        parallaxBg.style.transform = `scale(${scale})`;
    }
    requestAnimationFrame(ambientBreathing);
}
ambientBreathing();
