// Set up the scene, camera, and renderer
var cam_value=30;
var cam_y=0;
var cam_x=0;
var size=window.innerHeight;
if(window.innerWidth>=900){
    cam_value=40;
    cam_y=-0.5;
    cam_x=0.4;
}

if(window.innerWidth>window.innerHeight){
    size=window.innerWidth;
}
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(cam_value, size / size, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
camera.position.set(cam_x,cam_y,1);
renderer.setSize(size, size);
document.getElementById('cube-container').appendChild(renderer.domElement);

//change background colour
scene.background = new THREE.Color(0x333333);
// Add Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(6, 1, 5).normalize();
scene.add(light);

// Cube
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xe90505 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(-0.6,0,1);
scene.add(cube);

// Move the camera slightly back so we can view the cube
camera.position.z = 5;

// Create an animation loop to rotate the cube and render the scene
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the cube for some basic animation
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    //cube.rotation.z+=0.01;

    renderer.render(scene, camera);
}

// Start the animation loop
animate();