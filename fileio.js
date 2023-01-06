
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
  //TODO <em> your name

  let result = "" ;
  for (const item of items) {
    result += a(item)
  }
  return result;
}

function get_venue(item){
    return `${em(venue[0])}, ${venue[1]}`;
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
function div(item){
    return `<div> \n ${item} \n </div>`;
}

function pub2html(item){
    // makes an html object for the publication
    // sends to <div id="pub">

    const pubs = document.querySelector("#pub");
    const template = document.createElement("template");

    title = `<span ${item["title"]}</span>`;
    authors = get_authors(item["authors"]);
    venue = get_venue(item["venue"]);

    project = a({"href": project, "text": "project page"});
    arxiv = a({"href": arxiv, "text": "arxiv"});
    pages = [project," // ", arxiv].join("");

    desc = p(desc);

    template.innerHTML = div([title, br(), authors, br(), venue, br(), pages, desc].join("\n"));
        
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
    console.log(template.content);
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
