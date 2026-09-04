import allProjects from "../Logic/projectCollection.js";
/*
 * ============================================================
 * CALENDAR PAGE
 * ============================================================
 *
 */



/*
 * ============================================================
 * DOM REFERENCES
 * ============================================================
 */

// Container where the currently selected page will be displayed.
const $homePage = document.querySelector('#home-page');

// Calendar tab in the sidebar.
const $calendarTab = document.querySelector('#calendar-tab');


/*
 * ============================================================
 * MONTH DATA
 * ============================================================
 */

// Month names used by the month dropdown.
const months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
];


/*
 * ============================================================
 * LOAD CALENDAR PAGE
 * ============================================================
 */

/**
    To load the calendar page on the home screen
 */
function loadCalendarPage() {

    
    //Remove whatever page is currently inside #home-page
    $homePage.replaceChildren();


    /*
     * ========================================================
     * MONTH SELECTOR
     * ========================================================
     */

    const $calendarMonthContainer = document.createElement('div');

    $calendarMonthContainer.id = 'calendar-month-container';

    // Create the month selection form.
    const $monthForm = document.createElement('form');

    $monthForm.action = '';
    $monthForm.method = 'POST';


    // Create the label for the dropdown.
    const $monthLabel = document.createElement('label');

    $monthLabel.htmlFor = 'months';
    $monthLabel.textContent = 'Please select a month:';

    // Create the month dropdown.
    const $calendarDropbox = document.createElement('select');

    $calendarDropbox.name = 'months';
    $calendarDropbox.id = 'months';


    
    //Create an option for every month.
    months.forEach((month) => {
        const $option = document.createElement('option');
        $option.value = month;
        $option.textContent = month.charAt(0).toUpperCase() +month.slice(1);
        $calendarDropbox.appendChild($option); // Convert first letter to uppercase and add to the calendar dropbox
    });


    // Default value is january
    $calendarDropbox.value = 'january';


    // Month label and dropbox to the form
    $monthForm.appendChild($monthLabel);
    $monthForm.appendChild($calendarDropbox);

    $calendarMonthContainer.appendChild($monthForm);


    /*
     * ========================================================
     * CALENDAR CONTAINER
     * ========================================================
     */

    const $calendarContainer = document.createElement('div');

    $calendarContainer.id = 'calendar-container';

    /*
     * ========================================================
     * CALENDAR HEADER
     * ========================================================
     */

    const $calendarHeader =
        document.createElement('div');

    $calendarHeader.id =
        'calendar-header';


    // Names of the seven days displayed above the calendar.
    const daysOfWeek = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ];


    
    // Create the seven weekday labels.
    daysOfWeek.forEach((day) => {

        const $day = document.createElement('p');

        $day.classList.add('calendar-days');
        $day.textContent = day;
        $calendarHeader.appendChild($day);
    });


    /*
     * ========================================================
     * CALENDAR GRID
     * ========================================================
     */

    const $calendar = document.createElement('div');
    $calendar.id = 'calendar';


    /*
     * ========================================================
     * ASSEMBLE CALENDAR PAGE
     * ========================================================
     */

    $calendarContainer.appendChild($calendarHeader);
    $calendarContainer.appendChild($calendar);

    $homePage.appendChild($calendarMonthContainer);
    $homePage.appendChild($calendarContainer);


    /*
     * ========================================================
     * INITIAL CALENDAR
     * ========================================================
     *
     * Render January immediately after the Calendar page
     * has been created.
     */
    renderCalendar($calendar,$calendarDropbox.value);


    /*
     * ========================================================
     * MONTH DROPDOWN EVENT
     * ========================================================
     *
     * When the user selects another month, only the calendar
     * grid is regenerated.
     */
    $calendarDropbox.addEventListener('change', (event) => {
        renderCalendar($calendar, event.target.value);
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
 * @param {HTMLElement} $calendar
 * The calendar container to populate.
 *
 * @param {string} monthSelected
 * The month selected by the user.
 */
function renderCalendar($calendar, monthSelected) {

    // Remove the previous calendar days.
    $calendar.replaceChildren();
    
    // Determine how many days the selected month contains.
    let numberOfDays;

    if (
        monthSelected === 'january' ||
        monthSelected === 'march' ||
        monthSelected === 'may' ||
        monthSelected === 'july' ||
        monthSelected === 'august' ||
        monthSelected === 'october' ||
        monthSelected === 'december'
    ) {
        numberOfDays = 31;
    } else if (
        monthSelected === 'april' ||
        monthSelected === 'june' ||
        monthSelected === 'september' ||
        monthSelected === 'november'
    ) {
        numberOfDays = 30;
    } else {
        // The exeception for February
        numberOfDays = 28;
    }


    /*
     * ========================================================
     * CREATE CALENDAR DAYS
     * ========================================================
     */
    for (let i = 1; i <= 35; i++) {

        const $calendarDay = document.createElement('div');
        $calendarDay.classList.add('calendarDay');

        // Current month days
        if (i <= numberOfDays) {
            $calendarDay.textContent = i;
        }
        // Following month days
        else {
            $calendarDay.textContent =
                i - numberOfDays;
            $calendarDay.classList.add('next-month-day');
        }

        function formatCalendarDate(year, month, day) {
            return `${year}-${month}-${String(day).padStart(2, "0")}`;
        }
        switch (monthSelected) {
            case "january":
                if (i <= numberOfDays) {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "01", i);
                }
                else {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "02", i);
                }
                break;
            case "february":
                if (i <= numberOfDays) {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "02", i);
                }
                else {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "03", i);
                }
                break;
            case "march":
                if (i <= numberOfDays) {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "03", i);
                }
                else {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "04", i);
                }
                break;
            case "april":
                if (i <= numberOfDays) {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "04", i);
                }
                else {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "05", i);
                }
                break;
            case "may":
                if (i <= numberOfDays) {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "05", i);
                }
                else {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "06", i);
                }
                break;
            case "june":
                if (i <= numberOfDays) {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "06", i);
                }
                else {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "07", i);
                }
                break;
            case "july":
                if (i <= numberOfDays) {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "07", i);
                }
                else {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "08", i);
                }
                break;
            case "august":
                if (i <= numberOfDays) {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "08", i);
                }
                else {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "09", i);
                }
                break;
            case "september":
                if (i <= numberOfDays) {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "09", i);
                }
                else {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "10", i);
                }
                break;
            case "october":
                if (i <= numberOfDays) {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "10", i);
                }
                else {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "11", i);
                }
                break;
            case "november":
                if (i <= numberOfDays) {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "11", i);
                }
                else {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "12", i);
                }
                break;
            case "december":
                if (i <= numberOfDays) {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "12", i);
                }
                else {
                    $calendarDay.dataset.date = formatCalendarDate(2026, "01", i);
                }
                break;
            default:
                console.log("Unknown date");
        }

        const hasTask = allProjects.projects.some(project => project.taskList.some(task => (task.taskDueDate == $calendarDay.dataset.date && task.taskStatus == false)));

        if (hasTask) {
            $calendarDay.style.backgroundColor = "yellow";
        }
        $calendar.appendChild($calendarDay);
    }
}


/*
 * ============================================================
 * CALENDAR TAB
 * ============================================================
 */

// Load the calendar page upon clicking the tab
$calendarTab.addEventListener('click', () => {
    loadCalendarPage();
});


/*
 * ============================================================
 * INITIAL PAGE LOAD
 * ============================================================
 */


// Load the Calendar page as soon as the DOM has finished loading (the calendar acts as the home page).
document.addEventListener('DOMContentLoaded', () => {
    loadCalendarPage();
});


export {loadCalendarPage};