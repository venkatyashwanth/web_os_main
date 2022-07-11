//Elements
const apps = document.querySelector("#br-os-apps");
var menu = document.querySelector("#os-ct-menu");
const os_window = document.querySelector(".br-os-window")
const brand_window = document.querySelector(".brand");
const app_main = document.querySelector("#app-main");
const maximise = document.querySelector("#maximise");
const shorter = document.querySelector("#shorter");
const cross = document.querySelector("#cross");
const taskbar = document.querySelector("#taskbar");

// Operations
/*Resetting window*/
close(os_window);

/*Creating apps*/
create_app("File Manager","/assets/images/apps/pngegg.png", "file-manager");
create_app("Recycle bin","/assets/images/apps/recycle.png", "recycle-bin");
create_app("Settings","/assets/images/apps/settings.png", "settings");
create_app("System Info","/assets/images/apps/sys_info.png","system-info");

//Functions
function create_app(name, image, id){
    let app = document.createElement("div");
    app.classList.add("app");
    app.setAttribute('id',id);
    app.setAttribute("onClick", "window_open('"+id+"')")
    app.oncontextmenu = e => {
        open_menu(e)
    }
    let img = document.createElement("img");
    img.src = image;
    img.setAttribute("alt",name);
    

    let p = document.createElement("p");
    p.innerText = name;
    app.appendChild(img);
    app.appendChild(p);
    apps.appendChild(app);
}

function open (tag){
    tag.style.display = "block";
}

function close (tag){
    tag.style.display = 'none';
}

function window_open(id){
    brand_window.innerHTML = '';
    app_main.innerHTML = '';
    init_window();

    let main = document.querySelector("#" + id);

    let img = document.createElement("img");
    img.src = main.childNodes[0].src
    img.setAttribute("alt",main.childNodes[0].getAttribute("alt"));

    let p = document.createElement("p");
    p.innerText = main.childNodes[1].innerText;
    brand_window.appendChild(img);
    brand_window.appendChild(p);
    open(os_window)
}

function init_window(){
    // close(shorter); // bug 
    maximise.onclick = e => {
        maximise_window();
    }
    shorter.onclick = e => {
        shorter_window();
    }
    cross.onclick = e => {
        close(os_window);
    }
}

function maximise_window(){
    // open(shorter); bug
    // close(maximise);
    window.restoreX = os_window.style.left;
    window.restoreY = os_window.style.top;
    os_window.style.top = 0;
    os_window.style.left = 0;
    os_window.style.width = '100%';
    os_window.style.height = '100vh';
}

function shorter_window() {
    // open(maximise); bug
    // close(shorter);
    os_window.style.top = window.restoreY;
    os_window.style.left = window.restoreX;
    os_window.style.width = '60%';
    os_window.style.height = '60vh'
}

function open_menu(e){
    e.preventDefault();
    menu.classList.add("active");
    menu.style.top = e.pageY + 5 + 'px';
    menu.style.left = e.pageX + 5 + 'px';
    return false;
}

window.onclick = e => {
    if(menu.classList.contains("active")){
        menu.classList.remove("active");
    }
}

os_window.ondragend = e =>{
    let go_top = e.pageY;
    let go_left = e.pageX;
    if(go_top < 0){
        go_top = 0
    }
    if(go_left < 0){
        go_left = 0
    }
    os_window.style.top = go_top + "px";
    os_window.style.left = go_left + "px";
}