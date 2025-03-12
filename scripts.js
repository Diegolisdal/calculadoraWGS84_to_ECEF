
    // Función para convertir de DMS a grados decimales
    function dmsToDecimal(deg, min, sec, hemisphere) {
        let decimal = Math.abs(deg) + (min / 60) + (sec / 3600);
        if (hemisphere === 'S' || hemisphere === 'W') {
          decimal = -decimal;
        }
        return decimal;
      }
      
      function convertir(){
        // Obtener valores de entrada
        let latDeg = parseFloat(document.getElementById("latDegrees").value);
        let latMin = parseFloat(document.getElementById("latMinutes").value);
        let latSec = parseFloat(document.getElementById("latSeconds").value);
        let latHem = document.getElementById("latHemisphere").value;
        
        let lonDeg = parseFloat(document.getElementById("lonDegrees").value);
        let lonMin = parseFloat(document.getElementById("lonMinutes").value);
        let lonSec = parseFloat(document.getElementById("lonSeconds").value);
        let lonHem = document.getElementById("lonHemisphere").value;
        
        let height = parseFloat(document.getElementById("height").value);
        
        // Validar que se hayan ingresado todos los campos
        if(isNaN(latDeg) || isNaN(latMin) || isNaN(latSec) ||
           isNaN(lonDeg) || isNaN(lonMin) || isNaN(lonSec) || isNaN(height)){
          alert("Por favor, completa todos los campos numéricos.");
          return;
        }
        
        // Convertir DMS a grados decimales
        let latDec = dmsToDecimal(latDeg, latMin, latSec, latHem);
        let lonDec = dmsToDecimal(lonDeg, lonMin, lonSec, lonHem);
        
        // Convertir a radianes
        let latRad = latDec * Math.PI / 180;
        let lonRad = lonDec * Math.PI / 180;
        
        // Parámetros del elipsoide WGS84
        let a = 6378137.0;
        let f = 1 / 298.257223563;
        let e2 = f * (2 - f);
        
        // Calcular el radio de curvatura en el primer vertical (N)
        let sinLat = Math.sin(latRad);
        let N = a / Math.sqrt(1 - e2 * sinLat * sinLat);
        
        // Fórmulas de conversión a ECEF
        let X = (N + height) * Math.cos(latRad) * Math.cos(lonRad);
        let Y = (N + height) * Math.cos(latRad) * Math.sin(lonRad);
        let Z = ((1 - e2) * N + height) * sinLat;
        
        // Mostrar resultados con 4 decimales
        document.getElementById("xCoord").textContent = "X: " + X.toFixed(4) + " m";
        document.getElementById("yCoord").textContent = "Y: " + Y.toFixed(4) + " m";
        document.getElementById("zCoord").textContent = "Z: " + Z.toFixed(4) + " m";
        document.getElementById("resultado").style.display = "block";
      }
    