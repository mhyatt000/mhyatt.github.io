from flask import Flask, render_template, url_for

app = Flask(__name__)


a = {"author": "matt hyatt", "title": "what", "content": "ayo", "date_posted": "today"}
posts = [a]*100

pub = [
    {
        "title": "SSL Metrics Datasets",
        "date": "November 3, 2021",
        # "doi": None,
        "url": "https://doi.org/10.5281/zenodo.5636779",
    }
]

# with open('about.md', 'r') as file:
#     a = file.read()
#     about = {'text': a}
about = {'t': 'aaa', 'a': 'e'}


@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html")


@app.route("/about")
def about():
    return render_template("about.html", posts=posts, title="About")


@app.route("/cv")
def cv():
    return render_template("cv.html", about=about, title="CV")


@app.route("/publications")
def publications():
    return render_template("publications.html", pub=pub, title="Publications")


if __name__ == "__main__":
    # allows you to run the py file directly
    app.run(debug=True)
