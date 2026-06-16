from flask import Flask, render_template, jsonify
import feedparser

app = Flask(__name__)

FEED_URL = 'https://docs.cloud.google.com/feeds/bigquery-release-notes.xml'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/notes')
def get_notes():
    # Fetch and parse the feed
    feed = feedparser.parse(FEED_URL)
    notes = []
    
    for entry in feed.entries:
        notes.append({
            'title': entry.get('title', 'No Title'),
            'link': entry.get('link', ''),
            'published': entry.get('published', ''),
            'summary': entry.get('summary', '')
        })
        
    return jsonify(notes)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
