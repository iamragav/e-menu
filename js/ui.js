document.addEventListener('DOMContentLoaded', function() {
    //nav menu
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});
});


const carousel = document.querySelector('.customCarousel');
firstImg = carousel.querySelectorAll('img')[0];
arrowIcons = document.querySelectorAll('.wrapper .material-icons');

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;




const showHideIcons = () => {

    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width

    if (carousel.scrollLeft == 0) {
        arrowIcons[0].style.display = "none";
    } else {
        arrowIcons[0].style.display = "block";
    }
    if (carousel.scrollLeft == scrollWidth) {
        arrowIcons[1].style.display = "none";
    } else {
        arrowIcons[1].style.display = "block";
    }
}

arrowIcons.forEach(icon => {
    icon.addEventListener('click', () => {

        let firstImgWidth = firstImg.clientWidth + 10; // getting first img and adding margin-left value 

        // If left arrow is clicked then reduce width value 
        if(icon.id == "left") {
            carousel.scrollLeft -= firstImgWidth;
        } else {
            carousel.scrollLeft += firstImgWidth;
        }
        setTimeout(() =>  showHideIcons(), 60);
    });
});

const autoSlide = () => {
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;


    positionDiff = Math.abs(positionDiff); // making negative values positive
    let firstImgWidth = firstImg.clientWidth + 10;
    let valDifference =  firstImgWidth - positionDiff;

    // below code not working as intended : https://www.youtube.com/watch?v=7HPsdVQhpRw
    
    /* if(carousel.scrollLeft > prevScrollLeft) {
        return carousel.scrollLeft += positionDiff > firstImgWidth /3 ? valDifference : -positionDiff;
    }
    carousel.scrollLeft -= positionDiff > firstImgWidth /3 ? valDifference : -positionDiff; */
    
}

const dragStart = (e) => {
    // updating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images to left accrosing to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add('dragging');
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove('dragging');
    if(!isDragging) return;
    isDragging = false;
    autoSlide();

}

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart);

carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('touchmove', dragging);

carousel.addEventListener('mouseup', dragStop); 
carousel.addEventListener('mouseleave', dragStop); 
carousel.addEventListener('touchend', dragStop); 