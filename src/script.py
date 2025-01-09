import re

# Caminho do ficheiro .js
js_file_path = "C:/Users/rodri/Desktop/LumiCheck/Frontend/src/psicologos.js"
updated_js_file_path = "C:/Users/rodri/Desktop/LumiCheck/Frontend/src/psicologos_atualizado.js"

# Regex para encontrar cada objeto no array e capturar telefones
objeto_regex = r'\{.*?\},'  # Captura objetos no array, incluindo sub-objetos
telefone_regex = r', Telefone:\s?([^,\']+)'  # Captura o telefone na descrição

# Ler o conteúdo do ficheiro .js
with open(js_file_path, "r", encoding="utf-8") as file:
    js_content = file.read()

# Processar cada objeto no array
def processar_objetos(js_content):
    objetos = re.findall(objeto_regex, js_content, re.DOTALL)
    novos_objetos = []

    for objeto_completo in objetos:
        # Encontrar o telefone na descrição usando search
        telefone_match = re.search(telefone_regex, objeto_completo)

        if telefone_match:
            telefone = telefone_match.group(1).strip()  # Capturar o telefone
            
            # Remover o telefone da descrição
            objeto_sem_telefone = re.sub(telefone_regex, '', objeto_completo).strip()
            
            # Adicionar o telefone antes do fechamento `},` no nível principal
            objeto_atualizado = re.sub(
                r'(\}\s*,\s*)$',  # Localiza apenas o fechamento principal `},` do objeto
                f', "Telefone": "{telefone}"' + r'\1',  # Insere o telefone antes do fechamento
                objeto_sem_telefone
            )
            novos_objetos.append(objeto_atualizado)
        else:
            # Caso não haja telefone, manter o objeto original
            novos_objetos.append(objeto_completo)

    # Reconstituir o array de objetos no formato original
    return 'export const markersOnMap = [\n' + '\n'.join(novos_objetos) + '\n];'

# Processar o conteúdo
js_content_atualizado = processar_objetos(js_content)

# Escrever o conteúdo atualizado de volta noutro ficheiro .js
with open(updated_js_file_path, "w", encoding="utf-8") as updated_file:
    updated_file.write(js_content_atualizado)

print("Ficheiro .js atualizado com sucesso!")
