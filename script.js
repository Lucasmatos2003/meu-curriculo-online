// --- 1. Rolagem Suave para os Links de Navegação ---
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Impede o comportamento padrão do link (salto instantâneo)

        const targetId = this.getAttribute('href'); // Pega o ID da seção (ex: "#sobre")
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth' // Faz a rolagem de forma suave
            });

            // Se o menu mobile estiver aberto, fecha-o após clicar em um link
            const nav = document.querySelector('header nav ul');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        }
    });
});

// --- 2. Menu de Navegação Responsivo (Toggle para Mobile) ---
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const navUl = document.querySelector('header nav ul');

    // Cria o botão de toggle dinamicamente se não existir
    let menuToggle = document.querySelector('.menu-toggle');
    if (!menuToggle) {
        menuToggle = document.createElement('button');
        menuToggle.classList.add('menu-toggle');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
        menuToggle.innerHTML = '☰'; // Ícone de hambúrguer
        header.insertBefore(menuToggle, navUl); // Adiciona antes do nav ul
    }

    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('active'); // Adiciona/remove a classe 'active'
    });

    // Fecha o menu se clicar fora dele em telas menores
    document.addEventListener('click', (event) => {
        // Verifica se o clique não foi dentro do menu ou no botão de toggle
        if (!navUl.contains(event.target) && !menuToggle.contains(event.target) && navUl.classList.contains('active')) {
            navUl.classList.remove('active');
        }
    });
});


// --- 3. Highlight da Seção Ativa na Navegação ---
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('header nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Ponto de detecção: quando o topo da seção está visível na tela
        // Ajuste 'window.scrollY + window.innerHeight / 3' para mudar o ponto de ativação
        // O valor 'window.innerHeight / 3' significa que a seção se torna 'ativa' quando
        // 1/3 da altura da viewport já rolou para dentro dela.
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active'); // Remove a classe 'active' de todos
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active'); // Adiciona 'active' ao link da seção atual
        }
    });
});

// Garante que a primeira seção seja destacada ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // Certifica-se de que há seções e links de navegação para processar
    if (sections.length > 0 && navLinks.length > 0) {
        // Encontra o primeiro link que corresponde à primeira seção
        const firstSectionId = sections[0].getAttribute('id');
        const firstNavLink = document.querySelector(`nav a[href="#${firstSectionId}"]`);
        // Adiciona a classe 'active' ao primeiro link, se encontrado
        if (firstNavLink) {
            firstNavLink.classList.add('active');
        }
    }
});