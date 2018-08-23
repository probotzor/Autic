
document.getElementById('start').addEventListener("click", kretanje);
document.getElementById('stop').addEventListener("click", stopiraj);
document.getElementById('maxSkor').textContent = localStorage.getItem("maxSkor") || 0; 

var poeni;
var brzina;
var inkrement;
var zivoti3;
var bgSound;
var poruka;
var maxSkor;
var nivo;

var porazKod = '<div id="road" class="roadover"><p id="izgubio">Izgubio si!</p></div>';
var igraKod = '<div id="road" class="road"><div id="bgImage"></div><img src="blue.png" id="car" class="car"></div>';

function kretanje() {
	//window.localStorage.clear();
	document.getElementById('igra').innerHTML = igraKod;
	nivo = 1;
	document.getElementById('nivo').textContent = nivo;
    maxSkor = localStorage.getItem("maxSkor"); 
    pustiBgZvuk("bg.wav");
    poruka = "novaIgra";
    brzina = 10;
    poeni = 0;
    document.getElementById('poeni').textContent = poeni;
    inkrement = 2;
    zivoti = 3;
    document.getElementById('road').style.display = "block";
    document.getElementById('bgImage').style.display = "block";
    setInterval(pustiNeprijatelja, 2e3);
    document.getElementById('bgImage').style.animation = "" + brzina + "s bg linear infinite";
    document.getElementById('bgImage').style.webkitAnimation = "" + brzina + "s bg linear infinite";
    var auto = document.getElementById('car'),
        y = 450,
        x = (400 / 2 - 10);
    console.log(x);
    auto.style.left = x + 'px';
    document.body.addEventListener('keydown', function (event) {
        if (event.keyCode == 37) {
            if (x < 30) {
                x = x;
            } else {
                x -= 30;
            }
        } else if (event.keyCode == 39) {
            if (x > 310) {
                x = x;
            } else {
                x += 30;
            }
        }
        auto.style.left = x + 'px';
        auto.style.top = y + 'px';
        console.log(auto.style.top);
    });
}





function povecajBrzinu() {
    brzina--;
    inkrement += 1;
    document.getElementById('bgImage').style.animation = "" + brzina + "s bg linear infinite";
    document.getElementById('bgImage').style.webkitAnimation = "" + brzina + "s bg linear infinite";

}

function stopiraj() {
    document.getElementById('igra').innerHTML = "";
    document.getElementById('igra').innerHTML = porazKod;
    poruka = "poraz";
	clearInterval(setInterval(pustiNeprijatelja, 2e3));
	bgSound.pause();
    bgSound.currentTime = 0;
    
    

}


function pustiNeprijatelja() {
    if (poruka == "poraz") {
        return;
    }
    var smer = 'dole',
        x = Math.random() * (320 - 30) + 30,
        y = -10,
        neprijatelj = document.createElement('img');
    neprijatelj.id = 'enemyCar';
    neprijatelj.style.position = 'absolute';
    neprijatelj.style.left = x + 'px';
    neprijatelj.style.top = y + 'px';
    neprijatelj.src = 'green.png';
    neprijatelj.style.width = 30 + 'px';
    neprijatelj.style.height = 50 + 'px';
    neprijatelj.classList.add('car');
    neprijatelj.style.zIndex = "100";
    document.getElementById('road').appendChild(neprijatelj);

    function renderAnimation() {
        y += inkrement;
        neprijatelj.style.top = y + 'px';
        var auto = document.getElementById('car');
        var autoRect = auto.getBoundingClientRect();
        var neprijateljRect = neprijatelj.getBoundingClientRect();
        if ((((autoRect.top - autoRect.height) < neprijateljRect.top) && (autoRect.top > neprijateljRect.top)) && (((((autoRect.left - autoRect.width) < neprijateljRect.left) && (autoRect.left > neprijateljRect.left)) || (((autoRect.left + autoRect.width) > neprijateljRect.left) && (autoRect.left < neprijateljRect.left))))) {
            document.getElementById("enemyCar").remove();
			stopiraj();
			pustiZvukJednom("Explosion3.wav");
			
			
        
        }
        if (neprijateljRect.top>=550) {
			document.getElementById("enemyCar").remove();
            poeni++;
			pustiZvukJednom("Beep8.wav");
            document.getElementById('poeni').textContent = poeni;
			if (poeni > maxSkor) {
            localStorage.setItem('maxSkor', poeni);
            }
            document.getElementById('maxSkor').textContent = localStorage.getItem("maxSkor"); 
            if (poeni % 5 === 0) {
                povecajBrzinu();
				nivo++;
				document.getElementById('nivo').textContent = nivo;
            }
        }

        window.requestAnimationFrame(renderAnimation);
    }

    window.requestAnimationFrame(renderAnimation);

    


}


function pustiZvukJednom(parametar) {
oneSound = new Audio(parametar);
oneSound.play();
}

function pustiBgZvuk(parametar) {
bgSound = new Audio(parametar);
bgSound.play();
}


