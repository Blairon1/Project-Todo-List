// --- Calendar Webpage --- //
const $calendar = document.querySelector('#calendar');
const $calendarDropbox = document.querySelector('#months');
let $monthSelected = $calendarDropbox.value;
const $calendarDays = document.querySelectorAll('#calendar-header > p');

$calendarDropbox.addEventListener('change', (event)=>{
    $monthSelected = event.target.value;

    $calendar.replaceChildren(); 
    $calendar.style.display = "grid";
    $calendar.style.gridTemplateColumns = "repeat(7, 1fr)";
    $calendar.style.padding = "2px"
    $calendar.style.gap = "2px"
    $calendar.style.backgroundColor = "#000000"; 

    $calendarDays.forEach((p) =>{
        p.style.color = "#000000";
    });

    const calendarBlockWidth = (1200/7);
    console.log(calendarBlockWidth);
    if($monthSelected == 'january' || $monthSelected == 'march' || $monthSelected == 'may' ||
        $monthSelected == 'july' || $monthSelected == 'september' || $monthSelected == 'november'
    ){
        
        for(let i = 1; i <= 35; i++){
            const calendarDay = document.createElement('div');
            calendarDay.classList.add("calendarDay");
            calendarDay.style.width = calendarBlockWidth;
            calendarDay.style.height = calendarBlockWidth;

            if(i <= 30){
                calendarDay.innerHTML = i;
            }else if(i > 30){
                calendarDay.innerHTML = (i-30);
                calendarDay.style.opacity = "0.7";
            }
            $calendar.appendChild(calendarDay);
        }

    }else if($monthSelected == 'april' || $monthSelected == 'june' ||
        $monthSelected == 'august' || $monthSelected == 'october' || $monthSelected == 'december'){
            for(let i = 1; i <= 35; i++){
                const calendarDay = document.createElement('div');
                calendarDay.classList.add("calendarDay");
                calendarDay.style.width = calendarBlockWidth;
                calendarDay.style.height = calendarBlockWidth;

                if(i <= 31){
                    calendarDay.innerHTML = i;
                }else if(i > 31){
                    calendarDay.innerHTML = (i-30);
                    calendarDay.style.opacity = "0.7";
                }
                $calendar.appendChild(calendarDay);
            }

    }else{
        for(let i = 1; i <= 35; i++){
            const calendarDay = document.createElement('div');
            calendarDay.classList.add("calendarDay");
            calendarDay.style.width = calendarBlockWidth;
            calendarDay.style.height = calendarBlockWidth;

            if(i <= 28){
                calendarDay.innerHTML = i;
            }else if(i > 28){
                calendarDay.innerHTML = (i-28);
                calendarDay.style.opacity = "0.7";
            }
            $calendar.appendChild(calendarDay);
        }
    }

    console.log($monthSelected);
})