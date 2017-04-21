/**
 * Created by sher on 2017/2/4 0004.
 */

$(document).ready(function () {
    loginFunc();
    // alert('main ready');
    // turn off wpf calc when log in
    $('#logState').on('click', function () {
        $(document).off('keypress');
    });

    addNavClickEvent();
    // /* ---- particles.js config ---- */
    particle();
    // don't know why, but it seems that delay is necessary,
    // otherwise I get 400 error
    setTimeout(getLogState, 10);
    console.log($('caret').text());
    $.getScript('/js/powerMode.js');
});

function getLogState() {
    $.post('login', {'verify': true}, function (result) {
            changeUserState(result.loged, result.username);
            // console.log('posted');
            // console.log(result.loged);
        }
    );
}
function changeUserState(loged, name) {
    if (loged) {
        $('#logState').attr('src', '/images/loged.png');
        $('#username').text(name);
    } else {
        $('#logState').attr('src', '/images/login.png');
    }
}
function particle() {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 30,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#9b7bea"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 175.9296281487406,
                "color": "#5d7270",
                "opacity": 0.3998400639744104,
                "width": 1.4394242303078775
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "bounce",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 959.616153538585,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 113.3942962668978,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}