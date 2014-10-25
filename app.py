from flask import Flask
import flask

import argparse

app = Flask(__name__)

secret_key = None

@app.route('/')
def hello_index():
    # Show an example image...cats!
    return flask.render_template(
        "index.html",
        image_url="http://i.imgur.com/3STLv5i.jpg")

@app.route('/levels/<path:image_name>/')
def adjust_image(image_name):
    image_url = "https://api.planet.com/v0/scenes/ortho/{image_name}=/square-thumb?size=lg&api_key={secret_key}".format(
        image_name=image_name,
        secret_key=secret_key)
    return flask.render_template(
        "index.html",
        image_url=image_url)

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


