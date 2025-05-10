// Instance pool for cube reuse - further optimization
class CubePool {
    constructor(maxCubes = 1000) {
        this.pool = [];
        this.used = 0;
        
        // Pre-create cubes
        for (let i = 0; i < maxCubes; i++) {
            this.pool.push(new Cube());
        }
    }
    
    getCube() {
        if (this.used < this.pool.length) {
            return this.pool[this.used++];
        } else {
            // Expand pool if needed
            const newCube = new Cube();
            this.pool.push(newCube);
            this.used++;
            return newCube;
        }
    }
    
    reset() {
        this.used = 0;
    }
    
    renderAll() {
        // Set common shader uniforms once
        gl.uniform1i(u_whichTexture, this.pool[0].textureNum);
        
        // Render each cube with minimal state changes
        for (let i = 0; i < this.used; i++) {
            const cube = this.pool[i];
            
            gl.uniform4f(u_FragColor, cube.color[0], cube.color[1], cube.color[2], cube.color[3]);
            gl.uniformMatrix4fv(u_ModelMatrix, false, cube.matrix.elements);
            
            // Draw with single call
            drawCube();
        }
    }
}