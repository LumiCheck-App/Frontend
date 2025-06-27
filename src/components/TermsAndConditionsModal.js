import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function TermsAndContitionsModal({
  modalVisible,
  setModalVisible,
}) {
  function CloseModal() {
    setModalVisible(false);
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      className="relative"
    >
      {/* Overlay */}
      <View className="bg-black opacity-50 absolute w-full h-full top-0"></View>
      <View className="h-screen justify-center items-center w-screen px-5">
        <View className="relative max-h-[600px] bg-off-white pt-20 pb-10 px-6 flex-col justify-center items-center w-full border-x border-y border-light-gray rounded-lg gap-8">
          <Text className="text-2xl font-quickbold text-orange">
            Termos e Condições
          </Text>
          <ScrollView persistentScrollbar className="w-full h-auto">
            <Text className="font-quickregular my-3 text-sm">
              Última atualização a 06 de junho de 2025
            </Text>
            <Text className="font-quickbold my-3 text-lg">
              {' '}
              ACORDO COM OS NOSSOS TERMOS LEGAIS
            </Text>
            <Text className="font-quickregular">
              Nós somos a Lumicheck ("Companhia, " "nós, " "nós, " "nosso"),
              sociedade registada em Aveiro, Portugal. Operamos a aplicação
              móvel Lumicheck (o "Aplicativo"), bem como quaisquer outros
              produtos e serviços relacionados que se refiram ou tenham ligações
              para estes termos legais (o "Termos legais") (coletivamente, o
              "Serviços"). O Lumicheck é uma aplicação desenvolvida com o
              objetivo de promover a autoconsciência e o equilíbrio na
              utilização do telemóvel. Inspirados pelos efeitos negativos do uso
              abusivo das redes sociais, dos jogos, das apostas e das compras
              online, decidimos criar uma solução que permitisse aos
              utilizadores monitorizar a sua rotina digital de forma simples e
              eficaz, promover conteúdos literários para educar o utilizador,
              fazer a ponte entre a ajuda profissional e os utilizadores e
              tarefas que permite ao utilizador ganhar troféus e melhorar os
              seus hábitos de uma forma dinâmica. Poderá contactar-nos por email
              para lumicheck.app@gmail.com. Estes Termos Legais constituem um
              acordo legalmente vinculativo celebrado entre si, seja
              pessoalmente ou em nome de uma entidade ("tu") e Lumicheck,
              referentes ao seu acesso e utilização dos Serviços. Concorda que,
              ao aceder aos Serviços, leu, compreendeu e concordou em
              comprometer-se com todos estes Termos Legais. SE NÃO CONCORDAR COM
              TODOS ESTES TERMOS LEGAIS, ESTÁ EXPRESSAMENTE PROIBIDO DE UTILIZAR
              OS SERVIÇOS E DEVERÁ INTERROMPER A UTILIZAÇÃO IMEDIATAMENTE.
              Iremos notificá-lo com antecedência sobre quaisquer alterações
              programadas nos Serviços que estiver a utilizar. Os Termos Legais
              modificados entrarão em vigor após a publicação ou notificação
              através do e-mail lumicheck.app@gmail.com , conforme indicado na
              mensagem de e-mail. Ao continuar a utilizar os Serviços após a
              data de entrada em vigor de quaisquer alterações, concorda em
              comprometer-se com os termos modificados. Todos os utilizadores
              menores de idade na jurisdição em que residem (geralmente menores
              de 18 anos) devem ter a permissão e ser supervisionados
              diretamente pelos seus pais ou tutores para utilizar os Serviços.
              Se for menor de idade, peça aos seus pais ou tutores que leiam e
              concordem com estes Termos Legais antes de utilizar os Serviços.
              Recomendamos que imprima uma cópia destes Termos Legais para os
              seus registos.
            </Text>

            <Text className="font-quickbold my-3 text-lg"> ÍNDICE </Text>

            <Text className="font-quickregular">1. OS NOSSOS SERVIÇOS</Text>
            <Text className="font-quickregular">
              2. DIREITOS DE PROPRIEDADE INTELECTUAL
            </Text>
            <Text className="font-quickregular">
              3. REPRESENTAÇÕES DO UTILIZADOR
            </Text>
            <Text className="font-quickregular">4. REGISTO DO UTILIZADOR</Text>
            <Text className="font-quickregular">5. ATIVIDADES PROIBIDAS</Text>
            <Text className="font-quickregular">
              6. CONTRIBUIÇÕES GERADAS PELO UTILIZADOR
            </Text>
            <Text className="font-quickregular">
              7. LICENÇA DE CONTRIBUIÇÃO
            </Text>
            <Text className="font-quickregular">
              8. LICENÇA DE APLICAÇÃO MÓVEL
            </Text>
            <Text className="font-quickregular">
              9. SITES E CONTEÚDOS DE TERCEIROS
            </Text>
            <Text className="font-quickregular">10. GESTÃO DE SERVIÇOS</Text>
            <Text className="font-quickregular">
              11. POLÍTICA DE PRIVACIDADE
            </Text>
            <Text className="font-quickregular">12. PRAZO E RESCISÃO</Text>
            <Text className="font-quickregular">
              13. MODIFICAÇÕES E INTERRUPÇÕES
            </Text>
            <Text className="font-quickregular">14. LEI APLICÁVEL</Text>
            <Text className="font-quickregular">15. RESOLUÇÃO DE LITÍGIOS</Text>
            <Text className="font-quickregular">16. CORREÇÕES</Text>
            <Text className="font-quickregular">
              17. ISENÇÃO DE RESPONSABILIDADE
            </Text>
            <Text className="font-quickregular">
              18. LIMITAÇÕES DE RESPONSABILIDADE
            </Text>
            <Text className="font-quickregular">19. INDEMNIZAÇÃO</Text>
            <Text className="font-quickregular">20. DADOS DO UTILIZADOR</Text>
            <Text className="font-quickregular">
              21. COMUNICAÇÕES ELECTRÓNICAS, TRANSACÇÕES E ASSINATURAS
            </Text>
            <Text className="font-quickregular">22. DIVERSOS</Text>
            <Text className="font-quickregular">
              23. A PONTUAÇÃO NÃO É UM DIAGNÓSTICO
            </Text>
            <Text className="font-quickregular">24. CONTACTE-NOS</Text>

            <Text className="font-quickbold my-3 text-lg">
              1. OS NOSSOS SERVIÇOS
            </Text>

            <Text className="font-quickregular">
              As informações fornecidas durante a utilização dos Serviços não se
              destinam à distribuição ou utilização por qualquer pessoa ou
              entidade em qualquer jurisdição ou país onde tal distribuição ou
              utilização seja contrária à lei ou regulamento ou que nos sujeite
              a qualquer exigência de registo em tal jurisdição ou país.
              Consequentemente, as pessoas que optarem por aceder aos Serviços a
              partir de outras localidades, fá-lo-ão por sua iniciativa e serão
              as únicas responsáveis pelo cumprimento das leis locais, se e na
              medida em que as leis locais forem aplicáveis.
            </Text>

            <Text className="font-quickbold my-3 text-lg">
              2. DIREITOS DE PROPRIEDADE INTELECTUAL
            </Text>

            <Text className="font-quickregular">
              A nossa propriedade intelectual Somos o proprietário ou licenciado
              de todos os direitos de propriedade intelectual dos nossos
              Serviços, incluindo todo o código-fonte, bases de dados,
              funcionalidades, software, designs de websites, áudio, vídeo,
              texto, fotografias e gráficos nos Serviços (coletivamente, o
              "Conteúdo"), bem como as marcas comerciais, marcas de serviço e
              logótipos neles contidos (as "Marcas"). O nosso Conteúdo e Marcas
              são protegidos por leis de direitos de autor e marcas registadas
              (e vários outros direitos de propriedade intelectual e leis de
              concorrência desleal) e tratados em todo o mundo. O Conteúdo e as
              Marcas são fornecidos nos Serviços ou através dos mesmos "NO
              ESTADO EM QUE SE ENCONTRAM", apenas para o seu uso pessoal, não
              comercial ou para fins comerciais internos. A sua utilização de
              nossos serviços Sujeito à sua conformidade com estes Termos
              Legais, incluindo o "ATIVIDADES PROIBIDAS " secção abaixo,
              concedemos-lhe uma licença não exclusiva, intransmissível e
              revogável para: aceder aos Serviços; e descarregar ou imprimir uma
              cópia de qualquer parte do Conteúdo a que tenha obtido o acesso
              adequado, exclusivamente para o seu uso pessoal, não comercial ou
              para fins comerciais internos. Exceto conforme estabelecido nesta
              secção ou em qualquer outro lugar nos nossos Termos Legais,
              nenhuma parte dos Serviços e nenhum Conteúdo ou Marcas podem ser
              copiados, reproduzidos, agregados, republicados, carregados,
              publicados, exibidos publicamente, codificados, traduzidos,
              transmitidos, distribuídos, vendidos, licenciados ou de outra
              forma explorados para qualquer fim comercial, sem a nossa
              autorização prévia expressa por escrito. Caso deseje fazer
              qualquer utilização dos Serviços, Conteúdo ou Marcas diferente da
              estabelecida nesta secção ou em qualquer outro local dos nossos
              Termos Legais, envie o seu pedido para: lumicheck.app@gmail.com .
              Se lhe concedermos permissão para publicar, reproduzir ou exibir
              publicamente qualquer parte dos nossos Serviços ou Conteúdo,
              deverá identificar-nos como proprietários ou licenciadores dos
              Serviços, Conteúdo ou Marcas e garantir que qualquer aviso de
              direitos de autor ou de propriedade aparece ou é visível na
              publicação, reprodução ou exibição do nosso Conteúdo. Reservamos
              todos os direitos que não lhe sejam expressamente concedidos em
              relação aos Serviços, Conteúdo e Marcas. Qualquer violação destes
              Direitos de Propriedade Intelectual constituirá uma violação
              material dos nossos Termos Legais e o seu direito de utilizar os
              nossos Serviços será rescindido imediatamente. Os seus envios Por
              favor, reveja esta secção e o "ATIVIDADES PROIBIDAS " secção
              cuidadosamente antes de utilizar os nossos Serviços para
              compreender (a) os direitos que nos concede e (b) as obrigações
              que tem ao publicar ou carregar qualquer conteúdo através dos
              Serviços. Submissões:Ao enviar-nos diretamente qualquer pergunta,
              comentário, sugestão, ideia, feedback ou outra informação sobre os
              Serviços ("Submissões"), concorda em ceder-nos todos os direitos
              de propriedade intelectual sobre tal Envio. Concorda que seremos
              os proprietários deste Envio e teremos o direito ao seu uso e
              divulgação irrestritos para qualquer fim lícito, comercial ou
              outro, sem reconhecimento ou compensação para si. É responsável
              pelo que publica ou carrega:Ao enviar-nos Envios através de
              qualquer parte dos Serviços, você: confirme que leu e concorda com
              os nossos "ATIVIDADES PROIBIDAS " e não publicará, enviará,
              carregará ou transmitirá através dos Serviços qualquer Envio que
              seja ilegal, assediante, odioso, prejudicial, difamatório,
              obsceno, intimidante, abusivo, discriminatório, ameaçador para
              qualquer pessoa ou grupo, sexualmente explícito, falso, impreciso,
              enganoso ou enganoso; na medida do permitido pela lei aplicável,
              renunciar a todos e quaisquer direitos morais sobre tal Envio;
              garante que tais Envio são originais seus ou que tem os direitos e
              licenças necessários para enviar tais Envio e que tem plena
              autoridade para nos conceder os direitos acima mencionados em
              relação aos seus Envio; e garante e declara que os seus Envio não
              constituem informação confidencial. É o único responsável pelos
              seus Envio e concorda expressamente em reembolsar-nos por todas e
              quaisquer perdas que possamos sofrer devido à sua violação (a)
              desta secção, (b) de quaisquer direitos de propriedade intelectual
              de terceiros ou (c) da lei aplicável.
            </Text>

            <Text className="font-quickbold my-3 text-lg">
              3. REPRESENTAÇÕES DO UTILIZADOR
            </Text>

            <Text className="font-quickregular">
              Ao utilizar os Serviços, declara e garante que: (1) todas as
              informações de registo que enviar serão verdadeiras, precisas,
              atuais e completas; (2) manterá a precisão dessas informações e
              atualizá-las-á prontamente conforme necessário; (3) tem capacidade
              legal e concorda em cumprir estes Termos Legais; (4) não é menor
              de idade na jurisdição em que reside ou, se menor de idade,
              recebeu autorização dos pais para utilizar os Serviços; (5) não
              acederá aos Serviços por meios automatizados ou não humanos, seja
              através de um bot, script ou de outra forma; (6) não utilizará os
              Serviços para qualquer fim ilegal ou não autorizado; e (7) a sua
              utilização dos Serviços não violará qualquer lei ou regulamento
              aplicável. Se fornecer qualquer informação falsa, imprecisa,
              desatualizada ou incompleta, temos o direito de suspender ou
              encerrar a sua conta e recusar toda e qualquer utilização atual ou
              futura dos Serviços (ou qualquer parte dos mesmos).
            </Text>

            <Text className="font-quickbold my-3 text-lg">
              4. REGISTO DO UTILIZADOR
            </Text>

            <Text className="font-quickregular">
              Poderá ser necessário que se registe para utilizar os Serviços.
              Concorda em manter a sua palavra-passe confidencial e será
              responsável por toda a utilização da sua conta e palavra-passe.
              Reservamo-nos o direito de remover, recuperar ou alterar um nome
              de utilizador que selecione se determinarmos, a nosso exclusivo
              critério, que tal nome de utilizador é inapropriado, obsceno ou de
              outra forma censurável.
            </Text>

            <Text className="font-quickbold my-3 text-lg">
              5. ATIVIDADES PROIBIDAS
            </Text>

            <Text className="font-quickregular">
              Não poderá aceder ou utilizar os Serviços para qualquer outra
              finalidade que não aquela para a qual os disponibilizamos. Os
              Serviços não poderão ser utilizados em relação a quaisquer
              empreendimentos comerciais, exceto aqueles especificamente
              endossados ou aprovados por nós. Como utilizador dos Serviços,
              concorda em não:
            </Text>
            <Text className="font-quickregular">
              - Recuperar sistematicamente dados ou outro conteúdo dos Serviços
              para criar ou compilar, direta ou indiretamente, uma coleção,
              compilação, base de dados ou diretório sem a nossa autorização por
              escrito. Enganar, defraudar ou induzir em erro
            </Text>
            <Text className="font-quickregular">
              - A nós e a outros utilizadores, especialmente em qualquer
              tentativa de obter informações confidenciais da conta, como
              palavras-passe de utilizadores.
            </Text>
            <Text className="font-quickregular">
              - Contornar, desativar ou de qualquer outra forma interferir com
              características de segurança dos Serviços, incluindo
              características que impeçam ou restrinjam a utilização ou cópia de
              qualquer Conteúdo ou imponham limitações à utilização dos Serviços
              e/ou do Conteúdo neles contido. Denegrir, denegrir ou de qualquer
              outra forma prejudicar, na nossa opinião, a nós e/ou aos Serviços.
            </Text>
            <Text className="font-quickregular">
              - Utilizar quaisquer informações obtidas nos Serviços para
              assediar, abusar ou prejudicar outra pessoa.
            </Text>
            <Text className="font-quickregular">
              - Fazer um uso indevido dos nossos serviços de apoio ou enviar
              denúncias falsas de abuso ou má conduta.
            </Text>
            <Text className="font-quickregular">
              - Utilizar os Serviços de forma incompatível com quaisquer leis ou
              regulamentos aplicáveis.
            </Text>
            <Text className="font-quickregular">
              - Envolver-se em enquadramentos ou vinculação não autorizados dos
              Serviços.
            </Text>
            <Text className="font-quickregular">
              - Carregar ou transmitir (ou tentar carregar ou transmitir) vírus,
              cavalos de Troia ou outro material, incluindo o uso excessivo de
              letras maiúsculas e spam (publicação contínua de texto
              repetitivo), que interfira com a utilização e aproveitamento
              ininterrupto dos Serviços por qualquer parte ou modifique,
              prejudique, interrompa, altere ou interfira com a utilização,
              recursos, funções, operação ou manutenção dos Serviços.
            </Text>
            <Text className="font-quickregular">
              - Fazer qualquer utilização automatizada do sistema, como utilizar
              scripts para enviar comentários ou mensagens, ou utilizar data
              mining, robots ou ferramentas semelhantes de recolha e extração de
              dados.
            </Text>
            <Text className="font-quickregular">
              - Apagar o aviso de direitos de autor ou outros direitos de
              propriedade de qualquer Conteúdo.
            </Text>
            <Text className="font-quickregular">
              - Tentar representar outro utilizador ou pessoa ou utilizar o nome
              de utilizador de outro utilizador.
            </Text>
            <Text className="font-quickregular">
              - Carregar ou transmitir (ou tentar carregar ou transmitir)
              qualquer material que atue como um mecanismo passivo ou ativo de
              recolha ou transmissão de informações, incluindo, sem limitação,
              formatos de intercâmbio gráfico transparentes ("gifs"), pixels
              1×1, web bugs, cookies ou outros dispositivos semelhantes (por
              vezes designados por "spyware" ou "mecanismos de recolha passiva"
              ou "pcms").
            </Text>
            <Text className="font-quickregular">
              - Interferir, interromper ou criar uma sobrecarga indevida nos
              Serviços ou nas redes ou serviços ligados aos Serviços.
            </Text>
            <Text className="font-quickregular">
              - Assediar, incomodar, intimidar ou ameaçar qualquer um dos nossos
              funcionários ou agentes envolvidos na prestação de qualquer parte
              dos Serviços a si.
            </Text>
            <Text className="font-quickregular">
              - Tentar contornar quaisquer medidas dos Serviços destinadas a
              impedir ou restringir o acesso aos Serviços, ou a qualquer parte
              dos Serviços.
            </Text>
            <Text className="font-quickregular">
              - Copiar ou adaptar o software dos Serviços, incluindo, entre
              outros, Flash, PHP, HTML, JavaScript ou outro código.
            </Text>
            <Text className="font-quickregular">
              - Exceto conforme permitido pela lei aplicável, decifrar,
              descompilar, desmontar ou fazer engenharia reversa de qualquer
              software que componha ou de qualquer forma faça parte dos
              Serviços.
            </Text>
            <Text className="font-quickregular">
              - Exceto quando for o resultado da utilização de motores de busca
              padrão ou de navegadores de Internet, utilize, inicie, desenvolva
              ou distribua qualquer sistema automatizado, incluindo, sem
              limitação, qualquer spider, robô, utilitário de batota, scraper ou
              leitor offline que aceda aos Serviços, ou utilize ou inicie
              qualquer script não autorizado ou outro software.
            </Text>
            <Text className="font-quickregular">
              - Utilize um agente de compras ou agente de compras para fazer
              compras nos Serviços.
            </Text>
            <Text className="font-quickregular">
              - Fazer qualquer utilização não autorizada dos Serviços, incluindo
              a recolha de nomes de utilizador e/ou endereços de e-mail dos
              utilizadores por meios eletrónicos ou outros para o envio de
              e-mails não solicitados, ou a criação de contas de utilizador por
              meios automatizados ou sob falsos pretextos.
            </Text>
            <Text className="font-quickregular">
              - Utilizar os Serviços como parte de qualquer esforço para
              competir connosco ou de outra forma utilizar os Serviços e/ou o
              Conteúdo para qualquer empreendimento ou empreendimento comercial
              de geração de receitas.
            </Text>
            <Text className="font-quickregular">
              - Utilizar os Serviços como parte de qualquer esforço para
              competir connosco ou de outra forma utilizar os Serviços e/ou o
              Conteúdo para qualquer empreendimento ou empreendimento comercial
              de geração de receitas.
            </Text>

            <Text className="font-quickbold my-3 text-lg">
              6. CONTRIBUIÇÕES GERADAS PELO UTILIZADOR
            </Text>

            <Text className="font-quickregular">
              Os Serviços não oferecem aos utilizadores a possibilidade de
              enviar ou publicar conteúdos.
            </Text>

            <Text className="font-quickbold my-3 text-lg">
              7. LICENÇA DE CONTRIBUIÇÃO
            </Text>

            <Text className="font-quickregular">
              O Utilizador e os Serviços concordam que podemos aceder,
              armazenar, processar e utilizar quaisquer informações e dados
              pessoais que nos forneça e as suas escolhas (incluindo
              definições). Ao enviar sugestões ou outros comentários sobre os
              Serviços, concorda que podemos utilizar e partilhar tais
              comentários para qualquer fim sem compensação para si.
            </Text>

            <Text className="font-quickbold my-3 text-lg">
              8. LICENÇA DE APLICAÇÃO MÓVEL
            </Text>

            <Text className="font-quickregular">Licença de utilização</Text>
            <Text className="font-quickregular">
              Se aceder aos Serviços através da Aplicação, concedemos-lhe um
              direito revogável, não exclusivo, intransmissível e limitado de
              instalar e utilizar a Aplicação em dispositivos eletrónicos sem
              fios de sua propriedade ou controlados por si, e de aceder e
              utilizar a Aplicação em tais dispositivos estritamente de acordo
              com os termos e condições desta licença de aplicação móvel contida
              nestes Termos Legais. Não deverá: (1) exceto conforme permitido
              pela lei aplicável, descompilar, fazer engenharia reversa,
              desmontar, tentar derivar o código-fonte ou desencriptar a
              Aplicação; (2) fazer qualquer modificação, adaptação, melhoria,
              aperfeiçoamento, tradução ou trabalho derivado da Aplicação; (3)
              violar quaisquer leis, regras ou regulamentos aplicáveis
              relacionados com o seu acesso ou utilização da Aplicação; (4)
              remover, alterar ou ocultar qualquer aviso de propriedade
              (incluindo qualquer aviso de direitos de autor ou marca comercial)
              publicado por nós ou pelos licenciadores da Aplicação; (5)
              utilizar o Aplicativo para qualquer empreendimento de geração de
              receitas, empreendimento comercial ou outro fim para o qual não
              foi concebido ou pretendido; (6) disponibilizar a aplicação numa
              rede ou noutro ambiente que permita o acesso ou a utilização por
              vários dispositivos ou utilizadores ao mesmo tempo; (7) utilizar a
              aplicação para criar um produto, serviço ou software que seja,
              direta ou indiretamente, competitivo ou de alguma forma um
              substituto da aplicação; (8) utilizar a aplicação para enviar
              consultas automatizadas a qualquer site ou para enviar qualquer
              e-mail comercial não solicitado; ou (9) utilizar qualquer
              informação proprietária ou qualquer uma das nossas interfaces ou a
              nossa outra propriedade intelectual no design, desenvolvimento,
              fabrico, licenciamento ou distribuição de quaisquer aplicações,
              acessórios ou dispositivos para utilização com a aplicação.
            </Text>

            <Text className="font-quickregular">
              Dispositivos Apple e Android
            </Text>
            <Text className="font-quickregular">
              Os seguintes termos aplicam-se quando utiliza a aplicação obtida
              na Apple Store ou no Google Play (cada um deles um "Distribuidor
              de Aplicações") para aceder aos Serviços: (1) a licença que lhe
              foi concedida para a nossa aplicação está limitada a uma licença
              não transferível para utilizar a aplicação num dispositivo que
              utilize os sistemas operativos Apple iOS ou Android, conforme
              aplicável, e de acordo com as regras de utilização estabelecidas
              nos termos de serviço do Distribuidor de Aplicações aplicável; (2)
              somos responsáveis por prestar quaisquer serviços de manutenção e
              suporte relativamente à aplicação, conforme especificado nos
              termos e condições desta licença de aplicação móvel contida nestes
              Termos Legais ou conforme exigido pela lei aplicável, e reconhece
              que cada Distribuidor de Aplicações não tem qualquer obrigação de
              prestar quaisquer serviços de manutenção e suporte relativamente à
              aplicação; (3) no caso de qualquer falha da aplicação em
              conformidade com qualquer garantia aplicável, poderá notificar o
              distribuidor da aplicação aplicável, e o distribuidor da
              aplicação, de acordo com os seus termos e políticas, poderá
              reembolsar o preço de compra, se existir, pago pela aplicação e,
              na medida do permitido pela lei aplicável, o distribuidor da
              aplicação não terá qualquer outra obrigação de garantia
              relativamente à aplicação; (4) declara e garante que (i) não está
              localizado num país sujeito a um embargo do governo dos EUA ou que
              foi designado pelo governo dos EUA como um país "que apoia o
              terrorismo" e (ii) não está listado em nenhuma lista do governo
              dos EUA de partes proibidas ou restritas; (5) deve cumprir os
              termos de acordo de terceiros aplicáveis ao utilizar a aplicação,
              por exemplo, se tiver uma aplicação VoIP, não deverá estar a
              violar o seu acordo de serviço de dados sem fios ao utilizar a
              aplicação; e (6) reconhece e concorda que os Distribuidores de
              Aplicações são terceiros beneficiários dos termos e condições
              desta licença de aplicação móvel contida nestes Termos Legais, e
              que cada Distribuidor de Aplicações terá o direito (e será
              considerado como tendo aceite o direito) de fazer cumprir os
              termos e condições desta licença de aplicação móvel contida nestes
              Termos Legais contra si como terceiro beneficiário.
            </Text>

            <Text className="font-quickbold my-3 text-lg">
              9. SITES E CONTEÚDOS DE TERCEIROS
            </Text>
            <Text className="font-quickregular">
              Os Serviços podem conter ou podem receber links para outros sites
              ("Sites de Terceiros"), bem como artigos, fotografias, textos,
              gráficos, imagens, designs, música, sons, vídeos, informações,
              aplicações, software e outros conteúdos ou itens pertencentes ou
              originários de terceiros ("Conteúdo de Terceiros"). Tais Sites de
              Terceiros e Conteúdos de Terceiros não são investigados,
              monitorizados ou verificados quanto à sua precisão, adequação ou
              integralidade, e não somos responsáveis por quaisquer Sites de
              Terceiros acedidos através dos Serviços ou por qualquer Conteúdo
              de Terceiros publicado, disponibilizado ou instalado a partir dos
              Serviços, incluindo o conteúdo, a precisão, a ofensividade, as
              opiniões, a fiabilidade, as práticas de privacidade ou outras
              políticas contidas nos Sites de Terceiros ou no Conteúdo de
              Terceiros. dos Serviços e aceder aos Sites de Terceiros ou
              utilizar ou instalar qualquer Conteúdo de Terceiros, fá-lo por sua
              conta e risco, e deve estar ciente de que estes Termos Legais já
              não prevalecem. Deverá rever os termos e políticas aplicáveis,
              incluindo as práticas de privacidade e recolha de dados, de
              qualquer site para o qual navegue a partir dos Serviços ou
              relacionados com quaisquer aplicações que utilize ou instale a
              partir dos Serviços. assumimos qualquer responsabilidade em
              relação a tais compras que são exclusivamente entre si e o
              terceiro aplicável. Concorda e reconhece que não endossamos os
              produtos ou serviços oferecidos em Sites de Terceiros e isentará
              de qualquer responsabilidade por qualquer dano causado pela sua
              compra de tais produtos ou serviços.
            </Text>

            <Text className="font-quickbold my-3 text-lg">
              10. GESTÃO DE SERVIÇOS
            </Text>
            <Text className="font-quickregular">
              Reservamo-nos o direito, mas não a obrigação, de: (1) monitorizar
              os Serviços em busca de violações dos presentes Termos Legais; (2)
              tomar as medidas legais adequadas contra qualquer pessoa que, a
              nosso exclusivo critério, viole a lei ou os presentes Termos
              Legais, incluindo, sem limitação, denunciar tal utilizador às
              autoridades policiais; (3) a nosso exclusivo critério e sem
              limitação, recusar, restringir o acesso, limitar a disponibilidade
              ou desativar (na medida em que seja tecnologicamente viável)
              qualquer das suas Contribuições ou qualquer parte das mesmas; (4)
              a nosso exclusivo critério e sem limitação, aviso ou
              responsabilidade, remover dos Serviços ou de outra forma desativar
              todos os ficheiros e conteúdos que sejam excessivos em tamanho ou
              que sejam de alguma forma onerosos para os nossos sistemas; e (5)
              gerir os Serviços de outra forma, de forma a proteger os nossos
              direitos e propriedade e a facilitar o funcionamento adequado dos
              Serviços.
            </Text>

            <Text className="font-quickbold my-3 text-lg">
              11. POLÍTICA DE PRIVACIDADE
            </Text>
            <Text className="font-quickregular">
              Preocupamo-nos com a privacidade e a segurança dos dados. Ao
              utilizar os Serviços, concorda em ficar vinculado à nossa Política
              de Privacidade publicada nos Serviços, a qual está incorporada
              nestes Termos Legais. Informamos que os Serviços estão alojados em
              Portugal. Se aceder aos Serviços a partir de qualquer outra região
              do mundo com leis ou outros requisitos que regem a recolha,
              utilização ou divulgação de dados pessoais diferentes das leis
              aplicáveis em Portugal, então, através da sua utilização contínua
              dos Serviços, estará a transferir os seus dados para Portugal e
              consente expressamente que os seus dados sejam transferidos e
              processados em Portugal.
            </Text>

            <Text className="font-quickbold my-3 text-lg">
              12. PRAZO E RESCISÃO
            </Text>
            <Text className="font-quickregular">
              Estes Termos Legais permanecerão em pleno vigor e efeito enquanto
              utilizar os Serviços. SEM LIMITAR QUALQUER OUTRA DISPOSIÇÃO DESTES
              TERMOS LEGAIS, RESERVAMO-NOS O DIREITO DE, A NOSSO EXCLUSIVO
              CRITÉRIO E SEM AVISO PRÉVIO OU RESPONSABILIDADE, NEGAR O ACESSO E
              O USO DOS SERVIÇOS (INCLUINDO O BLOQUEIO DE CERTOS ENDEREÇOS IP) A
              QUALQUER PESSOA, POR QUALQUER MOTIVO OU SEM MOTIVO, INCLUINDO, SEM
              LIMITAÇÃO, A VIOLAÇÃO DE QUALQUER REPRESENTAÇÃO, GARANTIA OU
              ACORDO CONTIDO NESTES TERMOS LEGAIS OU DE QUALQUER LEI OU
              REGULAMENTO APLICÁVEL. PODEMOS ENCERRAR A SUA UTILIZAÇÃO OU
              PARTICIPAÇÃO NOS SERVIÇOS OU APAGAR A SUA CONTA E QUALQUER
              CONTEÚDO OU INFORMAÇÃO QUE TENHA PUBLICADO A QUALQUER MOMENTO, SEM
              AVISO PRÉVIO, A NOSSO EXCLUSIVO CRITÉRIO. Se encerrarmos ou
              suspendermos a sua conta por qualquer motivo, estará proibido de
              se registar e criar uma nova conta em seu nome, com um nome falso
              ou emprestado, ou em nome de terceiros, mesmo que esteja a agir em
              nome desses terceiros. Além de encerrar ou suspender a sua conta,
              reservamo-nos o direito de tomar as medidas legais adequadas,
              incluindo, entre outras, ações cíveis, criminais e injuntivas.
            </Text>

            <Text className="font-quickbold my-3 text-lg">
              12. PRAZO E RESCISÃO
            </Text>
            <Text className="font-quickregular">
              Estes Termos Legais permanecerão em pleno vigor e efeito enquanto
              utilizar os Serviços. SEM LIMITAR QUALQUER OUTRA DISPOSIÇÃO DESTES
              TERMOS LEGAIS, RESERVAMO-NOS O DIREITO DE, A NOSSO EXCLUSIVO
              CRITÉRIO E SEM AVISO PRÉVIO OU RESPONSABILIDADE, NEGAR O ACESSO E
              O USO DOS SERVIÇOS (INCLUINDO O BLOQUEIO DE CERTOS ENDEREÇOS IP) A
              QUALQUER PESSOA, POR QUALQUER MOTIVO OU SEM MOTIVO, INCLUINDO, SEM
              LIMITAÇÃO, A VIOLAÇÃO DE QUALQUER REPRESENTAÇÃO, GARANTIA OU
              ACORDO CONTIDO NESTES TERMOS LEGAIS OU DE QUALQUER LEI OU
              REGULAMENTO APLICÁVEL. PODEMOS ENCERRAR A SUA UTILIZAÇÃO OU
              PARTICIPAÇÃO NOS SERVIÇOS OU APAGAR A SUA CONTA E QUALQUER
              CONTEÚDO OU INFORMAÇÃO QUE TENHA PUBLICADO A QUALQUER MOMENTO, SEM
              AVISO PRÉVIO, A NOSSO EXCLUSIVO CRITÉRIO. Se encerrarmos ou
              suspendermos a sua conta por qualquer motivo, estará proibido de
              se registar e criar uma nova conta em seu nome, com um nome falso
              ou emprestado, ou em nome de terceiros, mesmo que esteja a agir em
              nome desses terceiros. Além de encerrar ou suspender a sua conta,
              reservamo-nos o direito de tomar as medidas legais adequadas,
              incluindo, entre outras, ações cíveis, criminais e injuntivas.
            </Text>

            <Text className="font-quickbold my-3 text-lg">
              13. MODIFICAÇÕES E INTERRUPÇÕES
            </Text>
            <Text className="font-quickregular">
              Reservamo-nos o direito de alterar, modificar ou remover o
              conteúdo dos Serviços a qualquer momento ou por qualquer motivo, a
              nosso exclusivo critério, sem aviso prévio. No entanto, não temos
              qualquer obrigação de atualizar qualquer informação nos nossos
              Serviços. Não seremos responsáveis perante si ou terceiros por
              qualquer modificação, alteração de preço, suspensão ou
              descontinuação dos Serviços. Não podemos garantir que os Serviços
              estejam disponíveis em todos os momentos. Poderemos enfrentar
              problemas de hardware, software ou outros, ou necessitar de
              realizar manutenção relacionada com os Serviços, resultando em
              interrupções, atrasos ou erros. Reservamo-nos o direito de
              alterar, rever, atualizar, suspender, descontinuar ou modificar os
              Serviços a qualquer momento ou por qualquer motivo, sem aviso
              prévio. Concorda que não temos qualquer responsabilidade por
              qualquer perda, dano ou incómodo causado pela sua incapacidade de
              aceder ou utilizar os Serviços durante qualquer período de
              inatividade ou descontinuação dos Serviços. Nada nestes Termos
              Legais será interpretado como uma obrigação para nós de manter e
              suportar os Serviços ou de fornecer quaisquer correções,
              atualizações ou lançamentos relacionados com os mesmos.
            </Text>

            <Text className="font-quickbold my-3 text-lg">
              14. LEI APLICÁVEL
            </Text>
            <Text className="font-quickregular">
              Os presentes Termos Legais são regidos e interpretados de acordo
              com as leis de Portugal, estando expressamente excluída a
              utilização da Convenção das Nações Unidas sobre Contratos de
              Compra e Venda Internacional de Mercadorias. Se a sua residência
              habitual for na UE e for um consumidor, tem também a proteção que
              lhe é conferida pelas disposições obrigatórias da lei do seu país
              de residência. A Lumicheck e o utilizador concordam em submeter-se
              à jurisdição não exclusiva dos tribunais de Aveiro, o que
              significa que poderá apresentar uma reclamação para defender os
              seus direitos de proteção do consumidor relativamente a estes
              Termos Legais em Portugal ou no país da UE em que reside.
            </Text>

            <Text className="font-quickbold my-3 text-lg">
              15. RESOLUÇÃO DE LITÍGIOS
            </Text>
            <Text className="font-quickregular">Negociações informais</Text>
            <Text className="font-quickregular">
              Para agilizar a resolução e controlar os custos de qualquer
              litígio, controvérsia ou reclamação relacionada com estes Termos
              Legais (cada uma, uma "Disputa" e, coletivamente, as "Disputas")
              movidas por si ou por nós (individualmente, uma "Parte" e,
              coletivamente, as "Partes"), as Partes concordam em tentar
              negociar qualquer Disputa (exceto as Disputas expressamente
              previstas abaixo) informalmente durante pelo menos trinta (30)
              dias antes de iniciar a arbitragem. Tais negociações informais
              terão início mediante notificação escrita de uma Parte à outra.
            </Text>
            <Text className="font-quickregular">Arbitragem Vinculativa</Text>
            <Text className="font-quickregular">
              Qualquer litígio decorrente das relações entre as Partes dos
              presentes Termos Legais será resolvido por um árbitro, escolhido
              de acordo com o Regulamento de Arbitragem e o Regulamento Interno
              do Tribunal Europeu de Arbitragem, que faz parte do Centro Europeu
              de Arbitragem, com sede em Estrasburgo, em vigor no momento da
              apresentação do pedido de arbitragem, e cuja adoção desta cláusula
              constitui aceitação. A sede da arbitragem será Aveiro, Portugal. O
              idioma do processo será o português. As regras de direito
              substantivo aplicáveis serão a lei de Portugal.
            </Text>
            <Text className="font-quickregular">Restrições</Text>
            <Text className="font-quickregular">
              As Partes concordam que qualquer arbitragem será limitada ao
              Litígio entre as Partes individualmente. Na medida máxima
              permitida por lei, (a) nenhuma arbitragem será agregada a qualquer
              outro processo; (b) não existe o direito ou a autoridade para que
              qualquer Litígio seja arbitrado com base numa ação coletiva ou
              para utilizar procedimentos de ação coletiva; e (c) não existe o
              direito ou a autoridade para que qualquer Litígio seja apresentado
              numa suposta qualidade representativa em nome do público em geral
              ou de quaisquer outras pessoas.
            </Text>
            <Text className="font-quickregular">
              Exceções às Negociações Informais e Arbitragem
            </Text>
            <Text className="font-quickregular">
              As Partes concordam que os seguintes Litígios não estão sujeitos
              às disposições acima referidas relativas a negociações informais e
              arbitragem vinculativa: (a) quaisquer Litígios que visem fazer
              cumprir ou proteger, ou relativos à validade de, quaisquer
              direitos de propriedade intelectual de uma Parte; (b) qualquer
              Litígio relacionado com, ou decorrente de, alegações de roubo,
              pirataria, invasão de privacidade ou utilização não autorizada; e
              (c) qualquer pedido de providência cautelar. Se esta disposição
              for considerada ilegal ou inexequível, nenhuma das Partes optará
              por arbitrar qualquer Litígio que se enquadre na parte desta
              disposição considerada ilegal ou inexequível, e tal Litígio será
              decidido por um tribunal de jurisdição competente de entre os
              tribunais listados para a jurisdição acima, e as Partes concordam
              em submeter-se à jurisdição pessoal desse tribunal.
            </Text>

            <Text className="font-quickbold my-3 text-lg">16. CORREÇÕES</Text>
            <Text className="font-quickregular">
              Poderão existir informações nos Serviços que contenham erros
              tipográficos, imprecisões ou omissões, incluindo descrições,
              preços, disponibilidade e diversas outras informações.
              Reservamo-nos o direito de corrigir quaisquer erros, imprecisões
              ou omissões e de alterar ou atualizar as informações contidas nos
              Serviços a qualquer momento, sem aviso prévio.
            </Text>

            <Text className="font-quickbold my-3 text-lg">
              17. ISENÇÃO DE RESPONSABILIDADE
            </Text>
            <Text className="font-quickregular">
              OS SERVIÇOS SÃO FORNECIDOS NO ESTADO EM QUE SE ENCONTRAM E
              CONFORME DISPONÍVEIS. CONCORDA QUE A UTILIZAÇÃO DOS SERVIÇOS SERÁ
              POR SUA CONTA E RISCO. ATÉ AO LIMITE MÁXIMO PERMITIDO POR LEI,
              ISENTAMOS TODAS AS GARANTIAS, EXPRESSAS OU IMPLÍCITAS, RELATIVAS
              AOS SERVIÇOS E À SUA UTILIZAÇÃO, INCLUINDO, SEM LIMITAÇÃO, AS
              GARANTIAS IMPLÍCITAS DE COMERCIALIZAÇÃO, ADEQUAÇÃO A UM
              DETERMINADO FIM E NÃO INFRACÇÃO. NÃO OFERECEMOS NENHUMA GARANTIA
              OU REPRESENTAÇÃO SOBRE A PRECISÃO OU INTEGRIDADE DO CONTEÚDO DOS
              SERVIÇOS OU DO CONTEÚDO DE QUAISQUER SITES OU APLICAÇÕES MÓVEIS
              VINCULADAS AOS SERVIÇOS E NÃO ASSUMIMOS NENHUMA RESPONSABILIDADE
              POR QUAISQUER (1) ERROS, ENGANOS OU IMPRECISÕES DE CONTEÚDO E
              MATERIAIS, (2) LESÕES PESSOAIS OU DANOS À PROPRIEDADE, DE QUALQUER
              NATUREZA, RESULTANTES DO SEU ACESSO E UTILIZAÇÃO DOS SERVIÇOS, (3)
              QUALQUER ACESSO OU UTILIZAÇÃO NÃO AUTORIZADA DOS NOSSOS SERVIDORES
              SEGUROS E/OU DE QUALQUER E TODA A INFORMAÇÃO PESSOAL E/OU
              INFORMAÇÃO FINANCEIRA ARMAZENADA NELES, (4) QUALQUER INTERRUPÇÃO
              OU CESSAÇÃO DE TRANSMISSÃO DE OU PARA OS SERVIÇOS, (5) QUALQUER
              BUGS, VÍRUS, CAVALOS DE TROIA OU SIMILARES QUE POSSAM SER
              TRANSMITIDOS PARA OU ATRAVÉS DOS SERVIÇOS POR TERCEIROS E/OU (6)
              QUAISQUER ERROS OU OMISSÕES EM QUALQUER CONTEÚDO E MATERIAIS OU
              POR QUALQUER PERDA OU DANO DE QUALQUER TIPO INCORRIDO EM RESULTADO
              DA UTILIZAÇÃO DE QUALQUER CONTEÚDO PUBLICADO, TRANSMITIDO OU DE
              OUTRA FORMA DISPONIBILIZADO ATRAVÉS DOS SERVIÇOS. NÃO GARANTIMOS,
              ENDOSSAMOS, GARANTEMOS OU ASSUMIMOS RESPONSABILIDADE POR QUALQUER
              PRODUTO OU SERVIÇO ANUNCIADO OU OFERECIDO POR TERCEIROS ATRAVÉS
              DOS SERVIÇOS, QUALQUER SITE COM HIPERLINK, OU QUALQUER SITE OU
              APLICAÇÃO MÓVEL APRESENTADO EM QUALQUER BANNER OU OUTRA
              PUBLICIDADE, E NÃO SEREMOS PARTE OU DE QUALQUER FORMA RESPONSÁVEIS
              POR MONITORIZAR QUALQUER TRANSAÇÃO ENTRE SI E QUAISQUER TERCEIROS
              FORNECEDORES DE PRODUTOS OU SERVIÇOS. ASSIM COMO NA COMPRA DE UM
              PRODUTO OU SERVIÇO ATRAVÉS DE QUALQUER MEIO OU EM QUALQUER
              AMBIENTE, DEVE UTILIZAR O SEU MELHOR JULGAMENTO E TER CAUTELA
              QUANDO APROPRIADO.
            </Text>

            <Text className="font-quickbold my-3 text-lg">
              18. LIMITAÇÕES DE RESPONSABILIDADE
            </Text>
            <Text className="font-quickregular">
              EM NENHUMA HIPÓTESE NÓS OU OS NOSSOS ADMINISTRADORES, FUNCIONÁRIOS
              OU AGENTES SEREMOS RESPONSÁVEIS PERANTE SI OU QUALQUER TERCEIRO
              POR QUAISQUER DANOS DIRETOS, INDIRETOS, CONSEQUENCIAIS,
              EXEMPLARES, ACIDENTAIS, ESPECIAIS OU PUNITIVOS, INCLUINDO LUCROS
              CESSANTES, PERDA DE RECEITA, PERDA DE DADOS OU OUTROS DANOS
              DECORRENTES DA SUA UTILIZAÇÃO DOS SERVIÇOS, MESMO QUE TENHAMOS
              SIDO AVISADOS DA POSSIBILIDADE DE TAIS DANOS.
            </Text>
            <Text className="font-quickbold my-3 text-lg">
              19. INDEMNIZAÇÃO
            </Text>
            <Text className="font-quickregular">
              Concorda em defender, indemnizar e isentar-nos, incluindo as
              nossas subsidiárias, afiliadas e todos os nossos respetivos
              executivos, agentes, parceiros e funcionários, de e contra
              qualquer perda, dano, responsabilidade, reclamação ou exigência,
              incluindo honorários de advogados e despesas razoáveis, feitas por
              terceiros devido a ou decorrentes de: (1) utilização dos Serviços;
              (2) violação dos presentes Termos Legais; (3) qualquer violação
              das suas representações e garantias estabelecidas nos presentes
              Termos Legais; (4) a sua violação dos direitos de terceiros,
              incluindo, mas não limitado a, direitos de propriedade
              intelectual; ou (5) qualquer ato nocivo manifesto contra qualquer
              outro utilizador dos Serviços com o qual se tenha ligado através
              dos Serviços. Não obstante o acima exposto, reservamo-nos o
              direito de, a suas expensas, assumir a defesa e o controlo
              exclusivos de qualquer assunto para o qual seja obrigado a
              indemnizar-nos, e concorda em cooperar, a suas expensas, com a
              nossa defesa de tais reclamações. Faremos todos os esforços
              razoáveis para o notificar de qualquer reclamação, ação ou
              processo sujeito a esta indemnização assim que tomarmos
              conhecimento da mesma.
            </Text>
            <Text className="font-quickbold my-3 text-lg">
              20. DADOS DO UTILIZADOR
            </Text>
            <Text className="font-quickregular">
              Conservaremos determinados dados que transmita aos Serviços com a
              finalidade de gerir o desempenho dos Serviços, bem como dados
              relacionados com a sua utilização dos Serviços. Embora realizemos
              cópias de segurança regulares dos dados, é o único responsável por
              todos os dados que transmitir ou que estejam relacionados com
              qualquer atividade que tenha realizado com recurso aos Serviços.
              Concorda que não teremos qualquer responsabilidade perante si por
              qualquer perda ou corrupção de tais dados e, por este meio,
              renuncia a qualquer direito de ação contra nós decorrente de tal
              perda ou corrupção de tais dados.
            </Text>
            <Text className="font-quickbold my-3 text-lg">
              21. COMUNICAÇÕES ELECTRÓNICAS, TRANSACÇÕES E ASSINATURAS
            </Text>
            <Text className="font-quickregular">
              Visitar os Serviços, enviar e-mails e preencher formulários online
              constituem comunicações eletrónicas. Consente em receber
              comunicações eletrónicas e concorda que todos os contratos,
              avisos, divulgações e outras comunicações que lhe fornecemos por
              via eletrónica, por e-mail e nos Serviços, cumprem qualquer
              requisito legal de que tal comunicação seja feita por escrito.
              CONCORDA COM A UTILIZAÇÃO DE ASSINATURAS ELETRÓNICAS, CONTRATOS,
              ENCOMENDAS E OUTROS REGISTOS, BEM COMO COM A ENTREGA ELETRÓNICA DE
              AVISOS, POLÍTICAS E REGISTOS DE TRANSAÇÕES INICIADAS OU CONCLUÍDAS
              POR NÓS OU ATRAVÉS DOS SERVIÇOS. Renuncia a quaisquer direitos ou
              requisitos ao abrigo de quaisquer estatutos, regulamentos, regras,
              portarias ou outras leis em qualquer jurisdição que exijam uma
              assinatura original ou entrega ou retenção de registos não
              eletrónicos, ou pagamentos ou a concessão de créditos por
              quaisquer meios que não sejam eletrónicos.
            </Text>
            <Text className="font-quickbold my-3 text-lg">22. DIVERSOS</Text>
            <Text className="font-quickregular">
              Estes Termos Legais e quaisquer políticas ou regras operacionais
              publicadas por nós nos Serviços ou em relação aos Serviços
              constituem o acordo e entendimento integral entre si e nós. A
              nossa falha em exercer ou executar qualquer direito ou disposição
              destes Termos Legais não operará como uma renúncia a tal direito
              ou disposição. Estes Termos Legais operam na máxima extensão
              permitida por lei. Podemos ceder qualquer ou todos os nossos
              direitos e obrigações a terceiros a qualquer momento. Não seremos
              responsáveis por qualquer perda, dano, atraso ou omissão de ação
              causados por qualquer causa fora do nosso controlo razoável. Se
              qualquer disposição ou parte de uma disposição destes Termos
              Legais for determinada ilegal, nula ou inexequível, essa
              disposição ou parte da disposição será considerada separável
              destes Termos Legais e não afetará a validade e a exequibilidade
              de quaisquer disposições restantes. Não existe qualquer relação de
              joint venture, parceria, emprego ou agência criada entre si e nós
              como resultado destes Termos Legais ou da utilização dos Serviços.
              Concorda que estes Termos Legais não serão interpretados contra
              nós em virtude de os ter elaborado. Renuncia a toda e qualquer
              defesa que possa ter com base no formato eletrónico destes Termos
              Legais e na falta de assinatura pelas partes para executar estes
              Termos Legais.
            </Text>
            <Text className="font-quickbold my-3 text-lg">
              23.º A PONTUAÇÃO NÃO É UM DIAGNÓSTICO
            </Text>
            <Text className="font-quickregular">
              No Lumicheck, utilizamos o Teste de Dependência da Internet para
              dar uma pontuação ao utilizador e verificar a potencial influência
              que o telemóvel tem na sua vida. Mas não é um diagnóstico. O
              Lumicheck é uma aplicação e não consegue diagnosticar pessoas,
              apenas os profissionais de saúde conseguem.
            </Text>
            <Text className="font-quickbold my-3 text-lg">
              24. CONTACTE-NOS
            </Text>
            <Text className="font-quickregular">
              Para resolver uma reclamação sobre os Serviços ou receber mais
              informações sobre a utilização dos Serviços, contacte-nos através
              do endereço:
            </Text>
            <Text className="font-quickregular">Lumicheck</Text>
            <Text className="font-quickregular">Aveiro</Text>
            <Text className="font-quickregular">Portugal</Text>
            <Text className="font-quickregular">lumicheck.app@gmail.com</Text>
          </ScrollView>
          <TouchableOpacity
            className="ml-2 absolute top-4 right-4"
            onPress={CloseModal}
          >
            <FontAwesome name="close" size={24} color="#ff9d00" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
