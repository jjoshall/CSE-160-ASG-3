// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
  precision mediump float;
  attribute vec4 a_Position;
  attribute vec2 a_UV;
  varying vec2 v_UV;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  void main() {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    v_UV = a_UV;
  }`

// Fragment shader program
var FSHADER_SOURCE =`
  precision mediump float;
  varying vec2 v_UV;
  uniform vec4 u_FragColor;
  uniform sampler2D u_Sampler0;
  uniform sampler2D u_Sampler1;
  uniform sampler2D u_Sampler2;
  uniform sampler2D u_Sampler3;
  uniform sampler2D u_Sampler4;
  uniform sampler2D u_Sampler5;
  uniform int u_whichTexture;
  void main() {
    if (u_whichTexture == -2) {
      gl_FragColor = u_FragColor; // Use color
    }
    else if (u_whichTexture == -1) {
      gl_FragColor = vec4(v_UV, 1.0, 1.0); // Use UV debug color
    }
    else if (u_whichTexture == 0) {
      gl_FragColor = texture2D(u_Sampler0, v_UV); // Use space texture
    }
    else if (u_whichTexture == 1) {
      gl_FragColor = texture2D(u_Sampler1, v_UV); // Use lava texture
    }
    else if (u_whichTexture == 2) {
      gl_FragColor = texture2D(u_Sampler2, v_UV); // Use UV debug color
    }
    else if (u_whichTexture == 3) {
      gl_FragColor = texture2D(u_Sampler3, v_UV); // Use UV debug color
    }
    else if (u_whichTexture == 4) {
      gl_FragColor = texture2D(u_Sampler4, v_UV); // Use UV debug color
    }
    else if (u_whichTexture == 5) {
      gl_FragColor = texture2D(u_Sampler5, v_UV); // Use UV debug color
    }
    else {
      gl_FragColor = vec4(1, .2, .2, 1); // Error, put redish
    }
  }`

// Global Variables
let canvas;
let gl;
let a_Position;
let a_UV;
let u_FragColor;
let u_ModelMatrix;
let u_ViewMatrix;
let u_ProjectionMatrix;
let u_GlobalRotateMatrix;
let u_Sampler0;
let u_Sampler1;
let u_Sampler2;
let u_Sampler3;
let u_Sampler4;
let u_Sampler5;
let u_whichTexture;

function setupWebGL() {
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
  
  gl.enable(gl.DEPTH_TEST); // Enable depth test
}

function connectVariablesToGLSL() {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of a_UV
  a_UV = gl.getAttribLocation(gl.program, 'a_UV');
  if (a_UV < 0) {
    console.log('Failed to get the storage location of a_UV');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  // Get the storage location of u_ModelMatrix
  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) {
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  // Get the storage location of u_GlobalRotateMatrix
  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
  if (!u_GlobalRotateMatrix) {
    console.log('Failed to get the storage location of u_GlobalRotateMatrix');
    return;
  }

  // Get the storage location of u_ViewMatrix
  u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if (!u_ViewMatrix) {
    console.log('Failed to get the storage location of u_ViewMatrix');
    return;
  }

  // Get the storage location of u_ProjectionMatrix
  u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
  if (!u_ProjectionMatrix) {
    console.log('Failed to get the storage location of u_ProjectionMatrix');
    return;
  }

  // Get the storage location of u_Sampler0
  u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0'); // Get the storage location of u_Sampler0
  if (!u_Sampler0) {
    console.log('Failed to get the storage location of u_Sampler0');
    return false;
  }

  // Get the storage location of u_Sampler1
  u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1'); // Get the storage location of u_Sampler1
  if (!u_Sampler1) {
    console.log('Failed to get the storage location of u_Sampler1');
    return false;
  }

  // Get the storage location of u_Sampler2
  u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2'); // Get the storage location of u_Sampler2
  if (!u_Sampler2) {
    console.log('Failed to get the storage location of u_Sampler2');
    return false;
  }

  // Get the storage location of u_Sampler3
  u_Sampler3 = gl.getUniformLocation(gl.program, 'u_Sampler3'); // Get the storage location of u_Sampler3
  if (!u_Sampler3) {
    console.log('Failed to get the storage location of u_Sampler3');
    return false;
  }

  // Get the storage location of u_Sampler4
  u_Sampler4 = gl.getUniformLocation(gl.program, 'u_Sampler4'); // Get the storage location of u_Sampler4
  if (!u_Sampler4) {
    console.log('Failed to get the storage location of u_Sampler4');
    return false;
  }

  // Get the storage location of u_Sampler5
  u_Sampler5 = gl.getUniformLocation(gl.program, 'u_Sampler5'); // Get the storage location of u_Sampler5
  if (!u_Sampler5) {
    console.log('Failed to get the storage location of u_Sampler5');
    return false;
  }

  // Get the storage location of u_whichTexture
  u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture'); // Get the storage location of u_whichTexture
  if (!u_whichTexture) {
    console.log('Failed to get the storage location of u_whichTexture');
    return false;
  }

  // Set initial value for this matrix to identify
  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}

// Globals related UI elements
let g_isDragging = false;
let g_lastMouseX = null;
let g_lastMouseY = null;
let g_wingsAngle = 0;
let g_lowerBeakAngle = 0;
let g_leftThighAngle = 0;
let g_leftCalfAngle = 0;
let g_leftFootAngle = 0;
let g_rightThighAngle = 0;
let g_rightCalfAngle = 0;
let g_rightFootAngle = 0;
let g_eyesScale = 0;
let g_wingsAnimation = true;
let g_lowerBeakAnimation = true;
let g_leftLegAnimation = true;
let g_leftFootAnimation = true;
let g_rightLegAnimation = true;
let g_rightFootAnimation = true;
let g_camera;
let g_activeKeys = new Set(); // Set to keep track of active keys
let g_keyProcessed = new Set();

function addActionsForHtmlUI() {
  // nothing to do here
}

function initTexture0() {
  // Create the image object
  var image = new Image(); 
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }

  // Register the event handler to be called on loading an image
  image.onload = function() { sendImageToTEXTURE0(image); };
  // Specify the image to be loaded
  image.src = 'ASG3/space.jpeg';

  // Success and image loading
  return true;
}

function initTexture1() {
  // Create the image object
  var image = new Image(); 
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }

  // Register the event handler to be called on loading an image
  image.onload = function() { sendImageToTEXTURE1(image); };
  // Specify the image to be loaded
  image.src = 'ASG3/lava.jpg';

  // Success and image loading
  return true;
}

function initTexture2() {
  // Create the image object
  var image = new Image(); 
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }

  // Register the event handler to be called on loading an image
  image.onload = function() { sendImageToTEXTURE2(image); };
  // Specify the image to be loaded
  image.src = 'ASG3/fire.jpg';

  // Success and image loading
  return true;
}

function initTexture3() {
  // Create the image object
  var image = new Image(); 
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }

  // Register the event handler to be called on loading an image
  image.onload = function() { sendImageToTEXTURE3(image); };
  // Specify the image to be loaded
  image.src = 'ASG3/rock.jpg';

  // Success and image loading
  return true;
}

function initTexture4() {
  // Create the image object
  var image = new Image(); 
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }

  // Register the event handler to be called on loading an image
  image.onload = function() { sendImageToTEXTURE4(image); };
  // Specify the image to be loaded
  image.src = 'ASG3/flowers.jpg';

  // Success and image loading
  return true;
}

function initTexture5() {
  // Create the image object
  var image = new Image(); 
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }

  // Register the event handler to be called on loading an image
  image.onload = function() { sendImageToTEXTURE5(image); };
  // Specify the image to be loaded
  image.src = 'ASG3/grass.jpg';

  // Success and image loading
  return true;
}

function sendImageToTEXTURE0(image) {
  // Create a texture object
  var texture = gl.createTexture(); 
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }
  // Flip the image's y axis
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); 

  // Activate texture unit 0
  gl.activeTexture(gl.TEXTURE0); 

  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture); 

  // Set texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  // Assign the image object to the texture object
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // Pass the texture
  gl.uniform1i(u_Sampler0, 0);
}

function sendImageToTEXTURE1(image) {
  // Create a texture object
  var texture = gl.createTexture();
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  // Flip the image's y axis
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

  // Activate texture unit 1
  gl.activeTexture(gl.TEXTURE1);

  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  // Assign the image object to the texture object
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // Pass the texture
  gl.uniform1i(u_Sampler1, 1);
}

function sendImageToTEXTURE2(image) {
  // Create a texture object
  var texture = gl.createTexture();
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  // Flip the image's y axis
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

  // Activate texture unit 2
  gl.activeTexture(gl.TEXTURE2);

  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  // Assign the image object to the texture object
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // Pass the texture
  gl.uniform1i(u_Sampler2, 2);
}

function sendImageToTEXTURE3(image) {
  // Create a texture object
  var texture = gl.createTexture(); 
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }
  // Flip the image's y axis
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); 

  // Activate texture unit 3
  gl.activeTexture(gl.TEXTURE3); 

  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture); 

  // Set texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  // Assign the image object to the texture object
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // Pass the texture
  gl.uniform1i(u_Sampler3, 3);
}

function sendImageToTEXTURE4(image) {
  // Create a texture object
  var texture = gl.createTexture();
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  // Flip the image's y axis
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

  // Activate texture unit 4
  gl.activeTexture(gl.TEXTURE4);

  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  // Assign the image object to the texture object
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // Pass the texture
  gl.uniform1i(u_Sampler4, 4);
}

function sendImageToTEXTURE5(image) {
  // Create a texture object
  var texture = gl.createTexture();
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  // Flip the image's y axis
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

  // Activate texture unit 5
  gl.activeTexture(gl.TEXTURE5);

  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  // Assign the image object to the texture object
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // Pass the texture
  gl.uniform1i(u_Sampler5, 5);
}

function main() {
  // Set up canvas and gl variables
  setupWebGL();
  //Set up GLSL shaders and connect variables to GLSL
  connectVariablesToGLSL();

  initBuffers(); // Initialize the buffer for 3D triangles

  // Set up actions for HTML UI
  addActionsForHtmlUI();

  document.addEventListener('keydown', (ev) => {
    g_activeKeys.add(ev.key.toLowerCase());
  });

  document.addEventListener('keyup', (ev) => {
    g_activeKeys.delete(ev.key.toLowerCase());
  });

  // Initialize textures
  initTexture0();
  initTexture1();
  initTexture2();
  initTexture3();
  initTexture4();
  initTexture5();

  // Initialize the camera
  g_camera = new Camera(canvas);

  /// ChatGPT helped me with this camera rotation code
  canvas.addEventListener('mousedown', function(ev) {
    g_isDragging = true;
    g_lastMouseX = ev.clientX;
    g_lastMouseY = ev.clientY;
  });

  canvas.addEventListener('mouseup', function(ev) {
    g_isDragging = false;
  });

  canvas.addEventListener('mousemove', function(ev) {
    if (g_isDragging) {
      let dx = ev.clientX - g_lastMouseX;
      let dy = ev.clientY - g_lastMouseY;
      
      // mouse sensitivity
      const panSpeed = 0.2;

      g_camera.panLeft(-dx * panSpeed);
      g_camera.panUp(-dy * panSpeed);

      g_lastMouseX = ev.clientX;
      g_lastMouseY = ev.clientY;

      renderAllShapes(); // Draw the shapes
    }
  });

  // Specify the color for clearing <canvas>
  gl.clearColor(0, 0, 0.9, .5);

  requestAnimationFrame(tick); // Start the tick function
}

var g_startTime = performance.now() / 1000.0; // Start time in seconds
var g_seconds = performance.now() / 1000.0 - g_startTime; // Time in seconds

// Called by browser repeatedly to update the display
function tick() {
  g_seconds = performance.now() / 1000.0 - g_startTime; // Update time in seconds

  updateKeyHandlers(); // Update camera movement based on key presses

  // Update the angles of everything if currently animating
  updateAnimationAngles();

  renderAllShapes(); // Draw the shapes

  requestAnimationFrame(tick); // Request that the browser calls tick
}

function updateKeyHandlers() {
  const speed = 0.2;
  const turn = 2;

  // Handle camera movement based on key presses
  if (g_activeKeys.has('w')) g_camera.moveForward(speed);
  if (g_activeKeys.has('s')) g_camera.moveBackwards(speed);
  if (g_activeKeys.has('a')) g_camera.moveLeft(speed);
  if (g_activeKeys.has('d')) g_camera.moveRight(speed);
  if (g_activeKeys.has('q')) g_camera.panLeft(turn);
  if (g_activeKeys.has('e')) g_camera.panRight(turn);
  if (g_activeKeys.has('o')) g_camera.panUp(turn);
  if (g_activeKeys.has('p')) g_camera.panUp(-turn);
  // F key: Add block
  if (g_activeKeys.has('f')) {
    // Only trigger once per keypress to avoid multiple rapid additions
    if (!g_keyProcessed.has('f')) {
      addBlock();
      g_keyProcessed.add('f');
    }
  } else {
    g_keyProcessed.delete('f');
  }
  // G key: Delete block
  if (g_activeKeys.has('g')) {
    // Only trigger once per keypress
    if (!g_keyProcessed.has('g')) {
      deleteBlock();
      g_keyProcessed.add('g');
    }
  } else {
    g_keyProcessed.delete('g');
  }

  if (g_activeKeys.has('l')) {
    console.log('Camera position:', g_camera.eye.elements);
    console.log('Camera target:', g_camera.at.elements);
    console.log('Camera up:', g_camera.up.elements);
  }
}

// Update the angles of everything if currently animating
function updateAnimationAngles() {
  if (g_wingsAnimation) {
    g_wingsAngle = Math.max(0, 45 * Math.sin(4 * g_seconds));
  }

  if (g_lowerBeakAnimation) {
    g_lowerBeakAngle = Math.min(0, Math.max(-5, 45 * Math.sin(2.5 * g_seconds)));
  }

  if (g_leftLegAnimation) {
    g_leftThighAngle = Math.max(-50, Math.min(50, 45 * Math.sin(2.5 * g_seconds)));
  }

  if (g_rightLegAnimation) {
    g_rightThighAngle = Math.max(-50, Math.min(50, -45 * Math.sin(2.5 * g_seconds)));
  }

  if (g_leftFootAnimation) {
    g_leftFootAngle = Math.max(-10, Math.min(0, 45 * Math.sin(2.5 * g_seconds)));
  }
  
  if (g_rightFootAnimation) {
    g_rightFootAngle = Math.max(-10, Math.min(0, -45 * Math.sin(2.5 * g_seconds)));
  }  

  // ChatGPT helped me with the blinking animation
  let blink = Math.abs(Math.sin(2 * g_seconds));

  if (blink > 0.9) {
    g_eyesScale = 0.01 + (0.07 * (1.0 - blink) * 10.0);
  } 
  else {
    g_eyesScale = 0.08;
  }
}

function keydown(ev) {
  const speed = 0.2;
  const turn = 2;

  switch(ev.key) {
    case 'w': g_camera.moveForward(speed); break;
    case 's': g_camera.moveBackwards(speed); break;
    case 'a': g_camera.moveLeft(speed); break;
    case 'd': g_camera.moveRight(speed); break;
    case 'q': g_camera.panLeft(turn); break;
    case 'e': g_camera.panRight(turn); break;
    case 'o': g_camera.panUp(turn); break;
    case 'p': g_camera.panUp(-turn); break;
  }

  renderAllShapes();
}

var g_eye = [0,5,10];
var g_at = [0,0,-100];
var g_up = [0,1,0];

var g_map = [
  [0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  // Start of tunnel right, 3 is purple block on top, 3.5 is 3 stack
  [4, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3.5, 4.5, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3.5, 4.5, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3.5, 4.5, 4.75, 4.75, 4.75, 4.75, 1, 1, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3.5, 4.5, 4.75, 4.75, 4.75, 4.75, 1, 1, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3.5, 4.5, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3.5, 4.5, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  // ^Start of tunnel left
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.75, 4.8, 0],
  [4, 0, 0, 0, 0, 0, 0, 4, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 0],
  [0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function drawMap() {
  // Draws the map with the array
  for (var x = 0; x < g_map.length; x++) {
    for (var y = 0; y < g_map[x].length; y++) {
      // Block on ground
      if (g_map[x][y] == 1) {
        var cube = new Cube();
        cube.color = [0.675, 0.435, 0.871, .7];
        cube.textureNum = -2;
        cube.matrix.translate(x - 7, -.99, y - 8);
        cube.renderFast();
      }
      // Block 1 unit above ground
      else if (g_map[x][y] == 2) {
        var cube = new Cube();
        cube.color = [0.675, 0.435, 0.871, .7];
        cube.textureNum = -2;
        cube.matrix.translate(x - 7, -.99, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [0.675, 0.435, 0.871, 0.8];
        cube.textureNum = -2; // No texture
        cube.matrix.translate(x - 7, .01, y - 8);
        cube.renderFast();
      }
      else if (g_map[x][y] == 3) {
        var cube = new Cube();
        cube.color = [1, 0, 0, 1];
        cube.textureNum = -2; // No texture
        cube.matrix.translate(x - 7, -.99, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [1, 0, 0, 1];
        cube.textureNum = -2; // No texture
        cube.matrix.translate(x - 7, .01, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [1, 0, 0, 1];
        cube.textureNum = -2; // No texture
        cube.matrix.translate(x - 7, 1.01, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [1, 0, 0, 1];
        cube.textureNum = -2; // No texture
        cube.matrix.translate(x - 7, 2.01, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [1, 0, 0, 1];
        cube.textureNum = -2; // No texture
        cube.matrix.translate(x - 7, 3.01, y - 8);
        cube.renderFast();
      }
      else if (g_map[x][y] == 3.5) {
        var cube = new Cube();
        cube.color = [0.675, 0.435, 0.871, .9];
        cube.textureNum = -2; // No texture
        cube.matrix.translate(x - 7, -.99, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [0.675, 0.435, 0.871, .9];
        cube.textureNum = -2; // No texture
        cube.matrix.translate(x - 7, .01, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [0.675, 0.435, 0.871, .9];
        cube.textureNum = -2; // No texture
        cube.matrix.translate(x - 7, 1.01, y - 8);
        cube.renderFast();
      }
      else if (g_map[x][y] == 4) {
        var cube = new Cube();
        cube.color = [0.5, 0.5, 0.5, 1];
        cube.textureNum = 2; // No texture
        cube.matrix.translate(x - 7, -.99, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [0.5, 0.5, 0.5, 1];
        cube.textureNum = 2; // No texture
        cube.matrix.translate(x - 7, .01, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [0.5, 0.5, 0.5, 1];
        cube.textureNum = 2; // No texture
        cube.matrix.translate(x - 7, 1.01, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [0.5, 0.5, 0.5, 1];
        cube.textureNum = 2; // No texture
        cube.matrix.translate(x - 7, 2.01, y - 8);
        cube.renderFast();
      }
      else if (g_map[x][y] == 4.5) {
        var cube = new Cube();
        cube.color = [0.675, 0.435, 0.871, 1];
        cube.textureNum = -2; // No texture
        cube.matrix.translate(x - 7, -.99, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [0.675, 0.435, 0.871, 1];
        cube.textureNum = -2; // No texture
        cube.matrix.translate(x - 7, .01, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [0.675, 0.435, 0.871, 1];
        cube.textureNum = -2; // No texture
        cube.matrix.translate(x - 7, 1.01, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [0.675, 0.435, 0.871, 1];
        cube.textureNum = -2; // No texture
        cube.matrix.translate(x - 7, 2.01, y - 8);
        cube.renderFast();
      }
      else if (g_map[x][y] == 4.75) {
        var cube = new Cube();
        cube.color = [0, 1, 0, 1];
        cube.textureNum = 5; // No texture
        cube.matrix.translate(x - 7, -.99, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [.2, 0, .7, 1];
        cube.textureNum = 4; // No texture
        cube.matrix.translate(x - 7, 3.01, y - 8);
        cube.renderFast();
      }
      else if (g_map[x][y] == 4.8) {
        var cube = new Cube();
        cube.color = [1, 1, 1, 1];
        cube.textureNum = -2; // No texture
        cube.matrix.translate(x - 7, -.99, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [1, 1, 1, 1];
        cube.textureNum = -2; // No texture
        cube.matrix.translate(x - 7, .01, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [1, 1, 1, 1];
        cube.textureNum = -2; // No texture
        cube.matrix.translate(x - 7, 1.01, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [1, 1, 1, 1];
        cube.textureNum = -2; // No texture
        cube.matrix.translate(x - 7, 2.01, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [1, 1, 1, 1];
        cube.textureNum = -2; // No texture
        cube.matrix.translate(x - 7, 3.01, y - 8);
        cube.renderFast();
      }
      else if (g_map[x][y] == 6) {
        var cube = new Cube();
        cube.color = [0.5, 0.5, 0.5, 1];
        cube.textureNum = 3; // No texture
        cube.matrix.translate(x - 7, -.99, y - 8);
        cube.renderFast();
      }
      else if (g_map[x][y] == 7) {
        var cube = new Cube();
        cube.color = [0.5, 0.5, 0.5, 1];
        cube.textureNum = 3; // No texture
        cube.matrix.translate(x - 7, -.99, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [0.5, 0.5, 0.5, 1];
        cube.textureNum = 3; // No texture
        cube.matrix.translate(x - 7, .01, y - 8);
        cube.renderFast();
      }
      else if (g_map[x][y] == 8) {
        var cube = new Cube();
        cube.color = [0.5, 0.5, 0.5, 1];
        cube.textureNum = 3; // No texture
        cube.matrix.translate(x - 7, -.99, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [0.5, 0.5, 0.5, 1];
        cube.textureNum = 3; // No texture
        cube.matrix.translate(x - 7, .01, y - 8);
        cube.renderFast();
        var cube = new Cube();
        cube.color = [0.5, 0.5, 0.5, 1];
        cube.textureNum = 3; // No texture
        cube.matrix.translate(x - 7, 1.01, y - 8);
        cube.renderFast();
      }
    }
  }
}

function renderAllShapes() {
  var startTime = performance.now();
  g_camera.resize();

  // Initialize the projection and view matrix
  var projectionMatrix = new Matrix4();
  projectionMatrix.setPerspective(60, canvas.width/canvas.height, 1, 100);
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, g_camera.projectionMatrix.elements);

  var viewMatrix = new Matrix4();
  viewMatrix.setLookAt(g_eye[0], g_eye[1], g_eye[2], g_at[0], g_at[1], g_at[2], g_up[0], g_up[1], g_up[2]);
  gl.uniformMatrix4fv(u_ViewMatrix, false, g_camera.viewMatrix.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.clear(gl.COLOR_BUFFER_BIT);

  /// ChatGPT helped me make sure the ground wouldn't rotate
  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, identityM.elements);

  drawMap(); // Draw the map

  // Ground
  var ground = new Cube();
  ground.color = [0.0, 0.4, 0.0, 1];
  ground.textureNum = 1; // No texture
  ground.matrix.translate(-7.0, -1, -8);
  ground.matrix.rotate(0, 1, 0, 0);
  ground.matrix.scale(32.0, 0.01, 32.0);
  ground.render();

  // Sky
  var sky = new Cube();
  sky.color = [0, 0, 0, 1];
  sky.textureNum = 0; // Sky texture
  sky.matrix.scale(200, 200, 200);
  sky.matrix.translate(-.4, -0.5, -0.5);
  sky.render();

  let chickenOffset = Math.sin(g_seconds * 1.5) * 2.0;
  let chickenMatrix = new Matrix4();
  chickenMatrix.translate(-1, 5 + chickenOffset, 16); // Move along X-axis

  drawChicken(chickenMatrix); // Draw the chicken

  var duration = performance.now() - startTime;
  sendTextToHTML("ms: " + Math.floor(duration) + " fps: " + Math.floor(1000/duration), "numdot");
}

/// Claude helped me with these simple minecraft functions
function getBlockInFront(camera, distance = 2) {
  // Get direction vector from eye to at point
  const direction = new Vector3([
    camera.at.elements[0] - camera.eye.elements[0],
    camera.at.elements[1] - camera.eye.elements[1],
    camera.at.elements[2] - camera.eye.elements[2]
  ]).normalize();

  // Calculate position slightly in front of camera
  const frontPosition = new Vector3([
    camera.eye.elements[0] + direction.elements[0] * distance,
    camera.eye.elements[1] + direction.elements[1] * distance,
    camera.eye.elements[2] + direction.elements[2] * distance
  ]);

  // Convert to map coordinates (reverse the translation done in drawMap)
  // In drawMap: cube.matrix.translate(x - 7, y, z - 8);
  // So we add 7 to x and 8 to z to get map coordinates
  const mapX = Math.round(frontPosition.elements[0] + 7);
  const mapZ = Math.round(frontPosition.elements[2] + 8);
  
  return { mapX, mapZ };
}

function addBlock() {
  const { mapX, mapZ } = getBlockInFront(g_camera);
  
  // Check if coordinates are within map bounds
  if (mapX >= 0 && mapX < g_map.length && mapZ >= 0 && mapZ < g_map[0].length) {
    console.log(`Adding block at map position (${mapX}, ${mapZ})`);
    
    // Current value at this position
    const currentValue = g_map[mapX][mapZ];
    
    // Add or modify block based on current value
    if (currentValue === 0) {
      // If empty, add a rock
      g_map[mapX][mapZ] = 6;
    } else if (currentValue === 1) {
      // If there's a simple block, upgrade to a green double block
      g_map[mapX][mapZ] = 2; 
    } else if (currentValue === 2) {
      // If there's a double block, upgrade to a triple yellow block
      g_map[mapX][mapZ] = 3.5;
    } else if (currentValue === 3.5) {
      // If there's a triple block, upgrade to a full yellow + purple stack
      g_map[mapX][mapZ] = 3;
    } else if (currentValue === 6) {
      // If there's a rock, upgrade to a double block
      g_map[mapX][mapZ] = 7;
    } else if (currentValue === 7) {
      // If there's a double block, upgrade to a triple block
      g_map[mapX][mapZ] = 8;
    }
    // Otherwise, don't change anything (already a complex structure)
    
    console.log(`Block at (${mapX}, ${mapZ}) is now ${g_map[mapX][mapZ]}`);
  } else {
    console.log("Cannot add block: position out of map bounds");
  }
}

// Function to delete/reduce a block in front of the camera
function deleteBlock() {
  const { mapX, mapZ } = getBlockInFront(g_camera);
  
  // Check if coordinates are within map bounds
  if (mapX >= 0 && mapX < g_map.length && mapZ >= 0 && mapZ < g_map[0].length) {
    console.log(`Deleting/reducing block at map position (${mapX}, ${mapZ})`);
    
    // Get the current value
    const currentValue = g_map[mapX][mapZ];
    
    // Remove/reduce block based on current value
    if (currentValue === 0) {
      // Already empty
      console.log("No block to delete here");
    } else if (currentValue === 1) {
      // If simple block, remove it
      g_map[mapX][mapZ] = 0;
    } else if (currentValue === 2) {
      // If double block, reduce to single
      g_map[mapX][mapZ] = 1;
    } else if (currentValue === 3) {
      // If triple or quad block, reduce to double
      g_map[mapX][mapZ] = 4.5;
    } else if (currentValue === 4.5) {
      g_map[mapX][mapZ] = 3.5;
    } else if (currentValue === 3.5) {
      g_map[mapX][mapZ] = 2;
    } else if (currentValue === 4 || currentValue === 4.75 || currentValue === 4.8) {
      // If it's a wall or special structure, don't allow deletion
      // This preserves the main structure of the map
      console.log("Cannot delete structural blocks");
    } else if (currentValue === 5) {
      // If it's a blue elevated block, remove it
      g_map[mapX][mapZ] = 0;
    } else if (currentValue === 6) {
      g_map[mapX][mapZ] = 0;
    } else if (currentValue === 7) {
      // If there's a double block, reduce to single
      g_map[mapX][mapZ] = 6;
    } else if (currentValue === 8) {
      // If there's a triple block, reduce to double
      g_map[mapX][mapZ] = 7;
    }
    
    console.log(`Block at (${mapX}, ${mapZ}) is now ${g_map[mapX][mapZ]}`);
  } else {
    console.log("Cannot delete block: position out of map bounds");
  }
}

function drawChicken(moveMatrix) {
  // Left thigh
  var leftThigh = new Cube();
  leftThigh.color = [0.9, 0.7, 0, 1.0];
  leftThigh.matrix = new Matrix4(moveMatrix);
  leftThigh.matrix.translate(9.9, -.35, 0.0); // Translated by 10 units to the right
  leftThigh.matrix.rotate(180, 0, 0, 1);
  leftThigh.matrix.rotate(g_leftThighAngle, 1, 0, 0);
  var leftThighCoordinatesMat = new Matrix4(leftThigh.matrix);
  leftThigh.matrix.scale(0.1, 0.175, 0.05);
  leftThigh.render();

  // Left calf
  var leftCalf = new Cube();
  leftCalf.color = [0.9, 0.7, 0, 1.0];
  leftCalf.matrix = new Matrix4(moveMatrix);
  leftCalf.matrix = leftThighCoordinatesMat;
  leftCalf.matrix.translate(0.0, .175, 0.0);
  leftCalf.matrix.rotate(g_leftCalfAngle, 1, 0, 0);
  var leftCalfCoordinatesMat = new Matrix4(leftCalf.matrix);
  leftCalf.matrix.scale(0.1, 0.175, 0.05);
  leftCalf.render();

  // Left Foot
  var leftFoot = new Cube();
  leftFoot.color = [0.9, 0.7, 0, 1.0];
  leftFoot.matrix = new Matrix4(moveMatrix);
  leftFoot.matrix = leftCalfCoordinatesMat;
  leftFoot.matrix.translate(.15, .155, .1);
  leftFoot.matrix.rotate(180, 0, 1, 0);
  leftFoot.matrix.rotate(g_leftFootAngle, 1, 0, 0);
  leftFoot.matrix.scale(.2, .02, .3);
  leftFoot.render();

  // Right thigh
  var rightThigh = new Cube();
  rightThigh.color = [0.9, 0.7, 0, 1.0];
  rightThigh.matrix = new Matrix4(moveMatrix);
  rightThigh.matrix.translate(10.2, -.35, 0.0); // Translated by 10 units to the right
  rightThigh.matrix.rotate(180, 0, 0, 1);
  rightThigh.matrix.rotate(g_rightThighAngle, 1, 0, 0);
  var rightThighCoordinatesMat = new Matrix4(rightThigh.matrix);
  rightThigh.matrix.scale(0.1, 0.175, 0.05);
  rightThigh.render();

  // Right calf
  var rightCalf = new Cube();
  rightCalf.color = [0.9, 0.7, 0, 1.0];
  rightCalf.matrix = new Matrix4(moveMatrix);
  rightCalf.matrix = rightThighCoordinatesMat;
  rightCalf.matrix.translate(0.0, .175, 0.0);
  rightCalf.matrix.rotate(g_rightCalfAngle, 1, 0, 0);
  var rightCalfCoordinatesMat = new Matrix4(rightCalf.matrix);
  rightCalf.matrix.scale(0.1, 0.175, 0.05);
  rightCalf.render();

  // Right Foot
  var rightFoot = new Cube();
  rightFoot.color = [0.9, 0.7, 0, 1.0];
  rightFoot.matrix = new Matrix4(moveMatrix);
  rightFoot.matrix = rightCalfCoordinatesMat;
  rightFoot.matrix.translate(.15, .155, .1);
  rightFoot.matrix.rotate(180, 0, 1, 0);
  rightFoot.matrix.rotate(g_rightFootAngle, 1, 0, 0);
  rightFoot.matrix.scale(.2, .02, .3);
  rightFoot.render();

  // Gray body
  var body = new Cube();
  body.color = [0.8, 0.8, 0.8, 1.0];
  body.matrix = new Matrix4(moveMatrix);
  body.textureNum = -2; // No texture
  body.matrix.translate(9.75, -.4, -0.4); // Translated by 10 units to the right
  body.matrix.rotate(0, 1, 0, 0);
  body.matrix.scale(0.5, 0.5, 0.7);
  body.render();

  // Right wing
  var rightWing = new Cube();
  rightWing.color = [0.6, 0.6, 0.6, 1.0];
  rightWing.matrix = new Matrix4(moveMatrix);
  rightWing.matrix.translate(10.25, 0.1, 0.25); // Translated by 10 units to the right
  rightWing.matrix.rotate(180, 1, 0, 0);
  rightWing.matrix.rotate(-g_wingsAngle, 0, 0, 1);
  rightWing.matrix.scale(0.07, 0.33, 0.5);
  rightWing.render();

  // Left wing
  var leftWing = new Cube();
  leftWing.color = [0.6, 0.6, 0.6, 1.0];
  leftWing.matrix = new Matrix4(moveMatrix);
  leftWing.matrix.translate(9.75, .1, -0.25); // Translated by 10 units to the right
  leftWing.matrix.rotate(180, 0, 0, 1);
  leftWing.matrix.rotate(-g_wingsAngle, 0, 0, 1);
  leftWing.matrix.scale(0.07, 0.33, 0.5);
  leftWing.render();

  // Head
  var head = new Cube();
  head.color = [0.9, 0.9, 0.9, 1.0];
  head.matrix = new Matrix4(moveMatrix);
  head.matrix.translate(9.85, 0.03, -0.6); // Translated by 10 units to the right
  head.matrix.rotate(0, 1, 0, 0);
  head.matrix.scale(0.3001, 0.43, 0.27);
  head.render();

  // Beak upper
  var beakUpper = new Cube();
  beakUpper.color = [1.0, 0.6, 0.0, 1.0];
  beakUpper.matrix = new Matrix4(moveMatrix);
  beakUpper.matrix.translate(9.852, 0.23, -0.75); // Translated by 10 units to the right
  beakUpper.matrix.rotate(0, 1, 0, 0);
  beakUpper.matrix.scale(0.295, 0.05, 0.3);
  beakUpper.render();

  // Beak lower
  var beakLower = new Cube();
  beakLower.color = [0.8, 0.5, 0.0, 1.0];
  beakLower.matrix = new Matrix4(moveMatrix);
  beakLower.matrix.translate(9.852, 0.23, -0.45); // Translated by 10 units to the right
  beakLower.matrix.rotate(180, 1, 0, 0);
  beakLower.matrix.rotate(g_lowerBeakAngle, 1, 0, 0);
  beakLower.matrix.scale(0.295, 0.05, 0.3);
  beakLower.render();

  // Gizzard
  var gizzard = new Cube();
  gizzard.color = [1.0, 0, 0.0, 1.0];
  gizzard.matrix = new Matrix4(moveMatrix);
  gizzard.matrix.translate(9.93, 0.04, -0.7); // Translated by 10 units to the right
  gizzard.matrix.rotate(0, 1, 0, 0);
  gizzard.matrix.scale(0.13, 0.15, 0.1);
  gizzard.render();

  // Left eye
  var leftEye = new Cube();
  leftEye.color = [0.0, 0.0, 0.0, 1.0];
  leftEye.matrix = new Matrix4(moveMatrix);
  leftEye.matrix.translate(9.85, 0.28, -0.602); // Translated by 10 units to the right
  leftEye.matrix.rotate(0, 1, 0, 0);
  leftEye.matrix.scale(0.08, g_eyesScale, 0.01);
  leftEye.render();

  // Right eye
  var rightEye = new Cube();
  rightEye.color = [0.0, 0.0, 0.0, 1.0];
  rightEye.matrix = new Matrix4(moveMatrix);
  rightEye.matrix.translate(10.07, 0.28, -0.602); // Translated by 10 units to the right
  rightEye.matrix.rotate(0, 1, 0, 0);
  rightEye.matrix.scale(0.08, g_eyesScale, 0.01);
  rightEye.render();
}

function sendTextToHTML(text, htmlID) {
  var htmlElm = document.getElementById(htmlID);
  if (!htmlElm) {
    console.log('Failed to get the storage location of ' + htmlID);
    return;
  }
  htmlElm.innerHTML = text;
}

function click(ev) {
  // Extract the event click and return it in WebGL coordinates
  let [x, y] = convertCoordinatesEventToGL(ev);

  // Draw every shape that is supposed to be drawn
  renderAllShapes();
}

function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return([x, y]);
}