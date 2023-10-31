from flask import Flask, render_template, request

app = Flask(__name__)

@app.route ('/')
def index():
    return render_template('popup.html')
@app.route ('/', methods= ['POST'])
def getvalue():
    name = request.form[ 'name']
    num = request. form['num']
    