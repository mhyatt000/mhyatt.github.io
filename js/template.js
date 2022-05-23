// inspired by nicholas synovic

function get_URL() {
    return window.location.href.split('/').slice(-1)
}
function get_page() {
    const page = get_URL()
    return String(page).split('.')[0]
}
function make_red(anchor) {

    // if you are on the current page then highlight its link in red
    const page = get_page()
    const re = RegExp('>.*<')
    const linktext = String(anchor).match(re)[0].slice(1,-1).replaceAll(" ","").toLowerCase()
    if (page === linktext || (page === 'index' && linktext === 'home')) {
        const out = '<a class="onpage"' + anchor.slice(2,-1) + '>'
        return out
    }
    return anchor
}

function build_navbar(){
    const navbar = document.getElementsByTagName("nav")[0]
    const template = document.createElement("template")

    template.innerHTML = `
        <div class='row'>
            <h2>
                <a href="index.html"> Matthew Hyatt </a>
            </h2>
        <ul class="nav-links row">
            <li>${make_red('<a href="about.html">About</a>')}</li>
            <li>${make_red('<a href="cv.html">CV</a>')}</li>
            <li>${make_red('<a href="publications.html">Publications</a>')}</li>
            <li>${make_red('<a href="projects.html">Projects</a>')}</li>
            <!-- <li>${make_red('<a href="readinglist.html">Reading List</a>')}</li> -->
        </ul>
        </div>

        <!-- <ul class="nav-links">
            <li><input type="text" id="username" value="username" onKeyDown="submit()"></li>
            <li><input type="text" id="password" value="password" onKeyDown="submit()"></li>
        </ul> -->
    `
    navbar.appendChild(template.content)

}

function build_socials() {

    const intro = document.getElementById("socials")
    const template = document.createElement("template")

    template.innerHTML = `
            <li>
                <a href="https://github.com/mhyatt000/" aria-label="Github">
                <i class="fa-brands fa-3x fa-github"></i>
                </a>
            </li>
            <li>
                <a href="https://www.linkedin.com/in/matt-hyatt-7bb18422a/" aria-label="LinkedIn">
                <i class="fa-brands fa-3x fa-linkedin"></i>
                </a>
            </li>
            <li>
                <a href="https://orcid.org/0000-0002-6356-6832" aria-label="OrcId">
                <i class="fa-brands fa-3x fa-orcid"></i>
                </a>
            </li>
            <li>
                <a href="mailto:mhyatt@luc.edu" aria-label="Email">
                <i class="fa-solid fa-3x fa-envelope"></i>
                </a>
            </li>
    `

    intro.appendChild(template.content)
}

function main(){

    build_navbar()
    build_socials()

}
