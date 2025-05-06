/// ChatGPT helped me with this code
class Camera {
    constructor() {
        this.fov = 60;
        this.eye = new Vector3([0, 0, 0]);
        this.at = new Vector3([0, 0, -1]);
        this.up = new Vector3([0, 1, 0]);

        this.viewMatrix = new Matrix4();
        this.viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
            this.at.elements[0], this.at.elements[1], this.at.elements[2],
            this.up.elements[0], this.up.elements[1], this.up.elements[2]
        );

        this.projectionMatrix = new Matrix4();
        this.projectionMatrix.setPerspective(
            this.fov, 
            10, 
            0.1, 
            1000
        );
    }

    updateViewMatrix() {
        this.viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
            this.at.elements[0], this.at.elements[1], this.at.elements[2],
            this.up.elements[0], this.up.elements[1], this.up.elements[2]
        );
    }

    moveForward(speed) {
        let f = new Vector3(this.at);
        f.sub(this.eye);
        f.normalize();
        f.mul(speed);
        this.eye.add(f);
        this.at.add(f);
        this.updateViewMatrix();
    }

    moveBackwards(speed) {
        let b = new Vector3(this.eye);
        b.sub(this.at);
        b.normalize();
        b.mul(speed);
        this.eye.add(b);
        this.at.add(b);
        this.updateViewMatrix();
    }

    moveLeft(speed) {
        let f = new Vector3(this.at);
        f.sub(this.eye);
        f.normalize();
        let s = Vector3.cross(this.up, f);
        s.normalize();
        s.mul(speed);
        this.eye.add(s);
        this.at.add(s);
        this.updateViewMatrix();
    }

    moveRight(speed) {
        let f = new Vector3(this.at);
        f.sub(this.eye);
        f.normalize();
        let s = Vector3.cross(f, this.up);
        s.normalize();
        s.mul(speed);
        this.eye.add(s);
        this.at.add(s);
        this.updateViewMatrix();
    }

    panLeft(alpha) {
        let f = new Vector3(this.at);
        f.sub(this.eye);
        let rotationMatrix = new Matrix4();
        rotationMatrix.setRotate(alpha, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
        let f_prime = rotationMatrix.multiplyVector3(f);
        this.at = new Vector3([
            this.eye.elements[0] + f_prime.elements[0],
            this.eye.elements[1] + f_prime.elements[1],
            this.eye.elements[2] + f_prime.elements[2]
        ]);
        this.updateViewMatrix();
    }

    panRight(alpha) {
        this.panLeft(-alpha);
    }
}