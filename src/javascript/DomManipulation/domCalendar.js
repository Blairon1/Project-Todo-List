import allProjects from "../Logic/projectCollection.js";
/*
 * ============================================================
 * CALENDAR PAGE
 * ============================================================
 */

/*
 * ============================================================
 * DOM REFERENCES
 * ============================================================
 */

// Container where the currently selected page will be displayed.
const homePage = document.querySelector('#home-page');

// Calendar tab in the sidebar.
const calendarTab = document.querySelector('#calendar-tab');

/*
 * ============================================================
 * MONTH DATA
 * ============================================================
 */

// Month names used by the month dropdown.
const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december',
];

const monthNumbers = {
    january: '01', february: '02', march: '03', april: '04',
    may: '05', june: '06', july: '07', august: '08',
    september: '09', october: '10', november: '11', december: '12',
};

const daysInMonth = {
    january: 31, february: 28, march: 31, april: 30,
    may: 31, june: 30, july: 31, august: 31,
    september: 30, october: 31, november: 30, december: 31,
};

/*
 * ============================================================
 * LOAD CALENDAR PAGE
 * ============================================================
 */

/**
 * To load the calendar page on the home screen
 */
function loadCalendarPage() {
    // Remove whatever page is currently inside #home-page
    homePage.replaceChildren();

    /*
     * ========================================================
     * MONTH SELECTOR
     * ========================================================
     */

    const monthContainer = document.createElement('div');
    monthContainer.id = 'calendar-month-container';

    // Create the month selection form.
    const monthForm = document.createElement('form');
    monthForm.action = '';
    monthForm.method = 'POST';

    // Create the label for the dropdown.
    const monthLabel = document.createElement('label');
    monthLabel.htmlFor = 'months';
    monthLabel.textContent = 'Please select a month:';

    // Create the month dropdown.
    const monthDropdown = document.createElement('select');
    monthDropdown.name = 'months';
    monthDropdown.id = 'months';

    // Create an option for every month.
    months.forEach((month) => {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month.charAt(0).toUpperCase() + month.slice(1);
        monthDropdown.appendChild(option); // Convert first letter to uppercase and add to the calendar dropdown
    });

    // Default value is january
    monthDropdown.value = 'january';

    // Month label and dropdown to the form
    monthForm.append(monthLabel, monthDropdown);
    monthContainer.appendChild(monthForm);

    /*
     * ========================================================
     * CALENDAR CONTAINER
     * ========================================================
     */

    const calendarContainer = document.createElement('div');
    calendarContainer.id = 'calendar-container';

    /*
     * ========================================================
     * CALENDAR HEADER
     * ========================================================
     */

    const calendarHeader = document.createElement('div');
    calendarHeader.id = 'calendar-header';

    // Names of the seven days displayed above the calendar.
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Create the seven weekday labels.
    daysOfWeek.forEach((day) => {
        const dayLabel = document.createElement('p');
        dayLabel.classList.add('calendar-days');
        dayLabel.textContent = day;
        calendarHeader.appendChild(dayLabel);
    });

    /*
     * ========================================================
     * CALENDAR GRID
     * ========================================================
     */

    const calendar = document.createElement('div');
    calendar.id = 'calendar';

    /*
     * ========================================================
     * ASSEMBLE CALENDAR PAGE
     * ========================================================
     */

    calendarContainer.append(calendarHeader, calendar);
    homePage.append(monthContainer, calendarContainer);

    /*
     * ========================================================
     * INITIAL CALENDAR
     * ========================================================
     *
     * Render January immediately after the Calendar page
     * has been created.
     */
    renderCalendar(calendar, monthDropdown.value);

    /*
     * ========================================================
     * MONTH DROPDOWN EVENT
     * ========================================================
     *
     * When the user selects another month, only the calendar
     * grid is regenerated.
     */
    monthDropdown.addEventListener('change', (event) => {
        renderCalendar(calendar, event.target.value);
    });
}

/*
 * ============================================================
 * RENDER CALENDAR
 * ============================================================
 */

/**
 * Generates the calendar days for the selected month.
 *
 * @param {HTMLElement} calendar
 * The calendar container to populate.
 *
 * @param {string} selectedMonth
 * The month selected by the user.
 */
function renderCalendar(calendar, selectedMonth) {
    // Remove the previous calendar days.
    calendar.replaceChildren();

    // Determine how many days the selected month contains.
    const numberOfDays = daysInMonth[selectedMonth];
    const monthIndex = months.indexOf(selectedMonth);
    const nextMonth = months[(monthIndex + 1) % months.length];
    const nextMonthYear = selectedMonth === 'december' ? 2027 : 2026;

    /*
     * ========================================================
     * CREATE CALENDAR DAYS
     * ========================================================
     */
    for (let dayNumber = 1; dayNumber <= 35; dayNumber++) {
        const calendarDay = document.createElement('div');
        calendarDay.classList.add('calendar-day');

        // Current month days
        if (dayNumber <= numberOfDays) {
            calendarDay.textContent = dayNumber;
            calendarDay.dataset.date = formatCalendarDate(
                2026,
                monthNumbers[selectedMonth],
                dayNumber
            );
        }
        // Following month days
        else {
            const nextMonthDay = dayNumber - numberOfDays;
            calendarDay.textContent = nextMonthDay;
            calendarDay.classList.add('next-month-day');
            calendarDay.dataset.date = formatCalendarDate(
                nextMonthYear,
                monthNumbers[nextMonth],
                nextMonthDay
            );
        }

        const hasTask = allProjects.projects.some(project => project.taskList.some(task => (task.dueDate == calendarDay.dataset.date && task.isCompleted == false)));

        if (hasTask) {
            calendarDay.style.backgroundColor = "yellow";
        }

        calendar.appendChild(calendarDay);
    }
}

function formatCalendarDate(year, month, day) {
    return `${year}-${month}-${String(day).padStart(2, '0')}`;
}

calendarTab.addEventListener('click', loadCalendarPage);
loadCalendarPage();

export { loadCalendarPage };
