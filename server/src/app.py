import flask
from flask_cors import CORS

app = flask.Flask(__name__)
CORS(app)


@app.route("/transcript", methods=["POST"])
def transcript():
    print(flask.request.json)
    return "Hello"
