(function () {
    // nodes animation
    var nodesjs = new NodesJs({
        id: 'canvas',
        width: window.innerWidth,
        height: window.innerHeight,
        particleSize: 2,
        lineSize: 1,
        particleColor: [125, 132, 156, 0.9],
        lineColor: [125, 132, 156],
        number: window.hasOwnProperty('orientation') ? 30: 100,
        speed: 15
    });

    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })

    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }

    function bodyScrollbarShow (active) {
        if (active)
            $("body").removeClass('not-scrollbar');
        else
            $("body").addClass('not-scrollbar');
    }

    // Portfolio popup

    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    preBtn = popup.querySelector(".pp-pre"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    project_details = popup.querySelector(".pp-project-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    portfolioItemsContainer.addEventListener("click", (event) =>{
        if(event.target.closest(".portfolio-item-inner")){
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            // get the portfolio items index 
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-image img").getAttribute("data-screenshots");
            // convert screenshots into array 
            screenshots = screenshots.split(",");
            if(screenshots.length === 1 ){
                preBtn.style.display = "none";
                nextBtn.style.display ="none";
            }
    
            else{
                preBtn.style.display = "block";
                nextBtn.style.display ="block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
        
    })

    closeBtn.addEventListener("click", () =>{
        popupToggle();
        bodyScrollbarShow(true);
        if(projectDetailsContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollbarShow(false);
    }

    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex]
        const popupImg = popup.querySelector(".pp-img");
        /**
         * active loader until the popupImg loaded 
         */

        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () =>{
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        let last_num = Number( screenshots.length);
        last_num-1;
        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1 ) + " of " + last_num;


    }

    function popupDetails(){
        if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
            projectDetailsBtn.style.display = "none";
            popup.querySelector(".pp-details").style.maxHeight = "0px";
            popup.querySelector(".pp-details").classList.remove("active");
            projectDetailsBtn.querySelector("i").classList.add("mdi-minus");
            return;
        }
        else{
            projectDetailsBtn.style.display = "block";
            // projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
        }

        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        project_details.innerHTML = details;

        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;

        const category = portfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");

        const mode = portfolioItems[itemIndex].getAttribute("data-mode");
        popup.querySelector(".pp-project-mode").innerHTML = mode;

        const rol = portfolioItems[itemIndex].getAttribute("data-rol");
        popup.querySelector(".pp-project-rol").innerHTML = rol.split("-").join(" ");
    }

    // next slide 
    nextBtn.addEventListener("click", () =>{
        if(slideIndex === screenshots.length-1){
            slideIndex = 0;
        }
        else{
            slideIndex++;
        }
        popupSlideshow();
    })

    // pre slide
    preBtn.addEventListener("click", () =>{
        if(slideIndex === 0){
            slideIndex = screenshots.length-1
        }
        else{
            slideIndex--;
        }
        popupSlideshow();
    })

    projectDetailsBtn.addEventListener("click", () =>{
        popupDetailsToggle();
    })

    function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsBtn.querySelector("i").classList.remove("mdi-minus");
            projectDetailsBtn.querySelector("i").classList.add("mdi-plus");

            popup.querySelector(".pp-details").classList.remove("active");
            popup.querySelector(".pp-details").style.maxHeight = "0px";
        }
        else{
            projectDetailsBtn.querySelector("i").classList.remove("mdi-plus");
            projectDetailsBtn.querySelector("i").classList.add("mdi-minus");

            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.querySelector(".pp-details").classList.add("active");
            popup.scrollTo(0, projectDetailsContainer.offsetTop)
        }
    }
    
})();
