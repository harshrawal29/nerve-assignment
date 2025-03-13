    const dateArray = [
    "24-Apr-2024",
    "02-May-2024",
    "09-May-2024",
    "31-May-2024",
    "21-Jun-2024",
    ];

    const strategyArray = [
    {
        View: "Bullish",
        Value: {
        "24-Apr-2024": [
            "Bull Call Spread",
            "Bull Put Spread",
            "Bull Put Spread",
            "Long Call",
            "Bull Put Spread",
            "Bull Call Spread",
            "Strategy1",
            "Bull Call Spread",
            "Strategy1",
            "Strategy1",
            "SpreadStrategy",
            "Bull Call Spread",
        ],
        "02-May-2024": [
            "Bull Call Spread",
            "Bull Call Spread",
            "Bull Put Spread",
            "Long Call",
            "Long Call",
            "Long Call",
            "Bull Put Spread",
            "Bull Call Spread",
            "Strategy1",
            "Bull Call Spread",
            "Strategy2",
            "Strategy1",
            "Strategy2",
            "Bull Call Spread",
        ],
        "09-May-2024": [
            "Strategy Put",
            "Strategy Call",
            "Strategy Call",
            "Strategy Call",
            "Strategy Put",
        ],
        },
    },
    {
        View: "Bearish",
        Value: {
        "24-Apr-2024": [
            "Bear Call Spread",
            "Bear Call Spread",
            "Bear Call Spread",
            "Long Put",
            "Long Put",
            "Long Put",
            "Bear Call Spread",
        ],
        "31-May-2024": [
            "Long Put",
            "Long Put",
            "Long Put",
            "Long Put",
            "Long Put",
        ],
        "21-Jun-2024": [
            "Strategy3",
            "Strategy3",
            "Bear Put Spread",
            "Strategy3",
            "Long Put",
            "Long Put",
        ],
        },
    },
    {
        View: "RangeBound",
        Value: {
        "24-Apr-2024": [
            "Short Straddle",
            "Short Strangle",
            "Short Strangle",
            "Iron Butterfly",
            "Short Strangle",
            "Short Straddle",
            "Strategy1",
            "Short Straddle",
            "Strategy1",
            "Strategy1",
            "SpreadStrategy",
            "Short Straddle",
        ],
        "02-May-2024": [
            "Short Straddle",
            "Short Straddle",
            "Short Strangle",
            "Iron Butterfly",
            "Iron Butterfly",
            "Iron Butterfly",
            "Short Strangle",
            "Short Straddle",
            "Strategy1",
            "Short Straddle",
            "Strategy2",
            "Strategy1",
            "Strategy2",
            "Short Straddle",
        ],
        "21-Jun-2024": [
            "Iron Condor",
            "Iron Butterfly",
            "Iron Butterfly",
            "Iron Butterfly",
            "Iron Condor",
        ],
        },
    },
    {
        View: "Volatile",
        Value: {
        "02-May-2024": [
            "Long Straddle",
            "Long Strangle",
            "Long Strangle",
            "Long Strangle",
            "Long Straddle",
            "Strategy1",
            "Long Straddle",
            "Strategy1",
            "Strategy1",
            "Spread-Strategy",
            "Long Straddle",
        ],
        "09-May-2024": [
            "Long Straddle",
            "Long Straddle",
            "Long Strangle",
            "Long Strangle",
            "Long Straddle",
            "Strategy1",
            "Long Straddle",
            "Strategy2",
            "Strategy1",
            "Strategy2",
            "Long Straddle",
        ],
        "31-May-2024": [
            "Long Straddle",
            "Long Strangle",
            "Long Strangle",
            "Long Strangle",
            "Long Straddle",
        ],
        },
    },
    ];

    const dropdownList = document.getElementById("dropdownList");
    const selectedDate = document.getElementById("selectedDate");
    const dropdownContainer = document.getElementById("dropdownContainer");

    function renderDropdown() {
    dropdownList.innerHTML = "";
    dateArray.forEach((date) => {
        const item = document.createElement("div");
        item.classList.add("dropdown-item");
        item.textContent = date;
        item.addEventListener("click", () => {
        selectedDate.textContent = date;
        dropdownContainer.classList.remove("dropdown-open");
        renderCards(); // Update cards on date change
        });
        dropdownList.appendChild(item);
    });
    }

    selectedDate.addEventListener("click", () => {
    dropdownContainer.classList.toggle("dropdown-open");
    });

    document.addEventListener("click", (event) => {
    if (!dropdownContainer.contains(event.target)) {
        dropdownContainer.classList.remove("dropdown-open");
    }
    });

    renderDropdown();

    function getStrategyCount(view, date) {
    const strategyData = strategyArray.find((item) => item.View === view);
    if (!strategyData || !strategyData.Value[date]) return [];
    const strategyCounts = strategyData.Value[date].reduce(
        (acc, strategy) => {
        acc[strategy] = (acc[strategy] || 0) + 1;
        return acc;
        },
        {}
    );
    return Object.entries(strategyCounts).map(([strategy, count]) => ({
        name: strategy,
        count: count,
        label: count > 1 ? "Strategies" : "Strategy",
    }));
    }

    function renderCards() {
    const selectedView =
        document.querySelector(".toggle-btn.active").dataset.view;
    const selectedDateValue =
        document.getElementById("selectedDate").textContent;
    const cardsContainer = document.getElementById("cardsContainer");
    const emptyState = document.getElementById("emptyState");
    cardsContainer.innerHTML = "";
    emptyState.textContent = "";
    const strategies = getStrategyCount(selectedView, selectedDateValue);
    if (strategies.length > 0) {
        strategies.forEach((strategy) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<span>${strategy.name}</span><span class="strategy-count">${strategy.count} ${strategy.label}</span>`;
        cardsContainer.appendChild(card);
        });
    } else {
        const strongElement = document.createElement("strong");
        strongElement.textContent = selectedDateValue;
        emptyState.innerHTML = `There are no strategies for `;
        emptyState.appendChild(strongElement);
    }
    }

    document.querySelectorAll(".toggle-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        document
        .querySelectorAll(".toggle-btn")
        .forEach((el) => el.classList.remove("active"));
        btn.classList.add("active");
        renderCards();
    });
    });
    renderCards();