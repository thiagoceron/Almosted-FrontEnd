document.addEventListener('DOMContentLoaded', () => {

    // Lógica para o Menu Mobile
    const btnMobile = document.querySelector('.btn-mobile');
    const cabecalho = document.querySelector('.cabecalho');
    if (btnMobile && cabecalho) {
        btnMobile.addEventListener('click', () => {
            cabecalho.classList.toggle('menu-aberto');
            document.body.classList.toggle('menu-aberto');
        });
    }

    // Lógica para o Carrinho Lateral
    const btnCarrinho = document.getElementById('btn-carrinho');
    const painelCarrinho = document.querySelector('.painel-carrinho');
    const fundoCarrinho = document.querySelector('.fundo-carrinho');
    const btnFecharCarrinho = document.querySelector('.btn-fechar-carrinho');

    function abrirCarrinho() {
        if (painelCarrinho && fundoCarrinho) {
            painelCarrinho.classList.add('aberto');
            fundoCarrinho.classList.add('aberto');
        }
    }
    function fecharCarrinho() {
        if (painelCarrinho && fundoCarrinho) {
            painelCarrinho.classList.remove('aberto');
            fundoCarrinho.classList.remove('aberto');
        }
    }

    if (btnCarrinho) { btnCarrinho.addEventListener('click', (e) => { e.preventDefault(); abrirCarrinho(); }); }
    if (btnFecharCarrinho) { btnFecharCarrinho.addEventListener('click', fecharCarrinho); }
    if (fundoCarrinho) { fundoCarrinho.addEventListener('click', fecharCarrinho); }

    // Lógica do Carrossel da Página Home
    const secaoPrincipal = document.querySelector('.secao-principal');
    if (secaoPrincipal) {
        const imagemPrincipal = secaoPrincipal.querySelector('.imagem-principal');
        const btnAnterior = document.getElementById('btn-anterior');
        const btnProximo = document.getElementById('btn-proximo');
        const slides = ['assets/baby-c-camisa-2.jpg', 'assets/baby-h-2.jpg', 'assets/baby-c-camisa.jpg'];
        let slideAtual = 0;
        let slideIntervalo;

        function mostrarSlide(index) {
            slideAtual = (index + slides.length) % slides.length;
            secaoPrincipal.classList.add('fade-out');
            setTimeout(() => {
                imagemPrincipal.src = slides[slideAtual];
                secaoPrincipal.classList.remove('fade-out');
            }, 500);
        }

        function proximoSlide() { mostrarSlide(slideAtual + 1); }
        function slideAnterior() { mostrarSlide(slideAtual - 1); }
        function iniciarSlideshow() {
            clearInterval(slideIntervalo);
            slideIntervalo = setInterval(proximoSlide, 5000); //timer de 5s
        }

        if (btnProximo && btnAnterior) {
            btnProximo.addEventListener('click', () => { proximoSlide(); iniciarSlideshow(); });
            btnAnterior.addEventListener('click', () => { slideAnterior(); iniciarSlideshow(); });
        }
        iniciarSlideshow();
    }

    // Lógica para o x da Página de Infos
    const perguntasFaq = document.querySelectorAll('.pergunta-faq');
    perguntasFaq.forEach(pergunta => {
        pergunta.addEventListener('click', () => {
            pergunta.parentElement.classList.toggle('ativo');
        });
    });

    // Lógica da Página de Produto
    if (document.querySelector('.container-pagina-produto')) {
        const botoesTamanho = document.querySelectorAll('.btn-tamanho');
        const tamanhoSelecionadoEl = document.getElementById('tamanho-selecionado');
        botoesTamanho.forEach(botao => {
            botao.addEventListener('click', () => {

                botoesTamanho.forEach(btn => btn.classList.remove('selecionado'));
                botao.classList.add('selecionado');
                if(tamanhoSelecionadoEl) tamanhoSelecionadoEl.textContent = botao.dataset.tamanho;
            });
        });

        const btnDiminuirQtd = document.getElementById('diminuir-qtd');
        const btnAumentarQtd = document.getElementById('aumentar-qtd');
        const qtdEl = document.getElementById('quantidade');
        if(btnAumentarQtd && btnDiminuirQtd && qtdEl) {
            btnAumentarQtd.addEventListener('click', () => { qtdEl.textContent = parseInt(qtdEl.textContent) + 1; });
            btnDiminuirQtd.addEventListener('click', () => {
                let qtdAtual = parseInt(qtdEl.textContent);
                if (qtdAtual > 1) { qtdEl.textContent = qtdAtual - 1; }
            });
        }
    }
    
    // Lógica de Validação de Formulários
    function mostrarErro(input, mensagem) {
        input.classList.add('com-erro');
        input.nextElementSibling.textContent = mensagem;
    }
    function limparErros() {
        document.querySelectorAll('.msg-erro').forEach(div => div.textContent = '');
        document.querySelectorAll('.com-erro').forEach(input => input.classList.remove('com-erro'));
    }
    function emailValido(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

    const formularioLogin = document.querySelector('.formulario-login');
    if (formularioLogin) {
        formularioLogin.addEventListener('submit', e => {
            e.preventDefault();
            limparErros();
            let formValido = true;
            const email = document.getElementById('email'), senha = document.getElementById('senha');
            if (!emailValido(email.value)) { mostrarErro(email, 'Por favor, insira um e-mail válido.'); formValido = false; }
            if (senha.value.trim() === '') { mostrarErro(senha, 'A senha não pode estar em branco.'); formValido = false; }
            if (formValido) { alert('Login efetuado com sucesso!'); }
        });
    }

    const formularioCadastro = document.querySelector('.formulario-cadastro');
    if (formularioCadastro) {
        formularioCadastro.addEventListener('submit', e => {
            e.preventDefault();
            limparErros();
            let formValido = true;
            const nome = document.getElementById('nome-completo'), email = document.getElementById('email'), senha = document.getElementById('senha'), confirmaSenha = document.getElementById('confirmar-senha');
            if (nome.value.trim() === '') { mostrarErro(nome, 'O nome completo é obrigatório.'); formValido = false; }
            if (!emailValido(email.value)) { mostrarErro(email, 'Por favor, insira um e-mail válido.'); formValido = false; }
            if (senha.value.length < 8) { mostrarErro(senha, 'A senha deve ter no mínimo 8 caracteres.'); formValido = false; }
            if (senha.value !== confirmaSenha.value) { mostrarErro(confirmaSenha, 'As senhas não correspondem.'); formValido = false; }
            if (formValido) { alert('Conta criada com sucesso!'); }
        });
    }
});