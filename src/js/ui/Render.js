class Render {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor("lightblue", 1);
        document.body.appendChild(this.renderer.domElement);


        this.light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1.8);
        this.scene.add(this.light);

        this.camera.position.x = 5;
        this.camera.position.y = -5;
        this.camera.position.z = 5;
        this.camera.up = new THREE.Vector3(0,0,1);
        this.camera.lookAt(0.0, 0, 0);


        let floorGeometry = new THREE.BoxGeometry(10, 10, 0);
        let floorMaterial = new THREE.MeshLambertMaterial({color: "gray"});
        let floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
        floorMesh.position.z = 0;
        this.scene.add(floorMesh);

        let tableGeometry = new THREE.BoxGeometry(2, 1, 1);
        let tableMaterial = new THREE.MeshLambertMaterial({color: 0x654321});
        let tableMesh = new THREE.Mesh(tableGeometry, tableMaterial);
        tableMesh.position.z = 0.5;
        this.scene.add(tableMesh);

        this.renderer.render(this.scene, this.camera)
    }
}