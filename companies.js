document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".company-card");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {

            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const category = btn.dataset.category;

            cards.forEach(card => {

                const cardCat = card.dataset.category;

                if (category === "all" || category === cardCat) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

});
