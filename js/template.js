// inspired by nicholas synovic

function get_URL() {
    return window.location.href.split('/').slice(-1)
}
function get_page() {
    const page = get_URL()
    return String(page).split('.')[0]
}
function highlight(anchor) {

    // if you are on the current page then highlight its link 
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
        <div><h2>
            <a href="/"> Matthew Hyatt </a>
        </h2></div>
        <div><ul class="nav-links row center">
            <li>${highlight('<a href="docs/matthewhyatt-cv.pdf">CV</a>')}</li>
            <li>${highlight('<a href="mlex">MLEX</a>')}</li>
        </ul></div>
    `

    // <li>${highlight('<a href="readinglist.html">Reading List</a>')}</li>
    // <li>${highlight('<a href="about.html">About</a>')}</li>
    // <li>${highlight('<a href="projects.html">Projects</a>')}</li>
    // <li>${highlight('<a href="publications.html">Publications</a>')}</li>

    navbar.appendChild(template.content)

}

function build_socials() {

    const intro = document.getElementById("socials")
    const template = document.createElement("template")

    template.innerHTML = `
        <a href="https://github.com/mhyatt000/" aria-label="Github">
        <i class="fa-brands fa-3x fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/matt-hyatt-7bb18422a/" aria-label="LinkedIn">
        <i class="fa-brands fa-3x fa-linkedin"></i>
        </a>
        <a href="https://orcid.org/0000-0002-6356-6832" aria-label="OrcId">
        <i class="fa-brands fa-3x fa-orcid"></i>
        </a>
        <a href="mailto:mhyatt@luc.edu" aria-label="Email">
        <i class="fa-solid fa-3x fa-envelope"></i>
        </a>
    `

    intro.appendChild(template.content)
}

function main(){

    build_navbar()
    build_socials()

}
