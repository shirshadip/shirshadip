const searchInput = document.getElementById("searchBar");
const projects = [...document.querySelectorAll(".project-card")];
const filterButtons = [...document.querySelectorAll(".filter-button")];
const projectCount = document.getElementById("projectCount");
const emptyState = document.getElementById("emptyState");
const resetButton = document.getElementById("resetFilters");

const categoryTags = {
    python: ["python"],
    web: ["web", "html", "css", "js", "streamlit", "flask"],
    ai: ["ai", "machine-learning", "data science", "pandas", "plotly", "scikit-learn"],
    iot: ["iot", "arduino"]
};

let activeCategory = "all";

const applyFilters = () => {
    const query = searchInput.value.trim().toLocaleLowerCase();
    const terms = query.split(/\s+/).filter(Boolean);
    let visibleCount = 0;

    projects.forEach(project => {
        const tags = [...project.querySelectorAll(".tech-tag")].map(tag =>
            tag.textContent.trim().toLocaleLowerCase()
        );
        const searchableText = project.textContent.toLocaleLowerCase();
        const matchesQuery = terms.every(term => searchableText.includes(term));
        const matchesCategory = activeCategory === "all" ||
            categoryTags[activeCategory].some(category =>
                tags.some(tag => tag.includes(category))
            );
        const isVisible = matchesQuery && matchesCategory;

        project.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
    });

    projectCount.textContent = `${visibleCount} ${visibleCount === 1 ? "project" : "projects"}`;
    emptyState.hidden = visibleCount !== 0;
};

searchInput.addEventListener("input", applyFilters);

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        activeCategory = button.dataset.filter;
        filterButtons.forEach(filterButton => {
            const isActive = filterButton === button;
            filterButton.classList.toggle("is-active", isActive);
            filterButton.setAttribute("aria-pressed", String(isActive));
        });
        applyFilters();
    });
});

document.querySelector(".projects-grid").addEventListener("click", event => {
    const tag = event.target.closest(".tech-tag");
    if (!tag) return;

    searchInput.value = tag.textContent.trim();
    activeCategory = "all";
    filterButtons.forEach(button => {
        const isActive = button.dataset.filter === "all";
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
    applyFilters();
    searchInput.focus();
});

document.querySelector(".projects-grid").addEventListener("keydown", event => {
    if ((event.key === "Enter" || event.key === " ") && event.target.matches(".tech-tag")) {
        event.preventDefault();
        event.target.click();
    }
});

document.querySelectorAll(".tech-tag").forEach(tag => {
    tag.tabIndex = 0;
    tag.setAttribute("role", "button");
    tag.setAttribute("aria-label", `Filter projects by ${tag.textContent.trim()}`);
});

resetButton.addEventListener("click", () => {
    searchInput.value = "";
    activeCategory = "all";
    filterButtons.forEach(button => {
        const isActive = button.dataset.filter === "all";
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
    applyFilters();
    searchInput.focus();
});

document.addEventListener("keydown", event => {
    const isTyping = event.target instanceof HTMLElement &&
        (event.target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName));
    if (event.key === "/" && !isTyping) {
        event.preventDefault();
        searchInput.focus();
    }
    if (event.key === "Escape" && document.activeElement === searchInput) {
        searchInput.value = "";
        applyFilters();
    }
});

applyFilters();