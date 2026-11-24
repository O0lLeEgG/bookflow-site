document.addEventListener('DOMContentLoaded', () => {
    // 1. Мобільне бургер-меню
    const burgerBtn = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('is-open');
            burgerBtn.setAttribute('aria-expanded', String(isOpen));
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('is-open');
                burgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2. Модальне вікно та валідація форми
    const modal = document.getElementById('bookingModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const bookingForm = document.getElementById('bookingForm');
    const selectedServiceInput = document.getElementById('selectedService');

    const userNameInput = document.getElementById('userName');
    const userContactInput = document.getElementById('userContact');
    const userDateInput = document.getElementById('userDate');

    const nameError = document.getElementById('nameError');
    const contactError = document.getElementById('contactError');
    const dateError = document.getElementById('dateError');
    const formStatus = document.getElementById('formStatus');

    function clearFormMessages() {
        if (nameError) nameError.textContent = '';
        if (contactError) contactError.textContent = '';
        if (dateError) dateError.textContent = '';
        if (formStatus) formStatus.textContent = '';
    }

    function openModal(serviceName) {
        if (!modal) return;
        clearFormMessages();
        if (selectedServiceInput) {
            selectedServiceInput.value = serviceName || 'Онлайн-бронювання';
        }
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        if (userNameInput) {
            userNameInput.focus();
        }
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
    }

    openModalBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const serviceName = btn.getAttribute('data-service');
            openModal(serviceName);
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal && modal.classList.contains('is-open')) {
            closeModal();
        }
    });

    if (bookingForm) {
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault();
            clearFormMessages();

            let isValid = true;

            const nameVal = userNameInput ? userNameInput.value.trim() : '';
            const contactVal = userContactInput ? userContactInput.value.trim() : '';
            const dateVal = userDateInput ? userDateInput.value : '';

            if (nameVal.length < 2) {
                if (nameError) nameError.textContent = "Введіть ім'я (мінімум 2 символи).";
                isValid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phonePattern = /^\+?[\d\s()-]{7,20}$/;
            if (!emailPattern.test(contactVal) && !phonePattern.test(contactVal)) {
                if (contactError) contactError.textContent = 'Введіть коректний email або номер телефону.';
                isValid = false;
            }

            if (!dateVal) {
                if (dateError) dateError.textContent = 'Оберіть бажану дату.';
                isValid = false;
            }

            if (!isValid) return;

            if (formStatus) {
                const chosenService = selectedServiceInput ? selectedServiceInput.value : 'послугу';
                formStatus.textContent = `Заявку на "${chosenService}" (${dateVal}) прийнято.`;
            }
            bookingForm.reset();
            if (selectedServiceInput) {
                selectedServiceInput.value = '';
            }
        });
    }

    // 3. Кнопка «Вгору»
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('is-visible');
            } else {
                scrollTopBtn.classList.remove('is-visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});