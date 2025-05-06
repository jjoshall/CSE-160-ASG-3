class Triangle {
    constructor() {
        this.type = 'triangle';
        this.position = [0.0, 0.0, 0.0];
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.size = 5.0;
    }

    render() {
        var xy = this.position;
        var rgba = this.color;
        var size = this.size;

        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        // Pass the size of a point to u_Size variable
        gl.uniform1f(u_Size, size);

        // Draw
        var d = this.size / 200.0;
        drawTriangle( [xy[0], xy[1], xy[0] + d, xy[1], xy[0], xy[1] + d]);
    }
}

// Global buffers
var vertexBuffer = null;
var uvBuffer = null;
var cubeVertexBuffer = null;
var cubeUVBuffer = null;

const CUBE_VERTICES = new Float32Array([
    // Front face
    0, 0, 0,  0, 1, 0,  1, 1, 0,
    0, 0, 0,  1, 1, 0,  1, 0, 0,
    // Top face
    0, 1, 0,  0, 1, 1,  1, 1, 1,
    0, 1, 0,  1, 1, 1,  1, 1, 0,
    // Right face
    1, 0, 0,  1, 1, 0,  1, 1, 1,
    1, 0, 0,  1, 1, 1,  1, 0, 1,
    // Left face
    0, 0, 0,  0, 1, 0,  0, 1, 1,
    0, 0, 0,  0, 1, 1,  0, 0, 1,
    // Back face
    0, 0, 1,  1, 0, 1,  1, 1, 1,
    0, 0, 1,  1, 1, 1,  0, 1, 1,
    // Bottom face
    0, 0, 1,  1, 0, 1,  1, 0, 0,
    0, 0, 1,  1, 0, 0,  0, 0, 0
]);

const CUBE_UVS = new Float32Array([
    // Front face
    0, 0,  0, 1,  1, 1,
    0, 0,  1, 1,  1, 0,
    // Top face
    0, 0,  0, 1,  1, 1,
    0, 0,  1, 1,  1, 0,
    // Right face
    0, 0,  0, 1,  1, 1,
    0, 0,  1, 1,  1, 0,
    // Left face
    0, 0,  0, 1,  1, 1,
    0, 0,  1, 1,  1, 0,
    // Back face
    0, 0,  1, 0,  1, 1,
    0, 0,  1, 1,  0, 1,
    // Bottom face
    0, 0,  1, 0,  1, 1,
    0, 0,  1, 1,  0, 1
]);

function initBuffers() {
    // Create buffers for general tris
    vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    uvBuffer = gl.createBuffer();
    if (!uvBuffer) {
      console.log('Failed to create the buffer object for UV');
      return -1;
    }

    // Make buffers for cubes
    cubeVertexBuffer = gl.createBuffer();
    if (!cubeVertexBuffer) {
      console.log('Failed to create the buffer object for cube vertices');
      return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, CUBE_VERTICES, gl.STATIC_DRAW);

    cubeUVBuffer = gl.createBuffer();
    if (!cubeUVBuffer) {
      console.log('Failed to create the buffer object for cube UVs');
      return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeUVBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, CUBE_UVS, gl.STATIC_DRAW);
}

function drawTriangle(vertices) {
    var n = 3; // The number of vertices
  
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
  
    gl.drawArrays(gl.TRIANGLES, 0, n); // Draw the rectangle
}

function drawTriangle3D(vertices) {
    var n = 3; // The number of vertices
  
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
  
    gl.drawArrays(gl.TRIANGLES, 0, n); // Draw the rectangle
}

function drawTriangle3DUV(vertices, uv) {
    var n = vertices.length / 3; // The number of vertices

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);

    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);

    // Assign the buffer object to a_UV variable
    gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_UV variable
    gl.enableVertexAttribArray(a_UV);

    // Draw the triangle
    gl.drawArrays(gl.TRIANGLES, 0, n); // Draw the rectangle
}

function drawCube() {
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBuffer);
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeUVBuffer);
    gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_UV);

    gl.drawArrays(gl.TRIANGLES, 0, 36); // Draw the cube
}