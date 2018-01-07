/// <reference path="typings/globals/three/index.d.ts" />
/// <reference path="js/three.js" />
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFFFF);
var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

var geometry = new THREE.SphereGeometry(5, 32, 32);
var loader = new THREE.TextureLoader();
var colorMap = loader.load("obj/earth/Albedo.jpg");
var specularMap = loader.load("obj/earth/ocean_Mask.png");
var normalMap = loader.load("obj/earth/Bump.jpg");
var material = new THREE.MeshPhongMaterial({
    color: 0xaaaaaa,
    specular: 0x333333,
    shininess: 15,
    map: colorMap,
    specularMap: specularMap,
    normalMap: normalMap
});
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

window.addEventListener('resize', function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

var controls = new THREE.OrbitControls(camera, renderer.domElement);
var light = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(light);
var spotLight = new THREE.SpotLight(0xFFFFFF, 1);
spotLight.position.set(10, 10, 10);
spotLight.angle = 1;
spotLight.penumbra = 1;
spotLight.decay = 1.3;
spotLight.distance = 100;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 10;
spotLight.shadow.camera.far = 200;
scene.add(spotLight);
var spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

var materialArray = [];
materialArray.push(new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("image/skybox/ft.png")}));
materialArray.push(new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("image/skybox/bk.png")}));
materialArray.push(new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("image/skybox/up.png")}));
materialArray.push(new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("image/skybox/dn.png")}));
materialArray.push(new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("image/skybox/rt.png")}));
materialArray.push(new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("image/skybox/lf.png")}));
for (var i = 0; i < 6; i++)
    materialArray[i].side = THREE.BackSide;
var skyboxGeom = new THREE.CubeGeometry(1000, 1000, 1000, 1, 1, 1);
var skybox = new THREE.Mesh(skyboxGeom, materialArray);
scene.add(skybox);

camera.position.z = 10;

var upadate = function () {
    controls.update()
};

var render = function () {
    renderer.render(scene, camera);
}

var GameLoop = function () {
    requestAnimationFrame(GameLoop);
    upadate();
    render();

};

GameLoop();


