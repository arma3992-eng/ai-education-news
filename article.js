async function loadArticle() {
    const response = await fetch("articles.json");
    const data = await response.json();

    const params = new URLSearchParams(window.location.search);
const articleId = params.get("id");

const article = data.articles.find(
    item => item.id === articleId
);

    if (!article) {
        console.error("기사를 찾을 수 없습니다.");
        return;
    }

    document.getElementById("articleCategory").textContent =
        article.category;

    document.getElementById("articleTitle").textContent =
        article.title;

    document.getElementById("articleSummary").textContent =
        article.summary;


    // 기사 본문
    const contentBox =
        document.getElementById("articleContent");

    article.sections.forEach(section => {

        const h2 = document.createElement("h2");
        h2.textContent = section.title;

        const p = document.createElement("p");
        p.textContent = section.content;

        contentBox.appendChild(h2);
        contentBox.appendChild(p);
    });


    // 핵심 체크
    const checklistBox =
        document.getElementById("articleChecklist");

    for (const [label, value] of Object.entries(article.checklist)) {

        const item = document.createElement("div");
        item.className = "check-item";

        item.innerHTML = `
            <strong>${label}</strong>
            <span>${value}</span>
        `;

        checklistBox.appendChild(item);
    }


    // 학생 / 학부모 / 교사
    document.getElementById("studentContent").textContent =
        article.audience.student;

    document.getElementById("parentContent").textContent =
        article.audience.parent;

    document.getElementById("teacherContent").textContent =
        article.audience.teacher;


    // 출처
    const sourcesBox =
        document.getElementById("articleSources");

    article.sources.forEach(source => {

        const li = document.createElement("li");
        li.textContent = source;

        sourcesBox.appendChild(li);
    });
}

loadArticle();