const searchInput = document.getElementById("searchBar");
const projects = document.querySelectorAll(".project-card");

searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase().trim();

    projects.forEach(project => {
        const tags = project.querySelectorAll(".tech-tag");

        let tagArray = [];

        tags.forEach(tag => {
            tagArray.push(tag.textContent.toLowerCase());
        });

        // Check if any tag matches the search
        const match = tagArray.some(tag => tag.includes(query));

        if (match || query === "") {
            project.style.display = "block";
        } else {
            project.style.display = "none";
        }
    });
});