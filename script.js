// ===============================
// NOORÉ — WEBSITE JAVASCRIPT
// DEMO PRODUCT MANAGEMENT
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

    if (header) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        });

    }


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
    // LOAD DEMO PRODUCTS
    // ===============================

    loadDemoProducts();


    // ===============================
    // PRODUCT FILTER
    // ===============================

    setupProductFilters();


    // ===============================
    // QUICK VIEW
    // ===============================

    setupQuickView();


    // ===============================
    // CURRENT YEAR
    // ===============================

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // ===============================
    // SMOOTH SCROLL
    // ===============================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(event) {

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    console.log(
        "NOORÉ Demo Website Loaded Successfully."
    );

});


// ==================================================
// DEMO PRODUCTS FROM ADMIN PANEL
// ==================================================

function loadDemoProducts() {

    const productGrid =
        document.getElementById("productGrid");

    if (!productGrid) return;


    const savedProducts =
        JSON.parse(
            localStorage.getItem("nooreProducts")
        ) || [];


    savedProducts.forEach(product => {

        const productCard =
            document.createElement("article");

        productCard.className = "product-card";

        productCard.setAttribute(
            "data-category",
            product.category
        );


        productCard.innerHTML = `

            <div class="product-image">

                <span class="product-badge">
                    NEW
                </span>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy">

                <button
                    class="quick-view"
                    data-product="${product.name}"
                    data-price="${product.price}">

                    <i class="fa-regular fa-eye"></i>
                    Quick View

                </button>

            </div>


            <div class="product-info">

                <p class="product-category">
                    ${product.category.toUpperCase()}
                </p>

                <h3>
                    ${product.name}
                </h3>

                <div class="product-bottom">

                    <strong>
                        ${product.price}
                    </strong>

                    <a
                        href="#contact"
                        class="enquire-link">

                        Enquire
                        <i class="fa-solid fa-arrow-right"></i>

                    </a>

                </div>

            </div>

        `;


        productGrid.appendChild(productCard);

    });

}


// ==================================================
// PRODUCT FILTER
// ==================================================

function setupProductFilters() {

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const products =
        document.querySelectorAll(".product-card");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");


            const filter =
                button.getAttribute("data-filter");


            document
                .querySelectorAll(".product-card")
                .forEach(product => {

                    const category =
                        product.getAttribute("data-category");


                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        product.style.display = "block";

                    } else {

                        product.style.display = "none";

                    }

                });

        });

    });

}


// ==================================================
// QUICK VIEW MODAL
// ==================================================

function setupQuickView() {

    const modal =
        document.getElementById("productModal");

    const modalClose =
        document.getElementById("modalClose");

    const modalProduct =
        document.getElementById("modalProduct");

    const modalPrice =
        document.getElementById("modalPrice");


    if (!modal) return;


    document
        .querySelectorAll(".quick-view")
        .forEach(button => {

            button.addEventListener("click", () => {

                const productName =
                    button.getAttribute("data-product");

                const productPrice =
                    button.getAttribute("data-price");


                modalProduct.textContent =
                    productName;

                modalPrice.textContent =
                    productPrice;


                modal.classList.add("show");

                document.body.style.overflow =
                    "hidden";

            });

        });


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


    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("show")
        ) {

            closeModal();

        }

    });

}
