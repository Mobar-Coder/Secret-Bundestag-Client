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
        this.camera.position.y = 5;
        this.camera.position.z = 6;
        this.camera.up = new THREE.Vector3(0,0,1);
        this.camera.lookAt(0.0, 0, 1);


        let floorGeometry = new THREE.BoxGeometry(10, 10, 0);
        let floorMaterial = new THREE.MeshLambertMaterial({color: "gray"});
        let floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
        floorMesh.position.z = 0;
        this.scene.add(floorMesh);

        let tableGeometry = new THREE.BoxGeometry(2, 2, 1);
        let tableMaterial = new THREE.MeshLambertMaterial({color: 0x654321});
        let tableMesh = new THREE.Mesh(tableGeometry, tableMaterial);
        tableMesh.position.z = 0.5;
        this.scene.add(tableMesh);

        let boardGeometry = new THREE.BoxGeometry(1, 0.5, 0);
        let boardMaterial = new THREE.MeshLambertMaterial({color: 0x7F7F7F});
        let boardMesh = new THREE.Mesh(boardGeometry, boardMaterial);
        boardMesh.position.z = 1.1;
        this.scene.add(boardMesh);

        this.renderer.render(this.scene, this.camera)
    }

    panToTable() {
        let state = 0;
        const delta = 0.005;

        let cam = this.camera; // Closures are brocken
        let scene = this.scene;
        let renderer = this.renderer;

        let int = setInterval(function(){
            let r = 5 - 5 * state;
            cam.position.x = Math.sin(Math.PI * (0.25 + state*0.75)) * r;
            cam.position.y = Math.cos(Math.PI * (0.25 + state*0.75)) * r;
            cam.position.z = r+1.7;
            cam.up = new THREE.Vector3(0,0,1);
            cam.lookAt(0.0, 0, 1);

            renderer.render(scene, cam);

            state += delta;
            if (state >= 1) {
                clearInterval(int);
            }
        }, 10);
    }
}