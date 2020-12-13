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
        this.camera.up = new THREE.Vector3(0, 0, 1);
        this.camera.lookAt(0.0, 0, 1);


        let floorGeometry = new THREE.BoxGeometry(10, 10, 0);
        let floorMaterial = new THREE.MeshMatcapMaterial({color: "gray"});
        let floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
        floorMesh.position.z = 0;
        this.scene.add(floorMesh);

        let tableGeometry = new THREE.BoxGeometry(2, 2, 1);
        let tableMaterial = new THREE.MeshMatcapMaterial({color: 0x654321});
        let tableMesh = new THREE.Mesh(tableGeometry, tableMaterial);
        tableMesh.position.z = 0.5;
        this.scene.add(tableMesh);

        let boardGeometry = new THREE.BoxGeometry(1, 0.5, 0);
        let boardMaterial = new THREE.MeshMatcapMaterial({color: "white"});
        let boardMesh = new THREE.Mesh(boardGeometry, boardMaterial);
        boardMesh.position.z = 1.1;
        this.scene.add(boardMesh);

        this.liberalCards = [];
        this.fascistCards = [];
        this.cardPile = [];
        this.discardPile = [];

        let that = this;
        function animate() {
            requestAnimationFrame(animate);
            that.renderer.render(that.scene, that.camera);
        }

        animate();
    }

    animate(func, speed, endFunc) {
        let state = 0;
        const resolution = 10;
        const delta = resolution/1000.0 * speed;


        let int = setInterval(function () {
            func(state);

            state += delta;
            if (state >= 1) {
                func(1);
                clearInterval(int);
                if (endFunc !== undefined) {
                    endFunc();
                }
            }
        }, resolution);
    }

    panToTable() {
        let cam = this.camera; // Closures are broken

        this.animate(function (state) {
            let r = 5 - 4.5 * state;
            cam.position.x = Math.sin(Math.PI * (0.25 + state * 0.75)) * r;
            cam.position.y = Math.cos(Math.PI * (0.25 + state * 0.75)) * r;
            cam.position.z = r + 1.7;
            cam.up = new THREE.Vector3(0, 0, 1);
            cam.lookAt(0.0, 0, 1);
        }, 0.5);
    }

    showNumberOfCards(liberal, fascist, cardPile, discardPile) {
        let that = this;
        const far = 3;

        function animateToPosition(x, y, z, mesh, endFunc) {
            const initialPosition = mesh.position;
            that.animate(function (state) {
                mesh.position.x = initialPosition.x * (1 - state) + x * state;
                mesh.position.y = initialPosition.y * (1 - state) + y * state;
                mesh.position.z = initialPosition.z * (1 - state) + z * state;
            }, 0.3, endFunc);
        }

        function newCard(x, y, z, rotation=0) {
            let geometry = new THREE.BoxGeometry(0.1, 0.1, 0.001);
            let material = new THREE.MeshMatcapMaterial({color: "red"});
            let mesh = new THREE.Mesh(geometry, material);
            mesh.position.z = far;
            mesh.rotation.z = rotation;
            that.scene.add(mesh);
            animateToPosition(x, y, z, mesh);
            return mesh;
        }

        function manageCardStack(should, cards, x, y, z) {
            if (cards.length > should) {
                for (let c=should; c<cards.length; ++c) {
                    animateToPosition(0, 0, far, cards[c], function () {
                        that.scene.remove(cards[c]);
                    });
                }
            } else if (should > cards.length) {
                for (let c=cards.length; c<should; ++c) {
                    cards.push(newCard(x, y, z+0.01*c, c * 30 / 180 * Math.PI));
                }

            }
        }


        manageCardStack(cardPile, this.cardPile, -0.6, 0, 1.101);
        manageCardStack(discardPile, this.discardPile, 0.6, 0, 1.101);

        for (let c=this.liberalCards.length; c<liberal; ++c) {
            this.liberalCards.push(newCard(-0.4 + c * 0.15, 0.1, 1.101));
        }

        for (let c=this.fascistCards.length; c<fascist; ++c) {
            this.fascistCards.push(newCard(-0.4 + c * 0.15, -0.1, 1.101));
        }
    }
}