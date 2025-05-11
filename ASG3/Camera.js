/// ChatGPT/Claude helped me with this code
class Camera {
    constructor(canvas, fov = 60, near = 0.1, far = 1000) {
        this.canvas = canvas;
        this.fov = fov;
        this.near = near;
        this.far = far;

        this.eye = new Vector3([-4.4, .4, -3.7]);
        this.at = new Vector3([27, -.27, -4.5]);
        this.up = new Vector3([0, 1, 0]);

        this.viewMatrix = new Matrix4();
        this.projectionMatrix = new Matrix4();
        
        this.updateViewMatrix();
        this.updateProjectionMatrix();
    }

    updateViewMatrix() {
        this.viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
            this.at.elements[0], this.at.elements[1], this.at.elements[2],
            this.up.elements[0], this.up.elements[1], this.up.elements[2]
        );
    }

    updateProjectionMatrix() {
        const aspect = this.canvas.width / this.canvas.height;
        this.projectionMatrix.setPerspective(
            this.fov, 
            aspect, 
            this.near, 
            this.far
        );
    }

    moveForward(speed) {
        const f = new Vector3().set(this.at).sub(this.eye).normalize().mul(speed);
        this.eye.add(f);
        this.at.add(f);
        this.updateViewMatrix();
    }

    moveBackwards(speed) {
        const b = new Vector3().set(this.eye).sub(this.at).normalize().mul(speed);
        this.eye.add(b);
        this.at.add(b);
        this.updateViewMatrix();
    }

    moveLeft(speed) {
        const f = new Vector3().set(this.at).sub(this.eye).normalize();
        const s = Vector3.cross(this.up, f).normalize().mul(speed);
        this.eye.add(s);
        this.at.add(s);
        this.updateViewMatrix();
    }

    moveRight(speed) {
        const f = new Vector3().set(this.at).sub(this.eye).normalize();
        const s = Vector3.cross(f, this.up).normalize().mul(speed);
        this.eye.add(s);
        this.at.add(s);
        this.updateViewMatrix();
    }

    panLeft(degrees) {
        const f = new Vector3().set(this.at).sub(this.eye);
        const rot = new Matrix4().setRotate(
            degrees, 
            this.up.elements[0], this.up.elements[1], this.up.elements[2]
        );
        const fprime = rot.multiplyVector3(f);
        this.at.set(new Vector3().set(this.eye).add(fprime));
        this.updateViewMatrix();
    }

    panRight(degrees) {
        this.panLeft(-degrees);
    }

    panUp(degrees) {
        const f = new Vector3().set(this.at).sub(this.eye);
        const right = Vector3.cross(f, this.up).normalize();

        const rot = new Matrix4().setRotate(
            degrees, 
            right.elements[0], right.elements[1], right.elements[2]
        );
        const fprime = rot.multiplyVector3(f);

        this.at.set(new Vector3().set(this.eye).add(fprime));
        this.updateViewMatrix();
    }

    panDown(degrees) {
        this.panUp(-degrees);
    }

    resize() {
        this.updateProjectionMatrix();
    }
}

window.Camera = Camera;