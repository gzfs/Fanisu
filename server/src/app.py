import flask
from flask_cors import CORS
import sqlite3

# Connect to or create the database file
conn = sqlite3.connect("fanisu.db")
cursor = conn.cursor()

# Create a table
cursor.execute(
    """
    CREATE TABLE IF NOT EXISTS medical_conditions (
        id INTEGER PRIMARY KEY,
        symptom TEXT,
        remedy TEXT
    )
"""
)

# Insert some sample data
cursor.execute(
    "INSERT INTO medical_conditions (symptom, remedy) VALUES ('headache','lie down in a dark room and apply some balm.')"
)
cursor.execute(
    "INSERT INTO medical_conditions (symptom, remedy) VALUES ('cold', 'Drink hot water and take paracetamol for now.')"
)

# Commit changes and close the database connection
conn.commit()
conn.close()


app = flask.Flask(__name__)
CORS(app)


@app.route("/transcript", methods=["POST"])
def transcript():
    transcriptText = flask.request.json["transcriptText"].lower().split(".")[0]
    conn = sqlite3.connect("fanisu.db")
    cursor = conn.cursor()
    cursor.execute(
        "SELECT * FROM medical_conditions WHERE symptom=?", (transcriptText,)
    )
    row = cursor.fetchone()
    conn.close()

    return flask.jsonify(row)
