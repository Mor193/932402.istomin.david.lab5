const userName = prompt("Введите ваше имя:", "Давид");

const eventTemperatures = [8, 24, 31, 9, 18, 22, 10];

function findHottestDay(temps) {
    let maxTemp = temps[0];
    for (let i = 1; i < temps.length; i++) {
        if (temps[i] > maxTemp) {
            maxTemp = temps[i];
        }
    }
    return maxTemp;
}

function filterWarmDays(temps) {
    return temps.filter(temp => temp > 20);
}

function calculateAverageTemp(temps) {
    if (temps.length === 0) return 0;
    const sum = temps.reduce((total, temp) => total + temp, 0);
    return Number((sum / temps.length).toFixed(1));
}

let coldDaysCount = 0;
let coldDaysSum = 0;

for (let i = 0; i < eventTemperatures.length; i++) {
    const currentTemp = eventTemperatures[i];
    if (currentTemp <= 10) {
        coldDaysCount++;
        coldDaysSum += currentTemp;
    }
}

const averageColdTemp = coldDaysCount > 0 ? Number((coldDaysSum / coldDaysCount).toFixed(1)) : 0;
const hottestTemp = findHottestDay(eventTemperatures);
const warmDays = filterWarmDays(eventTemperatures);
const averageAllTemp = calculateAverageTemp(eventTemperatures);

alert(`Здравствуйте, ${userName}! Средняя температура за период – ${averageAllTemp} °C, было ${warmDays.length} тёплых дней.`);

console.log(`Количество холодных дней (≤ 10 °C): ${coldDaysCount}`);
console.log(`Средняя температура в холодные дни: ${averageColdTemp} °C`);

if (hottestTemp >= 30) {
    console.log("Рекомендуется предусмотреть навесы и воду для гостей");
}

document.addEventListener("DOMContentLoaded", () => {
    const userEl = document.getElementById("widget-user");
    const avgAllEl = document.getElementById("widget-avg-all");
    const warmDaysEl = document.getElementById("widget-warm-days");
    const coldDaysEl = document.getElementById("widget-cold-days");
    const coldAvgEl = document.getElementById("widget-cold-avg");
    const noticeEl = document.getElementById("widget-notice");

    if (userEl) userEl.textContent = userName || "Гость";
    if (avgAllEl) avgAllEl.textContent = `${averageAllTemp} °C`;
    if (warmDaysEl) warmDaysEl.textContent = warmDays.length;
    if (coldDaysEl) coldDaysEl.textContent = coldDaysCount;
    if (coldAvgEl) coldAvgEl.textContent = `${averageColdTemp} °C`;

    if (hottestTemp >= 30 && noticeEl) {
        noticeEl.style.display = "block";
    }

    const elements = {
        hobbiesSection: document.getElementById("hobbies"),
        hobbiesContainer: document.getElementById("hobbies-container"),
        addHobbyBtn: document.getElementById("add-hobby-btn"),
        toggleViewBtn: document.getElementById("toggle-view-btn"),
        toggleHobbiesBtn: document.getElementById("toggle-hobbies-btn"),
        themeToggleBtn: document.getElementById("theme-toggle-btn")
    };

    const hobbiesNavLink = document.querySelector('.nav-menu a[href="#hobbies"]');

    let hasCriticalError = false;
    for (const [key, element] of Object.entries(elements)) {
        if (!element) {
            console.error(`[Lab 5 Error]: Критический DOM-элемент "${key}" не найден в разметке.`);
            hasCriticalError = true;
        }
    }

    if (hasCriticalError) {
        console.warn("[Lab 5 Warning]: Инициализация прервана из-за отсутствия обязательных элементов DOM.");
        return;
    }

    const DEFAULT_HOBBY_ICON_SVG = `
        <svg class="hobby-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
    `;

    elements.addHobbyBtn.addEventListener("click", () => {
        const hobbyTitle = prompt("Введите название нового хобби:");

        if (hobbyTitle === null) {
            return;
        }

        const trimmedTitle = hobbyTitle.trim();
        if (!trimmedTitle) {
            alert("Название хобби не может быть пустым!");
            console.warn("[Lab 5 Warning]: Попытка добавить хобби с пустым названием.");
            return;
        }

        const article = document.createElement("article");
        article.classList.add("hobby-card", "hobby-item");

        const iconWrapper = document.createElement("div");
        iconWrapper.className = "hobby-icon-wrapper";
        iconWrapper.innerHTML = DEFAULT_HOBBY_ICON_SVG;

        const contentDiv = document.createElement("div");
        contentDiv.className = "hobby-content";

        const titleEl = document.createElement("h3");
        titleEl.textContent = trimmedTitle;

        const descEl = document.createElement("p");
        descEl.textContent = "Новое увлечение, добавленное пользователем в коллекцию.";

        contentDiv.appendChild(titleEl);
        contentDiv.appendChild(descEl);

        article.appendChild(iconWrapper);
        article.appendChild(contentDiv);

        elements.hobbiesContainer.appendChild(article);
        console.log(`[Lab 5 Success]: Добавлено новое хобби: "${trimmedTitle}"`);
    });

    elements.toggleViewBtn.addEventListener("click", () => {
        const container = elements.hobbiesContainer;

        if (container.classList.contains("view-grid")) {
            container.classList.remove("view-grid");
            container.classList.add("view-list");
            elements.toggleViewBtn.textContent = "⊞ Вид: Список";
            console.log("[Lab 5 View]: Переключено на отображение списком (.view-list)");
        } else {
            container.classList.remove("view-list");
            container.classList.add("view-grid");
            elements.toggleViewBtn.textContent = "⊞ Вид: Сетка";
            console.log("[Lab 5 View]: Переключено на отображение сеткой (.view-grid)");
        }
    });

    elements.toggleHobbiesBtn.addEventListener("click", () => {
        const isHidden = elements.hobbiesSection.classList.toggle("hidden");
        elements.toggleHobbiesBtn.textContent = isHidden ? "👁 Показать хобби" : "👁 Скрыть хобби";
        console.log(`[Lab 5 Toggle]: Секция хобби ${isHidden ? "скрыта" : "отображена"}`);
    });

    if (hobbiesNavLink) {
        hobbiesNavLink.addEventListener("click", () => {
            if (elements.hobbiesSection.classList.contains("hidden")) {
                elements.hobbiesSection.classList.remove("hidden");
                elements.toggleHobbiesBtn.textContent = "👁 Скрыть хобби";
                console.log("[Lab 5 Nav]: Секция хобби восстановлена по клику из меню навигации.");
            }
        });
    }

    const savedTheme = localStorage.getItem("app-theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }

    elements.themeToggleBtn.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-theme");
        localStorage.setItem("app-theme", isDark ? "dark" : "light");
        console.log(`[Lab 5 Theme]: Тема изменена на ${isDark ? "тёмную" : "светлую"}`);
    });
}); 