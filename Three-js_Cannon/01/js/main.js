console.log("Hello Three.js!!");

var world;
var groundMat;
var sphereMat1;
var sphereMat2;
var phyPlane;
var phySphere1;
var phySphere2;
var scene;
var camera;
var viewPlane;
var viewSphere1;
var viewSphere2;
var renderer;

setPhy();
setView();
animate();

function setPhy() {
  // 物理世界を生成
  world = new CANNON.World();
  // 重力を設定
  world.gravity.set(0, -9.82, 0);
  // ぶつかっている「可能性のある」剛体同士を見つける作業
  world.broadphase = new CANNON.NaiveBroadphase();
  // world.broadphase = new CANNON.Broadphase();
  // 反復計算回数
  world.solver.iterations = 5;
  // 許容値
  world.solver.tolerance = 0.1;

  
  // Plane Material（地面）
  groundMat = new CANNON.Material('groundMat');
  // Plane Materialの質量定義
  phyPlane = new CANNON.Body({
	mass: 0,
	material: groundMat
  });
  phyPlane.addShape(new CANNON.Plane());
  // X軸に90度に回転
  phyPlane.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
  // 物理世界に追加
  world.add(phyPlane);

  // Sphere Material
  sphereMat1 = new CANNON.Material('sphereMat1');
  // Sphere Materialシェイプの質量定義
  phySphere1 = new CANNON.Body({
	mass: 1,
	material: sphereMat1
  });
  phySphere1.addShape(new CANNON.Sphere(1));
  // 剛体の位置
  phySphere1.position.set(-10, 10, 0);
  // Z軸に10の角速度を設定
  phySphere1.angularVelocity.set(0, 0, 0);
  // 減衰率
  phySphere1.angularDamping = 0.1;
  // 物理世界に追加
  world.add(phySphere1);
  
  // Sphere Material
  sphereMat2 = new CANNON.Material('sphereMat2');
  // Sphere Materialシェイプの質量定義
  phySphere2 = new CANNON.Body({
	mass: 1,
	material: sphereMat2
  });
  phySphere2.addShape(new CANNON.Sphere(1));
  // 剛体の位置
  phySphere2.position.set(10, 10, 0);
  // Z軸に10の角速度を設定
  phySphere2.angularVelocity.set(0, 0, 0);
  // 減衰率
  phySphere2.angularDamping = 0.1;
  // 物理世界に追加
  world.add(phySphere2);
  
  /*
   * Material同士の接触設定
   */
  // Sphere1とPlaneが接触した際のContactMaterialを生成  
  sphere1PlaneCM = new CANNON.ContactMaterial(
	groundMat,  //ひとつ目のマテリアル
	sphereMat1, //ふたつ目のマテリアル
	{
	  contactEquationRelaxation: 3, // 接触式の緩和性
	  contactEquationStiffness: 10000000, // 接触式の剛性
	  friction: 0.3, //摩擦係数
	  frictionEquationRelaxation: 3, // 摩擦式の剛性
	  frictionEquationStiffness: 10000000, // 摩擦式の緩和性
	  restitution: 0.3 // 反発係数
	}
  );
  // 生成したContactMaterialをworldに追加
  world.addContactMaterial(sphere1PlaneCM);
  
  //Sphere2とPlaneが接触した際のContactMaterialを生成
  sphere2PlaneCM = new CANNON.ContactMaterial(
	groundMat,  //ひとつ目のマテリアル
	sphereMat2, //ふたつ目のマテリアル
	{
	  contactEquationRelaxation: 3, // 接触式の緩和性
	  contactEquationStiffness: 10000000, // 接触式の剛性
	  friction: 0.8, //摩擦係数
	  frictionEquationRelaxation: 3, // 摩擦式の剛性
	  frictionEquationStiffness: 10000000, // 摩擦式の緩和性
	  restitution: 0.8 // 反発係数
	}
  );
  //生成したContactMaterialをworldに追加
  world.addContactMaterial(sphere2PlaneCM);
}

/**
 * Check if the bounding spheres of two bodies overlap.
 * @method boundingSphereCheck
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @return {boolean}
 */
// console.log(CANNON);
// console.log(world.broadphase);
function boundingSphereCheck(bodyA,bodyB){
	var dist = new CANNON.Vec3();
	bodyA.position.vsub(bodyB.position,dist);
	return Math.pow(bodyA.shapes[0].boundingSphereRadius + bodyB.shapes[0].boundingSphereRadius,2) > dist.norm2();
};

function setView() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 1, 100);
  camera = new THREE.PerspectiveCamera(30, 650 / 400, 1, 10000);
  camera.position.set(0, 10, 40);
  camera.lookAt(new THREE.Vector3(0, 2, 0));
  scene.add(camera);
  var light = new THREE.DirectionalLight(0xffffff, 2);
  
  light.position.set(10, 10, -10);
  light.castShadow = true;
  light.shadowMapWidth = 1024;
  light.shadowMapHeight = 1024;
  light.shadowCameraLeft = -10;
  light.shadowCameraRight = 10;
  light.shadowCameraTop = 10;
  light.shadowCameraBottom = -10;
  light.shadowCameraFar = 100;
  light.shadowCameraNear = 0;
  light.shadowDarkness = 0.5;
  scene.add(light);
  var amb = new THREE.AmbientLight(0x999999);
  scene.add(amb);
  viewSphere1 = new THREE.Mesh(
	new THREE.SphereGeometry(1, 50, 50),
	new THREE.MeshLambertMaterial(
	  {
		color: 0xffffff
	  }
	)
  );
  viewSphere1.castShadow = true;
  viewSphere1.receiveShadow = true;
  scene.add(viewSphere1);
  
  viewSphere2 = new THREE.Mesh(
	new THREE.SphereGeometry(1, 50, 50),
	new THREE.MeshLambertMaterial(
	  {
		color: 0xffffff
	  }
	)
  );
  viewSphere2.castShadow = true;
  viewSphere2.receiveShadow = true;
  scene.add(viewSphere2);
  
  viewPlane = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), new THREE.MeshPhongMaterial({
	color: 0x333333
  }));
  viewPlane.rotation.x = -Math.PI / 2;
  viewPlane.position.y = 0;
  viewPlane.receiveShadow = true;
  scene.add(viewPlane);
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(650, 400);
  renderer.setClearColor(0x000000, 1);
  renderer.shadowMapEnabled = true;
  document.body.appendChild(renderer.domElement);
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  // 物理エンジンの時間を進める
  world.step(1 / 60);
  viewSphere1.position.copy(phySphere1.position);
  viewSphere1.quaternion.copy(phySphere1.quaternion);
  viewSphere2.position.copy(phySphere2.position);
  viewSphere2.quaternion.copy(phySphere2.quaternion);
  // レンダリング
  renderer.render(scene, camera);

  // console.log(boundingSphereCheck(phySphere,phyBox));
}