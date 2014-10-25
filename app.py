from flask import Flask
import flask

import argparse

app = Flask(__name__)

secret_key = None

@app.route('/')
def hello_index():
    cat = "http://i.imgur.com/3STLv5i.jpg"
    return flask.render_template(
        "index.html",
        image_url="https://api.planet.com/v0/scenes/ortho/c3KBi2Z5Z4ShhoqJgWJ-l3OAfYamyWWqq5w=/square-thumb?size=lg&api_key=" + secret_key)

if __name__ == '__main__':
    aparser = argparse.ArgumentParser(
        description='Simple app demonstrating color level matching')
    aparser.add_argument(
        '--key',
        help='The secret key for using the planet labs public API',
        default=None)

    args = aparser.parse_args()
    secret_key = args.key
    app.run()


