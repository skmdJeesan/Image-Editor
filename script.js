
let filters = {
  brightness: { value: 100, min: 0, max: 200, unit: '%'},
  contrast: { value: 100, min: 0, max: 200, unit: '%'},
  //exprosure: { value: 100, min: 0, max: 200, unit: '%'},
  saturation: { value: 100, min: 0, max: 200, unit: '%'},
  hueRotation: { value: 0, min: 0, max: 360, unit: 'deg'},
  blur: { value: 0, min: 0, max: 20, unit: 'px'},
  grayscale: { value: 0, min: 0, max: 100, unit: '%'},
  sepia: { value: 0, min: 0, max: 100, unit: '%'},
  opacity: { value: 100, min: 0, max: 100, unit: '%'},
  invert: { value: 0, min: 0, max: 100, unit: '%'},
} 

function createFilterElem(name, value, min, max, unit) {
  const div = document.createElement('div');
  div.classList.add('filter');

  const input = document.createElement('input');
  input.type = 'range';  
  input.name = name;  
  input.value = value;  
  input.min = min;  
  input.max = max;  
  input.unit = unit;

  const p = document.createElement('p');
  p.innerText = name;

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener('input', (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    filters[name].value = input.value;
    applyFilter()
  })

  return div;
}

const filterContainer = document.querySelector('.filters')
function createFilters() {
  Object.keys(filters).forEach(filter => {
    const filterElem = createFilterElem(filter, filters[filter].value, filters[filter].min, filters[filter].max, filters[filter].unit);
    filterContainer.appendChild(filterElem)
  })
}

createFilters();

const imageCanvas = document.querySelector('#image-canvas');
const canvasCtx = imageCanvas.getContext('2d');
let file = null;
let image = null;
const imageInput = document.querySelector('#image-input');
const imgPlaceholder = document.querySelector('.placeholder');

imageInput.addEventListener('change', (event) => {
  file = event.target.files[0];
  imgPlaceholder.style.display = 'none';
  imageCanvas.style.display = 'block';
  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    image = img;
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    canvasCtx.drawImage(img,0,0);
  }
})

function applyFilter() {
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
  canvasCtx.filter = `
  brightness(${filters.brightness.value}${filters.brightness.unit})
  contrast(${filters.contrast.value}${filters.contrast.unit})
  saturate(${filters.saturation.value}${filters.saturation.unit})
  hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
  blur(${filters.blur.value}${filters.blur.unit})
  grayscale(${filters.grayscale.value}${filters.grayscale.unit})
  sepia(${filters.sepia.value}${filters.sepia.unit})
  opacity(${filters.opacity.value}${filters.opacity.unit})
  invert(${filters.invert.value}${filters.invert.unit})
  `.trim();
  canvasCtx.drawImage(image,0,0);
}

const resetBtn = document.querySelector('#reset-btn')
resetBtn.addEventListener('click', () => {
  filters = {
    brightness: { value: 100, min: 0, max: 200, unit: '%'},
    contrast: { value: 100, min: 0, max: 200, unit: '%'},
    //exprosure: { value: 100, min: 0, max: 200, unit: '%'},
    saturation: { value: 100, min: 0, max: 200, unit: '%'},
    hueRotation: { value: 0, min: 0, max: 360, unit: 'deg'},
    blur: { value: 0, min: 0, max: 20, unit: 'px'},
    grayscale: { value: 0, min: 0, max: 100, unit: '%'},
    sepia: { value: 0, min: 0, max: 100, unit: '%'},
    opacity: { value: 100, min: 0, max: 100, unit: '%'},
    invert: { value: 0, min: 0, max: 100, unit: '%'},
  }
  applyFilter()
  filterContainer.innerHTML = '';
  createFilters();
  document.querySelectorAll('.btn').forEach(btn => {
    if (btn.classList.contains('selected')) 
      btn.classList.remove('selected');
  });
})

const downloadBtn = document.querySelector('#download-btn')
downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'edited-image.png';
  link.href = imageCanvas.toDataURL();
  link.click();
})

