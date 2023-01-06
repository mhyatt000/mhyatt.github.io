function loadText(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', file, true);
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.responseText);
      } else {
        reject(new Error(this.statusText));
      }
    };
    xhr.onerror = function () {
      reject(new Error(`XMLHttpRequest Error: ${this.statusText}`));
    };
    xhr.send();
  });
}

function get_authors(items) {
  let result = "" ;
  for (const item of items) {
    let name = a(item)+" "
    name = name.includes("Hyatt") ?  em(name) : name
    result += name;
  }
  return result;
}

function get_pages(items) {
  let result = "" ;
  for (const [key, value] of Object.entries(items)) {
    result += value ? a({'text':button(key), 'href':value}) : ""
  }
  return result;
}

function em(item){
    return `<em>${item}</em>`;
}
function a(item){
    return item.href ? `<a href="${item.href}">${item.text}</a>` : item.text;
}
function p(item){
    return `<p>${item}</p>`;
}
function br(){
    return "<br>";
}

function cls(c){
    return c ? 'class="' + `${c}"` : ""
}
function style(s){
    return s ? 'style="' + `${s}"` : ""
}
function div(item, c=null,s=null){
    return `<div ${cls(c)} ${style(s)}> \n ${item} \n </div>`;
}

function img(item){
    return `<img id="${item}" src="img/${item}_before.jpg" alt="${item}">`
}
function button(item){
    return `<button ${cls('btn')}> \n ${item} \n </button>`;
}
function tagjoin(li){
    return li.join("\n")
}

function pub2html(item){
    // makes an html object for the publication
    // sends to <div id="pub">

    const pubs = document.querySelector("#pub");
    const template = document.createElement("template");

    title = `<h4> ${item["title"]}</h4>`;
    authors = get_authors(item["authors"]);
    venue = item["venue"].join(" ");

    // page buttons
    external = div(get_pages(item['external']),"rflex")
    sub = div(tagjoin([venue, external]),"mflex subcard")

    desc = item['desc'] ? p(item['desc']) : "" ;

    // combine
    html = div(tagjoin([title, div(authors), sub, desc]),"cflex");
    html = [img(item["media"]),html].join("\n")
    html = div(html,"mflex card")

    template.innerHTML = html

    temp = `
        </td>
        </tr>
        <tr onmouseout="prime_stop()" onmouseover="prime_start()">
        <td class="demo">

        <div class="one">
        <div class="two" id="prime_image">
        <img src="img/prime_after.jpg" >
        </div>
        <img src="img/prime_before.jpg" >
        </div>

        <script>
        function prime_start() { document.getElementById("prime_image").style.opacity = "1"; }
        function prime_stop() { document.getElementById("prime_image").style.opacity = "0"; }
        prime_stop()
        </script>
        </td>
        <td style="padding:20px;width:75%;vertical-align:middle">
        <em><span class="title">Snapshot Metrics Are Not Enough: Analyzing Software Repositories with Longitudinal Metrics</span></em>
        <br>
    `

    pubs.appendChild(template.content);
    console.log(html);
}

function main(){
    loadText("pub.json").then((text) => {
        console.log(text);
        pubs = JSON.parse(text)

        pubs.forEach(function(item) {
            pub2html(item);
        });

    })
    .catch((error) => {
        console.error(error);
    });
}

main();
