// ===============================
// NOORÉ — WEBSITE JAVASCRIPT
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // MOBILE MENU
    // ===============================

    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("open");

            const icon = menuBtn.querySelector("i");

            if (nav.classList.contains("open")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

    }


    // ===============================
    // CLOSE MOBILE MENU
    // ===============================

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

            const icon = menuBtn?.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

    });


    // ===============================
    // HEADER SCROLL EFFECT
    // ===============================

    const header = document.getElementById("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    // ===============================
    // ACTIVE NAVIGATION
    // ===============================

    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    });


    // ===============================
    // PRODUCT FILTER
    // ===============================

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const products =
        document.querySelectorAll(".product-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            // Remove active state
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            // Add active state
            button.classList.add("active");

            const filter =
                button.getAttribute("data-filter");

            products.forEach(product => {

                const category =
                    product.getAttribute("data-category");

                if (
                    filter === "all" ||
                    category === filter
                ) {

                    product.style.display = "block";

                    setTimeout(() => {
                        product.style.opacity = "1";
                    }, 50);

                } else {

                    product.style.opacity = "0";

                    setTimeout(() => {
                        product.style.display = "none";
                    }, 200);

                }

            });

        });

    });


    // ===============================
    // PRODUCT QUICK VIEW MODAL
    // ===============================

    const modal =
        document.getElementById("productModal");

    const modalClose =
        document.getElementById("modalClose");

    const modalProduct =
        document.getElementById("modalProduct");

    const modalPrice =
        document.getElementById("modalPrice");

    const quickViewButtons =
        document.querySelectorAll(".quick-view");


    quickViewButtons.forEach(button => {

        button.addEventListener("click", () => {

            const productName =
                button.getAttribute("data-product");

            const productPrice =
                button.getAttribute("data-price");

            modalProduct.textContent = productName;
            modalPrice.textContent = productPrice;

            modal.classList.add("show");

            document.body.style.overflow = "hidden";

        });

    });


    // ===============================
    // CLOSE MODAL
    // ===============================

    function closeModal() {

        modal.classList.remove("show");

        document.body.style.overflow = "";

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    const modalOverlay =
        document.querySelector(".modal-overlay");

    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeModal
        );

    }


    // ===============================
    // ESC KEY CLOSE MODAL
    // ===============================

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("show")
        ) {
            closeModal();
        }

    });


    // ===============================
    // CURRENT YEAR
    // ===============================

    const year =
        document.getElementById("year");

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    // ===============================
    // SMOOTH SCROLL
    // ===============================

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(anchor => {

        anchor.addEventListener(
            "click",
            function(event) {

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });


    // ===============================
    // PAGE LOADED
    // ===============================

    console.log(
        "NOORÉ Boutique Website Loaded Successfully."
    );

});