const filterPresets = {
  normal: {
    brightness: { value: 100, min: 0, max: 200, unit: '%' },
    contrast: { value: 100, min: 0, max: 200, unit: '%' },
    saturation: { value: 100, min: 0, max: 200, unit: '%' },
    hueRotation: { value: 0, min: 0, max: 360, unit: 'deg' },
    blur: { value: 0, min: 0, max: 20, unit: 'px' },
    grayscale: { value: 0, min: 0, max: 100, unit: '%' },
    sepia: { value: 0, min: 0, max: 100, unit: '%' },
    opacity: { value: 100, min: 0, max: 100, unit: '%' },
    invert: { value: 0, min: 0, max: 100, unit: '%' }
  },

  vintage: {
    brightness: { value: 90, min: 0, max: 200, unit: '%' },
    contrast: { value: 85, min: 0, max: 200, unit: '%' },
    saturation: { value: 60, min: 0, max: 200, unit: '%' },
    hueRotation: { value: 10, min: 0, max: 360, unit: 'deg' },
    blur: { value: 0.3, min: 0, max: 20, unit: 'px' },
    grayscale: { value: 0, min: 0, max: 100, unit: '%' },
    sepia: { value: 40, min: 0, max: 100, unit: '%' },
    opacity: { value: 100, min: 0, max: 100, unit: '%' },
    invert: { value: 0, min: 0, max: 100, unit: '%' }
  },

  blackAndWhite: {
    brightness: { value: 105, min: 0, max: 200, unit: '%' },
    contrast: { value: 120, min: 0, max: 200, unit: '%' },
    saturation: { value: 0, min: 0, max: 200, unit: '%' },
    hueRotation: { value: 0, min: 0, max: 360, unit: 'deg' },
    blur: { value: 0, min: 0, max: 20, unit: 'px' },
    grayscale: { value: 100, min: 0, max: 100, unit: '%' },
    sepia: { value: 0, min: 0, max: 100, unit: '%' },
    opacity: { value: 100, min: 0, max: 100, unit: '%' },
    invert: { value: 0, min: 0, max: 100, unit: '%' }
  },

  dramatic: {
    brightness: { value: 80, min: 0, max: 200, unit: '%' },
    contrast: { value: 150, min: 0, max: 200, unit: '%' },
    saturation: { value: 120, min: 0, max: 200, unit: '%' },
    hueRotation: { value: 0, min: 0, max: 360, unit: 'deg' },
    blur: { value: 0, min: 0, max: 20, unit: 'px' },
    grayscale: { value: 0, min: 0, max: 100, unit: '%' },
    sepia: { value: 0, min: 0, max: 100, unit: '%' },
    opacity: { value: 100, min: 0, max: 100, unit: '%' },
    invert: { value: 0, min: 0, max: 100, unit: '%' }
  },

  softGlow: {
    brightness: { value: 110, min: 0, max: 200, unit: '%' },
    contrast: { value: 90, min: 0, max: 200, unit: '%' },
    saturation: { value: 85, min: 0, max: 200, unit: '%' },
    hueRotation: { value: 0, min: 0, max: 360, unit: 'deg' },
    blur: { value: 1, min: 0, max: 20, unit: 'px' },
    grayscale: { value: 0, min: 0, max: 100, unit: '%' },
    sepia: { value: 10, min: 0, max: 100, unit: '%' },
    opacity: { value: 100, min: 0, max: 100, unit: '%' },
    invert: { value: 0, min: 0, max: 100, unit: '%' }
  },

  warm: {
    brightness: { value: 95, min: 0, max: 200, unit: '%' },
    contrast: { value: 110, min: 0, max: 200, unit: '%' },
    saturation: { value: 130, min: 0, max: 200, unit: '%' },
    hueRotation: { value: 15, min: 0, max: 360, unit: 'deg' },
    blur: { value: 0, min: 0, max: 20, unit: 'px' },
    grayscale: { value: 0, min: 0, max: 100, unit: '%' },
    sepia: { value: 25, min: 0, max: 100, unit: '%' },
    opacity: { value: 100, min: 0, max: 100, unit: '%' },
    invert: { value: 0, min: 0, max: 100, unit: '%' }
  },

  cool: {
    brightness: { value: 105, min: 0, max: 200, unit: '%' },
    contrast: { value: 115, min: 0, max: 200, unit: '%' },
    saturation: { value: 90, min: 0, max: 200, unit: '%' },
    hueRotation: { value: 200, min: 0, max: 360, unit: 'deg' },
    blur: { value: 0, min: 0, max: 20, unit: 'px' },
    grayscale: { value: 0, min: 0, max: 100, unit: '%' },
    sepia: { value: 0, min: 0, max: 100, unit: '%' },
    opacity: { value: 100, min: 0, max: 100, unit: '%' },
    invert: { value: 0, min: 0, max: 100, unit: '%' }
  },

  highContrast: {
    brightness: { value: 100, min: 0, max: 200, unit: '%' },
    contrast: { value: 180, min: 0, max: 200, unit: '%' },
    saturation: { value: 140, min: 0, max: 200, unit: '%' },
    hueRotation: { value: 0, min: 0, max: 360, unit: 'deg' },
    blur: { value: 0, min: 0, max: 20, unit: 'px' },
    grayscale: { value: 0, min: 0, max: 100, unit: '%' },
    sepia: { value: 0, min: 0, max: 100, unit: '%' },
    opacity: { value: 100, min: 0, max: 100, unit: '%' },
    invert: { value: 0, min: 0, max: 100, unit: '%' }
  },

  dreamy: {
    brightness: { value: 115, min: 0, max: 200, unit: '%' },
    contrast: { value: 85, min: 0, max: 200, unit: '%' },
    saturation: { value: 70, min: 0, max: 200, unit: '%' },
    hueRotation: { value: 300, min: 0, max: 360, unit: 'deg' },
    blur: { value: 2, min: 0, max: 20, unit: 'px' },
    grayscale: { value: 0, min: 0, max: 100, unit: '%' },
    sepia: { value: 15, min: 0, max: 100, unit: '%' },
    opacity: { value: 90, min: 0, max: 100, unit: '%' },
    invert: { value: 0, min: 0, max: 100, unit: '%' }
  },

  noir: {
    brightness: { value: 85, min: 0, max: 200, unit: '%' },
    contrast: { value: 130, min: 0, max: 200, unit: '%' },
    saturation: { value: 0, min: 0, max: 200, unit: '%' },
    hueRotation: { value: 0, min: 0, max: 360, unit: 'deg' },
    blur: { value: 0.5, min: 0, max: 20, unit: 'px' },
    grayscale: { value: 100, min: 0, max: 100, unit: '%' },
    sepia: { value: 20, min: 0, max: 100, unit: '%' },
    opacity: { value: 100, min: 0, max: 100, unit: '%' },
    invert: { value: 0, min: 0, max: 100, unit: '%' }
  },

  popArt: {
    brightness: { value: 120, min: 0, max: 200, unit: '%' },
    contrast: { value: 140, min: 0, max: 200, unit: '%' },
    saturation: { value: 180, min: 0, max: 200, unit: '%' },
    hueRotation: { value: 45, min: 0, max: 360, unit: 'deg' },
    blur: { value: 0, min: 0, max: 20, unit: 'px' },
    grayscale: { value: 0, min: 0, max: 100, unit: '%' },
    sepia: { value: 0, min: 0, max: 100, unit: '%' },
    opacity: { value: 100, min: 0, max: 100, unit: '%' },
    invert: { value: 0, min: 0, max: 100, unit: '%' }
  },

  faded: {
    brightness: { value: 110, min: 0, max: 200, unit: '%' },
    contrast: { value: 80, min: 0, max: 200, unit: '%' },
    saturation: { value: 60, min: 0, max: 200, unit: '%' },
    hueRotation: { value: 0, min: 0, max: 360, unit: 'deg' },
    blur: { value: 0.8, min: 0, max: 20, unit: 'px' },
    grayscale: { value: 20, min: 0, max: 100, unit: '%' },
    sepia: { value: 30, min: 0, max: 100, unit: '%' },
    opacity: { value: 95, min: 0, max: 100, unit: '%' },
    invert: { value: 0, min: 0, max: 100, unit: '%' }
  },

  cinematic: {
    brightness: { value: 90, min: 0, max: 200, unit: '%' },
    contrast: { value: 125, min: 0, max: 200, unit: '%' },
    saturation: { value: 110, min: 0, max: 200, unit: '%' },
    hueRotation: { value: 350, min: 0, max: 360, unit: 'deg' },
    blur: { value: 0.2, min: 0, max: 20, unit: 'px' },
    grayscale: { value: 10, min: 0, max: 100, unit: '%' },
    sepia: { value: 15, min: 0, max: 100, unit: '%' },
    opacity: { value: 100, min: 0, max: 100, unit: '%' },
    invert: { value: 0, min: 0, max: 100, unit: '%' }
  },

  negative: {
    brightness: { value: 100, min: 0, max: 200, unit: '%' },
    contrast: { value: 100, min: 0, max: 200, unit: '%' },
    saturation: { value: 100, min: 0, max: 200, unit: '%' },
    hueRotation: { value: 0, min: 0, max: 360, unit: 'deg' },
    blur: { value: 0, min: 0, max: 20, unit: 'px' },
    grayscale: { value: 0, min: 0, max: 100, unit: '%' },
    sepia: { value: 0, min: 0, max: 100, unit: '%' },
    opacity: { value: 100, min: 0, max: 100, unit: '%' },
    invert: { value: 100, min: 0, max: 100, unit: '%' }
  },
};

const presetContainer = document.querySelector('.presets');
Object.keys(filterPresets).forEach(preset => {
  const presetBtn = document.createElement('button');
  presetBtn.classList.add('btn');
  presetBtn.innerText = preset;
  presetContainer.appendChild(presetBtn);

  presetBtn.addEventListener('click', () => {
    const presetFilter = filterPresets[preset];
    Object.keys(presetFilter).forEach(filterName => {
      filters[filterName] = presetFilter[filterName];
    })
    applyFilter()
    filterContainer.innerHTML = ''
    createFilters()
    document.querySelectorAll('.btn').forEach(btn => {
      if (btn.classList.contains('selected')) 
        btn.classList.remove('selected');
    });
    presetBtn.classList.add('selected');
  })

})

