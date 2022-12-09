$(function () {
    loadCars();
    $("#openLoginForm").on("click", function (e) {
        e.preventDefault();
        $("#loginModal").modal("show");
    });
    $("#loginForm").on("submit", function (e) {
        e.preventDefault();
    });
    $("#loginModal").on("shown.bs.modal", function () {
        $("#loginModal").find("input").first().focus();
    });
});

var loadCars = function () {
    $(".grid").empty();
    $.ajax({
        url: "./api/cars",
        type: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data, function (index, car) {
                let image = getCarPhoto(car.car_id);
                $(".grid").append(`
                    <div class="grid-item">
                        <div class="card ms-2 mb-2 fw-bold fs-5">
                            <img class="card-img-top img-thumbnail" src="./images/${image}" alt="${image}">
                            <div class="card-body">
                                <h5 class="card-title"><a class="text-decoration-none car-title-link" val="${car.car_id}">${car.title}</a></h5>
                                <p class="card-text">${car.description}</p>
                                <p class="card-text">Model: ${car.model}</p>
                                <p class="card-text">State: ${car.state}</p>
                            </div>
                            <div class="card-footer">
                                <div class="d-flex flex-row justify-content-lg-start">
                                    € ${car.price}
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            });
            $(".car-title-link").unbind("click").on("click", function (e) {
                e.preventDefault();
                showCarModal(parseInt($(this).attr("val")));
            });
        },
        error: function () {
            console.log("Error loading cars");
        },
        async: false
    });
    $(window).on("load", function () {
        $(".grid").masonry("layout");
    });
}

var showCarModal = function (car_id) {
    $.ajax({
        url: "./api/cars/" + car_id,
        type: "GET",
        dataType: "json",
        success: function (car) {
            // show car in a pop up window
            let image = getCarPhoto(car_id);
            $("#carModal").modal("show");
            $("#carModalLabel").text(car.title);
            $("#carModalBody").empty();
            let innerHtml = `
                <div class="card">
                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators mt-5">
                        `;

            let photos = getCarPhotos(car_id);
            $.each(photos, function (index, photo) {
                innerHtml += `
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" class="${index == 0 ? "active" : ""}" ${index == 0 ? 'aria-current="true"' : ""} aria-label="Slide ${index + 1}"></button>
                `;
            });


            innerHtml += `
                        </div>
                        <div id="carousel-carModal" class="carousel-inner mb-5">`;
            $.each(photos, function (index, photo) {
                innerHtml += `
                                <div class="carousel-item${index == 0 ? " active" : ""}">
                                    <img class="d-block mx-auto" style="height: 200px;" src="./images/${photo}" alt="${photo}">
                                </div>
                            `;
            });
            innerHtml += `
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        </a>
                    </div>
                    <div class="card-body fw-bold fs-5">
                        <h5 class="card-title">${car.title}</h5>
                        <p class="card-text">${car.description}</p>
                        <p class="card-text">Model: ${car.model}</p>
                        <p class="card-text">State: ${car.state}</p>
                        <p class="card-text">Color: ${car.color}</p>
                        <p class="card-text">Production: ${car.production_date}</p>
                        <p class="card-text">Purchase: ${car.purchase_date}</p>
                    </div>
                    <div class="card-footer">
                        <div class="d-flex flex-row justify-content-lg-start">
                            € ${car.price}
                        </div> 
                    </div>
                </div>
            `;
            console.log(innerHtml);
            $("#carModalBody").append(innerHtml);
        },
        error: function () {
            console.log("Error loading car");
        }
    });
}

var getCarPhoto = function (car_id) {
    let image = "default.jpg";
    $.ajax({
        url: "./api/cars/photos/" + car_id,
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data.length > 0)
                image = data[0].dir;
            $.ajax({
                url: "./images/" + image,
                type: "HEAD",
                error: function () {
                    console.log("Error loading image");
                    image = "default.jpg";
                },
                async: false
            });
        },
        error: function () {
            console.log("Error loading image");
        },
        async: false
    });
    return image;
}

var getCarPhotos = function (car_id) {
    let images = [];
    $.ajax({
        url: "./api/cars/photos/" + car_id,
        type: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data, function (index, photo) {
                $.ajax({
                    url: "./images/" + photo.dir,
                    type: "HEAD",
                    error: function () {
                        console.log("Error loading image");
                        photo.dir = "default.jpg";
                    },
                    async: false
                });
                images.push(photo.dir);
            });
        },
        error: function () {
            console.log("Error loading images");
        },
        async: false
    });
    if (images.length == 0)
        images.push("default.jpg");
    return images;
}