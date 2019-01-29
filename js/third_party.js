function r2d(x) {
    return x / (Math.PI / 180);
}

function d2r(x) {
    return x * (Math.PI / 180);
}

function pop(start_x, start_y, particle_count) {
    arr = [];

    angle = 0;
    particles = [];
    offset_x = $(".game").offset().left;
    offset_y = $(".game").offset().top ;

    for (i = 0; i < particle_count; i++) {
        rad = d2r(angle);

        x = Math.cos(rad) * (30 + Math.random() * 30);
        y = Math.sin(rad) * (30 + Math.random() * 30);
        arr.push([start_x + x, start_y + y]);
        z = $('<div class="debris" />');
        z.css({
            "left": start_x ,
            "top": start_y +70
        }).appendTo($(".game"));
        particles.push(z);
        angle += 360 / particle_count;
    }

    $.each(particles, function(i, v) {
        $(v).show();

        $(v).animate({
            top: arr[i][1],
            left: arr[i][0],
            width: 4,
            height: 4,
            opacity: 0
        }, 500, function() {
            $(v).remove()
            console.log("enter")
        });
    });
}