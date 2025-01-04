import re

# Caminho do ficheiro .js
js_file_path = "C:/Users/rodri/Desktop/LumiCheck/Frontend/src/psicologos1.js"

# Ler o conteúdo do ficheiro .js
with open(js_file_path, "r", encoding="utf-8") as file:
    js_content = file.read()

# Remover duplicatas de "Pais", "Distrito" e "Cidade" no conteúdo do ficheiro
js_content = re.sub(
    r"(pais: '[^']*', estado: '[^']*', cidade: '[^']*',? ?)+",
    lambda match: match.group(1),  # Mantém apenas uma ocorrência
    js_content
)

# Escrever o conteúdo atualizado de volta no ficheiro .js
with open(js_file_path, "w", encoding="utf-8") as file:
    file.write(js_content)

print("Ficheiro .js corrigido para remover duplicatas com sucesso!")
