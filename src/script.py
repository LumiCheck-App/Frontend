import requests
import re

# Sua chave de API do OpenCage
API_KEY = "e74c96f0b4fc4247b4e56dec496fe8e4"

# Função para obter dados da API do OpenCage
def get_location_data(lat, lon):
    url = f"https://api.opencagedata.com/geocode/v1/json?q={lat}+{lon}&key={API_KEY}&language=pt"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data['results']:
            result = data['results'][0]
            country = result['components'].get('country', 'Desconhecido')
            state = result['components'].get('county', result['components'].get('archipelago', 'Outro'))
            city = result['components'].get('city', result['components'].get('town', 'Outro'))
            print(f"Pedido para coordenadas ({lat}, {lon}) retornou: País - {country}, Estado/Distrito - {state}, Cidade - {city}")
            return country, state, city
    else:
        print(f"Erro ao acessar OpenCage para coordenadas ({lat}, {lon}): {response.status_code}")
    return None, None, None

# Caminho do ficheiro .js
js_file_path = "C:/Users/rodri/Desktop/LumiCheck/Frontend/src/psicologos2.js"

# Ler o conteúdo do ficheiro .js
with open(js_file_path, "r", encoding="utf-8") as file:
    js_content = file.read()

# Encontrar todas as coordenadas no ficheiro .js
pattern = re.compile(r"LatLng: \[\{ lat: ([\d.\-]+), lng: ([\d.\-]+) \}\]")
coordinates = pattern.findall(js_content)

# Atualizar o conteúdo do ficheiro com país, estado e cidade
for lat, lon in coordinates:
    country, state, city = get_location_data(lat, lon)
    if country and state and city:
        place_desc_pattern = re.compile(
            rf"LatLng: \[\{{ lat: {lat}, lng: {lon} \}}\]",
            re.MULTILINE
        )
        replacement_text = f"LatLng: [{{ lat: {lat}, lng: {lon} }}], Pais: '{country}', Distrito: '{state}', Cidade: '{city}'"
        js_content = place_desc_pattern.sub(replacement_text, js_content)

# Escrever o conteúdo atualizado de volta no ficheiro .js
with open(js_file_path, "w", encoding="utf-8") as file:
    file.write(js_content)

print("Ficheiro .js atualizado com sucesso!")
