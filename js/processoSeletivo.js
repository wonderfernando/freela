const empresaSim = document.getElementById("empresa-sim");
        const empresaNao = document.getElementById("empresa-nao");
        const campoCnpj = document.getElementById("campo-cnpj");

        // Event listeners para mostrar ou ocultar o campo de CNPJ
        empresaSim.addEventListener("change", function () {
            if (this.checked) {
                campoCnpj.style.display = "block";
            } else {
                campoCnpj.style.display = "none";
            }
        });

        empresaNao.addEventListener("change", function () {
            if (this.checked) {
                campoCnpj.style.display = "none";
            }
        });

        // Função para alternar a exibição das opções do select customizado
        function toggleOptions(targetId) {
            const options = document.getElementById(targetId);
            options.style.display = options.style.display === "none" ? "block" : "none";
        }

        // Event listener para as opções do estado civil
        document.querySelectorAll("#estadoCivil-options li").forEach(function (option) {
            option.addEventListener("click", function () {
                const value = this.getAttribute("data-value");
                const text = this.textContent;
                document.getElementById("estadoCivil").value = value;
                document.getElementById("estadoCivil-text").value = text;
                document.getElementById("estadoCivil-options").style.display = "none";
            });
        });

        // Função para exibir a tabela de opções de vagas
        function mostrarTabelaDeOpcoes(data) {
            const tabela = document.createElement("table");
            const corpoTabela = document.createElement("tbody");

            data.forEach(item => {
                const linha = document.createElement("tr");
                const celula = document.createElement("td");
                celula.textContent = item;
                linha.appendChild(celula);
                corpoTabela.appendChild(linha);
            });

            tabela.appendChild(corpoTabela);
            const containerVaga = document.getElementById("vaga").parentNode;
            const tabelaOpcoes = containerVaga.querySelector(".container-tabela-opcoes");
            if (tabelaOpcoes) {
                tabelaOpcoes.remove();
            }
            tabela.classList.add("container-tabela-opcoes");
            containerVaga.appendChild(tabela);
        }

        // Função para obter as opções de vagas (de teste) diretamente no JavaScript
        function getVagasFromTest() {
            return [
                "Desenvolvedor Web",
                "Analista de Dados",
                "Designer Gráfico",
                "Gerente de Projetos",
                "Engenheiro de Software",
            ];
        }

        // Filtro para exibir as opções de vaga ao digitar no campo "vaga"
        document.getElementById("vaga").addEventListener("input", function () {
            const input = this.value.toLowerCase();
            const vagas = getVagasFromTest();
            const suggestionsDiv = document.getElementById("suggestions");

            // Limpar a lista de sugestões
            suggestionsDiv.innerHTML = "";

            // Filtrar as vagas que contêm o texto digitado
            const filteredVagas = vagas.filter(vaga => vaga.toLowerCase().includes(input));

            // Exibir as sugestões na lista
            filteredVagas.forEach(vaga => {
                const suggestion = document.createElement("div");
                suggestion.textContent = vaga;
                suggestion.classList.add("suggestion");
                suggestionsDiv.appendChild(suggestion);
            });

            // Mostrar a lista de sugestões
            suggestionsDiv.style.display = "block";
        });

        // Event listener para esconder a lista de sugestões ao clicar fora do campo "vaga"
        document.addEventListener("click", function (event) {
            const target = event.target;
            if (!target.matches("#vaga") && !target.matches(".suggestion")) {
                const suggestionsDiv = document.getElementById("suggestions");
                suggestionsDiv.style.display = "none";
            }
        });

        // Event listener para preencher o campo "vaga" com a sugestão clicada
        document.getElementById("suggestions").addEventListener("click", function (event) {
            const target = event.target;
            if (target.matches(".suggestion")) {
                const vagaInput = document.getElementById("vaga");
                vagaInput.value = target.textContent;
                this.style.display = "none";
            }
        });

        // Função para salvar os dados do formulário
        function saveFormData() {
            const formElements = document.getElementById('myForm').elements;
            const formData = {};

            for (let i = 0; i < formElements.length; i++) {
                const element = formElements[i];
                if (element.type !== 'radio' || element.checked) {
                    formData[element.name] = element.value;
                }
            }

            // Enviar os dados para o servidor usando AJAX
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'processar_aplicaçãoDeVaga.php', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log(xhr.responseText);
                }
            };
            xhr.send(JSON.stringify(formData));
        }