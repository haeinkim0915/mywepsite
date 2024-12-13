const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Canvas가 창 크기에 맞추기
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// 기본 조명 추가
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 배경 추가 (예: 그라디언트)
const backgroundGeometry = new THREE.SphereGeometry(500, 60, 40);
const backgroundMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.BackSide,
});
const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
scene.add(background);

// 3D 텍스트 생성 함수
function createTextMesh(text, position) {
    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function (font) {
        const textGeometry = new THREE.TextGeometry(text, {
            font: font,
            size: 1,
            height: 0.1,
        });
        const textMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(position.x, position.y, position.z);
        scene.add(textMesh);
    });
}

// 무작위 위치에 텍스트 추가
function randomText() {
    const x = (Math.random() * 100 - 50); // 범위를 -50 ~ 50으로 확장
    const y = (Math.random() * 100 - 50); // 범위를 -50 ~ 50으로 확장
    const z = (Math.random() * 100 - 50); // 범위를 -50 ~ 50으로 확장
    createTextMesh("You can't exit", { x: x, y: y, z: z });
}


// 카메라 위치 설정
camera.position.set(0, 0, 10);

// 카메라를 회전하는 함수
function animateCamera() {
    camera.position.x += 0.05 * Math.sin(Date.now() * 0.001);
    camera.position.y += 0.02 * Math.cos(Date.now() * 0.001);
    camera.lookAt(0, 0, 0);
}

// 1초마다 새로운 텍스트 추가
setInterval(randomText, 1000);

// 애니메이션 루프
function animate() {
    requestAnimationFrame(animate);
    animateCamera(); // 카메라 애니메이션 추가
    renderer.render(scene, camera);
}
animate();
