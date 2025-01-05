import re

# Caminho do ficheiro .js
js_file_path = "C:/Users/rodri/Desktop/LumiCheck/Frontend/src/psicologos.js"
updated_js_file_path = "C:/Users/rodri/Desktop/LumiCheck/Frontend/src/psicologos_atualizado.js"

# Regex para encontrar cada objeto no array e capturar telefones
objeto_regex = r'\{(.*?)\}'
telefone_regex = r',Telefone:\s?([^,]+)'

# Ler o conteúdo do ficheiro .js
with open(js_file_path, "r", encoding="utf-8") as file:
    js_content = file.read()

# Processar cada objeto no array
def processar_objetos(js_content):
    objetos = re.findall(objeto_regex, js_content, re.DOTALL)
    novos_objetos = []

    for objeto in objetos:
        objeto_completo = '{' + objeto + '}'
        
        # Encontrar todos os telefones na descrição
        telefones = re.findall(telefone_regex, objeto_completo)

        if telefones:
            # Remover os telefones da descrição
            objeto_sem_telefone = re.sub(telefone_regex, '', objeto_completo).strip(', ')

            # Adicionar os telefones como um novo campo
            telefones_str = ', '.join([f'"{telefone.strip()}"' for telefone in telefones])
            objeto_sem_telefone = (
                objeto_sem_telefone.rstrip('}')
                + ', "Telefone": [' + telefones_str + ']}'
            )
            novos_objetos.append(objeto_sem_telefone)
        else:
            # Caso não haja telefone, manter o objeto original
            novos_objetos.append(objeto_completo)

    # Reconstituir o array de objetos no formato original
    return 'export const markersOnMap = [\n' + ',\n'.join(novos_objetos) + '\n];'

# Processar o conteúdo
js_content_atualizado = processar_objetos(js_content)

# Escrever o conteúdo atualizado de volta noutro ficheiro .js
with open(updated_js_file_path, "w", encoding="utf-8") as updated_file:
    updated_file.write(js_content_atualizado)

print("Ficheiro .js atualizado com sucesso!")
