import math

def dms_to_decimal(deg, minutes, seconds):
    """
    Convierte coordenadas en formato DMS a grados decimales.
    Se toma en cuenta el signo del grado.
    """
    sign = 1 if deg >= 0 else -1
    return sign * (abs(deg) + minutes / 60 + seconds / 3600)

def main():
    print("Ingrese la latitud en formato DMS (grados, minutos y segundos con decimales).")
    lat_deg = float(input("  Grados (deben ser negativos): "))
    lat_min = float(input("  Minutos: "))
    lat_sec = float(input("  Segundos: "))
    lat_dec = dms_to_decimal(lat_deg, lat_min, lat_sec)
    
    print("\nIngrese la longitud en formato DMS (grados, minutos y segundos con decimales).")
    lon_deg = float(input("  Grados (deben ser negativos): "))
    lon_min = float(input("  Minutos: "))
    lon_sec = float(input("  Segundos: "))
    lon_dec = dms_to_decimal(lon_deg, lon_min, lon_sec)
    
    h = float(input("\nIngrese la altura (en metros): "))
    
    # Convertir a radianes
    lat_rad = math.radians(lat_dec)
    lon_rad = math.radians(lon_dec)
    
    # Parámetros del elipsoide WGS84
    a = 6378137.0
    f = 1 / 298.257223563
    e2 = f * (2 - f)  # e^2 = 2f - f^2
    
    # Calcular el radio de curvatura en el primer vertical
    N = a / math.sqrt(1 - e2 * (math.sin(lat_rad) ** 2))
    
    # Cálculo de las coordenadas ECEF
    X = (N + h) * math.cos(lat_rad) * math.cos(lon_rad)
    Y = (N + h) * math.cos(lat_rad) * math.sin(lon_rad)
    Z = ((1 - e2) * N + h) * math.sin(lat_rad)
    
    print("\nCoordenadas ECEF:")
    print(f"  X: {X:.4f} m")
    print(f"  Y: {Y:.4f} m")
    print(f"  Z: {Z:.4f} m")

if __name__ == '__main__':
    main()
